// import { useState, useEffect } from 'react';
// import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';
// import { useShips } from '../../contexts/ShipsContext';

// const ShipForm = ({ open, onClose, ship }) => {
//   const { addShip, updateShip } = useShips();
//   const [formData, setFormData] = useState({
//     name: '',
//     imo: '',
//     flag: '',
//     status: 'Active'
//   });

//   useEffect(() => {
//     if (ship) {
//       setFormData(ship);
//     } else {
//       setFormData({
//         name: '',
//         imo: '',
//         flag: '',
//         status: 'Active'
//       });
//     }
//   }, [ship]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (ship) {
//       updateShip(ship.id, formData);
//     } else {
//       addShip(formData);
//     }
//     onClose();
//   };

//   return (
//     <Dialog open={open} onClose={onClose}>
//       <DialogTitle>{ 'Edit Ship'}</DialogTitle>
//       <DialogContent>
//         <form onSubmit={handleSubmit}>
//           <TextField
//             margin="normal"
//             fullWidth
//             label="Name"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             required
//           />
//           <TextField
//             margin="normal"
//             fullWidth
//             label="IMO Number"
//             name="imo"
//             value={formData.imo}
//             onChange={handleChange}
//             required
//           />
//           <TextField
//             margin="normal"
//             fullWidth
//             label="Flag"
//             name="flag"
//             value={formData.flag}
//             onChange={handleChange}
//             required
//           />
//           <TextField
//             margin="normal"
//             fullWidth
//             select
//             label="Status"
//             name="status"
//             value={formData.status}
//             onChange={handleChange}
//             SelectProps={{ native: true }}
//           >
//             <option value="Active">Active</option>
//             <option value="Under Maintenance">Under Maintenance</option>
//             <option value="Inactive">Inactive</option>
//           </TextField>
//         </form>
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={onClose}>Cancel</Button>
//         <Button onClick={handleSubmit} color="primary" variant="contained">
//           {ship ? 'Update' : 'Add'}
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// export default ShipForm;



import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box
} from '@mui/material';
import { useShips } from '../../contexts/ShipsContext';

const ShipForm = ({ open, onClose, ship, onSubmitSuccess }) => {
  const { addShip, updateShip } = useShips();
  const [formData, setFormData] = useState({
    name: '',
    imo: '',
    flag: '',
    status: 'Active'
  });

  useEffect(() => {
    if (ship) {
      setFormData(ship);
    } else {
      setFormData({
        name: '',
        imo: '',
        flag: '',
        status: 'Active'
      });
    }
  }, [ship]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (ship) {
        await updateShip(ship.id, formData);
        onSubmitSuccess('Ship successfully updated');
      } else {
        await addShip(formData);
        onSubmitSuccess('Ship successfully added');
      }
    } catch (error) {
      console.error('Error submitting ship:', error);
      // You could add error handling here if needed
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle
        sx={{
          fontWeight: 'bold',
          textAlign: 'center',
          py: 2
        }}
      >
        {ship ? 'Edit Ship' : 'Add Ship'}
      </DialogTitle>
      <DialogContent sx={{ py: 3 }}>
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            margin="dense"
            fullWidth
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <TextField
            margin="dense"
            fullWidth
            label="IMO Number"
            name="imo"
            value={formData.imo}
            onChange={handleChange}
            required
          />
          <TextField
            margin="dense"
            fullWidth
            label="Flag"
            name="flag"
            value={formData.flag}
            onChange={handleChange}
            required
          />
          <TextField
            margin="dense"
            fullWidth
            select
            label="Status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            SelectProps={{ native: true }}
          >
            <option value="Active">Active</option>
            <option value="Under Maintenance">Under Maintenance</option>
            <option value="Inactive">Inactive</option>
          </TextField>
        </Box>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button
          onClick={onClose}
          variant="outlined"
          sx={{
            color: '#1a237e',
            borderColor: '#1a237e',
            textTransform: 'none',
            fontWeight: 500,
            '&:hover': {
              backgroundColor: '#f3f4fd',
              borderColor: '#1a237e'
            }
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          sx={{
            backgroundColor: '#1a237e',
            color: '#fff',
            textTransform: 'none',
            fontWeight: 500,
            '&:hover': {
              backgroundColor: '#151c6a'
            }
          }}
        >
          {ship ? 'Update' : 'Add'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ShipForm;