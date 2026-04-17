import React, { useState, useEffect, lazy, Suspense } from "react";
import styled from "styled-components";
import { Navbar } from "./components/Navbar";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import SkillLogos from "./components/SkillLogos";
import Services from "./components/Services";
import About from "./components/About";
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

const roles = ["Full‑Stack Developer", "React Specialist", "C# Developer", "Problem Solver"];

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

Optimization & Scalability (performance tuning, cloud-native solutions)

I thrive on transforming complex challenges into efficient, scalable systems—whether designing transport modules, troubleshooting integrations, or crafting intuitive web interfaces. My approach blends analytical problem-solving with a passion for emerging tech, ensuring solutions are both innovative and practical.

Let’s connect and build something impactful.
`;
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
  // CI/CD skill removed as requested
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

  // Define styled components for responsive layout with improved transitions
  const MainContainer = styled.div<{ darkMode: boolean }>`
    background-color: ${props => props.darkMode ? "#1a1a1a" : "#ffffff"};
    min-height: 100vh;
    transition: background-color 0.5s ease, color 0.5s ease;
    overflow-x: hidden;
  `;

  const MainContent = styled(motion.main)<{ darkMode: boolean }>`
    margin-top: 0;
    background-color: ${props => props.darkMode ? "#1a1a1a" : "#ffffff"};
    transition: background-color 0.5s ease;
  `;

  const HeroSection = styled.div`
    min-height: calc(100vh - 60px);
    
    @media (max-width: 1024px) {
      min-height: auto;
    }
  `;

  const AboutSection = styled.div<{ darkMode: boolean }>`
    color: ${props => props.darkMode ? "#ffffff" : "#1a1a1a"};
    text-align: center;
    padding: 4rem 20%;
    
    @media (max-width: 768px) {
      padding: 3rem 5%;
    }
  `;

  const ExperienceSection = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    padding: 0 10%;
    margin-bottom: 4rem;
    
    @media (max-width: 768px) {
      grid-template-columns: 1fr;
      padding: 0 5%;
    }
  `;

  const Footer = styled(motion.footer)<{ darkMode: boolean }>`
    padding: 30px 40px;
    color: ${props => props.darkMode ? "#ffffff" : "#1a1a1a"};
    background-color: ${props => props.darkMode ? "#1a1a1a" : "#ffffff"};
    text-align: center;
    transition: background-color 0.5s ease, color 0.5s ease;
    border-top: 1px solid ${props => props.darkMode ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"};
  `;

  return (
    <AnimatePresence mode="wait">
      <MainContainer darkMode={darkMode}>
        <header>
          <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        </header>

        {/* Main Content */}
        <MainContent 
          darkMode={darkMode}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Modern Hero Section */}
          <section id="home">
            <HeroSection>
              <Hero darkMode={darkMode} imageSrc={ImageName} />
            </HeroSection>
          </section>
    
          {/* Services Section */}
          <Services darkMode={darkMode} />
          
          {/* About Section */}
          <About darkMode={darkMode} />
          
          {/* Modern Skills Section */}
          <section id="skills" aria-label="Technical Skills" style={{ 
            padding: "5rem 10%", 
            background: darkMode ? "#2a2a2a" : "#f8f8f8",
            transition: "background-color 0.5s ease"
          }}>
            <h2 style={{ 
              fontSize: "2.2rem",
              color: darkMode ? "#ffffff" : "#1a1a1a",
              textAlign: "center",
              marginBottom: "3rem",
              position: "relative"
            }}>
              My Technical Skills
            </h2>
            <SkillLogos
              skills={skills}
              darkMode={darkMode}
            />
          </section>

          {/* Projects Section */}
          <section id="projects">
            <Projects darkMode={darkMode} />
          </section>
        </MainContent>

        {/* Footer */}
        <Footer 
          darkMode={darkMode}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <div>
            <p>© {new Date().getFullYear()} Christian Hoffmann Thomsen. All rights reserved.</p>
            <p style={{ 
              marginTop: "10px", 
              fontSize: "0.9rem", 
              color: darkMode ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.6)" 
            }}>
              Full Stack Developer specializing in React, TypeScript, and C#
            </p>
          </div>
        </Footer>
      </MainContainer>
    </AnimatePresence>
  );
}