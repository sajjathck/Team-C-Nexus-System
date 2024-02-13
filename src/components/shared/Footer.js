import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Make sure to import Bootstrap CSS

export default function Footer() {
    return (
        <footer className="bg-light text-center text-lg-start ">
            {/* <div className="container p-4 pb-0">
                    <a className="btn btn-primary btn-floating m-1" href="#!" role="button"><i className="bi bi-facebook"></i></a>
                    <a className="btn btn-primary btn-floating m-1" href="#!" role="button"><i className="bi bi-twitter"></i></a>
                    <a className="btn btn-primary btn-floating m-1" href="#!" role="button"><i className="bi bi-instagram"></i></a>
            </div> */}
            <div className="text-center p-3" >
                © {new Date().getFullYear()} Copyright:
                <a className="text-dark" href="https://www.nexus.edu">Nexus Education</a>
            </div>
        </footer>
    );
}
