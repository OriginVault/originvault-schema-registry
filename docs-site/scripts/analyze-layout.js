#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

class LayoutAnalyzer {
  constructor(srcDir = './src') {
    // Handle command line arguments
    const args = process.argv.slice(2);
    if (args.length > 0) {
      srcDir = args[0];
    }
    
    this.srcDir = path.resolve(srcDir);
    console.log(`🎯 Analyzing directory: ${this.srcDir}`);
    
    this.analysis = {
      components: [],
      stylePatterns: {},
      layoutIssues: [],
      responsiveBreakpoints: {},
      componentHierarchy: {},
      cssFrameworks: []
    };
  }

  async analyzeProject() {
    console.log('🔍 Starting Layout Analysis...\n');
    
    await this.scanComponents();
    await this.analyzeStylePatterns();
    await this.detectResponsivePatterns();
    await this.detectLayoutIssues();
    await this.analyzeComponentHierarchy();
    
    return this.generateReport();
  }

  async scanComponents() {
    console.log('📁 Scanning components...');
    const files = this.findAllFiles(this.srcDir);
    
    for (const filePath of files) {
      if (this.isComponentFile(filePath)) {
        const content = fs.readFileSync(filePath, 'utf8');
        const componentAnalysis = this.analyzeComponent(filePath, content);
        this.analysis.components.push(componentAnalysis);
      }
    }
    
    console.log(`   Found ${this.analysis.components.length} components`);
  }

  findAllFiles(dir) {
    const files = [];
    
    try {
      const entries = fs.readdirSync(dir);
      
      for (const entry of entries) {
        const fullPath = path.join(dir, entry);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory() && !entry.startsWith('.') && entry !== 'node_modules') {
          files.push(...this.findAllFiles(fullPath));
        } else if (entry.match(/\.(tsx?|jsx?|css|scss)$/)) {
          files.push(fullPath);
        }
      }
    } catch (error) {
      console.warn(`Warning: Could not read directory ${dir}`);
    }
    
    return files;
  }

  isComponentFile(filePath) {
    return filePath.match(/\.(tsx?|jsx?)$/) && 
           !filePath.includes('.test.') && 
           !filePath.includes('.spec.');
  }

  analyzeComponent(filePath, content) {
    const relativePath = path.relative(this.srcDir, filePath);
    
    const componentAnalysis = {
      path: relativePath,
      name: this.extractComponentName(content),
      type: this.determineComponentType(content),
      styling: this.analyzeComponentStyling(content),
      layout: this.analyzeLayoutPatterns(content),
      responsive: this.analyzeResponsivePatterns(content),
      accessibility: this.analyzeAccessibility(content),
      complexity: this.calculateComplexity(content),
      dependencies: this.extractDependencies(content),
      exports: this.extractExports(content),
      issues: this.detectComponentIssues(content),
      visualIssues: this.detectVisualIssues(content),
      hasVisualProblems: this.detectVisualIssues(content).length > 0,
      visualScore: Math.max(0, 100 - (this.detectVisualIssues(content).length * 20))
    };

    return componentAnalysis;
  }

  extractComponentName(content) {
    // Try different patterns to extract component name
    const patterns = [
      /export\s+default\s+function\s+([A-Z][a-zA-Z0-9]*)/,
      /export\s+const\s+([A-Z][a-zA-Z0-9]*)\s*=/,
      /function\s+([A-Z][a-zA-Z0-9]*)\s*\(/,
      /const\s+([A-Z][a-zA-Z0-9]*)\s*=/
    ];
    
    for (const pattern of patterns) {
      const match = content.match(pattern);
      if (match) return match[1];
    }
    
    return 'UnknownComponent';
  }

  determineComponentType(content) {
    if (content.includes('useState') || content.includes('useEffect')) {
      return 'stateful';
    }
    if (content.includes('forwardRef')) {
      return 'forwardRef';
    }
    if (content.includes('memo(') || content.includes('React.memo')) {
      return 'memoized';
    }
    if (content.includes('createContext') || content.includes('useContext')) {
      return 'context';
    }
    if (content.match(/use[A-Z][a-zA-Z]*/)) {
      return 'hook-based';
    }
    
    return 'presentational';
  }

  analyzeComponentStyling(content) {
    const styling = {
      methods: [],
      frameworks: [],
      inline: false,
      responsive: false,
      themes: false
    };

    // Detect styling methods
    if (content.includes('styled(') || content.includes('styled.')) {
      styling.methods.push('styled-components');
    }
    if (content.includes('makeStyles') || content.includes('useStyles')) {
      styling.methods.push('jss');
    }
    if (content.includes('sx=') || content.includes('sx:')) {
      styling.methods.push('mui-sx');
    }
    if (content.includes('className=')) {
      styling.methods.push('css-classes');
    }
    if (content.includes('style=')) {
      styling.inline = true;
      styling.methods.push('inline-styles');
    }

    // Detect frameworks
    if (content.includes('@mui/') || content.includes('Material-UI')) {
      styling.frameworks.push('MUI');
    }
    if (content.includes('tailwind') || content.includes('tw-')) {
      styling.frameworks.push('Tailwind');
    }
    if (content.includes('emotion') || content.includes('@emotion/')) {
      styling.frameworks.push('Emotion');
    }

    // Detect responsive patterns
    styling.responsive = this.hasResponsivePatterns(content);
    
    // Detect theme usage
    styling.themes = content.includes('useTheme') || content.includes('theme.');

    return styling;
  }

  hasResponsivePatterns(content) {
    const responsivePatterns = [
      /xs:|sm:|md:|lg:|xl:/,
      /@media/,
      /breakpoints\./,
      /up\(|down\(|between\(/,
      /mobile|tablet|desktop/i
    ];
    
    return responsivePatterns.some(pattern => pattern.test(content));
  }

  analyzeLayoutPatterns(content) {
    const layout = {
      containers: [],
      flexbox: false,
      grid: false,
      positioning: [],
      spacing: false
    };

    // Detect container types
    if (content.includes('Container')) layout.containers.push('Container');
    if (content.includes('Box')) layout.containers.push('Box');
    if (content.includes('Paper')) layout.containers.push('Paper');
    if (content.includes('Card')) layout.containers.push('Card');
    if (content.includes('Stack')) layout.containers.push('Stack');

    // Detect layout methods
    layout.flexbox = /flex|justify|align|wrap/i.test(content);
    layout.grid = /grid|Grid/i.test(content);
    
    // Detect positioning
    if (content.includes('absolute')) layout.positioning.push('absolute');
    if (content.includes('relative')) layout.positioning.push('relative');
    if (content.includes('fixed')) layout.positioning.push('fixed');
    if (content.includes('sticky')) layout.positioning.push('sticky');

    // Detect spacing patterns
    layout.spacing = /margin|padding|spacing|gap/i.test(content);

    return layout;
  }

  analyzeResponsivePatterns(content) {
    const responsive = {
      breakpoints: [],
      patterns: [],
      mobile: false
    };

    // Extract specific breakpoints
    const breakpointMatches = content.match(/\b(xs|sm|md|lg|xl):/g);
    if (breakpointMatches) {
      responsive.breakpoints = [...new Set(breakpointMatches.map(m => m.replace(':', '')))];
    }

    // Detect responsive patterns
    if (content.includes('useMediaQuery')) responsive.patterns.push('media-queries');
    if (content.includes('Hidden')) responsive.patterns.push('conditional-display');
    if (content.includes('breakpoints.')) responsive.patterns.push('breakpoint-system');

    // Mobile-specific detection
    responsive.mobile = /mobile|touch|swipe|gesture/i.test(content);

    return responsive;
  }

  analyzeAccessibility(content) {
    const a11y = {
      score: 0,
      features: [],
      issues: []
    };

    // Good accessibility patterns
    if (content.includes('aria-')) {
      a11y.features.push('aria-attributes');
      a11y.score += 2;
    }
    if (content.includes('role=')) {
      a11y.features.push('semantic-roles');
      a11y.score += 1;
    }
    if (content.includes('alt=')) {
      a11y.features.push('alt-text');
      a11y.score += 1;
    }
    if (content.includes('tabIndex')) {
      a11y.features.push('keyboard-navigation');
      a11y.score += 1;
    }

    // Potential issues
    if (content.includes('onClick') && !content.includes('onKeyDown')) {
      a11y.issues.push('missing-keyboard-support');
    }
    if (content.includes('<div') && content.includes('onClick')) {
      a11y.issues.push('non-semantic-interactive');
    }

    return a11y;
  }

  calculateComplexity(content) {
    const lines = content.split('\n').length;
    const jsxElements = (content.match(/<[A-Z][^>]*>/g) || []).length;
    const conditionals = (content.match(/\?|&&|\|\||if\s*\(/g) || []).length;
    const hooks = (content.match(/use[A-Z][a-zA-Z]*/g) || []).length;
    const functions = (content.match(/function|=>/g) || []).length;

    const complexity = Math.round(
      (lines / 100) + 
      (jsxElements / 20) + 
      (conditionals / 10) + 
      (hooks / 5) + 
      (functions / 10)
    );

    return {
      lines,
      jsxElements,
      conditionals,
      hooks,
      functions,
      score: complexity,
      level: complexity < 3 ? 'simple' : complexity < 7 ? 'moderate' : 'complex'
    };
  }

  extractDependencies(content) {
    const dependencies = [];
    
    // Extract import statements
    const importRegex = /import\s+.*?\s+from\s+['"]([^'"]+)['"]/g;
    let match;
    
    while ((match = importRegex.exec(content)) !== null) {
      const dep = match[1];
      dependencies.push({
        name: dep,
        type: dep.startsWith('.') ? 'local' : 'external',
        isLocal: dep.startsWith('.')
      });
    }
    
    return dependencies;
  }

  extractExports(content) {
    const exports = [];
    
    if (content.includes('export default')) {
      exports.push({ type: 'default' });
    }
    
    const namedExports = content.match(/export\s+(?:const|function|class)\s+([a-zA-Z_$][a-zA-Z0-9_$]*)/g);
    if (namedExports) {
      exports.push(...namedExports.map(exp => ({
        type: 'named',
        name: exp.split(/\s+/).pop()
      })));
    }
    
    return exports;
  }

  detectComponentIssues(content) {
    const issues = [];
    
    // Performance issues
    if (content.includes('console.log')) {
      issues.push({ type: 'performance', message: 'Console.log statements found' });
    }
    if (!content.includes('React.memo') && content.length > 1000) {
      issues.push({ type: 'performance', message: 'Large component without memoization' });
    }
    
    // Code quality issues
    if (content.includes('any')) {
      issues.push({ type: 'types', message: 'TypeScript any type used' });
    }
    if (content.split('\n').length > 200) {
      issues.push({ type: 'maintainability', message: 'Component file is very large' });
    }
    
    // Accessibility issues
    if (content.includes('<img') && !content.includes('alt=')) {
      issues.push({ type: 'accessibility', message: 'Image without alt text' });
    }
    
    return issues;
  }

  async analyzeStylePatterns() {
    console.log('🎨 Analyzing style patterns...');
    
    const patterns = {
      muiUsage: 0,
      tailwindUsage: 0,
      inlineStyles: 0,
      styledComponents: 0,
      responsiveComponents: 0
    };

    for (const component of this.analysis.components) {
      if (component.styling.frameworks.includes('MUI')) patterns.muiUsage++;
      if (component.styling.frameworks.includes('Tailwind')) patterns.tailwindUsage++;
      if (component.styling.inline) patterns.inlineStyles++;
      if (component.styling.methods.includes('styled-components')) patterns.styledComponents++;
      if (component.responsive.breakpoints.length > 0) patterns.responsiveComponents++;
    }

    this.analysis.stylePatterns = patterns;
  }

  async detectResponsivePatterns() {
    console.log('📱 Detecting responsive patterns...');
    
    const breakpoints = { xs: 0, sm: 0, md: 0, lg: 0, xl: 0 };
    
    for (const component of this.analysis.components) {
      for (const bp of component.responsive.breakpoints) {
        if (breakpoints[bp] !== undefined) {
          breakpoints[bp]++;
        }
      }
    }

    this.analysis.responsiveBreakpoints = breakpoints;
  }

  async detectLayoutIssues() {
    console.log('🚨 Detecting layout issues...');
    
    for (const component of this.analysis.components) {
      for (const issue of component.issues) {
        this.analysis.layoutIssues.push({
          component: component.name,
          file: component.path,
          ...issue
        });
      }
      
      // Additional layout-specific checks
      if (component.layout.positioning.includes('absolute') && 
          !component.responsive.breakpoints.length) {
        this.analysis.layoutIssues.push({
          component: component.name,
          file: component.path,
          type: 'layout',
          message: 'Absolute positioning without responsive considerations'
        });
      }
      
      if (component.styling.inline && component.complexity.score > 5) {
        this.analysis.layoutIssues.push({
          component: component.name,
          file: component.path,
          type: 'maintainability',
          message: 'Complex component with inline styles'
        });
      }
    }
  }

  async analyzeComponentHierarchy() {
    console.log('🏗️  Analyzing component hierarchy...');
    
    const hierarchy = {
      pages: [],
      containers: [],
      presentations: [],
      utilities: []
    };

    for (const component of this.analysis.components) {
      if (component.path.includes('pages/')) {
        hierarchy.pages.push(component);
      } else if (component.type === 'stateful' || component.type === 'context') {
        hierarchy.containers.push(component);
      } else if (component.type === 'presentational') {
        hierarchy.presentations.push(component);
      } else {
        hierarchy.utilities.push(component);
      }
    }

    this.analysis.componentHierarchy = hierarchy;
  }

  generateReport() {
    const report = {
      timestamp: new Date().toISOString(),
      summary: this.generateSummary(),
      components: this.analysis.components,
      stylePatterns: this.analysis.stylePatterns,
      responsiveBreakpoints: this.analysis.responsiveBreakpoints,
      layoutIssues: this.analysis.layoutIssues,
      componentHierarchy: this.analysis.componentHierarchy,
      recommendations: this.generateRecommendations()
    };

    // Write JSON report
    fs.writeFileSync('layout-analysis.json', JSON.stringify(report, null, 2));
    
    // Write markdown report
    const markdownReport = this.generateMarkdownReport(report);
    fs.writeFileSync('layout-analysis.md', markdownReport);
    
    // Generate component tree
    const componentTree = this.generateComponentTree();
    fs.writeFileSync('component-tree.md', componentTree);

    console.log('\n✅ Layout Analysis Complete!');
    console.log('📄 Reports generated:');
    console.log('   - layout-analysis.json (detailed data)');
    console.log('   - layout-analysis.md (summary report)');
    console.log('   - component-tree.md (component hierarchy)');
    
    return report;
  }

  generateSummary() {
    const total = this.analysis.components.length;
    const issues = this.analysis.layoutIssues.length;
    const responsive = this.analysis.components.filter(c => c.responsive.breakpoints.length > 0).length;
    
    return {
      totalComponents: total,
      totalIssues: issues,
      responsiveComponents: responsive,
      averageComplexity: Math.round(
        this.analysis.components.reduce((sum, c) => sum + c.complexity.score, 0) / total * 10
      ) / 10,
      frameworkUsage: this.analysis.stylePatterns
    };
  }

  generateRecommendations() {
    const recommendations = [];

    // High-priority issues
    const criticalIssues = this.analysis.layoutIssues.filter(i => 
      i.type === 'accessibility' || i.type === 'performance'
    );
    
    if (criticalIssues.length > 0) {
      recommendations.push({
        priority: 'high',
        category: 'critical',
        title: 'Fix Critical Issues',
        description: `${criticalIssues.length} critical accessibility or performance issues found`,
        action: 'Review and fix accessibility and performance issues'
      });
    }

    // Responsive design
    const nonResponsiveComponents = this.analysis.components.length - 
      this.analysis.components.filter(c => c.responsive.breakpoints.length > 0).length;
    
    if (nonResponsiveComponents > this.analysis.components.length * 0.5) {
      recommendations.push({
        priority: 'medium',
        category: 'responsive',
        title: 'Improve Responsive Design',
        description: `${nonResponsiveComponents} components lack responsive breakpoints`,
        action: 'Add responsive breakpoints to components'
      });
    }

    // Styling consistency
    const stylingMethods = new Set();
    this.analysis.components.forEach(c => 
      c.styling.methods.forEach(m => stylingMethods.add(m))
    );
    
    if (stylingMethods.size > 3) {
      recommendations.push({
        priority: 'low',
        category: 'consistency',
        title: 'Standardize Styling Approach',
        description: `Multiple styling methods used: ${Array.from(stylingMethods).join(', ')}`,
        action: 'Consider standardizing on 1-2 styling approaches'
      });
    }

    return recommendations;
  }

  generateMarkdownReport(report) {
    return `# Layout Analysis Report

Generated: ${report.timestamp}

## Summary
- **Total Components**: ${report.summary.totalComponents}
- **Components with Issues**: ${report.summary.totalIssues}
- **Responsive Components**: ${report.summary.responsiveComponents}
- **Average Complexity**: ${report.summary.averageComplexity}

## Framework Usage
${Object.entries(report.summary.frameworkUsage).map(([key, value]) => `- **${key}**: ${value}`).join('\n')}

## Responsive Breakpoints Usage
${Object.entries(report.responsiveBreakpoints).map(([bp, count]) => `- **${bp}**: ${count} components`).join('\n')}

## Component Hierarchy
- **Pages**: ${report.componentHierarchy.pages.length}
- **Containers**: ${report.componentHierarchy.containers.length}
- **Presentations**: ${report.componentHierarchy.presentations.length}
- **Utilities**: ${report.componentHierarchy.utilities.length}

## Issues Found
${report.layoutIssues.length === 0 ? 'No issues found! 🎉' : 
  report.layoutIssues.map(issue => `
### ${issue.component} (${issue.file})
**Type**: ${issue.type}
**Message**: ${issue.message}
`).join('\n')}

## Recommendations
${report.recommendations.map(rec => `
### ${rec.title} (${rec.priority} priority)
**Category**: ${rec.category}
**Description**: ${rec.description}
**Action**: ${rec.action}
`).join('\n')}
`;
  }

  generateComponentTree() {
    let tree = '# Component Hierarchy\n\n';
    
    tree += '## Pages\n';
    for (const component of this.analysis.componentHierarchy.pages) {
      tree += `- **${component.name}** (${component.path})\n`;
      tree += `  - Type: ${component.type}\n`;
      tree += `  - Complexity: ${component.complexity.level}\n`;
      tree += `  - Responsive: ${component.responsive.breakpoints.length > 0 ? 'Yes' : 'No'}\n\n`;
    }
    
    tree += '## Containers\n';
    for (const component of this.analysis.componentHierarchy.containers) {
      tree += `- **${component.name}** (${component.path})\n`;
      tree += `  - Styling: ${component.styling.methods.join(', ')}\n`;
      tree += `  - Layout: ${component.layout.containers.join(', ')}\n\n`;
    }
    
    tree += '## Presentations\n';
    for (const component of this.analysis.componentHierarchy.presentations) {
      tree += `- **${component.name}** (${component.path})\n`;
      tree += `  - Frameworks: ${component.styling.frameworks.join(', ')}\n`;
      tree += `  - A11y Score: ${component.accessibility.score}\n\n`;
    }
    
    return tree;
  }

  detectVisualIssues(content) {
    const issues = [];
    
    // Detect potential color contrast issues
    const colorContrastIssues = this.detectColorContrastProblems(content);
    if (colorContrastIssues.length > 0) {
      issues.push(...colorContrastIssues);
    }
    
    // Detect potential overflow/positioning issues
    const overflowIssues = this.detectOverflowProblems(content);
    if (overflowIssues.length > 0) {
      issues.push(...overflowIssues);
    }
    
    // Detect z-index stacking issues
    const stackingIssues = this.detectStackingProblems(content);
    if (stackingIssues.length > 0) {
      issues.push(...stackingIssues);
    }
    
    return issues;
  }

  detectColorContrastProblems(code) {
    const issues = [];
    
    // Look for similar colors that might blend together
    const colorPatterns = [
      // MUI theme colors that might be too similar
      /variant=['"]outlined['"].*variant=['"]filled['"]/g,
      /color=['"]primary['"].*color=['"]secondary['"]/g,
      // Check for chips with similar variants close together
      /Chip[\s\S]*?variant={.*?}[\s\S]*?Chip[\s\S]*?variant={.*?}/g,
      // Look for buttons with similar styling
      /Button[\s\S]*?variant=['"]outlined['"][\s\S]*?Button[\s\S]*?variant=['"]contained['"]/g
    ];
    
    colorPatterns.forEach((pattern, index) => {
      if (pattern.test(code)) {
        issues.push({
          type: 'color_contrast',
          severity: 'warning',
          message: `Potential color contrast issue detected - similar UI elements may blend together`,
          pattern: pattern.toString(),
          suggestion: 'Consider using distinct colors, borders, or spacing to differentiate UI elements'
        });
      }
    });
    
    // Check for multiple Chip components in close proximity
    const chipMatches = code.match(/Chip[\s\S]*?(?=Chip|$)/g);
    if (chipMatches && chipMatches.length > 3) {
      issues.push({
        type: 'color_contrast',
        severity: 'warning', 
        message: `Multiple Chip components detected (${chipMatches.length}) - may cause visual confusion`,
        suggestion: 'Consider using different variants (filled/outlined), colors, or grouping strategies'
      });
    }
    
    return issues;
  }

  detectOverflowProblems(code) {
    const issues = [];
    
    // Detect potential overflow scenarios
    const overflowPatterns = [
      // Stack with many items that could overflow
      {
        pattern: /Stack[\s\S]*?direction=['"]row['"][\s\S]*?(?:Chip|Button)[\s\S]*?(?:Chip|Button)[\s\S]*?(?:Chip|Button)/g,
        message: 'Horizontal Stack with multiple items may overflow on small screens',
        suggestion: 'Consider using flexWrap: "wrap" or responsive design patterns'
      },
      // Box with justifyContent="space-between" that might cause overlap
      {
        pattern: /justifyContent=['"]space-between['"][\s\S]*?(?:Stack|Box)[\s\S]*?(?:Button|Chip)/g,
        message: 'space-between layout with multiple elements may cause overlap on small screens',
        suggestion: 'Consider using responsive breakpoints or alternative layout patterns'
      },
      // Multiple buttons in a row without proper spacing
      {
        pattern: /Button[\s\S]*?Button[\s\S]*?Button/g,
        message: 'Multiple buttons in sequence may overlap or crowd together',
        suggestion: 'Add spacing using Stack component or sx={{ gap: 1 }}'
      }
    ];
    
    overflowPatterns.forEach(({ pattern, message, suggestion }) => {
      if (pattern.test(code)) {
        issues.push({
          type: 'overflow',
          severity: 'warning',
          message,
          suggestion
        });
      }
    });
    
    return issues;
  }

  detectStackingProblems(code) {
    const issues = [];
    
    // Look for potential z-index or absolute positioning issues
    const stackingPatterns = [
      {
        pattern: /position=['"]absolute['"]|position=['"]fixed['"]|zIndex/g,
        message: 'Absolute/fixed positioning detected - may cause overlap issues',
        suggestion: 'Ensure proper z-index values and test on different screen sizes'
      },
      {
        pattern: /sx=\{[\s\S]*?position:\s*['"]absolute['"][\s\S]*?\}/g,
        message: 'Absolute positioning in sx prop - check for overlap issues',
        suggestion: 'Consider using relative positioning or proper layout containers'
      }
    ];
    
    stackingPatterns.forEach(({ pattern, message, suggestion }) => {
      if (pattern.test(code)) {
        issues.push({
          type: 'stacking',
          severity: 'error',
          message,
          suggestion
        });
      }
    });
    
    return issues;
  }
}

// CLI usage
if (require.main === module) {
  const analyzer = new LayoutAnalyzer();
  analyzer.analyzeProject().catch(console.error);
}

module.exports = LayoutAnalyzer; 