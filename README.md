                         ██████╗ ██████╗ ██╗ ██████╗ ██╗███╗   ██╗██╗   ██╗ █████╗ ██╗   ██╗██╗  ████████╗ 
                        ██╔═══██╗██╔══██╗██║██╔════╝ ██║████╗  ██║██║   ██║██╔══██╗██║   ██║██║  ╚══██╔══╝ 
                        ██║   ██║██████╔╝██║██║  ███╗██║██╔██╗ ██║██║   ██║███████║██║   ██║██║     ██║  
                        ██║   ██║██╔══██╗██║██║   ██║██║██║╚██╗██║╚██╗ ██╔╝██╔══██║██║   ██║██║     ██║ 
                        ╚██████╔╝██║  ██║██║╚██████╔╝██║██║ ╚████║ ╚████╔╝ ██║  ██║╚██████╔╝███████╗██║
                         ╚═════╝ ╚═╝  ╚═╝╚═╝ ╚═════╝ ╚═╝╚═╝  ╚═══╝  ╚═══╝  ╚═╝  ╚═╝ ╚═════╝ ╚══════╝╚═╝   

<div style="width: 100%; display: flex; justify-content: center; align-items: center;">
      <img src="https://gray-objective-tiglon-784.mypinata.cloud/ipfs/Qma7EjPPPfomzEKkYcJa2ctEFPUhHaMwiojTR1wTQPg2x8" alt="OriginVault logo" width="300" height="300">
</div>
<br />
This repository serves as the **drafting and collaboration zone** for schemas intended to be incorporated into the **OriginVault Namespace**. It provides a structured environment for defining, reviewing, and refining JSON-LD schemas before they are pushed to the main OriginVault schema registry. The purpose is to provide a framework for open verifiable types that can be used beyond the OriginVault ecosystem.

## 📦 Installation

```bash
npm install @originvault/ov-types
```


## Purpose
The schema registry enables:
- **Collaboration**: Allows developers and contributors to propose and iterate on schema definitions.
- **Version Control**: Ensures schemas maintain backward compatibility through structured versioning.
- **Interoperability**: Facilitates schema standardization to support third-party system integrations.
- **Review & Approval**: Provides a space for governance and validation before schemas are published.

## Repository Structure
The repository is organized by schema versions:
```
originvault-schema-registry/
├── README.md               # Repository overview
├── drafts/                 # Working drafts for new schemas
│   ├── schema-example.json # Example schema draft
├── v1/                     # Version 1 of approved schemas
│   ├── context.jsonld      # JSON-LD context for v1
├── v2/                     # Version 2 of approved schemas (future)
│   ├── context.jsonld      # JSON-LD context for v2
```

## Current Status
Drafts currently under review can be found in the `drafts/` folder.

## Hosted URL
Once a schema is approved and pushed into the OriginVault namespace, it will be publicly accessible at:
[https://schemas.originvault.box/v1](https://schemas.originvault.box/v1)

## Usage
To use an approved schema, include it in the `@context` property of your JSON-LD data:

```json
{
  "@context": [
    "https://schemas.originvault.box/v1"
  ],
  "type": "CredentialSchema",
  "schema": {
    "name": "ContentCredential",
    "version": "1.0",
    "attributes": [
      { "name": "creator", "type": "string" },
      { "name": "createdAt", "type": "date" },
      { "name": "signature", "type": "string" }
    ]
  }
}
```

## Contributing
We welcome contributions to improve and expand the OriginVault schema registry. If you have suggestions for new schemas, updates to existing ones, or feedback, please follow these steps:

1. **Fork the Repository**: Create a copy in your GitHub account.
2. **Draft a Schema**: Add your proposed schema to the `drafts/` directory.
3. **Submit a Pull Request**: Provide a clear explanation of the schema and its intended use.
4. **Engage in Review**: Be available for discussions and refinements before approval.

### Contribution Guidelines
- Follow **JSON-LD standards** and ensure compliance with OriginVault schema structures.
- Clearly define **attributes, types, and expected behavior** for each schema.
- Place new schemas in the `drafts/` directory until they are reviewed and approved.
- Approved schemas will be moved to the appropriate version folder (`v1`, `v2`, etc.).

Thank you for contributing to the OriginVault schema ecosystem!

## License
This repository is licensed under the [MIT License](LICENSE).
