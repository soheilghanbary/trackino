import { Navigate, useLocation } from 'react-router-dom';

// Mock function to check if the user is authenticated
// In a real app, you would check the authentication status from a global state, context, or cookie.
const isAuthenticated = () => {
  // Check for the existence of a JWT token in localStorage, cookies, or context
  return !!document.cookie
    .split('; ')
    .find((row) => row.startsWith('auth_token='));
};

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const location = useLocation();

  if (!isAuthenticated()) {
    // Redirect to the login page if not authenticated
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Render the children if authenticated
  return children;
};
