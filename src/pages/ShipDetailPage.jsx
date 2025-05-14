import { useParams } from 'react-router-dom';
import { Box, Typography, Paper, Tabs, Tab } from '@mui/material';
import { useState } from 'react';
import { getData } from '../utils/localStorageUtils';
import ComponentList from '../components/Components/ComponentList';

const ShipDetailPage = () => {
  const { id } = useParams();
  const [tabValue, setTabValue] = useState(0);
  const ships = getData('ships');
  const currentShip = ships.find(ship => ship.id === id);

  if (!currentShip) {
    return <Typography>Ship not found</Typography>;
  }

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        {currentShip.name}
      </Typography>
      
      <Paper sx={{ p: 2, mb: 2 }}>
        <Typography variant="h6">General Information</Typography>
        <Typography>IMO: {currentShip.imo}</Typography>
        <Typography>Flag: {currentShip.flag}</Typography>
        <Typography>Status: {currentShip.status}</Typography>
      </Paper>

      <Tabs value={tabValue} onChange={handleTabChange}>
        <Tab label="Components" />
        <Tab label="Maintenance History" />
      </Tabs>

      {tabValue === 0 && (
        <Box mt={2}>
          <ComponentList shipId={id} />
        </Box>
      )}

      {tabValue === 1 && (
        <Box mt={2}>
          <Typography>Maintenance history will be displayed here</Typography>
        </Box>
      )}
    </Box>
  );
};

export default ShipDetailPage;