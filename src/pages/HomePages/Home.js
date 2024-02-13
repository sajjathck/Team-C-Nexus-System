import React from 'react';
import '../../assets/Home.css'; // Import your custom stylesheet

export default function Home() {
  return (
    <section className="bg-light  min-vh-80 d-flex flex-column justify-content-center align-items-center">
      
      <div className="content-container">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <h2 className="section-title">Welcome to Nexus</h2>
              <p className="section-text">
                Nexus Management System is designed to streamline administrative tasks, improve communication, and enhance the overall educational experience.
              </p>
              <button className="cta-button btn btn-primary"><a className='text-white text-decoration-none' href='/about'>Learn More</a></button>
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
