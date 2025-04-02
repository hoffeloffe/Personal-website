import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Navbar } from "./components/Navbar";
import { TypewriterText } from "./components/functions/TypewriterProps";
import { CodeInput } from "./components/CodeInputProps";
import { ProgressBar } from "./components/SkillsProgress";
import ImageName from "./img/mig1.jpg";

const roles = ["Web Developer", "Creative Thinker", "Tech Enthusiast", "Problem Solver"];

const codeMe = `const name: string = 'Christian';
const age: number = 25;
const isDeveloper: boolean = true;
const skills: string[] = ['React', 'TypeScript', 'Node.js'];

const greet = (name: string) => {
  return \`Hello, there! Welcome to my portfolio!\`;
};

console.log(greet(name));`;

const bio = `I'm a passionate web developer dedicated to crafting clean, efficient, and user-friendly digital experiences. From dynamic websites to solving complex technical challenges, I love transforming ideas into functional, elegant solutions. Let’s collaborate and build something incredible together!`;

const experience = `
With a computer science degree from Dania and hands-on experience as an Application Developer and Frontend Developer at PICIT, I’ve built expertise in:

Full-Stack Development (TypeScript, C#, C++, Progress 4GL)

System Integration (RESTful APIs, Docker, Kubernetes)

Optimization & Scalability (perfo rmance tuning, cloud-native solutions)

I thrive on transforming complex challenges into efficient, scalable systems—whether designing transport modules, troubleshooting integrations, or crafting intuitive web interfaces. My approach blends analytical problem-solving with a passion for emerging tech, ensuring solutions are both innovative and practical.

Let’s connect and build something impactful.
`;
const skills = [
  { name: "React",  percentage: 50, color: "rgb(0, 119, 181)" },
  { name: "Typescript",  percentage: 80, color: "rgb(0, 119, 181)" },
  { name: "Progress 4GL",  percentage: 100, color: "rgb(0, 119, 181)" },
  { name: "C#",  percentage: 76, color: "rgb(0, 119, 181)" },
  { name: "C++",  percentage: 50, color: "rgb(0, 119, 181)" },
  { name: "Docker",  percentage: 56, color: "rgb(0, 119, 181)" },
  { name: "Kubernetes",  percentage: 65, color: "rgb(0, 119, 181)" }
];

// Main Portfolio Component
export default function Portfolio() {
  const [code, setCode] = useState(codeMe);
  const [darkMode, setDarkMode] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedTheme = localStorage.getItem("darkMode");
      if (storedTheme) {
        setDarkMode(storedTheme === "true");
      } else {
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        setDarkMode(prefersDark);
      }
    }
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("darkMode", darkMode.toString());
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  return (
    <div style={{ backgroundColor: darkMode ? "#1a1a1a" : "#ffffff", minHeight: "100vh" }}>
      <header>
        <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      </header>

      {/* Main Content */}
<main style={{ marginTop: "26px", backgroundColor: darkMode ? "#1a1a1a" : "#ffffff" }}>
  {/* Hero Section - Two Columns */}
  <div style={{ 
    display: "grid",
    gridTemplateColumns: "1fr 1fr", // Two equal columns
    gap: "2rem",
    padding: "0 10%",
    alignItems: "center"
  }}>
    {/* Left Column */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.5 }}
    >
      <div style={{ color: darkMode ? "#ffffff" : "#1a1a1a" }}>
        <TypewriterText
          texts={roles}
          typingSpeed={100}
          deletingSpeed={50}
          pauseBeforeDelete={1500}
          pauseBeforeNext={1000}
          darkMode={darkMode}
        />
      </div>
      <div style={{ color: darkMode ? "#ffffff" : "#1a1a1a", marginTop: "2rem" }}>
        <CodeInput fileName="me.tsx" value={code} onChange={setCode} />
        <h2>Preview:</h2>
        <code className="text-gray-700 dark:text-gray-300">
          {"Hello, there! Welcome to my portfolio!"}
        </code>
      </div>
    </motion.div>

    {/* Right Column - Image */}
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <img 
        src={ImageName} 
        alt="Christian" 
        style={{
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          objectFit: "cover",
          border: `4px solid ${darkMode ? "#rgb(30, 30, 30)" : "#rgb(30, 30, 30)"}`,
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)"
        }}
      />
    </motion.div>
  </div>
  
  {/* About Section - Full Width */}
  <div style={{ 
    color: darkMode ? "#ffffff" : "#1a1a1a",
    textAlign: "center",
    padding: "4rem 20%"
  }}>
    <h1 style={{ 
      color: darkMode ? "#ffffff" : "#1a1a1a", 
      letterSpacing: "2px",
      marginBottom: "1.5rem"
    }}>About Me</h1>
    <p>{bio}</p>
  </div>

  {/* Experience & Skills Section - Two Columns */}
  <div style={{ 
    display: "grid",
    gridTemplateColumns: "1fr 1fr", // Two equal columns
    gap: "2rem",
    padding: "0 10%",
    marginBottom: "4rem"
  }}>
    {/* Left Column - Experience */}
    <section>
      <h2 style={{ 
        color: darkMode ? "#ffffff" : "#1a1a1a", 
        letterSpacing: "2px",
        marginBottom: "1.5rem"
      }}>
        Why My Experience Matters
      </h2>
      <p style={{ 
        color: darkMode ? "#ffffff" : "#1a1a1a", 
      }}>{experience}</p>
    </section>
    
    {/* Right Column - Skills */}
    <section>
      <ProgressBar 
        skills={skills} 
        darkMode={darkMode}
      />
    </section>
  </div>
</main>

      {/* Footer */}
      <footer style={{
        padding: "20px 40px",
        bottom: "0",
        left: "0",
        right: "0",
        color: darkMode ? "#ffffff" : "#1a1a1a",
        backgroundColor: darkMode ? "#1a1a1a" : "#ffffff",
        textAlign: "center"
      }}>
        {new Date().getFullYear()} HOFF3. All rights reserved.
      </footer>
    </div>
  );
}