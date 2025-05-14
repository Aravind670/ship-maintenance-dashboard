// import { Outlet } from 'react-router-dom';
// import { useAuth } from '../../contexts/AuthContext';
// import { Box, AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
// import { Link } from 'react-router-dom';
// import NotificationsIcon from '@mui/icons-material/Notifications';
// import Badge from '@mui/material/Badge';
// import { useNotifications } from '../../contexts/NotificationContext';

// const Layout = () => {
//   const { user, logout } = useAuth();
//   const { unreadCount } = useNotifications();

//   if (!user) {
//     return <Outlet />;
//   }

//   return (
//     <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
//       <AppBar position="static">
//         <Toolbar>
//           <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
//             Ship Maintenance Dashboard
//           </Typography>
//           <Button color="inherit" component={Link} to="/dashboard">
//             Dashboard
//           </Button>
//           <Button color="inherit" component={Link} to="/ships">
//             Ships
//           </Button>
//           <Button color="inherit" component={Link} to="/components">
//             Components
//           </Button>
//           <Button color="inherit" component={Link} to="/jobs">
//             Jobs
//           </Button>
//           <Button color="inherit" component={Link} to="/calendar">
//             Calendar
//           </Button>
//           <Button color="inherit" component={Link} to="/notifications">
//             <Badge badgeContent={unreadCount} color="error">
//               <NotificationsIcon />
//             </Badge>
//           </Button>
//           <Button color="inherit" onClick={logout}>
//             Logout ({user.role})
//           </Button>
//         </Toolbar>
//       </AppBar>
//       <Container maxWidth="lg" sx={{ py: 3, flexGrow: 1 }}>
//         <Outlet />
//       </Container>
//       <Box component="footer" sx={{ py: 2, bgcolor: 'background.paper', mt: 'auto' }}>
//         <Container maxWidth="lg">
//           <Typography variant="body2" color="text.secondary" align="center">
//             © {new Date().getFullYear()} ENTNT Ship Maintenance System
//           </Typography>
//         </Container>
//       </Box>
//     </Box>
//   );
// };

// export default Layout;


import { Outlet, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useNotifications } from '../../contexts/NotificationContext';

import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  Badge,
  useTheme,
  IconButton,
} from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';

const Layout = () => {
  const { user, logout } = useAuth();
  const { unreadCount } = useNotifications();
  const location = useLocation();
  const theme = useTheme();

  if (!user) {
    return <Outlet />;
  }

  const navItems = [
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Ships', path: '/ships' },
    { label: 'Components', path: '/components' },
    { label: 'Jobs', path: '/jobs' },
    { label: 'Calendar', path: '/calendar' },
  ];

  const isActive = (path) => location.pathname.startsWith(path);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* AppBar */}
      <AppBar
        position="static"
        sx={{
          background: 'linear-gradient(to right, #3f51b5, #1a237e)',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
        }}
      >
        <Toolbar sx={{ gap: 2 }}>
          <Typography
            variant="h6"
            sx={{
              flexGrow: 1,
              fontWeight: 600,
              letterSpacing: 0.5,
            }}
          >
            Ship Maintenance Dashboard
          </Typography>

          {/* Navigation */}
          {navItems.map((item) => (
            <Button
              key={item.path}
              component={Link}
              to={item.path}
              sx={{
                color: isActive(item.path) ? '#1a237e' : '#fff',
                backgroundColor: isActive(item.path)
                  ? 'rgba(255, 255, 255, 0.9)'
                  : 'transparent',
                fontWeight: 600,
                textTransform: 'none',
                borderRadius: 2,
                px: 2,
                '&:hover': {
                  backgroundColor: isActive(item.path)
                    ? 'rgba(255, 255, 255, 1)'
                    : 'rgba(255,255,255,0.1)',
                },
              }}
            >
              {item.label}
            </Button>
          ))}

          {/* Notifications */}
          <IconButton
            component={Link}
            to="/notifications"
            sx={{
              borderRadius: 2,
              color: location.pathname.startsWith('/notifications') ? '#1a237e' : '#fff',
              backgroundColor: location.pathname.startsWith('/notifications')
                ? 'rgba(255, 255, 255, 0.9)'
                : 'transparent',
              '&:hover': {
                backgroundColor: location.pathname.startsWith('/notifications')
                  ? 'rgba(255, 255, 255, 1)'
                  : 'rgba(255,255,255,0.1)',
              },
            }}
          >
            <Badge badgeContent={unreadCount} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>

          {/* Logout */}
          <Button
            onClick={logout}
            sx={{
              color: '#fff',
              textTransform: 'none',
              fontWeight: 500,
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.1)',
              },
            }}
          >
            Logout ({user.role})
          </Button>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ py: 4, flexGrow: 1 }}>
        <Outlet />
      </Container>

      {/* Footer */}
      <Box
        component="footer"
        sx={{
          py: 2,
          mt: 'auto',
          bgcolor: theme.palette.mode === 'dark' ? '#1a1a1a' : '#f5f5f5',
          borderTop: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="body2" color="text.secondary" align="center">
            © {new Date().getFullYear()} ENTNT Ship Maintenance System
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default Layout;
