import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../services/auth';

export default function PrivateRoute({ Component }) {
  return isAuthenticated() ? (
    < Component />
  ) : (
    <Navigate to="/login" />
  );
}