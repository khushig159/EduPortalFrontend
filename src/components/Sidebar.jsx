import React, { useState, useEffect } from "react";
import { anticipate, motion,AnimatePresence } from "framer-motion";
import "remixicon/fonts/remixicon.css";
import { useChat } from "../store/ChatContext";
import ChatHistory from "./Chat2";
import styles from '../module/video.module.css'
import { useNavigate,  } from "react-router-dom";

function Sidebar() {
  const navigate=useNavigate()
  const [collapse, setCollapse] = useState(false);
  const [chatid,setChatid]=useState(null)
  const [buttonclicked,setButtonclicked]=useState(false)
  const [currentUserId, setCurrentUserId] = useState(null);
  const [text, setText] = useState("");
  const [history, setHistory] = useState([]); // contains mentorId and messages
  const [mentorNames, setMentorNames] = useState({}); // store mentorId -> name mapping
  const transition = { duration: 0.6, ease: anticipate };

  // Handle "Ask with AI" label fade
  useEffect(() => {
    if (!collapse) {
      const timer = setTimeout(() => setText("Ask with AI"), 500);
      return () => clearTimeout(timer);
    } else {
      setText("");
    }
  }, [collapse]);

  useEffect(() => {
    // Get current user id
    fetch("http://localhost:8000/user/getuser", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.user?._id) {
          setCurrentUserId(data.user._id);
        }
      })
      .catch((err) => console.error(err));
  }, []);
function handleOnclose(){
  setButtonclicked(false)
}
  // Fetch mentors and messages
  useEffect(() => {
    if (!currentUserId) return;

    const fetchMentors = async () => {
      try {
        const res = await fetch("http://localhost:8000/user/mentor", { credentials: "include" });
        const mentors = await res.json();
        return mentors.data.map((m) => m._id || m.id);
      } catch (err) {
        console.error("Error fetching mentors:", err);
        return [];
      }
    };

    const fetchMessagesForMentors = async (ids) => {
      const resultArray = [];
      await Promise.all(
        ids.map(async (mentorId) => {
          try {
            const res = await fetch(`http://localhost:8000/messages/${currentUserId}/${mentorId}`, {
              credentials: "include",
            });
            const data = await res.json();
            if (data?.messages?.length > 0) {
              resultArray.push({
                mentorId,
                messages: data.messages,
              });
            }
          } catch (err) {
            console.error(`Error fetching messages for ${mentorId}:`, err);
          }
        })
      );
      setHistory(resultArray);
    };

    (async () => {
      const mentors = await fetchMentors();
      if (mentors.length) {
        await fetchMessagesForMentors(mentors);
      }
    })();
  }, [currentUserId]);

  // Fetch mentor names when history changes
  useEffect(() => {
    if (history.length === 0) return;

    const fetchMentorNames = async () => {
      const newMentorNames = {};
      await Promise.all(
        history.map(async (mentor) => {
          try {
            const res = await fetch(`http://localhost:8000/user/getmentor/${mentor.mentorId}`, {
              credentials: "include",
            });
            if (!res.ok) throw new Error("Failed to fetch mentor name");
            const data = await res.json();
            newMentorNames[mentor.mentorId] = data.name || "Unknown";
          } catch (err) {
            console.error(err);
            newMentorNames[mentor.mentorId] = "Unknown";
          }
        })
      );
      setMentorNames(newMentorNames);
    };

    fetchMentorNames();
  }, [history]);

  return (<>
    <motion.div
      animate={collapse ? { width: "3.5rem" } : { width: "20vw" }}
      transition={transition}
      style={{
        marginLeft: "1rem",
        height: "95vh",
        display: "flex",
        padding: "0.5rem",
        flexDirection: "column",
        minWidth: "4rem",
        alignItems: "center",
        paddingTop: "1rem",
        borderRadius: "1rem",
        backgroundColor: "#023047",
      }}
    >
      {/* Collapse toggle */}
      <button
        onClick={() => setCollapse(!collapse)}
        style={{ background: "none", border: "none", cursor: "pointer" }}
      >
        <i className="ri-collage-fill" style={{ fontSize: "2.25rem" }}></i>
      </button>

      {/* History label */}
      <motion.h1
        animate={{ x: 9 }}
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
        <i className="ri-history-fill" style={{ fontSize: "1.875rem",fontFamily:"DM sans" }}></i>
        <motion.p animate={{ opacity: collapse ? 0 : 1 }} transition={{ delay: 0.5, duration: 0.2 }}>
          {collapse ? "" : "History"}
        </motion.p>
      </motion.h1>

      {/* Dynamic mentor history */}
      {history.map((mentor) => (
        <motion.button
          key={mentor.mentorId}
          animate={collapse ? { opacity: 0 } : { opacity: 1 }}
          transition={collapse ? { delay: 0 } : { delay: 0.5 }}
          className={styles.historymap}
          onClick={() => {
            setChatid(mentor.mentorId);
            setButtonclicked(true);
          }}
          style={{
            width: "100%",
            height: "2.5rem",
            marginTop: "0.25rem",
            borderRadius: "0.3rem",
            border: "none",
            cursor: "pointer",
            fontFamily:'DM sans'
          }}
          // onMouseOver={(e) => {e.target.style.backgroundColor = "#fefae0"}}
          // onMouseOut={(e) => (e.target.style.backgroundColor = "rgba(0, 0, 0, 0.2)")}
        >
          {!collapse && ` ${mentorNames[mentor.mentorId] || "Loading..."} `}
        </motion.button>
      ))}

      {/* Spacer */}
      <div style={{ flexGrow: 1 }}></div>

      {/* Ask with AI button */}
      <motion.button
      onClick={()=>navigate('/chat')}
      className={styles.butooonn}
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
          // background: "transparent",
          cursor: "pointer",
          fontFamily:'DM sans'
        }}
        // onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#fefae0")}
        // onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
      >
        <i className="ri-chat-ai-line" style={{ fontSize: "1.7rem" }}></i>
        <motion.p animate={{ opacity: collapse ? 0 : 1 }} transition={{ delay: 0.5, duration: 0.2 }}>
          {text}
        </motion.p>
      </motion.button>
    </motion.div>
    
   <AnimatePresence>
        {buttonclicked  && (
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
              zIndex:9999
            }}
          >
            <ChatHistory
    show={buttonclicked}
    currentUserId={currentUserId}
    chatWithUserId={chatid}
    onClose={handleOnclose}
    />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Sidebar;
