
# OriginVault JSON-LD Namespaces

This repository contains JSON-LD context definitions for OriginVault's DID method (`did:originvault`) and its associated custom terms. These namespaces are used to extend the W3C DID Core vocabulary to support OriginVault-specific features, such as generation details, custom metadata, and service definitions.

## Purpose
The hosted JSON-LD contexts enable:
- **Extensibility**: Define custom terms for use in DID Documents and related data.
- **Interoperability**: Allow third-party systems to interpret and interact with OriginVault-specific data.
- **Versioning**: Maintain backward compatibility with versioned namespaces.

## Repository Structure
The repository is organized by namespace version:
```
originvault-ns/
├── README.md               # Repository overview
├── v1/                     # Version 1 of the namespace
│   ├── context.jsonld      # JSON-LD context for v1
├── v2/                     # Version 2 of the namespace (future)
│   ├── context.jsonld      # JSON-LD context for v2
```

## Current Version
The current version of the namespace is `v1`.

## Hosted URL
The JSON-LD context for `v1` is publicly accessible at:
[https://originvault.github.io/originvault-ns/v1/context.jsonld](https://origi.github.io/originvault-ns/v1/context.jsonld)

## Usage in DID Documents
To use this namespace in a DID Document, include it in the `@context` property:

```json
{
  "@context": [
    "https://www.w3.org/ns/did/v1",
    "https://originvault.github.io/originvault-ns/v1/context.jsonld"
  ],
  "id": "did:originvault:123456789abcdefghi",
  "generationDetails": {
    "timestamp": "2024-11-22T12:34:56.789Z",
    "method": "blake3-hashing"
  }
}
```

## Contributing
Contributions are welcome! If you have suggestions for new terms or improvements, please open an issue or submit a pull request.

## License
This repository is licensed under the [MIT License](LICENSE).
