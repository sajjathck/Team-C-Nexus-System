import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap CSS is imported

const About = () => {
  return (
    <>
      <div className="about-us mt-5">
        <h2 className="mb-4 text-center">
          <strong>About Us</strong>
        </h2>
        <p className="lead text-center">
          We are a dedicated team of professionals committed to transforming
          education through technology.
        </p>
        <div className="row mt-5">
          <div className="col-md-4">
            <div className="card shadow-sm custom-card">
              <img src="https://images.unsplash.com/photo-1588072432836-e10032774350?q=80&w=1472&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="card-img-top" alt="Mission" />
              <div className="card-body">
                <h3 className="card-title mb-3 text-center">
                  <strong>Our Mission</strong>
                </h3>
                <p className="card-text text-muted">
                  Our mission is to provide innovative, user-friendly solutions that
                  streamline administrative tasks, improve communication, and enhance
                  the overall educational experience for institutions, educators, and
                  students.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card shadow-sm custom-card">
              <img src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="card-img-top" alt="Vision" />
              <div className="card-body">
                <h3 className="card-title mb-3 text-center">
                  <strong>Our Vision</strong>
                </h3>
                <p className="card-text text-muted">
                  We envision a future where technology empowers educational
                  institutions to foster a collaborative learning environment,
                  supporting educators and students in achieving their full potential.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card shadow-sm ">
              <img src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="card-img-top" alt="Values" />
              <div className="card-body">
                <h3 className="card-title mb-3 text-center">
                  <strong>Our Values</strong>
                </h3>
                <ul className="list-unstyled">
                  <li>Innovation - We continuously strive to deliver cutting-edge solutions to meet the evolving needs of education.</li>
                  <li>Collaboration - We believe in working together with our clients to create tailored solutions that suit their needs.</li>
                  <li>Integrity - We conduct our business with honesty, fairness, and transparency, ensuring trust and credibility with our clients.</li>
                  <li>Excellence - We are committed to delivering high-quality products and services, ensuring our clients' success and satisfaction.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <p className="text-center mt-5">
        <strong>Nexus Management System – Streamlining education, one institution at a time</strong>
      </p>
      {/* <section className="bg-light rounded-2 p-3 p-md-4 p-xl-5 min-vh-80 d-flex flex-row align-items-center"></section> */}
    </>
  );
};

export default About;
