import React, { useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faGithub, 
  faLinkedin 
} from '@fortawesome/free-brands-svg-icons';
import { 
  faEnvelope,
  faSun,
  faMoon,
  faBars,
  faXmark
} from '@fortawesome/free-solid-svg-icons';

/* ── Styled components ── */

const NavContainer = styled.nav<{ darkMode: boolean }>`
  padding: ${({ theme }) => theme.spacing[3]} ${({ theme }) => theme.spacing[10]};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  position: sticky;
  top: 0;
  z-index: 1000;
  backdrop-filter: blur(12px);
  background-color: ${({ theme, darkMode }) => darkMode ? "rgba(15,23,42,0.95)" : "rgba(255,255,255,0.95)"};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.light};
  transition: all ${({ theme }) => theme.transitions.base};

  @media (max-width: 768px) {
    padding: ${({ theme }) => theme.spacing[3]} ${({ theme }) => theme.spacing[5]};
  }
`;

const NavContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  position: relative;
`;

const DesktopNav = styled.ul`
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  align-items: center;
  gap: 30px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);

  @media (max-width: 768px) {
    display: none;
  }
`;

const DesktopRight = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;

  @media (max-width: 768px) {
    display: none;
  }
`;

const MobileOnly = styled.div`
  display: none;
  align-items: center;
  gap: 12px;

  @media (max-width: 768px) {
    display: flex;
  }
`;

const HamburgerButton = styled(motion.button)<{ darkMode: boolean }>`
  display: none;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background-color: ${p => p.darkMode ? "#374151" : "#e5e7eb"};
  border: none;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  color: ${p => p.darkMode ? "#fff" : "#1a1a1a"};
  font-size: 20px;

  @media (max-width: 768px) {
    display: flex;
  }
`;

const MobileOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.5);
  z-index: 1001;
`;

const MobileDrawer = styled(motion.div)<{ darkMode: boolean }>`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 280px;
  background: ${p => p.darkMode ? "#1a1a1a" : "#ffffff"};
  z-index: 1002;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  box-shadow: -4px 0 20px rgba(0,0,0,0.15);
`;

const MobileCloseButton = styled(motion.button)<{ darkMode: boolean }>`
  align-self: flex-end;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${p => p.darkMode ? "#374151" : "#e5e7eb"};
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${p => p.darkMode ? "#fff" : "#1a1a1a"};
  font-size: 18px;
  margin-bottom: 16px;
`;

const MobileNavLink = styled(motion.a)<{ darkMode: boolean }>`
  display: block;
  padding: 14px 16px;
  border-radius: 8px;
  color: ${p => p.darkMode ? "#fff" : "#1a1a1a"};
  text-decoration: none;
  font-size: 18px;
  font-weight: 500;
  transition: background 0.2s ease;

  &:hover {
    background: ${p => p.darkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)"};
  }
`;

const MobileDivider = styled.hr<{ darkMode: boolean }>`
  border: none;
  border-top: 1px solid ${p => p.darkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)"};
  margin: 12px 0;
`;

const MobileSocialRow = styled.div`
  display: flex;
  gap: 16px;
  padding: 8px 16px;
`;

const SocialIconLink = styled(motion.a)<{ darkMode: boolean }>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${p => p.darkMode ? "#fff" : "#1a1a1a"};
  text-decoration: none;
  transition: all 0.2s ease;

  &:hover {
    background: ${p => p.darkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)"};
  }
`;

/* ── Component ── */

interface NavbarProps {
  darkMode?: boolean;
  toggleDarkMode?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ darkMode = true, toggleDarkMode }) => {
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "Services", href: "#services" },
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" }
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

  const closeMobile = () => setMobileOpen(false);

  return (
    <>
      <NavContainer aria-label="Main navigation" darkMode={darkMode}>
        <NavContent>
          {/* Logo */}
          <motion.a
            href="#home"
            style={{
              color: darkMode ? "white" : "black",
              fontSize: "24px",
              fontWeight: 700,
              textDecoration: "none"
            }}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            aria-label="HOFF3 - Back to top"
          >
            HOFF3
          </motion.a>

          {/* Desktop center nav */}
          <DesktopNav role="list">
            {navItems.map((item) => (
              <li key={item.name} style={{ display: "flex", alignItems: "center" }}>
                <motion.a
                  href={item.href}
                  style={{
                    color: darkMode ? "white" : "black",
                    textDecoration: "none",
                    padding: "8px 16px",
                    borderRadius: "8px",
                    fontSize: "16px",
                    fontWeight: 500
                  }}
                  whileHover={{
                    scale: 1.02,
                    backgroundColor: darkMode ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.04)"
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                >
                  {item.name}
                </motion.a>
              </li>
            ))}
          </DesktopNav>

          {/* Desktop right: socials + theme toggle */}
          <DesktopRight>
            <ul style={{ display: "flex", listStyle: "none", margin: 0, padding: 0, gap: "20px", alignItems: "center" }}>
              {socialLinks.map((link) => (
                <li key={link.name}>
                  <motion.a
                    href={link.url}
                    style={{
                      color: hoveredIcon === link.name ? link.color : (darkMode ? "white" : "black"),
                      textDecoration: "none",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "36px",
                      height: "36px",
                      borderRadius: "50%"
                    }}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.name}
                    onMouseEnter={() => setHoveredIcon(link.name)}
                    onMouseLeave={() => setHoveredIcon(null)}
                    whileHover={{ scale: 1.1, y: -2 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  >
                    <FontAwesomeIcon
                      icon={link.icon}
                      style={{
                        fontSize: "22px",
                        color: hoveredIcon === link.name ? link.color : (darkMode ? "white" : "black"),
                        transition: "all 0.3s ease",
                        transform: hoveredIcon === link.name ? "rotate(5deg)" : "rotate(0deg)"
                      }}
                    />
                  </motion.a>
                </li>
              ))}
            </ul>

            <motion.button
              onClick={toggleDarkMode}
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "50%",
                backgroundColor: darkMode ? "#374151" : "#e5e7eb",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              <FontAwesomeIcon
                icon={darkMode ? faSun : faMoon}
                style={{ fontSize: "22px", color: darkMode ? "#FBBF24" : "#374151" }}
              />
            </motion.button>
          </DesktopRight>

          {/* Mobile: hamburger */}
          <MobileOnly>
            <HamburgerButton
              darkMode={darkMode}
              onClick={() => setMobileOpen(true)}
              whileTap={{ scale: 0.9 }}
              aria-label="Open menu"
            >
              <FontAwesomeIcon icon={faBars} />
            </HamburgerButton>
          </MobileOnly>
        </NavContent>
      </NavContainer>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <MobileOverlay
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={closeMobile}
            />
            <MobileDrawer
              darkMode={darkMode}
              initial={{ x: 280 }}
              animate={{ x: 0 }}
              exit={{ x: 280 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <MobileCloseButton
                darkMode={darkMode}
                onClick={closeMobile}
                whileTap={{ scale: 0.9 }}
                aria-label="Close menu"
              >
                <FontAwesomeIcon icon={faXmark} />
              </MobileCloseButton>

              {navItems.map((item, i) => (
                <MobileNavLink
                  key={item.name}
                  href={item.href}
                  darkMode={darkMode}
                  onClick={closeMobile}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  {item.name}
                </MobileNavLink>
              ))}

              <MobileDivider darkMode={darkMode} />

              <MobileSocialRow>
                {socialLinks.map((link) => (
                  <SocialIconLink
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    darkMode={darkMode}
                    aria-label={link.name}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FontAwesomeIcon icon={link.icon} style={{ fontSize: "20px" }} />
                  </SocialIconLink>
                ))}
              </MobileSocialRow>

              <MobileDivider darkMode={darkMode} />

              <div style={{ padding: "8px 16px", display: "flex", alignItems: "center", gap: "12px" }}>
                <motion.button
                  onClick={() => { toggleDarkMode?.(); }}
                  style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "50%",
                    backgroundColor: darkMode ? "#374151" : "#e5e7eb",
                    border: "none",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
                >
                  <FontAwesomeIcon
                    icon={darkMode ? faSun : faMoon}
                    style={{ fontSize: "20px", color: darkMode ? "#FBBF24" : "#374151" }}
                  />
                </motion.button>
                <span style={{ color: darkMode ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.6)", fontSize: "14px" }}>
                  {darkMode ? "Light mode" : "Dark mode"}
                </span>
              </div>
            </MobileDrawer>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
