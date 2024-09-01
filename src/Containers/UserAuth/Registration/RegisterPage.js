import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDarkMode } from "../../../Components/Offers/DarkModeContext";
import { Snackbar, SnackbarContent, CircularProgress } from "@mui/material";
import { green, red } from "@mui/material/colors";

import LoadingBox from "../../../Components/Utils/Loading/LoadingBox";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import PersonIcon from '@mui/icons-material/Person';
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import Header from "../../../Components/Header/Header";
import "./RegisterPage.scss";

import { useLoadingState } from "../../../Components/Utils/Loading/useLoadingState";

const RegisterPage = () => {
  const { isDarkMode } = useDarkMode();
  const { loading, setLoading } = useLoadingState();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isError, setIsError] = useState(false);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (password !== confirmPassword) {
      setIsError(true);
      setLoading(false);
      return;
    }

    const requestBody = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password
    };

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        setIsSnackbarOpen(true);
        setIsError(false);

        setTimeout(() => {
          navigate("/login");
        }, 1700);
      } else {
        setIsSnackbarOpen(true);
        setIsError(true);
      }
    } catch (error) {
      setIsSnackbarOpen(true);
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Header activeTab={0} />
      <div className={`register-container ${isDarkMode ? "dark-mode" : ""}`}>
        <div className={`register-title ${isDarkMode ? "dark-mode" : ""}`}>Join Us!</div>
        {loading ? (
          <LoadingBox height={"200px"} />
        ) : (
          <form noValidate className={`register-form ${isDarkMode ? "dark-mode" : ""}`} onSubmit={handleRegister}>
            <div className="register-input-container">
              <PersonIcon className={`signin icon ${isDarkMode ? "dark-mode" : ""}`} />
              <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className={`register-form-input ${isDarkMode ? "dark-mode" : ""}`}
              />
              <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className={`register-form-input ${isDarkMode ? "dark-mode" : ""}`}
              />
            </div>
            <div className="register-input-container">
              <EmailIcon className={`signin icon ${isDarkMode ? "dark-mode" : ""}`} />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`register-form-input ${isDarkMode ? "dark-mode" : ""}`}
              />
            </div>
            <div className="register-input-container">
              <LockIcon className={`signin icon ${isDarkMode ? "dark-mode" : ""}`} />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`register-form-input ${isDarkMode ? "dark-mode" : ""}`}
              />
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`register-form-input ${isDarkMode ? "dark-mode" : ""}`}
              />
            </div>

            <button type="submit" className="register-button" disabled={loading}>
              {loading ? <CircularProgress size={14} color="inherit" /> : "Register"}
            </button>
          </form>
        )}
        <div className={`register-link ${isDarkMode ? "dark-mode" : ""}`}>
          Already have an account? <Link to="/login">Sign in</Link>
        </div>
      </div>

      <Snackbar
        open={isSnackbarOpen}
        autoHideDuration={3000}
        onClose={() => setIsSnackbarOpen(false)}
      >
        <SnackbarContent
          message={
            isError
              ? "An error occurred. Please try again later."
              : "Registration successful!"
          }
          style={{
            backgroundColor: isError ? red[600] : green[600],
          }}
          action={
            isError ? (
              <ErrorOutlineIcon style={{ color: "white" }} />
            ) : (
              <CheckCircleOutlineIcon style={{ color: "white" }} />
            )
          }
        />
      </Snackbar>
    </div>
  );
};

export default RegisterPage;
