import React, { useEffect, useRef, useState } from "react";
import styles from "../module/ChatBot.module.css";
import ReactMarkdown from "react-markdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperclip } from "@fortawesome/free-solid-svg-icons";
import { getAiResponse } from "./openai";
import { motion, AnimatePresence } from "framer-motion";

export default function MentorBot({ user, entered, setEnteredbot }) {
  const msgend = useRef(null);
  const [input, setInput] = useState("");
  const [file, setFile] = useState(null);
  const instruction=`
You are a supportive AI mentor named ${user.name} designed to guide students throughout their academic and career journey having qualifications as follows: ${user.Qualification} having experience of ${user.Exp} yrs from organisation ${user.Organisation}.

Always aim to:
- Offer advice on academics, career paths, internships, skill development, and college life.
- Provide solutions like a real mentor—${user.personality}.
- When given a resume or academic document (PDF or image), analyze it and offer:
  - Academic strengths and weaknesses
  - Skill suggestions and growth areas
  - Internship and course recommendations
  - Personalized motivation to help the student grow

Tone:
- Be warm, human-like, and motivational. Never sound robotic.
- Avoid being overly formal—speak like a caring senior or mentor.
- If the query is outside academics or career-related matters, politely say:
  “I'm here to help with your academic and career growth. Let's stay focused on that!”

NEVER answer:
- Medical, legal, or financial queries
- Personal relationship issues
- Politics, religion, or anything controversial

Examples of acceptable topics:
-"Answer this question"
-"Solve this question for me"
- “What skills should I add to get a good internship?”
- “How can I improve my academic performance?”
- “Please review my resume and suggest improvements.”
- “Which programming languages should I learn for placement?”

Your primary goal: *Guide the student forward with empathy, clarity, and purpose.*
`
  console.log(user.name)
  const [messages, setMessages] = useState([
    {
      text: "Hi there! I am here to help you with anything academic-related. Upload your materials or just type a question!",
      isBot: true,
    },
  ]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    msgend.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (textOverride = null) => {
    const text = typeof textOverride === "string" ? textOverride : input;

    if (!text.trim() && !file) return;

    setInput("");
    setMessages((prev) => [
      ...prev,
      { text: text || "Uploaded resume", isBot: false },
    ]);
    setLoading(true);

    try {
      const res = await getAiResponse(text, file,instruction);
      const safeRes = typeof res === "string" ? res : JSON.stringify(res);
      setMessages((prev) => [...prev, { text: safeRes, isBot: true }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { text: "Error: " + err.message, isBot: true },
      ]);
    }

    setLoading(false);
    setFile(null);
  };

  const handleEnter = async (e) => {
    if (e.key === "Enter") await handleSend();
  };

return (
    <>
      <AnimatePresence>
        {entered && (
          <motion.div
            key="mentor-modal"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 0.9, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "3rem",
              position: "absolute",
              top:'-10px',
              // width: "100vw",
              height: "100vh",
              backgroundColor: "rgba(255, 255, 255,15)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              borderRadius: "0.75rem",
              padding: "1rem",
              overflowY: "scroll",
              overflowX:"scroll"
            }}
            className={styles.containerr}
          >
            <div
              onClick={() => {
                setEnteredbot(false);
              }}
              style={{
                cursor: "pointer",
                position: "absolute",
                top: "10px",
                left: "150px",
                fontSize: "1.875rem",
                color: "black",
              }}
            >
              <i className="ri-xrp-line"></i>
            </div>
            <div
              style={{
                minHeight: "80vh",
                overflowY: "auto",
              }}
              className={styles.cardContainer}
            >
              <main className={styles.chatMain2}>
                <div className={styles.chatHeader}>
                  <h2 className={styles.chatHeading}>Hello! <br/> I'am {user.name}'s AI  Assistant</h2>
                </div>
                {messages.map((message, index) => (
                  <div
                    className={
                      message.isBot
                        ? styles.chatBubbleLeft
                        : styles.chatBubbleRight
                    }
                    key={index}
                  >
                    <div
                      className={
                        message.isBot
                          ? styles.bubbleContent
                          : `${styles.bubbleContent} ${styles.right}`
                      }
                    >
                      <ReactMarkdown
                        components={{
                          p: ({ node, ...props }) => (
                            <p
                              className={
                                message.isBot
                                  ? styles.msg
                                  : `${styles.msg} ${styles.msgRight}`
                              }
                              {...props}
                            />
                          ),
                          strong: ({ node, ...props }) => (
                            <strong className={styles.strong} {...props} />
                          ),
                          ul: ({ node, ...props }) => (
                            <ul className={styles.list} {...props} />
                          ),
                          li: ({ node, ...props }) => (
                            <li className={styles.listItem} {...props} />
                          ),
                        }}
                      >
                        {message.text}
                      </ReactMarkdown>
                    </div>
                  </div>
                ))}
                {loading && (
                  <div className={styles.chatBubbleLeft}>
                    <div className={styles.bubbleContent}>
                      <div className={`${styles.msg} ${styles.typingDots}`}>
                        <span>•</span>
                        <span>•</span>
                        <span>•</span>
                      </div>
                    </div>
                  </div>
                )}

                <div ref={msgend}></div>
                <div className={styles.chatInput}>
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleEnter}
                    placeholder="Type your message ..."
                  />
                  <label className={styles.uploadBtn}>
                    <FontAwesomeIcon icon={faPaperclip} />
                    <input
                      type="file"
                      style={{ display: "none" }}
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => setFile(e.target.files[0])}
                    />
                  </label>
                  <button
                    style={{ border: "none", outline: "none" }}
                    className={styles.sendBtn}
                    onClick={() => handleSend()}
                  >
                    Send
                  </button>
                  {file && (
                    <div
                      style={{ marginLeft: "1rem", fontSize: "12px", color: "gray" }}
                    >
                      {file.name}
                    </div>
                  )}
                </div>
              </main>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
