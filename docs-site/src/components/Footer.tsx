import { Box, Link, useTheme } from '@mui/material';
import { SocialIcon } from 'react-social-icons';
import { OVIdViewer } from '@originvault/ov-id-viewer';

const Footer = (props: { isDarkMode?: boolean }) => {
  const theme = useTheme();
  const isDark = props.isDarkMode || theme.palette.mode === 'dark';
  
  const backgroundColor = isDark ? '#212831' : '#1c2a35';
  const foregroundColor = isDark ? '#add4ef' : '#c9b36d';
  const textColor = isDark ? '#c9b36d' : '#5794b4';
  
  return (
    <Box sx={{
        width: "100%",
        padding: "16px 30px",
        backgroundColor: backgroundColor,
        color: textColor,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        marginTop: 'auto',
        borderTop: 1,
        borderColor: 'divider',
        fontFamily: 'Thiccboi, Roboto, Helvetica, Arial, sans-serif',
    }}>
      <Box sx={{
        width: "100%",
        padding: "10px",
        color: textColor,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center', 
      }}>
        <SocialIcon 
          fgColor={backgroundColor} 
          bgColor={foregroundColor} 
          url="https://github.com/originvault" 
          style={{ height: "36px", width: "36px", minWidth: "36px", margin: "0 10px 0 0" }} 
        />
        <SocialIcon 
          fgColor={backgroundColor} 
          bgColor={foregroundColor} 
          url="https://opensea.io/0xada76eDF6797357b357F0FB218A6E4CF8dAe80D9" 
          style={{ height: "36px", width: "36px", minWidth: "36px", margin: "0 10px 0 0" }} 
        />
        <SocialIcon 
          fgColor={backgroundColor} 
          bgColor={foregroundColor} 
          url="https://app.ens.domains/originvault.box" 
          style={{ height: "36px", width: "36px", minWidth: "36px" }} 
        />
      </Box>
      
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '10px',
      }}>
        <Box sx={{ marginRight: "4px" }}>
          <OVIdViewer did="did:cheqd:mainnet:2b950252-b9cd-493f-98b8-fe417c466d55"  />
        </Box>
        <SocialIcon 
          fgColor={backgroundColor} 
          bgColor={foregroundColor} 
          url="https://linkedin.com/company/originvault" 
          style={{ height: "36px", width: "36px", minWidth: "36px", marginRight: "10px" }} 
        />
        <SocialIcon 
          fgColor={backgroundColor} 
          bgColor={foregroundColor} 
          url="https://bsky.app/profile/originvault.bsky.social" 
          style={{ height: "36px", width: "36px", minWidth: "36px", margin: "0 10px 0 0" }} 
        />
        <SocialIcon 
          fgColor={backgroundColor} 
          bgColor={foregroundColor} 
          url="https://instagram.com/originvault" 
          style={{ height: "36px", width: "36px", minWidth: "36px", margin: "0 10px 0 0" }} 
        />
        <img 
          src="https://keybase.io/images/icons/icon-keybase-logo-48@2x.png" 
          onClick={() => window.open("https://keybase.io/originvault")} 
          style={{ 
            height: "36px", 
            width: "36px", 
            minWidth: "36px", 
            backgroundColor: foregroundColor,
            color: backgroundColor, 
            borderRadius: '50%', 
            cursor: 'pointer' 
          }} 
          alt="Keybase"
        />
      </Box>
      
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '12px',
      }}>
        <Link 
          href='https://gray-objective-tiglon-784.mypinata.cloud/ipfs/QmP1GvHBDv5LH6YMEijeug2UujWyuRbW27nDC19zTa5Evg' 
          sx={{ color: textColor, textDecoration: 'none', margin: '5px 10px 0 10px', '&:hover': { color: foregroundColor } }}
        >
          Terms of Use
        </Link>
        <Link 
          href='https://gray-objective-tiglon-784.mypinata.cloud/ipfs/QmT6hcmUbpvZvmRGQ6SED1zfdbeB9FJ5dRU2SbkH5k1pVj' 
          sx={{ color: textColor, textDecoration: 'none', margin: '5px 10px 0 10px', '&:hover': { color: foregroundColor } }}
        >
          Privacy Policy
        </Link>
        <Link 
          href='https://schemas.originvault.box' 
          sx={{ color: textColor, textDecoration: 'none', margin: '5px 10px 0 10px', '&:hover': { color: foregroundColor } }}
        >
          Schema Registry
        </Link>
      </Box>
      
      <Box sx={{ padding: '16px 0', fontSize: '12px', color: textColor }}>
        &copy; 2025 OriginVault, LLC.
      </Box>
    </Box>
  );
};

export default Footer; 