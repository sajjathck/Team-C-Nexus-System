import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import HomeButton from "../components/Buttons/HomeButton";
import Footer from "../components/shared/Footer";

const headerTextByPathname = {
  '/': ` NeXus Management System.`,
  '/about': 'About Us',
  '/gallery': 'Gallery',
  '/contact': 'Get in Touch',
};
const headerImages = {
  '/': 'https://images.unsplash.com/photo-1617791160536-598cf32026fb?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  '/about': 'https://plus.unsplash.com/premium_photo-1681488482227-cb029b66ae97?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  '/gallery': 'https://images.unsplash.com/photo-1618004912476-29818d81ae2e?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  '/contact': 'https://images.unsplash.com/photo-1577563908411-5077b6dc7624?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
};

export default function HomeLayout() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";
  const isSignupPage = location.pathname === "/signup";
  const currentHeaderImage = headerImages[location.pathname] || 'default-image-url';
  const headerText = headerTextByPathname[location.pathname] || 'Default Header Text';

  return (
    <div className="">
      <header>
        <nav className="navbar navbar-expand-lg navbar-light">
          <div className="container mx-auto px-0">
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
              <Link className="navbar-brand" to="/">
                NXs.
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
                  <Link className="nav-link  nav-link-hm " to="/gallery">
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
      {!isLoginPage && !isSignupPage && (
      <div className="image-container rounded-top-2 position-relative">
          <img
            src={currentHeaderImage} // Replace with your default image URL
            className="img-fluid rounded w-100"
            style={{ objectFit: 'cover' }}
            alt=""
          />
          <div className="overlay"></div>
          <div id="headertexthome" className="header-text text-light position-absolute top-50 start-50 translate-middle ">
            <p>{headerText}</p>
          </div>
        </div>
        )}
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
