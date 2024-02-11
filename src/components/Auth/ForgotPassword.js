import React, { useState } from "react";
import axios from "axios";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const VerifyMail = async (event) => {
    event.preventDefault();
    try {
      console.log(email);
      const response = await axios.get(
        "http://localhost:5225/api/User/verify-email/" + email
      );

      if (response.status !== 200) {
        throw new Error("Email not found");
      }

      setIsEmailValid(true);
    } catch (error) {
      console.error("Error:", error);
      alert("Email not found");
    }
  };

  const ResetPassword = async (event) => {
    event.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
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
      id="signup-section"
      className="bg-light mt-5 rounded-2 p-3 p-md-4 p-xl-5 min-vh-80 d-flex flex-row align-items-center"
    >
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
                        <form onSubmit={VerifyMail}>
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
                          <button type="submit" className="btn btn-primary">Verify</button>
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
                          <button type="submit" className="btn btn-primary">Update Password</button>
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
