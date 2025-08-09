import React, { useEffect, useState, useRef } from "react";
import styles from "../module/chat.module.css";
import VideoCall from "./videoCall";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaPaperPlane } from "react-icons/fa";
import { FaVideo } from "react-icons/fa";
import { getSocket } from "../socket";

function Chat(props) {
  const { currentUserId, chatWithUserId, show, onClose } = props;

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const socket = useRef(null); // store in ref to avoid re-renders
  const typingTimeoutRef = useRef(null);
  const [showVideoCall, setShowVideoCall] = useState(false);
  const [incomingCall, setIncomingCall] = useState(null);

  useEffect(() => {
    if (!socket.current) return;

    const s = socket.current;

    const handleVideoOffer = ({ offer, fromUserId }) => {
      console.log("📞 Incoming call from", fromUserId);
      setIncomingCall({ offer, fromUserId });
      setShowVideoCall(true); // automatically show the call UI
    };

    s.on("video-offer", handleVideoOffer);

    return () => {
      s.off("video-offer", handleVideoOffer);
    };
  }, []);

  useEffect(() => {
    socket.current = getSocket();
    socket.current.emit("join", currentUserId); //Emits a "join" event with your user ID, telling the server "I’m online!"

    socket.current.on("receiveMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    socket.current.on("typing", () => setIsTyping(true));
    socket.current.on("stopTyping", () => setIsTyping(false));

    return () => {
      socket.current.off("receiveMessage");
      socket.current.off("typing");
      socket.current.off("stopTyping");
      // socket.current.disconnect(); // Optional but clean
    };
  }, [currentUserId]);

  useEffect(() => {
    if (!chatWithUserId) return;

    const fetchMessages = async () => {
      const res = await fetch(
        `${
          import.meta.env.VITE_API_URL
        }/messages/${currentUserId}/${chatWithUserId}`
      );
      const data = await res.json();
      setMessages(data.messages);

      // mark as seen
      await fetch(`${import.meta.env.VITE_API_URL}/messages/seen`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          senderId: chatWithUserId,
          receiverId: currentUserId,
        }),
      });
    };

    fetchMessages();
  }, [chatWithUserId, currentUserId]);

  const sendMessage = () => {
    if (!message.trim()) return;

    const newMessage = {
      senderId: currentUserId,
      receiverId: chatWithUserId,
      content: message,
    };

    console.log("Sending message with:", newMessage);

    socket.current.emit("sendMessage", newMessage);
    setMessages((prev) => [...prev, newMessage]);
    setMessage("");

    socket.current.emit("stopTyping", {
      from: currentUserId,
      to: chatWithUserId,
    });
  };

  const handleTyping = (e) => {
    const text = e.target.value;
    setMessage(text);

    socket.current.emit("typing", {
      from: currentUserId,
      to: chatWithUserId,
    });

    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);

    typingTimeoutRef.current = setTimeout(() => {
      socket.current.emit("stopTyping", {
        from: currentUserId,
        to: chatWithUserId,
      });
    }, 1000);
  };

  const formatTime = (timeStr) => {
    const date = new Date(timeStr);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div
      className={styles.container}
      style={{
        padding: "1rem",
        width: "100%",
        // height: "100%",
        position: "relative",
      }}
    >
      {/* Close Button */}
      <div
        onClick={onClose}
        style={{
          cursor: "pointer",
          position: "absolute",
          top: "1rem",
          left: "2rem",
          fontSize: "1.875rem", // ~text-3xl
          color: "black",
        }}
      >
        <i className="ri-xrp-line"></i>
      </div>

      {/* Video Call */}
      {showVideoCall && (
        <VideoCall
          currentUserId={currentUserId}
          chatWithUserId={chatWithUserId}
          onClose={() => {
            setShowVideoCall(false);
            setIncomingCall(null);
          }}
          incomingCall={incomingCall}
        />
      )}

      {/* Chat Section */}
      <aside>
        <div
          className={styles.messagecontainer}
          style={{ height: "85%", overflowY: "auto", padding: 30 }}
        >
          {messages.map((msg, idx) => {
            const isMe = msg.senderId === currentUserId;
            return (
              <div
                key={idx}
                style={{
                  textAlign: isMe ? "right" : "left",
                  margin: "0px 0",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: isMe ? "flex-end" : "flex-start",
                }}
              >
                <div
                  style={{
                    backgroundColor: isMe ? "#001d3d" : "#f0f0f0",
                    padding: "8px 12px",
                    borderRadius: "15px",
                    maxWidth: "60%",
                    wordWrap: "break-word",
                    color:isMe ? "white" : "black",
                    fontFamily:'DM sans',
                    fontSize:'16px'
                  }}
                >
                  {msg.content}
                </div>
                <div
                  style={{
                    fontSize: "10px",
                    fontFamily: "DM sans",
                    color: "black",
                    marginTop: "3px",
                  }}
                >
                  {formatTime(msg.timestamp || new Date())}{" "}
                  {isMe && (msg.seen ? "✓✓ " : "✓ ")}
                </div>
              </div>
            );
          })}
          {isTyping && (
            <div>
              <em
                style={{
                  fontFamily: "DM sans",
                  fontSize: "10px",
                  color: "#888",
                }}
              >
                Typing...
              </em>
            </div>
          )}
        </div>

        <div className={styles.inputfield}>
          <input
            type="text"
            value={message}
            onChange={handleTyping}
            placeholder="Type your message"
          />
          <button className={styles.butoons} onClick={sendMessage}>
            <FaPaperPlane />
          </button>
          <button
            className={styles.butoons} 
            onClick={() => setShowVideoCall(true)}
          >
            <FaVideo />
          </button>
        </div>
      </aside>
    </div>
  );
}

export default Chat;
