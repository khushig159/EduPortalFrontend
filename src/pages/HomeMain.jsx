import { useState,useEffect } from "react";
import Sidebar from "../components/Sidebar";
import HomeSection from "../components/HomeSection";
import Chat from "../components/Chat";
import { AnimatePresence, motion } from "framer-motion";
import MentorDashboard from "../components/MentorDashboard";
import { getSocket } from "../socket";
import { useChat } from "../store/ChatContext";

function Homemain() {
  const { currentUserId, chatWithUserId, showChat, closeChat } = useChat();

//   const [chatid, setChatid] = useState("");
//   const [buttonclicked, setButtonclicked] = useState(false);
// const [activeChatUser, setActiveChatUser] = useState(null); // userId of who you chat with
// const [showChat, setShowChat] = useState(false);

// useEffect(() => {
//   const socket = getSocket();

//   socket.on("mentorshipAccepted", ({ mentorId }) => {
//     // Automatically open chat with mentor
//     setActiveChatUser(mentorId);
//     setShowChat(true);
//   });

//   // Clean up
//   return () => {
//     socket.off("mentorshipAccepted");
//   };
// }, []);


  return  (
    <div
      style={{
        overflowX: "hidden",
        position: "relative",
        color: "white",
        display: "flex",
        width: "100vw",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Sidebar/>
      {/* <Sidebar setChatid={setChatid} setButtonclicked={setButtonclicked} /> */}
      <HomeSection />
      <AnimatePresence>
        {showChat && chatWithUserId && (
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
            }}
          >
            <Chat
              currentUserId={currentUserId}
              chatWithUserId={chatWithUserId}
              show={showChat}
              onClose={closeChat}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Homemain;




