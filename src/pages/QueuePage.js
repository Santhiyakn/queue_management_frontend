import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  getQueue,
  addToken,
  moveToken,
  serveToken,
  cancelToken
} from '../services/api';

const QueuePage = () => {
  const { queueId } = useParams();
  const [queue, setQueue] = useState({});
  const [tokens, setTokens] = useState([]);
  const [personName, setPersonName] = useState('');

  const loadQueue = async () => {
    const data = await getQueue(queueId);
    setQueue(data.queue);
    setTokens(data.tokens);
  };

  useEffect(() => {
    loadQueue();
  }, [queueId]);

  const handleAddToken = async (e) => {
    e.preventDefault();
    await addToken(queueId, personName);
    setPersonName('');
    loadQueue();
  };

  const handleMove = async (tokenId, direction) => {
    await moveToken(queueId, tokenId, direction);
    loadQueue();
  };

  const handleServe = async (tokenId) => {
    await serveToken(queueId, tokenId);
    loadQueue();
  };

  const handleCancel = async (tokenId) => {
    await cancelToken(queueId, tokenId);
    loadQueue();
  };

  return (
    <div className="container">
      <h2>Queue: {queue.name}</h2>

      <form onSubmit={handleAddToken}>
        <input
          type="text"
          placeholder="Person's Name"
          value={personName}
          onChange={(e) => setPersonName(e.target.value)}
          required
        />
        <button type="submit">Add to Queue</button>
      </form>

      <h3>Tokens in Queue</h3>
      <ul>
        {tokens.map((token, idx) => (
          <li key={token._id}>
            #{idx + 1} - {token.name} [{token.status}]
            {token.status === 'waiting' && (
              <>
                <button onClick={() => handleMove(token._id, 'up')}>↑</button>
                <button onClick={() => handleMove(token._id, 'down')}>↓</button>
                <button onClick={() => handleServe(token._id)}>Serve</button>
                <button onClick={() => handleCancel(token._id)}>Cancel</button>
              </>
            )}
            {token.status === 'served' && <span> ✅ Served</span>}
            {token.status === 'cancelled' && <span> ❌ Cancelled</span>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QueuePage;
