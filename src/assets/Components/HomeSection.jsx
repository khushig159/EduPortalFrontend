import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";

import SplitText from "./anicomp/SplitText";
import AskOption from "./AskOption";
import FindMentor from "./FindMentor";

function HomeSection() {
  const [selectMentor, setSelectMentor] = useState(false);
  const [searchtext, setSeachText] = useState("");
  const [hasAnimated, setHasAnimated] = useState(false);
  const [entered, setEntered] = useState(false);

  const submithandler = (e) => {
    e.preventDefault();
    setEntered(true);
  };

  const complete = () => {
    setHasAnimated(!hasAnimated);
  };

  return (
    <div
      initial={{ opacity: 0 }}
      animate={hasAnimated ? { opacity: 1 } : ""}
      style={{
        flex: 1,
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        color: "#16211c",
        padding: "2rem",
      }}
    >
      <div>
        {hasAnimated ? (
          <h1
            style={{
              fontSize: "3rem",
              fontWeight: "600",
              textAlign: "center",
              paddingBottom: "0.5rem",
            }}
          >
            What do you want to learn today?
          </h1>
        ) : (
          <SplitText
            text="What do you want to learn today?"
            className=""
            delay={100}
            duration={0.2}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            rootMargin="-100px"
            textAlign="center"
            onLetterAnimationComplete={complete}
          />
        )}
      </div>

      <br />

      <form
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        onSubmit={submithandler}
      >
        <input
          placeholder="Search Domain"
          onChange={(e) => setSeachText(e.target.value)}
          value={searchtext}
          style={{
            width: "50%",
            height: "4rem",
            fontSize: "1.25rem",
            border: "1px solid #dda15e",
            outline: "none",
            borderRadius: "9999px",
            paddingLeft: "2rem",
            paddingRight: "2rem",
          }}
        />
        <button
          type="submit"
          style={{
            width: "5rem",
            marginLeft: "1rem",
            padding: "1rem",
            backgroundColor: "#dda15e",
            color: "white",
            border: "none",
            textAlign: "center",
            borderRadius: "1.5rem",
            cursor: "pointer",
          }}
        >
          Submit
        </button>
      </form>

      {/* Suggestions */}
      <div
        style={{
          marginTop: "1.5rem",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "0.75rem",
          maxWidth: "60%",
        }}
      >
        {[
          "Web Development",
          "Machine Learning",
          "Data Science",
          "Cybersecurity",
          "UI/UX Design",
          "Python",
          "Cloud Computing",
          "Blockchain",
        ].map((topic, idx) => (
          <button
            key={idx}
            onClick={() => setSeachText(topic)}
            style={{
              backgroundColor: "#fefae0",
              border: "1px solid #dda15e",
              color: "#16211c",
              padding: "0.5rem 1rem",
              borderRadius: "9999px",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = "#dda15e";
              e.target.style.color = "white";
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = "#fefae0";
              e.target.style.color = "#16211c";
            }}
          >
            {topic}
          </button>
        ))}
      </div>

      {entered ? (
        selectMentor ? (
          <FindMentor
            setSelectMentor={setSelectMentor}
            domain={searchtext}
            entered={entered}
            setEntered={setEntered}
          />
        ) : (
          <AskOption
            domain={searchtext}
            entered={entered}
            setEntered={setEntered}
            setSelectMentor={setSelectMentor}
          />
        )
      ) : null}
    </div>
  );
}

export default HomeSection;
