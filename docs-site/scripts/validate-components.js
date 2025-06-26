#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

class ComponentValidator {
  constructor(srcDir = './src') {
    // Handle command line arguments
    const args = process.argv.slice(2);
    if (args.length > 0) {
      srcDir = args[0];
    }
    
    this.srcDir = path.resolve(srcDir);
    console.log(`🎯 Validating directory: ${this.srcDir}`);
    
    this.validationRules = {
      accessibility: true,
      performance: true,
      typescript: true,
      styling: true,
      testing: true,
      structure: true
    };
    this.results = {
      passed: [],
      failed: [],
      warnings: [],
      stats: {}
    };
  }

  async validate(rules = {}) {
    this.validationRules = { ...this.validationRules, ...rules };
    
    console.log('🔍 Starting Component Validation...\n');
    
    const files = this.findComponentFiles();
    
    for (const filePath of files) {
      const content = fs.readFileSync(filePath, 'utf8');
      const validation = await this.validateComponent(filePath, content);
      
      if (validation.issues.length === 0) {
        this.results.passed.push(validation);
      } else {
        this.results.failed.push(validation);
      }
      
      this.results.warnings.push(...validation.warnings);
    }
    
    this.generateStats();
    return this.generateReport();
  }

  findComponentFiles() {
    const files = [];
    
    const scanDir = (dir) => {
      try {
        const entries = fs.readdirSync(dir);
        
        for (const entry of entries) {
          const fullPath = path.join(dir, entry);
          const stat = fs.statSync(fullPath);
          
          if (stat.isDirectory() && !entry.startsWith('.') && entry !== 'node_modules') {
            scanDir(fullPath);
          } else if (entry.match(/\.(tsx?|jsx?)$/) && 
                     !entry.includes('.test.') && 
                     !entry.includes('.spec.') &&
                     !entry.includes('.d.ts')) {
            files.push(fullPath);
          }
        }
      } catch (error) {
        console.warn(`Warning: Could not read directory ${dir}`);
      }
    };
    
    scanDir(this.srcDir);
    return files;
  }

  async validateComponent(filePath, content) {
    const relativePath = path.relative(this.srcDir, filePath);
    const componentName = this.extractComponentName(content);
    
    const validation = {
      path: relativePath,
      component: componentName,
      issues: [],
      warnings: [],
      score: 0,
      maxScore: 0
    };

    // Run validation rules
    if (this.validationRules.accessibility) {
      this.validateAccessibility(content, validation);
    }
    
    if (this.validationRules.performance) {
      this.validatePerformance(content, validation);
    }
    
    if (this.validationRules.typescript) {
      this.validateTypeScript(content, validation);
    }
    
    if (this.validationRules.styling) {
      this.validateStyling(content, validation);
    }
    
    if (this.validationRules.testing) {
      this.validateTesting(filePath, validation);
    }
    
    if (this.validationRules.structure) {
      this.validateStructure(content, validation);
    }

    validation.percentage = validation.maxScore > 0 ? 
      Math.round((validation.score / validation.maxScore) * 100) : 0;

    return validation;
  }

  extractComponentName(content) {
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

  validateAccessibility(content, validation) {
    validation.maxScore += 20;
    let score = 0;

    // Check for ARIA attributes
    if (content.includes('aria-')) {
      score += 5;
    } else {
      validation.issues.push({
        type: 'accessibility',
        severity: 'medium',
        message: 'No ARIA attributes found'
      });
    }

    // Check for semantic HTML/proper roles
    if (content.includes('role=')) {
      score += 3;
    }

    // Check for alt text on images
    if (content.includes('<img')) {
      if (content.includes('alt=')) {
        score += 2;
      } else {
        validation.issues.push({
          type: 'accessibility',
          severity: 'high',
          message: 'Images without alt text found'
        });
      }
    }

    // Check for keyboard navigation
    if (content.includes('onClick')) {
      if (content.includes('onKeyDown') || content.includes('tabIndex')) {
        score += 3;
      } else {
        validation.issues.push({
          type: 'accessibility',
          severity: 'medium',
          message: 'Click handlers without keyboard support'
        });
      }
    }

    // Check for proper heading hierarchy
    if (content.includes('<h1') || content.includes('<h2') || content.includes('<h3')) {
      score += 2;
    }

    // Check for focus management
    if (content.includes('focus') || content.includes('Focus')) {
      score += 2;
    }

    // Check for color-only information
    if (content.includes('color') && !content.includes('aria-label')) {
      validation.warnings.push({
        type: 'accessibility',
        message: 'Possible color-only information without text alternative'
      });
    }

    // Check for form labels
    if (content.includes('<input') || content.includes('TextField')) {
      if (content.includes('label') || content.includes('aria-label')) {
        score += 3;
      } else {
        validation.issues.push({
          type: 'accessibility',
          severity: 'high',
          message: 'Form inputs without proper labels'
        });
      }
    }

    validation.score += score;
  }

  validatePerformance(content, validation) {
    validation.maxScore += 15;
    let score = 0;

    // Check for React.memo usage on large components
    if (content.length > 1000) {
      if (content.includes('React.memo') || content.includes('memo(')) {
        score += 5;
      } else {
        validation.issues.push({
          type: 'performance',
          severity: 'medium',
          message: 'Large component without memoization'
        });
      }
    }

    // Check for useCallback/useMemo
    if (content.includes('useCallback') || content.includes('useMemo')) {
      score += 3;
    }

    // Check for console.log (development code)
    if (content.includes('console.log')) {
      validation.issues.push({
        type: 'performance',
        severity: 'low',
        message: 'Console.log statements found (should be removed in production)'
      });
    } else {
      score += 2;
    }

    // Check for inline functions in render
    const inlineFunctionMatches = content.match(/\s+\(\)\s*=>/g);
    if (inlineFunctionMatches && inlineFunctionMatches.length > 3) {
      validation.warnings.push({
        type: 'performance',
        message: 'Multiple inline functions detected (consider useCallback)'
      });
    } else {
      score += 2;
    }

    // Check for proper key props in lists
    if (content.includes('.map(') && content.includes('key=')) {
      score += 3;
    } else if (content.includes('.map(')) {
      validation.issues.push({
        type: 'performance',
        severity: 'medium',
        message: 'List rendering without proper key props'
      });
    }

    validation.score += score;
  }

  validateTypeScript(content, validation) {
    validation.maxScore += 15;
    let score = 0;

    // Check for TypeScript usage
    if (content.includes(': ') || content.includes('interface ') || content.includes('type ')) {
      score += 5;
    } else {
      validation.issues.push({
        type: 'typescript',
        severity: 'medium',
        message: 'No TypeScript types detected'
      });
    }

    // Check for any usage
    if (content.includes(': any')) {
      validation.issues.push({
        type: 'typescript',
        severity: 'medium',
        message: 'TypeScript "any" type usage detected'
      });
    } else {
      score += 3;
    }

    // Check for proper prop types
    if (content.includes('interface ') && content.includes('Props')) {
      score += 4;
    } else if (content.includes('props:')) {
      score += 2;
    } else {
      validation.warnings.push({
        type: 'typescript',
        message: 'Component props may not be properly typed'
      });
    }

    // Check for return type annotations
    if (content.includes('): JSX.Element') || content.includes('): React.')) {
      score += 3;
    }

    validation.score += score;
  }

  validateStyling(content, validation) {
    validation.maxScore += 10;
    let score = 0;

    // Check for consistent styling approach
    const stylingMethods = [];
    
    if (content.includes('sx=')) stylingMethods.push('mui-sx');
    if (content.includes('makeStyles') || content.includes('useStyles')) stylingMethods.push('jss');
    if (content.includes('styled(')) stylingMethods.push('styled-components');
    if (content.includes('style=')) stylingMethods.push('inline-styles');
    if (content.includes('className=')) stylingMethods.push('css-classes');

    if (stylingMethods.length === 1) {
      score += 3;
    } else if (stylingMethods.length > 2) {
      validation.warnings.push({
        type: 'styling',
        message: `Multiple styling approaches used: ${stylingMethods.join(', ')}`
      });
    }

    // Check for responsive design
    if (content.includes('xs:') || content.includes('sm:') || content.includes('md:') || 
        content.includes('lg:') || content.includes('xl:')) {
      score += 4;
    } else {
      validation.warnings.push({
        type: 'styling',
        message: 'No responsive breakpoints detected'
      });
    }

    // Check for theme usage
    if (content.includes('useTheme') || content.includes('theme.')) {
      score += 3;
    }

    validation.score += score;
  }

  validateTesting(filePath, validation) {
    validation.maxScore += 10;
    let score = 0;

    // Check for corresponding test file
    const testPaths = [
      filePath.replace(/\.(tsx?|jsx?)$/, '.test.$1'),
      filePath.replace(/\.(tsx?|jsx?)$/, '.spec.$1'),
      filePath.replace(/src\//, 'src/__tests__/').replace(/\.(tsx?|jsx?)$/, '.test.$1'),
      filePath.replace(/src\//, '__tests__/').replace(/\.(tsx?|jsx?)$/, '.test.$1')
    ];

    const hasTest = testPaths.some(testPath => fs.existsSync(testPath));
    
    if (hasTest) {
      score += 10;
    } else {
      validation.issues.push({
        type: 'testing',
        severity: 'low',
        message: 'No test file found for this component'
      });
    }

    validation.score += score;
  }

  validateStructure(content, validation) {
    validation.maxScore += 10;
    let score = 0;

    // Check file size
    const lines = content.split('\n').length;
    if (lines < 200) {
      score += 3;
    } else {
      validation.warnings.push({
        type: 'structure',
        message: `Component is large (${lines} lines). Consider splitting.`
      });
    }

    // Check for proper exports
    if (content.includes('export default')) {
      score += 2;
    }

    // Check for import organization
    const importLines = content.split('\n').filter(line => line.trim().startsWith('import'));
    const reactImports = importLines.filter(line => line.includes('react'));
    const externalImports = importLines.filter(line => !line.includes('./') && !line.includes('../') && !line.includes('react'));
    const localImports = importLines.filter(line => line.includes('./') || line.includes('../'));

    // Proper import order: React, external libraries, local imports
    let properOrder = true;
    let lastType = 'react';

    for (const line of importLines) {
      if (line.includes('react')) {
        if (lastType !== 'react' && lastType !== 'start') properOrder = false;
        lastType = 'react';
      } else if (!line.includes('./') && !line.includes('../')) {
        if (lastType === 'local') properOrder = false;
        lastType = 'external';
      } else {
        lastType = 'local';
      }
    }

    if (properOrder) {
      score += 2;
    } else {
      validation.warnings.push({
        type: 'structure',
        message: 'Imports not in recommended order (React, external, local)'
      });
    }

    // Check for proper function component structure
    if (content.includes('return (') || content.includes('return (<')) {
      score += 3;
    }

    validation.score += score;
  }

  generateStats() {
    this.results.stats = {
      totalComponents: this.results.passed.length + this.results.failed.length,
      passedComponents: this.results.passed.length,
      failedComponents: this.results.failed.length,
      totalIssues: this.results.failed.reduce((sum, comp) => sum + comp.issues.length, 0),
      totalWarnings: this.results.warnings.length,
      averageScore: Math.round(
        (this.results.passed.concat(this.results.failed))
          .reduce((sum, comp) => sum + comp.percentage, 0) / 
        (this.results.passed.length + this.results.failed.length)
      ),
      issuesByType: this.categorizeIssues(),
      warningsByType: this.categorizeWarnings()
    };
  }

  categorizeIssues() {
    const categories = {};
    
    for (const component of this.results.failed) {
      for (const issue of component.issues) {
        if (!categories[issue.type]) {
          categories[issue.type] = { high: 0, medium: 0, low: 0 };
        }
        categories[issue.type][issue.severity]++;
      }
    }
    
    return categories;
  }

  categorizeWarnings() {
    const categories = {};
    
    for (const warning of this.results.warnings) {
      categories[warning.type] = (categories[warning.type] || 0) + 1;
    }
    
    return categories;
  }

  generateReport() {
    const report = {
      timestamp: new Date().toISOString(),
      summary: this.results.stats,
      passed: this.results.passed,
      failed: this.results.failed,
      warnings: this.results.warnings,
      recommendations: this.generateRecommendations()
    };

    // Write JSON report
    fs.writeFileSync('validation-report.json', JSON.stringify(report, null, 2));
    
    // Write markdown report
    const markdownReport = this.generateMarkdownReport(report);
    fs.writeFileSync('validation-report.md', markdownReport);

    console.log('\n✅ Component Validation Complete!');
    console.log('📄 Reports generated:');
    console.log('   - validation-report.json (detailed data)');
    console.log('   - validation-report.md (summary report)');
    console.log(`\n📊 Results: ${this.results.stats.passedComponents}/${this.results.stats.totalComponents} components passed`);
    console.log(`🎯 Average Score: ${this.results.stats.averageScore}%`);
    
    return report;
  }

  generateRecommendations() {
    const recommendations = [];

    // High priority issues
    const highPriorityIssues = Object.entries(this.results.stats.issuesByType)
      .filter(([type, counts]) => counts.high > 0);
    
    if (highPriorityIssues.length > 0) {
      recommendations.push({
        priority: 'high',
        category: 'critical',
        title: 'Fix High Priority Issues',
        description: `High priority issues found in: ${highPriorityIssues.map(([type]) => type).join(', ')}`,
        action: 'Address accessibility and performance issues immediately'
      });
    }

    // Testing coverage
    if (this.results.stats.issuesByType.testing) {
      const testingIssues = Object.values(this.results.stats.issuesByType.testing)
        .reduce((a, b) => a + b, 0);
      recommendations.push({
        priority: 'medium',
        category: 'testing',
        title: 'Improve Test Coverage',
        description: `${testingIssues} components missing test files`,
        action: 'Add unit tests for components'
      });
    }

    // TypeScript usage
    if (this.results.stats.issuesByType.typescript) {
      recommendations.push({
        priority: 'medium',
        category: 'types',
        title: 'Improve TypeScript Usage',
        description: 'Components found with TypeScript issues',
        action: 'Add proper type definitions and remove any types'
      });
    }

    // Code structure
    if (this.results.stats.warningsByType.structure > 5) {
      recommendations.push({
        priority: 'low',
        category: 'structure',
        title: 'Improve Code Structure',
        description: 'Multiple structural warnings found',
        action: 'Review component organization and file sizes'
      });
    }

    return recommendations;
  }

  generateMarkdownReport(report) {
    return `# Component Validation Report

Generated: ${report.timestamp}

## Summary
- **Total Components**: ${report.summary.totalComponents}
- **Passed**: ${report.summary.passedComponents} (${Math.round(report.summary.passedComponents/report.summary.totalComponents*100)}%)
- **Failed**: ${report.summary.failedComponents} (${Math.round(report.summary.failedComponents/report.summary.totalComponents*100)}%)
- **Average Score**: ${report.summary.averageScore}%
- **Total Issues**: ${report.summary.totalIssues}
- **Total Warnings**: ${report.summary.totalWarnings}

## Issues by Type
${Object.entries(report.summary.issuesByType).map(([type, counts]) => `
### ${type.charAt(0).toUpperCase() + type.slice(1)}
- High Priority: ${counts.high}
- Medium Priority: ${counts.medium}
- Low Priority: ${counts.low}
`).join('')}

## Failed Components
${report.failed.map(comp => `
### ${comp.component} (${comp.path})
**Score**: ${comp.percentage}%
**Issues**: ${comp.issues.length}

${comp.issues.map(issue => `- **${issue.severity}**: ${issue.message}`).join('\n')}
`).join('')}

## Recommendations
${report.recommendations.map(rec => `
### ${rec.title} (${rec.priority} priority)
**Category**: ${rec.category}
**Description**: ${rec.description}
**Action**: ${rec.action}
`).join('')}
`;
  }
}

// CLI usage
if (require.main === module) {
  const validator = new ComponentValidator();
  validator.validate().catch(console.error);
}

module.exports = ComponentValidator; 