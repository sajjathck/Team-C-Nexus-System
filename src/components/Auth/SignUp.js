import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useForm } from "react-hook-form";

export default function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    mode: "all",
    criteriaMode: "all",
    defaultValues: {
      EmailId: "",
      PhoneNum: "",
      AdmissionID: "",
      Role: "",
      UserName: "",
      Password: "",
    },
  });
  const [err, setErr] = useState("");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      await axios.post("http://localhost:5225/api/User/Register", data);
      toast("User registered successfully!");
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (error) {
      const errorMessage = error.response.data;
      console.log(errorMessage);
      setErr("An error occurred during registration.");
      setIsLoading(false);
    }
  };

  return (
    <section
      id="signup-section"
      className="bg-light rounded-2 p-3 p-md-4 p-xl-5 min-vh-80 d-flex flex-row align-items-center"
    >
      <div className="container-fluid">
        <div className="row justify-content-center ">
          <div className="col-md-6 card rounded shadow p-0 mb-3">
            <div className="row g-0">
              {/* <div className="col-md-5">
              <img
                src="https://images.unsplash.com/photo-1525011268546-bf3f9b007f6a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                className="card-img img-fluid"
                alt="..."
              />
            </div> */}
              <div className="col-md-12 ">
                <div className="card-body">
                  <div className="card-body p-3 p-md-4 p-xl-5">
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div className="row ">
                        <h6 className="fs-3 mb-4 mt-0">
                          <ToastContainer />
                          Welcome!{" "}
                          <span className="text-primary">Sign up now.</span>
                        </h6>
                        <div className="col-md-6 ">
                          <div className="mb-3">
                            <label htmlFor="email">Email</label>
                            <input
                              type="email"
                              id="EmailId"
                              {...register("EmailId", {
                                required: "Please enter your email",
                                pattern: {
                                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/i,
                                  message: "Invalid email address",
                                },
                              })}
                              className="form-control"
                              aria-describedby="emailHelp"
                              aria-invalid={!!errors.EmailId}
                            />
                            {errors.EmailId && (
                              <small id="emailHelp" className="text-danger">
                                {errors.EmailId.message}
                              </small>
                            )}
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="mb-3">
                            <label htmlFor="phone">Phone Number</label>
                            <input
                              type="tel"
                              id="PhoneNum"
                              {...register("PhoneNum", {
                                required: "Please enter your phone number",
                                pattern: {
                                  value: /^\d{10}$/,
                                  message: "Phone number must be  10 digits",
                                },
                              })}
                              className="form-control"
                              aria-describedby="phoneHelp"
                              aria-invalid={!!errors.PhoneNum}
                            />
                            {errors.PhoneNum && (
                              <small id="phoneHelp" className="text-danger">
                                {errors.PhoneNum.message}
                              </small>
                            )}
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="mb-3">
                            <label htmlFor="role">Role</label>
                            <select
                              id="Role"
                              {...register("Role", {
                                required: "Please select your role",
                              })}
                              className="form-select"
                              aria-describedby="roleHelp"
                              aria-invalid={!!errors.Role}
                            >
                              <option value="">Select Role</option>
                              <option value="student">Student</option>
                              <option value="teacher">Teacher</option>
                            </select>

                            {errors.Role && (
                              <small id="roleHelp" className="text-danger">
                                {errors.Role.message}
                              </small>
                            )}
                          </div>
                        </div>
                        {/* Username */}
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label htmlFor="userName">Username</label>
                            <input
                              type="text"
                              id="UserName"
                              {...register("UserName", {
                                required: "Please enter your username",
                              })}
                              className="form-control"
                              aria-describedby="userNameHelp"
                              aria-invalid={!!errors.UserName}
                            />
                            {errors.UserName && (
                              <small id="userNameHelp" className="text-danger">
                                {errors.UserName.message}
                              </small>
                            )}
                          </div>
                        </div>
                        <div className="col-md-6">
                          {/* Admission ID */}
                          <div className="mb-3">
                            <label htmlFor="admissionID">Admission ID</label>
                            <input
                              type="text"
                              id="AdmissionID"
                              {...register("AdmissionID", {
                                required: "Please enter your Admission ID",
                              })}
                              className="form-control"
                              aria-describedby="admissionIDHelp"
                              aria-invalid={!!errors.AdmissionID}
                            />
                            {errors.AdmissionID && (
                              <small
                                id="admissionIDHelp"
                                className="text-danger"
                              >
                                {errors.AdmissionID.message}
                              </small>
                            )}
                          </div>
                        </div>


                        {/* Role */}


                        {/* <div className="col-md-6">
                          <ReCAPTCHA  sitekey="6Ldc528pAAAAALDQP2QJX5J5B4tCvoy8iaDzrSY2" />
                          </div>
                        */}
                        <div className="col-md-6">
                          {/* Password */}
                          <div className="mb-3">
                            <label htmlFor="password">Password</label>
                            <input
                              type="password"
                              id="Password"
                              {...register("Password", {
                                required: "Please enter your password",
                                pattern: {
                                  value:
                                    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/,
                                  message:
                                    "Password must contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character, and be between  8 to  15 characters long",
                                },
                              })}
                              className="form-control"
                              aria-describedby="passwordHelp"
                              aria-invalid={!!errors.Password}
                            />
                            {errors.Password && (
                              <small id="passwordHelp" className="text-danger">
                                {errors.Password.message}
                              </small>
                            )}
                          </div>

                          {/* Confirm Password */}
                          <div className="mb-3">
                            <label htmlFor="confirmPassword">
                              Confirm Password
                            </label>
                            <input
                              type="password"
                              id="confirmPassword"
                              {...register("confirmPassword", {
                                required: "Please confirm your password",
                                validate: (value) =>
                                  value === watch("Password") ||
                                  "Passwords should match",
                              })}
                              className="form-control"
                              aria-describedby="confirmPasswordHelp"
                              aria-invalid={!!errors.confirmPassword}
                            />
                            {errors.confirmPassword && (
                              <small
                                id="confirmPasswordHelp"
                                className="text-danger"
                              >
                                {errors.confirmPassword.message}
                              </small>
                            )}
                          </div>
                        </div>
                        <div className="d-grid mt-2">
                          <button
                            type="submit"
                            className="btn btn-login"
                            disabled={isLoading}
                          >
                            {isLoading ? "Signing up..." : "Submit"}
                          </button>
                        </div>
                      </div>
                    </form>
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
