import { Navigate, useLocation } from 'react-router-dom';
import { getAccessToken } from '../api';

export default function RequireAuth({ children }) {
  const location = useLocation();
  const hasToken = Boolean(getAccessToken());

  if (!hasToken) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  return children;
}
