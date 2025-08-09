import React, { createContext, useContext, useState, useEffect } from "react";
import { getSocket } from "../socket";

const ChatContext = createContext();

export const ChatProvider = ({ children, currentUserId }) => {
  const [chatWithUserId, setChatWithUserId] = useState(null);
  const [showChat, setShowChat] = useState(false);

  useEffect(() => {
    const socket = getSocket();

   socket.on("mentorshipAccepted", ({ mentorId, menteeId }) => {
    if (currentUserId === mentorId) {
      // Current user is mentor, chat with mentee
      setChatWithUserId(menteeId);
      setShowChat(true);
    } else if (currentUserId === menteeId) {
      // Current user is mentee, chat with mentor
      setChatWithUserId(mentorId);
      setShowChat(true);
    }
  });

    return () => {
      socket.off("mentorshipAccepted");
    };
  }, []);

  const openChat = (userId) => {
    console.log("openChat called with userId:", userId);
    setChatWithUserId(userId);
    setShowChat(true);
  };

  const closeChat = () => {
    setShowChat(false);
    setChatWithUserId(null);
  };

  return (
    <ChatContext.Provider
      value={{
        currentUserId,
        // setCurrentUserId,
        chatWithUserId,
        openChat,
        closeChat,
        showChat,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

// Custom hook for easier usage in components
export const useChat = () => useContext(ChatContext);
