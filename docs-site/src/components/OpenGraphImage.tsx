import React from 'react';
import { Helmet } from 'react-helmet-async';

interface OpenGraphImageProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
}

const OpenGraphImage: React.FC<OpenGraphImageProps> = ({
  title = "OriginVault Schema Registry",
  description = "Comprehensive schema registry for verifiable credentials and JSON-LD contexts",
  image = "/origin_vault_logo.png",
  url = window.location.href,
  type = "website"
}) => {
  return (
    <Helmet>
      {/* Open Graph tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="OriginVault Schema Registry" />
      
      {/* Twitter Card tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      
      {/* Standard meta tags */}
      <meta name="description" content={description} />
      <title>{title}</title>
    </Helmet>
  );
};

export default OpenGraphImage; 