import { useState } from 'react';
import API from '../services/api';
import { TextField, Button, Container } from '@mui/material';

export default function Login({ setAuth }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const { data } = await API.post('/auth/login', { email, password });
      localStorage.setItem('token', data.token);
      setAuth(true);
    } catch (err) {
      alert('Login failed');
    }
  };

  return (
    <Container maxWidth="sm">
      <h2>Login</h2>
      <TextField fullWidth margin="normal" label="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <TextField fullWidth margin="normal" type="password" label="Password" value={password} onChange={e => setPassword(e.target.value)} />
      <Button fullWidth variant="contained" onClick={handleLogin}>Login</Button>
    </Container>
  );
}
