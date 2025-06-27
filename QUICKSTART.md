# 🚀 QuickStart: File Upload & Code Generation

Get started with OriginVault's file upload and code generation in under 5 minutes!

## Option 1: Web Interface (Recommended)

### 1. Start the Server
```bash
# Clone and setup
git clone https://github.com/originvault/originvault-schema-registry
cd originvault-schema-registry
npm install
npm run build
npm run server
```

### 2. Open QuickType Page
Visit: http://localhost:3001/quicktype

### 3. Upload & Generate
1. **Drag & drop** your files (JSON Schema, TypeScript, JSON)
2. **Select target language** (TypeScript, Python, Go, etc.)
3. **Click "Generate"**
4. **Download** individual files or ZIP archive

## Option 2: API Integration

### Upload Files Programmatically

```javascript
const files = [
  {
    name: 'schema.json',
    content: JSON.stringify({
      type: 'object',
      properties: {
        name: { type: 'string' },
        age: { type: 'number' }
      }
    }),
    type: 'json-schema',
    size: 100,
    id: '1'
  }
];

const response = await fetch('http://localhost:3001/api/quicktype/generate-from-files', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    files,
    targetLanguage: 'typescript',
    options: { justTypes: true }
  })
});

const results = await response.json();
console.log(results[0].code); // Generated TypeScript code
```

## Option 3: Command Line

### Traditional QuickType CLI
```bash
# Install QuickType globally
npm install -g quicktype

# Generate from local file
quicktype schema.json --lang typescript --out types.ts

# Generate from OriginVault registry
quicktype https://schemas.originvault.box/v1/business/ContractCredential.schema.json --lang python
```

## Supported File Types

| Format | Description | Auto-Detection |
|--------|-------------|----------------|
| **JSON Schema** | `.schema.json`, files with `$schema` | ✅ |
| **TypeScript** | `.ts`, `.d.ts` interface definitions | ✅ |
| **JSON** | Sample data for type inference | ✅ |

## Supported Output Languages

- **TypeScript** 🔷 - Perfect for web applications
- **Python** 🐍 - Great for data processing and APIs  
- **Go** 🔵 - Ideal for high-performance backends
- **C#** 💜 - Enterprise applications and .NET
- **Java** ☕ - Android and enterprise systems
- **Rust** 🦀 - Systems programming and performance
- **Swift** 🍎 - iOS and macOS applications
- **Kotlin** 🔶 - Android and multiplatform
- **PHP** 🐘 - Web backends and CMS
- **Ruby** 💎 - Web applications and scripting

## Example: Business Contract Schema

### 1. Upload this JSON Schema:
```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "BusinessContract",
  "type": "object",
  "properties": {
    "contractId": { "type": "string" },
    "parties": {
      "type": "array",
      "items": { "type": "string" }
    },
    "terms": { "type": "string" },
    "amount": { "type": "number" },
    "currency": { "type": "string" },
    "effectiveDate": { "type": "string", "format": "date-time" }
  },
  "required": ["contractId", "parties", "terms"]
}
```

### 2. Get TypeScript output:
```typescript
export interface BusinessContract {
    contractId: string;
    parties: string[];
    terms: string;
    amount?: number;
    currency?: string;
    effectiveDate?: string;
}
```

### 3. Get Python output:
```python
from dataclasses import dataclass
from typing import List, Optional

@dataclass
class BusinessContract:
    contract_id: str
    parties: List[str]
    terms: str
    amount: Optional[float] = None
    currency: Optional[str] = None
    effective_date: Optional[str] = None
```

## Environment Setup

Create a `.env` file:
```bash
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
MAX_FILE_SIZE=5242880  # 5MB
MAX_REQUEST_SIZE=10485760  # 10MB
```

## Troubleshooting

### Server Won't Start
```bash
# Check if port is in use
lsof -i :3001

# Try different port
PORT=3002 npm run server
```

### File Upload Fails
- Check file size (max 5MB per file)
- Verify file format (JSON, JSON Schema, TypeScript)
- Check network connection

### Generation Errors
- Validate your JSON Schema syntax
- Check TypeScript interface syntax
- Ensure JSON structure is consistent

## Next Steps

1. **Explore Examples**: Check `/examples` directory for real-world schemas
2. **Read API Docs**: See `docs/quicktype-api.md` for complete API reference
3. **Join Community**: Visit our Discord for support and discussions
4. **Contribute**: Submit schemas or improvements via GitHub

## Production Deployment

### Docker
```bash
# Build container
docker build -t originvault-schema-registry .

# Run container
docker run -p 3001:3001 originvault-schema-registry
```

### Environment Variables
```bash
NODE_ENV=production
PORT=3001
FRONTEND_URL=https://your-domain.com
```

---

**Need Help?**
- 📖 [Full Documentation](README.md)
- 🔧 [API Reference](docs/quicktype-api.md)
- 💬 [Discord Community](https://discord.gg/originvault)
- 🐛 [Report Issues](https://github.com/originvault/originvault-schema-registry/issues) 