import React, { useState } from 'react'
import { Outlet, Link, useLocation } from 'react-router-dom'
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  Container,
  Grid,
  Paper,
  Divider,
  useTheme,
  useMediaQuery,
  Menu,
  MenuItem,
  ListItemButton,
  Stack,
  Chip
} from '@mui/material'
import {
  Home as HomeIcon,
  Explore as ExploreIcon,
  Book as BookIcon,
  FlashOn as FlashIcon,
  Menu as MenuIcon,
  Close as CloseIcon,
  GitHub as GitHubIcon,
  OpenInNew as ExternalLinkIcon,
  ChevronDown as ChevronDownIcon
} from '@mui/icons-material'

interface NavigationItem {
  name: string
  href: string
  icon: React.ComponentType<{ className?: string }>
}

interface DocsSubmenuItem {
  name: string
  href: string
}

const Layout: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)
  const [isDocsOpen, setIsDocsOpen] = useState<boolean>(false)
  const [docsAnchorEl, setDocsAnchorEl] = useState<null | HTMLElement>(null)
  const location = useLocation()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  const navigation: NavigationItem[] = [
    { name: 'Home', href: '/', icon: HomeIcon },
    { name: 'Schema Explorer', href: '/explorer', icon: ExploreIcon },
    { name: 'Documentation', href: '/docs', icon: BookIcon },
    { name: 'QuickType Guide', href: '/quicktype', icon: FlashIcon }
  ]

  const docsSubmenu: DocsSubmenuItem[] = [
    { name: 'Implementation Guides', href: '/docs/guides' },
    { name: 'Architecture', href: '/docs/architecture' },
    { name: 'Governance', href: '/docs/governance' },
    { name: 'Migration', href: '/docs/migration' }
  ]

  const isActive = (href: string): boolean => location.pathname === href

  const handleDocsMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setDocsAnchorEl(event.currentTarget)
    setIsDocsOpen(true)
  }

  const handleDocsMenuClose = () => {
    setDocsAnchorEl(null)
    setIsDocsOpen(false)
  }

  const handleMobileMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="static" elevation={1}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {/* Logo */}
            <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
              <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box
                    sx={{
                      width: 32,
                      height: 32,
                      bgcolor: 'primary.main',
                      borderRadius: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <Typography variant="body2" sx={{ color: 'white', fontWeight: 'bold' }}>
                      OV
                    </Typography>
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'text.primary' }}>
                    OriginVault
                  </Typography>
                </Box>
              </Link>
            </Box>

            {/* Desktop Navigation */}
            {!isMobile && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                {navigation.map((item) => {
                  const Icon = item.icon
                  return (
                    <Button
                      key={item.name}
                      component={Link}
                      to={item.href}
                      startIcon={<Icon />}
                      sx={{
                        color: isActive(item.href) ? 'primary.main' : 'text.secondary',
                        bgcolor: isActive(item.href) ? 'primary.50' : 'transparent',
                        '&:hover': {
                          bgcolor: isActive(item.href) ? 'primary.100' : 'action.hover'
                        }
                      }}
                    >
                      {item.name}
                    </Button>
                  )
                })}

                {/* Documentation Dropdown */}
                <Button
                  endIcon={<ChevronDownIcon />}
                  onClick={handleDocsMenuOpen}
                  sx={{
                    color: 'text.secondary',
                    '&:hover': { bgcolor: 'action.hover' }
                  }}
                >
                  <BookIcon sx={{ mr: 1 }} />
                  Docs
                </Button>
                <Menu
                  anchorEl={docsAnchorEl}
                  open={isDocsOpen}
                  onClose={handleDocsMenuClose}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                >
                  {docsSubmenu.map((item) => (
                    <MenuItem
                      key={item.name}
                      component={Link}
                      to={item.href}
                      onClick={handleDocsMenuClose}
                    >
                      {item.name}
                    </MenuItem>
                  ))}
                </Menu>

                {/* External Links */}
                <Stack direction="row" spacing={1}>
                  <IconButton
                    href="https://github.com/originvault/originvault-schema-registry"
                    target="_blank"
                    rel="noopener noreferrer"
                    size="small"
                  >
                    <GitHubIcon />
                  </IconButton>
                  <IconButton
                    href="https://schemas.originvault.box"
                    target="_blank"
                    rel="noopener noreferrer"
                    size="small"
                  >
                    <ExternalLinkIcon />
                  </IconButton>
                </Stack>
              </Box>
            )}

            {/* Mobile menu button */}
            {isMobile && (
              <IconButton
                onClick={handleMobileMenuToggle}
                sx={{ color: 'inherit' }}
              >
                {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
              </IconButton>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Navigation Drawer */}
      <Drawer
        anchor="left"
        open={isMenuOpen && isMobile}
        onClose={handleMobileMenuToggle}
        ModalProps={{
          keepMounted: true // Better mobile performance
        }}
      >
        <Box sx={{ width: 280, pt: 2 }}>
          <List>
            {navigation.map((item) => {
              const Icon = item.icon
              return (
                <ListItem key={item.name} disablePadding>
                  <ListItemButton
                    component={Link}
                    to={item.href}
                    onClick={handleMobileMenuToggle}
                    selected={isActive(item.href)}
                  >
                    <ListItemIcon>
                      <Icon />
                    </ListItemIcon>
                    <ListItemText primary={item.name} />
                  </ListItemButton>
                </ListItem>
              )
            })}
          </List>
        </Box>
      </Drawer>

      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1 }}>
        <Outlet />
      </Box>

      {/* Footer */}
      <Box component="footer" sx={{ bgcolor: 'grey.900', color: 'white', py: 6 }}>
        <Container maxWidth="xl">
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                OriginVault Schema Registry
              </Typography>
              <Typography variant="body2" color="grey.400" paragraph>
                Type-safe, verifiable credential schemas for the decentralized creator economy.
                Built with accessibility and developer experience in mind.
              </Typography>
              <Stack direction="row" spacing={2}>
                <IconButton
                  href="https://github.com/originvault/originvault-schema-registry"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ color: 'grey.400', '&:hover': { color: 'white' } }}
                >
                  <GitHubIcon />
                </IconButton>
              </Stack>
            </Grid>
            
            <Grid item xs={12} md={3}>
              <Typography variant="subtitle2" gutterBottom sx={{ textTransform: 'uppercase', fontWeight: 'bold' }}>
                Documentation
              </Typography>
              <Stack spacing={1}>
                <Button
                  component={Link}
                  to="/docs"
                  sx={{ color: 'grey.400', justifyContent: 'flex-start', '&:hover': { color: 'white' } }}
                >
                  Guides
                </Button>
                <Button
                  component={Link}
                  to="/explorer"
                  sx={{ color: 'grey.400', justifyContent: 'flex-start', '&:hover': { color: 'white' } }}
                >
                  Interactive Explorer
                </Button>
                <Button
                  component={Link}
                  to="/quicktype"
                  sx={{ color: 'grey.400', justifyContent: 'flex-start', '&:hover': { color: 'white' } }}
                >
                  QuickType Guide
                </Button>
              </Stack>
            </Grid>
            
            <Grid item xs={12} md={3}>
              <Typography variant="subtitle2" gutterBottom sx={{ textTransform: 'uppercase', fontWeight: 'bold' }}>
                Resources
              </Typography>
              <Stack spacing={1}>
                <Button
                  href="https://schemas.originvault.box"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ color: 'grey.400', justifyContent: 'flex-start', '&:hover': { color: 'white' } }}
                >
                  Schema Registry
                </Button>
                <Button
                  href="https://quicktype.io"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ color: 'grey.400', justifyContent: 'flex-start', '&:hover': { color: 'white' } }}
                >
                  QuickType
                </Button>
                <Button
                  href="https://www.w3.org/TR/vc-data-model-2.0/"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ color: 'grey.400', justifyContent: 'flex-start', '&:hover': { color: 'white' } }}
                >
                  W3C VC 2.0
                </Button>
              </Stack>
            </Grid>
          </Grid>
          
          <Divider sx={{ my: 4, borderColor: 'grey.800' }} />
          
          <Typography variant="body2" color="grey.400" align="center">
            © 2024 OriginVault. Built with accessibility and open standards in mind.
          </Typography>
        </Container>
      </Box>
    </Box>
  )
}

export default Layout 