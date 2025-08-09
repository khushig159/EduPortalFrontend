import React, { useState,useEffect } from "react";
import { motion } from "framer-motion";
import "remixicon/fonts/remixicon.css";
import styles from '../module/mentor.module.css'

function MentorSidebar() {
  const [collapse, setCollapse] = useState(false);
  const[mentor,setmentor]=useState('')

  useEffect(()=>{
      fetch('http://localhost:8000/user/getmentor',{
        credentials:'include'
      }) .then(res => res.json())
      .then(data => {
          setmentor(data.mentor); // or local state
      })
      .catch(err => console.error(err));
  }, []);
  console.log(mentor)

  const transition = {
    duration: 0.6,
    ease: "anticipate",
  };

  return (
    <motion.div
      animate={{
        width: collapse ? "3.5rem" : "20vw",
      }}
      transition={transition}
      style={{
        // marginLeft: "rem",
        position: "relative",
        height: "95vh",
        minWidth: "3.5rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "start",
        alignItems: "center",
        padding: "0.5rem 0.9rem",
        paddingTop: "1rem",
        borderRadius: "1rem",
        marginTop:'1rem',
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
        <i className="ri-collage-fill" style={{ fontSize: "1.9rem" }}></i>
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
          paddingLeft: "2.6rem",
          fontFamily:'DM sans'
        }}
      >
        <i className="ri-user-3-line" style={{ fontSize: "1.7rem" }}></i>
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
          {mentor.name}
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
        </motion.p>
        
      )}

      {/* Menu Items */}
      <div className={styles.info}
      >
        <h4>{mentor.Qualification}</h4>
          <h3>{mentor.Organisation}</h3> 
          <p>{mentor.email}</p> <br/>
          <p>{mentor.personality}</p>
        
      </div>
    </motion.div>
  );
}

export default MentorSidebar;
