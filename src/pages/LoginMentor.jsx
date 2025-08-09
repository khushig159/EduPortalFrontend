import React, { useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
// import Cookies from 'js-cookie';
import "../style/login.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../style/SignUpform.css";
import logoImage from "../assets/logo.jpg";
import Cookies from "js-cookie";

import {
  faBrain,
  faBullhorn,
  faNoteSticky,
  faExclamation,
} from "@fortawesome/free-solid-svg-icons";

export default function LoginMentor() {
  const [loading, setloading] = useState(false);
  const [message, setmessage] = useState([]);
  const navigate = useNavigate();
  const email = useRef();
  const password = useRef();
  const addmessage = (message) => {
    setmessage((prev) => [...prev, message]);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setmessage([]);

    const LoginIndata = {
      email: email.current.value,
      password: password.current.value,
    };
    setloading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/login-recruiter`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(LoginIndata),
        }
      );
      const data = await response.json();
      if (response.status === 403) {
        addmessage("Email not registered, please sign up");
        setloading(false);
      }
      if (response.status === 401) {
        addmessage("Wrong password, please try again");
        setloading(false);
      }
      if (response.status === 400) {
        addmessage("Please verify your email before logging in.");
        setloading(false);
      }
      if (!data || !data.userId) {
        console.log("User not found");
        setloading(false);
        return;
      }
      Cookies.set("recaccessToken", `${data.accesstoken}`, { expires: 1 }); // Set access token with 1 day expiration
      Cookies.set("recrefreshToken", `${data.refreshtoken}`, { expires: 7 }); // Set refresh token with 7 days expiration
      console.log(data.message);
      setloading(false);

      navigate("/main-mentor");
    } catch (err) {
      console.log(err.message);
      setloading(false);

      return;
    }

    console.log(LoginIndata);
  };
  return (
    <div className="container2">
      {" "}
      <div className="left-panel">
        <div
          className="title-sec"
          style={{ marginBottom: "0px", marginTop: "0px" }}
        >
          <img src={logoImage} alt="Harper Logo" className="logo2" />
          <h3>AskUp</h3>
        </div>
        <h2 style={{ marginTop: "0px", marginBottom: "0px" , fontSize:'25px'}}>
          Empower Your Mentorship Journey with Askup{" "}
        </h2>

        <div className="feature">
          <div
            className="feature-in"
            style={{ display: "flex", alignItems: "center" }}
          >
            <span role="img" aria-label="calendar">
              <FontAwesomeIcon
                className="icon3"
                icon={faBullhorn}
              ></FontAwesomeIcon>
            </span>
            <strong>Onboard Students Seamlessly</strong>
          </div>
          <p style={{ fontSize: "13.5px" }}>
            Accept mentorship requests and manage availability with ease through
            a user-friendly dashboard designed for your convenience.
          </p>
        </div>

        <div className="feature">
          <div
            className="feature-in"
            style={{ display: "flex", alignItems: "center" }}
          >
            <span role="img" aria-label="graph">
              <FontAwesomeIcon
                className="icon3"
                icon={faNoteSticky}
              ></FontAwesomeIcon>
            </span>
            <strong>Simplify Session Management</strong>
          </div>
          <p style={{ fontSize: "13.5px" }}>
Track ongoing sessions, student progress, and feedback in one centralized place, so you can focus on what matters: impactful guidance.
          </p>
        </div>

        <div className="feature">
          <div
            className="feature-in"
            style={{ display: "flex", alignItems: "center" }}
          >
            <span role="img" aria-label="check">
              <FontAwesomeIcon
                className="icon3"
                icon={faBrain}
              ></FontAwesomeIcon>
            </span>
            <strong>AI Support When You’re Away</strong>
          </div>
          <p style={{ fontSize: "13.5px" }}>
            Let your Mentor Bot handle queries when you're unavailable, trained on your knowledge, it ensures students never miss out on learning.
          </p>
        </div>
      </div>
      <div className="right-panel">
        <h3>Get started with AskUp</h3>
        <p>See How AskUp Can Transform Your Teaching Journey</p>

        <form onSubmit={handleSubmit} className="signup-form">
          <div className="input-group">
            <label htmlFor="email">Work Email</label>
            <input
              type="email"
              ref={email}
              id="email"
              placeholder="email@example.com"
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              ref={password}
              id="password"
              placeholder="••••••••"
            />
          </div>
          {message.map((message) => (
            <p style={{ margin: "0px", color: "red" }}>
              <FontAwesomeIcon icon={faExclamation} /> {message}
            </p>
          ))}

          <Link to="/forgot-paaswordrec">
            <p style={{ textAlign: "right", color: "black" }}>
              Forgot password?
            </p>
          </Link>

          {loading ? (
            <button className="signupbutton" type="submit">
              <div className="loader"></div>
            </button>
          ) : (
            <button className="signupbutton" type="submit">
              Login to my account
            </button>
          )}
          <p className="login-link">
            Do not have a account?{" "}
            <Link to="/mentor-signup">
              <span>Create Account</span>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
