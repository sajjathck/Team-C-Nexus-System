import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import HomeButton from "../components/Buttons/HomeButton";

export default function HomeLayout() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";
  const isSignupPage = location.pathname === "/signup";

  return (
    <div className="">
      <header>
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container mx-auto px-0">
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <Link className="navbar-brand" to="/">
              NeXus.
            </Link>
            <ul className="navbar-nav m-auto">
              <li className="nav-item">
                <Link className="nav-link  nav-link-hm " to="/">
                  <small className="nav-link-hover">Home</small>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link  nav-link-hm " to="/about">
                  <small className="nav-link-hover">About</small>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link  nav-link-hm " to="/courses">
                  <small className="nav-link-hover">Courses</small>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link  nav-link-hm" to="/contact">
                  <small className="nav-link-hover">Contact</small>
                </Link>
              </li>
            </ul>
            <div className="btn-group col-md-1">
              {!isLoginPage && ( // Conditionally render the login button
                <Link className="nav-item me-3 " to="/login">
                  <HomeButton text="Login" />
                </Link>
              )}
              {!isSignupPage && ( // Conditionally render the login button
                <Link className="nav-item mx-auto" to="/signup">
                  <HomeButton text="Signup" />
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>
      </header>
      <main className="mx-2 mb-0">
        <Outlet />
      </main>
      <footer className="footer">
        <div className="container">
          <div className="row">
            <div className="col">
              <h5>Contact Us</h5>
              <p>Email: info@nexus.edu</p>
              <p>Phone: +1 (123)  456-7890</p>
            </div>
            <div className="col">
              <h5>Social Media</h5>
              <a href="#">Facebook</a>
              <a href="#">Twitter</a>
              <a href="#">Instagram</a>
            </div>
            <div className="col">
              <h5>Legal</h5>
              <a href="/privacy-policy">Privacy Policy</a>
              <a href="/terms-of-service">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
