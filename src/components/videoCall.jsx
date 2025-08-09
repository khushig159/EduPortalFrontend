import React, { useEffect, useRef, useState } from "react";
import { getSocket } from "../socket";
import styles from '../module/video.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck,faCircleXmark,faPhoneVolume,faPhone ,faMicrophoneSlash,faMicrophone,faExpand, faCamera,} from "@fortawesome/free-solid-svg-icons";
import cam from '../assets/cam.png'
import phone from '../assets/phone.png'
const VideoCall = ({ currentUserId, chatWithUserId, onClose, incomingCall }) => {
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const socket = useRef(getSocket());
  const peerConnection = useRef(null);

const [answered, setAnswered] = useState(false);
  const [inCall, setInCall] = useState(false);
  const [muted, setMuted] = useState(false);
  const [cameraOff, setCameraOff] = useState(false);
  const[mentee,setMentee]=useState('')

  const localStream = useRef(null);

  useEffect(() => {
    socket.current.emit("join", currentUserId);

    // socket.current.on("video-offer", async ({ offer, fromUserId }) => {
    //   console.log("📞 Incoming call from", fromUserId);
    //   setIncomingCall({ fromUserId, offer });
    // });
    

    socket.current.on("video-answer", async ({ answer }) => {
      console.log("✅ Received video answer");
      await peerConnection.current.setRemoteDescription(answer);
    });

    socket.current.on("ice-candidate", async ({ candidate }) => {
      if (candidate && peerConnection.current) {
        await peerConnection.current.addIceCandidate(candidate);
      }
    });

    socket.current.on("end-call", () => {
  console.log("❌ Call ended by remote user");

  if (peerConnection.current) {
    peerConnection.current.close();
    peerConnection.current = null;
  }

  if (localStream.current) {
    localStream.current.getTracks().forEach((track) => track.stop());
    localStream.current = null;
  }

  if (localVideoRef.current) localVideoRef.current.srcObject = null;
  if (remoteVideoRef.current) remoteVideoRef.current.srcObject = null;

  setInCall(false);
  setAnswered(false);
  setTimeout(() => {
    onClose?.(); // Wait a moment before closing to ensure state is reset
  }, 100);
});


    return () => {
      socket.current.off("video-offer");
      socket.current.off("video-answer");
      socket.current.off("ice-candidate");
      socket.current.off("end-call");
    };
  }, []);

  const createPeer = async (targetUserId, isCaller = false, offer = null) => {
    peerConnection.current = new RTCPeerConnection();

    peerConnection.current.onicecandidate = (event) => {
      if (event.candidate) {
        socket.current.emit("ice-candidate", {
          targetUserId,
          candidate: event.candidate,
          fromUserId: currentUserId,
        });
      }
    };

   peerConnection.current.ontrack = (event) => {
  if (remoteVideoRef.current) {
    remoteVideoRef.current.srcObject = event.streams[0];
  } else {
    setTimeout(() => {
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = event.streams[0];
      }
    }, 100);
  }
};


    localStream.current = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });

    localStream.current
      .getTracks()
      .forEach((track) =>
        peerConnection.current.addTrack(track, localStream.current)
      );

if (localVideoRef.current) {
  localVideoRef.current.srcObject = localStream.current;
} else {
  setTimeout(() => {
    if (localVideoRef.current) {
      localVideoRef.current.srcObject = localStream.current;
    }
  }, 100); // wait 100ms and try again
}

    if (isCaller) {
      const offer = await peerConnection.current.createOffer();
      await peerConnection.current.setLocalDescription(offer);
      socket.current.emit("video-offer", {
        targetUserId,
        offer,
        fromUserId: currentUserId,
      });
    } else {
      await peerConnection.current.setRemoteDescription(offer);
      const answer = await peerConnection.current.createAnswer();
      await peerConnection.current.setLocalDescription(answer);
      socket.current.emit("video-answer", {
        targetUserId,
        answer,
        fromUserId: currentUserId,
      });
    }

    setInCall(true);
  };

  const acceptCall = async () => {
  if (peerConnection.current) {
    peerConnection.current.close();
    peerConnection.current = null;
  }
  await createPeer(incomingCall.fromUserId, false, incomingCall.offer);
  setAnswered(true);
};


 const rejectCall = () => {
  // Emit to remote
  socket.current.emit("end-call", { targetUserId: incomingCall.fromUserId });

  // Clean up
  if (peerConnection.current) {
    peerConnection.current.close();
    peerConnection.current = null;
  }

  if (localStream.current) {
    localStream.current.getTracks().forEach((track) => track.stop());
    localStream.current = null;
  }

  if (localVideoRef.current) localVideoRef.current.srcObject = null;
  if (remoteVideoRef.current) remoteVideoRef.current.srcObject = null;

  setInCall(false);
  setAnswered(false);
  onClose?.();
};



  const startCall = async () => {
  if (peerConnection.current) {
    peerConnection.current.close();
    peerConnection.current = null;
  }
  await createPeer(chatWithUserId, true);
};


  const endCall = () => {
  socket.current.emit("end-call", { targetUserId: chatWithUserId });

  if (peerConnection.current) {
    peerConnection.current.close();
    peerConnection.current = null;
  }

  if (localStream.current) {
    localStream.current.getTracks().forEach((track) => track.stop());
    localStream.current = null;
  }

  if (localVideoRef.current) localVideoRef.current.srcObject = null;
  if (remoteVideoRef.current) remoteVideoRef.current.srcObject = null;

  setInCall(false);
  setAnswered(false);
  onClose?.();
};


  const toggleMute = () => {
    if (localStream.current) {
      const audioTrack = localStream.current.getAudioTracks()[0];
      audioTrack.enabled = !audioTrack.enabled;
      setMuted(!audioTrack.enabled);
    }
  };

  const toggleCamera = () => {
    if (localStream.current) {
      const videoTrack = localStream.current.getVideoTracks()[0];
      videoTrack.enabled = !videoTrack.enabled;
      setCameraOff(!videoTrack.enabled);
    }
  };

  const toggleFullScreen = () => {
    const elem = document.documentElement;
    if (!document.fullscreenElement) {
      elem.requestFullscreen().catch((err) => {
        console.error("Failed to enter fullscreen:", err);
      });
    } else {
      document.exitFullscreen();
    }
  };
useEffect(() => {
    if (!incomingCall?.fromUserId) return;

    const fetchMentee = async () => {
      try {
        const res = await fetch(`http://localhost:8000/user/getuser/${incomingCall.fromUserId}`,{
            credentials:'include'
        }); // adjust API route
        if (!res.ok) throw new Error("Failed to fetch mentee");
        const data = await res.json();
        setMentee(data.name);
      } catch (err) {
        console.error(err);
      }
    };
    fetchMentee();
  }, [incomingCall?.fromUserId]);
  useEffect(() => {
      if (!incomingCall?.fromUserId) return;

      const fetchMentor = async () => {
        try {
          const res = await fetch(`http://localhost:8000/user/getmentor/${incomingCall.fromUserId}`,{
              credentials:'include'
          }); // adjust API route
          if (!res.ok) throw new Error("Failed to fetch mentee");
          const data = await res.json();
          setMentee(data.name);
        } catch (err) {
          console.error(err);
        }
      };
      fetchMentor();
    }, [incomingCall?.fromUserId]);
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.95)",
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff",
      }}
    >
      {/* Incoming call UI */}
      {incomingCall && !answered ? (
        <div className={styles.he}
         
        >
          <h2 className={styles.h1}><FontAwesomeIcon icon={faPhoneVolume}/> Incoming call from <span>{mentee}</span></h2>
          <div className={styles.butooncont}>
            <button className={styles.accpet} onClick={acceptCall} >
              <FontAwesomeIcon icon={faCircleCheck}/> Accept
            </button>
            <button className={styles.rej} onClick={rejectCall} >
              <FontAwesomeIcon icon={faCircleXmark}/> Reject
            </button>
          </div>
        </div>
      ) : (
        <>
          <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
            <video ref={localVideoRef} autoPlay muted width="600" style={{ borderRadius: "8px" }} />
            <video ref={remoteVideoRef} autoPlay width="600" style={{ borderRadius: "8px" }} />
          </div>
          <div style={{ display: "flex", gap: "15px" }}>
            {!inCall ? (
              <div className={styles.callbutton}>
              <button className={styles.startcall} onClick={startCall}> Start Call <FontAwesomeIcon icon={faPhone}/></button>
              <button className={styles.endcall} onClick={endCall}><img src={phone} style={{width:'30px'}}/>End Call</button>
              </div>
            ) : (
              <>
              <div className={styles.buttoncontsction}>
                <button className={styles.action} onClick={endCall}><img src={phone}/></button>
                <button className={styles.action} onClick={toggleMute}>{muted ? <FontAwesomeIcon icon={faMicrophoneSlash}/>  : <FontAwesomeIcon icon={faMicrophone}/> }</button>
                <button className={styles.action} onClick={toggleCamera}>{cameraOff ? <FontAwesomeIcon icon={faCamera}/>  : <img src={cam}/>}</button>
                <button className={styles.action} onClick={toggleFullScreen}><FontAwesomeIcon icon={faExpand}/></button>
              </div></>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default VideoCall;
