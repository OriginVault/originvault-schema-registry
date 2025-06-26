import { Box, Link } from '@mui/material';
import { SocialIcon } from 'react-social-icons';

const Footer = (props: { isDarkMode?: boolean }) => {
  const backgroundColor = props.isDarkMode ? '#c9b36d' : '#5794b4';
  const foregroundColor = props.isDarkMode ? '#5794b4' : '#c9b36d';
  
  return (
    <Box style={{
        width: "100%",
        padding: "16px 30px",
        backgroundColor: 'black',
        color: backgroundColor,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        marginTop: 'auto'
    }}>
      <Box style={{
        width: "100%",
        padding: "10px",
        color: backgroundColor,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center', 
      }}>
        <SocialIcon 
          fgColor={foregroundColor} 
          bgColor={backgroundColor} 
          url="https://github.com/originvault" 
          style={{ height: "36px", width: "36px", minWidth: "36px", margin: "0 10px 0 0" }} 
        />
        <SocialIcon 
          fgColor={foregroundColor} 
          bgColor={backgroundColor} 
          url="https://opensea.io/0xada76eDF6797357b357F0FB218A6E4CF8dAe80D9" 
          style={{ height: "36px", width: "36px", minWidth: "36px", margin: "0 10px 0 0" }} 
        />
        <SocialIcon 
          fgColor={foregroundColor} 
          bgColor={backgroundColor} 
          url="https://app.ens.domains/originvault.box" 
          style={{ height: "36px", width: "36px", minWidth: "36px" }} 
        />
      </Box>
      
      <Box style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '10px',
      }}>
        <SocialIcon 
          fgColor={foregroundColor} 
          bgColor={backgroundColor} 
          url="https://linkedin.com/company/originvault" 
          style={{ height: "36px", width: "36px", minWidth: "36px", marginRight: "10px" }} 
        />
        <SocialIcon 
          fgColor={foregroundColor} 
          bgColor={backgroundColor} 
          url="https://bsky.app/profile/originvault.bsky.social" 
          style={{ height: "36px", width: "36px", minWidth: "36px", margin: "0 10px 0 0" }} 
        />
        <SocialIcon 
          fgColor={foregroundColor} 
          bgColor={backgroundColor} 
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
            backgroundColor: backgroundColor,
            color: foregroundColor, 
            borderRadius: '50%', 
            cursor: 'pointer' 
          }} 
          alt="Keybase"
        />
      </Box>
      
      <Box style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '12px',
      }}>
        <Link 
          href='https://gray-objective-tiglon-784.mypinata.cloud/ipfs/QmP1GvHBDv5LH6YMEijeug2UujWyuRbW27nDC19zTa5Evg' 
          style={{ color: backgroundColor, textDecoration: 'none', margin: '5px 10px 0 10px' }}
        >
          Terms of Use
        </Link>
        <Link 
          href='https://gray-objective-tiglon-784.mypinata.cloud/ipfs/QmT6hcmUbpvZvmRGQ6SED1zfdbeB9FJ5dRU2SbkH5k1pVj' 
          style={{ color: backgroundColor, textDecoration: 'none', margin: '5px 10px 0 10px' }}
        >
          Privacy Policy
        </Link>
        <Link 
          href='https://schemas.originvault.box' 
          style={{ color: backgroundColor, textDecoration: 'none', margin: '5px 10px 0 10px' }}
        >
          Schema Registry
        </Link>
      </Box>
      
      <Box padding='16px 0' fontSize='12px'>
        &copy; 2025 OriginVault, LLC.
      </Box>
    </Box>
  );
};

export default Footer; 