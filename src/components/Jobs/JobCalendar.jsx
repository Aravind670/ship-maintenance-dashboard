// import { useState } from 'react';
// import { getData } from '../../utils/localStorageUtils';
// import { LocalizationProvider, DateCalendar } from '@mui/x-date-pickers';
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// import { Box, Typography, Paper, List, ListItem, ListItemText, Divider } from '@mui/material';
// import { format } from 'date-fns';

// const JobCalendar = () => {
//   const [date, setDate] = useState(new Date());
//   const [selectedDate, setSelectedDate] = useState(new Date());
//   const jobs = getData('jobs');
//   const ships = getData('ships');
//   const components = getData('components');
//   const users = getData('users');

//   const jobsOnSelectedDate = jobs.filter(job => 
//     format(new Date(job.scheduledDate), 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd')
//   );

//   const getShipName = (shipId) => ships.find(ship => ship.id === shipId)?.name || 'Unknown Ship';
//   const getComponentName = (componentId) => components.find(comp => comp.id === componentId)?.name || 'Unknown Component';
//   const getEngineerName = (engineerId) => users.find(user => user.id === engineerId)?.email || 'Unassigned';

//   return (
//     <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 2 }}>
//       <Paper sx={{ p: 2, flex: 1 }}>
//         <LocalizationProvider dateAdapter={AdapterDateFns}>
//           <DateCalendar
//             value={date}
//             onChange={(newDate) => {
//               setDate(newDate);
//               setSelectedDate(newDate);
//             }}
//           />
//         </LocalizationProvider>
//       </Paper>
      
//       <Paper sx={{ p: 2, flex: 2 }}>
//         <Typography variant="h6" gutterBottom>
//           Jobs on {format(selectedDate, 'MMMM d, yyyy')}
//         </Typography>
        
//         {jobsOnSelectedDate.length === 0 ? (
//           <Typography>No jobs scheduled for this day</Typography>
//         ) : (
//           <List>
//             {jobsOnSelectedDate.map((job, index) => (
//               <Box key={job.id}>
//                 <ListItem>
//                   <ListItemText
//                     primary={`${job.type} - ${getComponentName(job.componentId)}`}
//                     secondary={
//                       <>
//                         <Typography component="span" display="block">
//                           Ship: {getShipName(job.shipId)}
//                         </Typography>
//                         <Typography component="span" display="block">
//                           Priority: {job.priority}
//                         </Typography>
//                         <Typography component="span" display="block">
//                           Assigned to: {getEngineerName(job.assignedEngineerId)}
//                         </Typography>
//                       </>
//                     }
//                   />
//                 </ListItem>
//                 {index < jobsOnSelectedDate.length - 1 && <Divider />}
//               </Box>
//             ))}
//           </List>
//         )}
//       </Paper>
//     </Box>
//   );
// };

// export default JobCalendar;



import { useState } from 'react';
import { getData } from '../../utils/localStorageUtils';
import { LocalizationProvider, DateCalendar } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider,
  Stack,
} from '@mui/material';
import { format } from 'date-fns';

const JobCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const jobs = getData('jobs') || [];
  const ships = getData('ships') || [];
  const components = getData('components') || [];
  const users = getData('users') || [];

  const jobsOnSelectedDate = jobs.filter((job) => {
    const jobDate = new Date(job.scheduledDate);
    return !isNaN(jobDate) &&
      format(jobDate, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd');
  });

  const getShipName = (shipId) =>
    ships.find((ship) => ship.id === shipId)?.name || 'Unknown Ship';

  const getComponentName = (componentId) =>
    components.find((comp) => comp.id === componentId)?.name || 'Unknown Component';

  const getEngineerName = (engineerId) =>
    users.find((user) => user.id === engineerId)?.email || 'Unassigned';

  return (
    <Stack
      direction={{ xs: 'column', md: 'row' }}
      spacing={3}
      alignItems="flex-start"
    >
      {/* Calendar Section */}
      <Paper
        elevation={3}
        sx={{
          p: 3,
          borderRadius: 3,
          minWidth: { xs: '100%', md: 320 },
          backgroundColor: '#f3f4f6',
        }}
      >
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DateCalendar
            value={selectedDate}
            onChange={(newDate) => setSelectedDate(newDate)}
          />
        </LocalizationProvider>
      </Paper>

      {/* Job List Section */}
      <Paper
        elevation={3}
        sx={{
          p: 3,
          borderRadius: 3,
          flex: 1,
          width: '100%',
          backgroundColor: '#e8eaf6',
        }}
      >
        <Typography
          variant="h6"
          sx={{ fontWeight: 'bold', mb: 2, color: '#1a237e' }}
        >
          Jobs on {format(selectedDate, 'MMMM d, yyyy')}
        </Typography>

        {jobsOnSelectedDate.length === 0 ? (
          <Typography color="text.secondary">
            No jobs scheduled for this day.
          </Typography>
        ) : (
          <List disablePadding>
            {jobsOnSelectedDate.map((job, index) => (
              <Box key={job.id}>
                <ListItem alignItems="flex-start" disableGutters>
                  <ListItemText
                    primary={
                      <Typography variant="subtitle1" fontWeight="medium" color="#1a237e">
                        {job.type} — {getComponentName(job.componentId)}
                      </Typography>
                    }
                    secondary={
                      <>
                        <Typography variant="body2" color="text.secondary">
                          Ship: {getShipName(job.shipId)}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Priority: {job.priority}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Assigned to: {getEngineerName(job.assignedEngineerId)}
                        </Typography>
                      </>
                    }
                  />
                </ListItem>
                {index < jobsOnSelectedDate.length - 1 && <Divider sx={{ my: 1 }} />}
              </Box>
            ))}
          </List>
        )}
      </Paper>
    </Stack>
  );
};

export default JobCalendar;

