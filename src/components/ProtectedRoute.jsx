import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');

  // If token exists, allow access, else redirect to login
  return token ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
