import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from './AuthContext';

const validateInput = (value, label) => {
  if (value.trim() === "") {
    return `Please enter a ${label}.`;
  }
  if (label === "Password" && value.length < 2) {
    return "Password must be at least 8 characters long.";
  }
  return null;
};

export default function Login(props) {
  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext); 
  // const [user, setUser] = useState({ UserName: "", Password: "" });
  const [unameError, setUnameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  // const [showPassword, setShowPassword] = useState(false);
  const [err, setErr] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    // btn fn
    setUnameError(validateInput(user.UserName, "Username"));
    setPasswordError(validateInput(user.Password, "Password"));
    // let logins=[{ uname, password }]

    if (!unameError && !passwordError) {
      setIsLoading(true);
      axios
        .post("http://localhost:5225/api/User/Validate", user)
        .then((response) => {
          console.log(response.data);
          let validUser = response.data;
          if (validUser != null) {
           
            //set username in sessionstorage
            if (
              validUser.role === null ||
              validUser.token === null ||
              validUser.emailid === null
            ) {
              setErr("Invalid user credentials or missing user details.");
              setIsLoading(false);
            } else {
              sessionStorage.setItem("email", validUser.emailid);
              sessionStorage.setItem("token", validUser.token);
              sessionStorage.setItem("role", validUser.role.toLowerCase());
              setUser(validUser);
              setTimeout(() => {
              if (validUser.role.toLowerCase() === "admin") {
                navigate("/admin-dashboard");
              } else if (validUser.role.toLowerCase() === "student") {
                navigate("/student-dashboard");
              } else if (validUser.role.toLowerCase() === "teacher") {
                navigate("/teacher-dashboard");
              }
            },  1000);
            }
          } else {
            setErr("Invalid User Credentials");
            setIsLoading(false);
          }
        })
        .catch((err) => console.log(err));
    }
  };
  return (
    <section
      id="login-section"
      className="bg-light rounded-2 p-3 p-md-4 p-xl-5 min-vh-80 d-flex flex-row align-items-center"
    >
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-md-4 card rounded shadow p-0 mb-3">
            <div className="row g-0 ">
              {/* <div className="col-md-8">
                <img
                  src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  className="card-img img-fluid"
                  alt="..."
                />
              </div> */}
              <div className="col-md-12">
                <div className="card-body">
                  <div className="card-body p-3 p-md-4 p-xl-5">
                    <div className="row">
                      <form onSubmit={handleLogin}>
                        <h5 className="text-left mb-4 mt-0">
                          Hey,
                          <span className="text-primary">Welcome Back.!</span>
                        </h5>
                        <h3>Sign In</h3>
                        <div className="mb-3">
                          <label htmlFor="username">Username</label>
                          <input
                            type="text"
                            id="username"
                            value={user.UserName}
                            onChange={(e) =>
                              setUser((prevstate) => ({
                                ...prevstate,
                                UserName: e.target.value,
                              }))
                            }
                            className="form-control"
                            aria-describedby="usernameHelp"
                            aria-invalid={!!unameError}
                          />
                          {/* {unameError && (
                            <small id="usernameHelp" className="text-danger">
                              {unameError}
                            </small>
                          )} */}
                        </div>
                        <div className="mb-2">
                          <label htmlFor="password">Password</label>
                          <div className="input-group">
                            <input
                              // type={showPassword ? "text" : "password"}
                              type="password"
                              id="password"
                              value={user.Password}
                              onChange={(e) =>
                                setUser((prevstate) => ({
                                  ...prevstate,
                                  Password: e.target.value,
                                }))
                              }
                              className="form-control"
                              aria-describedby="passwordHelp"
                              aria-invalid={!!passwordError}
                            />
                            {/* Some browsers Automatically have this option so i commented it\/ */}
                            {/* <button
                              type="button"
                              className="input-group-text"
                              onClick={() => setShowPassword((prev) => !prev)}
                              
                            >
                              {showPassword ? "Hide" : "Show"}
                            </button> */}
                          </div>
                          {err && (
                            <small id="passwordHelp" className="text-danger">
                              {err}
                            </small>
                          )}
                        </div>
                        <div className="mb-3 d-flex justify-content-between">
                          {/* <div className="custom-control custom-checkbox">
            <input
              type="checkbox"
              className="custom-control-input"
              id="customCheck1"
            />
            <label className="custom-control-label" htmlFor="customCheck1">
              Remember me
            </label>
          </div> */}
                          <p className="forgot-password text-right p-0 text-decoration-none">
                            Forgot{" "}
                            <a
                              href="/forgot-password"
                              onClick={() => navigate("/forgot-password")}
                            >
                              Password?
                            </a>
                          </p>
                        </div>
                        <div className="d-grid mt-2">
                          <button
                            type="submit"
                            className="btn btn-login"
                            disabled={isLoading}
                          >
                            {isLoading ? "Logging in..." : "Submit"}
                          </button>
                        </div>
                        <div className="mb-3 mt-1 d-flex justify-content-between">
                          <Link to="/signup" className="text-decoration-none">
                            <small>Don't have an account? Sign Up</small>
                          </Link>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
