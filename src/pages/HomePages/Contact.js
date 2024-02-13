import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Make sure to import Bootstrap CSS

export default function Contact() {
  return (
    <section className="bg-light rounded-2 p-3 p-md-4 p-xl-5 min-vh-80 d-flex flex-row align-items-center">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <h2 className="text-black mb-4">
              Get in &nbsp;
              <span className="text-primary">touch.</span>
            </h2>
            <p className="lead">
              <span className='font-weight-bold'>Nexus Education </span>  believe that education is the key to a successful future...
            </p>
            <form>
              <div className="form-group row g-3 mb-3">
                <label htmlFor="firstName" className="col-sm-2 col-form-label">First Name</label>
                <div className="col-sm-10">
                  <input type="text" className="form-control" id="firstName" placeholder="First Name" />
                </div>
              </div>
              <div className="form-group row g-3 mb-3">
                <label htmlFor="lastName" className="col-sm-2 col-form-label">Last Name</label>
                <div className="col-sm-10">
                  <input type="text" className="form-control" id="lastName" placeholder="Last Name" />
                </div>
              </div>
              <div className="form-group row g-3 mb-3"> 
                <label htmlFor="email" className="col-sm-2 col-form-label">Email</label>
                <div className="col-sm-10">
                  <input type="email" className="form-control" id="email" placeholder="Email Address" />
                </div>
              </div>
              <div className="form-group row g-3 mb-3">
                <label htmlFor="phoneNumber" className="col-sm-2 col-form-label">Phone Number</label>
                <div className="col-sm-10">
                  <input type="tel" className="form-control" id="phoneNumber" placeholder="Phone Number" />
                </div>
              </div>
              <div className="form-group row g-3 mb-3">
                <label htmlFor="message" className="col-sm-2 col-form-label">Message</label>
                <div className="col-sm-10">
                  <textarea className="form-control" id="message" rows="3" placeholder="Message"></textarea>
                </div>
              </div>
              <div className="form-group row g-3 mb-3"> 
                <div className="col-sm-10">
                  <button type="submit" className="btn btn-primary">Send</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
