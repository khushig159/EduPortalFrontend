import React, { useState } from "react";
import { motion } from "framer-motion";
import "remixicon/fonts/remixicon.css";

function MentorSidebar() {
  const [collapse, setCollapse] = useState(false);

  const transition = {
    duration: 0.6,
    ease: "anticipate",
  };

  const menuItems = [
    { icon: "ri-dashboard-line", label: "Dashboard" },
    { icon: "ri-article-line", label: "My Blogs" },
    { icon: "ri-settings-3-line", label: "Settings" },
  ];

  return (
    <motion.div
      animate={{
        width: collapse ? "3.5rem" : "20vw",
      }}
      transition={transition}
      style={{
        marginLeft: "1rem",
        position: "relative",
        height: "95vh",
        minWidth: "3.5rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "start",
        alignItems: "center",
        padding: "0.5rem",
        paddingTop: "1rem",
        borderRadius: "1rem",
        backgroundColor: "#023047",
        color: "white",
        overflow: "hidden",
      }}
    >
      {/* Collapse Button */}
      <button
        onClick={() => setCollapse(!collapse)}
        style={{
          background: "none",
          border: "none",
          color: "inherit",
          cursor: "pointer",
        }}
      >
        <i className="ri-collage-fill" style={{ fontSize: "2.25rem" }}></i>
      </button>

      <br />

      {/* Profile Section */}
      <motion.div
        initial={false}
        animate={{ x: 0 }}
        transition={transition}
        style={{
          display: "flex",
          gap: "0.75rem",
          alignItems: "center",
          width: "100%",
          paddingLeft: "0.3rem",
        }}
      >
        <i className="ri-user-3-line" style={{ fontSize: "1.875rem" }}></i>
        <motion.p
          initial={false}
          animate={{ opacity: collapse ? 0 : 1 }}
          transition={{ duration: 0.4 }}
          style={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            margin: 0,
          }}
        >
          Dr. Priya Sharma
        </motion.p>
      </motion.div>

      {!collapse && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.3 }}
          style={{
            fontSize: "0.875rem",
            color: "rgba(255,255,255,0.8)",
            marginTop: "0rem",
            alignSelf: "flex-start",
            paddingLeft: "3.3rem",
            marginBottom: 0,
          }}
        >
          AI & ML Mentor
        </motion.p>
      )}

      {/* Menu Items */}
      <div
        style={{
          marginTop: "2rem",
          display: "flex",
          flexDirection: "column",
          gap: "0.75rem",
          width: "100%",
          position: "absolute",
          paddingLeft: "0.3rem",
          top: "10rem",
        }}
      >
        {menuItems.map((item, idx) => (
          <motion.button
            key={idx}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 + idx * 0.15 }}
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              padding: "0.5rem 0.75rem",
              border: "none",
              borderRadius: "0.375rem",
              background: "transparent",
              color: "inherit",
              cursor: "pointer",
              textAlign: "left",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.2)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
            }}
          >
            <i className={item.icon} style={{ fontSize: "1.25rem" }}></i>
            <motion.span
              animate={{ opacity: collapse ? 0 : 1 }}
              transition={{ duration: 0.3 }}
              style={{ whiteSpace: "nowrap" }}
            >
              {item.label}
            </motion.span>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}

export default MentorSidebar;
