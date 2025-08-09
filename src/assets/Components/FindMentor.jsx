import React from "react";
import { motion, AnimatePresence } from "framer-motion";

function FindMentor(props) {
   
  return (
    <AnimatePresence>
      {props.entered && (
        <motion.div
          key="mentor-modal"
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
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(0px)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            borderRadius: "0.75rem",
            padding: "1rem",
          }}
        >
          <div
            onClick={() => {
              props.setEntered(false);
              props.setSelectMentor(false);
            }}
            style={{
              cursor: "pointer",
              position: "absolute",
              top: "2rem",
              left: "2rem",
              fontSize: "1.875rem", // text-3xl
              color: "black",
            }}
          >
            <i className="ri-xrp-line"></i>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default FindMentor;
