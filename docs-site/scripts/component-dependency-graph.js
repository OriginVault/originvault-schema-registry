#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

class ComponentDependencyAnalyzer {
  constructor(srcDir = './src') {
    // Handle command line arguments
    const args = process.argv.slice(2);
    if (args.length > 0) {
      srcDir = args[0];
    }
    
    this.srcDir = path.resolve(srcDir);
    console.log(`🎯 Analyzing directory: ${this.srcDir}`);
    
    this.dependencies = new Map();
    this.components = new Map();
    this.importGraph = {};
    this.circularDependencies = [];
  }

  async analyze() {
    console.log('🔍 Analyzing Component Dependencies...\n');
    
    await this.scanAllFiles();
    await this.buildDependencyGraph();
    await this.detectCircularDependencies();
    await this.analyzeComponentTypes();
    
    return this.generateReport();
  }

  async scanAllFiles() {
    console.log('📁 Scanning files...');
    const files = await this.findAllFiles(this.srcDir);
    
    for (const filePath of files) {
      const content = fs.readFileSync(filePath, 'utf8');
      const analysis = this.analyzeFile(filePath, content);
      this.components.set(filePath, analysis);
    }
    
    console.log(`   Found ${files.length} files`);
  }

  findAllFiles(dir) {
    const files = [];
    const entries = fs.readdirSync(dir);
    
    for (const entry of entries) {
      const fullPath = path.join(dir, entry);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory() && !entry.startsWith('.') && entry !== 'node_modules') {
        files.push(...this.findAllFiles(fullPath));
      } else if (entry.match(/\.(tsx?|jsx?|css|scss|json)$/)) {
        files.push(fullPath);
      }
    }
    
    return files;
  }

  analyzeFile(filePath, content) {
    const relativePath = path.relative(this.srcDir, filePath);
    const fileType = this.determineFileType(filePath, content);
    
    return {
      path: relativePath,
      absolutePath: filePath,
      type: fileType,
      size: content.length,
      imports: this.extractImports(content),
      exports: this.extractExports(content),
      components: this.extractComponentDefinitions(content),
      hooks: this.extractHookUsage(content),
      dependencies: this.extractDependencies(content),
      complexity: this.calculateFileComplexity(content)
    };
  }

  determineFileType(filePath, content) {
    const ext = path.extname(filePath);
    
    if (ext === '.json') return 'config';
    if (ext.match(/\.s?css$/)) return 'style';
    if (content.includes('export default') && content.includes('function')) return 'component';
    if (content.includes('export const') && content.includes('= () =>')) return 'component';
    if (content.includes('export function')) return 'utility';
    if (content.includes('export const') && content.includes('use')) return 'hook';
    if (content.includes('export type') || content.includes('export interface')) return 'types';
    if (content.includes('test(') || content.includes('describe(')) return 'test';
    
    return 'module';
  }

  extractImports(content) {
    const imports = [];
    
    // ES6 imports
    const importRegex = /import\s+(?:{[^}]*}|[^{}\s]+|\*\s+as\s+\w+)\s+from\s+['"]([^'"]+)['"]/g;
    let match;
    
    while ((match = importRegex.exec(content)) !== null) {
      const importPath = match[1];
      const importType = this.categorizeImport(importPath);
      
      imports.push({
        path: importPath,
        type: importType,
        isLocal: importPath.startsWith('.'),
        line: content.substring(0, match.index).split('\n').length
      });
    }
    
    // Dynamic imports
    const dynamicImportRegex = /import\s*\(\s*['"]([^'"]+)['"]\s*\)/g;
    while ((match = dynamicImportRegex.exec(content)) !== null) {
      imports.push({
        path: match[1],
        type: 'dynamic',
        isLocal: match[1].startsWith('.'),
        dynamic: true
      });
    }
    
    return imports;
  }

  categorizeImport(importPath) {
    if (importPath.startsWith('.')) return 'local';
    if (importPath.startsWith('@mui')) return 'mui';
    if (importPath.startsWith('react')) return 'react';
    if (importPath.includes('/')) return 'library';
    return 'external';
  }

  extractExports(content) {
    const exports = [];
    
    // Named exports
    const namedExportRegex = /export\s+(?:const|function|class|interface|type)\s+(\w+)/g;
    let match;
    
    while ((match = namedExportRegex.exec(content)) !== null) {
      exports.push({
        name: match[1],
        type: 'named',
        line: content.substring(0, match.index).split('\n').length
      });
    }
    
    // Default exports
    const defaultExportRegex = /export\s+default\s+(\w+)/g;
    while ((match = defaultExportRegex.exec(content)) !== null) {
      exports.push({
        name: match[1],
        type: 'default',
        line: content.substring(0, match.index).split('\n').length
      });
    }
    
    return exports;
  }

  extractComponentDefinitions(content) {
    const components = [];
    
    // Function components
    const functionComponentRegex = /(?:export\s+)?(?:const|function)\s+([A-Z][a-zA-Z0-9]*)/g;
    let match;
    
    while ((match = functionComponentRegex.exec(content)) !== null) {
      const component = match[1];
      const isReactComponent = this.isReactComponent(content, component);
      
      if (isReactComponent) {
        components.push({
          name: component,
          type: 'function',
          line: content.substring(0, match.index).split('\n').length
        });
      }
    }
    
    return components;
  }

  isReactComponent(content, componentName) {
    // Check if it returns JSX
    const componentContent = this.extractComponentContent(content, componentName);
    return /return\s*\(?\s*</.test(componentContent) || /=>\s*\(?\s*</.test(componentContent);
  }

  extractComponentContent(content, componentName) {
    const startIndex = content.indexOf(componentName);
    if (startIndex === -1) return '';
    
    // Find the end of the component (simplified)
    let braceCount = 0;
    let inComponent = false;
    let componentContent = '';
    
    for (let i = startIndex; i < content.length; i++) {
      const char = content[i];
      componentContent += char;
      
      if (char === '{') {
        braceCount++;
        inComponent = true;
      } else if (char === '}') {
        braceCount--;
        if (inComponent && braceCount === 0) break;
      }
    }
    
    return componentContent;
  }

  extractHookUsage(content) {
    const hooks = [];
    const hookRegex = /use[A-Z][a-zA-Z0-9]*\s*\(/g;
    let match;
    
    while ((match = hookRegex.exec(content)) !== null) {
      const hookName = match[0].replace(/\s*\($/, '');
      hooks.push({
        name: hookName,
        line: content.substring(0, match.index).split('\n').length
      });
    }
    
    return hooks;
  }

  extractDependencies(content) {
    // Extract external package dependencies
    const dependencies = new Set();
    const importRegex = /from\s+['"]([^'"./][^'"]*)['"]/g;
    let match;
    
    while ((match = importRegex.exec(content)) !== null) {
      const packageName = match[1].split('/')[0];
      if (packageName.startsWith('@')) {
        dependencies.add(match[1].split('/').slice(0, 2).join('/'));
      } else {
        dependencies.add(packageName);
      }
    }
    
    return Array.from(dependencies);
  }

  calculateFileComplexity(content) {
    const lines = content.split('\n').length;
    const cyclomaticComplexity = (content.match(/if|while|for|switch|case|\?|&&|\|\|/g) || []).length;
    const functionCount = (content.match(/function|=>/g) || []).length;
    const importCount = (content.match(/import/g) || []).length;
    
    return {
      lines,
      cyclomaticComplexity,
      functionCount,
      importCount,
      score: Math.round((lines / 100) + (cyclomaticComplexity / 20) + (functionCount / 10))
    };
  }

  async buildDependencyGraph() {
    console.log('🕸️  Building dependency graph...');
    
    for (const [filePath, fileData] of this.components) {
      const relativePath = fileData.path;
      this.importGraph[relativePath] = {
        ...fileData,
        dependsOn: [],
        dependents: []
      };
      
      // Resolve local imports
      for (const importData of fileData.imports) {
        if (importData.isLocal) {
          const resolvedPath = this.resolveImportPath(filePath, importData.path);
          if (resolvedPath && this.components.has(resolvedPath)) {
            const targetRelativePath = this.components.get(resolvedPath).path;
            this.importGraph[relativePath].dependsOn.push({
              path: targetRelativePath,
              ...importData
            });
          }
        }
      }
    }
    
    // Build reverse dependencies
    for (const [filePath, fileData] of Object.entries(this.importGraph)) {
      for (const dependency of fileData.dependsOn) {
        if (this.importGraph[dependency.path]) {
          this.importGraph[dependency.path].dependents.push(filePath);
        }
      }
    }
  }

  resolveImportPath(fromFile, importPath) {
    if (!importPath.startsWith('.')) return null;
    
    const fromDir = path.dirname(fromFile);
    let resolvedPath = path.resolve(fromDir, importPath);
    
    // Try different extensions
    const extensions = ['.tsx', '.ts', '.jsx', '.js', '.json'];
    
    for (const ext of extensions) {
      const withExt = resolvedPath + ext;
      if (fs.existsSync(withExt)) {
        return withExt;
      }
    }
    
    // Try index files
    for (const ext of extensions) {
      const indexPath = path.join(resolvedPath, 'index' + ext);
      if (fs.existsSync(indexPath)) {
        return indexPath;
      }
    }
    
    return null;
  }

  async detectCircularDependencies() {
    console.log('🔄 Detecting circular dependencies...');
    
    const visited = new Set();
    const recursionStack = new Set();
    const cycles = [];
    
    const dfs = (filePath, path = []) => {
      if (recursionStack.has(filePath)) {
        const cycleStart = path.indexOf(filePath);
        cycles.push(path.slice(cycleStart).concat([filePath]));
        return;
      }
      
      if (visited.has(filePath)) return;
      
      visited.add(filePath);
      recursionStack.add(filePath);
      path.push(filePath);
      
      const fileData = this.importGraph[filePath];
      if (fileData) {
        for (const dependency of fileData.dependsOn) {
          dfs(dependency.path, [...path]);
        }
      }
      
      recursionStack.delete(filePath);
    };
    
    for (const filePath of Object.keys(this.importGraph)) {
      if (!visited.has(filePath)) {
        dfs(filePath);
      }
    }
    
    this.circularDependencies = cycles;
    console.log(`   Found ${cycles.length} circular dependencies`);
  }

  async analyzeComponentTypes() {
    console.log('🧩 Analyzing component types...');
    
    const analysis = {
      byType: {},
      complexity: {
        simple: 0,
        moderate: 0,
        complex: 0
      },
      patterns: {
        containers: 0,
        presentations: 0,
        hooks: 0,
        utilities: 0
      }
    };
    
    for (const fileData of Object.values(this.importGraph)) {
      // Count by type
      analysis.byType[fileData.type] = (analysis.byType[fileData.type] || 0) + 1;
      
      // Complexity analysis
      if (fileData.complexity.score <= 2) analysis.complexity.simple++;
      else if (fileData.complexity.score <= 5) analysis.complexity.moderate++;
      else analysis.complexity.complex++;
      
      // Pattern analysis
      if (this.isContainerComponent(fileData)) analysis.patterns.containers++;
      else if (this.isPresentationalComponent(fileData)) analysis.patterns.presentations++;
      else if (fileData.type === 'hook') analysis.patterns.hooks++;
      else if (fileData.type === 'utility') analysis.patterns.utilities++;
    }
    
    this.componentAnalysis = analysis;
  }

  isContainerComponent(fileData) {
    return fileData.hooks.some(hook => 
      hook.name.includes('State') || 
      hook.name.includes('Effect') || 
      hook.name.includes('Fetch')
    );
  }

  isPresentationalComponent(fileData) {
    return fileData.components.length > 0 && 
           fileData.hooks.filter(h => h.name !== 'useTheme').length === 0;
  }

  generateReport() {
    const report = {
      timestamp: new Date().toISOString(),
      summary: this.generateSummary(),
      dependencyGraph: this.importGraph,
      circularDependencies: this.circularDependencies,
      componentAnalysis: this.componentAnalysis,
      recommendations: this.generateRecommendations()
    };

    // Write detailed JSON report
    fs.writeFileSync('dependency-analysis.json', JSON.stringify(report, null, 2));
    
    // Generate Mermaid diagram
    const mermaidDiagram = this.generateMermaidDiagram();
    fs.writeFileSync('dependency-graph.mmd', mermaidDiagram);
    
    // Generate human-readable report
    const readableReport = this.generateReadableReport(report);
    fs.writeFileSync('dependency-analysis.md', readableReport);
    
    console.log('\n✅ Analysis Complete!');
    console.log('📄 Reports generated:');
    console.log('   - dependency-analysis.json (detailed data)');
    console.log('   - dependency-analysis.md (human-readable)');
    console.log('   - dependency-graph.mmd (Mermaid diagram)');
    
    return report;
  }

  generateSummary() {
    const totalFiles = Object.keys(this.importGraph).length;
    const totalDependencies = Object.values(this.importGraph)
      .reduce((sum, file) => sum + file.dependsOn.length, 0);
    
    return {
      totalFiles,
      totalDependencies,
      circularDependencies: this.circularDependencies.length,
      averageDependencies: Math.round(totalDependencies / totalFiles * 10) / 10,
      fileTypes: this.componentAnalysis?.byType || {},
      complexityDistribution: this.componentAnalysis?.complexity || {}
    };
  }

  generateMermaidDiagram() {
    let diagram = 'graph TD\n';
    
    // Add nodes
    for (const [filePath, fileData] of Object.entries(this.importGraph)) {
      const nodeId = this.sanitizeNodeId(filePath);
      const fileName = path.basename(filePath);
      const nodeStyle = this.getNodeStyle(fileData.type);
      
      diagram += `  ${nodeId}["${fileName}"]${nodeStyle}\n`;
    }
    
    diagram += '\n';
    
    // Add edges (limit to avoid overwhelming diagrams)
    const edgeCount = 0;
    const maxEdges = 100;
    
    for (const [filePath, fileData] of Object.entries(this.importGraph)) {
      if (edgeCount >= maxEdges) break;
      
      const fromId = this.sanitizeNodeId(filePath);
      
      for (const dependency of fileData.dependsOn.slice(0, 5)) { // Limit per file
        const toId = this.sanitizeNodeId(dependency.path);
        diagram += `  ${fromId} --> ${toId}\n`;
      }
    }
    
    return diagram;
  }

  sanitizeNodeId(filePath) {
    return filePath.replace(/[^a-zA-Z0-9]/g, '_');
  }

  getNodeStyle(fileType) {
    const styles = {
      component: ':::componentNode',
      hook: ':::hookNode',
      utility: ':::utilityNode',
      types: ':::typesNode',
      test: ':::testNode',
      style: ':::styleNode'
    };
    
    return styles[fileType] || '';
  }

  generateRecommendations() {
    const recommendations = [];
    
    // Circular dependencies
    if (this.circularDependencies.length > 0) {
      recommendations.push({
        priority: 'high',
        category: 'architecture',
        title: 'Resolve Circular Dependencies',
        description: `Found ${this.circularDependencies.length} circular dependencies that should be resolved.`,
        impact: 'Prevents bundling issues, improves maintainability'
      });
    }
    
    // High complexity files
    const complexFiles = Object.values(this.importGraph)
      .filter(file => file.complexity.score > 7).length;
    
    if (complexFiles > 0) {
      recommendations.push({
        priority: 'medium',
        category: 'complexity',
        title: 'Reduce File Complexity',
        description: `${complexFiles} files have high complexity scores.`,
        impact: 'Improves maintainability and testability'
      });
    }
    
    // Missing component structure
    const componentFiles = Object.values(this.importGraph)
      .filter(file => file.type === 'component').length;
    const totalFiles = Object.keys(this.importGraph).length;
    
    if (componentFiles / totalFiles < 0.3) {
      recommendations.push({
        priority: 'low',
        category: 'structure',
        title: 'Consider Component Structure',
        description: 'Low ratio of component files suggests potential for better organization.',
        impact: 'Better code organization and reusability'
      });
    }
    
    return recommendations;
  }

  generateReadableReport(report) {
    return `# Component Dependency Analysis

Generated: ${report.timestamp}

## Summary
- **Total Files**: ${report.summary.totalFiles}
- **Total Dependencies**: ${report.summary.totalDependencies}
- **Circular Dependencies**: ${report.summary.circularDependencies}
- **Average Dependencies per File**: ${report.summary.averageDependencies}

## File Types Distribution
${Object.entries(report.summary.fileTypes).map(([type, count]) => `- **${type}**: ${count}`).join('\n')}

## Complexity Distribution
${Object.entries(report.summary.complexityDistribution).map(([level, count]) => `- **${level}**: ${count}`).join('\n')}

## Circular Dependencies
${report.circularDependencies.length === 0 ? 'None found! 🎉' : 
  report.circularDependencies.map((cycle, index) => `
### Cycle ${index + 1}
${cycle.map(file => `- ${file}`).join('\n')}
`).join('\n')}

## Recommendations
${report.recommendations.map(rec => `
### ${rec.title} (${rec.priority} priority)
**Category**: ${rec.category}
**Description**: ${rec.description}
**Impact**: ${rec.impact}
`).join('\n')}

## Dependency Graph
View the dependency-graph.mmd file with a Mermaid viewer to see the visual dependency graph.
`;
  }
}

// CLI usage
if (require.main === module) {
  const analyzer = new ComponentDependencyAnalyzer();
  analyzer.analyze().catch(console.error);
}

module.exports = ComponentDependencyAnalyzer; 