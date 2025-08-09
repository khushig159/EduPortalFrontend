import { useState } from "react";
import Sidebar from "../components/Sidebar";
import HomeSection from "../components/HomeSection";
import Chat from "../components/Chat";
import { AnimatePresence, motion } from "framer-motion";
import MentorDashboard from "../components/MentorDashboard";
import Cookies from 'js-cookie'
import { useChat } from "../store/ChatContext";

function HomeMainMentor() {
    const { chatWithUserId,openChat, showChat, closeChat, currentUserId } = useChat();
console.log("HomeMainMentor showChat:", showChat, "chatWithUserId:", chatWithUserId);

// console.log(currentUserId)
// console.log(chatWithUserId)
  // const [chatid, setChatid] = useState("");
  // const [buttonclicked, setButtonclicked] = useState(false);

  return  (
    <>
    <MentorDashboard />
    {/* <button onClick={() => openChat("")}>Test Open Chat</button> */}

          {/* <AnimatePresence>
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
          </AnimatePresence> */}
          </>
  )
}

export default HomeMainMentor;




