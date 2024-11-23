          ██████╗ ██╗██████╗             ██████╗ ██████╗ ██╗ ██████╗ ██╗███╗   ██╗██╗   ██╗ █████╗ ██╗   ██╗██╗   ████████╗
          ██╔══██╗██║██╔══██╗    ██╗    ██╔═══██╗██╔══██╗██║██╔════╝ ██║████╗  ██║██║   ██║██╔══██╗██║   ██║██║   ╚══██╔══╝
          ██║  ██║██║██║  ██║           ██║   ██║██████╔╝██║██║  ███╗██║██╔██╗ ██║██║   ██║███████║██║   ██║██║      ██║   
          ██║  ██║██║██║  ██║    ██╗    ██║   ██║██╔══██╗██║██║   ██║██║██║╚██╗██║╚██╗ ██╔╝██╔══██║██║   ██║██║      ██║   
          ██████╔╝██║██████╔╝           ╚██████╔╝██║  ██║██║╚██████╔╝██║██║ ╚████║ ╚████╔╝ ██║  ██║╚██████╔╝███████╗ ██║   
          ╚═════╝ ╚═╝╚═════╝             ╚═════╝ ╚═╝  ╚═╝╚═╝ ╚═════╝ ╚═╝╚═╝  ╚═══╝  ╚═══╝  ╚═╝  ╚═╝ ╚═════╝ ╚══════╝ ╚═╝   

<div style="width: 100%; display: flex; justify-content: center; align-items: center;">
      <img src="https://gray-objective-tiglon-784.mypinata.cloud/ipfs/Qma7EjPPPfomzEKkYcJa2ctEFPUhHaMwiojTR1wTQPg2x8" alt="Description of the Image" width="300" height="300">
</div>

# OriginVault JSON-LD Namespaces

This repository contains JSON-LD context definitions for [OriginVault's]("htts://www.originvault.io") DID method (`did:originvault`) and its associated custom terms. These namespaces are used to extend the W3C DID Core vocabulary to support OriginVault-specific features, such as generation details, custom metadata, and service definitions.

## Purpose
The hosted JSON-LD contexts enable:
- **Extensibility**: Define custom terms for use in DID Documents and related data.
- **Interoperability**: Allow third-party systems to interpret and interact with OriginVault-specific data.
- **Versioning**: Maintain backward compatibility with versioned namespaces.

## Repository Structure
The repository is organized by namespace version:
```
originvault-namspaces/
├── README.md               # Repository overview
├── v1/                     # Version 1 of the namespace
│   ├── context.jsonld      # JSON-LD context for v1
├── v2/                     # Version 2 of the namespace (future)
│   ├── context.jsonld      # JSON-LD context for v2
```

## Current Version
The current version of the namespace is `v1`.

## Hosted URL
The JSON-LD context for `v1` is publicly accessible at: [https://namespaces.originvault.io/v1](https://namespaces.originvault.io/v1)

## Usage in DID Documents
To use this namespace in a DID Document, include it in the `@context` property:

```json
{
  "@context": [
    "https://www.w3.org/ns/did/v1",
    "https://namespaces.originvault.io/v1"
  ],
  "id": "did:originvault:123456789abcdefghi",
  "generationDetails": {
    "timestamp": "2024-11-22T12:34:56.789Z",
    "method": "blake3-hashing"
  }
}
```

## Contributing
We welcome contributions to enhance and expand the OriginVault namespaces. If you have suggestions for new terms, improvements to existing terms, or general feedback, please follow the steps below:

1. **Fork the Repository**: Create a copy of this repository in your GitHub account.
2. **Make Changes**: Update the JSON-LD files or documentation as needed.
3. **Submit a Pull Request**: Open a pull request with a clear explanation of your changes.
4. **Engage in Review**: Be available to discuss and refine your contribution.

### Contribution Guidelines
- Ensure all changes follow the W3C DID and JSON-LD standards.
- Provide meaningful descriptions for any new terms.
- Use version-specific files (`v1`, `v2`, etc.) to maintain backward compatibility.

Thank you for helping improve OriginVault!

## License
This repository is licensed under the [MIT License](LICENSE).
