import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './components/PrivateRoute';

function App() {
  const [auth, setAuth] = useState(!!localStorage.getItem('token'));

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login setAuth={setAuth} />} />
        <Route path="/" element={<PrivateRoute>{<Dashboard setAuth={setAuth} />}</PrivateRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
