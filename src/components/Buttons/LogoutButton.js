import React from 'react';

const LogoutButton = () => {
  const handleLogout = () => {
    // Clear the session storage
    sessionStorage.clear();

    // Optionally, redirect the user to the login page after logging out
    window.location.href = '/login';
  };

  return (
    <button type="button"
    className="btn btn-login" onClick={handleLogout}>
      Logout
    </button>
  );
};

export default LogoutButton;
