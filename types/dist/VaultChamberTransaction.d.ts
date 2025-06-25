/**
 * Generated from VaultChamberTransaction.json
 * Schema: https://schemas.originvault.box/VaultChamberTransaction
 * DO NOT EDIT MANUALLY - regenerate with npm run generate-types
 */
/**
 * Records payment-based access events for transactional Vault Chambers.
 */
export interface VaultChamberTransaction {
    /**
     * Unique ID of the transaction.
     */
    transactionId: string;
    /**
     * DID of the Vault Chamber.
     */
    chamberId: string;
    /**
     * DID of the user who paid for access.
     */
    buyer: string;
    /**
     * Amount paid for access.
     */
    amountPaid: number;
    /**
     * Currency used (e.g., USD, CHEQ, ETH).
     */
    currency: string;
    /**
     * Time of transaction.
     */
    timestamp: string;
    /**
     * How long the user can access the Chamber.
     */
    accessDuration: string;
}
//# sourceMappingURL=VaultChamberTransaction.d.ts.map