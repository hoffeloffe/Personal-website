import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { motion, useInView } from 'framer-motion';
import { TypewriterText } from "./functions/TypewriterProps";
import { CodeInput } from "./CodeInputProps";
import { Download } from 'lucide-react';
import { fadeInUp, staggerContainer } from '../utils/animations';

// Styled components for a modern, professional hero section
const HeroContainer = styled.section`
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 4rem;
  padding: 0rem 10% 4rem;
  align-items: center;
  position: relative;
  min-height: 100vh;
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    text-align: center;
    padding: 3rem 5% 3rem;
    gap: 2rem;
  }
`;

const HeroContent = styled(motion.div)`
  z-index: 2;
`;

const JobTitle = styled.div<{ darkMode: boolean }>`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.colors.primary[600]};
  display: flex;
  align-items: center;
  min-height: 1.5rem;
  margin-bottom: ${({ theme }) => theme.spacing[4]};
  
  @media (max-width: 768px) {
    justify-content: center;
  }
  
  &:before {
    content: '';
    display: inline-block;
    width: 40px;
    height: 2px;
    background: linear-gradient(90deg, ${({ theme }) => theme.colors.primary[500]}, ${({ theme }) => theme.colors.accent[400]});
    margin-right: ${({ theme }) => theme.spacing[3]};
    
    @media (max-width: 768px) {
      margin-right: ${({ theme }) => theme.spacing[2]};
    }
  }
`;

const Name = styled.h1<{ darkMode: boolean }>`
  font-size: ${({ theme }) => theme.typography.fontSize['5xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  margin-bottom: ${({ theme }) => theme.spacing[6]};
  color: ${({ theme }) => theme.colors.text.primary};
  line-height: ${({ theme }) => theme.typography.lineHeight.tight};
  
  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.typography.fontSize['4xl']};
  }
  
  span {
    background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary[600]}, ${({ theme }) => theme.colors.accent[500]});
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
`;

const HeroBio = styled.p<{ darkMode: boolean }>`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
  margin-bottom: ${({ theme }) => theme.spacing[8]};
  color: ${({ theme }) => theme.colors.text.secondary};
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
  gap: ${({ theme }) => theme.spacing[2]};
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary[500]}, ${({ theme }) => theme.colors.primary[600]});
  color: ${({ theme }) => theme.colors.text.inverse};
  padding: ${({ theme }) => theme.spacing[4]} ${({ theme }) => theme.spacing[8]};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  text-decoration: none;
  cursor: pointer;
  border: none;
  box-shadow: ${({ theme }) => theme.shadows.base};
  transition: all ${({ theme }) => theme.transitions.base};

  &:hover {
    background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary[600]}, ${({ theme }) => theme.colors.primary[700]});
    color: ${({ theme }) => theme.colors.text.inverse};
    transform: translateY(-3px);
    box-shadow: ${({ theme }) => theme.shadows.lg};
  }

  &:active {
    transform: translateY(-1px);
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary[500]};
    outline-offset: 2px;
  }
`;

const SecondaryButton = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
  background: ${({ theme }) => theme.colors.background.elevated};
  color: ${({ theme }) => theme.colors.text.primary};
  padding: ${({ theme }) => theme.spacing[4]} ${({ theme }) => theme.spacing[8]};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  text-decoration: none;
  cursor: pointer;
  border: 1px solid ${({ theme }) => theme.colors.border.default};
  transition: all ${({ theme }) => theme.transitions.base};

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary[400]};
    color: ${({ theme }) => theme.colors.primary[600]};
    background: ${({ theme }) => theme.colors.primary[50]};
    transform: translateY(-3px);
    box-shadow: ${({ theme }) => theme.shadows.md};
  }

  &:active {
    transform: translateY(-1px);
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary[500]};
    outline-offset: 2px;
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
    width: 320px;
    height: 320px;
    border-radius: 50%;
    background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary[400]}20 0%, transparent 60%);
    z-index: 0;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    transition: all ${({ theme }) => theme.transitions.slow};
  }
  
  &:hover:before {
    width: 340px;
    height: 340px;
    background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary[400]}30 0%, transparent 70%);
  }
`;

const ProfileImage = styled(motion.img)`
  width: 300px;
  height: 300px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid ${({ theme }) => theme.colors.background.default};
  box-shadow: ${({ theme }) => theme.shadows.xl};
  z-index: 2;
  transition: all ${({ theme }) => theme.transitions.base};
  
  &:hover {
    transform: scale(1.02);
    box-shadow: ${({ theme }) => theme.shadows['2xl']};
  }
`;

const CodeContainer = styled(motion.div)<{ darkMode: boolean }>`
  margin-top: ${({ theme }) => theme.spacing[10]};
  background: ${({ theme, darkMode }) => darkMode ? theme.colors.gray[100] : theme.colors.gray[50]};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: ${({ theme }) => theme.spacing[6]};
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  transition: all ${({ theme }) => theme.transitions.base};
  
  &:hover {
    border-color: ${({ theme }) => theme.colors.primary[200]};
    box-shadow: ${({ theme }) => theme.shadows.md};
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

console.log(greet(nickname)); `;
  
  const [code, setCode] = useState(codeMe);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });
  


  return (
    <HeroContainer ref={containerRef}>
      <HeroContent
        variants={staggerContainer}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
          <JobTitle darkMode={darkMode}>
            <TypewriterText
              texts={roles}
              typingSpeed={80}
              deletingSpeed={40}
              pauseBeforeDelete={1500}
              pauseBeforeNext={1000}
              darkMode={darkMode}
            />
          </JobTitle>
          
          <Name as={motion.h1} darkMode={darkMode} variants={fadeInUp}>
            Hi, I'm <span>Christian</span>
          </Name>
          
          <HeroBio as={motion.p} darkMode={darkMode} variants={fadeInUp}>
            A passionate full-stack developer with expertise in React, TypeScript, and C#.
            I build beautiful, functional, and user-friendly web applications that solve real-world problems.
          </HeroBio>
          
          <HeroButtons as={motion.div} variants={fadeInUp}>
            <PrimaryButton
              href="#projects"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              aria-label="View my projects"
            >
              View My Work
            </PrimaryButton>
            
            <SecondaryButton
              href="mailto:christian.hoffmann.thomsen@gmail.com"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              aria-label="Contact me via email"
            >
              Contact Me
            </SecondaryButton>

            <SecondaryButton
              href="/files/resume.pdf"
              download="CV Christian Hoffmann Thomsen.pdf"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              aria-label="Download my resume"
            >
              <Download size={18} />
              Resume
            </SecondaryButton>
          </HeroButtons>
          
          <CodeContainer 
            darkMode={darkMode}
            variants={fadeInUp}
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
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.2 }}
        >
          <ProfileImage 
            src={imageSrc} 
            alt="Christian - Full Stack Developer" 
            loading="lazy"
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.3 }}
          />
        </ImageContainer>
      </HeroContainer>
  );
};

export default Hero;
