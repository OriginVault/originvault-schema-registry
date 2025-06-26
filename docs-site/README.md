# 🏛️ OriginVault Schema Registry - Interactive Documentation Site

<div align="center">

**Self-hosted, accessible documentation with interactive schema explorer**

[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.2-blue.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-4.4-purple.svg)](https://vitejs.dev/)
[![Vitest](https://img.shields.io/badge/Vitest-0.34-green.svg)](https://vitest.dev/)
[![Accessibility](https://img.shields.io/badge/Accessibility-WCAG%202.1%20AA-orange.svg)](https://www.w3.org/WAI/WCAG21/AA/)

</div>

---

## 🚀 **Quick Start**

### **Development**
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run tests
npm test

# Run tests with UI
npm run test:ui

# Check TypeScript
npm run type-check
```

### **Production Build**
```bash
# Build for production
npm run build

# Preview production build
npm run preview

# Deploy to static hosting
npm run deploy
```

---

## 🎯 **Features**

### **✅ Interactive Schema Explorer**
- **Real-time type generation** with QuickType integration
- **Multi-language support** (TypeScript, Python, Go, C#, Java, Rust, Swift, Kotlin, PHP, Ruby)
- **Live schema editing** with Monaco Editor
- **One-click code copying** and downloading
- **Search and filter** schemas by category

### **✅ Accessibility First**
- **WCAG 2.1 AA compliant** design
- **Keyboard navigation** support
- **Screen reader** optimized
- **High contrast** mode support
- **Reduced motion** preferences respected
- **Focus management** and ARIA attributes

### **✅ TypeScript & Testing**
- **Strict TypeScript** configuration
- **Comprehensive test suite** with Vitest
- **Accessibility testing** with custom matchers
- **Component testing** with React Testing Library
- **Coverage reporting** and UI test runner

### **✅ Performance Optimized**
- **Vite build system** for fast development
- **Code splitting** and lazy loading
- **Static site generation** ready
- **CDN deployment** optimized
- **SEO friendly** with proper meta tags

### **✅ Schema Explorer**
- **Browse and search through all available JSON schemas**
- **Generate TypeScript, Python, Go, C#, Java, Rust, and other language types from schemas**
- **Create types from custom JSON schemas**
- **Test data against schemas**

### **✅ Direct Schema Resolution**
- **Direct URLs to access schemas and contexts**

## Routes

### Main Routes

- `/` - Home page
- `/schemas` - Schema Explorer (main interface)
- `/quickType` - QuickType Guide

### Resolver Routes

The application provides direct URL resolution for schemas and contexts from the GitHub repository:

#### Schema Resolution
```
/schema/{schemaPath}
```

**Examples:**
- `/schema/personCore.schema.json` - Resolves to the PersonCore schema
- `/schema/verifiableCredential.schema.json` - Resolves to the VerifiableCredential schema
- `/schema/trust-chain/TrustChain.schema.json` - Resolves to nested schema files

#### Context Resolution
```
/context/{contextPath}
```

**Examples:**
- `/context/adr-context.jsonld` - Resolves to the ADR context
- `/context/trust-chain-core.jsonld` - Resolves to the Trust Chain Core context
- `/context/open-verifiable-alignment.jsonld` - Resolves to the Open Verifiable alignment context

#### Well-Known Resolution
```
/.well-known/{wellKnownPath}
```

**Examples:**
- `/.well-known/did-configuration.json` - Resolves to DID configuration from schemas.originvault.box
- `/.well-known/did-configuration-resource.json` - Resolves to additional DID configuration resources
- `/.well-known/other-config.json` - Resolves to other .well-known configuration files

### URL Generation

The application provides utility functions to generate resolver URLs:

```typescript
import { 
  generateSchemaResolverUrl, 
  generateContextResolverUrl, 
  generateWellKnownResolverUrl,
  generateDidConfigurationUrl 
} from './utils/urlUtils'

// Generate schema resolver URL
const schemaUrl = generateSchemaResolverUrl('personCore.schema.json')
// Returns: /schema/personCore.schema.json

// Generate context resolver URL
const contextUrl = generateContextResolverUrl('adr-context.jsonld')
// Returns: /context/adr-context.jsonld

// Generate .well-known resolver URL
const wellKnownUrl = generateWellKnownResolverUrl('did-configuration.json')
// Returns: /.well-known/did-configuration.json

// Generate DID configuration URL for external domain
const didConfigUrl = generateDidConfigurationUrl('schemas.originvault.box')
// Returns: https://schemas.originvault.box/.well-known/did-configuration.json
```

### GitHub Integration

All schemas and contexts are loaded directly from the GitHub repository:
- **Repository**: https://github.com/OriginVault/originvault-schema-registry
- **Schema Path**: `schemas/v1/`
- **Context Path**: `contexts/`
- **Well-Known Path**: `.well-known/`

**Note**: DID configuration files are loaded from the external domain `schemas.originvault.box` to maintain proper domain verification.

## Usage Examples

### Direct Schema Access

You can directly access any schema using its file path:

```
https://your-domain.com/schema/personCore.schema.json
```

This will:
1. Load the schema from GitHub
2. Display it in a formatted JSON editor
3. Show metadata and provide download/copy options
4. Link to the GitHub source

### Direct Context Access

You can directly access any JSON-LD context:

```
https://your-domain.com/context/adr-context.jsonld
```

This will:
1. Load the context from GitHub
2. Display it in a formatted JSON editor
3. Extract and show context terms
4. Provide download/copy options
5. Link to the GitHub source

### Direct Well-Known Access

You can directly access .well-known configuration files:

```
https://your-domain.com/.well-known/did-configuration.json
```

This will:
1. Load the DID configuration from schemas.originvault.box
2. Display it in a formatted JSON editor
3. Extract and show DID configuration details (domain, DID, validFrom)
4. Provide download/copy options
5. Link to the source

### Integration with External Tools

The resolver routes can be used by external tools and applications:

```javascript
// Example: Loading a schema in another application
const schemaResponse = await fetch('https://your-domain.com/schema/personCore.schema.json')
const schema = await schemaResponse.json()

// Example: Loading a context in another application
const contextResponse = await fetch('https://your-domain.com/context/adr-context.jsonld')
const context = await contextResponse.json()

// Example: Loading DID configuration
const didConfigResponse = await fetch('https://your-domain.com/.well-known/did-configuration.json')
const didConfig = await didConfigResponse.json()
```

### Example URLs

Here are some example URLs you can test:

**Schemas:**
- `/schema/personCore.schema.json`
- `/schema/verifiableCredential.schema.json`
- `/schema/trust-chain/TrustChain.schema.json`
- `/schema/trust-chain/TrustChainNode.schema.json`

**Contexts:**
- `/context/adr-context.jsonld`
- `/context/trust-chain-core.jsonld`
- `/context/open-verifiable-alignment.jsonld`

**Well-Known:**
- `/.well-known/did-configuration.json`
- `/.well-known/did-configuration-resource.json`

---

## 🏗️ **Architecture**

### **Tech Stack**
- **React 18** with TypeScript
- **Vite** for build tooling
- **React Router** for navigation
- **Monaco Editor** for code editing
- **QuickType Core** for type generation
- **Tailwind CSS** for styling
- **Vitest** for testing
- **Lucide React** for icons

### **Project Structure**
```
docs-site/
├── src/
│   ├── components/          # Reusable components
│   │   ├── Layout.tsx      # Main layout with navigation
│   │   └── ...
│   ├── pages/              # Page components
│   │   ├── Home.tsx        # Landing page
│   │   ├── SchemaExplorer.tsx # Interactive explorer
│   │   ├── SchemaResolver.tsx    # New: Direct schema resolution
│   │   ├── ContextResolver.tsx   # New: Direct context resolution
│   │   └── QuickTypeGuide.tsx
│   ├── test/               # Test files
│   │   ├── setup.ts        # Test configuration
│   │   ├── utils/          # Test utilities
│   │   └── ...
│   ├── App.tsx             # Main app component
│   └── main.tsx            # Entry point
├── public/                 # Static assets
├── dist/                   # Build output
├── vite.config.ts          # Vite configuration
├── tsconfig.json           # TypeScript configuration
├── package.json            # Dependencies and scripts
└── README.md               # This file
```

---

## 🧪 **Testing**

### **Test Categories**
- **Unit Tests** - Individual component testing
- **Integration Tests** - Component interaction testing
- **Accessibility Tests** - WCAG compliance verification
- **User Interaction Tests** - Real user behavior simulation
- **Performance Tests** - Load time and responsiveness

### **Running Tests**
```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with UI
npm run test:ui

# Run tests with coverage
npm run test:coverage

# Run specific test file
npm test SchemaExplorer.test.tsx

# Run tests matching pattern
npm test -- -t "accessibility"
```

### **Test Utilities**
```typescript
import { render, screen, fireEvent, waitFor } from '../test/utils/test-utils'
import { accessibilityTestUtils, mockData } from '../test/utils/test-utils'

// Test accessibility
expect(element).toBeAccessible()
expect(element).toBeFocusable()
expect(element).toHaveGoodContrast()

// Test user interactions
testHelpers.typeInElement(input, 'search term')
testHelpers.navigateWithKeyboard([link1, link2, link3])
```

---

## ♿ **Accessibility**

### **WCAG 2.1 AA Compliance**
- **Perceivable** - Proper contrast ratios, text alternatives
- **Operable** - Keyboard navigation, focus management
- **Understandable** - Clear navigation, consistent layout
- **Robust** - Screen reader compatibility, ARIA attributes

### **Accessibility Features**
- **Skip links** for keyboard users
- **ARIA labels** and roles
- **Focus indicators** and management
- **Screen reader** announcements
- **High contrast** mode support
- **Reduced motion** preferences

### **Testing Accessibility**
```bash
# Run accessibility tests
npm test -- -t "accessibility"

# Check specific accessibility features
npm test -- -t "keyboard navigation"
npm test -- -t "screen reader"
```

---

## 🚀 **Deployment**

### **Static Hosting**
```bash
# Build for production
npm run build

# Deploy to Netlify
netlify deploy --prod --dir=dist

# Deploy to Vercel
vercel --prod

# Deploy to GitHub Pages
npm run deploy
```

### **Docker Deployment**
```dockerfile
FROM node:18-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### **Environment Variables**
```bash
# Development
VITE_API_URL=http://localhost:3000
VITE_SCHEMA_REGISTRY_URL=https://schemas.originvault.box

# Production
VITE_API_URL=https://api.originvault.box
VITE_SCHEMA_REGISTRY_URL=https://schemas.originvault.box
```

---

## 🔧 **Configuration**

### **Vite Configuration**
```typescript
// vite.config.ts
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@schemas': resolve(__dirname, '../schemas'),
      '@docs': resolve(__dirname, '../docs')
    }
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html']
    }
  }
})
```

### **TypeScript Configuration**
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "paths": {
      "@/*": ["src/*"],
      "@schemas/*": ["../schemas/*"],
      "@docs/*": ["../docs/*"]
    }
  }
}
```

---

## 📚 **Documentation**

### **Component Documentation**
- **[Layout Component](src/components/Layout.tsx)** - Main layout with navigation
- **[SchemaExplorer Component](src/pages/SchemaExplorer.tsx)** - Interactive schema explorer
- **[Test Utilities](src/test/utils/test-utils.tsx)** - Testing helpers and utilities

### **API Documentation**
- **Schema Loading** - Fetch and parse JSON schemas
- **Type Generation** - QuickType integration for code generation
- **Error Handling** - Graceful error management and user feedback

### **External Resources**
- **[OriginVault Schema Registry](https://schemas.originvault.box)** - Hosted schemas
- **[QuickType Documentation](https://quicktype.io/docs)** - Type generation
- **[W3C Accessibility Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)** - WCAG 2.1

---

## 🤝 **Contributing**

### **Development Workflow**
1. **Fork** the repository
2. **Create** a feature branch
3. **Write** tests for new features
4. **Ensure** accessibility compliance
5. **Submit** a pull request

### **Code Standards**
- **TypeScript strict mode** required
- **ESLint** and **Prettier** for code formatting
- **Test coverage** minimum 80%
- **Accessibility** testing for all components
- **Performance** optimization for user interactions

### **Testing Checklist**
- [ ] Unit tests for all components
- [ ] Integration tests for user flows
- [ ] Accessibility tests (WCAG 2.1 AA)
- [ ] Performance tests for critical paths
- [ ] Cross-browser compatibility
- [ ] Mobile responsiveness

---

## 📊 **Performance**

### **Build Metrics**
- **Bundle size** < 500KB gzipped
- **First contentful paint** < 1.5s
- **Largest contentful paint** < 2.5s
- **Cumulative layout shift** < 0.1

### **Runtime Performance**
- **Schema loading** < 200ms
- **Type generation** < 1s
- **Navigation** < 100ms
- **Search filtering** < 50ms

---

## 🔒 **Security**

### **Security Features**
- **Content Security Policy** headers
- **XSS protection** with React
- **CSRF protection** for forms
- **Secure external links** with `rel="noopener noreferrer"`
- **Input sanitization** for user content

### **Security Testing**
```bash
# Run security audit
npm audit

# Check for vulnerabilities
npm audit fix

# Test CSP compliance
npm run test:security
```

---

## 📈 **Monitoring**

### **Analytics**
- **Page views** and user engagement
- **Schema usage** statistics
- **Type generation** metrics
- **Error tracking** and reporting

### **Health Checks**
- **API endpoint** availability
- **Schema registry** connectivity
- **Build status** monitoring
- **Performance** metrics tracking

---

<div align="center">

**Ready to build accessible, type-safe documentation?**

[**🚀 Quick Start**](#quick-start) • [**🧪 Testing**](#testing) • [**♿ Accessibility**](#accessibility) • [**📚 Documentation**](#documentation)

</div> 