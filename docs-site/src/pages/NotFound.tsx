import React from 'react'
import { Link } from 'react-router-dom'
import { Box, Typography, Button, Container } from '@mui/material'

const NotFound: React.FC = () => {
  // const theme = useTheme();
  
  return (
    <Container maxWidth="lg" sx={{ py: 12 }}>
      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="h1" component="h1" gutterBottom>
          404
        </Typography>
        <Typography variant="h4" component="h2" gutterBottom>
          Page Not Found
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          The page you're looking for doesn't exist or has been moved.
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Check the URL or navigate back to the home page.
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