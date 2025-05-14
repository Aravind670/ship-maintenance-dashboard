// import { useEffect, useState } from 'react';
// import { getData } from '../../utils/localStorageUtils';
// import { Card, CardContent, Typography, Grid, Box } from '@mui/material';
// import { DirectionsBoat, Engineering, Build, CheckCircle } from '@mui/icons-material';

// const KPICards = () => {
//   const [kpis, setKpis] = useState({
//     totalShips: 0,
//     overdueComponents: 0,
//     jobsInProgress: 0,
//     completedJobs: 0
//   });

//   useEffect(() => {
//     const ships = getData('ships');
//     const components = getData('components');
//     const jobs = getData('jobs');
    
//     const today = new Date();
//     const overdueComponents = components.filter(comp => {
//       const lastMaintenance = new Date(comp.lastMaintenanceDate);
//       const monthsDiff = (today.getFullYear() - lastMaintenance.getFullYear()) * 12 + 
//                          (today.getMonth() - lastMaintenance.getMonth());
//       return monthsDiff > 6; // Overdue if more than 6 months since last maintenance
//     }).length;

//     setKpis({
//       totalShips: ships.length,
//       overdueComponents,
//       jobsInProgress: jobs.filter(job => job.status === 'In Progress').length,
//       completedJobs: jobs.filter(job => job.status === 'Completed').length
//     });
//   }, []);

//   const kpiData = [
//     { title: 'Total Ships', value: kpis.totalShips, icon: <DirectionsBoat fontSize="large" />, color: '#3f51b5' },
//     { title: 'Overdue Components', value: kpis.overdueComponents, icon: <Engineering fontSize="large" />, color: '#f44336' },
//     { title: 'Jobs In Progress', value: kpis.jobsInProgress, icon: <Build fontSize="large" />, color: '#ff9800' },
//     { title: 'Completed Jobs', value: kpis.completedJobs, icon: <CheckCircle fontSize="large" />, color: '#4caf50' }
//   ];

//   return (
//     <Grid container spacing={3}>
//       {kpiData.map((kpi, index) => (
//         <Grid item xs={12} sm={6} md={3} key={index}>
//           <Card sx={{ height: '100%' }}>
//             <CardContent>
//               <Box display="flex" justifyContent="space-between" alignItems="center">
//                 <Box>
//                   <Typography variant="h6" color="textSecondary">
//                     {kpi.title}
//                   </Typography>
//                   <Typography variant="h4" component="div">
//                     {kpi.value}
//                   </Typography>
//                 </Box>
//                 <Box sx={{ color: kpi.color }}>
//                   {kpi.icon}
//                 </Box>
//               </Box>
//             </CardContent>
//           </Card>
//         </Grid>
//       ))}
//     </Grid>
//   );
// };

// export default KPICards;



import { useEffect, useState } from 'react';
import { getData } from '../../utils/localStorageUtils';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
} from '@mui/material';
import {
  DirectionsBoat,
  Engineering,
  Build,
  CheckCircle,
} from '@mui/icons-material';

const KPICards = () => {
  const [kpis, setKpis] = useState({
    totalShips: 0,
    overdueComponents: 0,
    jobsInProgress: 0,
    completedJobs: 0,
  });

  useEffect(() => {
    const ships = getData('ships') || [];
    const components = getData('components') || [];
    const jobs = getData('jobs') || [];

    const today = new Date();
    const overdueComponents = components.filter((comp) => {
      const lastMaintenance = new Date(comp.lastMaintenanceDate);
      const monthsDiff =
        (today.getFullYear() - lastMaintenance.getFullYear()) * 12 +
        (today.getMonth() - lastMaintenance.getMonth());
      return monthsDiff > 6;
    }).length;

    setKpis({
      totalShips: ships.length,
      overdueComponents,
      jobsInProgress: jobs.filter((job) => job.status === 'In Progress').length,
      completedJobs: jobs.filter((job) => job.status === 'Completed').length,
    });
  }, []);

  const kpiData = [
    {
      title: 'Total Ships',
      value: kpis.totalShips,
      icon: <DirectionsBoat sx={{ fontSize: 50 }} />,
      color: '#667eea',
      bg: 'linear-gradient(to right, #667eea, #764ba2)',
    },
    {
      title: 'Overdue Components',
      value: kpis.overdueComponents,
      icon: <Engineering sx={{ fontSize: 50 }} />,
      color: '#f44336',
      bg: 'linear-gradient(to right, #ff6a6a, #f44336)',
    },
    {
      title: 'Jobs In Progress',
      value: kpis.jobsInProgress,
      icon: <Build sx={{ fontSize: 50 }} />,
      color: '#ff9800',
      bg: 'linear-gradient(to right, #ffb347, #ff9800)',
    },
    {
      title: 'Completed Jobs',
      value: kpis.completedJobs,
      icon: <CheckCircle sx={{ fontSize: 50 }} />,
      color: '#4caf50',
      bg: 'linear-gradient(to right, #81c784, #4caf50)',
    },
  ];

  return (
    <Grid container spacing={4} sx={{ mt: 2 }}>
      {kpiData.map((kpi, index) => (
        <Grid item xs={12} sm={6} md={3} key={index}>
          <Card
            sx={{
              height: '100%',
              minHeight: 180,
              borderRadius: 4,
              backdropFilter: 'blur(10px)',
              background: kpi.bg,
              color: '#fff',
              boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
              transition: 'transform 0.3s ease',
              '&:hover': {
                transform: 'translateY(-5px)',
              },
            }}
          >
            <CardContent sx={{ p: 4 }}>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Box>
                  <Typography
                    variant="subtitle1"
                    sx={{ opacity: 0.9, letterSpacing: 0.5 }}
                  >
                    {kpi.title}
                  </Typography>
                  <Typography variant="h3" fontWeight="bold">
                    {kpi.value}
                  </Typography>
                </Box>
                <Box sx={{ color: '#fff' }}>{kpi.icon}</Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default KPICards;
