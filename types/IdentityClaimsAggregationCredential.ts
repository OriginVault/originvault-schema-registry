/**
 * Generated from IdentityClaimsAggregationCredential.json
 * Schema: https://cawg.io/schemas/v1/creator-identity-assertion.json
 * DO NOT EDIT MANUALLY - regenerate with npm run generate-types
 */

/**
 * A non-empty URI string
 */
export type NonEmptyUri = string;
/**
 * A non-empty string
 */
export type NonEmptyString = string;
export type VerifiedIdentity = {
  type: NonEmptyString;
  username?: string;
  uri?: NonEmptyUri;
  provider?: IdentifiableObject;
  /**
   * A non-empty string
   */
  verifiedAt: string;
  name?: NonEmptyString;
  method?: NonEmptyString;
  address?: string;
} & VerifiedIdentity1;
export type VerifiedIdentity1 =
  | {
      type?: "cawg.social_media";
    }
  | {
      type?: "cawg.crypto_wallet";
    }
  | {
      type?: "cawg.document_verification";
    }
  | {
      type?: "cawg.affiliation";
    }
  | {
      type?: "cawg.web_site";
    };

/**
 * Creator Identity Assertion Credential Schema for usage in JsonSchema
 */
export interface IdentityClaimsAggregationCredential {
  /**
   * @minItems 2
   */
  type: {
    [k: string]: unknown;
  } & [string, string, ...string[]];
  issuer:
    | NonEmptyUri
    | {
        id: NonEmptyUri;
        name?: NonEmptyString;
      };
  validFrom: string;
  expiresAt?: string;
  credentialSubject: {
    id: NonEmptyUri;
    /**
     * @minItems 1
     */
    verifiedIdentities: [VerifiedIdentity, ...VerifiedIdentity1[]];
    c2paAsset: {
      /**
       * @minItems 1
       */
      referenced_assertions: [
        {
          url?: NonEmptyString;
          hash: NonEmptyString;
          alg?: NonEmptyString;
        },
        ...{
          url?: NonEmptyString;
          hash: NonEmptyString;
          alg?: NonEmptyString;
        }[]
      ];
      sig_type: string;
      role?:
        | "cawg.creator"
        | "cawg.contributor"
        | "cawg.editor"
        | "cawg.producer"
        | "cawg.publisher"
        | "cawg.sponsor"
        | "cawg.translator";
      expected_partial_claim?: string;
      expected_claim_generator?: string;
      expected_countersigners?: string;
    };
  };
}
/**
 * An object with an identifiable URI and name
 */
export interface IdentifiableObject {
  /**
   * A non-empty URI string
   */
  id: string;
  /**
   * A non-empty string
   */
  name: string;
}
