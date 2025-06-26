import React from 'react'
import { Link } from 'react-router-dom'
import { Box, Typography, Button, Container, useTheme } from '@mui/material'

const NotFound: React.FC = () => {
  const theme = useTheme();
  
  return (
    <Container maxWidth="lg" sx={{ py: 12 }}>
      <Box sx={{ textAlign: 'center' }}>
        <Typography 
          variant="h1" 
          sx={{ 
            fontSize: '6rem', 
            fontWeight: 700, 
            mb: 2,
            color: theme.palette.text.primary,
            fontFamily: 'Thiccboi, Roboto, Helvetica, Arial, sans-serif',
          }}
        >
          404
        </Typography>
        <Typography 
          variant="h2" 
          sx={{ 
            fontSize: '2rem', 
            fontWeight: 600, 
            mb: 2,
            color: theme.palette.text.secondary,
            fontFamily: 'Thiccboi, Roboto, Helvetica, Arial, sans-serif',
          }}
        >
          Page Not Found
        </Typography>
        <Typography 
          variant="body1" 
          sx={{ 
            mb: 4,
            color: theme.palette.text.secondary,
            fontFamily: 'Thiccboi, Roboto, Helvetica, Arial, sans-serif',
          }}
        >
          The page you're looking for doesn't exist.
        </Typography>
        <Button
          component={Link}
          to="/"
          variant="contained"
          size="large"
          sx={{ 
            fontFamily: 'Thiccboi, Roboto, Helvetica, Arial, sans-serif',
            px: 3,
            py: 1.5,
            borderRadius: 2,
          }}
        >
          Go Home
        </Button>
      </Box>
    </Container>
  )
}

export default NotFound 