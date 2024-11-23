
# DID Method Specification for `did:originvault`

## 1. Abstract
The `did:originvault` method is designed for decentralized identity and credential management within the OriginVault ecosystem. It enables the creation, resolution, updating, and deactivation of DIDs, leveraging OriginVault namespaces, IPFS, and blockchain technology for secure, scalable, and interoperable identity operations.

---

## 2. Introduction
The `did:originvault` method supports a variety of use cases, including:
- Decentralized identity management for individuals, organizations, and assets.
- Integration with OriginVault’s content verification and marking services.
- Compatibility with Verifiable Credentials (VCs) and DIDComm protocols.

Key features include:
- Support for quantum-safe cryptography.
- Anchoring of DID documents on IPFS.
- Extensible namespaces for domain-specific schema definitions.

---

## 3. Method-Specific Identifier
The syntax of a `did:originvault` identifier is:

```
did:originvault:<unique-id>
```

- `<unique-id>`: A unique identifier, such as a UUID, hash, or custom namespace-based ID.

### Examples
- `did:originvault:1234abcd`
- `did:originvault:namespaces.mark.5678xyz`

---

## 4. CRUD Operations

### 4.1 Create
1. A new DID is generated using the OriginVault DID service.
2. The DID is anchored on Polygon using OriginVault's DID Registry contract
3. The DID document is constructed and anchored in a Ceramic Document.

### 4.2 Resolve
- The resolver queries the OriginVault DID registry.
- If the DID has associated IPFS metadata, it retrieves the latest CID for verification.

### 4.3 Update
- Updates to a DID document must be signed using the current authentication keys.
- Changes are anchored in the blockchain and propagate to associated systems (e.g., IPFS, Ceramic).

### 4.4 Deactivate
- A DID can be deactivated by the controller using the specified key.
- Deactivation status is anchored on the blockchain, marking the DID as inactive.

---

## 5. DID Document Structure

```json
{
  "@context": [
    "https://www.w3.org/ns/did/v1",
    "https://www.originvault.io/ns/v1"
  ],
  "id": "did:originvault:1234abcd",
  "authentication": [
    {
      "id": "did:originvault:1234abcd#key-1",
      "type": "Ed25519VerificationKey2020",
      "controller": "did:originvault:1234abcd",
      "publicKeyMultibase": "z6Mki1j..."
    }
  ],
  "verificationMethod": [
    {
      "id": "did:originvault:1234abcd#key-2",
      "type": "X25519KeyAgreementKey2020",
      "controller": "did:originvault:1234abcd",
      "publicKeyMultibase": "z6LSks..."
    }
  ],
  "service": [
    {
      "id": "did:originvault:1234abcd#vcService",
      "type": "VerifiableCredentialService",
      "serviceEndpoint": "https://api.originvault.io/vc"
    }
  ]
}
```

---

## 6. Security and Privacy Considerations
- Quantum-safe cryptography is used for authentication.
- Blockchain anchoring ensures immutability and tamper-proof updates.
- The DID controller has full access control, including revocation and deactivation.

---

## 7. Infrastructure
- **Blockchain**: Polygon mainnet anchors all DID operations.
- **Storage**: Metadata is stored in Ceramic.
- **Namespace Service**: Extends functionality with custom schemas (e.g., `mark`, `token`).

---

## 8. Conformance
The `did:originvault` method adheres to the W3C DID Core Specification by:
- Following the DID URL syntax for identifiers.
- Supporting CRUD operations.
- Providing a JSON-LD-based DID document format.

---

## 9. Registry
The `did:originvault` registry is accessible at:

```
https://namespaces.originvault.io/v1
```

---

## 10. Appendix
Additional resources and examples will be made available in the OriginVault developer documentation.
