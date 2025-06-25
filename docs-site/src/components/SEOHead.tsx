import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'documentation';
  schema?: object;
  canonical?: string;
  noindex?: boolean;
  nofollow?: boolean;
}

const SEOHead: React.FC<SEOHeadProps> = ({
  title = 'OriginVault Schema Registry - Interactive JSON Schema Documentation & QuickType Integration',
  description = 'Explore OriginVault\'s comprehensive JSON schema registry with interactive documentation, real-time QuickType code generation, and multi-language type definitions for verifiable credentials and decentralized identity.',
  keywords = 'JSON schema, verifiable credentials, decentralized identity, QuickType, TypeScript, Python, Java, C#, Go, Rust, Swift, Kotlin, DID, OriginVault, blockchain, SSI, self-sovereign identity',
  image = 'https://schemas.originvault.box/og-image.png',
  url = 'https://schemas.originvault.box/',
  type = 'website',
  schema,
  canonical,
  noindex = false,
  nofollow = false,
}) => {
  const robots = noindex || nofollow 
    ? `${noindex ? 'noindex' : 'index'},${nofollow ? 'nofollow' : 'follow'}`
    : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';

  const defaultSchema = {
    '@context': 'https://schema.org',
    '@type': type === 'article' ? 'Article' : 'WebPage',
    name: title,
    description,
    url: canonical || url,
    publisher: {
      '@type': 'Organization',
      name: 'OriginVault',
      url: 'https://originvault.box',
      logo: {
        '@type': 'ImageObject',
        url: 'https://originvault.box/logo.png',
        width: 512,
        height: 512,
      },
      sameAs: [
        'https://github.com/originvault',
        'https://twitter.com/originvault',
        'https://linkedin.com/company/originvault',
      ],
    },
    mainEntity: type === 'article' ? {
      '@type': 'Article',
      headline: title,
      description,
      author: {
        '@type': 'Organization',
        name: 'OriginVault',
      },
      publisher: {
        '@type': 'Organization',
        name: 'OriginVault',
      },
      datePublished: new Date().toISOString(),
      dateModified: new Date().toISOString(),
    } : undefined,
  };

  const finalSchema = schema || defaultSchema;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="robots" content={robots} />
      
      {/* Canonical URL */}
      {canonical && <link rel="canonical" href={canonical} />}
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="OriginVault Schema Registry" />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
      <meta name="twitter:creator" content="@originvault" />
      <meta name="twitter:site" content="@originvault" />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(finalSchema)}
      </script>
      
      {/* Additional SEO Meta Tags */}
      <meta name="application-name" content="OriginVault Schema Registry" />
      <meta name="apple-mobile-web-app-title" content="OriginVault Schemas" />
      <meta name="theme-color" content="#5794b4" />
      <meta name="msapplication-TileColor" content="#5794b4" />
      
      {/* Language and Region */}
      <meta name="language" content="English" />
      <meta name="geo.region" content="US" />
      <meta name="geo.placename" content="United States" />
      
      {/* Content Type */}
      <meta name="content-type" content="text/html; charset=UTF-8" />
      <meta name="content-language" content="en" />
      
      {/* Mobile Optimization */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      
      {/* Accessibility */}
      <meta name="accessibility-control" content="full-keyboard-operable" />
      <meta name="accessibility-feature" content="high-contrast, large-text, screen-reader-optimized" />
      <meta name="accessibility-hazard" content="none" />
      <meta name="accessibility-mode" content="screen-reader" />
      
      {/* Performance Hints */}
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//fonts.gstatic.com" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      
      {/* Security Headers */}
      <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
      <meta httpEquiv="X-Frame-Options" content="DENY" />
      <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
      <meta httpEquiv="Referrer-Policy" content="strict-origin-when-cross-origin" />
      
      {/* Cache Control */}
      <meta httpEquiv="Cache-Control" content="public, max-age=3600" />
      
      {/* Feature Policy */}
      <meta httpEquiv="Feature-Policy" content="camera 'none'; microphone 'none'; geolocation 'none'; payment 'none'; usb 'none'; magnetometer 'none'; gyroscope 'none'; accelerometer 'none';" />
      
      {/* Permissions Policy */}
      <meta httpEquiv="Permissions-Policy" content="camera=(), microphone=(), geolocation=(), payment=(), usb=(), magnetometer=(), gyroscope=(), accelerometer=()" />
    </Helmet>
  );
};

export default SEOHead; 