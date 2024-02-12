import React from 'react';
import '../../assets/Home.css'; // Import your custom stylesheet

export default function Home() {
  return (
    <section className="bg-light rounded-2 min-vh-80 d-flex flex-column justify-content-center align-items-center">
      <div className="image-container position-relative">
        <img
          src="https://images.unsplash.com/photo-1617791160536-598cf32026fb?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          className="img-fluid rounded w-100"
          style={{ objectFit: 'cover' }}
          alt=""
        />
        <div className="overlay"></div>
        <div id="headertexthome" className="header-text text-light position-absolute top-50 start-50 translate-middle">
          Nexus<br />
          Management<br />
          System.<br />
        </div>
      </div>
      <div className="content-container">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <h2 className="section-title">Welcome to Nexus</h2>
              <p className="section-text">
                Nexus Management System is designed to streamline administrative tasks, improve communication, and enhance the overall educational experience.
              </p>
              <button className="cta-button btn btn-primary">Learn More</button>
            </div>
            <div className="col-lg-6">
              <h2 className="section-title">Our Services</h2>
              <ul className="services-list">
                <li>Attendance Tracking</li>
                <li>Grades Management</li>
                <li>Online Assignment Submission</li>
                <li>Communication Platform</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
