# DID Method Specification for `did:originvault`

## 1. Abstract
The `did:originvault` method is designed for decentralized identity and credential management within the OriginVault ecosystem. It enables the creation, resolution, updating, and deactivation of DIDs, leveraging OriginVault namespaces, IPFS, Ceramic, and blockchain technology for secure, scalable, and interoperable identity operations.

---

## 2. Introduction
The `did:originvault` method supports a variety of use cases, including:
- Decentralized identity management for individuals, organizations, and assets.
- Integration with OriginVault’s content verification and marking services.
- Compatibility with Verifiable Credentials (VCs) and DIDComm protocols.

Key features include:
- Support for quantum-safe cryptography.
- Anchoring of initial DID creation on IPFS.
- Dynamic updates managed through Ceramic and blockchain anchoring.
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
2. A Ceramic document is created, containing the DID document with metadata such as verification methods and service endpoints.
3. An IPFS record is created to anchor the initial state, containing:
   - The DID.
   - The Ceramic document CID.
   - A cryptographic signature for integrity.
4. The IPFS CID of this record is stored on the blockchain for immutability and trust.

### 4.2 Resolve
- The resolver queries the OriginVault DID registry.
- The initial state is retrieved from the IPFS CID stored on the blockchain for verification.
- Updates and current metadata are resolved via the Ceramic document.

### 4.3 Update
- Updates to a DID document are handled through Ceramic and anchored on the blockchain.
- Changes must be signed using the current authentication keys and follow Ceramic's versioning protocol.

### 4.4 Deactivate
- A DID can be deactivated by the controller using the specified key.
- Deactivation status is anchored on the blockchain, marking the DID as inactive.

---

## 5. DID Document Structure

```json
{
  "@context": [
    "https://www.w3.org/ns/did/v1",
    "https://www.originvault.io/v1"
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
- **IPFS Anchoring**: The initial creation state is stored immutably in IPFS, signed by the DID controller.
- **Dynamic Updates**: Ceramic manages updates with blockchain anchoring to ensure tamper-proof operations.
- **Quantum-Safe Cryptography**: Ensures authentication and key agreements are resistant to future quantum threats.
- **Access Control**: The DID controller has full authority over updates, revocation, and deactivation.

---

## 7. Infrastructure
- **IPFS**: Stores the initial DID creation record, including the Ceramic document CID and signature.
- **Ceramic**: Manages mutable DID document updates with versioning.
- **Blockchain**: Anchors the IPFS CID and Ceramic updates for auditability.
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

### Example IPFS Record
```json
{
  "did": "did:originvault:1234abcd",
  "ceramicCID": "bafy...ceramic",
  "timestamp": "2024-11-22T12:00:00Z",
  "signature": "0x123abc...signature"
}
```

---
