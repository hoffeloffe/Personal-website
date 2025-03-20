import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Navbar } from "./components/Navbar";
import { TypewriterText } from "./components/functions/TypewriterProps";
import { CodeInput } from "./components/CodeInputProps";

const roles = ["Web Developer", "Creative Thinker", "Tech Enthusiast", "Problem Solver"];

const codeMe = `const name: string = 'Christian';
const age: number = 25;
const isDeveloper: boolean = true;
const skills: string[] = ['React', 'TypeScript', 'Node.js'];

const greet = (name: string) => {
  return \`Hello, \${name}! Welcome to my portfolio!\`;
};

console.log(greet(name));`;

export default function Portfolio() {
  const [code, setCode] = useState(codeMe);
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("darkMode") === "true";
    }
    return false;
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("darkMode", darkMode.toString());
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div style={{ backgroundColor: darkMode ? "#1a1a1a" : "#ffffff", minHeight: "100vh" }}>
      <header style={{ overflow: "visible" }}>
        <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      </header>

      {/* Main Content */}
      <main style={{ marginTop: "26px", backgroundColor: darkMode ? "#1a1a1a" : "#ffffff" }}>
        <div style={{ columnCount: "2" }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            style={{ backgroundColor: darkMode ? "#1a1a1a" : "#ffffff" }}
          >
            <section className="max-w-7xl mx-auto px-6 lg:px-12 py-20" style={{ backgroundColor: darkMode ? "#1a1a1a" : "#ffffff" }}>
              {/* Two-column layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                {/* Left Column: TypewriterText and Description */}
                <div>
                  <div className="text-2xl md:text-3xl text-gray-700 dark:text-gray-300 mb-8">
                    <TypewriterText
                      texts={roles}
                      typingSpeed={100}
                      deletingSpeed={50}
                      pauseBeforeDelete={1500}
                      pauseBeforeNext={1000}
                      darkMode={darkMode}
                    />
                  </div>
                  <p style={{ color: darkMode ? "#ffffff" : "#1a1a1a" }}>
                    My name is Christian and I'm a passionate web developer with a love for creating clean, efficient, and user-friendly applications.
                    Whether it's building dynamic websites or solving complex problems, I thrive on turning ideas into reality.
                    Let's build something amazing together!
                  </p>
                </div>
              </div>
            </section>
            <section className="max-w-7xl mx-auto px-6 lg:px-12 py-20" style={{ backgroundColor: darkMode ? "#1a1a1a" : "#ffffff" }}>
              <div style={{ color: darkMode ? "#ffffff" : "#1a1a1a" }}>
                <CodeInput fileName="me.tsx" value={code} onChange={setCode} />
                <h2 className="mt-4 text-lg font-semibold text-gray-700 dark:text-gray-300">Preview:</h2>
                <pre className="mt-2 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
                  <code className="text-gray-700 dark:text-gray-300">{"Hello, Christian! Welcome to my portfolio!"}</code>
                </pre>
              </div>
            </section>
          </motion.div>
        </div>
      </main>

      <footer style={{
        padding: "20px 40px",
        position: "fixed",
        bottom: "0",
        left: "0",
        right: "0",
        color: darkMode ? "#ffffff" : "#1a1a1a",
        backgroundColor: darkMode ? "#1a1a1a" : "#ffffff",
        textAlign: "center"
      }}>
        {new Date().getFullYear()} Hoff3. All rights reserved.
      </footer>
    </div>
  );
}