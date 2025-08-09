import React from "react";
import { motion } from "framer-motion";

function BlogCard({ title, summary }) {
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      whileHover={{ scale: 1.03 }}
      style={{
        backgroundColor: "white",
        color: "black",
        padding: "1.5rem",
        borderRadius: "0.75rem", // 12px
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        width: "300px",
        height: "250px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <h3
        style={{
          fontSize: "1.25rem", // text-xl
          fontWeight: 600, // font-semibold
          margin: 0,
        }}
      >
        {title}
      </h3>

      <p
        style={{
          fontSize: "0.875rem", // text-sm
          color: "#4B5563", // text-gray-600
          margin: 0,
        }}
      >
        {summary}
      </p>

      <button
        style={{
          marginTop: "1rem", // mt-4
          fontSize: "0.875rem", // text-sm
          fontWeight: 600, // font-semibold
          color: "#023047",
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: 0,
          textDecoration: "none",
        }}
        onMouseOver={(e) => (e.target.style.textDecoration = "underline")}
        onMouseOut={(e) => (e.target.style.textDecoration = "none")}
      >
        Read More →
      </button>
    </motion.div>
  );
}

export default BlogCard;
