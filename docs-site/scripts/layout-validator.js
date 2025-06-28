#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

class LayoutValidator {
  constructor() {
    this.issues = [];
    this.warnings = [];
    this.suggestions = [];
  }

  async validateDirectory(srcDir) {
    console.log(chalk.blue('🔍 Starting Layout Validation...'));
    
    const files = this.getReactFiles(srcDir);
    
    for (const file of files) {
      const content = fs.readFileSync(file, 'utf8');
      this.validateFile(file, content);
    }
    
    this.generateReport();
  }

  getReactFiles(dir) {
    const files = [];
    
    function traverse(currentDir) {
      const items = fs.readdirSync(currentDir);
      
      for (const item of items) {
        const fullPath = path.join(currentDir, item);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory() && !item.startsWith('.') && item !== 'node_modules') {
          traverse(fullPath);
        } else if (stat.isFile() && /\.(tsx?|jsx?)$/.test(item)) {
          files.push(fullPath);
        }
      }
    }
    
    traverse(dir);
    return files;
  }

  validateFile(filePath, content) {
    const relativePath = path.relative(process.cwd(), filePath);
    
    // Detect color contrast issues
    this.detectColorContrastIssues(relativePath, content);
    
    // Detect overflow/layout issues
    this.detectOverflowIssues(relativePath, content);
    
    // Detect accessibility issues
    this.detectAccessibilityIssues(relativePath, content);
    
    // Detect responsive design issues
    this.detectResponsiveIssues(relativePath, content);
  }

  detectColorContrastIssues(filePath, content) {
    // Check for multiple Chips with similar styling
    const chipMatches = content.match(/Chip[\s\S]*?(?=Chip|\/\>|\/>)/g);
    if (chipMatches && chipMatches.length > 4) {
      // Check if they have distinct colors
      const hasDistinctColors = content.includes('color={') || content.includes('color=');
      const hasDistinctVariants = content.includes('variant={selectedLanguage') || content.includes('variant={selected');
      
      if (!hasDistinctColors && !hasDistinctVariants) {
        this.issues.push({
          file: filePath,
          type: 'color_contrast',
          severity: 'warning',
          message: `Multiple Chip components (${chipMatches.length}) without distinct colors may blend together`,
          suggestion: 'Add color prop and hover states to differentiate chips'
        });
      }
    }

    // Check for space-between layouts with multiple interactive elements
    const spaceBetweenMatches = content.match(/justifyContent=['"]space-between['"][\s\S]*?(?:Button|Chip|IconButton)[\s\S]*?(?:Button|Chip|IconButton)/g);
    if (spaceBetweenMatches) {
      this.warnings.push({
        file: filePath,
        type: 'layout_overflow',
        severity: 'warning',
        message: 'space-between layout with multiple interactive elements may cause overlap on small screens',
        suggestion: 'Consider using flex-start with gap or responsive breakpoints'
      });
    }

    // Check for similar button variants close together
    const buttonVariantMatches = content.match(/Button[\s\S]*?variant=['"]outlined['"][\s\S]{0,200}Button[\s\S]*?variant=['"]outlined['"]/g);
    if (buttonVariantMatches) {
      this.warnings.push({
        file: filePath,
        type: 'color_contrast',
        severity: 'info',
        message: 'Multiple buttons with same variant may lack visual hierarchy',
        suggestion: 'Consider using primary/secondary variants or different sizes'
      });
    }
  }

  detectOverflowIssues(filePath, content) {
    // Check for Stack with many horizontal items
    const horizontalStackMatches = content.match(/Stack[\s\S]*?direction=['"]row['"][\s\S]*?(?:Chip|Button)[\s\S]*?(?:Chip|Button)[\s\S]*?(?:Chip|Button)/g);
    if (horizontalStackMatches) {
      const hasFlexWrap = content.includes('flexWrap:');
      if (!hasFlexWrap) {
        this.issues.push({
          file: filePath,
          type: 'overflow',
          severity: 'error',
          message: 'Horizontal Stack with multiple items lacks flexWrap',
          suggestion: 'Add sx={{ flexWrap: "wrap", gap: 1 }} to prevent overflow'
        });
      }
    }

    // Check for Box with fixed widths that might not be responsive
    const fixedWidthMatches = content.match(/width:\s*['"][0-9]+px['"]/g);
    if (fixedWidthMatches) {
      this.warnings.push({
        file: filePath,
        type: 'responsive',
        severity: 'warning',
        message: 'Fixed pixel widths detected - may not be responsive',
        suggestion: 'Consider using percentage, vh/vw, or breakpoint-specific values'
      });
    }
  }

  detectAccessibilityIssues(filePath, content) {
    // Check for interactive elements without proper labeling
    const interactiveWithoutLabel = content.match(/(?:Button|Chip|IconButton)[\s\S]*?(?!aria-label|title)/g);
    if (interactiveWithoutLabel && !content.includes('aria-label') && !content.includes('title')) {
      this.warnings.push({
        file: filePath,
        type: 'accessibility',
        severity: 'warning',
        message: 'Interactive elements may lack proper accessibility labels',
        suggestion: 'Add aria-label or title attributes to interactive elements'
      });
    }

    // Check for color-only information
    const colorOnlyInfo = content.match(/variant={selected.*?\?.*?:.*?}/g);
    if (colorOnlyInfo && !content.includes('aria-current') && !content.includes('aria-selected')) {
      this.suggestions.push({
        file: filePath,
        type: 'accessibility',
        severity: 'info',
        message: 'Selection state indicated by color only',
        suggestion: 'Add aria-current or aria-selected for screen readers'
      });
    }
  }

  detectResponsiveIssues(filePath, content) {
    // Check for components without responsive breakpoints
    const hasBreakpoints = /\b(xs|sm|md|lg|xl)\b/.test(content);
    const hasLargeContent = content.length > 1000;
    
    if (hasLargeContent && !hasBreakpoints) {
      this.warnings.push({
        file: filePath,
        type: 'responsive',
        severity: 'info',
        message: 'Large component without responsive breakpoints',
        suggestion: 'Consider adding xs, sm, md breakpoints for better mobile experience'
      });
    }

    // Check for horizontal scrolling risks
    const horizontalElements = content.match(/direction=['"]row['"][\s\S]*?(?:Chip|Button)[\s\S]*?(?:Chip|Button)[\s\S]*?(?:Chip|Button)/g);
    if (horizontalElements && !content.includes('overflow')) {
      this.warnings.push({
        file: filePath,
        type: 'responsive',
        severity: 'warning',
        message: 'Horizontal layout may cause scrolling on mobile',
        suggestion: 'Add overflow handling or wrap to vertical on small screens'
      });
    }
  }

  generateReport() {
    console.log(chalk.green('\n✅ Layout Validation Complete!\n'));
    
    // Summary
    const totalIssues = this.issues.length + this.warnings.length + this.suggestions.length;
    console.log(chalk.bold('📊 Summary:'));
    console.log(`   ${chalk.red('🚨 Issues:')} ${this.issues.length}`);
    console.log(`   ${chalk.yellow('⚠️  Warnings:')} ${this.warnings.length}`);
    console.log(`   ${chalk.blue('💡 Suggestions:')} ${this.suggestions.length}`);
    console.log(`   ${chalk.gray('📋 Total:')} ${totalIssues}\n`);

    // Group by file
    const byFile = {};
    [...this.issues, ...this.warnings, ...this.suggestions].forEach(item => {
      if (!byFile[item.file]) byFile[item.file] = [];
      byFile[item.file].push(item);
    });

    // Output by file
    Object.entries(byFile).forEach(([file, items]) => {
      console.log(chalk.bold.underline(`📁 ${file}`));
      
      items.forEach(item => {
        const icon = item.severity === 'error' ? '🚨' : 
                    item.severity === 'warning' ? '⚠️' : '💡';
        const color = item.severity === 'error' ? chalk.red : 
                     item.severity === 'warning' ? chalk.yellow : chalk.blue;
        
        console.log(`   ${icon} ${color(item.message)}`);
        console.log(`      ${chalk.gray('→')} ${item.suggestion}`);
        console.log();
      });
    });

    // Write JSON report
    const report = {
      timestamp: new Date().toISOString(),
      summary: {
        issues: this.issues.length,
        warnings: this.warnings.length,
        suggestions: this.suggestions.length,
        total: totalIssues
      },
      byFile: byFile,
      allItems: [...this.issues, ...this.warnings, ...this.suggestions]
    };

    fs.writeFileSync('layout-validation-report.json', JSON.stringify(report, null, 2));
    console.log(chalk.green('📄 Report saved to: layout-validation-report.json'));
  }
}

// CLI usage
if (require.main === module) {
  const srcDir = process.argv[2] || './src';
  const validator = new LayoutValidator();
  validator.validateDirectory(srcDir);
}

module.exports = LayoutValidator; 