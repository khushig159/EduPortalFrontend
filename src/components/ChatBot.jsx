import React, { useEffect, useRef, useState } from "react";
import styles from "../module/ChatBot.module.css";
import ReactMarkdown from "react-markdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaperclip,
 
} from "@fortawesome/free-solid-svg-icons";
import { getAiResponse } from "./openai";

export default function ChatBot() {
   const msgend = useRef(null);
  const [input, setInput] = useState("");
  const [file, setFile] = useState(null);
  const [messages, setMessages] = useState([
    {
      text: "Hi there! I am here to help you with anything academic-related. Upload your materials or just type a question!",
      isBot: true,
    },
  ]);
  const [loading, setLoading] = useState(false);

  const allSuggestions = [
  "How can I improve my academic performance?",
  "Suggest online courses to learn Python.",
  "What skills should I learn for a software job?",
  "Internship opportunities for 2nd-year students?",
  "How do I write a resume with no experience?",
  "How to find research internships in college?",
  "Best certifications for engineering students?",
  "What are the top skill development platforms?",
  "Which programming languages should I master for placements?",
  "Tips to build a strong LinkedIn profile as a student.",
  "What are the best project ideas for my resume?",
  "How can I get started with open source contributions?",
  "What should I include in my resume summary?",
  "How to prepare for campus placements?",
  "What is the STAR method in behavioral interviews?",
  "How do I build a strong GitHub profile?",
  "Should I do an internship or focus on academics?",
  "How do I handle academic stress effectively?",
  "Can you suggest books for personal and professional growth?",
  "What are the best ways to prepare for technical interviews?",
  "What are trending technologies in 2025?",
  "How to build a career in AI or Data Science?",
  "What is the importance of soft skills in placements?",
  "What extracurriculars can improve my resume?"
];

  const getRandomSuggestions = () => {
    const shuffled = [...allSuggestions].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 5);
  };
  const [suggestions, setSuggestions] = useState(getRandomSuggestions());


  useEffect(() => {
    msgend.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (textOverride ) => {
    console.log(textOverride)
    const text = typeof textOverride === "string" ? textOverride : input;
    console.log(text)
    if (!text.trim() && !file) return;

    setInput("");
    setMessages((prev) => [
      ...prev,
      { text: text || "Uploaded material", isBot: false },
    ]);
    setLoading(true);


    try {
      const res = await getAiResponse(text, file);
      const safeRes = typeof res === "string" ? res : JSON.stringify(res); // 🔒 Fix here
      setMessages((prev) => [...prev, { text: safeRes, isBot: true }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { text: "Error: " + err.message, isBot: true },
      ]);
    }

    setLoading(false);
    setFile(null);
    setSuggestions(getRandomSuggestions()); // update after send

  };

  const handleEnter = async (e) => {
    if (e.key === "Enter") await handleSend();
  };

  return (
    <>
      <main className={ styles.chatMain} >
        <div className={styles.chatHeader}>
          <h2 className={styles.chatHeading}>Mentor AI Assistant</h2>
        </div>
        {messages.map((message, index) => (
          <div
            className={
              message.isBot ? styles.chatBubbleLeft : styles.chatBubbleRight
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
                  // Add more markdown elements here as needed
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
       
        <div className={styles.suggestions}>
          {suggestions.map((question, i) => (
            <button key={i} onClick={() => handleSend(question)} style={{border:'none',outline:'none'}}>
              {question}
            </button>
          ))}
        </div>
        <div ref={msgend}></div>
        <div className={styles.chatInput}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleEnter}
            placeholder="Type your query..."
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
          <button style={{border:'none',outline:'none'}} className={styles.sendBtn} onClick={() => handleSend()}>
            Send
          </button>
          {file && (
          <div style={{ marginLeft: "1rem", fontSize: "12px", color: "gray" }}>
             {file.name}
          </div>
        )}
        </div>
       
      </main>
    </>
  );
}
