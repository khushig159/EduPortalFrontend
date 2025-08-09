import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Card from "./Card";
import styles from "../module/card.module.css";
import { getSocket } from "../socket";
import { useChat } from "../store/ChatContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFaceSmile,
  faFaceFrown,
  faHourglassEnd,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import MentorBot from "./MentorBot";

function FindMentor(props) {
  const [enteredbot, setEnteredbot] = useState(false);
const[Id,setid]=useState();
  const [mentors, setMentors] = useState([]);
  const [waiting, setWaiting] = useState(false);
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [status, setStatus] = useState(null); // "accepted", "rejected", null
  const timeoutRef = useRef(null);
  const[mentee,setMentee]=useState()
  const socket = useRef(null);
  const { currentUserId, openChat } = useChat();

  useEffect(() => {
    if (!currentUserId) return; // wait until we have an ID
    socket.current = getSocket();
    socket.current.emit("join", props.currentUserId); // join mentee room

    socket.current.on("mentorshipAccepted", ({ mentorId }) => {
      if (mentorId === selectedMentor?._id) {
        setStatus("accepted");
        clearTimeout(timeoutRef.current);
        setWaiting(false);
        openChat(mentorId); // Open chat automatically with mentor

        socket.current.emit("menteeAcceptedMentorship", {
          mentorId,
          menteeId: currentUserId,
        });
      }
    });

    socket.current.on("mentorshipRejected", ({ mentorId }) => {
      if (mentorId === selectedMentor?._id) {
        setStatus("rejected");
        clearTimeout(timeoutRef.current);
        setWaiting(false);
      }
    });

    return () => {
      socket.current.off("mentorshipAccepted");
      socket.current.off("mentorshipRejected");
    };
  }, [selectedMentor, currentUserId, selectedMentor]);

  useEffect(() => {
    fetch("http://localhost:8000/user/mentor", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setMentors(data.data); // Your API returns { success, count, data }
        }
      })
      .catch((err) => {
        console.error("Error fetching mentors:", err);
      });
  }, []);

  function onrequest(id) {
    console.log(id);
    setid(id)
    const mentor = mentors.find((m) => m._id === id);
    setSelectedMentor(mentor);
    setStatus(null);
    setWaiting(true);

    socket.current.emit("requestMentorship", {
      mentorId: id,
      menteeId: currentUserId,
    });

    // Timeout after 60 seconds
    timeoutRef.current = setTimeout(() => {
      setWaiting(false);
      setStatus("timeout");
    }, 60000);
  }
  useEffect(() => {
    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, []);
  useEffect(() => {
    if (status === "accepted" || status === "rejected") {
      const timer = setTimeout(() => {
        setStatus(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  const color = (status) => {
    if (status === "accepted") {
      return "green";
    } else if (status === "rejected") {
      return "red";
    } else {
      return "black";
    }
  };
  useEffect(() => {
      if (!Id) return;
  
      const fetchMentor = async () => {
        try {
          const res = await fetch(
            `http://localhost:8000/user/getmentor/${Id}`,
            {
              credentials: "include",
            }
          ); // adjust API route
          if (!res.ok) throw new Error("Failed to fetch mentee");
          const data = await res.json();
          setMentee(data);
        } catch (err) {
          console.error(err);
        }
      };
      fetchMentor();
    }, [Id]);
  return (
    <>
    <AnimatePresence>
      {props.entered && (
        <motion.div
          key="mentor-modal"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 0.9, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ duration: 0.2 }}
          style={{
            display: "flex",
            justifyContent: "center",
            // alignItems: "center",
            gap: "3rem",
            position: "absolute",
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(255, 255, 255, 0.5)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            borderRadius: "0.75rem",
            padding: "1rem",
            overflowY: "auto",
          }}
          className={styles.containerr}
        >
          <div
            onClick={() => {
              props.setEntered(false);
              props.setSelectMentor(false);
            }}
            style={{
              cursor: "pointer",
              position: "absolute",
              top: "0",
              left: "0",
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
            <div className={styles.cardflex}>
              {mentors.map((mentor, index) => (
                <Card
                  key={mentor._id}
                  image={`https://randomuser.me/api/portraits/${
                    index % 2 === 0 ? "women" : "men"
                  }/${30 + index}.jpg`}
                  name={mentor.name}
                  title={`${mentor.Qualification} at ${mentor.Organisation}`}
                  category="User Experience"
                  exp={mentor.Exp}
                  handleRequest={() => onrequest(mentor._id)}
                />
              ))}
            </div>
          </div>
          {(waiting ||
            status === "timeout" ||
            status === "accepted" ||
            status === "rejected") && (
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                // marginLeft:'2rem',
                height: "100%",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 9999,
              }}
            >
              <div
                style={{
                  backgroundColor: "white",
                  padding: "1rem 2rem",
                  borderRadius: "10px",
                  boxShadow: "0 0 15px rgba(0,0,0,0.3)",
                  fontSize: "1.5rem",
                  fontWeight: "600",
                  color: color(status),
                  textAlign: "center",
                  minWidth: "300px",
                  marginLeft:'4rem'
                }}
                className={styles.contcont}
              >
                {waiting && (
                  <div className={styles.waitingModal}>
                    <FontAwesomeIcon icon={faClock} />
                    <p className={styles.help}>
                    Waiting for {selectedMentor?.name} to accept
                    </p>
                  </div>
                )}
                {status === "timeout" && (
                  <div className={styles.cont}>
                    <FontAwesomeIcon icon={faHourglassEnd} /> Taking too long?{" "}
                    <br />{" "}
                    <p className={styles.help} >
                      Get help from {selectedMentor?.name}'s Assistant{" "}
                    </p>
                    <button onClick={() => setEnteredbot(true)}style={{marginRight:'15px'}}className={styles.buttonnn}>Ask now</button>
                    <button onClick={()=>setStatus(null)} className={styles.buttonnn}>Go Back</button>
                  </div>
                )}
                {status === "accepted" && (
                  <div className={styles.cont}>
                    <FontAwesomeIcon icon={faFaceSmile} /> Mentor Accepted!
                  </div>
                )}

                {status === "rejected" && (
                  <div className={styles.cont}>
                    {" "}
                    <FontAwesomeIcon icon={faFaceFrown} />
                    Mentor Rejected
                  </div>
                )}
              </div>
            </div>
          )}
        </motion.div>
      )}
    {enteredbot && mentee && <MentorBot user={mentee} entered={enteredbot} setEnteredbot={setEnteredbot}/>}
    </AnimatePresence>
    </>
  );
}

export default FindMentor;
