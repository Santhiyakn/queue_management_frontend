import { useEffect, useState , useCallback} from 'react';
import api from '../utils/axios';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';




const Dashboard = () => {
  const [queues, setQueues] = useState([]);
  const [name, setName] = useState(''); // name of the new queue
  const navigate = useNavigate();
  // navigate();

  const reload = useCallback(async () => {
      try {
         const res = await api.get('/api/queues/getAll'); // Correct endpoint
         setQueues(res.data.data);
        // setTokens(tokenRes.data.data);
      } catch (error) {
        console.error('Error loading queue or tokens:', error);
      }
    }, []);
   
  

  useEffect(() => {
    const fetchQueues = async () => {
      try {
        const res = await api.get('/api/queues/getAll'); // Correct endpoint
        console.log(res.data.data);
        setQueues(res.data.data);
      } catch (err) {
        console.error('Failed to fetch queues', err);
      }
    };
    fetchQueues();
  }, []);

  const createQueue = async () => {
    if (!name.trim()) return;
    try {
       await api.post('/api/queues/create', { name });
      // console.log(res.data);
      // setQueues([...queues, res.data]);
      setName(''); 
      reload();
    } catch (err) {
      console.error('Queue creation failed', err);
    }
  };

  return (
    <div className="dashboard-container">
      
      <h2>Your Queues</h2>
      <input 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
        placeholder="Queue Name" 
      />
      <button onClick={createQueue}>Create Queue</button>
      
      <ul>
        {queues.map((q) => (
          <li key={q._id} onClick={() => navigate(`/queue/${q._id}`)}>
            {q.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
