import { Box, Typography } from '@mui/material';
import KPICards from '../components/Dashboard/KPICards';

const DashboardPage = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <KPICards />
    </Box>
  );
};

export default DashboardPage;