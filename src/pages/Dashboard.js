import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchQueues, createQueue, getAnalytics } from '../services/api';

const Dashboard = () => {
  const [queues, setQueues] = useState([]);
  const [queueName, setQueueName] = useState('');
  const [analytics, setAnalytics] = useState({});
  const navigate = useNavigate();

  const loadData = async () => {
    const queuesData = await fetchQueues();
    const analyticsData = await getAnalytics();
    setQueues(queuesData);
    setAnalytics(analyticsData);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCreateQueue = async (e) => {
    e.preventDefault();
    await createQueue(queueName);
    setQueueName('');
    loadData();
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className="container">
      <h2>Dashboard</h2>
      <button onClick={handleLogout}>Logout</button>

      <h3>Create New Queue</h3>
      <form onSubmit={handleCreateQueue}>
        <input
          type="text"
          placeholder="Queue Name"
          value={queueName}
          onChange={(e) => setQueueName(e.target.value)}
          required
        />
        <button type="submit">Create</button>
      </form>

      <h3>Your Queues</h3>
      <ul>
        {queues.map((q) => (
          <li key={q._id}>
            {q.name} &nbsp;
            <button onClick={() => navigate(`/queue/${q._id}`)}>Open</button>
          </li>
        ))}
      </ul>

      <h3>Analytics</h3>
      <p>Total Queues: {analytics.totalQueues || 0}</p>
      <p>Total Tokens: {analytics.totalTokens || 0}</p>
      {/* You can expand this section based on backend data */}
    </div>
  );
};

export default Dashboard;
