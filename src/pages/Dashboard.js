import { useEffect, useState } from 'react';
import API from '../services/api';
import TokenList from '../components/TokenList';
import { Button, Container, Typography } from '@mui/material';

export default function Dashboard({ setAuth }) {
  const [tokens, setTokens] = useState([]);

  const fetchQueue = async () => {
    const { data } = await API.get('/queues/my');
    const queueId = data.data._id;
    const tokensRes = await API.get(`/queues/${queueId}`);
    setTokens(tokensRes.data.data.tokens);
  };

  const handleServe = async (tokenId) => {
    await API.put(`/tokens/serve/${tokenId}`);
    fetchQueue();
  };

  const handleCancel = async (tokenId) => {
    await API.put(`/tokens/cancel/${tokenId}`);
    fetchQueue();
  };

  const logout = () => {
    localStorage.removeItem('token');
    setAuth(false);
  };

  useEffect(() => {
    fetchQueue();
  }, []);

  return (
    <Container>
      <Typography variant="h4">Dashboard</Typography>
      <Button onClick={logout} variant="outlined">Logout</Button>
      <TokenList tokens={tokens} onServe={handleServe} onCancel={handleCancel} />
    </Container>
  );
}
