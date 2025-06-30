import { Box, Link, Typography, Chip, Stack, Popper } from '@mui/material';
import { VerifiedUserOutlined } from '@mui/icons-material';
import { useState } from 'react';

// Type definitions for the DID service structure
interface ServiceEndpoint {
  id: string;
  type: string;
  serviceEndpoint: string;
}

interface DIDDocument {
  service?: ServiceEndpoint[];
  id?: string;
  [key: string]: any;
}

interface DIDViewerProps {
  isDarkMode?: boolean;
  didDocument?: DIDDocument;
  didDocumentMetadata?: any;
  backgroundColor: string;
  foregroundColor: string;
  textColor: string;
}

const DIDViewer = ({ 
  isDarkMode, 
  didDocument, 
  didDocumentMetadata, 
  backgroundColor, 
  foregroundColor, 
  textColor 
}: DIDViewerProps) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleShowPopper = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleHidePopper = () => {
    setAnchorEl(null);
  };

  // Helper function to format dates
  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Unknown';
    try {
      return new Date(dateString).toLocaleDateString();
    } catch {
      return 'Unknown';
    }
  };

  // Extract data from the DID document
  const services = didDocument?.service || [];
  const didId = didDocument?.id;
  const createdDate = didDocumentMetadata?.created || didDocument?.created;
  const validatedAt = new Date(); // Current time as validated time
  
  // Find X509 certificate service and linked resources
  const x509Service = services.find((service: ServiceEndpoint) => service.type === 'X509Certificate');
  const linkedResourceMetadata = didDocumentMetadata?.linkedResourceMetadata || [];
  const x509Resource = linkedResourceMetadata.find((resource: any) => resource.resourceType === 'X509Certificate');
  
  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center',
      gap: 2,
      padding: 2,
      borderRadius: 2,
      color: isDarkMode ? '#add4ef' : '#1c2a35',
      border: `1px solid ${isDarkMode ? '#3a6278' : '#c9b36d'}`,
      maxWidth: '500px',
      backgroundColor: backgroundColor,
      width: '100%'
    }}>
      {/* DID Identifier Section */}
      <Box onMouseLeave={handleHidePopper} sx={{ width: '100%' }}>
        <Popper style={{ 
          zIndex: 1300, 
          backgroundColor: '#1c2a35', 
          padding: '10px',
          borderRadius: '10px',
          color: '#add4ef',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column'
        }} open={Boolean(anchorEl)} anchorEl={anchorEl} placement="bottom">
          <div style={{
            width: 0,
            height: 0,
            borderLeft: '10px solid transparent',
            borderRight: '10px solid transparent',
            borderBottom: '10px solid #1c2a35',
            borderRadius: '10px',
            position: 'absolute',
            top: '-4px',
            transform: 'translateX(-50%)'
          }}></div>
          <Typography variant="subtitle2" sx={{
            display: 'flex',
            alignItems: 'center',
            "&:hover": {
              color: '#fe9334'
            }
          }}>
            <VerifiedUserOutlined style={{ width: '16px', height: '16px', marginRight: '1px' }}/>
            <Link 
              style={{ color: 'inherit', textDecoration: 'none' }} 
              href={`https://resolver.originvault.box/1.0/identifiers/${didId}`} 
              target="_blank"
            >
              {didId}
            </Link>
          </Typography>
        </Popper>
        <Box sx={{ width: '100%', textAlign: 'center' }}>
          
          
          <Box sx={{ 
            display: 'flex',
            alignItems: 'flex-start', 
            justifyContent: 'flex-start', 
            flexDirection: 'column',
            gap: 1,
            padding: 1,
            backgroundColor: isDarkMode ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.2)',
            borderRadius: 1,
            border: `1px solid ${isDarkMode ? '#2a3a45' : '#a9936d'}`,
            marginBottom: 2,
            width: '100%'
          }}>
            <Box sx={{
              display: 'flex',
              alignItems: 'flex-start', 
              justifyContent: 'flex-start', 
              flexDirection: 'row',
              cursor: 'pointer',
              gap: 1
            }}>
              <Box sx={{ padding: '8px', backgroundColor: '#1c2a35', borderRadius: '10px' }}>
                <img
                  title="OriginVault"
                  alt="OriginVaultLogo"
                  src="https://gray-objective-tiglon-784.mypinata.cloud/ipfs/Qma7EjPPPfomzEKkYcJa2ctEFPUhHaMwiojTR1wTQPg2x8"
                  style={{ width: "32px" }}
                />
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', textAlign: 'left', alignItems: 'flex-start' }}>
                <Typography 
                  variant="h6" 
                  onMouseEnter={handleShowPopper} 
                  onClick={() => window.open("https://resolver.originvault.box/1.0/identifiers/did:cheqd:mainnet:2b950252-b9cd-493f-98b8-fe417c466d55", "_blank")}
                  sx={{ 
                    color: foregroundColor, 
                    cursor: 'pointer'
                  }}
                >
                  https://schemas.originvault.box DID
                </Typography>
                <Typography sx={{ 
                    cursor: 'pointer', 
                    color: foregroundColor,
                    fontSize: '12px',
                  }}
                >
                  OV Verified DID Document
                </Typography>
              </Box>
            </Box>
            
            <Typography sx={{ 
              fontSize: '10px', 
              cursor: 'pointer', 
              fontStyle: 'italic',
              color: textColor,
              textAlign: 'left'
            }}>
              Created At: {formatDate(createdDate)}
            </Typography>
            
            <Typography sx={{ 
              fontSize: '10px', 
              cursor: 'pointer', 
              fontStyle: 'italic',
              color: textColor,
              textAlign: 'left'
            }}>
              Validated At: {formatDate(validatedAt.toISOString())}
            </Typography>
            
            {didId && (
              <Typography sx={{ 
                fontSize: '9px',
                wordBreak: 'break-all',
                color: textColor,
                fontFamily: 'Thiccboi',
                textAlign: 'center',
                marginTop: 1
              }}>
                {didId}
              </Typography>
            )}
          </Box>
        </Box>
      </Box>

      {/* Certificate of Authentication Section */}
      {(x509Service || x509Resource) && (
        <Box sx={{ width: '100%' }}>
          <Typography 
            variant="h6" 
            sx={{ 
              color: foregroundColor, 
              fontFamily: 'Thiccboi',
              fontSize: '14px',
              marginBottom: 1,
              textAlign: 'center'
            }}
          >
            Certificate of Authentication
          </Typography>
          
          <Box sx={{ 
            padding: 1.5,
            backgroundColor: isDarkMode ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.2)',
            borderRadius: 1,
            border: `1px solid ${isDarkMode ? '#2a3a45' : '#a9936d'}`,
            marginBottom: 2
          }}>
            {x509Resource && (
              <Stack spacing={0.5}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Chip 
                    label="X.509 Certificate" 
                    size="small" 
                    sx={{ 
                      backgroundColor: foregroundColor,
                      color: backgroundColor,
                      fontFamily: 'Thiccboi',
                      fontSize: '9px'
                    }} 
                  />
                  <Typography 
                    variant="caption" 
                    sx={{ 
                      color: textColor,
                      fontFamily: 'Thiccboi',
                      fontSize: '9px'
                    }}
                  >
                    {x509Resource.resourceName}
                  </Typography>
                </Box>
                
                <Typography 
                  variant="caption" 
                  sx={{ 
                    color: textColor,
                    fontFamily: 'Thiccboi',
                    fontSize: '9px'
                  }}
                >
                  <strong>Resource ID:</strong> {x509Resource.resourceId}
                </Typography>
                
                <Typography 
                  variant="caption" 
                  sx={{ 
                    color: textColor,
                    fontFamily: 'Thiccboi',
                    fontSize: '9px'
                  }}
                >
                  <strong>Created:</strong> {new Date(x509Resource.created).toLocaleDateString()}
                </Typography>
                
                <Typography 
                  variant="caption" 
                  sx={{ 
                    color: textColor,
                    fontFamily: 'Thiccboi',
                    fontSize: '9px'
                  }}
                >
                  <strong>Checksum:</strong> {x509Resource.checksum.substring(0, 16)}...
                </Typography>
                
                {x509Service?.serviceEndpoint && (
                  <Link
                    href={`https://resolver.originvault.box/1.0/identifiers/${x509Service.serviceEndpoint}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{ 
                      color: foregroundColor,
                      fontSize: '9px',
                      fontFamily: 'Thiccboi',
                      textDecoration: 'none',
                      '&:hover': { 
                        color: textColor,
                        textDecoration: 'underline'
                      },
                      wordBreak: 'break-all',
                      display: 'block',
                      marginTop: 0.5
                    }}
                  >
                    View Certificate →
                  </Link>
                )}
              </Stack>
            )}
          </Box>
        </Box>
      )}
      
      {/* Services Section */}
      <Box sx={{ width: '100%' }}>
        <Typography 
          variant="h6" 
          sx={{ 
            color: foregroundColor, 
            fontFamily: 'Thiccboi',
            fontSize: '14px',
            marginBottom: 1,
            textAlign: 'center'
          }}
        >
          DID Services
        </Typography>
        
        <Stack spacing={1} sx={{ width: '100%' }}>
          {services.map((service: ServiceEndpoint, index: number) => (
            <Box 
              key={service.id || index}
              sx={{ 
                display: 'flex', 
                flexDirection: 'column',
                gap: 0.5,
                padding: 1,
                backgroundColor: isDarkMode ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.2)',
                borderRadius: 1,
                border: `1px solid ${isDarkMode ? '#2a3a45' : '#a9936d'}`
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
                <Chip 
                  label={service.type} 
                  size="small" 
                  sx={{ 
                    backgroundColor: foregroundColor,
                    color: backgroundColor,
                    fontFamily: 'Thiccboi',
                    fontSize: '10px'
                  }} 
                />
                <Typography 
                  variant="caption" 
                  sx={{ 
                    color: textColor,
                    fontFamily: 'Thiccboi',
                    fontSize: '10px'
                  }}
                >
                  {service.id.split('#')[1] || service.id}
                </Typography>
              </Box>
              
              {service.serviceEndpoint && (
                <Link
                  href={service.serviceEndpoint}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ 
                    color: foregroundColor,
                    fontSize: '10px',
                    fontFamily: 'Thiccboi',
                    textDecoration: 'none',
                    '&:hover': { 
                      color: textColor,
                      textDecoration: 'underline'
                    },
                    wordBreak: 'break-all'
                  }}
                >
                  {service.serviceEndpoint}
                </Link>
              )}
            </Box>
          ))}
        </Stack>
        
        {services.length === 0 && (
          <Typography 
            variant="caption" 
            sx={{ 
              color: textColor,
              fontFamily: 'Thiccboi',
              fontSize: '10px',
              textAlign: 'center',
              display: 'block'
            }}
          >
            No services found
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default DIDViewer; 