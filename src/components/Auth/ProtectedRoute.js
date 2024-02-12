import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const isAuthenticated = checkUserAuthentication(); // Function to check user authentication

  if (!isAuthenticated) {
    // Redirect to login page or show an error message
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Render the children if the user is authenticated
  return <>{children}</>;
};

// Updated function to check user authentication
const checkUserAuthentication = () => {
  // Check for the presence of email, token, and role in sessionStorage
  const email = sessionStorage.getItem('email');
  const token = sessionStorage.getItem('token');
  const role = sessionStorage.getItem('role');

  // Return true if all three items exist, false otherwise
  return !!email && !!token && !!role;
};

export default ProtectedRoute;
