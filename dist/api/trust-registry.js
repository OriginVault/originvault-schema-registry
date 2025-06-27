"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchTrust = exports.revokeTrust = exports.verifyTrust = exports.getTrustChain = exports.createEndorsement = exports.getTrustEntity = exports.registerTrustEntity = void 0;
const crypto_1 = __importDefault(require("crypto"));
// In-memory trust registry for demo
const trustRegistry = new Map();
const endorsementRegistry = new Map();
// Initialize with some sample trust anchors
initializeTrustAnchors();
// POST /api/trust/register - Register a new trust entity
const registerTrustEntity = async (req, res) => {
    try {
        const { issuer, subject, initial_score = 0 } = req.body;
        if (!issuer || !subject) {
            return res.status(400).json({
                error: 'issuer and subject are required'
            });
        }
        const trustRecord = {
            id: crypto_1.default.randomUUID(),
            issuer,
            subject,
            trustScore: initial_score,
            endorsements: [],
            created: new Date().toISOString(),
            updated: new Date().toISOString(),
            status: 'active'
        };
        trustRegistry.set(subject, trustRecord);
        res.json({
            trust_id: trustRecord.id,
            subject,
            trust_score: trustRecord.trustScore,
            status: trustRecord.status,
            created: trustRecord.created
        });
    }
    catch (error) {
        console.error('Trust registration error:', error);
        res.status(500).json({ error: 'Failed to register trust entity' });
    }
};
exports.registerTrustEntity = registerTrustEntity;
// GET /api/trust/entity/:did - Get trust record for an entity
const getTrustEntity = async (req, res) => {
    try {
        const { did } = req.params;
        const record = trustRegistry.get(did);
        if (!record) {
            return res.status(404).json({ error: 'Trust entity not found' });
        }
        res.json({
            trust_record: record,
            chain_analysis: await analyzeTrustChain(did),
            endorsement_summary: {
                total: record.endorsements.length,
                average_score: record.endorsements.reduce((sum, e) => sum + e.trustLevel, 0) / record.endorsements.length || 0
            }
        });
    }
    catch (error) {
        console.error('Trust entity retrieval error:', error);
        res.status(500).json({ error: 'Failed to retrieve trust entity' });
    }
};
exports.getTrustEntity = getTrustEntity;
// POST /api/trust/endorse - Create an endorsement
const createEndorsement = async (req, res) => {
    try {
        const { endorser, subject, trust_level, evidence } = req.body;
        if (!endorser || !subject || trust_level === undefined) {
            return res.status(400).json({
                error: 'endorser, subject, and trust_level are required'
            });
        }
        if (trust_level < 0 || trust_level > 100) {
            return res.status(400).json({
                error: 'trust_level must be between 0 and 100'
            });
        }
        const endorsement = {
            id: crypto_1.default.randomUUID(),
            endorser,
            trustLevel: trust_level,
            timestamp: new Date().toISOString(),
            evidence,
            signature: generateEndorsementSignature(endorser, subject, trust_level)
        };
        // Add to endorsement registry
        endorsementRegistry.set(endorsement.id, endorsement);
        // Update subject's trust record
        const subjectRecord = trustRegistry.get(subject);
        if (subjectRecord) {
            subjectRecord.endorsements.push(endorsement);
            subjectRecord.trustScore = calculateTrustScore(subjectRecord.endorsements);
            subjectRecord.updated = new Date().toISOString();
        }
        res.json({
            endorsement_id: endorsement.id,
            subject,
            endorser,
            trust_level,
            new_trust_score: subjectRecord?.trustScore || 0,
            timestamp: endorsement.timestamp
        });
    }
    catch (error) {
        console.error('Endorsement creation error:', error);
        res.status(500).json({ error: 'Failed to create endorsement' });
    }
};
exports.createEndorsement = createEndorsement;
// GET /api/trust/chain/:did - Get trust chain analysis
const getTrustChain = async (req, res) => {
    try {
        const { did } = req.params;
        const { max_depth = 5 } = req.query;
        const chain = await buildTrustChain(did, Number(max_depth));
        if (!chain) {
            return res.status(404).json({ error: 'Trust chain not found' });
        }
        res.json({
            subject: did,
            chain,
            verification_result: await verifyTrustChain(chain)
        });
    }
    catch (error) {
        console.error('Trust chain analysis error:', error);
        res.status(500).json({ error: 'Failed to analyze trust chain' });
    }
};
exports.getTrustChain = getTrustChain;
// POST /api/trust/verify - Verify trust relationship
const verifyTrust = async (req, res) => {
    try {
        const { subject, verifier, minimum_score = 50 } = req.body;
        if (!subject || !verifier) {
            return res.status(400).json({
                error: 'subject and verifier are required'
            });
        }
        const subjectRecord = trustRegistry.get(subject);
        const verifierRecord = trustRegistry.get(verifier);
        if (!subjectRecord) {
            return res.status(404).json({ error: 'Subject not found in trust registry' });
        }
        const trustPath = await findTrustPath(verifier, subject);
        const verificationResult = {
            verified: false,
            trust_score: subjectRecord.trustScore,
            minimum_score,
            path_found: trustPath.length > 0,
            path_length: trustPath.length,
            path: trustPath,
            endorsements: subjectRecord.endorsements.length,
            status: subjectRecord.status
        };
        verificationResult.verified =
            subjectRecord.status === 'active' &&
                subjectRecord.trustScore >= minimum_score &&
                (trustPath.length > 0 || (verifierRecord?.trustScore ?? 0) >= minimum_score);
        res.json(verificationResult);
    }
    catch (error) {
        console.error('Trust verification error:', error);
        res.status(500).json({ error: 'Failed to verify trust' });
    }
};
exports.verifyTrust = verifyTrust;
// POST /api/trust/revoke - Revoke trust or endorsement
const revokeTrust = async (req, res) => {
    try {
        const { subject, revoker, reason } = req.body;
        if (!subject || !revoker) {
            return res.status(400).json({
                error: 'subject and revoker are required'
            });
        }
        const record = trustRegistry.get(subject);
        if (!record) {
            return res.status(404).json({ error: 'Trust entity not found' });
        }
        // Check if revoker has authority
        const revokerRecord = trustRegistry.get(revoker);
        if (!revokerRecord || revokerRecord.trustScore < 70) {
            return res.status(403).json({ error: 'Insufficient authority to revoke trust' });
        }
        record.status = 'revoked';
        record.updated = new Date().toISOString();
        res.json({
            subject,
            status: record.status,
            revoked_by: revoker,
            reason,
            timestamp: record.updated
        });
    }
    catch (error) {
        console.error('Trust revocation error:', error);
        res.status(500).json({ error: 'Failed to revoke trust' });
    }
};
exports.revokeTrust = revokeTrust;
// GET /api/trust/search - Search trust registry
const searchTrust = async (req, res) => {
    try {
        const { query, min_score = 0, max_score = 100, status = 'active', limit = 50 } = req.query;
        const results = [];
        for (const [did, record] of trustRegistry.entries()) {
            if (record.status !== status)
                continue;
            if (record.trustScore < Number(min_score) || record.trustScore > Number(max_score))
                continue;
            if (query && !did.toLowerCase().includes(String(query).toLowerCase()))
                continue;
            results.push({
                did,
                trust_score: record.trustScore,
                endorsements: record.endorsements.length,
                created: record.created,
                status: record.status
            });
            if (results.length >= Number(limit))
                break;
        }
        res.json({
            total: results.length,
            results: results.sort((a, b) => b.trust_score - a.trust_score)
        });
    }
    catch (error) {
        console.error('Trust search error:', error);
        res.status(500).json({ error: 'Failed to search trust registry' });
    }
};
exports.searchTrust = searchTrust;
// Helper functions
async function analyzeTrustChain(did) {
    const record = trustRegistry.get(did);
    if (!record)
        return null;
    return {
        depth: await calculateTrustDepth(did),
        upstream_trust: await getUpstreamTrust(did),
        downstream_trust: await getDownstreamTrust(did),
        trust_score_breakdown: analyzeTrustScore(record.endorsements)
    };
}
async function buildTrustChain(did, maxDepth) {
    const visited = new Set();
    const chain = [];
    async function traverse(currentDid, depth) {
        if (depth >= maxDepth || visited.has(currentDid))
            return;
        visited.add(currentDid);
        const record = trustRegistry.get(currentDid);
        if (!record)
            return;
        for (const endorsement of record.endorsements) {
            if (endorsement.endorser !== currentDid) {
                chain.push({
                    from: endorsement.endorser,
                    to: currentDid,
                    trustScore: endorsement.trustLevel,
                    endorsements: 1,
                    timestamp: endorsement.timestamp
                });
                await traverse(endorsement.endorser, depth + 1);
            }
        }
    }
    await traverse(did, 0);
    if (chain.length === 0)
        return null;
    return {
        root: findTrustRoot(chain),
        chain,
        score: calculateChainScore(chain),
        verified: await verifyChainIntegrity(chain)
    };
}
async function verifyTrustChain(chain) {
    return {
        valid: chain.verified,
        score: chain.score,
        length: chain.chain.length,
        root_trusted: await isRootTrusted(chain.root),
        broken_links: []
    };
}
async function findTrustPath(from, to) {
    // Simple BFS to find trust path
    const queue = [[from]];
    const visited = new Set();
    while (queue.length > 0) {
        const path = queue.shift();
        const current = path[path.length - 1];
        if (current === to)
            return path;
        if (visited.has(current))
            continue;
        visited.add(current);
        const record = trustRegistry.get(current);
        if (!record)
            continue;
        for (const endorsement of record.endorsements) {
            if (!visited.has(endorsement.endorser)) {
                queue.push([...path, endorsement.endorser]);
            }
        }
    }
    return [];
}
function calculateTrustScore(endorsements) {
    if (endorsements.length === 0)
        return 0;
    // Weighted average with recency bias
    const now = Date.now();
    let totalWeight = 0;
    let weightedSum = 0;
    for (const endorsement of endorsements) {
        const age = now - new Date(endorsement.timestamp).getTime();
        const weight = Math.exp(-age / (365 * 24 * 60 * 60 * 1000)); // Exponential decay over 1 year
        weightedSum += endorsement.trustLevel * weight;
        totalWeight += weight;
    }
    return Math.round(weightedSum / totalWeight);
}
function generateEndorsementSignature(endorser, subject, trustLevel) {
    return crypto_1.default
        .createHash('sha256')
        .update(`${endorser}:${subject}:${trustLevel}:${Date.now()}`)
        .digest('hex');
}
function initializeTrustAnchors() {
    // Create some initial trust anchors
    const anchors = [
        'did:cheqd:mainnet:trust-anchor-1',
        'did:cheqd:mainnet:trust-anchor-2',
        'did:originvault:root-authority'
    ];
    anchors.forEach(did => {
        trustRegistry.set(did, {
            id: crypto_1.default.randomUUID(),
            issuer: 'system',
            subject: did,
            trustScore: 100,
            endorsements: [],
            created: new Date().toISOString(),
            updated: new Date().toISOString(),
            status: 'active'
        });
    });
}
// Additional helper functions
async function calculateTrustDepth(did) {
    return 3; // Placeholder
}
async function getUpstreamTrust(did) {
    return []; // Placeholder
}
async function getDownstreamTrust(did) {
    return []; // Placeholder
}
function analyzeTrustScore(endorsements) {
    return {
        count: endorsements.length,
        average: endorsements.reduce((sum, e) => sum + e.trustLevel, 0) / endorsements.length || 0,
        recent: endorsements.filter(e => Date.now() - new Date(e.timestamp).getTime() < 30 * 24 * 60 * 60 * 1000).length
    };
}
function findTrustRoot(chain) {
    const froms = new Set(chain.map(link => link.from));
    const tos = new Set(chain.map(link => link.to));
    for (const from of froms) {
        if (!tos.has(from))
            return from;
    }
    return chain[0]?.from || '';
}
function calculateChainScore(chain) {
    if (chain.length === 0)
        return 0;
    return chain.reduce((sum, link) => sum + link.trustScore, 0) / chain.length;
}
async function verifyChainIntegrity(chain) {
    return true; // Placeholder - would verify signatures in real implementation
}
async function isRootTrusted(root) {
    const record = trustRegistry.get(root);
    return record ? record.trustScore >= 90 : false;
}
