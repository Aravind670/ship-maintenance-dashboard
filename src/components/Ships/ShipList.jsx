// import { useState } from 'react';
// import { useShips } from '../../contexts/ShipsContext';
// import { useAuth } from '../../contexts/AuthContext';
// import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, IconButton, Typography, Box } from '@mui/material';
// import { Edit, Delete, Add } from '@mui/icons-material';
// import { Link } from 'react-router-dom';
// import ShipForm from './ShipForm';

// const ShipList = () => {
//   const { ships, loading, deleteShip } = useShips();
//   const { user } = useAuth();
//   const [openForm, setOpenForm] = useState(false);
//   const [selectedShip, setSelectedShip] = useState(null);

//   const handleEdit = (ship) => {
//     setSelectedShip(ship);
//     setOpenForm(true);
//   };

//   if (loading) return <Typography>Loading ships...</Typography>;

//   return (
//     <Box>
//       <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
//         <Typography variant="h4">Ships</Typography>
//         {user?.role === 'Admin' && (
//           <Button 
//             variant="contained" 
//             startIcon={<Add />} 
//             onClick={() => {
//               setSelectedShip(null);
//               setOpenForm(true);
//             }}
//           >
//             Add Ship
//           </Button>
//         )}
//       </Box>

//       <ShipForm 
//         open={openForm} 
//         onClose={() => {
//           setOpenForm(false);
//           setSelectedShip(null);
//         }} 
//         ship={selectedShip}
//       />

//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>Name</TableCell>
//               <TableCell>IMO Number</TableCell>
//               <TableCell>Flag</TableCell>
//               <TableCell>Status</TableCell>
//               <TableCell>Actions</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {ships.map((ship) => (
//               <TableRow key={ship.id}>
//                 <TableCell>
//                   <Link to={`/ships/${ship.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
//                     {ship.name}
//                   </Link>
//                 </TableCell>
//                 <TableCell>{ship.imo}</TableCell>
//                 <TableCell>{ship.flag}</TableCell>
//                 <TableCell>{ship.status}</TableCell>
//                 <TableCell>
//                   <IconButton onClick={() => handleEdit(ship)}>
//                     <Edit color="primary" />
//                   </IconButton>
//                   {user?.role === 'Admin' && (
//                     <IconButton onClick={() => deleteShip(ship.id)}>
//                       <Delete color="error" />
//                     </IconButton>
//                   )}
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </Box>
//   );
// };

// export default ShipList;


import { useState } from 'react';
import { useShips } from '../../contexts/ShipsContext';
import { useAuth } from '../../contexts/AuthContext';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  IconButton,
  Typography,
  Box,
  Snackbar,
  Alert,
} from '@mui/material';
import { Edit, Delete, Add } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import ShipForm from './ShipForm';

const ShipList = () => {
  const { ships, loading, deleteShip } = useShips();
  const { user } = useAuth();
  const [openForm, setOpenForm] = useState(false);
  const [selectedShip, setSelectedShip] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleEdit = (ship) => {
    setSelectedShip(ship);
    setOpenForm(true);
  };

  const handleFormSubmitSuccess = (message) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
    setOpenForm(false);
    setSelectedShip(null);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  if (loading) return <Typography>Loading ships...</Typography>;

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h4">Ships</Typography>
        {user?.role === 'Admin' && (
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => {
              setSelectedShip(null);
              setOpenForm(true);
            }}
            sx={{
              backgroundColor: '#1a237e',
              color: '#fff',
              '&:hover': {
                backgroundColor: '#151c6a',
              },
              textTransform: 'none',
              fontWeight: 500,
            }}
          >
            Add Ship
          </Button>
        )}
      </Box>

      <ShipForm
        open={openForm}
        onClose={() => {
          setOpenForm(false);
          setSelectedShip(null);
        }}
        ship={selectedShip}
        onSubmitSuccess={handleFormSubmitSuccess}
      />

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><b>Name</b></TableCell>
              <TableCell><b>IMO Number</b></TableCell>
              <TableCell><b>Flag</b></TableCell>
              <TableCell><b>Status</b></TableCell>
              <TableCell><b>Actions</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ships.map((ship) => (
              <TableRow key={ship.id}>
                <TableCell>
                  <Link to={`/ships/${ship.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    {ship.name}
                  </Link>
                </TableCell>
                <TableCell>{ship.imo}</TableCell>
                <TableCell>{ship.flag}</TableCell>
                <TableCell>{ship.status}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEdit(ship)}>
                    <Edit color="primary" />
                  </IconButton>
                  {user?.role === 'Admin' && (
                    <IconButton onClick={() => deleteShip(ship.id)}>
                      <Delete color="error" />
                    </IconButton>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ShipList;