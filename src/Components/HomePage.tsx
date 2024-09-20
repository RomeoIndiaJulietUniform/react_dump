import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { Button, TextField, Box, Typography, Container } from '@mui/material';
import { keyframes } from '@mui/system';

// Define the type for the response data
interface ResponseData {
  name: string;
  email: string;
  phone: string;
}

// Keyframes for the animated gradient background
const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

function HomePage() {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [responseData, setResponseData] = useState<ResponseData | null>(null); // Define as ResponseData or null
  const [error, setError] = useState<string>('');


  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');

    try {
      const response = await axios.post<ResponseData>('http://localhost:3000/login', {
        name,
        email,
        phone,
      });
      setResponseData(response.data);
    } catch (err) {
      setError('Submission failed');
    }
  };

  // Handle input changes
  const handleInputChange = (setter: React.Dispatch<React.SetStateAction<string>>) => 
    (event: ChangeEvent<HTMLInputElement>) => {
      setter(event.target.value);
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(45deg, #ff6ec4, #7873f5)',
        backgroundSize: '200% 200%',
        animation: `${gradientAnimation} 6s ease infinite`, // Adding animation
      }}
    >
      <Box
        sx={{
          p: 4,
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          borderRadius: '16px',
          boxShadow: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography variant="h4" gutterBottom>
          Login
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            label="Name"
            fullWidth
            value={name}
            onChange={handleInputChange(setName)}
            required
          />
          <TextField
            label="Email"
            fullWidth
            value={email}
            onChange={handleInputChange(setEmail)}
            required
            sx={{ mt: 2 }}
          />
          <TextField
            label="Phone"
            fullWidth
            value={phone}
            onChange={handleInputChange(setPhone)}
            required
            sx={{ mt: 2 }}
          />
          {error && (
            <Typography color="error" variant="body2">
              {error}
            </Typography>
          )}
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>
            Submit
          </Button>
        </Box>
        {responseData && (
          <Typography variant="h6" sx={{ mt: 2 }}>
            Welcome, {responseData.name}! Your email is {responseData.email} and your phone number is {responseData.phone}.
          </Typography>
        )}
      </Box>
    </Container>
  );
}

export default HomePage;
