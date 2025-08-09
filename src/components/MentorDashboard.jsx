import React, { useEffect, useState } from "react";
import MentorSidebar from "./MentorSidebar";
import BlogCard from "./BlogCard";
import MentorRequests from "./MentorRequests";
import { AnimatePresence, motion } from "framer-motion";
import Chat from "./Chat";
import styles from "../module/MentorRequestCard.module.css";


import { useChat } from "../store/ChatContext";

function MentorDashboard() {
  const { chatWithUserId, openChat, showChat, closeChat, currentUserId } = useChat();
  const [currentMentorId, setMentorUserId] = useState(null);
  const [showRequestsPopup, setShowRequestsPopup] = useState(false);

  const blogs = [
    {
      title: "The Rise of Generative AI",
      summary:
        "Explore how Gen AI is transforming industries like healthcare, education, and design.",
    },
    {
      title: "5 Projects Every ML Student Should Build",
      summary:
        "From image classification to NLP, here's a list of hands-on projects to strengthen your resume.",
    },
    {
      title: "Tips for Effective Online Mentoring",
      summary:
        "Build trust, communicate better, and drive results with these proven mentorship strategies.",
    },
  ];

  useEffect(() => {
    fetch("http://localhost:8000/user/getmentor", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        setMentorUserId(data.mentor?._id);
        // Show popup when mentor ID is fetched
        setShowRequestsPopup(true);
      });
  }, []);

  // Hide popup after 1.5 minutes (90 seconds)
  useEffect(() => {
    if (showRequestsPopup) {
      const timer = setTimeout(() => {
        setShowRequestsPopup(false);
      }, 90000); // 90000ms = 1.5 minutes

      return () => clearTimeout(timer); // Cleanup on unmount or popup hide
    }
  }, [showRequestsPopup]);

  console.log(currentMentorId);

  return (
    <div className="w-screen h-screen flex bg-[#f2faff] text-black overflow-hidden relative">
      <MentorSidebar />

      <div className="flex-1 h-screen p-10 overflow-y-auto flex gap-10">
        {/* Blogs */}
        <div className="w-full h-full">
          <h1 className={styles.blogtitle}>Your Blog Posts</h1>
          <div className={styles.blogcon}>
            {blogs.map((blog, idx) => (
              <BlogCard key={idx} title={blog.title} summary={blog.summary} />
            ))}
          </div>
        </div>
      </div>

      {/* Mentor Requests Popup */}
      <AnimatePresence>
        {showRequestsPopup && (
          <motion.div
            key="mentorRequestsPopup"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
            style={{
              position: "fixed",
              top: "1rem",
              right: "3rem",
              width: "350px",
              maxHeight: "80vh",
              backgroundColor: "white",
              boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
              borderRadius: "1rem",
              zIndex: 1100,
              overflowY: "auto",
              padding: "1rem",
            }}
          >
            <h1>Mentorship Requests</h1>
            <MentorRequests currentMentorId={currentMentorId} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Box */}
      <AnimatePresence>
        {showChat && (
          <motion.div
            key="chatbox"
            initial={{ x: 850 }}
            animate={{ x: 0 }}
            exit={{ x: 850 }}
            transition={{ duration: 1, ease: "anticipate" }}
            style={{
              position: "absolute",
              width: "50%",
              right: "1rem",
              height: "95vh",
              borderRadius: "1rem",
              backgroundColor: "#dda15e",
              zIndex: 1000,
              top:'1rem'
            }}
          >
            <Chat
              currentUserId={currentUserId} // mentor's id
              chatWithUserId={chatWithUserId} // mentee's id
              onClose={closeChat}
              show={showChat}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default MentorDashboard;
