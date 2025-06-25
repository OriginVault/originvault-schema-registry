/**
 * Generated from VerificationLog.json
 * Schema: https://schemas.originvault.box/VerificationLog
 * DO NOT EDIT MANUALLY - regenerate with npm run generate-types
 */
/**
 * Tracks verifications, compliance audits, and trust decisions.
 */
export interface VerificationLogSchema {
    /**
     * The DID of the verification log.
     */
    id: string;
    /**
     * The DID of the verified entity.
     */
    entity: string;
    /**
     * The DID of the authority performing verification.
     */
    verifiedBy: string;
    /**
     * Type of verification performed.
     */
    verificationType: "IdentityCheck" | "SecurityAudit" | "PerformanceTest";
    /**
     * Outcome of the verification.
     */
    status: "Passed" | "Failed" | "Pending";
    /**
     * Timestamp of verification.
     */
    timestamp: string;
}
//# sourceMappingURL=VerificationLog.d.ts.map