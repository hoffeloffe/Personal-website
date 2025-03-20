import React, { useState, useEffect } from "react";

interface TypewriterProps {
  texts: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseBeforeDelete?: number;
  pauseBeforeNext?: number;
  randomTypingVariation?: number;
  darkMode?: boolean;
  cursorStyle?: React.CSSProperties;
  textStyle?: React.CSSProperties;
}

export const TypewriterText: React.FC<TypewriterProps> = ({
  texts,
  typingSpeed = 100,
  deletingSpeed = 50,
  pauseBeforeDelete = 1500,
  pauseBeforeNext = 1000,
  randomTypingVariation = 50,
  darkMode = true,
  cursorStyle = {},
  textStyle = {},
}) => {
  const [index, setIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    if (!texts.length) return;
    const text = texts[index];

    const getRandomSpeed = (baseSpeed: number) =>
      baseSpeed + Math.random() * randomTypingVariation;

    const timeout = setTimeout(() => {
      if (!isDeleting && charIndex < text.length) {
        setDisplayText(text.slice(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      } else if (isDeleting && charIndex > 0) {
        setDisplayText(text.slice(0, charIndex - 1));
        setCharIndex(charIndex - 1);
      } else {
        setTimeout(() => {
          setIsDeleting(!isDeleting);
          if (isDeleting) {
            setIndex((prevIndex) => (prevIndex + 1) % texts.length);
            setCharIndex(0);
          }
        }, isDeleting ? pauseBeforeNext : pauseBeforeDelete);
      }
    }, getRandomSpeed(isDeleting ? deletingSpeed : typingSpeed));

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, index, texts, typingSpeed, deletingSpeed, pauseBeforeDelete, pauseBeforeNext, randomTypingVariation]);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);
    return () => clearInterval(cursorInterval);
  }, []);

  // Dynamic styles
  const containerStyle: React.CSSProperties = {
    fontSize: "50px",
    fontWeight: "700",
    color: darkMode ? "white" : "black",
    margin: "0", // Remove default margin
    ...textStyle,
  };

  const cursorStyleFinal: React.CSSProperties = {
    opacity: showCursor ? 1 : 0,
    transition: "opacity 0.2s ease",
    ...cursorStyle,
  };

  return (
    <h1 style={containerStyle}>
      {displayText}
      <span style={cursorStyleFinal}>|</span>
    </h1>
  );
};