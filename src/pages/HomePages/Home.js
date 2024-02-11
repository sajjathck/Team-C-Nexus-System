import React from 'react';

export default function Home() {
  return (
    <section className="bg-light rounded-2 min-vh-80 d-flex flex-column justify-content-center align-items-center">
      <div className="image-container">
        <img
          src="https://images.unsplash.com/photo-1617791160536-598cf32026fb?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          className="img-fluid rounded w-100"
          style={{ objectFit: 'cover' }}
          alt=""
        />
        <div id="headertexthome" className="header-text">Nexus Management System</div>
      </div>
    </section>
  );
}