// import { useNotifications } from '../../contexts/NotificationContext';
// import { 
//   Box, 
//   Typography, 
//   List, 
//   ListItem, 
//   ListItemText, 
//   ListItemIcon, 
//   IconButton, 
//   Badge,
//   Paper,
//   Button
// } from '@mui/material';
// import { 
//   Notifications as NotificationsIcon,
//   CheckCircle as CheckCircleIcon,
//   Warning as WarningIcon,
//   Info as InfoIcon,
//   Close as CloseIcon
// } from '@mui/icons-material';

// const NotificationCenter = () => {
//   const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications();

//   const getIcon = (type) => {
//     switch(type) {
//       case 'warning': return <WarningIcon color="warning" />;
//       case 'error': return <WarningIcon color="error" />;
//       case 'success': return <CheckCircleIcon color="success" />;
//       default: return <InfoIcon color="info" />;
//     }
//   };

//   return (
//     <Paper sx={{ p: 2 }}>
//       <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
//         <Typography variant="h6">
//           <Badge badgeContent={unreadCount} color="primary" sx={{ mr: 1 }}>
//             <NotificationsIcon />
//           </Badge>
//           Notifications
//         </Typography>
//         {unreadCount > 0 && (
//           <Button size="small" onClick={markAllAsRead}>
//             Mark all as read
//           </Button>
//         )}
//       </Box>

//       {notifications.length === 0 ? (
//         <Typography>No notifications</Typography>
//       ) : (
//         <List>
//           {notifications.map((notification) => (
//             <ListItem 
//               key={notification.id} 
//               sx={{ 
//                 bgcolor: notification.read ? 'background.paper' : 'action.selected',
//                 borderRadius: 1
//               }}
//             >
//               <ListItemIcon>
//                 {getIcon(notification.type)}
//               </ListItemIcon>
//               <ListItemText
//                 primary={notification.message}
//                 secondary={new Date(notification.timestamp).toLocaleString()}
//               />
//               {!notification.read && (
//                 <IconButton edge="end" onClick={() => markAsRead(notification.id)}>
//                   <CloseIcon fontSize="small" />
//                 </IconButton>
//               )}
//             </ListItem>
//           ))}
//         </List>
//       )}
//     </Paper>
//   );
// };

// export default NotificationCenter;


import { useNotifications } from '../../contexts/NotificationContext';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  Badge,
  Paper,
  Button,
  Divider,
  Stack,
} from '@mui/material';
import {
  Notifications as NotificationsIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  Info as InfoIcon,
  Close as CloseIcon,
} from '@mui/icons-material';

const NotificationCenter = () => {
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications();

  const getIcon = (type) => {
    const iconProps = { sx: { color: '#1a237e' } };
    switch (type) {
      case 'warning':
      case 'error':
        return <WarningIcon {...iconProps} />;
      case 'success':
        return <CheckCircleIcon {...iconProps} />;
      default:
        return <InfoIcon {...iconProps} />;
    }
  };

  return (
    <Paper elevation={4} sx={{ p: 3, borderRadius: 3 }}>
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <Badge badgeContent={unreadCount} color="error">
            <NotificationsIcon sx={{ color: '#1a237e' }} />
          </Badge>
          <Typography variant="h6" fontWeight="bold">
            Notifications
          </Typography>
        </Stack>

        {unreadCount > 0 && (
          <Button
            variant="outlined"
            size="small"
            sx={{ color: '#1a237e', borderColor: '#1a237e', textTransform: 'none' }}
            onClick={markAllAsRead}
          >
            Mark all as read
          </Button>
        )}
      </Box>

      {/* Notification List */}
      {notifications.length === 0 ? (
        <Typography color="text.secondary">No notifications</Typography>
      ) : (
        <List>
          {notifications.map((notification, index) => (
            <Box key={notification.id}>
              <ListItem
                alignItems="flex-start"
                sx={{
                  bgcolor: notification.read ? '#f5f5f5' : '#e8eaf6',
                  borderRadius: 2,
                  mb: 1,
                  px: 2,
                }}
                secondaryAction={
                  !notification.read && (
                    <IconButton edge="end" onClick={() => markAsRead(notification.id)}>
                      <CloseIcon fontSize="small" sx={{ color: '#1a237e' }} />
                    </IconButton>
                  )
                }
              >
                <ListItemIcon sx={{ minWidth: 40 }}>{getIcon(notification.type)}</ListItemIcon>
                <ListItemText
                  primary={
                    <Typography variant="subtitle1" fontWeight={500}>
                      {notification.message}
                    </Typography>
                  }
                  secondary={
                    <Typography variant="caption" color="text.secondary">
                      {new Date(notification.timestamp).toLocaleString()}
                    </Typography>
                  }
                />
              </ListItem>
              {index < notifications.length - 1 && <Divider />}
            </Box>
          ))}
        </List>
      )}
    </Paper>
  );
};

export default NotificationCenter;
