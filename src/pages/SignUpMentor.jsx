import React from "react";
import { useRef, useState } from "react";
import "../style/SignUp.css";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../style/SignUpform.css";
import logoImage from "../assets/logo.jpg";
import {
  faBrain,
  faBullhorn,
  faNoteSticky,
  faExclamation,
} from "@fortawesome/free-solid-svg-icons";

export default function SignUpMentor() {
  const [loading, setloading] = useState(false);
  const [message, setmessage] = useState([]);
  const navigate = useNavigate();
  const refs = {
    name: useRef(),
    password: useRef(),
    email: useRef(),
    qualification: useRef(),
    industry: useRef(),
    exp: useRef(),
    personality:useRef(),
  };

  const addmessage = (message) => {
    setmessage((prev) => [...prev, message]);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setmessage([]);

    const formdata = {
      name: refs.name.current.value,
      password: refs.password.current.value,
      email: refs.email.current.value,
      Qualification: refs.qualification.current.value,
      Organisation: refs.industry.current.value,
      Exp: refs.exp.current.value,
      personality:refs.personality.current.value,
    };

    setloading(true)

    // If all validations pass, proceed with form submission
    try {
      if (
        !formdata.name ||
        !formdata.password ||
        !formdata.email ||
        !formdata.Organisation ||
        !formdata.Exp ||
        !formdata.Qualification ||
        !formdata.personality
      ) {
        addmessage("All fields are required");
      }
      if (!/^\S+@\S+\.\S+$/.test(formdata.email)) {
        addmessage("Invalid email format");
        setloading(false); // ✅ stop loader
      }
      if (formdata.password.length < 8) {
        addmessage("Password must be at least 8 characters long");
        setloading(false);
      }
      if (!formdata.Exp) {
        addmessage("Experience is required");
        setloading(false);
      }
      if (!formdata.Qualification) {
        addmessage("Qualification is required");
        setloading(false);
      }
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/signuprecruiter`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(formdata),
        }
      );

      const data = await response.json();

      if (response.status === 422) {
        addmessage("Email already exists, please use a different email");
        setloading(false);
      }
      if (!data || !data.userId) {
        addmessage("failed to sign up, please try again");
        setloading(false);
        return;
      }
      console.log(data.message);
      setloading(false)

      navigate("/mentor-login");
      return data.message;
    } catch (error) {
      setloading(false)
      console.error("Error during form submission, try again later or check network connection");
      console.error(error.message);

      return;
    }

    //Example: navigate("/success");
  };

  return (
    <>
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
          <h2 style={{ marginTop: "0px", marginBottom: "0px" }}>
            Empower Your Mentorship Journey with AskUp
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
              <strong>Onboard Students Seamlessly </strong>
            </div>
          <p style={{ fontSize: "13.5px" }}>
              Accept mentorship requests and manage availability with ease
              through a user-friendly dashboard designed for your convenience.
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
              Track ongoing sessions, student progress, and feedback in one
              centralized place, so you can focus on what matters: impactful
              guidance.
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
              Let your Mentor Bot handle queries when you're unavailable, trained
              on your knowledge, it ensures students never miss out on learning.
            </p>
          </div>
        </div>
        <div className="right-panel">
          <h3>Get started with AskUp</h3>
          <p>See How AskUp Can Transform Your Teaching Journey</p>

          <form onSubmit={handleSubmit} className="signup-form">
            <div className="name-fields3">
              <div className="input-group">
                <label htmlFor="name">Name</label>
                <input
                  ref={refs.name}
                  type="text"
                  id="name"
                  placeholder="John"
                />
              </div>
              <div className="input-group">
                <label htmlFor="companyLocation">Highest Qualification</label>
                <input
                  ref={refs.qualification}
                  type="text"
                  id="companyLocation"
                  placeholder="MTech CSE, Phd Literature.."
                />
              </div>
            </div>
            <div className="name-fields3">
              <div className="input-group">
                <label htmlFor="companysize">Experience</label>
                <select ref={refs.exp} id="companysize" defaultValue="">
                  <option value="" disabled>
                   Experience (in years)
                  </option>
                  <option value="1-10">1–5</option>
                  <option value="5-10">5-10</option>
                  <option value="11-20">11–20</option>
                  <option value="21-30">21–30</option>
                  <option value="31-40">31–40</option>
                  <option value="40+">40+</option>
                </select>
              </div>
              <div className="input-group">
                <label htmlFor="industry">Organisation</label>
                <input
                  type="text"
                  ref={refs.industry}
                  id="industry"
                  placeholder="IIT Mumbai, Amity..."
                />
              </div>
            </div>
            <div className="name-fields3">
              <div className="input-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  ref={refs.email}
                  id="email"
                  placeholder="email@example.com"
                />
              </div>
              <div className="input-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  ref={refs.password}
                  id="password"
                  placeholder="••••••••"
                />
              </div>
            </div>
            <div className="input-group">
                <label htmlFor="email">Your Personality</label>
                <textarea
                  type="text"
                  ref={refs.personality}
                  id="email"
                  placeholder="I’d say I’m someone who’s very dedicated and goal-oriented..."
                />
              </div>
            {message.map((message) => (
              <p style={{ margin: "0px", color: "red" }}>
                <FontAwesomeIcon icon={faExclamation} /> {message}
              </p>
            ))}

            {loading ? (
              <button className="signupbutton" type="submit">
                <div className="loader"></div>
              </button>
            ) : (
              <button className="signupbutton" type="submit">
                Create my account
              </button>
            )}

            <p className="login-link">
              Already have an account? <Link to="/mentor-login">Login</Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
