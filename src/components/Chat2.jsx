import React, { useEffect, useState } from "react";
import styles from "../module/chat.module.css";

function ChatHistory(props) {
  const { currentUserId, chatWithUserId,show ,onClose} = props;

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (!chatWithUserId) return;

    const fetchMessages = async () => {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/messages/${currentUserId}/${chatWithUserId}`
      );
      const data = await res.json();
      setMessages(data.messages);

      // mark as seen (optional, you can keep or remove this)
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

  const formatTime = (timeStr) => {
    const date = new Date(timeStr);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  if (!show) return null;
  

  return (
    <div
      className={styles.container}
      style={{
        padding: "1rem",
        width: "100%",
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
          fontSize: "1.875rem",
          color: "black",
        }}
      >
        <i className="ri-xrp-line"></i>
      </div>

      {/* Chat History Section */}
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
                    color: isMe ? "white" : "black",
                    fontFamily: "DM sans",
                    fontSize: "16px",
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
        </div>
      </aside>
    </div>
  );
}

export default ChatHistory;
