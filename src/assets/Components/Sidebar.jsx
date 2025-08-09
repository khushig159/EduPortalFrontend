import React, { useState, useEffect } from "react";
import { anticipate, motion } from "framer-motion";
import "remixicon/fonts/remixicon.css";

function Sidebar(props) {
  const [collapse, setCollapse] = useState(false);
  const transition = {
    duration: 0.6,
    ease: anticipate,
  };

  const [text, setText] = useState("");

useEffect(() => {
  if (!collapse) {
    const timer = setTimeout(() => {
      setText("Ask with AI");
    }, 500);

    return () => clearTimeout(timer); // cleanup if collapse changes fast
  } else {
    setText(""); // reset when collapsed
  }
}, [collapse]);

  const [history] = useState([
    { title: "hello", id: 1 },
    { title: "hemlo", id: 2 },
    { title: "vadakkam", id: 3 },
    { title: "hbdrvyubrv", id: 4 },
    { title: "bonjour", id: 5 },
  ]);

  return (
    <motion.div
      animate={collapse ? { width: "3.5rem" } : { width: "20vw" }}
      transition={transition}
      style={{
        marginLeft: "1rem",
        height: "95vh",
        display: "flex",
        padding: "0.5rem",
        flexDirection: "column",
        justifyContent: "flex-start",
        minWidth: "4rem",
        alignItems: "center",
        paddingTop: "1rem",
        borderRadius: "1rem",
        backgroundColor: "#dda15e",
      }}
    >
      {/* Collapse toggle button */}
      <button
        onClick={() => setCollapse(!collapse)}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
        }}
      >
        <i className="ri-collage-fill" style={{ fontSize: "2.25rem" }}></i>
      </button>

      <br />

      {/* History label */}
      <motion.h1
        initial={{ x: 9 }}
        animate={{ x: collapse ? 9 : 9 }}
        transition={{ delay: 0.5, duration: 0.5, ease: "anticipate" }}
        style={{
          width: "100%",
          marginBottom: "0.5rem",
          display: "flex",
          gap: "0.25rem",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <i className="ri-history-fill" style={{ fontSize: "1.875rem" }}></i>
        <motion.p
          animate={{ opacity: collapse ? 0 : 1 }}
          transition={{ delay: 0.5, duration: 0.2 }}
        >
          {collapse ? "" : "History"}
        </motion.p>
      </motion.h1>

      {/* History items */}
      {history.map((hist) => (
        <motion.button
          key={hist.id}
          initial={{ opacity: 0 }}
          animate={collapse ? { opacity: 0 } : { opacity: 1 }}
          transition={collapse ? { delay: 0 } : { delay: 0.5 }}
          onClick={() => {
            props.setChatid(hist.id);
            props.setButtonclicked(true);
          }}
          style={{
            width: "100%",
            height: "2.5rem",
            backgroundColor: "rgba(0, 0, 0, 0.2)",
            marginTop: "0.25rem",
            borderRadius: "0.3rem",
            border: "none",
            cursor: "pointer",
            transition: "background-color 0.3s ease",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#fefae0")}
          onMouseOut={(e) =>
            (e.target.style.backgroundColor = "rgba(0, 0, 0, 0.2)")
          }
        ></motion.button>
      ))}

      {/* Spacer to push bottom button down */}
      <div style={{ flexGrow: 1 }}></div>

      {/* Ask with AI button */}
      <motion.button
        animate={{ x: collapse ? 0 : [0, 9, 0] }}
        transition={collapse ? { delay: 0 } : { delay: 0 }}
        style={{
          width: "100%",
          marginTop: "1rem",
          display: "flex",
          justifyContent: "center",
          gap: "0.5rem",
          alignItems: "center",
          paddingLeft: collapse ? "0.5rem" : "1rem",
          paddingRight: collapse ? "0rem" : "1.25rem",
          border: "none",
          borderRadius: "0.3rem",
          background: "transparent",
          cursor: "pointer",
          transition: "all 0.3s ease",
          overflow:'none'
        }}
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#fefae0")}
        onMouseOut={(e) =>
          (e.currentTarget.style.backgroundColor = "transparent")
        }
      >
        <i
          className="ri-chat-ai-line"
          style={{ fontSize: "1.7rem", color: "inherit" }}
        ></i>

        <motion.p
          animate={{ opacity: collapse ? 0 : 1 }}
          transition={{ delay: 0.5, duration: 0.2 }}
        >
          {text}
        </motion.p>
      </motion.button>
    </motion.div>
  );
}

export default Sidebar;
