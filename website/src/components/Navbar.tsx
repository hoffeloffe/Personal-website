import React, { useState } from "react";
import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";

// Define styles as a function to handle dark/light mode
const getStyles = (darkMode: boolean) => ({
  navbarContainer: {
    padding: "20px 40px",
    backgroundColor: darkMode ? "#1a1a1a" : "#ffffff",
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.5)",
    overflow: "visible",
  },
  navbarContent: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    margin: "0 auto",
  },
  logo: {
    color: darkMode ? "white" : "black", // Dark or light text
    fontSize: "24px",
    fontWeight: "700",
    transition: "opacity 0.3s ease", // Smooth hover effect
  },
  navLinks: {
    display: "flex",
    listStyle: "none",
    margin: 0,
    padding: 0,
  },
  navLinkItem: {
    margin: "0 12px",
  },
  navLink: {
    color: darkMode ? "white" : "black", // Dark or light text
    textDecoration: "none",
    display: "flex",
    alignItems: "center",
    transition: "opacity 0.3s ease, transform 0.3s ease", // Smooth hover effect
  },
  icon: {
    width: "20px",
    height: "20px",
    fill: darkMode ? "white" : "black", // Dark or light icons
    transition: "fill 0.3s ease, transform 0.3s ease", // Smooth hover effect
  },
  themeToggleButton: {
    width: "40px", // Fixed width
    height: "40px", // Fixed height
    padding: "8px",
    borderRadius: "50%",
    backgroundColor: darkMode ? "#374151" : "#e5e7eb",
    border: "none",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "background-color 0.3s ease, transform 0.2s ease", // Smooth hover effect
    ":hover": {
      backgroundColor: darkMode ? "#4b5563" : "#d1d5db", // Darker shade for hover
      transform: "scale(1.1)", // Slightly scale up on hover
    },
  },
});

interface NavbarProps {
  darkMode?: boolean;
  toggleDarkMode?: () => void; // Add toggleDarkMode prop
}

export const Navbar: React.FC<NavbarProps> = ({ darkMode = true, toggleDarkMode }) => {
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null);
  const styles = getStyles(darkMode);

  return (
    <div style={styles.navbarContainer}>
      <div style={styles.navbarContent}>
        {/* Left Side: Logo */}
        <h1 style={styles.logo}>HOFF3</h1>

        {/* Right Side: Icons and Dark Mode Toggle */}
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <ul style={styles.navLinks}>
            <li style={styles.navLinkItem}>
              <a
                href="https://github.com/hoffeloffe"
                target="_blank"
                rel="noopener noreferrer"
                style={styles.navLink}
                onMouseEnter={() => setHoveredIcon("github")}
                onMouseLeave={() => setHoveredIcon(null)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  style={{
                    ...styles.icon,
                    transform: hoveredIcon === "github" ? "scale(1.2)" : "scale(1)",
                  }}
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.089 2.91.833.091-.647.349-1.086.635-1.337-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.03-2.683-.103-.253-.447-1.27.098-2.646 0 0 .84-.269 2.75 1.025A9.548 9.548 0 0112 6.836c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.547 1.376.203 2.394.1 2.646.64.699 1.026 1.592 1.026 2.683 0 3.842-2.339 4.687-4.565 4.935.359.309.678.919.678 1.852 0 1.335-.012 2.415-.012 2.741 0 .267.18.577.688.48C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </li>
            <li style={styles.navLinkItem}>
              <a
                href="mailto:christian.hoffmann.thomsen@gmail.com"
                style={styles.navLink}
                onMouseEnter={() => setHoveredIcon("mail")}
                onMouseLeave={() => setHoveredIcon(null)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  style={{
                    ...styles.icon,
                    transform: hoveredIcon === "mail" ? "scale(1.2)" : "scale(1)",
                  }}
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </li>
            <li style={styles.navLinkItem}>
              <a
                href="https://www.linkedin.com/in/christian-hoffmann-thomsen-8027ba207/"
                target="_blank"
                rel="noopener noreferrer"
                style={styles.navLink}
                onMouseEnter={() => setHoveredIcon("linkedin")}
                onMouseLeave={() => setHoveredIcon(null)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  style={{
                    ...styles.icon,
                    transform: hoveredIcon === "linkedin" ? "scale(1.2)" : "scale(1)",
                  }}
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                  />
                </svg>
              </a>
            </li>
          </ul>
          <button
            onClick={toggleDarkMode}
            aria-label={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            style={styles.themeToggleButton}
          >
            <motion.div
              key={darkMode ? "moon" : "sun"}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
            >
              {darkMode ? (
                <Sun className="w-5 h-5 text-yellow-400" aria-hidden="true" style={{color: "white"}} />
              ) : (
                <Moon className="w-5 h-5 text-gray-800" aria-hidden="true" />
              )}
            </motion.div>
          </button>
        </div>
      </div>
    </div>
  );
};