import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { TypewriterText } from "./functions/TypewriterProps";
import { CodeInput } from "./CodeInputProps";
import { Download } from 'lucide-react';

// Styled components for a modern, professional hero section
const HeroContainer = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10rem;
  padding: 0rem 10% 4rem;
  align-items: center;
  position: relative;
  min-height: 100vh;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    text-align: center;
    padding: 5rem 5% 3rem;
  }
`;

const HeroContent = styled(motion.div)`
  z-index: 2;
`;

const JobTitle = styled.div<{ darkMode: boolean }>`
  font-size: 1.2rem;
  font-weight: 500;
  color: ${props => props.darkMode ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.8)'};
  display: flex;
  align-items: center;
  min-height: 1.5rem;
  
  @media (max-width: 768px) {
    justify-content: center;
  }
  
  &:before {
    content: '';
    display: inline-block;
    width: 50px;
    height: 2px;
    background-color: rgb(0, 119, 181);
    margin-right: 15px;
    
    @media (max-width: 768px) {
      margin-right: 10px;
    }
  }
`;

const Name = styled.h1<{ darkMode: boolean }>`
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: ${props => props.darkMode ? '#ffffff' : '#1a1a1a'};
  line-height: 1.1;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
  
  span {
    color: rgb(0, 119, 181);
  }
`;

const HeroBio = styled.p<{ darkMode: boolean }>`
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 2rem;
  color: ${props => props.darkMode ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)'};
  max-width: 600px;
  
  @media (max-width: 768px) {
    margin-left: auto;
    margin-right: auto;
  }
`;

const HeroButtons = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  
  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const PrimaryButton = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background: rgb(0, 119, 181);
  color: white;
  padding: 0.8rem 2rem;
  border-radius: 4px;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  border: none;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const SecondaryButton = styled(motion.a)<{ darkMode: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: transparent;
  color: ${props => props.darkMode ? '#ffffff' : '#1a1a1a'};
  padding: 0.8rem 2rem;
  border-radius: 4px;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  border: 1px solid ${props => props.darkMode ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)'};
  transition: all 0.3s ease;
  
  &:hover {
    border-color: rgb(0, 119, 181);
    color: rgb(0, 119, 181);
    transform: translateY(-3px);
    box-shadow: 0 4px 8px rgba(0, 119, 181, 0.1);
  }

  svg {
    width: 18px;
    height: 18px;
  }
`;

const ImageContainer = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 1;
  
  &:before {
    content: '';
    position: absolute;
    width: 300px;
    height: 300px;
    border-radius: 50%;
    background: linear-gradient(135deg, rgba(0,119,181,0.2) 0%, rgba(0,0,0,0) 60%);
    z-index: 0;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

const ProfileImage = styled.img`
  width: 300px;
  height: 300px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid rgb(30, 30, 30);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  z-index: 2;
  pointer-events: none;
`;

const CodeContainer = styled(motion.div)<{ darkMode: boolean }>`
  margin-top: 2.5rem;
  background: ${props => props.darkMode ? '#2a2a2a' : '#f8f8f8'};
  border-radius: 8px;
  padding: 1rem;
  border: 1px solid ${props => props.darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'};
`;

const FloatingShapes = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
  pointer-events: none;
`;

const Shape = styled.div<{ color: string; size: number; top: number; left: number; rotateSpeed: number; opacity: number }>`
  position: absolute;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  background: ${props => props.color};
  opacity: ${props => props.opacity};
  top: ${props => props.top}%;
  left: ${props => props.left}%;
  border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
  animation: rotate ${props => props.rotateSpeed}s linear infinite;
  pointer-events: none;
  will-change: transform;
  transform-origin: center;
  
  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

interface HeroProps {
  darkMode: boolean;
  imageSrc: string;
}

const Hero: React.FC<HeroProps> = ({ darkMode, imageSrc }) => {
  const roles = ["Web Developer", "Creative Thinker", "Tech Enthusiast", "Problem Solver"];
  
  const codeMe = `const name: string = 'Christian Hoffmann Thomsen';
const nickname: string = 'Hoffe';
const age: number = 25;
const isDeveloper: boolean = true;
const skills: string[] = ['React', 'TypeScript', 'Node.js'];

const greet = (name: string) => {
  return \`Hello, I'm a full-stack developer ready to help with your project!\`;
};

console.log(greet(nickname)); // Using nickname`;
  
  const [code, setCode] = useState(codeMe);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.3 });
  
  // Enhanced animated shapes with more variety
  const shapes = [
    { color: 'rgb(0, 119, 181)', size: 80, top: 10, left: 5, rotateSpeed: 30, opacity: 0.7 },
    { color: 'rgb(0, 119, 181)', size: 60, top: 70, left: 80, rotateSpeed: 25, opacity: 0.5 },
    { color: 'rgb(0, 119, 181)', size: 100, top: 40, left: 90, rotateSpeed: 40, opacity: 0.3 },
    { color: 'rgb(0, 119, 181)', size: 40, top: 20, left: 30, rotateSpeed: 35, opacity: 0.6 },
  ];
  
  // Animation variants for better orchestration
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.2,
        delayChildren: 0.3,
        duration: 0.8 
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
  };
  


  return (
    <>
      <FloatingShapes>
        {shapes.map((shape, index) => (
          <Shape 
            key={index}
            color={shape.color}
            size={shape.size}
            top={shape.top}
            left={shape.left}
            rotateSpeed={shape.rotateSpeed}
            opacity={shape.opacity}
          />
        ))}
      </FloatingShapes>
      
      <HeroContainer ref={containerRef}>
        <HeroContent
          style={{ minWidth: 750 }}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <JobTitle darkMode={darkMode}>
            <TypewriterText
              texts={roles}
              typingSpeed={100}
              deletingSpeed={50}
              pauseBeforeDelete={1500}
              pauseBeforeNext={1000}
              darkMode={darkMode}
            />
          </JobTitle>
          
          <motion.h1 
            style={{
              fontSize: "3.5rem",
              fontWeight: "700",
              color: darkMode ? "#ffffff" : "#1a1a1a",
              lineHeight: "1.1",
              margin: "0 0 1.5rem 0"
            }}
            variants={itemVariants}
          >
            Hi, I'm <span style={{ color: "rgb(0, 119, 181)" }}>Christian</span>
          </motion.h1>
          
          <motion.p 
            style={{
              fontSize: "1.1rem",
              lineHeight: "1.6",
              color: darkMode ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.7)",
              maxWidth: "600px",
              margin: "0 0 2rem 0"
            }}
            variants={itemVariants}
          >
            A passionate full-stack developer with expertise in React, TypeScript, and C#.
            I build beautiful, functional, and user-friendly web applications that solve real-world problems.
          </motion.p>
          
          <motion.div 
            style={{
              display: "flex",
              gap: "1rem",
              flexWrap: "wrap"
            }}
            variants={itemVariants}
          >
            <motion.a 
              href="#projects"
              className="primary-button"
              whileHover={{ scale: 1.05, y: -5, backgroundColor: "rgb(0, 105, 165)" }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.5rem",
                background: "rgb(0, 119, 181)",
                color: "white",
                padding: "0.8rem 2rem",
                borderRadius: "4px",
                fontWeight: 600,
                textDecoration: "none",
                cursor: "pointer",
                border: "none",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
              }}
              aria-label="View my projects"
            >
              View My Work
            </motion.a>
            
            <motion.a 
              href="mailto:christian.hoffmann.thomsen@gmail.com"
              className="primary-button"
              whileHover={{ scale: 1.05, y: -5, backgroundColor: "rgb(0, 105, 165)" }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.5rem",
                background: "rgb(0, 119, 181)",
                color: "white",
                padding: "0.8rem 2rem",
                borderRadius: "4px",
                fontWeight: 600,
                textDecoration: "none",
                cursor: "pointer",
                border: "none",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
              }}
              aria-label="Contact me via email"
            >
              Contact Me
            </motion.a>

            <motion.a 
              href="/files/resume.pdf"
              download="CV Christian Hoffmann Thomsen.pdf"
              className="primary-button"
              whileHover={{ scale: 1.05, y: -5, backgroundColor: "rgb(0, 105, 165)" }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.5rem",
                background: "rgb(0, 119, 181)",
                color: "white",
                padding: "0.8rem 2rem",
                borderRadius: "4px",
                fontWeight: 600,
                textDecoration: "none",
                cursor: "pointer",
                border: "none",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
              }}
              aria-label="Download my resume"
            >
              <Download size={18} />
              Resume
            </motion.a>
          </motion.div>
          
          <CodeContainer 
            darkMode={darkMode}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <CodeInput fileName="me.tsx" value={code} onChange={setCode} />
            <h4 style={{ color: darkMode ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)', marginTop: '1rem' }}>
              Preview:
            </h4>
            <code style={{ color: darkMode ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)' }}>
              {"Hello, I'm a full-stack developer ready to help with your project!"}
            </code>
          </CodeContainer>
        </HeroContent>
        
        <ImageContainer
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <ProfileImage src={imageSrc} alt="Christian - Full Stack Developer" loading="lazy" />
        </ImageContainer>
      </HeroContainer>
    </>
  );
};

export default Hero;
