// import { useState } from 'react';
// import { useAuth } from '../../contexts/AuthContext';
// import { useNavigate } from 'react-router-dom';
// import { TextField, Button, Box, Typography, Paper } from '@mui/material';

// const LoginForm = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const { login } = useAuth();
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
    
//     if (!email || !password) {
//       setError('Please fill in all fields');
//       return;
//     }

//     const success = login(email, password);
//     if (success) {
//       navigate('/dashboard');
//     } else {
//       setError('Invalid email or password');
//     }
//   };

//   return (
//     <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
//       <Paper elevation={3} sx={{ p: 4, width: 400 }}>
//         <Typography variant="h4" component="h1" gutterBottom textAlign="center">
//           Ship Maintenance Dashboard
//         </Typography>
//         <Typography variant="h6" component="h2" gutterBottom textAlign="center">
//           Login
//         </Typography>
        
//         {error && (
//           <Typography color="error" textAlign="center" sx={{ mb: 2 }}>
//             {error}
//           </Typography>
//         )}

//         <form onSubmit={handleSubmit}>
//           <TextField
//             label="Email"
//             type="email"
//             fullWidth
//             margin="normal"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//           <TextField
//             label="Password"
//             type="password"
//             fullWidth
//             margin="normal"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//           <Button
//             type="submit"
//             variant="contained"
//             fullWidth
//             sx={{ mt: 3, mb: 2 }}
//           >
//             Login
//           </Button>
//         </form>
//       </Paper>
//     </Box>
//   );
// };

// export default LoginForm;



import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  TextField,
  Button,
  Box,
  Typography,
  Paper,
  CircularProgress,
} from '@mui/material';
import { useAuth } from '../../contexts/AuthContext';

const LoginForm = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const { email, password } = credentials;

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      const success = login(email, password);
      if (success) {
        navigate('/dashboard');
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(to right, #3f51b5, #1a237e)',
        px: 2,
      }}
    >
      <Paper
        elevation={10}
        sx={{
          backdropFilter: 'blur(12px)',
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
          borderRadius: 4,
          p: 5,
          width: '100%',
          maxWidth: 400,
          color: '#fff',
        }}
      >
        <Box textAlign="center" mb={3}>
          {/* You can replace this with a real logo */}
          <Typography variant="h4" fontWeight="bold">
            Ship Maintainance Dashboard
          </Typography>
          <Typography variant="subtitle1" sx={{ opacity: 0.8 }}>
            Login to continue
          </Typography>
        </Box>

        {error && (
          <Typography
            variant="body2"
            color="error"
            align="center"
            sx={{ mb: 2 }}
          >
            {error}
          </Typography>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <TextField
            label="Email"
            name="email"
            type="email"
            fullWidth
            margin="normal"
            value={credentials.email}
            onChange={handleChange}
            required
            autoComplete="email"
            InputLabelProps={{ style: { color: '#fff' } }}
            InputProps={{
              style: { color: '#fff' },
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: '#ffffff55' },
                '&:hover fieldset': { borderColor: '#fff' },
              },
            }}
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            fullWidth
            margin="normal"
            value={credentials.password}
            onChange={handleChange}
            required
            autoComplete="current-password"
            InputLabelProps={{ style: { color: '#fff' } }}
            InputProps={{
              style: { color: '#fff' },
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: '#ffffff55' },
                '&:hover fieldset': { borderColor: '#fff' },
              },
            }}
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            size="large"
            sx={{
              mt: 3,
              py: 1.5,
              fontWeight: 'bold',
              borderRadius: 2,
              backgroundColor: '#fff',
              color: '#1a237e',
              '&:hover': {
                backgroundColor: '#f0f0f0',
              },
            }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Login'}
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default LoginForm;

