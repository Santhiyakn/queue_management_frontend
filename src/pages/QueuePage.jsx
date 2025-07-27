import { useEffect, useState, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../utils/axios';
import './QueuePage.css';

const QueuePage = () => {
  const { id } = useParams();
  const [queue, setQueue] = useState(null);
  const [tokens, setTokens] = useState([]);
  const [tokenName, setTokenName] = useState('');
   const navigate = useNavigate();

  // Fetch queue and tokens
  const reload = useCallback(async () => {
    try {
      const queueRes = await api.get(`/api/queues/get/${id}`);
      setQueue(queueRes.data.data);

      const tokenRes = await api.get(`/api/tokens/${id}`);
      const filteredAndSorted = tokenRes.data.data
        .filter(token => (token.position !== -1 && token.status !== "assigned"))
        .sort((a, b) => a.position - b.position);

      setTokens(filteredAndSorted);
      // setTokens(tokenRes.data.data);
    } catch (error) {
      console.error('Error loading queue or tokens:', error);
    }
  }, [id]);

  useEffect(() => {
    reload();
  }, [reload]);

  const addToken = async () => {
    if (!tokenName.trim()) return;
    try {
      await api.post('/api/tokens/', { id: id, name: tokenName });
      setTokenName('');
      reload();
    } catch (error) {
      console.error('Error adding token:', error);
    }
  };

  const cancelToken = async (tokenId) => {
    try {
      await api.patch(`/api/tokens/cancel/${tokenId}`);

      reload();
    } catch (error) {
      console.error('Error cancelling token:', error);
    }
  };

  const serveToken = async () => {
    try {
      await api.patch(`/api/tokens/serve/${id}`);
      reload();
    } catch (error) {
      console.error('Error serving token:', error);
    }
  };

  const moveToken = async (tokenId, direction) => {
    try {
      await api.patch('/api/tokens/move', { tokenId, direction });
      reload();
    } catch (error) {
      console.error('Error moving token:', error);
    }
  };

  if (!queue) return <p>Loading...</p>;

  return (
    <div className="queue-container">
      <button onClick={() => navigate(`/dashboard`)}>Back</button>
      <h2>Queue: {queue.name}</h2>
     

      <div className="token-form">
        <input
          value={tokenName}
          onChange={(e) => setTokenName(e.target.value)}
          placeholder="Enter person's name"
        />
        <button onClick={addToken}>Add Token</button>
        <button onClick={serveToken}>Serve Top Token</button>
      </div>

      <ul className="token-list">
        {tokens.map((token, index) => (
          <li key={token._id} className={`token-item ${token.status}`}>
            <span>
              #{token.position} - <strong>{token.name}</strong> ({token.status})
            </span>

            <div className="token-controls">
              {/* Show up button only if not the first token */}
              {index !== 0 && (
                <button onClick={() => moveToken(token._id, 'up')}>⬆️</button>
              )}

              {/* Show down button only if not the last token */}
              {index !== tokens.length - 1 && (
                <button onClick={() => moveToken(token._id, 'down')}>⬇️</button>
              )}

              <button onClick={() => cancelToken(token._id)}>❌ Cancel</button>
            </div>
          </li>
        ))}
      </ul>

    </div>
  );
};

export default QueuePage;
