import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { quicktype, InputData, jsonInputForTargetLanguage } from "quicktype-core";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface LanguageConfig {
  language: string;
  packageName: string;
  outputDir: string;
  rendererOptions: Record<string, any>;
  validationHelpers: boolean;
}

interface PackageJson {
  name: string;
  version: string;
  description: string;
  main: string;
  types: string;
  scripts: Record<string, string>;
  dependencies: Record<string, string>;
  devDependencies: Record<string, string>;
}

const LANGUAGE_CONFIGS: LanguageConfig[] = [
  {
    language: "typescript",
    packageName: "@originvault/types",
    outputDir: "generated/typescript",
    rendererOptions: {
      "just-types": false,
      "runtime-typecheck": true,
      "nice-property-names": true,
      "prefer-unions": true,
      "prefer-const-values": true
    },
    validationHelpers: true
  },
  {
    language: "python", 
    packageName: "originvault_types",
    outputDir: "generated/python",
    rendererOptions: {
      "python-version": "3.8",
      "just-types": false,
      "use-nice-names": true,
      "nice-property-names": true
    },
    validationHelpers: true
  }
];

async function loadSchemas(sourceDir: string): Promise<Map<string, any>> {
  const schemas = new Map<string, any>();
  
  if (!fs.existsSync(sourceDir)) {
    console.log(`⚠️  Source directory ${sourceDir} does not exist, skipping`);
    return schemas;
  }

  const files = fs.readdirSync(sourceDir).filter(f => f.endsWith('.json'));
  
  for (const file of files) {
    const schemaPath = path.join(sourceDir, file);
    try {
      const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));
      const name = path.basename(file, '.json');
      schemas.set(name, schema);
    } catch (error) {
      console.error(`❌ Error loading schema ${file}:`, error);
    }
  }
  
  return schemas;
}

async function generateTypesForLanguage(config: LanguageConfig, schemas: Map<string, any>, layerName: string): Promise<void> {
  console.log(`🔨 Generating ${config.language} types for ${layerName}...`);
  
  if (schemas.size === 0) {
    console.log(`⚠️  No schemas found for ${layerName}, skipping ${config.language}`);
    return;
  }

  // Ensure output directory exists
  const outputPath = path.join(__dirname, '..', config.outputDir);
  fs.mkdirSync(outputPath, { recursive: true });

  try {
    // Create input data for QuickType
    const inputData = new InputData();
    
    for (const [name, schema] of schemas) {
      const input = jsonInputForTargetLanguage(config.language);
      await input.addSource({
        name,
        uris: [`${name}.schema.json`],
        schema: JSON.stringify(schema)
      });
      inputData.addInput(input);
    }

    // Generate types with QuickType
    const result = await quicktype({
      inputData,
      lang: config.language,
      rendererOptions: config.rendererOptions,
      leadingComments: [
        `Generated from ${layerName} schemas`,
        `Package: ${config.packageName}`,
        `DO NOT EDIT MANUALLY - regenerate with npm run generate-types`
      ]
    });

    // Write generated types
    const typeFile = path.join(outputPath, `types.${getFileExtension(config.language)}`);
    fs.writeFileSync(typeFile, result.lines.join('\n'));

    // Generate package metadata
    await generatePackageMetadata(config, outputPath, layerName);

    console.log(`✅ Generated ${config.language} types: ${typeFile}`);
  } catch (error) {
    console.error(`❌ Error generating ${config.language} types:`, error);
  }
}

async function generatePackageMetadata(config: LanguageConfig, outputPath: string, layerName: string): Promise<void> {
  if (config.language === 'typescript') {
    const packageJson: PackageJson = {
      name: config.packageName,
      version: "1.0.0",
      description: `Generated TypeScript types for ${layerName}`,
      main: "index.js",
      types: "index.d.ts",
      scripts: {
        build: "tsc",
        test: "jest"
      },
      dependencies: {
        ajv: "^8.12.0",
        "ajv-formats": "^2.1.1"
      },
      devDependencies: {
        typescript: "^5.0.0",
        "@types/node": "^20.0.0",
        jest: "^29.0.0"
      }
    };

    fs.writeFileSync(path.join(outputPath, 'package.json'), JSON.stringify(packageJson, null, 2));

    const indexTs = `export * from './types';

// Re-export key types for easier imports
export type { 
  Admin, 
  TrustedIssuer,
  NamespaceDeclaration,
  VaultDeclaration,
  UserProfile 
} from './types';
`;
    
    fs.writeFileSync(path.join(outputPath, 'index.ts'), indexTs);

    // Create a simple README
    const readme = `# ${config.packageName}

Generated TypeScript types for ${layerName}.

## Usage

\`\`\`typescript
import { Admin, TrustedIssuer, NamespaceDeclaration } from '${config.packageName}';

const admin: Admin = {
  adminId: "did:cheqd:admin:123",
  governsVaults: ["did:cheqd:vault:456"],
  managesNodes: [],
  policyApprovals: []
};
\`\`\`

## Generated Files

- \`types.ts\` - All generated types
- \`index.ts\` - Main exports

This package is auto-generated. Do not edit manually.
`;

    fs.writeFileSync(path.join(outputPath, 'README.md'), readme);
  }

  if (config.language === 'python') {
    const setupPy = `from setuptools import setup, find_packages

setup(
    name="${config.packageName}",
    version="1.0.0",
    description="Generated Python types for ${layerName}",
    packages=find_packages(),
    install_requires=[
        "typing-extensions>=4.0.0"
    ],
    python_requires=">=3.8"
)
`;

    fs.writeFileSync(path.join(outputPath, 'setup.py'), setupPy);

    const initPy = `from .types import *

__version__ = "1.0.0"
`;

    fs.writeFileSync(path.join(outputPath, '__init__.py'), initPy);
  }
}

function getFileExtension(language: string): string {
  const extensions: Record<string, string> = {
    typescript: 'ts',
    python: 'py',
    rust: 'rs',
    go: 'go',
    csharp: 'cs',
    java: 'java'
  };
  return extensions[language] || 'txt';
}

async function main(): Promise<void> {
  console.log('🚀 Starting QuickType Multi-Language Generation...');
  
  // Load schemas from drafts directory
  const schemas = await loadSchemas('./drafts');
  
  console.log(`📁 Found ${schemas.size} schemas`);
  
  if (schemas.size === 0) {
    console.log('❌ No schemas found in ./drafts directory');
    process.exit(1);
  }

  // Generate types for each language
  for (const config of LANGUAGE_CONFIGS) {
    try {
      await generateTypesForLanguage(config, schemas, 'originvault-schemas');
    } catch (error) {
      console.error(`❌ Failed to generate ${config.language}:`, error);
    }
  }

  console.log('✅ Type generation complete!');
  console.log('\n📦 Generated packages:');
  
  for (const config of LANGUAGE_CONFIGS) {
    console.log(`   ${config.language}: ${config.outputDir}`);
  }
  
  console.log('\n🎯 Next steps:');
  console.log('   1. cd ov-creator-BFF-vault-agent');
  console.log('   2. npm install ../originvault-schema-registry/generated/typescript');
  console.log('   3. Update imports to use generated types');
}

export { main, generateTypesForLanguage, loadSchemas, getFileExtension }; 