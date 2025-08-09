import React,{useState} from "react";
import { motion, AnimatePresence } from "framer-motion";
import ChatBot from "./ChatBot";
import { Navigate, useNavigate } from "react-router-dom";

function AskOption(props) {
  const navigate=useNavigate()
  return (
    <AnimatePresence>
      {props.entered && (
        <motion.div
          key="entry-modal"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 0.9, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ duration: 0.2 }}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "3rem",
            position: "absolute",
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(255,255,255,0.1)",
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(255,255,255,0.2)",
            borderRadius: "1rem",
            padding: "1rem",
          }}
        >
          {/* Close Button */}
          <div
            onClick={() => props.setEntered(false)}
            style={{
              cursor: "pointer",
              position: "absolute",
              top: "2rem",
              left: "2rem",
              fontSize: "1.875rem",
              color: "black",
            }}
          >
            <i className="ri-xrp-line"></i>
          </div>

          {/* Ask with AI Card */}
          <div
            style={{
              backgroundColor: "#023047",
              backdropFilter: "blur(8px)",
              borderRadius: "1rem",
              padding: "1.5rem",
              width: "16rem",
              height: "20rem",
              color: "white",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
              transition: "transform 0.3s ease",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.05)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.transform = "scale(1)")
            }
          >
            <i className="ri-robot-2-line" style={{ fontSize: "2.5rem" }}></i>
            <div style={{ textAlign: "center" }}>
              <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", marginTop: "2rem" }}>
                Ask with AI
              </h2>
              <p style={{ fontSize: "0.875rem", marginTop: "0.25rem", opacity: 0.8 }}>
                Get fast, intelligent answers instantly
              </p>
            </div>
            <button
              style={{
                marginTop: "1rem",
                padding: "0.5rem 1rem",
                borderRadius: "9999px",
                backgroundColor: "white",
                color: "#023047",
                fontWeight: "600",
                border: "none",
                cursor: "pointer",
                transition: "background-color 0.3s ease",
              }}
              onClick={()=>navigate('/chat')}
              onMouseOver={(e) =>
                (e.target.style.backgroundColor = "rgb(243, 244, 246)")
              }
              onMouseOut={(e) =>
                (e.target.style.backgroundColor = "white")
              }
            >
              Start Chat
            </button>
          </div>

          {/* Ask Mentor Card */}
          <div
            style={{
              backgroundColor: "#023047",
              backdropFilter: "blur(8px)",
              borderRadius: "1rem",
              padding: "1.5rem",
              width: "16rem",
              height: "20rem",
              color: "white",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
              transition: "transform 0.3s ease",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.05)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.transform = "scale(1)")
            }
          >
            <i
              className="ri-user-3-line"
              style={{ fontSize: "2.5rem", color: "white", marginBottom: "0.5rem" }}
            ></i>
            <div style={{ textAlign: "center" }}>
              <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", marginTop: "2rem" }}>
                Ask Mentor
              </h2>
              <p style={{ fontSize: "0.875rem", marginTop: "0.25rem", opacity: 0.8 }}>
                Get help from a real expert
              </p>
            </div>
            <button
              onClick={() => {
                props.setEntered(true);
                props.setSelectMentor(true);
              }}
              style={{
                marginTop: "1rem",
                padding: "0.5rem 1rem",
                borderRadius: "9999px",
                backgroundColor: "white",
                color: "#023047",
                fontWeight: "600",
                border: "none",
                cursor: "pointer",
                transition: "background-color 0.3s ease",
              }}
              onMouseOver={(e) =>
                (e.target.style.backgroundColor = "rgb(243, 244, 246)")
              }
              onMouseOut={(e) =>
                (e.target.style.backgroundColor = "white")
              }
            >
              Find Mentor
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default AskOption;
