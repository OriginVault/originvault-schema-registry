# QuickType API Server

This document describes the QuickType API server that allows users to upload schema/type files and generate code in multiple programming languages.

## Features

- **File Upload Support**: Upload JSON Schema, TypeScript definitions, or sample JSON files
- **Multi-Language Code Generation**: Generate type-safe code in 10+ programming languages
- **Batch Processing**: Process multiple files simultaneously
- **ZIP Download**: Download all generated files as a convenient ZIP archive
- **Real-time Validation**: Validate schemas and data in real-time

## Supported File Types

| Type | Description | Extensions |
|------|-------------|------------|
| JSON Schema | JSON Schema definitions | `.schema.json`, `.json` (with `$schema` property) |
| TypeScript | Type definitions | `.ts`, `.d.ts` |
| JSON | Sample data for type inference | `.json` |

## Supported Output Languages

- TypeScript 🔷
- Python 🐍
- Go 🔵
- C# 💜
- Java ☕
- Rust 🦀
- Swift 🍎
- Kotlin 🔶
- PHP 🐘
- Ruby 💎

## API Endpoints

### `POST /api/quicktype/generate-from-files`

Generate code from uploaded files.

**Request Body:**
```json
{
  "files": [
    {
      "name": "schema.json",
      "content": "{ ... }",
      "type": "json-schema",
      "size": 1024,
      "id": "unique-id"
    }
  ],
  "targetLanguage": "typescript",
  "options": {
    "justTypes": false,
    "acronymStyle": "camel",
    "packageName": "",
    "namespace": ""
  }
}
```

**Response:**
```json
[
  {
    "language": "typescript",
    "code": "export interface Schema { ... }",
    "filename": "schema.ts"
  }
]
```

### `POST /api/quicktype/download-zip`

Download generated files as a ZIP archive.

**Request Body:**
```json
{
  "results": [
    {
      "language": "typescript",
      "code": "export interface Schema { ... }",
      "filename": "schema.ts"
    }
  ]
}
```

**Response:** ZIP file download

### `POST /api/quicktype/validate-schema`

Validate a JSON schema or data against a schema.

**Request Body:**
```json
{
  "schema": { ... },
  "data": { ... } // optional
}
```

**Response:**
```json
{
  "valid": true,
  "errors": []
}
```

## Running the Server

### Development

```bash
# Install dependencies
npm install

# Build TypeScript
npm run build

# Start the server
npm run server

# Or run in development mode (with watch)
npm run dev:server
```

### Production

```bash
npm start
```

The server will run on port 3001 by default. You can change this by setting the `PORT` environment variable.

### Environment Variables

- `PORT`: Server port (default: 3001)
- `FRONTEND_URL`: Frontend URL for CORS (default: http://localhost:3000)
- `NODE_ENV`: Environment mode (development/production)

## Usage Example

Here's how to use the API with curl:

```bash
# Generate TypeScript from JSON Schema
curl -X POST http://localhost:3001/api/quicktype/generate-from-files \
  -H "Content-Type: application/json" \
  -d '{
    "files": [{
      "name": "person.schema.json",
      "content": "{\"type\":\"object\",\"properties\":{\"name\":{\"type\":\"string\"},\"age\":{\"type\":\"number\"}}}",
      "type": "json-schema",
      "size": 100,
      "id": "1"
    }],
    "targetLanguage": "typescript",
    "options": {"justTypes": true}
  }'
```

## Frontend Integration

The QuickType page (`docs-site/src/pages/QuickType.tsx`) provides a user-friendly interface for:

- Drag & drop file uploads
- Language selection
- Generation options configuration
- Real-time preview of generated code
- Batch download capabilities

## Error Handling

The API includes comprehensive error handling:

- **400 Bad Request**: Invalid input data
- **500 Internal Server Error**: Generation failures
- **404 Not Found**: Invalid endpoints

All errors return JSON responses with descriptive error messages.

## Security Considerations

- File size limit: 5MB per file
- Request body limit: 10MB total
- CORS enabled for specified frontend origins
- Input validation and sanitization

## Future Enhancements

- [ ] GraphQL schema support
- [ ] Protocol Buffers support
- [ ] Advanced TypeScript parsing
- [ ] Custom template support
- [ ] API rate limiting
- [ ] User authentication 