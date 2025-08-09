import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function SplitText({
  text,
  delay = 100,
  duration = 0.6,
  ease = "power3.out",
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  textAlign = "center",
  onLetterAnimationComplete,
}) {
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const chars = el.querySelectorAll(".char");

    gsap.set(chars, from);

    gsap.to(chars, {
      ...to,
      duration,
      ease,
      stagger: delay / 4000,
      onComplete: () => {
        if (onLetterAnimationComplete) onLetterAnimationComplete();
      },
    });
  }, [text]);

  return (
    <p
      ref={containerRef}
      style={{
        textAlign,
        display: "inline-block",
        overflow: "hidden",
        whiteSpace: "normal",
        fontSize: "3rem",
        fontWeight: "600",
        paddingBottom: "0.5rem",
      }}
    >
      {text.split("").map((char, i) => (
        <span
          key={i}
          className="char"
          style={{
            display: "inline-block",
            willChange: "transform, opacity",
          }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </p>
  );
}
