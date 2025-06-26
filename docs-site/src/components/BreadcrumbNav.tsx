import React from 'react';
import { Breadcrumbs, Link, Typography } from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

interface BreadcrumbNavProps {
  className?: string;
}

const BreadcrumbNav: React.FC<BreadcrumbNavProps> = ({ className }) => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  const breadcrumbNameMap: { [key: string]: string } = {
    '/schemas': 'Schema Explorer',
    '/quickType': 'QuickType Guide',
    '/explorer': 'Schema Explorer',
    '/': 'Home'
  };

  return (
    <Breadcrumbs 
      aria-label="breadcrumb" 
      separator={<NavigateNextIcon fontSize="small" />}
      className={className}
      sx={{ mb: 2 }}
    >
      <Link
        component={RouterLink}
        to="/"
        color="inherit"
        underline="hover"
        sx={{ 
          display: 'flex', 
          alignItems: 'center',
          fontFamily: 'Thiccboi'
        }}
      >
        Home
      </Link>
      
      {pathnames.map((value, index) => {
        const last = index === pathnames.length - 1;
        const to = `/${pathnames.slice(0, index + 1).join('/')}`;
        const breadcrumbName = breadcrumbNameMap[to] || value.charAt(0).toUpperCase() + value.slice(1);

        return last ? (
          <Typography 
            color="text.primary" 
            key={to}
            sx={{ fontFamily: 'Thiccboi' }}
          >
            {breadcrumbName}
          </Typography>
        ) : (
          <Link
            component={RouterLink}
            to={to}
            key={to}
            color="inherit"
            underline="hover"
            sx={{ 
              display: 'flex', 
              alignItems: 'center',
              fontFamily: 'Thiccboi'
            }}
          >
            {breadcrumbName}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
};

export default BreadcrumbNav; 