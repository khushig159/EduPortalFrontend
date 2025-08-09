import React from "react";

function Chat(props) {
  return (
    <div
      style={{
        padding: "1rem",
        width: "100%",
        height: "100%",
        position: "relative",
      }}
    >
      {/* Close Button */}
      <div
        onClick={() => {
          props.setButtonclicked(false);
        }}
        style={{
          cursor: "pointer",
          position: "absolute",
          top: "2rem",
          left: "2rem",
          fontSize: "1.875rem", // ~text-3xl
          color: "black",
        }}
      >
        <i className="ri-xrp-line"></i>
      </div>

      {/* Chat Content */}
      {props.chatid}
    </div>
  );
}

export default Chat;
