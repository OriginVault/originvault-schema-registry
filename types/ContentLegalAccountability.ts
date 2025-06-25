/**
 * Generated from ContentLegalAccountability.json
 * Schema: https://schemas.originvault.box/ContentLegalAccountability
 * DO NOT EDIT MANUALLY - regenerate with npm run generate-types
 */

export interface ContentLegalAccountability {
  /**
   * DID of the content.
   */
  identifier: string;
  accountablePerson: {
    /**
     * DID of the responsible entity.
     */
    identifier?: string;
    /**
     * Name of the accountable entity.
     */
    name?: string;
  };
  publisher?: {
    /**
     * DID of the publisher.
     */
    identifier?: string;
    /**
     * Publisher name.
     */
    name?: string;
  };
  /**
   * Defines which legal system applies to the content.
   */
  legalJurisdiction: string;
  /**
   * URL or DID for dispute resolution policies.
   */
  disputeResolution?: string;
}
