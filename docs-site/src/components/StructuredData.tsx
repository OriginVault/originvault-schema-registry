import React from 'react';

interface StructuredDataProps {
  type: 'Organization' | 'WebSite' | 'BreadcrumbList' | 'FAQPage' | 'HowTo';
  schema: Record<string, any>;
}

const StructuredData: React.FC<StructuredDataProps> = ({ type, schema }) => {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': type,
    ...schema
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
};

export default StructuredData; 