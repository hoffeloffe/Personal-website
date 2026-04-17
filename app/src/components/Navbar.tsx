import React, { useState } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faGithub, 
  faLinkedin 
} from '@fortawesome/free-brands-svg-icons';
import { 
  faEnvelope,
  faSun,
  faMoon 
} from '@fortawesome/free-solid-svg-icons';

// Define styles as a function to handle dark/light mode
const getStyles = (darkMode: boolean) => ({
  navbarContainer: {
    padding: "12px 40px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
    overflow: "visible",
    position: "sticky" as const,
    top: 0,
    zIndex: 1000,
    backdropFilter: "blur(8px)",
    backgroundColor: darkMode ? "rgba(26, 26, 26, 0.95)" : "rgba(255, 255, 255, 0.95)",
    borderBottom: `1px solid ${darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'}`,
  },
  navbarContent: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    margin: "0 auto",
  },
  logo: {
    color: darkMode ? "white" : "black",
    fontSize: "24px",
    fontWeight: "700",
    transition: "all 0.3s ease",
    ":hover": {
      opacity: 0.8,
      transform: "translateY(-2px)"
    }
  },
  navLinks: {
    display: "flex",
    listStyle: "none",
    margin: 0,
    padding: 0,
    alignItems: "center",
    gap: "20px"
  },
  navLinkItem: {
    display: "flex",
    alignItems: "center",
  },
  navLink: {
    color: darkMode ? "white" : "black",
    textDecoration: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    transition: "all 0.3s ease",
    ":hover": {
      backgroundColor: darkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.05)",
      transform: "scale(1.1) translateY(-2px)"
    }
  },
  icon: {
    fontSize: "22px",
    transition: "all 0.3s ease",
  },
  themeToggleButton: {
    width: "44px",
    height: "44px",
    borderRadius: "50%",
    backgroundColor: darkMode ? "#374151" : "#e5e7eb",
    border: "none",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.3s ease",
    ":hover": {
      backgroundColor: darkMode ? "#4b5563" : "#d1d5db",
      transform: "scale(1.1)",
      boxShadow: darkMode ? "0 0 10px rgba(255, 255, 255, 0.2)" : "0 0 10px rgba(0, 0, 0, 0.1)"
    },
  },
});

interface NavbarProps {
  darkMode?: boolean;
  toggleDarkMode?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ darkMode = true, toggleDarkMode }) => {
  const navItems = [
    { name: "Home", href: "#home" },
    { name: "Services", href: "#services" },
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" }
  ];

  const socialLinks = [
    {
      name: "GitHub",
      url: "https://github.com/hoffeloffe",
      icon: faGithub,
      color: darkMode ? "#ffffff" : "#181717"
    },
    {
      name: "Email",
      url: "mailto:christian.hoffmann.thomsen@gmail.com",
      icon: faEnvelope,
      color: darkMode ? "#ffffff" : "#D44638"
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/christian-hoffmann-thomsen-8027ba207/",
      icon: faLinkedin,
      color: darkMode ? "#ffffff" : "#0077B5"
    }
  ];

  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null);
  const styles = getStyles(darkMode);

  return (
    <nav aria-label="Main navigation" style={styles.navbarContainer}>
      <div style={styles.navbarContent}>
        {/* Left Side: Logo with hover effect */}
        <motion.a 
          href="#home"
          style={styles.logo}
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
          aria-label="HOFF3 - Back to top"
        >
          HOFF3
        </motion.a>

        {/* Center: Navigation Links */}
        <ul role="list" style={{ 
          ...styles.navLinks, 
          gap: "30px",
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)"
        }}>
          {navItems.map((item) => (
            <li key={item.name} style={styles.navLinkItem}>
              <motion.a
                href={item.href}
                style={{
                  ...styles.navLink,
                  width: "auto",
                  height: "auto",
                  padding: "8px 16px",
                  borderRadius: "8px",
                  fontSize: "16px",
                  fontWeight: "500"
                }}
                whileHover={{ 
                  scale: 1.05,
                  backgroundColor: darkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.05)"
                }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                {item.name}
              </motion.a>
            </li>
          ))}
        </ul>

        {/* Right Side: Social Icons and Dark Mode Toggle */}
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <ul style={styles.navLinks}>
            {socialLinks.map((link) => (
              <li key={link.name} style={styles.navLinkItem}>
                <motion.a
                  href={link.url}
                  style={{
                    ...styles.navLink,
                    color: hoveredIcon === link.name ? link.color : styles.navLink.color
                  }}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.name}
                  onMouseEnter={() => setHoveredIcon(link.name)}
                  onMouseLeave={() => setHoveredIcon(null)}
                  whileHover={{ 
                    scale: 1.15,
                    y: -3
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <FontAwesomeIcon 
                    icon={link.icon} 
                    style={{ 
                      ...styles.icon,
                      color: hoveredIcon === link.name ? link.color : styles.navLink.color,
                      transform: hoveredIcon === link.name ? "rotate(5deg)" : "rotate(0deg)"
                    }} 
                  />
                </motion.a>
              </li>
            ))}
          </ul>
          
          <motion.button
            onClick={toggleDarkMode}
            style={styles.themeToggleButton}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            <motion.div
              key={darkMode ? "moon" : "sun"}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              style={{ 
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <FontAwesomeIcon 
                icon={darkMode ? faSun : faMoon} 
                style={{ 
                  fontSize: "22px",
                  color: darkMode ? "#FBBF24" : "#374151",
                  transition: "all 0.3s ease",
                }} 
              />
            </motion.div>
          </motion.button>
        </div>
      </div>
    </nav>
  );
};