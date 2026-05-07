import React, { useState, useEffect, useRef, lazy, Suspense } from "react";
import styled, { ThemeProvider } from "styled-components";
import { GlobalStyle } from "./style";
import { theme, darkTheme } from "./theme/theme";
import { Navbar } from "./components/Navbar";
import Hero from "./components/Hero";
import BackToTop from "./components/BackToTop";
import LoadingSpinner from "./components/LoadingSpinner";
import ImageName from "./img/mig1.jpg";
import { motion, AnimatePresence } from "framer-motion";
import {
  SiReact,
  SiTypescript,
  SiNextdotjs,
  SiSharp,
  SiCplusplus,
  SiDocker,
  SiKubernetes,
  SiProgress
} from 'react-icons/si';

// Lazy load heavy components for better initial load performance
const Projects = lazy(() => import("./components/Projects"));
const SkillLogos = lazy(() => import("./components/SkillLogos"));
const Services = lazy(() => import("./components/Services"));
const About = lazy(() => import("./components/About"));

const skills = [
  {
    name: "React",
    icon: SiReact,
    color: "rgb(97, 218, 251)",
    category: "Frontend",
    description: "6 months of experience with React building modern UIs with hooks, context API, and component-based architecture.",
    tags: ["Hooks", "Components", "Context API", "React Router"]
  },
  {
    name: "TypeScript",
    icon: SiTypescript,
    color: "rgb(49, 120, 198)",
    category: "Languages",
    description: "6 months working with TypeScript focusing on type safety and interfaces for more maintainable code.",
    tags: ["Type Safety", "Interfaces", "Typed React", "Configuration"]
  },
  {
    name: "Next.js",
    icon: SiNextdotjs,
    color: "rgb(0, 0, 0)",
    category: "Frontend",
    description: "6 months experience with Next.js building server-side rendered and static React applications.",
    tags: ["SSR", "Static Generation", "API Routes", "File-based Routing"]
  },
  {
    name: "Progress 4GL",
    icon: SiProgress,
    color: "rgb(86, 61, 124)",
    category: "Backend",
    description: "1.5 years of experience with Progress 4GL building business applications with optimized database operations.",
    tags: ["Database Integration", "Business Logic", "Legacy Systems"]
  },
  {
    name: "C#",
    icon: SiSharp,
    color: "rgb(104, 33, 122)",
    category: "Backend",
    description: "Experience in C# development with ASP.NET Core and Entity Framework for backend services.",
    tags: [".NET Core", "Entity Framework", "LINQ", "Web API"]
  },
  {
    name: "C++",
    icon: SiCplusplus,
    color: "rgb(0, 89, 156)",
    category: "Languages",
    description: "Foundation in C++ programming with experience in performance-critical applications.",
    tags: ["STL", "Memory Management", "Object-Oriented Programming"]
  },
  {
    name: "Docker",
    icon: SiDocker,
    color: "rgb(13, 136, 209)",
    category: "DevOps",
    description: "Experience with Docker for containerization and development environment standardization.",
    tags: ["Containerization", "Docker Compose", "Multi-stage Builds"]
  },
  {
    name: "Kubernetes",
    icon: SiKubernetes,
    color: "rgb(50, 109, 230)",
    category: "DevOps",
    description: "Knowledge of Kubernetes for container orchestration and deployment of applications.",
    tags: ["Container Orchestration", "Helm Charts", "Deployment Strategies"]
  },
];

const MainContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.background.default};
  color: ${({ theme }) => theme.colors.text.primary};
  min-height: 100vh;
  transition: background-color ${({ theme }) => theme.transitions.base}, color ${({ theme }) => theme.transitions.base};
  overflow-x: hidden;
`;

const MainContent = styled(motion.main)`
  margin-top: 0;
  background-color: ${({ theme }) => theme.colors.background.default};
  transition: background-color ${({ theme }) => theme.transitions.base};
`;

const HeroSection = styled.div`
  min-height: calc(100vh - 60px);

  @media (max-width: 1024px) {
    min-height: auto;
  }
`;

const Footer = styled(motion.footer)`
  padding: ${({ theme }) => theme.spacing[8]} ${({ theme }) => theme.spacing[10]};
  color: ${({ theme }) => theme.colors.text.primary};
  background-color: ${({ theme }) => theme.colors.background.default};
  text-align: center;
  transition: background-color ${({ theme }) => theme.transitions.base}, color ${({ theme }) => theme.transitions.base};
  border-top: 1px solid ${({ theme }) => theme.colors.border.light};
`;

const SkillsSection = styled.section`
  padding: 5rem 10%;
  background: ${({ theme }) => theme.colors.background.paper};
  transition: background-color ${({ theme }) => theme.transitions.slow};

  h2 {
    color: ${({ theme }) => theme.colors.text.primary};
  }
`;

const FooterText = styled.p`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: 16px;
`;

const FooterLink = styled.a`
  color: ${({ theme }) => theme.colors.text.secondary};
  text-decoration: none;
  font-size: 0.85rem;

  &:hover {
    color: ${({ theme }) => theme.colors.primary[500]};
  }
`;

export default function Portfolio() {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const initializedRef = useRef(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedTheme = localStorage.getItem("darkMode");
      if (storedTheme) {
        setDarkMode(storedTheme === "true");
      } else {
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        setDarkMode(prefersDark);
      }
      initializedRef.current = true;
    }
  }, []);

  useEffect(() => {
    if (!initializedRef.current) return;
    localStorage.setItem("darkMode", darkMode.toString());
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : theme}>
      <GlobalStyle />
      <AnimatePresence mode="wait">
        <MainContainer>
          <a href="#main-content" className="skip-to-content">
            Skip to main content
          </a>
          <header>
            <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
          </header>

          <MainContent
            id="main-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <section id="home">
              <HeroSection>
                <Hero darkMode={darkMode} imageSrc={ImageName} />
              </HeroSection>
            </section>

            <Suspense fallback={<LoadingSpinner />}>
              <Services darkMode={darkMode} />
            </Suspense>

            <Suspense fallback={<LoadingSpinner />}>
              <About darkMode={darkMode} />
            </Suspense>

          <SkillsSection id="skills" aria-label="Technical Skills">
            <h2 style={{
              fontSize: "2.2rem",
              textAlign: "center",
              marginBottom: "3rem",
              position: "relative"
            }}>
              My Technical Skills
            </h2>
            <Suspense fallback={<LoadingSpinner />}>
              <SkillLogos
                skills={skills}
                darkMode={darkMode}
              />
            </Suspense>
          </SkillsSection>

          <section id="projects">
            <Suspense fallback={<LoadingSpinner />}>
              <Projects darkMode={darkMode} />
            </Suspense>
          </section>

        </MainContent>

        <Footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <div style={{ maxWidth: "600px", margin: "0 auto" }}>
            <p style={{ fontSize: "1.1rem", fontWeight: 600, marginBottom: "8px" }}>
              Christian Hoffmann Thomsen
            </p>
            <FooterText>
              Full Stack Developer specializing in React, TypeScript, and C#
            </FooterText>
            <div style={{ display: "flex", justifyContent: "center", gap: "20px", marginBottom: "16px" }}>
              <FooterLink href="https://github.com/hoffeloffe" target="_blank" rel="noopener noreferrer">GitHub</FooterLink>
              <FooterLink href="https://www.linkedin.com/in/christian-hoffmann-thomsen-8027ba207/" target="_blank" rel="noopener noreferrer">LinkedIn</FooterLink>
              <FooterLink href="mailto:christian.hoffmann.thomsen@gmail.com">Email</FooterLink>
            </div>
            <p style={{
              fontSize: "0.8rem",
            }}>
              © {new Date().getFullYear()} All rights reserved.
            </p>
          </div>
        </Footer>

        {/* Back to Top Button */}
        <BackToTop darkMode={darkMode} />
      </MainContainer>
    </AnimatePresence>
    </ThemeProvider>
  );
}
