/**
 * Generated from TrustedIssuer.json
 * Schema: https://schemas.originvault.box/TrustedIssuer
 * DO NOT EDIT MANUALLY - regenerate with npm run generate-types
 */

/**
 * Verifiable Accreditation for trusted issuers within any trust chain, following cheqd DTC patterns for namespace-based trust hierarchies and multi-root architecture.
 */
export interface TrustedIssuerAccreditation {
  /**
   * JSON-LD context for interoperability with verifiable credentials and linked data ecosystems
   */
  "@context": string[];
  /**
   * Credential types following W3C Verifiable Credentials specification
   */
  type: string[];
  issuer: {
    /**
     * DID of the issuing authority - could be any namespace root, platform root, or user root
     */
    id: string;
    /**
     * Name of the issuing authority
     */
    name?: string;
    /**
     * Type of root authority issuing this accreditation
     */
    rootType?: "namespace" | "platform" | "user" | "organization" | "community" | "concept";
  };
  /**
   * When the accreditation was issued
   */
  issuanceDate: string;
  /**
   * When the accreditation expires
   */
  expirationDate?: string;
  credentialSubject: {
    /**
     * DID of the accredited trusted issuer
     */
    id: string;
    /**
     * List of accreditations granted to this issuer
     *
     * @minItems 1
     * @maxItems 20
     */
    accreditedFor:
      | [
          {
            /**
             * Namespace or domain for which the issuer is accredited
             */
            namespaceId: string;
            /**
             * Schema ID for which the issuer is accredited
             */
            schemaId: string;
            /**
             * Credential types the issuer can issue
             *
             * @minItems 1
             * @maxItems 10
             */
            types:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Geographic or regulatory restriction (optional)
             */
            limitJurisdiction?: string;
            /**
             * Expiration date of this specific accreditation
             */
            validUntil?: string;
          }
        ]
      | [
          {
            /**
             * Namespace or domain for which the issuer is accredited
             */
            namespaceId: string;
            /**
             * Schema ID for which the issuer is accredited
             */
            schemaId: string;
            /**
             * Credential types the issuer can issue
             *
             * @minItems 1
             * @maxItems 10
             */
            types:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Geographic or regulatory restriction (optional)
             */
            limitJurisdiction?: string;
            /**
             * Expiration date of this specific accreditation
             */
            validUntil?: string;
          },
          {
            /**
             * Namespace or domain for which the issuer is accredited
             */
            namespaceId: string;
            /**
             * Schema ID for which the issuer is accredited
             */
            schemaId: string;
            /**
             * Credential types the issuer can issue
             *
             * @minItems 1
             * @maxItems 10
             */
            types:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Geographic or regulatory restriction (optional)
             */
            limitJurisdiction?: string;
            /**
             * Expiration date of this specific accreditation
             */
            validUntil?: string;
          }
        ]
      | [
          {
            /**
             * Namespace or domain for which the issuer is accredited
             */
            namespaceId: string;
            /**
             * Schema ID for which the issuer is accredited
             */
            schemaId: string;
            /**
             * Credential types the issuer can issue
             *
             * @minItems 1
             * @maxItems 10
             */
            types:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Geographic or regulatory restriction (optional)
             */
            limitJurisdiction?: string;
            /**
             * Expiration date of this specific accreditation
             */
            validUntil?: string;
          },
          {
            /**
             * Namespace or domain for which the issuer is accredited
             */
            namespaceId: string;
            /**
             * Schema ID for which the issuer is accredited
             */
            schemaId: string;
            /**
             * Credential types the issuer can issue
             *
             * @minItems 1
             * @maxItems 10
             */
            types:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Geographic or regulatory restriction (optional)
             */
            limitJurisdiction?: string;
            /**
             * Expiration date of this specific accreditation
             */
            validUntil?: string;
          },
          {
            /**
             * Namespace or domain for which the issuer is accredited
             */
            namespaceId: string;
            /**
             * Schema ID for which the issuer is accredited
             */
            schemaId: string;
            /**
             * Credential types the issuer can issue
             *
             * @minItems 1
             * @maxItems 10
             */
            types:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Geographic or regulatory restriction (optional)
             */
            limitJurisdiction?: string;
            /**
             * Expiration date of this specific accreditation
             */
            validUntil?: string;
          }
        ]
      | [
          {
            /**
             * Namespace or domain for which the issuer is accredited
             */
            namespaceId: string;
            /**
             * Schema ID for which the issuer is accredited
             */
            schemaId: string;
            /**
             * Credential types the issuer can issue
             *
             * @minItems 1
             * @maxItems 10
             */
            types:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Geographic or regulatory restriction (optional)
             */
            limitJurisdiction?: string;
            /**
             * Expiration date of this specific accreditation
             */
            validUntil?: string;
          },
          {
            /**
             * Namespace or domain for which the issuer is accredited
             */
            namespaceId: string;
            /**
             * Schema ID for which the issuer is accredited
             */
            schemaId: string;
            /**
             * Credential types the issuer can issue
             *
             * @minItems 1
             * @maxItems 10
             */
            types:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Geographic or regulatory restriction (optional)
             */
            limitJurisdiction?: string;
            /**
             * Expiration date of this specific accreditation
             */
            validUntil?: string;
          },
          {
            /**
             * Namespace or domain for which the issuer is accredited
             */
            namespaceId: string;
            /**
             * Schema ID for which the issuer is accredited
             */
            schemaId: string;
            /**
             * Credential types the issuer can issue
             *
             * @minItems 1
             * @maxItems 10
             */
            types:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Geographic or regulatory restriction (optional)
             */
            limitJurisdiction?: string;
            /**
             * Expiration date of this specific accreditation
             */
            validUntil?: string;
          },
          {
            /**
             * Namespace or domain for which the issuer is accredited
             */
            namespaceId: string;
            /**
             * Schema ID for which the issuer is accredited
             */
            schemaId: string;
            /**
             * Credential types the issuer can issue
             *
             * @minItems 1
             * @maxItems 10
             */
            types:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Geographic or regulatory restriction (optional)
             */
            limitJurisdiction?: string;
            /**
             * Expiration date of this specific accreditation
             */
            validUntil?: string;
          }
        ]
      | [
          {
            /**
             * Namespace or domain for which the issuer is accredited
             */
            namespaceId: string;
            /**
             * Schema ID for which the issuer is accredited
             */
            schemaId: string;
            /**
             * Credential types the issuer can issue
             *
             * @minItems 1
             * @maxItems 10
             */
            types:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Geographic or regulatory restriction (optional)
             */
            limitJurisdiction?: string;
            /**
             * Expiration date of this specific accreditation
             */
            validUntil?: string;
          },
          {
            /**
             * Namespace or domain for which the issuer is accredited
             */
            namespaceId: string;
            /**
             * Schema ID for which the issuer is accredited
             */
            schemaId: string;
            /**
             * Credential types the issuer can issue
             *
             * @minItems 1
             * @maxItems 10
             */
            types:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Geographic or regulatory restriction (optional)
             */
            limitJurisdiction?: string;
            /**
             * Expiration date of this specific accreditation
             */
            validUntil?: string;
          },
          {
            /**
             * Namespace or domain for which the issuer is accredited
             */
            namespaceId: string;
            /**
             * Schema ID for which the issuer is accredited
             */
            schemaId: string;
            /**
             * Credential types the issuer can issue
             *
             * @minItems 1
             * @maxItems 10
             */
            types:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Geographic or regulatory restriction (optional)
             */
            limitJurisdiction?: string;
            /**
             * Expiration date of this specific accreditation
             */
            validUntil?: string;
          },
          {
            /**
             * Namespace or domain for which the issuer is accredited
             */
            namespaceId: string;
            /**
             * Schema ID for which the issuer is accredited
             */
            schemaId: string;
            /**
             * Credential types the issuer can issue
             *
             * @minItems 1
             * @maxItems 10
             */
            types:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Geographic or regulatory restriction (optional)
             */
            limitJurisdiction?: string;
            /**
             * Expiration date of this specific accreditation
             */
            validUntil?: string;
          },
          {
            /**
             * Namespace or domain for which the issuer is accredited
             */
            namespaceId: string;
            /**
             * Schema ID for which the issuer is accredited
             */
            schemaId: string;
            /**
             * Credential types the issuer can issue
             *
             * @minItems 1
             * @maxItems 10
             */
            types:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Geographic or regulatory restriction (optional)
             */
            limitJurisdiction?: string;
            /**
             * Expiration date of this specific accreditation
             */
            validUntil?: string;
          }
        ]
      | [
          {
            /**
             * Namespace or domain for which the issuer is accredited
             */
            namespaceId: string;
            /**
             * Schema ID for which the issuer is accredited
             */
            schemaId: string;
            /**
             * Credential types the issuer can issue
             *
             * @minItems 1
             * @maxItems 10
             */
            types:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Geographic or regulatory restriction (optional)
             */
            limitJurisdiction?: string;
            /**
             * Expiration date of this specific accreditation
             */
            validUntil?: string;
          },
          {
            /**
             * Namespace or domain for which the issuer is accredited
             */
            namespaceId: string;
            /**
             * Schema ID for which the issuer is accredited
             */
            schemaId: string;
            /**
             * Credential types the issuer can issue
             *
             * @minItems 1
             * @maxItems 10
             */
            types:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Geographic or regulatory restriction (optional)
             */
            limitJurisdiction?: string;
            /**
             * Expiration date of this specific accreditation
             */
            validUntil?: string;
          },
          {
            /**
             * Namespace or domain for which the issuer is accredited
             */
            namespaceId: string;
            /**
             * Schema ID for which the issuer is accredited
             */
            schemaId: string;
            /**
             * Credential types the issuer can issue
             *
             * @minItems 1
             * @maxItems 10
             */
            types:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Geographic or regulatory restriction (optional)
             */
            limitJurisdiction?: string;
            /**
             * Expiration date of this specific accreditation
             */
            validUntil?: string;
          },
          {
            /**
             * Namespace or domain for which the issuer is accredited
             */
            namespaceId: string;
            /**
             * Schema ID for which the issuer is accredited
             */
            schemaId: string;
            /**
             * Credential types the issuer can issue
             *
             * @minItems 1
             * @maxItems 10
             */
            types:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Geographic or regulatory restriction (optional)
             */
            limitJurisdiction?: string;
            /**
             * Expiration date of this specific accreditation
             */
            validUntil?: string;
          },
          {
            /**
             * Namespace or domain for which the issuer is accredited
             */
            namespaceId: string;
            /**
             * Schema ID for which the issuer is accredited
             */
            schemaId: string;
            /**
             * Credential types the issuer can issue
             *
             * @minItems 1
             * @maxItems 10
             */
            types:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Geographic or regulatory restriction (optional)
             */
            limitJurisdiction?: string;
            /**
             * Expiration date of this specific accreditation
             */
            validUntil?: string;
          },
          {
            /**
             * Namespace or domain for which the issuer is accredited
             */
            namespaceId: string;
            /**
             * Schema ID for which the issuer is accredited
             */
            schemaId: string;
            /**
             * Credential types the issuer can issue
             *
             * @minItems 1
             * @maxItems 10
             */
            types:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Geographic or regulatory restriction (optional)
             */
            limitJurisdiction?: string;
            /**
             * Expiration date of this specific accreditation
             */
            validUntil?: string;
          }
        ]
      | [
          {
            /**
             * Namespace or domain for which the issuer is accredited
             */
            namespaceId: string;
            /**
             * Schema ID for which the issuer is accredited
             */
            schemaId: string;
            /**
             * Credential types the issuer can issue
             *
             * @minItems 1
             * @maxItems 10
             */
            types:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Geographic or regulatory restriction (optional)
             */
            limitJurisdiction?: string;
            /**
             * Expiration date of this specific accreditation
             */
            validUntil?: string;
          },
          {
            /**
             * Namespace or domain for which the issuer is accredited
             */
            namespaceId: string;
            /**
             * Schema ID for which the issuer is accredited
             */
            schemaId: string;
            /**
             * Credential types the issuer can issue
             *
             * @minItems 1
             * @maxItems 10
             */
            types:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Geographic or regulatory restriction (optional)
             */
            limitJurisdiction?: string;
            /**
             * Expiration date of this specific accreditation
             */
            validUntil?: string;
          },
          {
            /**
             * Namespace or domain for which the issuer is accredited
             */
            namespaceId: string;
            /**
             * Schema ID for which the issuer is accredited
             */
            schemaId: string;
            /**
             * Credential types the issuer can issue
             *
             * @minItems 1
             * @maxItems 10
             */
            types:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Geographic or regulatory restriction (optional)
             */
            limitJurisdiction?: string;
            /**
             * Expiration date of this specific accreditation
             */
            validUntil?: string;
          },
          {
            /**
             * Namespace or domain for which the issuer is accredited
             */
            namespaceId: string;
            /**
             * Schema ID for which the issuer is accredited
             */
            schemaId: string;
            /**
             * Credential types the issuer can issue
             *
             * @minItems 1
             * @maxItems 10
             */
            types:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Geographic or regulatory restriction (optional)
             */
            limitJurisdiction?: string;
            /**
             * Expiration date of this specific accreditation
             */
            validUntil?: string;
          },
          {
            /**
             * Namespace or domain for which the issuer is accredited
             */
            namespaceId: string;
            /**
             * Schema ID for which the issuer is accredited
             */
            schemaId: string;
            /**
             * Credential types the issuer can issue
             *
             * @minItems 1
             * @maxItems 10
             */
            types:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Geographic or regulatory restriction (optional)
             */
            limitJurisdiction?: string;
            /**
             * Expiration date of this specific accreditation
             */
            validUntil?: string;
          },
          {
            /**
             * Namespace or domain for which the issuer is accredited
             */
            namespaceId: string;
            /**
             * Schema ID for which the issuer is accredited
             */
            schemaId: string;
            /**
             * Credential types the issuer can issue
             *
             * @minItems 1
             * @maxItems 10
             */
            types:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Geographic or regulatory restriction (optional)
             */
            limitJurisdiction?: string;
            /**
             * Expiration date of this specific accreditation
             */
            validUntil?: string;
          },
          {
            /**
             * Namespace or domain for which the issuer is accredited
             */
            namespaceId: string;
            /**
             * Schema ID for which the issuer is accredited
             */
            schemaId: string;
            /**
             * Credential types the issuer can issue
             *
             * @minItems 1
             * @maxItems 10
             */
            types:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Geographic or regulatory restriction (optional)
             */
            limitJurisdiction?: string;
            /**
             * Expiration date of this specific accreditation
             */
            validUntil?: string;
          }
        ]
      | [
          {
            /**
             * Namespace or domain for which the issuer is accredited
             */
            namespaceId: string;
            /**
             * Schema ID for which the issuer is accredited
             */
            schemaId: string;
            /**
             * Credential types the issuer can issue
             *
             * @minItems 1
             * @maxItems 10
             */
            types:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Geographic or regulatory restriction (optional)
             */
            limitJurisdiction?: string;
            /**
             * Expiration date of this specific accreditation
             */
            validUntil?: string;
          },
          {
            /**
             * Namespace or domain for which the issuer is accredited
             */
            namespaceId: string;
            /**
             * Schema ID for which the issuer is accredited
             */
            schemaId: string;
            /**
             * Credential types the issuer can issue
             *
             * @minItems 1
             * @maxItems 10
             */
            types:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Geographic or regulatory restriction (optional)
             */
            limitJurisdiction?: string;
            /**
             * Expiration date of this specific accreditation
             */
            validUntil?: string;
          },
          {
            /**
             * Namespace or domain for which the issuer is accredited
             */
            namespaceId: string;
            /**
             * Schema ID for which the issuer is accredited
             */
            schemaId: string;
            /**
             * Credential types the issuer can issue
             *
             * @minItems 1
             * @maxItems 10
             */
            types:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Geographic or regulatory restriction (optional)
             */
            limitJurisdiction?: string;
            /**
             * Expiration date of this specific accreditation
             */
            validUntil?: string;
          },
          {
            /**
             * Namespace or domain for which the issuer is accredited
             */
            namespaceId: string;
            /**
             * Schema ID for which the issuer is accredited
             */
            schemaId: string;
            /**
             * Credential types the issuer can issue
             *
             * @minItems 1
             * @maxItems 10
             */
            types:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Geographic or regulatory restriction (optional)
             */
            limitJurisdiction?: string;
            /**
             * Expiration date of this specific accreditation
             */
            validUntil?: string;
          },
          {
            /**
             * Namespace or domain for which the issuer is accredited
             */
            namespaceId: string;
            /**
             * Schema ID for which the issuer is accredited
             */
            schemaId: string;
            /**
             * Credential types the issuer can issue
             *
             * @minItems 1
             * @maxItems 10
             */
            types:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Geographic or regulatory restriction (optional)
             */
            limitJurisdiction?: string;
            /**
             * Expiration date of this specific accreditation
             */
            validUntil?: string;
          },
          {
            /**
             * Namespace or domain for which the issuer is accredited
             */
            namespaceId: string;
            /**
             * Schema ID for which the issuer is accredited
             */
            schemaId: string;
            /**
             * Credential types the issuer can issue
             *
             * @minItems 1
             * @maxItems 10
             */
            types:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Geographic or regulatory restriction (optional)
             */
            limitJurisdiction?: string;
            /**
             * Expiration date of this specific accreditation
             */
            validUntil?: string;
          },
          {
            /**
             * Namespace or domain for which the issuer is accredited
             */
            namespaceId: string;
            /**
             * Schema ID for which the issuer is accredited
             */
            schemaId: string;
            /**
             * Credential types the issuer can issue
             *
             * @minItems 1
             * @maxItems 10
             */
            types:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Geographic or regulatory restriction (optional)
             */
            limitJurisdiction?: string;
            /**
             * Expiration date of this specific accreditation
             */
            validUntil?: string;
          },
          {
            /**
             * Namespace or domain for which the issuer is accredited
             */
            namespaceId: string;
            /**
             * Schema ID for which the issuer is accredited
             */
            schemaId: string;
            /**
             * Credential types the issuer can issue
             *
             * @minItems 1
             * @maxItems 10
             */
            types:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Geographic or regulatory restriction (optional)
             */
            limitJurisdiction?: string;
            /**
             * Expiration date of this specific accreditation
             */
            validUntil?: string;
          }
        ]
      | [
          {
            /**
             * Namespace or domain for which the issuer is accredited
             */
            namespaceId: string;
            /**
             * Schema ID for which the issuer is accredited
             */
            schemaId: string;
            /**
             * Credential types the issuer can issue
             *
             * @minItems 1
             * @maxItems 10
             */
            types:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Geographic or regulatory restriction (optional)
             */
            limitJurisdiction?: string;
            /**
             * Expiration date of this specific accreditation
             */
            validUntil?: string;
          },
          {
            /**
             * Namespace or domain for which the issuer is accredited
             */
            namespaceId: string;
            /**
             * Schema ID for which the issuer is accredited
             */
            schemaId: string;
            /**
             * Credential types the issuer can issue
             *
             * @minItems 1
             * @maxItems 10
             */
            types:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Geographic or regulatory restriction (optional)
             */
            limitJurisdiction?: string;
            /**
             * Expiration date of this specific accreditation
             */
            validUntil?: string;
          },
          {
            /**
             * Namespace or domain for which the issuer is accredited
             */
            namespaceId: string;
            /**
             * Schema ID for which the issuer is accredited
             */
            schemaId: string;
            /**
             * Credential types the issuer can issue
             *
             * @minItems 1
             * @maxItems 10
             */
            types:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Geographic or regulatory restriction (optional)
             */
            limitJurisdiction?: string;
            /**
             * Expiration date of this specific accreditation
             */
            validUntil?: string;
          },
          {
            /**
             * Namespace or domain for which the issuer is accredited
             */
            namespaceId: string;
            /**
             * Schema ID for which the issuer is accredited
             */
            schemaId: string;
            /**
             * Credential types the issuer can issue
             *
             * @minItems 1
             * @maxItems 10
             */
            types:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Geographic or regulatory restriction (optional)
             */
            limitJurisdiction?: string;
            /**
             * Expiration date of this specific accreditation
             */
            validUntil?: string;
          },
          {
            /**
             * Namespace or domain for which the issuer is accredited
             */
            namespaceId: string;
            /**
             * Schema ID for which the issuer is accredited
             */
            schemaId: string;
            /**
             * Credential types the issuer can issue
             *
             * @minItems 1
             * @maxItems 10
             */
            types:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Geographic or regulatory restriction (optional)
             */
            limitJurisdiction?: string;
            /**
             * Expiration date of this specific accreditation
             */
            validUntil?: string;
          },
          {
            /**
             * Namespace or domain for which the issuer is accredited
             */
            namespaceId: string;
            /**
             * Schema ID for which the issuer is accredited
             */
            schemaId: string;
            /**
             * Credential types the issuer can issue
             *
             * @minItems 1
             * @maxItems 10
             */
            types:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Geographic or regulatory restriction (optional)
             */
            limitJurisdiction?: string;
            /**
             * Expiration date of this specific accreditation
             */
            validUntil?: string;
          },
          {
            /**
             * Namespace or domain for which the issuer is accredited
             */
            namespaceId: string;
            /**
             * Schema ID for which the issuer is accredited
             */
            schemaId: string;
            /**
             * Credential types the issuer can issue
             *
             * @minItems 1
             * @maxItems 10
             */
            types:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Geographic or regulatory restriction (optional)
             */
            limitJurisdiction?: string;
            /**
             * Expiration date of this specific accreditation
             */
            validUntil?: string;
          },
          {
            /**
             * Namespace or domain for which the issuer is accredited
             */
            namespaceId: string;
            /**
             * Schema ID for which the issuer is accredited
             */
            schemaId: string;
            /**
             * Credential types the issuer can issue
             *
             * @minItems 1
             * @maxItems 10
             */
            types:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Geographic or regulatory restriction (optional)
             */
            limitJurisdiction?: string;
            /**
             * Expiration date of this specific accreditation
             */
            validUntil?: string;
          },
          {
            /**
             * Namespace or domain for which the issuer is accredited
             */
            namespaceId: string;
            /**
             * Schema ID for which the issuer is accredited
             */
            schemaId: string;
            /**
             * Credential types the issuer can issue
             *
             * @minItems 1
             * @maxItems 10
             */
            types:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Geographic or regulatory restriction (optional)
             */
            limitJurisdiction?: string;
            /**
             * Expiration date of this specific accreditation
             */
            validUntil?: string;
          }
        ]
      | [
          {
            /**
             * Namespace or domain for which the issuer is accredited
             */
            namespaceId: string;
            /**
             * Schema ID for which the issuer is accredited
             */
            schemaId: string;
            /**
             * Credential types the issuer can issue
             *
             * @minItems 1
             * @maxItems 10
             */
            types:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Geographic or regulatory restriction (optional)
             */
            limitJurisdiction?: string;
            /**
             * Expiration date of this specific accreditation
             */
            validUntil?: string;
          },
          {
            /**
             * Namespace or domain for which the issuer is accredited
             */
            namespaceId: string;
            /**
             * Schema ID for which the issuer is accredited
             */
            schemaId: string;
            /**
             * Credential types the issuer can issue
             *
             * @minItems 1
             * @maxItems 10
             */
            types:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Geographic or regulatory restriction (optional)
             */
            limitJurisdiction?: string;
            /**
             * Expiration date of this specific accreditation
             */
            validUntil?: string;
          },
          {
            /**
             * Namespace or domain for which the issuer is accredited
             */
            namespaceId: string;
            /**
             * Schema ID for which the issuer is accredited
             */
            schemaId: string;
            /**
             * Credential types the issuer can issue
             *
             * @minItems 1
             * @maxItems 10
             */
            types:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Geographic or regulatory restriction (optional)
             */
            limitJurisdiction?: string;
            /**
             * Expiration date of this specific accreditation
             */
            validUntil?: string;
          },
          {
            /**
             * Namespace or domain for which the issuer is accredited
             */
            namespaceId: string;
            /**
             * Schema ID for which the issuer is accredited
             */
            schemaId: string;
            /**
             * Credential types the issuer can issue
             *
             * @minItems 1
             * @maxItems 10
             */
            types:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Geographic or regulatory restriction (optional)
             */
            limitJurisdiction?: string;
            /**
             * Expiration date of this specific accreditation
             */
            validUntil?: string;
          },
          {
            /**
             * Namespace or domain for which the issuer is accredited
             */
            namespaceId: string;
            /**
             * Schema ID for which the issuer is accredited
             */
            schemaId: string;
            /**
             * Credential types the issuer can issue
             *
             * @minItems 1
             * @maxItems 10
             */
            types:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Geographic or regulatory restriction (optional)
             */
            limitJurisdiction?: string;
            /**
             * Expiration date of this specific accreditation
             */
            validUntil?: string;
          },
          {
            /**
             * Namespace or domain for which the issuer is accredited
             */
            namespaceId: string;
            /**
             * Schema ID for which the issuer is accredited
             */
            schemaId: string;
            /**
             * Credential types the issuer can issue
             *
             * @minItems 1
             * @maxItems 10
             */
            types:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Geographic or regulatory restriction (optional)
             */
            limitJurisdiction?: string;
            /**
             * Expiration date of this specific accreditation
             */
            validUntil?: string;
          },
          {
            /**
             * Namespace or domain for which the issuer is accredited
             */
            namespaceId: string;
            /**
             * Schema ID for which the issuer is accredited
             */
            schemaId: string;
            /**
             * Credential types the issuer can issue
             *
             * @minItems 1
             * @maxItems 10
             */
            types:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Geographic or regulatory restriction (optional)
             */
            limitJurisdiction?: string;
            /**
             * Expiration date of this specific accreditation
             */
            validUntil?: string;
          },
          {
            /**
             * Namespace or domain for which the issuer is accredited
             */
            namespaceId: string;
            /**
             * Schema ID for which the issuer is accredited
             */
            schemaId: string;
            /**
             * Credential types the issuer can issue
             *
             * @minItems 1
             * @maxItems 10
             */
            types:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Geographic or regulatory restriction (optional)
             */
            limitJurisdiction?: string;
            /**
             * Expiration date of this specific accreditation
             */
            validUntil?: string;
          },
          {
            /**
             * Namespace or domain for which the issuer is accredited
             */
            namespaceId: string;
            /**
             * Schema ID for which the issuer is accredited
             */
            schemaId: string;
            /**
             * Credential types the issuer can issue
             *
             * @minItems 1
             * @maxItems 10
             */
            types:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Geographic or regulatory restriction (optional)
             */
            limitJurisdiction?: string;
            /**
             * Expiration date of this specific accreditation
             */
            validUntil?: string;
          },
          {
            /**
             * Namespace or domain for which the issuer is accredited
             */
            namespaceId: string;
            /**
             * Schema ID for which the issuer is accredited
             */
            schemaId: string;
            /**
             * Credential types the issuer can issue
             *
             * @minItems 1
             * @maxItems 10
             */
            types:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Geographic or regulatory restriction (optional)
             */
            limitJurisdiction?: string;
            /**
             * Expiration date of this specific accreditation
             */
            validUntil?: string;
          }
        ]
      | [
          {
            /**
             * Namespace or domain for which the issuer is accredited
             */
            namespaceId: string;
            /**
             * Schema ID for which the issuer is accredited
             */
            schemaId: string;
            /**
             * Credential types the issuer can issue
             *
             * @minItems 1
             * @maxItems 10
             */
            types:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Geographic or regulatory restriction (optional)
             */
            limitJurisdiction?: string;
            /**
             * Expiration date of this specific accreditation
             */
            validUntil?: string;
          },
          {
            /**
             * Namespace or domain for which the issuer is accredited
             */
            namespaceId: string;
            /**
             * Schema ID for which the issuer is accredited
             */
            schemaId: string;
            /**
             * Credential types the issuer can issue
             *
             * @minItems 1
             * @maxItems 10
             */
            types:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Geographic or regulatory restriction (optional)
             */
            limitJurisdiction?: string;
            /**
             * Expiration date of this specific accreditation
             */
            validUntil?: string;
          },
          {
            /**
             * Namespace or domain for which the issuer is accredited
             */
            namespaceId: string;
            /**
             * Schema ID for which the issuer is accredited
             */
            schemaId: string;
            /**
             * Credential types the issuer can issue
             *
             * @minItems 1
             * @maxItems 10
             */
            types:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Geographic or regulatory restriction (optional)
             */
            limitJurisdiction?: string;
            /**
             * Expiration date of this specific accreditation
             */
            validUntil?: string;
          },
          {
            /**
             * Namespace or domain for which the issuer is accredited
             */
            namespaceId: string;
            /**
             * Schema ID for which the issuer is accredited
             */
            schemaId: string;
            /**
             * Credential types the issuer can issue
             *
             * @minItems 1
             * @maxItems 10
             */
            types:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Geographic or regulatory restriction (optional)
             */
            limitJurisdiction?: string;
            /**
             * Expiration date of this specific accreditation
             */
            validUntil?: string;
          },
          {
            /**
             * Namespace or domain for which the issuer is accredited
             */
            namespaceId: string;
            /**
             * Schema ID for which the issuer is accredited
             */
            schemaId: string;
            /**
             * Credential types the issuer can issue
             *
             * @minItems 1
             * @maxItems 10
             */
            types:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Geographic or regulatory restriction (optional)
             */
            limitJurisdiction?: string;
            /**
             * Expiration date of this specific accreditation
             */
            validUntil?: string;
          },
          {
            /**
             * Namespace or domain for which the issuer is accredited
             */
            namespaceId: string;
            /**
             * Schema ID for which the issuer is accredited
             */
            schemaId: string;
            /**
             * Credential types the issuer can issue
             *
             * @minItems 1
             * @maxItems 10
             */
            types:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Geographic or regulatory restriction (optional)
             */
            limitJurisdiction?: string;
            /**
             * Expiration date of this specific accreditation
             */
            validUntil?: string;
          },
          {
            /**
             * Namespace or domain for which the issuer is accredited
             */
            namespaceId: string;
            /**
             * Schema ID for which the issuer is accredited
             */
            schemaId: string;
            /**
             * Credential types the issuer can issue
             *
             * @minItems 1
             * @maxItems 10
             */
            types:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Geographic or regulatory restriction (optional)
             */
            limitJurisdiction?: string;
            /**
             * Expiration date of this specific accreditation
             */
            validUntil?: string;
          },
          {
            /**
             * Namespace or domain for which the issuer is accredited
             */
            namespaceId: string;
            /**
             * Schema ID for which the issuer is accredited
             */
            schemaId: string;
            /**
             * Credential types the issuer can issue
             *
             * @minItems 1
             * @maxItems 10
             */
            types:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Geographic or regulatory restriction (optional)
             */
            limitJurisdiction?: string;
            /**
             * Expiration date of this specific accreditation
             */
            validUntil?: string;
          },
          {
            /**
             * Namespace or domain for which the issuer is accredited
             */
            namespaceId: string;
            /**
             * Schema ID for which the issuer is accredited
             */
            schemaId: string;
            /**
             * Credential types the issuer can issue
             *
             * @minItems 1
             * @maxItems 10
             */
            types:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Geographic or regulatory restriction (optional)
             */
            limitJurisdiction?: string;
            /**
             * Expiration date of this specific accreditation
             */
            validUntil?: string;
          },
          {
            /**
             * Namespace or domain for which the issuer is accredited
             */
            namespaceId: string;
            /**
             * Schema ID for which the issuer is accredited
             */
            schemaId: string;
            /**
             * Credential types the issuer can issue
             *
             * @minItems 1
             * @maxItems 10
             */
            types:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Geographic or regulatory restriction (optional)
             */
            limitJurisdiction?: string;
            /**
             * Expiration date of this specific accreditation
             */
            validUntil?: string;
          },
          {
            /**
             * Namespace or domain for which the issuer is accredited
             */
            namespaceId: string;
            /**
             * Schema ID for which the issuer is accredited
             */
            schemaId: string;
            /**
             * Credential types the issuer can issue
             *
             * @minItems 1
             * @maxItems 10
             */
            types:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Geographic or regulatory restriction (optional)
             */
            limitJurisdiction?: string;
            /**
             * Expiration date of this specific accreditation
             */
            validUntil?: string;
          }
        ]
      | [
          {
            /**
             * Namespace or domain for which the issuer is accredited
             */
            namespaceId: string;
            /**
             * Schema ID for which the issuer is accredited
             */
            schemaId: string;
            /**
             * Credential types the issuer can issue
             *
             * @minItems 1
             * @maxItems 10
             */
            types:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Geographic or regulatory restriction (optional)
             */
            limitJurisdiction?: string;
            /**
             * Expiration date of this specific accreditation
             */
            validUntil?: string;
          },
          {
            /**
             * Namespace or domain for which the issuer is accredited
             */
            namespaceId: string;
            /**
             * Schema ID for which the issuer is accredited
             */
            schemaId: string;
            /**
             * Credential types the issuer can issue
             *
             * @minItems 1
             * @maxItems 10
             */
            types:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Geographic or regulatory restriction (optional)
             */
            limitJurisdiction?: string;
            /**
             * Expiration date of this specific accreditation
             */
            validUntil?: string;
          },
          {
            /**
             * Namespace or domain for which the issuer is accredited
             */
            namespaceId: string;
            /**
             * Schema ID for which the issuer is accredited
             */
            schemaId: string;
            /**
             * Credential types the issuer can issue
             *
             * @minItems 1
             * @maxItems 10
             */
            types:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Geographic or regulatory restriction (optional)
             */
            limitJurisdiction?: string;
            /**
             * Expiration date of this specific accreditation
             */
            validUntil?: string;
          },
          {
            /**
             * Namespace or domain for which the issuer is accredited
             */
            namespaceId: string;
            /**
             * Schema ID for which the issuer is accredited
             */
            schemaId: string;
            /**
             * Credential types the issuer can issue
             *
             * @minItems 1
             * @maxItems 10
             */
            types:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Geographic or regulatory restriction (optional)
             */
            limitJurisdiction?: string;
            /**
             * Expiration date of this specific accreditation
             */
            validUntil?: string;
          },
          {
            /**
             * Namespace or domain for which the issuer is accredited
             */
            namespaceId: string;
            /**
             * Schema ID for which the issuer is accredited
             */
            schemaId: string;
            /**
             * Credential types the issuer can issue
             *
             * @minItems 1
             * @maxItems 10
             */
            types:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Geographic or regulatory restriction (optional)
             */
            limitJurisdiction?: string;
            /**
             * Expiration date of this specific accreditation
             */
            validUntil?: string;
          },
          {
            /**
             * Namespace or domain for which the issuer is accredited
             */
            namespaceId: string;
            /**
             * Schema ID for which the issuer is accredited
             */
            schemaId: string;
            /**
             * Credential types the issuer can issue
             *
             * @minItems 1
             * @maxItems 10
             */
            types:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Geographic or regulatory restriction (optional)
             */
            limitJurisdiction?: string;
            /**
             * Expiration date of this specific accreditation
             */
            validUntil?: string;
          },
          {
            /**
             * Namespace or domain for which the issuer is accredited
             */
            namespaceId: string;
            /**
             * Schema ID for which the issuer is accredited
             */
            schemaId: string;
            /**
             * Credential types the issuer can issue
             *
             * @minItems 1
             * @maxItems 10
             */
            types:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Geographic or regulatory restriction (optional)
             */
            limitJurisdiction?: string;
            /**
             * Expiration date of this specific accreditation
             */
            validUntil?: string;
          },
          {
            /**
             * Namespace or domain for which the issuer is accredited
             */
            namespaceId: string;
            /**
             * Schema ID for which the issuer is accredited
             */
            schemaId: string;
            /**
             * Credential types the issuer can issue
             *
             * @minItems 1
             * @maxItems 10
             */
            types:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Geographic or regulatory restriction (optional)
             */
            limitJurisdiction?: string;
            /**
             * Expiration date of this specific accreditation
             */
            validUntil?: string;
          },
          {
            /**
             * Namespace or domain for which the issuer is accredited
             */
            namespaceId: string;
            /**
             * Schema ID for which the issuer is accredited
             */
            schemaId: string;
            /**
             * Credential types the issuer can issue
             *
             * @minItems 1
             * @maxItems 10
             */
            types:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Geographic or regulatory restriction (optional)
             */
            limitJurisdiction?: string;
            /**
             * Expiration date of this specific accreditation
             */
            validUntil?: string;
          },
          {
            /**
             * Namespace or domain for which the issuer is accredited
             */
            namespaceId: string;
            /**
             * Schema ID for which the issuer is accredited
             */
            schemaId: string;
            /**
             * Credential types the issuer can issue
             *
             * @minItems 1
             * @maxItems 10
             */
            types:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Geographic or regulatory restriction (optional)
             */
            limitJurisdiction?: string;
            /**
             * Expiration date of this specific accreditation
             */
            validUntil?: string;
          },
          {
            /**
             * Namespace or domain for which the issuer is accredited
             */
            namespaceId: string;
            /**
             * Schema ID for which the issuer is accredited
             */
            schemaId: string;
            /**
             * Credential types the issuer can issue
             *
             * @minItems 1
             * @maxItems 10
             */
            types:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Geographic or regulatory restriction (optional)
             */
            limitJurisdiction?: string;
            /**
             * Expiration date of this specific accreditation
             */
            validUntil?: string;
          },
          {
            /**
             * Namespace or domain for which the issuer is accredited
             */
            namespaceId: string;
            /**
             * Schema ID for which the issuer is accredited
             */
            schemaId: string;
            /**
             * Credential types the issuer can issue
             *
             * @minItems 1
             * @maxItems 10
             */
            types:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Geographic or regulatory restriction (optional)
             */
            limitJurisdiction?: string;
            /**
             * Expiration date of this specific accreditation
             */
            validUntil?: string;
          }
        ]
      | [
          {
            /**
             * Namespace or domain for which the issuer is accredited
             */
            namespaceId: string;
            /**
             * Schema ID for which the issuer is accredited
             */
            schemaId: string;
            /**
             * Credential types the issuer can issue
             *
             * @minItems 1
             * @maxItems 10
             */
            types:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Geographic or regulatory restriction (optional)
             */
            limitJurisdiction?: string;
            /**
             * Expiration date of this specific accreditation
             */
            validUntil?: string;
          },
          {
            /**
             * Namespace or domain for which the issuer is accredited
             */
            namespaceId: string;
            /**
             * Schema ID for which the issuer is accredited
             */
            schemaId: string;
            /**
             * Credential types the issuer can issue
             *
             * @minItems 1
             * @maxItems 10
             */
            types:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Geographic or regulatory restriction (optional)
             */
            limitJurisdiction?: string;
            /**
             * Expiration date of this specific accreditation
             */
            validUntil?: string;
          },
          {
            /**
             * Namespace or domain for which the issuer is accredited
             */
            namespaceId: string;
            /**
             * Schema ID for which the issuer is accredited
             */
            schemaId: string;
            /**
             * Credential types the issuer can issue
             *
             * @minItems 1
             * @maxItems 10
             */
            types:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Geographic or regulatory restriction (optional)
             */
            limitJurisdiction?: string;
            /**
             * Expiration date of this specific accreditation
             */
            validUntil?: string;
          },
          {
            /**
             * Namespace or domain for which the issuer is accredited
             */
            namespaceId: string;
            /**
             * Schema ID for which the issuer is accredited
             */
            schemaId: string;
            /**
             * Credential types the issuer can issue
             *
             * @minItems 1
             * @maxItems 10
             */
            types:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Geographic or regulatory restriction (optional)
             */
            limitJurisdiction?: string;
            /**
             * Expiration date of this specific accreditation
             */
            validUntil?: string;
          },
          {
            /**
             * Namespace or domain for which the issuer is accredited
             */
            namespaceId: string;
            /**
             * Schema ID for which the issuer is accredited
             */
            schemaId: string;
            /**
             * Credential types the issuer can issue
             *
             * @minItems 1
             * @maxItems 10
             */
            types:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Geographic or regulatory restriction (optional)
             */
            limitJurisdiction?: string;
            /**
             * Expiration date of this specific accreditation
             */
            validUntil?: string;
          },
          {
            /**
             * Namespace or domain for which the issuer is accredited
             */
            namespaceId: string;
            /**
             * Schema ID for which the issuer is accredited
             */
            schemaId: string;
            /**
             * Credential types the issuer can issue
             *
             * @minItems 1
             * @maxItems 10
             */
            types:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Geographic or regulatory restriction (optional)
             */
            limitJurisdiction?: string;
            /**
             * Expiration date of this specific accreditation
             */
            validUntil?: string;
          },
          {
            /**
             * Namespace or domain for which the issuer is accredited
             */
            namespaceId: string;
            /**
             * Schema ID for which the issuer is accredited
             */
            schemaId: string;
            /**
             * Credential types the issuer can issue
             *
             * @minItems 1
             * @maxItems 10
             */
            types:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Geographic or regulatory restriction (optional)
             */
            limitJurisdiction?: string;
            /**
             * Expiration date of this specific accreditation
             */
            validUntil?: string;
          },
          {
            /**
             * Namespace or domain for which the issuer is accredited
             */
            namespaceId: string;
            /**
             * Schema ID for which the issuer is accredited
             */
            schemaId: string;
            /**
             * Credential types the issuer can issue
             *
             * @minItems 1
             * @maxItems 10
             */
            types:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Geographic or regulatory restriction (optional)
             */
            limitJurisdiction?: string;
            /**
             * Expiration date of this specific accreditation
             */
            validUntil?: string;
          },
          {
            /**
             * Namespace or domain for which the issuer is accredited
             */
            namespaceId: string;
            /**
             * Schema ID for which the issuer is accredited
             */
            schemaId: string;
            /**
             * Credential types the issuer can issue
             *
             * @minItems 1
             * @maxItems 10
             */
            types:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Geographic or regulatory restriction (optional)
             */
            limitJurisdiction?: string;
            /**
             * Expiration date of this specific accreditation
             */
            validUntil?: string;
          },
          {
            /**
             * Namespace or domain for which the issuer is accredited
             */
            namespaceId: string;
            /**
             * Schema ID for which the issuer is accredited
             */
            schemaId: string;
            /**
             * Credential types the issuer can issue
             *
             * @minItems 1
             * @maxItems 10
             */
            types:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Geographic or regulatory restriction (optional)
             */
            limitJurisdiction?: string;
            /**
             * Expiration date of this specific accreditation
             */
            validUntil?: string;
          },
          {
            /**
             * Namespace or domain for which the issuer is accredited
             */
            namespaceId: string;
            /**
             * Schema ID for which the issuer is accredited
             */
            schemaId: string;
            /**
             * Credential types the issuer can issue
             *
             * @minItems 1
             * @maxItems 10
             */
            types:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Geographic or regulatory restriction (optional)
             */
            limitJurisdiction?: string;
            /**
             * Expiration date of this specific accreditation
             */
            validUntil?: string;
          },
          {
            /**
             * Namespace or domain for which the issuer is accredited
             */
            namespaceId: string;
            /**
             * Schema ID for which the issuer is accredited
             */
            schemaId: string;
            /**
             * Credential types the issuer can issue
             *
             * @minItems 1
             * @maxItems 10
             */
            types:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Geographic or regulatory restriction (optional)
             */
            limitJurisdiction?: string;
            /**
             * Expiration date of this specific accreditation
             */
            validUntil?: string;
          },
          {
            /**
             * Namespace or domain for which the issuer is accredited
             */
            namespaceId: string;
            /**
             * Schema ID for which the issuer is accredited
             */
            schemaId: string;
            /**
             * Credential types the issuer can issue
             *
             * @minItems 1
             * @maxItems 10
             */
            types:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Geographic or regulatory restriction (optional)
             */
            limitJurisdiction?: string;
            /**
             * Expiration date of this specific accreditation
             */
            validUntil?: string;
          }
        ]
      | [
          {
            /**
             * Namespace or domain for which the issuer is accredited
             */
            namespaceId: string;
            /**
             * Schema ID for which the issuer is accredited
             */
            schemaId: string;
            /**
             * Credential types the issuer can issue
             *
             * @minItems 1
             * @maxItems 10
             */
            types:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Geographic or regulatory restriction (optional)
             */
            limitJurisdiction?: string;
            /**
             * Expiration date of this specific accreditation
             */
            validUntil?: string;
          },
          {
            /**
             * Namespace or domain for which the issuer is accredited
             */
            namespaceId: string;
            /**
             * Schema ID for which the issuer is accredited
             */
            schemaId: string;
            /**
             * Credential types the issuer can issue
             *
             * @minItems 1
             * @maxItems 10
             */
            types:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Geographic or regulatory restriction (optional)
             */
            limitJurisdiction?: string;
            /**
             * Expiration date of this specific accreditation
             */
            validUntil?: string;
          },
          {
            /**
             * Namespace or domain for which the issuer is accredited
             */
            namespaceId: string;
            /**
             * Schema ID for which the issuer is accredited
             */
            schemaId: string;
            /**
             * Credential types the issuer can issue
             *
             * @minItems 1
             * @maxItems 10
             */
            types:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Geographic or regulatory restriction (optional)
             */
            limitJurisdiction?: string;
            /**
             * Expiration date of this specific accreditation
             */
            validUntil?: string;
          },
          {
            /**
             * Namespace or domain for which the issuer is accredited
             */
            namespaceId: string;
            /**
             * Schema ID for which the issuer is accredited
             */
            schemaId: string;
            /**
             * Credential types the issuer can issue
             *
             * @minItems 1
             * @maxItems 10
             */
            types:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Geographic or regulatory restriction (optional)
             */
            limitJurisdiction?: string;
            /**
             * Expiration date of this specific accreditation
             */
            validUntil?: string;
          },
          {
            /**
             * Namespace or domain for which the issuer is accredited
             */
            namespaceId: string;
            /**
             * Schema ID for which the issuer is accredited
             */
            schemaId: string;
            /**
             * Credential types the issuer can issue
             *
             * @minItems 1
             * @maxItems 10
             */
            types:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Geographic or regulatory restriction (optional)
             */
            limitJurisdiction?: string;
            /**
             * Expiration date of this specific accreditation
             */
            validUntil?: string;
          },
          {
            /**
             * Namespace or domain for which the issuer is accredited
             */
            namespaceId: string;
            /**
             * Schema ID for which the issuer is accredited
             */
            schemaId: string;
            /**
             * Credential types the issuer can issue
             *
             * @minItems 1
             * @maxItems 10
             */
            types:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Geographic or regulatory restriction (optional)
             */
            limitJurisdiction?: string;
            /**
             * Expiration date of this specific accreditation
             */
            validUntil?: string;
          },
          {
            /**
             * Namespace or domain for which the issuer is accredited
             */
            namespaceId: string;
            /**
             * Schema ID for which the issuer is accredited
             */
            schemaId: string;
            /**
             * Credential types the issuer can issue
             *
             * @minItems 1
             * @maxItems 10
             */
            types:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Geographic or regulatory restriction (optional)
             */
            limitJurisdiction?: string;
            /**
             * Expiration date of this specific accreditation
             */
            validUntil?: string;
          },
          {
            /**
             * Namespace or domain for which the issuer is accredited
             */
            namespaceId: string;
            /**
             * Schema ID for which the issuer is accredited
             */
            schemaId: string;
            /**
             * Credential types the issuer can issue
             *
             * @minItems 1
             * @maxItems 10
             */
            types:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Geographic or regulatory restriction (optional)
             */
            limitJurisdiction?: string;
            /**
             * Expiration date of this specific accreditation
             */
            validUntil?: string;
          },
          {
            /**
             * Namespace or domain for which the issuer is accredited
             */
            namespaceId: string;
            /**
             * Schema ID for which the issuer is accredited
             */
            schemaId: string;
            /**
             * Credential types the issuer can issue
             *
             * @minItems 1
             * @maxItems 10
             */
            types:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Geographic or regulatory restriction (optional)
             */
            limitJurisdiction?: string;
            /**
             * Expiration date of this specific accreditation
             */
            validUntil?: string;
          },
          {
            /**
             * Namespace or domain for which the issuer is accredited
             */
            namespaceId: string;
            /**
             * Schema ID for which the issuer is accredited
             */
            schemaId: string;
            /**
             * Credential types the issuer can issue
             *
             * @minItems 1
             * @maxItems 10
             */
            types:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Geographic or regulatory restriction (optional)
             */
            limitJurisdiction?: string;
            /**
             * Expiration date of this specific accreditation
             */
            validUntil?: string;
          },
          {
            /**
             * Namespace or domain for which the issuer is accredited
             */
            namespaceId: string;
            /**
             * Schema ID for which the issuer is accredited
             */
            schemaId: string;
            /**
             * Credential types the issuer can issue
             *
             * @minItems 1
             * @maxItems 10
             */
            types:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Geographic or regulatory restriction (optional)
             */
            limitJurisdiction?: string;
            /**
             * Expiration date of this specific accreditation
             */
            validUntil?: string;
          },
          {
            /**
             * Namespace or domain for which the issuer is accredited
             */
            namespaceId: string;
            /**
             * Schema ID for which the issuer is accredited
             */
            schemaId: string;
            /**
             * Credential types the issuer can issue
             *
             * @minItems 1
             * @maxItems 10
             */
            types:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Geographic or regulatory restriction (optional)
             */
            limitJurisdiction?: string;
            /**
             * Expiration date of this specific accreditation
             */
            validUntil?: string;
          },
          {
            /**
             * Namespace or domain for which the issuer is accredited
             */
            namespaceId: string;
            /**
             * Schema ID for which the issuer is accredited
             */
            schemaId: string;
            /**
             * Credential types the issuer can issue
             *
             * @minItems 1
             * @maxItems 10
             */
            types:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Geographic or regulatory restriction (optional)
             */
            limitJurisdiction?: string;
            /**
             * Expiration date of this specific accreditation
             */
            validUntil?: string;
          },
          {
            /**
             * Namespace or domain for which the issuer is accredited
             */
            namespaceId: string;
            /**
             * Schema ID for which the issuer is accredited
             */
            schemaId: string;
            /**
             * Credential types the issuer can issue
             *
             * @minItems 1
             * @maxItems 10
             */
            types:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Geographic or regulatory restriction (optional)
             */
            limitJurisdiction?: string;
            /**
             * Expiration date of this specific accreditation
             */
            validUntil?: string;
          }
        ]
      | [
          {
            /**
             * Namespace or domain for which the issuer is accredited
             */
            namespaceId: string;
            /**
             * Schema ID for which the issuer is accredited
             */
            schemaId: string;
            /**
             * Credential types the issuer can issue
             *
             * @minItems 1
             * @maxItems 10
             */
            types:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Geographic or regulatory restriction (optional)
             */
            limitJurisdiction?: string;
            /**
             * Expiration date of this specific accreditation
             */
            validUntil?: string;
          },
          {
            /**
             * Namespace or domain for which the issuer is accredited
             */
            namespaceId: string;
            /**
             * Schema ID for which the issuer is accredited
             */
            schemaId: string;
            /**
             * Credential types the issuer can issue
             *
             * @minItems 1
             * @maxItems 10
             */
            types:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Geographic or regulatory restriction (optional)
             */
            limitJurisdiction?: string;
            /**
             * Expiration date of this specific accreditation
             */
            validUntil?: string;
          },
          {
            /**
             * Namespace or domain for which the issuer is accredited
             */
            namespaceId: string;
            /**
             * Schema ID for which the issuer is accredited
             */
            schemaId: string;
            /**
             * Credential types the issuer can issue
             *
             * @minItems 1
             * @maxItems 10
             */
            types:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Geographic or regulatory restriction (optional)
             */
            limitJurisdiction?: string;
            /**
             * Expiration date of this specific accreditation
             */
            validUntil?: string;
          },
          {
            /**
             * Namespace or domain for which the issuer is accredited
             */
            namespaceId: string;
            /**
             * Schema ID for which the issuer is accredited
             */
            schemaId: string;
            /**
             * Credential types the issuer can issue
             *
             * @minItems 1
             * @maxItems 10
             */
            types:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Geographic or regulatory restriction (optional)
             */
            limitJurisdiction?: string;
            /**
             * Expiration date of this specific accreditation
             */
            validUntil?: string;
          },
          {
            /**
             * Namespace or domain for which the issuer is accredited
             */
            namespaceId: string;
            /**
             * Schema ID for which the issuer is accredited
             */
            schemaId: string;
            /**
             * Credential types the issuer can issue
             *
             * @minItems 1
             * @maxItems 10
             */
            types:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Geographic or regulatory restriction (optional)
             */
            limitJurisdiction?: string;
            /**
             * Expiration date of this specific accreditation
             */
            validUntil?: string;
          },
          {
            /**
             * Namespace or domain for which the issuer is accredited
             */
            namespaceId: string;
            /**
             * Schema ID for which the issuer is accredited
             */
            schemaId: string;
            /**
             * Credential types the issuer can issue
             *
             * @minItems 1
             * @maxItems 10
             */
            types:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Geographic or regulatory restriction (optional)
             */
            limitJurisdiction?: string;
            /**
             * Expiration date of this specific accreditation
             */
            validUntil?: string;
          },
          {
            /**
             * Namespace or domain for which the issuer is accredited
             */
            namespaceId: string;
            /**
             * Schema ID for which the issuer is accredited
             */
            schemaId: string;
            /**
             * Credential types the issuer can issue
             *
             * @minItems 1
             * @maxItems 10
             */
            types:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Geographic or regulatory restriction (optional)
             */
            limitJurisdiction?: string;
            /**
             * Expiration date of this specific accreditation
             */
            validUntil?: string;
          },
          {
            /**
             * Namespace or domain for which the issuer is accredited
             */
            namespaceId: string;
            /**
             * Schema ID for which the issuer is accredited
             */
            schemaId: string;
            /**
             * Credential types the issuer can issue
             *
             * @minItems 1
             * @maxItems 10
             */
            types:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Geographic or regulatory restriction (optional)
             */
            limitJurisdiction?: string;
            /**
             * Expiration date of this specific accreditation
             */
            validUntil?: string;
          },
          {
            /**
             * Namespace or domain for which the issuer is accredited
             */
            namespaceId: string;
            /**
             * Schema ID for which the issuer is accredited
             */
            schemaId: string;
            /**
             * Credential types the issuer can issue
             *
             * @minItems 1
             * @maxItems 10
             */
            types:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Geographic or regulatory restriction (optional)
             */
            limitJurisdiction?: string;
            /**
             * Expiration date of this specific accreditation
             */
            validUntil?: string;
          },
          {
            /**
             * Namespace or domain for which the issuer is accredited
             */
            namespaceId: string;
            /**
             * Schema ID for which the issuer is accredited
             */
            schemaId: string;
            /**
             * Credential types the issuer can issue
             *
             * @minItems 1
             * @maxItems 10
             */
            types:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Geographic or regulatory restriction (optional)
             */
            limitJurisdiction?: string;
            /**
             * Expiration date of this specific accreditation
             */
            validUntil?: string;
          },
          {
            /**
             * Namespace or domain for which the issuer is accredited
             */
            namespaceId: string;
            /**
             * Schema ID for which the issuer is accredited
             */
            schemaId: string;
            /**
             * Credential types the issuer can issue
             *
             * @minItems 1
             * @maxItems 10
             */
            types:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Geographic or regulatory restriction (optional)
             */
            limitJurisdiction?: string;
            /**
             * Expiration date of this specific accreditation
             */
            validUntil?: string;
          },
          {
            /**
             * Namespace or domain for which the issuer is accredited
             */
            namespaceId: string;
            /**
             * Schema ID for which the issuer is accredited
             */
            schemaId: string;
            /**
             * Credential types the issuer can issue
             *
             * @minItems 1
             * @maxItems 10
             */
            types:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Geographic or regulatory restriction (optional)
             */
            limitJurisdiction?: string;
            /**
             * Expiration date of this specific accreditation
             */
            validUntil?: string;
          },
          {
            /**
             * Namespace or domain for which the issuer is accredited
             */
            namespaceId: string;
            /**
             * Schema ID for which the issuer is accredited
             */
            schemaId: string;
            /**
             * Credential types the issuer can issue
             *
             * @minItems 1
             * @maxItems 10
             */
            types:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Geographic or regulatory restriction (optional)
             */
            limitJurisdiction?: string;
            /**
             * Expiration date of this specific accreditation
             */
            validUntil?: string;
          },
          {
            /**
             * Namespace or domain for which the issuer is accredited
             */
            namespaceId: string;
            /**
             * Schema ID for which the issuer is accredited
             */
            schemaId: string;
            /**
             * Credential types the issuer can issue
             *
             * @minItems 1
             * @maxItems 10
             */
            types:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Geographic or regulatory restriction (optional)
             */
            limitJurisdiction?: string;
            /**
             * Expiration date of this specific accreditation
             */
            validUntil?: string;
          },
          {
            /**
             * Namespace or domain for which the issuer is accredited
             */
            namespaceId: string;
            /**
             * Schema ID for which the issuer is accredited
             */
            schemaId: string;
            /**
             * Credential types the issuer can issue
             *
             * @minItems 1
             * @maxItems 10
             */
            types:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Geographic or regulatory restriction (optional)
             */
            limitJurisdiction?: string;
            /**
             * Expiration date of this specific accreditation
             */
            validUntil?: string;
          }
        ]
      | [
          {
            /**
             * Namespace or domain for which the issuer is accredited
             */
            namespaceId: string;
            /**
             * Schema ID for which the issuer is accredited
             */
            schemaId: string;
            /**
             * Credential types the issuer can issue
             *
             * @minItems 1
             * @maxItems 10
             */
            types:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Geographic or regulatory restriction (optional)
             */
            limitJurisdiction?: string;
            /**
             * Expiration date of this specific accreditation
             */
            validUntil?: string;
          },
          {
            /**
             * Namespace or domain for which the issuer is accredited
             */
            namespaceId: string;
            /**
             * Schema ID for which the issuer is accredited
             */
            schemaId: string;
            /**
             * Credential types the issuer can issue
             *
             * @minItems 1
             * @maxItems 10
             */
            types:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Geographic or regulatory restriction (optional)
             */
            limitJurisdiction?: string;
            /**
             * Expiration date of this specific accreditation
             */
            validUntil?: string;
          },
          {
            /**
             * Namespace or domain for which the issuer is accredited
             */
            namespaceId: string;
            /**
             * Schema ID for which the issuer is accredited
             */
            schemaId: string;
            /**
             * Credential types the issuer can issue
             *
             * @minItems 1
             * @maxItems 10
             */
            types:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Geographic or regulatory restriction (optional)
             */
            limitJurisdiction?: string;
            /**
             * Expiration date of this specific accreditation
             */
            validUntil?: string;
          },
          {
            /**
             * Namespace or domain for which the issuer is accredited
             */
            namespaceId: string;
            /**
             * Schema ID for which the issuer is accredited
             */
            schemaId: string;
            /**
             * Credential types the issuer can issue
             *
             * @minItems 1
             * @maxItems 10
             */
            types:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Geographic or regulatory restriction (optional)
             */
            limitJurisdiction?: string;
            /**
             * Expiration date of this specific accreditation
             */
            validUntil?: string;
          },
          {
            /**
             * Namespace or domain for which the issuer is accredited
             */
            namespaceId: string;
            /**
             * Schema ID for which the issuer is accredited
             */
            schemaId: string;
            /**
             * Credential types the issuer can issue
             *
             * @minItems 1
             * @maxItems 10
             */
            types:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Geographic or regulatory restriction (optional)
             */
            limitJurisdiction?: string;
            /**
             * Expiration date of this specific accreditation
             */
            validUntil?: string;
          },
          {
            /**
             * Namespace or domain for which the issuer is accredited
             */
            namespaceId: string;
            /**
             * Schema ID for which the issuer is accredited
             */
            schemaId: string;
            /**
             * Credential types the issuer can issue
             *
             * @minItems 1
             * @maxItems 10
             */
            types:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Geographic or regulatory restriction (optional)
             */
            limitJurisdiction?: string;
            /**
             * Expiration date of this specific accreditation
             */
            validUntil?: string;
          },
          {
            /**
             * Namespace or domain for which the issuer is accredited
             */
            namespaceId: string;
            /**
             * Schema ID for which the issuer is accredited
             */
            schemaId: string;
            /**
             * Credential types the issuer can issue
             *
             * @minItems 1
             * @maxItems 10
             */
            types:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Geographic or regulatory restriction (optional)
             */
            limitJurisdiction?: string;
            /**
             * Expiration date of this specific accreditation
             */
            validUntil?: string;
          },
          {
            /**
             * Namespace or domain for which the issuer is accredited
             */
            namespaceId: string;
            /**
             * Schema ID for which the issuer is accredited
             */
            schemaId: string;
            /**
             * Credential types the issuer can issue
             *
             * @minItems 1
             * @maxItems 10
             */
            types:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Geographic or regulatory restriction (optional)
             */
            limitJurisdiction?: string;
            /**
             * Expiration date of this specific accreditation
             */
            validUntil?: string;
          },
          {
            /**
             * Namespace or domain for which the issuer is accredited
             */
            namespaceId: string;
            /**
             * Schema ID for which the issuer is accredited
             */
            schemaId: string;
            /**
             * Credential types the issuer can issue
             *
             * @minItems 1
             * @maxItems 10
             */
            types:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Geographic or regulatory restriction (optional)
             */
            limitJurisdiction?: string;
            /**
             * Expiration date of this specific accreditation
             */
            validUntil?: string;
          },
          {
            /**
             * Namespace or domain for which the issuer is accredited
             */
            namespaceId: string;
            /**
             * Schema ID for which the issuer is accredited
             */
            schemaId: string;
            /**
             * Credential types the issuer can issue
             *
             * @minItems 1
             * @maxItems 10
             */
            types:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Geographic or regulatory restriction (optional)
             */
            limitJurisdiction?: string;
            /**
             * Expiration date of this specific accreditation
             */
            validUntil?: string;
          },
          {
            /**
             * Namespace or domain for which the issuer is accredited
             */
            namespaceId: string;
            /**
             * Schema ID for which the issuer is accredited
             */
            schemaId: string;
            /**
             * Credential types the issuer can issue
             *
             * @minItems 1
             * @maxItems 10
             */
            types:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Geographic or regulatory restriction (optional)
             */
            limitJurisdiction?: string;
            /**
             * Expiration date of this specific accreditation
             */
            validUntil?: string;
          },
          {
            /**
             * Namespace or domain for which the issuer is accredited
             */
            namespaceId: string;
            /**
             * Schema ID for which the issuer is accredited
             */
            schemaId: string;
            /**
             * Credential types the issuer can issue
             *
             * @minItems 1
             * @maxItems 10
             */
            types:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Geographic or regulatory restriction (optional)
             */
            limitJurisdiction?: string;
            /**
             * Expiration date of this specific accreditation
             */
            validUntil?: string;
          },
          {
            /**
             * Namespace or domain for which the issuer is accredited
             */
            namespaceId: string;
            /**
             * Schema ID for which the issuer is accredited
             */
            schemaId: string;
            /**
             * Credential types the issuer can issue
             *
             * @minItems 1
             * @maxItems 10
             */
            types:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Geographic or regulatory restriction (optional)
             */
            limitJurisdiction?: string;
            /**
             * Expiration date of this specific accreditation
             */
            validUntil?: string;
          },
          {
            /**
             * Namespace or domain for which the issuer is accredited
             */
            namespaceId: string;
            /**
             * Schema ID for which the issuer is accredited
             */
            schemaId: string;
            /**
             * Credential types the issuer can issue
             *
             * @minItems 1
             * @maxItems 10
             */
            types:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Geographic or regulatory restriction (optional)
             */
            limitJurisdiction?: string;
            /**
             * Expiration date of this specific accreditation
             */
            validUntil?: string;
          },
          {
            /**
             * Namespace or domain for which the issuer is accredited
             */
            namespaceId: string;
            /**
             * Schema ID for which the issuer is accredited
             */
            schemaId: string;
            /**
             * Credential types the issuer can issue
             *
             * @minItems 1
             * @maxItems 10
             */
            types:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Geographic or regulatory restriction (optional)
             */
            limitJurisdiction?: string;
            /**
             * Expiration date of this specific accreditation
             */
            validUntil?: string;
          },
          {
            /**
             * Namespace or domain for which the issuer is accredited
             */
            namespaceId: string;
            /**
             * Schema ID for which the issuer is accredited
             */
            schemaId: string;
            /**
             * Credential types the issuer can issue
             *
             * @minItems 1
             * @maxItems 10
             */
            types:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Geographic or regulatory restriction (optional)
             */
            limitJurisdiction?: string;
            /**
             * Expiration date of this specific accreditation
             */
            validUntil?: string;
          }
        ]
      | [
          {
            /**
             * Namespace or domain for which the issuer is accredited
             */
            namespaceId: string;
            /**
             * Schema ID for which the issuer is accredited
             */
            schemaId: string;
            /**
             * Credential types the issuer can issue
             *
             * @minItems 1
             * @maxItems 10
             */
            types:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Geographic or regulatory restriction (optional)
             */
            limitJurisdiction?: string;
            /**
             * Expiration date of this specific accreditation
             */
            validUntil?: string;
          },
          {
            /**
             * Namespace or domain for which the issuer is accredited
             */
            namespaceId: string;
            /**
             * Schema ID for which the issuer is accredited
             */
            schemaId: string;
            /**
             * Credential types the issuer can issue
             *
             * @minItems 1
             * @maxItems 10
             */
            types:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Geographic or regulatory restriction (optional)
             */
            limitJurisdiction?: string;
            /**
             * Expiration date of this specific accreditation
             */
            validUntil?: string;
          },
          {
            /**
             * Namespace or domain for which the issuer is accredited
             */
            namespaceId: string;
            /**
             * Schema ID for which the issuer is accredited
             */
            schemaId: string;
            /**
             * Credential types the issuer can issue
             *
             * @minItems 1
             * @maxItems 10
             */
            types:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Geographic or regulatory restriction (optional)
             */
            limitJurisdiction?: string;
            /**
             * Expiration date of this specific accreditation
             */
            validUntil?: string;
          },
          {
            /**
             * Namespace or domain for which the issuer is accredited
             */
            namespaceId: string;
            /**
             * Schema ID for which the issuer is accredited
             */
            schemaId: string;
            /**
             * Credential types the issuer can issue
             *
             * @minItems 1
             * @maxItems 10
             */
            types:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Geographic or regulatory restriction (optional)
             */
            limitJurisdiction?: string;
            /**
             * Expiration date of this specific accreditation
             */
            validUntil?: string;
          },
          {
            /**
             * Namespace or domain for which the issuer is accredited
             */
            namespaceId: string;
            /**
             * Schema ID for which the issuer is accredited
             */
            schemaId: string;
            /**
             * Credential types the issuer can issue
             *
             * @minItems 1
             * @maxItems 10
             */
            types:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Geographic or regulatory restriction (optional)
             */
            limitJurisdiction?: string;
            /**
             * Expiration date of this specific accreditation
             */
            validUntil?: string;
          },
          {
            /**
             * Namespace or domain for which the issuer is accredited
             */
            namespaceId: string;
            /**
             * Schema ID for which the issuer is accredited
             */
            schemaId: string;
            /**
             * Credential types the issuer can issue
             *
             * @minItems 1
             * @maxItems 10
             */
            types:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Geographic or regulatory restriction (optional)
             */
            limitJurisdiction?: string;
            /**
             * Expiration date of this specific accreditation
             */
            validUntil?: string;
          },
          {
            /**
             * Namespace or domain for which the issuer is accredited
             */
            namespaceId: string;
            /**
             * Schema ID for which the issuer is accredited
             */
            schemaId: string;
            /**
             * Credential types the issuer can issue
             *
             * @minItems 1
             * @maxItems 10
             */
            types:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Geographic or regulatory restriction (optional)
             */
            limitJurisdiction?: string;
            /**
             * Expiration date of this specific accreditation
             */
            validUntil?: string;
          },
          {
            /**
             * Namespace or domain for which the issuer is accredited
             */
            namespaceId: string;
            /**
             * Schema ID for which the issuer is accredited
             */
            schemaId: string;
            /**
             * Credential types the issuer can issue
             *
             * @minItems 1
             * @maxItems 10
             */
            types:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Geographic or regulatory restriction (optional)
             */
            limitJurisdiction?: string;
            /**
             * Expiration date of this specific accreditation
             */
            validUntil?: string;
          },
          {
            /**
             * Namespace or domain for which the issuer is accredited
             */
            namespaceId: string;
            /**
             * Schema ID for which the issuer is accredited
             */
            schemaId: string;
            /**
             * Credential types the issuer can issue
             *
             * @minItems 1
             * @maxItems 10
             */
            types:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Geographic or regulatory restriction (optional)
             */
            limitJurisdiction?: string;
            /**
             * Expiration date of this specific accreditation
             */
            validUntil?: string;
          },
          {
            /**
             * Namespace or domain for which the issuer is accredited
             */
            namespaceId: string;
            /**
             * Schema ID for which the issuer is accredited
             */
            schemaId: string;
            /**
             * Credential types the issuer can issue
             *
             * @minItems 1
             * @maxItems 10
             */
            types:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Geographic or regulatory restriction (optional)
             */
            limitJurisdiction?: string;
            /**
             * Expiration date of this specific accreditation
             */
            validUntil?: string;
          },
          {
            /**
             * Namespace or domain for which the issuer is accredited
             */
            namespaceId: string;
            /**
             * Schema ID for which the issuer is accredited
             */
            schemaId: string;
            /**
             * Credential types the issuer can issue
             *
             * @minItems 1
             * @maxItems 10
             */
            types:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Geographic or regulatory restriction (optional)
             */
            limitJurisdiction?: string;
            /**
             * Expiration date of this specific accreditation
             */
            validUntil?: string;
          },
          {
            /**
             * Namespace or domain for which the issuer is accredited
             */
            namespaceId: string;
            /**
             * Schema ID for which the issuer is accredited
             */
            schemaId: string;
            /**
             * Credential types the issuer can issue
             *
             * @minItems 1
             * @maxItems 10
             */
            types:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Geographic or regulatory restriction (optional)
             */
            limitJurisdiction?: string;
            /**
             * Expiration date of this specific accreditation
             */
            validUntil?: string;
          },
          {
            /**
             * Namespace or domain for which the issuer is accredited
             */
            namespaceId: string;
            /**
             * Schema ID for which the issuer is accredited
             */
            schemaId: string;
            /**
             * Credential types the issuer can issue
             *
             * @minItems 1
             * @maxItems 10
             */
            types:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Geographic or regulatory restriction (optional)
             */
            limitJurisdiction?: string;
            /**
             * Expiration date of this specific accreditation
             */
            validUntil?: string;
          },
          {
            /**
             * Namespace or domain for which the issuer is accredited
             */
            namespaceId: string;
            /**
             * Schema ID for which the issuer is accredited
             */
            schemaId: string;
            /**
             * Credential types the issuer can issue
             *
             * @minItems 1
             * @maxItems 10
             */
            types:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Geographic or regulatory restriction (optional)
             */
            limitJurisdiction?: string;
            /**
             * Expiration date of this specific accreditation
             */
            validUntil?: string;
          },
          {
            /**
             * Namespace or domain for which the issuer is accredited
             */
            namespaceId: string;
            /**
             * Schema ID for which the issuer is accredited
             */
            schemaId: string;
            /**
             * Credential types the issuer can issue
             *
             * @minItems 1
             * @maxItems 10
             */
            types:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Geographic or regulatory restriction (optional)
             */
            limitJurisdiction?: string;
            /**
             * Expiration date of this specific accreditation
             */
            validUntil?: string;
          },
          {
            /**
             * Namespace or domain for which the issuer is accredited
             */
            namespaceId: string;
            /**
             * Schema ID for which the issuer is accredited
             */
            schemaId: string;
            /**
             * Credential types the issuer can issue
             *
             * @minItems 1
             * @maxItems 10
             */
            types:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Geographic or regulatory restriction (optional)
             */
            limitJurisdiction?: string;
            /**
             * Expiration date of this specific accreditation
             */
            validUntil?: string;
          },
          {
            /**
             * Namespace or domain for which the issuer is accredited
             */
            namespaceId: string;
            /**
             * Schema ID for which the issuer is accredited
             */
            schemaId: string;
            /**
             * Credential types the issuer can issue
             *
             * @minItems 1
             * @maxItems 10
             */
            types:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Geographic or regulatory restriction (optional)
             */
            limitJurisdiction?: string;
            /**
             * Expiration date of this specific accreditation
             */
            validUntil?: string;
          }
        ]
      | [
          {
            /**
             * Namespace or domain for which the issuer is accredited
             */
            namespaceId: string;
            /**
             * Schema ID for which the issuer is accredited
             */
            schemaId: string;
            /**
             * Credential types the issuer can issue
             *
             * @minItems 1
             * @maxItems 10
             */
            types:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Geographic or regulatory restriction (optional)
             */
            limitJurisdiction?: string;
            /**
             * Expiration date of this specific accreditation
             */
            validUntil?: string;
          },
          {
            /**
             * Namespace or domain for which the issuer is accredited
             */
            namespaceId: string;
            /**
             * Schema ID for which the issuer is accredited
             */
            schemaId: string;
            /**
             * Credential types the issuer can issue
             *
             * @minItems 1
             * @maxItems 10
             */
            types:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Geographic or regulatory restriction (optional)
             */
            limitJurisdiction?: string;
            /**
             * Expiration date of this specific accreditation
             */
            validUntil?: string;
          },
          {
            /**
             * Namespace or domain for which the issuer is accredited
             */
            namespaceId: string;
            /**
             * Schema ID for which the issuer is accredited
             */
            schemaId: string;
            /**
             * Credential types the issuer can issue
             *
             * @minItems 1
             * @maxItems 10
             */
            types:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Geographic or regulatory restriction (optional)
             */
            limitJurisdiction?: string;
            /**
             * Expiration date of this specific accreditation
             */
            validUntil?: string;
          },
          {
            /**
             * Namespace or domain for which the issuer is accredited
             */
            namespaceId: string;
            /**
             * Schema ID for which the issuer is accredited
             */
            schemaId: string;
            /**
             * Credential types the issuer can issue
             *
             * @minItems 1
             * @maxItems 10
             */
            types:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Geographic or regulatory restriction (optional)
             */
            limitJurisdiction?: string;
            /**
             * Expiration date of this specific accreditation
             */
            validUntil?: string;
          },
          {
            /**
             * Namespace or domain for which the issuer is accredited
             */
            namespaceId: string;
            /**
             * Schema ID for which the issuer is accredited
             */
            schemaId: string;
            /**
             * Credential types the issuer can issue
             *
             * @minItems 1
             * @maxItems 10
             */
            types:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Geographic or regulatory restriction (optional)
             */
            limitJurisdiction?: string;
            /**
             * Expiration date of this specific accreditation
             */
            validUntil?: string;
          },
          {
            /**
             * Namespace or domain for which the issuer is accredited
             */
            namespaceId: string;
            /**
             * Schema ID for which the issuer is accredited
             */
            schemaId: string;
            /**
             * Credential types the issuer can issue
             *
             * @minItems 1
             * @maxItems 10
             */
            types:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Geographic or regulatory restriction (optional)
             */
            limitJurisdiction?: string;
            /**
             * Expiration date of this specific accreditation
             */
            validUntil?: string;
          },
          {
            /**
             * Namespace or domain for which the issuer is accredited
             */
            namespaceId: string;
            /**
             * Schema ID for which the issuer is accredited
             */
            schemaId: string;
            /**
             * Credential types the issuer can issue
             *
             * @minItems 1
             * @maxItems 10
             */
            types:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Geographic or regulatory restriction (optional)
             */
            limitJurisdiction?: string;
            /**
             * Expiration date of this specific accreditation
             */
            validUntil?: string;
          },
          {
            /**
             * Namespace or domain for which the issuer is accredited
             */
            namespaceId: string;
            /**
             * Schema ID for which the issuer is accredited
             */
            schemaId: string;
            /**
             * Credential types the issuer can issue
             *
             * @minItems 1
             * @maxItems 10
             */
            types:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Geographic or regulatory restriction (optional)
             */
            limitJurisdiction?: string;
            /**
             * Expiration date of this specific accreditation
             */
            validUntil?: string;
          },
          {
            /**
             * Namespace or domain for which the issuer is accredited
             */
            namespaceId: string;
            /**
             * Schema ID for which the issuer is accredited
             */
            schemaId: string;
            /**
             * Credential types the issuer can issue
             *
             * @minItems 1
             * @maxItems 10
             */
            types:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Geographic or regulatory restriction (optional)
             */
            limitJurisdiction?: string;
            /**
             * Expiration date of this specific accreditation
             */
            validUntil?: string;
          },
          {
            /**
             * Namespace or domain for which the issuer is accredited
             */
            namespaceId: string;
            /**
             * Schema ID for which the issuer is accredited
             */
            schemaId: string;
            /**
             * Credential types the issuer can issue
             *
             * @minItems 1
             * @maxItems 10
             */
            types:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Geographic or regulatory restriction (optional)
             */
            limitJurisdiction?: string;
            /**
             * Expiration date of this specific accreditation
             */
            validUntil?: string;
          },
          {
            /**
             * Namespace or domain for which the issuer is accredited
             */
            namespaceId: string;
            /**
             * Schema ID for which the issuer is accredited
             */
            schemaId: string;
            /**
             * Credential types the issuer can issue
             *
             * @minItems 1
             * @maxItems 10
             */
            types:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Geographic or regulatory restriction (optional)
             */
            limitJurisdiction?: string;
            /**
             * Expiration date of this specific accreditation
             */
            validUntil?: string;
          },
          {
            /**
             * Namespace or domain for which the issuer is accredited
             */
            namespaceId: string;
            /**
             * Schema ID for which the issuer is accredited
             */
            schemaId: string;
            /**
             * Credential types the issuer can issue
             *
             * @minItems 1
             * @maxItems 10
             */
            types:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Geographic or regulatory restriction (optional)
             */
            limitJurisdiction?: string;
            /**
             * Expiration date of this specific accreditation
             */
            validUntil?: string;
          },
          {
            /**
             * Namespace or domain for which the issuer is accredited
             */
            namespaceId: string;
            /**
             * Schema ID for which the issuer is accredited
             */
            schemaId: string;
            /**
             * Credential types the issuer can issue
             *
             * @minItems 1
             * @maxItems 10
             */
            types:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Geographic or regulatory restriction (optional)
             */
            limitJurisdiction?: string;
            /**
             * Expiration date of this specific accreditation
             */
            validUntil?: string;
          },
          {
            /**
             * Namespace or domain for which the issuer is accredited
             */
            namespaceId: string;
            /**
             * Schema ID for which the issuer is accredited
             */
            schemaId: string;
            /**
             * Credential types the issuer can issue
             *
             * @minItems 1
             * @maxItems 10
             */
            types:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Geographic or regulatory restriction (optional)
             */
            limitJurisdiction?: string;
            /**
             * Expiration date of this specific accreditation
             */
            validUntil?: string;
          },
          {
            /**
             * Namespace or domain for which the issuer is accredited
             */
            namespaceId: string;
            /**
             * Schema ID for which the issuer is accredited
             */
            schemaId: string;
            /**
             * Credential types the issuer can issue
             *
             * @minItems 1
             * @maxItems 10
             */
            types:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Geographic or regulatory restriction (optional)
             */
            limitJurisdiction?: string;
            /**
             * Expiration date of this specific accreditation
             */
            validUntil?: string;
          },
          {
            /**
             * Namespace or domain for which the issuer is accredited
             */
            namespaceId: string;
            /**
             * Schema ID for which the issuer is accredited
             */
            schemaId: string;
            /**
             * Credential types the issuer can issue
             *
             * @minItems 1
             * @maxItems 10
             */
            types:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Geographic or regulatory restriction (optional)
             */
            limitJurisdiction?: string;
            /**
             * Expiration date of this specific accreditation
             */
            validUntil?: string;
          },
          {
            /**
             * Namespace or domain for which the issuer is accredited
             */
            namespaceId: string;
            /**
             * Schema ID for which the issuer is accredited
             */
            schemaId: string;
            /**
             * Credential types the issuer can issue
             *
             * @minItems 1
             * @maxItems 10
             */
            types:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Geographic or regulatory restriction (optional)
             */
            limitJurisdiction?: string;
            /**
             * Expiration date of this specific accreditation
             */
            validUntil?: string;
          },
          {
            /**
             * Namespace or domain for which the issuer is accredited
             */
            namespaceId: string;
            /**
             * Schema ID for which the issuer is accredited
             */
            schemaId: string;
            /**
             * Credential types the issuer can issue
             *
             * @minItems 1
             * @maxItems 10
             */
            types:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Geographic or regulatory restriction (optional)
             */
            limitJurisdiction?: string;
            /**
             * Expiration date of this specific accreditation
             */
            validUntil?: string;
          }
        ]
      | [
          {
            /**
             * Namespace or domain for which the issuer is accredited
             */
            namespaceId: string;
            /**
             * Schema ID for which the issuer is accredited
             */
            schemaId: string;
            /**
             * Credential types the issuer can issue
             *
             * @minItems 1
             * @maxItems 10
             */
            types:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Geographic or regulatory restriction (optional)
             */
            limitJurisdiction?: string;
            /**
             * Expiration date of this specific accreditation
             */
            validUntil?: string;
          },
          {
            /**
             * Namespace or domain for which the issuer is accredited
             */
            namespaceId: string;
            /**
             * Schema ID for which the issuer is accredited
             */
            schemaId: string;
            /**
             * Credential types the issuer can issue
             *
             * @minItems 1
             * @maxItems 10
             */
            types:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Geographic or regulatory restriction (optional)
             */
            limitJurisdiction?: string;
            /**
             * Expiration date of this specific accreditation
             */
            validUntil?: string;
          },
          {
            /**
             * Namespace or domain for which the issuer is accredited
             */
            namespaceId: string;
            /**
             * Schema ID for which the issuer is accredited
             */
            schemaId: string;
            /**
             * Credential types the issuer can issue
             *
             * @minItems 1
             * @maxItems 10
             */
            types:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Geographic or regulatory restriction (optional)
             */
            limitJurisdiction?: string;
            /**
             * Expiration date of this specific accreditation
             */
            validUntil?: string;
          },
          {
            /**
             * Namespace or domain for which the issuer is accredited
             */
            namespaceId: string;
            /**
             * Schema ID for which the issuer is accredited
             */
            schemaId: string;
            /**
             * Credential types the issuer can issue
             *
             * @minItems 1
             * @maxItems 10
             */
            types:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Geographic or regulatory restriction (optional)
             */
            limitJurisdiction?: string;
            /**
             * Expiration date of this specific accreditation
             */
            validUntil?: string;
          },
          {
            /**
             * Namespace or domain for which the issuer is accredited
             */
            namespaceId: string;
            /**
             * Schema ID for which the issuer is accredited
             */
            schemaId: string;
            /**
             * Credential types the issuer can issue
             *
             * @minItems 1
             * @maxItems 10
             */
            types:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Geographic or regulatory restriction (optional)
             */
            limitJurisdiction?: string;
            /**
             * Expiration date of this specific accreditation
             */
            validUntil?: string;
          },
          {
            /**
             * Namespace or domain for which the issuer is accredited
             */
            namespaceId: string;
            /**
             * Schema ID for which the issuer is accredited
             */
            schemaId: string;
            /**
             * Credential types the issuer can issue
             *
             * @minItems 1
             * @maxItems 10
             */
            types:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Geographic or regulatory restriction (optional)
             */
            limitJurisdiction?: string;
            /**
             * Expiration date of this specific accreditation
             */
            validUntil?: string;
          },
          {
            /**
             * Namespace or domain for which the issuer is accredited
             */
            namespaceId: string;
            /**
             * Schema ID for which the issuer is accredited
             */
            schemaId: string;
            /**
             * Credential types the issuer can issue
             *
             * @minItems 1
             * @maxItems 10
             */
            types:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Geographic or regulatory restriction (optional)
             */
            limitJurisdiction?: string;
            /**
             * Expiration date of this specific accreditation
             */
            validUntil?: string;
          },
          {
            /**
             * Namespace or domain for which the issuer is accredited
             */
            namespaceId: string;
            /**
             * Schema ID for which the issuer is accredited
             */
            schemaId: string;
            /**
             * Credential types the issuer can issue
             *
             * @minItems 1
             * @maxItems 10
             */
            types:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Geographic or regulatory restriction (optional)
             */
            limitJurisdiction?: string;
            /**
             * Expiration date of this specific accreditation
             */
            validUntil?: string;
          },
          {
            /**
             * Namespace or domain for which the issuer is accredited
             */
            namespaceId: string;
            /**
             * Schema ID for which the issuer is accredited
             */
            schemaId: string;
            /**
             * Credential types the issuer can issue
             *
             * @minItems 1
             * @maxItems 10
             */
            types:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Geographic or regulatory restriction (optional)
             */
            limitJurisdiction?: string;
            /**
             * Expiration date of this specific accreditation
             */
            validUntil?: string;
          },
          {
            /**
             * Namespace or domain for which the issuer is accredited
             */
            namespaceId: string;
            /**
             * Schema ID for which the issuer is accredited
             */
            schemaId: string;
            /**
             * Credential types the issuer can issue
             *
             * @minItems 1
             * @maxItems 10
             */
            types:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Geographic or regulatory restriction (optional)
             */
            limitJurisdiction?: string;
            /**
             * Expiration date of this specific accreditation
             */
            validUntil?: string;
          },
          {
            /**
             * Namespace or domain for which the issuer is accredited
             */
            namespaceId: string;
            /**
             * Schema ID for which the issuer is accredited
             */
            schemaId: string;
            /**
             * Credential types the issuer can issue
             *
             * @minItems 1
             * @maxItems 10
             */
            types:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Geographic or regulatory restriction (optional)
             */
            limitJurisdiction?: string;
            /**
             * Expiration date of this specific accreditation
             */
            validUntil?: string;
          },
          {
            /**
             * Namespace or domain for which the issuer is accredited
             */
            namespaceId: string;
            /**
             * Schema ID for which the issuer is accredited
             */
            schemaId: string;
            /**
             * Credential types the issuer can issue
             *
             * @minItems 1
             * @maxItems 10
             */
            types:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Geographic or regulatory restriction (optional)
             */
            limitJurisdiction?: string;
            /**
             * Expiration date of this specific accreditation
             */
            validUntil?: string;
          },
          {
            /**
             * Namespace or domain for which the issuer is accredited
             */
            namespaceId: string;
            /**
             * Schema ID for which the issuer is accredited
             */
            schemaId: string;
            /**
             * Credential types the issuer can issue
             *
             * @minItems 1
             * @maxItems 10
             */
            types:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Geographic or regulatory restriction (optional)
             */
            limitJurisdiction?: string;
            /**
             * Expiration date of this specific accreditation
             */
            validUntil?: string;
          },
          {
            /**
             * Namespace or domain for which the issuer is accredited
             */
            namespaceId: string;
            /**
             * Schema ID for which the issuer is accredited
             */
            schemaId: string;
            /**
             * Credential types the issuer can issue
             *
             * @minItems 1
             * @maxItems 10
             */
            types:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Geographic or regulatory restriction (optional)
             */
            limitJurisdiction?: string;
            /**
             * Expiration date of this specific accreditation
             */
            validUntil?: string;
          },
          {
            /**
             * Namespace or domain for which the issuer is accredited
             */
            namespaceId: string;
            /**
             * Schema ID for which the issuer is accredited
             */
            schemaId: string;
            /**
             * Credential types the issuer can issue
             *
             * @minItems 1
             * @maxItems 10
             */
            types:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Geographic or regulatory restriction (optional)
             */
            limitJurisdiction?: string;
            /**
             * Expiration date of this specific accreditation
             */
            validUntil?: string;
          },
          {
            /**
             * Namespace or domain for which the issuer is accredited
             */
            namespaceId: string;
            /**
             * Schema ID for which the issuer is accredited
             */
            schemaId: string;
            /**
             * Credential types the issuer can issue
             *
             * @minItems 1
             * @maxItems 10
             */
            types:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Geographic or regulatory restriction (optional)
             */
            limitJurisdiction?: string;
            /**
             * Expiration date of this specific accreditation
             */
            validUntil?: string;
          },
          {
            /**
             * Namespace or domain for which the issuer is accredited
             */
            namespaceId: string;
            /**
             * Schema ID for which the issuer is accredited
             */
            schemaId: string;
            /**
             * Credential types the issuer can issue
             *
             * @minItems 1
             * @maxItems 10
             */
            types:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Geographic or regulatory restriction (optional)
             */
            limitJurisdiction?: string;
            /**
             * Expiration date of this specific accreditation
             */
            validUntil?: string;
          },
          {
            /**
             * Namespace or domain for which the issuer is accredited
             */
            namespaceId: string;
            /**
             * Schema ID for which the issuer is accredited
             */
            schemaId: string;
            /**
             * Credential types the issuer can issue
             *
             * @minItems 1
             * @maxItems 10
             */
            types:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Geographic or regulatory restriction (optional)
             */
            limitJurisdiction?: string;
            /**
             * Expiration date of this specific accreditation
             */
            validUntil?: string;
          },
          {
            /**
             * Namespace or domain for which the issuer is accredited
             */
            namespaceId: string;
            /**
             * Schema ID for which the issuer is accredited
             */
            schemaId: string;
            /**
             * Credential types the issuer can issue
             *
             * @minItems 1
             * @maxItems 10
             */
            types:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Geographic or regulatory restriction (optional)
             */
            limitJurisdiction?: string;
            /**
             * Expiration date of this specific accreditation
             */
            validUntil?: string;
          }
        ]
      | [
          {
            /**
             * Namespace or domain for which the issuer is accredited
             */
            namespaceId: string;
            /**
             * Schema ID for which the issuer is accredited
             */
            schemaId: string;
            /**
             * Credential types the issuer can issue
             *
             * @minItems 1
             * @maxItems 10
             */
            types:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Geographic or regulatory restriction (optional)
             */
            limitJurisdiction?: string;
            /**
             * Expiration date of this specific accreditation
             */
            validUntil?: string;
          },
          {
            /**
             * Namespace or domain for which the issuer is accredited
             */
            namespaceId: string;
            /**
             * Schema ID for which the issuer is accredited
             */
            schemaId: string;
            /**
             * Credential types the issuer can issue
             *
             * @minItems 1
             * @maxItems 10
             */
            types:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Geographic or regulatory restriction (optional)
             */
            limitJurisdiction?: string;
            /**
             * Expiration date of this specific accreditation
             */
            validUntil?: string;
          },
          {
            /**
             * Namespace or domain for which the issuer is accredited
             */
            namespaceId: string;
            /**
             * Schema ID for which the issuer is accredited
             */
            schemaId: string;
            /**
             * Credential types the issuer can issue
             *
             * @minItems 1
             * @maxItems 10
             */
            types:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Geographic or regulatory restriction (optional)
             */
            limitJurisdiction?: string;
            /**
             * Expiration date of this specific accreditation
             */
            validUntil?: string;
          },
          {
            /**
             * Namespace or domain for which the issuer is accredited
             */
            namespaceId: string;
            /**
             * Schema ID for which the issuer is accredited
             */
            schemaId: string;
            /**
             * Credential types the issuer can issue
             *
             * @minItems 1
             * @maxItems 10
             */
            types:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Geographic or regulatory restriction (optional)
             */
            limitJurisdiction?: string;
            /**
             * Expiration date of this specific accreditation
             */
            validUntil?: string;
          },
          {
            /**
             * Namespace or domain for which the issuer is accredited
             */
            namespaceId: string;
            /**
             * Schema ID for which the issuer is accredited
             */
            schemaId: string;
            /**
             * Credential types the issuer can issue
             *
             * @minItems 1
             * @maxItems 10
             */
            types:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Geographic or regulatory restriction (optional)
             */
            limitJurisdiction?: string;
            /**
             * Expiration date of this specific accreditation
             */
            validUntil?: string;
          },
          {
            /**
             * Namespace or domain for which the issuer is accredited
             */
            namespaceId: string;
            /**
             * Schema ID for which the issuer is accredited
             */
            schemaId: string;
            /**
             * Credential types the issuer can issue
             *
             * @minItems 1
             * @maxItems 10
             */
            types:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Geographic or regulatory restriction (optional)
             */
            limitJurisdiction?: string;
            /**
             * Expiration date of this specific accreditation
             */
            validUntil?: string;
          },
          {
            /**
             * Namespace or domain for which the issuer is accredited
             */
            namespaceId: string;
            /**
             * Schema ID for which the issuer is accredited
             */
            schemaId: string;
            /**
             * Credential types the issuer can issue
             *
             * @minItems 1
             * @maxItems 10
             */
            types:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Geographic or regulatory restriction (optional)
             */
            limitJurisdiction?: string;
            /**
             * Expiration date of this specific accreditation
             */
            validUntil?: string;
          },
          {
            /**
             * Namespace or domain for which the issuer is accredited
             */
            namespaceId: string;
            /**
             * Schema ID for which the issuer is accredited
             */
            schemaId: string;
            /**
             * Credential types the issuer can issue
             *
             * @minItems 1
             * @maxItems 10
             */
            types:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Geographic or regulatory restriction (optional)
             */
            limitJurisdiction?: string;
            /**
             * Expiration date of this specific accreditation
             */
            validUntil?: string;
          },
          {
            /**
             * Namespace or domain for which the issuer is accredited
             */
            namespaceId: string;
            /**
             * Schema ID for which the issuer is accredited
             */
            schemaId: string;
            /**
             * Credential types the issuer can issue
             *
             * @minItems 1
             * @maxItems 10
             */
            types:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Geographic or regulatory restriction (optional)
             */
            limitJurisdiction?: string;
            /**
             * Expiration date of this specific accreditation
             */
            validUntil?: string;
          },
          {
            /**
             * Namespace or domain for which the issuer is accredited
             */
            namespaceId: string;
            /**
             * Schema ID for which the issuer is accredited
             */
            schemaId: string;
            /**
             * Credential types the issuer can issue
             *
             * @minItems 1
             * @maxItems 10
             */
            types:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Geographic or regulatory restriction (optional)
             */
            limitJurisdiction?: string;
            /**
             * Expiration date of this specific accreditation
             */
            validUntil?: string;
          },
          {
            /**
             * Namespace or domain for which the issuer is accredited
             */
            namespaceId: string;
            /**
             * Schema ID for which the issuer is accredited
             */
            schemaId: string;
            /**
             * Credential types the issuer can issue
             *
             * @minItems 1
             * @maxItems 10
             */
            types:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Geographic or regulatory restriction (optional)
             */
            limitJurisdiction?: string;
            /**
             * Expiration date of this specific accreditation
             */
            validUntil?: string;
          },
          {
            /**
             * Namespace or domain for which the issuer is accredited
             */
            namespaceId: string;
            /**
             * Schema ID for which the issuer is accredited
             */
            schemaId: string;
            /**
             * Credential types the issuer can issue
             *
             * @minItems 1
             * @maxItems 10
             */
            types:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Geographic or regulatory restriction (optional)
             */
            limitJurisdiction?: string;
            /**
             * Expiration date of this specific accreditation
             */
            validUntil?: string;
          },
          {
            /**
             * Namespace or domain for which the issuer is accredited
             */
            namespaceId: string;
            /**
             * Schema ID for which the issuer is accredited
             */
            schemaId: string;
            /**
             * Credential types the issuer can issue
             *
             * @minItems 1
             * @maxItems 10
             */
            types:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Geographic or regulatory restriction (optional)
             */
            limitJurisdiction?: string;
            /**
             * Expiration date of this specific accreditation
             */
            validUntil?: string;
          },
          {
            /**
             * Namespace or domain for which the issuer is accredited
             */
            namespaceId: string;
            /**
             * Schema ID for which the issuer is accredited
             */
            schemaId: string;
            /**
             * Credential types the issuer can issue
             *
             * @minItems 1
             * @maxItems 10
             */
            types:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Geographic or regulatory restriction (optional)
             */
            limitJurisdiction?: string;
            /**
             * Expiration date of this specific accreditation
             */
            validUntil?: string;
          },
          {
            /**
             * Namespace or domain for which the issuer is accredited
             */
            namespaceId: string;
            /**
             * Schema ID for which the issuer is accredited
             */
            schemaId: string;
            /**
             * Credential types the issuer can issue
             *
             * @minItems 1
             * @maxItems 10
             */
            types:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Geographic or regulatory restriction (optional)
             */
            limitJurisdiction?: string;
            /**
             * Expiration date of this specific accreditation
             */
            validUntil?: string;
          },
          {
            /**
             * Namespace or domain for which the issuer is accredited
             */
            namespaceId: string;
            /**
             * Schema ID for which the issuer is accredited
             */
            schemaId: string;
            /**
             * Credential types the issuer can issue
             *
             * @minItems 1
             * @maxItems 10
             */
            types:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Geographic or regulatory restriction (optional)
             */
            limitJurisdiction?: string;
            /**
             * Expiration date of this specific accreditation
             */
            validUntil?: string;
          },
          {
            /**
             * Namespace or domain for which the issuer is accredited
             */
            namespaceId: string;
            /**
             * Schema ID for which the issuer is accredited
             */
            schemaId: string;
            /**
             * Credential types the issuer can issue
             *
             * @minItems 1
             * @maxItems 10
             */
            types:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Geographic or regulatory restriction (optional)
             */
            limitJurisdiction?: string;
            /**
             * Expiration date of this specific accreditation
             */
            validUntil?: string;
          },
          {
            /**
             * Namespace or domain for which the issuer is accredited
             */
            namespaceId: string;
            /**
             * Schema ID for which the issuer is accredited
             */
            schemaId: string;
            /**
             * Credential types the issuer can issue
             *
             * @minItems 1
             * @maxItems 10
             */
            types:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Geographic or regulatory restriction (optional)
             */
            limitJurisdiction?: string;
            /**
             * Expiration date of this specific accreditation
             */
            validUntil?: string;
          },
          {
            /**
             * Namespace or domain for which the issuer is accredited
             */
            namespaceId: string;
            /**
             * Schema ID for which the issuer is accredited
             */
            schemaId: string;
            /**
             * Credential types the issuer can issue
             *
             * @minItems 1
             * @maxItems 10
             */
            types:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Geographic or regulatory restriction (optional)
             */
            limitJurisdiction?: string;
            /**
             * Expiration date of this specific accreditation
             */
            validUntil?: string;
          },
          {
            /**
             * Namespace or domain for which the issuer is accredited
             */
            namespaceId: string;
            /**
             * Schema ID for which the issuer is accredited
             */
            schemaId: string;
            /**
             * Credential types the issuer can issue
             *
             * @minItems 1
             * @maxItems 10
             */
            types:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Geographic or regulatory restriction (optional)
             */
            limitJurisdiction?: string;
            /**
             * Expiration date of this specific accreditation
             */
            validUntil?: string;
          }
        ];
    /**
     * Trust level assigned within this trust chain
     */
    trustLevel?: "bronze" | "silver" | "gold" | "platinum";
    /**
     * DID-Linked Resource ID on blockchain (cheqd, ethereum, etc.)
     */
    blockchainResourceId?: string;
  };
  termsOfUse: {
    /**
     * Must be AccreditationPolicy per cheqd DTC spec
     */
    type: "AccreditationPolicy";
    /**
     * DID URL of the parent accreditation in the trust chain (if not a root)
     */
    parentAccreditation?: string;
    /**
     * DID URL of the root authority for this trust chain
     */
    rootAuthorisation: string;
    /**
     * Scope or purpose of this trust chain
     */
    trustChainScope: string;
    /**
     * Reference to governance policies for this trust chain
     */
    governanceFramework?: string;
  };
  /**
   * Cryptographic proof of the accreditation
   */
  proof?: {};
  /**
   * Multi-root trust pattern type
   */
  rootType?: "self-sovereign" | "delegated" | "federated" | "hybrid";
  governanceModel?: {
    /**
     * Governance model for this trust relationship
     */
    type?: "dao" | "committee" | "consensus" | "hierarchical";
    /**
     * DIDs of governance participants
     */
    participants?: string[];
  };
  /**
   * Chain of trust delegation from root to current authority
   */
  delegationChain?: string[];
  /**
   * Contextual information about the trust chain purpose and scope
   */
  trustChainContext?: string;
  /**
   * Reference to ADR explaining the architectural decisions behind this trust pattern
   */
  architecturalRationale?: string;
  /**
   * OriginVault mission principles that this trust pattern implements
   */
  principleAlignment?: (
    | "creatorFirst"
    | "userSovereignty"
    | "proofFirstTrust"
    | "inclusiveIntegration"
    | "communityCollaboration"
    | "empowermentOverExtraction"
    | "privacyByDesign"
    | "modularOpenSource"
    | "securityFirst"
    | "resilienceByDesign"
  )[];
  metadata?: {
    /**
     * Schema version for tracking evolution
     */
    version?: string;
    /**
     * Schema type identifier for BFF integration
     */
    schemaType?: "TrustedIssuer";
    /**
     * Indicates if schema supports BFF integration patterns
     */
    bffIntegration?: boolean;
  };
  /**
   * Timestamp when the accreditation was created
   */
  createdAt?: string;
  /**
   * Timestamp when the accreditation was last updated
   */
  updatedAt?: string;
  blockchainSync?: {
    /**
     * Blockchain transaction hash for this accreditation
     */
    transactionHash?: string;
    /**
     * Block number where transaction was confirmed
     */
    blockNumber?: number;
    /**
     * Blockchain network identifier
     */
    networkId?: "cheqd:mainnet" | "cheqd:testnet" | "ethereum:mainnet" | "ethereum:sepolia";
    /**
     * Last blockchain synchronization timestamp
     */
    lastSynced?: string;
  };
}
