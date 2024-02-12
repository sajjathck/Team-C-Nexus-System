import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };


  const VerifyMailAndPhone = async (event) => {
    event.preventDefault();
    try {
      console.log(email, phoneNumber);
      const response = await axios.get(
        `http://localhost:5225/api/User/verifyemailandphone/${encodeURIComponent(email)}/${encodeURIComponent(phoneNumber)}`
      );

      if (response.status !== 200) {
        throw new Error("Email or phone number not verified");
      }

      setIsEmailValid(true);
    } catch (error) {
      console.error("Error:", error);
      toast.error("Email or phone number not verified");
    }
  };

  const ResetPassword = async (event) => {
    event.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const response = await axios.put(
        "http://localhost:5225/api/User/reset-password",
        { email, newPassword }
      );

      if (response.status === 200) {
        alert("Password updated successfully");
        // Clear the form or redirect the user
        setEmail("");
        setNewPassword("");
        setConfirmPassword("");
        setIsEmailValid(false);
      } else {
        throw new Error("Failed to update password");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to update password");
    }
  };

  return (
    <section
      id="forgotpw-section"
      className="bg-light  rounded-2 p-3 p-md-4 p-xl-5 min-vh-80 d-flex flex-row align-items-center"
    >
      <ToastContainer />
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-md-6 card rounded shadow p-0 mb-3">
            <div className="row g-0">
              <div className="col-md-12">
                <div className="card-body">
                  <div className="card-body p-3 p-md-4 p-xl-5">
                    <div>
                      <h2>Forgot Password</h2>
                      {!isEmailValid ? (
                        <form onSubmit={VerifyMailAndPhone}>
                          <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email Address:</label>
                            <input
                              type="email"
                              id="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              className="form-control"
                              required
                            />
                          </div>
                          <div className="mb-3">
                            <label htmlFor="phoneNumber" className="form-label">Phone Number:</label>
                            <input
                              type="tel"
                              id="phoneNumber"
                              value={phoneNumber}
                              onChange={(e) => setPhoneNumber(e.target.value)}
                              className="form-control"
                              required
                            />
                          </div>
                          <div class="row justify-content-between">
                          <div className="col-md-6 " >
                          <button type="submit" className="btn btn-primary">Verify</button>
                          </div>
                          <div className="col-md-6 d-flex justify-content-end " >
                              <button onClick={goBack} className="btn btn-secondary  ">Go Back</button>
                            </div>
                          </div>
                        </form>
                      ) : (
                        <form onSubmit={ResetPassword}>
                          <div className="mb-3">
                            <label htmlFor="newPassword" className="form-label">New Password:</label>
                            <input
                              type="password"
                              id="newPassword"
                              value={newPassword}
                              onChange={(e) => setNewPassword(e.target.value)}
                              className="form-control"
                              required
                            />
                          </div>
                          <div className="mb-3">
                            <label htmlFor="confirmPassword" className="form-label">Confirm New Password:</label>
                            <input
                              type="password"
                              id="confirmPassword"
                              value={confirmPassword}
                              onChange={(e) => setConfirmPassword(e.target.value)}
                              className="form-control"
                              required
                            />
                          </div>
                          <div class="row justify-content-between">
                            <div className="col-md-6 " >
                              <button type="submit" className="btn btn-primary ">Update Password</button>
                            </div>
                          
                            <div className="col-md-6 d-flex justify-content-end " >
                              <button onClick={goBack} className="btn btn-secondary  ">Go Back</button>
                            </div>
                          </div>
                        </form>
                      )}
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
};

export default ForgotPasswordPage;
