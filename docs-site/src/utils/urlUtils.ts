/**
 * Utility functions for generating resolver URLs
 */

export const generateSchemaResolverUrl = (schemaPath: string): string => {
  // Encode the schema path for URL safety
  const encodedPath = encodeURIComponent(schemaPath)
  return `/schema/${encodedPath}`
}

export const generateContextResolverUrl = (contextPath: string): string => {
  // Encode the context path for URL safety
  const encodedPath = encodeURIComponent(contextPath)
  return `/context/${encodedPath}`
}

export const generateWellKnownResolverUrl = (wellKnownPath: string): string => {
  // Encode the .well-known path for URL safety
  const encodedPath = encodeURIComponent(wellKnownPath)
  return `/.well-known/${encodedPath}`
}

export const generateGitHubSchemaUrl = (schemaPath: string): string => {
  return `https://github.com/OriginVault/originvault-schema-registry/blob/main/schemas/v1/${schemaPath}`
}

export const generateGitHubContextUrl = (contextPath: string): string => {
  return `https://github.com/OriginVault/originvault-schema-registry/blob/main/contexts/${contextPath}`
}

export const generateGitHubWellKnownUrl = (wellKnownPath: string): string => {
  return `https://github.com/OriginVault/originvault-schema-registry/blob/main/.well-known/${wellKnownPath}`
}

export const generateRawSchemaUrl = (schemaPath: string): string => {
  return `https://raw.githubusercontent.com/OriginVault/originvault-schema-registry/main/schemas/v1/${schemaPath}`
}

export const generateRawContextUrl = (contextPath: string): string => {
  return `https://raw.githubusercontent.com/OriginVault/originvault-schema-registry/main/contexts/${contextPath}`
}

export const generateRawWellKnownUrl = (wellKnownPath: string): string => {
  return `https://raw.githubusercontent.com/OriginVault/originvault-schema-registry/main/.well-known/${wellKnownPath}`
}

/**
 * Generate DID configuration URL for external domain
 */
export const generateDidConfigurationUrl = (domain: string = 'schemas.originvault.box'): string => {
  return `https://${domain}/.well-known/did-configuration.json`
}

/**
 * Extract schema path from a full GitHub URL
 */
export const extractSchemaPathFromUrl = (url: string): string | null => {
  try {
    const urlObj = new URL(url)
    if (urlObj.hostname === 'github.com' && urlObj.pathname.includes('/OriginVault/originvault-schema-registry/')) {
      // Extract path after schemas/v1/
      const match = urlObj.pathname.match(/\/schemas\/v1\/(.+)$/)
      return match ? match[1] : null
    }
    return null
  } catch {
    return null
  }
}

/**
 * Extract context path from a full GitHub URL
 */
export const extractContextPathFromUrl = (url: string): string | null => {
  try {
    const urlObj = new URL(url)
    if (urlObj.hostname === 'github.com' && urlObj.pathname.includes('/OriginVault/originvault-schema-registry/')) {
      // Extract path after contexts/
      const match = urlObj.pathname.match(/\/contexts\/(.+)$/)
      return match ? match[1] : null
    }
    return null
  } catch {
    return null
  }
}

/**
 * Extract .well-known path from a full GitHub URL
 */
export const extractWellKnownPathFromUrl = (url: string): string | null => {
  try {
    const urlObj = new URL(url)
    if (urlObj.hostname === 'github.com' && urlObj.pathname.includes('/OriginVault/originvault-schema-registry/')) {
      // Extract path after .well-known/
      const match = urlObj.pathname.match(/\/\.well-known\/(.+)$/)
      return match ? match[1] : null
    }
    return null
  } catch {
    return null
  }
}

/**
 * Extract .well-known path from a domain URL
 */
export const extractWellKnownPathFromDomainUrl = (url: string): string | null => {
  try {
    const urlObj = new URL(url)
    // Extract path after .well-known/
    const match = urlObj.pathname.match(/\/\.well-known\/(.+)$/)
    return match ? match[1] : null
  } catch {
    return null
  }
} 