# OriginVault Schema Registry Analysis Tools

This directory contains automated analysis tools designed to help understand and improve the component architecture, layout patterns, and code quality of the OriginVault Schema Registry web application.

## 🛠️ Available Tools

### 1. Layout Analyzer (`analyze-layout.js`)
Analyzes React components for layout patterns, styling approaches, and responsive design.

**Features:**
- Component type classification (presentational, stateful, etc.)
- Styling method detection (MUI, inline styles, etc.)
- Responsive breakpoint analysis
- Layout pattern detection (flexbox, grid, positioning)
- Accessibility scoring
- Performance issue detection

**Usage:**
```bash
node analyze-layout.js [source-directory]
# Example: node analyze-layout.js ../src
```

**Outputs:**
- `layout-analysis.json` - Detailed component data
- `layout-analysis.md` - Human-readable summary
- `component-tree.md` - Component hierarchy

### 2. Dependency Analyzer (`component-dependency-graph.js`)
Maps component relationships and import dependencies across the codebase.

**Features:**
- Import/export analysis
- Circular dependency detection
- Component relationship mapping
- File complexity scoring
- Mermaid diagram generation

**Usage:**
```bash
node component-dependency-graph.js [source-directory]
# Example: node component-dependency-graph.js ../src
```

**Outputs:**
- `dependency-analysis.json` - Detailed dependency data
- `dependency-analysis.md` - Human-readable analysis
- `dependency-graph.mmd` - Mermaid diagram file

### 3. Component Validator (`validate-components.js`)
Validates components against best practices and coding standards.

**Features:**
- Accessibility validation (ARIA, semantic HTML, keyboard support)
- Performance checks (memoization, console.log, etc.)
- TypeScript usage validation
- Styling consistency checks
- Test coverage detection
- Code structure analysis

**Usage:**
```bash
node validate-components.js [source-directory]
# Example: node validate-components.js ../src
```

**Outputs:**
- `validation-report.json` - Detailed validation results
- `validation-report.md` - Summary with recommendations

### 4. Layout Validator (`layout-validator.js`) 🆕
**Pre-browser validation tool** that detects visual layout issues before they reach the UI.

**Features:**
- **Color Contrast Issues**: Detects similar UI elements that may blend together
- **Overflow Detection**: Identifies horizontal stacks that may overflow on small screens  
- **Space-between Layout Issues**: Warns about layouts that cause button overlap
- **Accessibility Validation**: Checks for proper ARIA labels and color-only indicators
- **Responsive Design Issues**: Identifies components lacking mobile breakpoints
- **Interactive Element Analysis**: Validates button hierarchies and variants

**Usage:**
```bash
node layout-validator.js [source-directory]
# Example: node layout-validator.js ../src
```

**Outputs:**
- `layout-validation-report.json` - Detailed validation results
- Real-time console output with actionable suggestions

**Example Output:**
```
🚨 Issues: 2
⚠️  Warnings: 23  
💡 Suggestions: 1

📁 src\pages\SchemaExplorer.tsx
   ⚠️ space-between layout with multiple interactive elements may cause overlap on small screens
      → Consider using flex-start with gap or responsive breakpoints
   💡 Selection state indicated by color only
      → Add aria-current or aria-selected for screen readers
```

## 📊 Current Analysis Results

Based on the latest analysis of the OriginVault Schema Registry:

### Layout Analysis Summary
- **28 components** analyzed
- **14 components** using MUI framework
- **5 components** with responsive breakpoints
- **55 layout issues** identified
- **Average complexity**: 5.7

### Key Findings:
1. **Performance Issues**: Many large components lack React.memo optimization
2. **TypeScript Issues**: Multiple components use `any` types
3. **Testing Gap**: Zero components have test files
4. **Accessibility**: Limited ARIA attributes and keyboard support
5. **Responsive Design**: Only 18% of components have responsive breakpoints

### Component Hierarchy:
- **Pages**: 0 (main page components)
- **Containers**: 11 (stateful components)
- **Presentations**: 16 (UI components)
- **Utilities**: 1 (helper components)

### Dependency Analysis:
- **37 total files** in the codebase
- **0 circular dependencies** (excellent!)
- **Low coupling** with 0.3 average dependencies per file
- **Mixed complexity** with 12 complex files needing attention

## 🚀 Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run all analyses:**
   ```bash
   npm run analyze:all
   ```

3. **Individual analyses:**
   ```bash
   npm run analyze           # Layout analysis
   npm run analyze:deps      # Dependency analysis
   npm run validate          # Component validation
   npm run validate:layout   # Pre-browser layout validation
   npm run validate:all      # All validation tools
   ```

## 📋 Action Items Based on Analysis

### High Priority
1. **Add React.memo** to large components (24 components affected)
2. **Remove TypeScript `any` types** (12 components affected)
3. **Add ARIA attributes** for accessibility (33 components affected)

### Medium Priority
1. **Create test files** for all components (28 missing tests)
2. **Add responsive breakpoints** to more components
3. **Implement keyboard navigation** support

### Low Priority
1. **Remove console.log statements** from production code
2. **Standardize styling approaches** (currently using multiple methods)
3. **Split large components** into smaller, focused components

## 🔧 Customization

### Adding Custom Validation Rules
Edit `validate-components.js` and modify the validation rules:

```javascript
this.validationRules = {
  accessibility: true,
  performance: true,
  typescript: true,
  styling: true,
  testing: true,
  structure: true,
  // Add custom rules here
};
```

### Modifying Analysis Criteria
Each analyzer has configurable parameters in its constructor and analysis methods. Key areas to customize:

- **Complexity thresholds** in `calculateComplexity()`
- **File size limits** in validation rules
- **Framework detection patterns** in styling analysis
- **Import categorization** in dependency analysis

## 📈 Integration with Development Workflow

### Pre-commit Hooks
Add to your git hooks:
```bash
# .git/hooks/pre-commit
#!/bin/sh
cd scripts && npm run validate
```

### CI/CD Integration
Add to your GitHub Actions or build pipeline:
```yaml
- name: Run Code Analysis
  run: |
    cd scripts
    npm install
    npm run analyze:all
```

### IDE Integration
The JSON outputs can be consumed by IDE plugins or custom tooling for real-time feedback.

## 🔍 Understanding the Reports

### Layout Analysis Report
- **Component classification** helps understand architecture patterns
- **Styling analysis** identifies consistency issues
- **Responsive patterns** highlight mobile-first design gaps
- **Accessibility scores** pinpoint user experience issues

### Dependency Analysis Report
- **Import graphs** reveal coupling and potential refactoring opportunities
- **Circular dependencies** indicate architectural problems
- **Complexity scores** help prioritize refactoring efforts
- **File type distribution** shows codebase organization

### Validation Report
- **Pass/fail scoring** provides objective quality metrics
- **Issue categorization** helps prioritize fixes
- **Best practice violations** guide improvement efforts
- **Recommendations** offer actionable next steps

## 🤝 Contributing

To add new analysis features:

1. **Extend existing analyzers** by adding new validation rules or metrics
2. **Create new analyzer scripts** following the existing patterns
3. **Update report generators** to include new insights
4. **Add documentation** for new features and metrics

## 📚 Related Resources

- [React Best Practices](https://react.dev/learn/thinking-in-react)
- [MUI Responsive Design](https://mui.com/material-ui/customization/breakpoints/)
- [Web Accessibility Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [TypeScript Best Practices](https://typescript-eslint.io/rules/)
- [Testing Library](https://testing-library.com/docs/react-testing-library/intro/) 