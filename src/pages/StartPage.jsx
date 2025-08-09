import { useNavigate } from "react-router-dom";
import { motion,useTransform,useScroll } from "framer-motion";
// import cityImg from '../assets/city.jpg';
// import heroImg from '../assets/hero.png';
import "../style/StartPage.css";
import Cookies from "js-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChalkboardTeacher, faGraduationCap, faRobot } from "@fortawesome/free-solid-svg-icons";
import { useRef } from "react";
// import logoImage from "../assets/2.png";



export default function StartPage() {
  const { scrollY } = useScroll();
  const yHero6 = useTransform(scrollY, [400, 700], [-300, 0]);
  const opacityHero6 = useTransform(scrollY, [400 ,500, 770], [0,0.6, 1]);

  const navigate = useNavigate();
  const secondSectionRef = useRef();
  const user = Cookies.get("userrefreshToken");
  const mentor = Cookies.get("recrefreshToken");
  console.log(user);
  console.log(mentor);
  const handlestart = () => {
    if (user?.length > 0) {
      navigate("/main");
      return;
    } else if (mentor?.length > 0) {
      navigate("/main-mentor");
      return;
    } else {
      secondSectionRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <>
      <div className="home">
        <div className="landing-hero">
          <motion.div
            className="hero-text"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <div className="box-start">An Online Tution Platform</div>
            {/* <img src={logoImage} alt="" /> */}
            <h1>
              Stay With <span>AskUp</span> <br />
              To Get Personalized <span>Mentorship</span> <br />& Career{" "}
              <span>Guidance</span>
            </h1>
            <p className="des-span">
              AskUp makes it effortless to connect students with the right
              mentors, helping them choose the best career path, upskill, and
              achieve their goals — all in one platform.
            </p>
            <div className="start-button">
              <button className="cta-btn" onClick={handlestart}>
                Get Started
              </button>
              
            </div>
          </motion.div>
        </div>
        <div className="cards">
          <div className="flex-card">
            <div className="card">
              <FontAwesomeIcon icon={faChalkboardTeacher} className='iconicon'/>
              <div>
                <h3>100+</h3>
              <p>Expert Teachers</p>
              </div>
            </div>
            <div className="card">
              <FontAwesomeIcon icon={faGraduationCap} className='iconicon2'/>
              <div>
              <h3>200+</h3>
              <p>Happy Students</p></div>
            </div><div className="card">
              <FontAwesomeIcon icon={faRobot} className='iconicon3'/>
              <div>
                <h3>Smart</h3>
                <p>Robust AI</p>
              </div>
            </div>
          </div>
        </div>
        <div className="landing-hero2" ref={secondSectionRef}>
          <motion.div
          style={{
              opacity: opacityHero6,
              y: yHero6,
              willChange: "transform, opacity",
              transition: "all 0.3s ease-out",
              overflow:'hidden'
            }}
            className="hero-text"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            {/* <img src={logoImage} alt="" /> */}
            <h1>
              <span>Join 3K+</span> Learners & Mentors
              <br />
              Building Futures <span>Together</span> on
              <br />
              <span>AskUp</span>
              
            </h1>
            <p className="des-span">
              At AskUp, every student finds the right mentor — and every mentor
              finds purpose in guiding bright minds. Whether you're looking to
              shape your career or shape someone else's, you're in the right
              place. Let’s learn, grow, and thrive together.
            </p>
            <div className="start-button">
              <button
                className="cta-btn"
                onClick={() => navigate("/user-signup")}
              >
                Join as Student
              </button>
              <button
                className="cta-btn"
                onClick={() => navigate("/mentor-signup")}
              >
                Become a Mentor
              </button>
              
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
