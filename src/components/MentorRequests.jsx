import React, { useEffect, useRef, useState } from "react";
import { getSocket } from "../socket"; // adjust path
import MentorRequestCard from "./MentorRequestCard"; // your card UI
import { useChat } from "../store/ChatContext";
import styles from "../module/MentorRequestCard.module.css";


function MentorRequests({ currentMentorId}) {
  const socket = useRef(null);
  const [requests, setRequests] = useState([]);
  const { openChat } = useChat(); // import openChat from context

  useEffect(() => {
    if (!currentMentorId) return;
    socket.current = getSocket();
    socket.current.emit("join", currentMentorId);

    socket.current.on("newMentorshipRequest", ({ mentorId, menteeId }) => {
      setRequests((prev) => [...prev, { mentorId, menteeId }]);
    });

    socket.current.on("mentorshipAcceptedByMentee", ({ menteeId }) => {
      console.log("Mentorship accepted by mentee, opening chat with:", menteeId);
        // setShowRequestsPopup(false);
      openChat(menteeId);  // This opens chat on mentor side with that mentee
    });

    return () => {
      socket.current.off("newMentorshipRequest");
      socket.current.off("mentorshipAcceptedByMentee");
    };
  }, [currentMentorId,openChat]);

  const respond = (menteeId, action) => {
  if (action === "accept") {
    socket.current.emit("acceptMentorship", {
      mentorId: currentMentorId,
      menteeId,
    });
  } else {
    socket.current.emit("rejectMentorship", {
      mentorId: currentMentorId,
      menteeId,
    });
  }
  setRequests((prev) => prev.filter((r) => r.menteeId !== menteeId));
};

  return (
    <div>
      {/* <h1 className="text-3xl font-bold text-[#023047] mb-6">Mentor Requests</h1> */}
<div className={styles.flexxx}>
        {requests.map((req, idx) => (
          <MentorRequestCard
            key={idx}
            {...req}
            onAccept={() => respond(req.menteeId, "accept")}
            onReject={() => respond(req.menteeId, "reject")}
          />
        ))}
      </div>
    </div>
  );
}

export default MentorRequests;
