import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { motion, useAnimation, useInView, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faCode,
  faPuzzlePiece,
  faServer,
  faLaptopCode,
  faGraduationCap,
  faBriefcase,
  faArrowDown,
  faArrowUp
} from "@fortawesome/free-solid-svg-icons";

interface Experience {
  date: string;
  title: string;
  company: string;
  companyUrl?: string;
  description: string;
}

// Styled components for professional summary section
const SummarySection = styled.div<{ darkMode: boolean }>`
  padding: 6rem 10%;
  background: ${props => props.darkMode ? '#1c1c1c' : '#f8f8f8'};
  position: relative;
  
  @media (max-width: 768px) {
    padding: 4rem 5%;
  }
`;

const SectionTitle = styled.h2<{ darkMode: boolean }>`
  font-size: 2.2rem;
  color: ${props => props.darkMode ? '#ffffff' : '#1a1a1a'};
  text-align: center;
  margin-bottom: 3rem;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -15px;
    left: 50%;
    transform: translateX(-50%);
    width: 954px;
    height: 3px;
    background: rgb(0, 119, 181);
  }
`;

const SummaryText = styled.p<{ darkMode: boolean }>`
  font-size: 1.2rem;
  line-height: 1.7;
  color: ${props => props.darkMode ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.8)'};
  max-width: 800px;
  margin: 0 auto 4rem;
  text-align: center;
`;

const CoreStrengthsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-bottom: 4rem;
  
  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const StrengthCard = styled(motion.div)<{ darkMode: boolean }>`
  background: ${props => props.darkMode ? '#2a2a2a' : '#ffffff'};
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  &:hover {
  }
`;

const IconWrapper = styled.div`
  width: 60px;
  height: 60px;
  background: rgb(0, 119, 181);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  
  svg {
    color: white;
    font-size: 1.5rem;
  }
`;

const StrengthTitle = styled.h3<{ darkMode: boolean }>`
  font-size: 1.3rem;
  color: ${props => props.darkMode ? '#ffffff' : '#1a1a1a'};
  margin-bottom: 1rem;
`;

const StrengthDescription = styled.p<{ darkMode: boolean }>`
  color: ${props => props.darkMode ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)'};
  line-height: 1.6;
`;

const ExperienceTimeline = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  padding: 3rem 0;
  display: flex;
  flex-direction: column;
  gap: 5rem;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 4px;
    background: linear-gradient(to bottom, 
      rgba(0, 119, 181, 0.2), 
      rgba(0, 119, 181, 0.7), 
      rgba(0, 198, 255, 0.7), 
      rgba(0, 119, 181, 0.2)
    );
    border-radius: 4px;
    box-shadow: 0 0 20px rgba(0, 198, 255, 0.5);
    z-index: 1;
    
    @media (max-width: 768px) {
      left: 20px;
    }
  }
`;

const TimelineItem = styled.div`
  display: flex;
  position: relative;
  margin-bottom: 0;
  z-index: 2;
  perspective: 1500px;
  
  &:nth-child(odd) {
    justify-content: flex-start;
  }
  
  &:nth-child(even) {
    justify-content: flex-end;
  }
  
  @media (max-width: 768px) {
    margin-left: 20px;
    justify-content: flex-start;
  }
`;

const TimelineContent = styled(motion.div)<{ darkMode: boolean; isLeft: boolean }>`
  width: 46%;
  max-width: 550px;
  padding: 0;
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  transform-style: preserve-3d;
  background: ${props => props.darkMode ? 'rgba(25, 25, 30, 0.7)' : 'rgba(255, 255, 255, 0.7)'};
  backdrop-filter: blur(12px);
  border: 1px solid ${props => props.darkMode ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.05)'};
  transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
  box-shadow: ${props => props.darkMode ? 
    '0 15px 50px rgba(0, 0, 0, 0.3), 0 5px 20px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.05)' : 
    '0 15px 50px rgba(0, 0, 0, 0.1), 0 5px 20px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(255, 255, 255, 0.8)'};
  margin-left: ${props => props.isLeft ? 'auto' : '0'};
  margin-right: ${props => props.isLeft ? '0' : 'auto'};
  transform: ${props => props.isLeft ? 'translateX(40px)' : 'translateX(-40px)'};
  
  &:hover {
    transform: ${props => props.isLeft ? 'translateX(40px)' : 'translateX(-40px)'} translateY(-15px) scale(1.02);
    box-shadow: ${props => props.darkMode ? 
      '0 25px 60px rgba(0, 0, 0, 0.4), 0 10px 30px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(255, 255, 255, 0.1)' : 
      '0 25px 60px rgba(0, 0, 0, 0.15), 0 10px 30px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.9)'};
  }
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: linear-gradient(90deg, #0077b5, #00c6ff, #0077b5);
    z-index: 5;
    box-shadow: 0 0 15px rgba(0, 198, 255, 0.6);
    animation: shimmer 3s infinite linear;
    background-size: 200% 100%;
    
    @keyframes shimmer {
      0% { background-position: 100% 0; }
      100% { background-position: -100% 0; }
    }
  }
  
  &:after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 150px;
    height: 150px;
    background: radial-gradient(circle, rgba(0, 198, 255, 0.15), rgba(0, 198, 255, 0) 70%);
    filter: blur(20px);
    pointer-events: none;
    z-index: 0;
  }
  
  @media (max-width: 768px) {
    width: calc(100% - 60px);
    margin-left: auto;
    margin-right: 0;
    transform: translateX(0);
    
    &:hover {
      transform: translateY(-15px) scale(1.02);
    }
  }
`;

const TimelineIcon = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background: linear-gradient(135deg, #0077b5, #00c6ff);
  color: white;
  box-shadow: 0 4px 12px rgba(0, 119, 181, 0.4);
  flex-shrink: 0;
`;

const ContentHeader = styled.div<{ darkMode: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background: ${props => props.darkMode ? 'rgba(30, 30, 35, 0.6)' : 'rgba(250, 250, 255, 0.6)'};
  padding: 2.2rem;
  padding-bottom: 0.5rem;
  position: relative;
  
  /* This makes date centered but keeps other items left-aligned */
  & > .date-container {
    width: 100%;
    display: flex;
    justify-content: center;
  }
  
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1px;
    background: linear-gradient(to right, rgba(0, 119, 181, 0.05), rgba(0, 119, 181, 0.3), rgba(0, 119, 181, 0.05));
  }
`;

const ContentBody = styled.div<{ darkMode: boolean }>`
  padding: 2.2rem;
  position: relative;
  background: ${props => props.darkMode ? 'rgba(20, 20, 25, 0.4)' : 'rgba(255, 255, 255, 0.4)'};
`;

const TimelineYear = styled(motion.div)<{ darkMode: boolean }>`
  position: absolute;
  font-size: 12rem;
  font-weight: 900;
  opacity: 0.05;
  color: ${props => props.darkMode ? '#ffffff' : '#000000'};
  right: 20px;
  bottom: -20px;
  line-height: 1;
  pointer-events: none;
  z-index: 1;
  filter: blur(1px);
`;

const ContentBackground = styled(motion.div)<{ bgColor: string }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: transparent;
  z-index: 0;
`;

const SkillsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 1rem;
  gap: 0.5rem;
`;

const TimelineDate = styled.div<{ darkMode: boolean }>`
  font-size: 1rem;
  color: white;
  font-weight: 700;
  display: inline-block;
  padding: 0.6rem 2rem;
  min-width: 340px;
  text-align: center;
  background: linear-gradient(90deg, #0077b5, #00c6ff);
  border-radius: 30px;
  letter-spacing: 0.5px;
  box-shadow: 0 4px 20px rgba(0, 119, 181, 0.5), 0 0 0 3px rgba(0, 198, 255, 0.1);
  position: relative;
  margin-bottom: 1.2rem;
  margin-top: 0.5rem;
  z-index: 3;
  transform: translateY(-50%);
  text-transform: uppercase;
`;

const TimelineTitle = styled.h3<{ darkMode: boolean }>`
  font-size: 1.85rem;
  color: ${props => props.darkMode ? '#ffffff' : '#1a1a1a'};
  margin-bottom: 0.6rem;
  font-weight: 800;
  letter-spacing: 0.5px;
  background: linear-gradient(120deg, #0077b5, #00c6ff);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  text-shadow: ${props => props.darkMode ? '0 2px 15px rgba(0, 198, 255, 0.4)' : '0 2px 15px rgba(0, 119, 181, 0.3)'};
`

const TimelineCompany = styled.div<{ darkMode: boolean }>`
  font-size: 1.15rem;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-weight: 700;
  margin-bottom: 0.75rem;
  gap: 10px;
  letter-spacing: 0.5px;
  color: #0077b5;
  background: ${props => props.darkMode ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 0.9)'};
  padding: 0.5rem 1.2rem;
  border-radius: 8px;
  align-self: flex-start;
  box-shadow: ${props => props.darkMode ? 
    'inset 0 0 0 1px rgba(255, 255, 255, 0.1), 0 2px 10px rgba(0, 0, 0, 0.2)' : 
    'inset 0 0 0 1px rgba(0, 0, 0, 0.05), 0 2px 10px rgba(0, 0, 0, 0.05)'};
  transition: all 0.3s ease;
  
  &:hover {
    background: linear-gradient(90deg, 
      ${props => props.darkMode ? 'rgba(0, 119, 181, 0.25)' : 'rgba(0, 119, 181, 0.15)'}, 
      ${props => props.darkMode ? 'rgba(0, 198, 255, 0.15)' : 'rgba(0, 198, 255, 0.1)'}
    );
    box-shadow: ${props => props.darkMode ? 
      'inset 0 0 0 1px rgba(255, 255, 255, 0.15), 0 4px 15px rgba(0, 0, 0, 0.25)' : 
      'inset 0 0 0 1px rgba(0, 0, 0, 0.08), 0 4px 15px rgba(0, 0, 0, 0.08)'};
  }
`;

const TimelineDescription = styled.p<{ darkMode: boolean }>`
  color: ${props => props.darkMode ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)'};
  line-height: 1.8;
  font-size: 1rem;
  position: relative;
  margin-bottom: 1rem;
`;

const SkillTag = styled(motion.span)<{ darkMode: boolean }>`
  display: inline-block;
  padding: 0.35rem 0.8rem;
  background: ${props => props.darkMode ? 'rgba(0, 119, 181, 0.15)' : 'rgba(0, 119, 181, 0.1)'};
  color: ${props => props.darkMode ? 'rgba(255,255,255,0.9)' : 'rgba(0,0,0,0.8)'};
  border-radius: 20px;
  font-size: 0.8rem;
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
  border: 1px solid ${props => props.darkMode ? 'rgba(0, 119, 181, 0.3)' : 'rgba(0, 119, 181, 0.2)'};
  transition: all 0.2s ease;
  
  &:hover {
    background: ${props => props.darkMode ? 'rgba(0, 119, 181, 0.3)' : 'rgba(0, 119, 181, 0.2)'};
    transform: translateY(-2px);
  }
`;

const ExploreButton = styled(motion.button)<{ darkMode: boolean }>`
  background: transparent;
  border: 1px solid ${props => props.darkMode ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)'};
  color: ${props => props.darkMode ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.8)'};
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-size: 0.9rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s ease;
  
  &:hover {
    background: ${props => props.darkMode ? 'rgba(0, 119, 181, 0.1)' : 'rgba(0, 119, 181, 0.05)'};
    border-color: rgb(0, 119, 181);
    color: rgb(0, 119, 181);
  }
  
  svg {
    font-size: 1rem;
  }
`;

// Track section visibility for animations
function TimelineItemWithAnimation({ experience, darkMode, index }) {
  const ref = useRef(null);
  const contentRef = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Different background colors for variety
  const bgColors = [
    'linear-gradient(135deg, #0077b5 0%, #00c6ff 100%)',
    'linear-gradient(135deg, #3494e6 0%, #ec6ead 100%)',
    'linear-gradient(135deg, #6e45e2 0%, #89d4cf 100%)',
    'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)'
  ];
  
  // Different icons for each experience type
  const getIconForTitle = (title) => {
    if (title.includes('Frontend')) return faLaptopCode;
    if (title.includes('Application')) return faCode;
    if (title.includes('Intern')) return faGraduationCap;
    if (title.includes('Degree')) return faGraduationCap;
    return faBriefcase;
  };
  
  // Get skills from description
  const getSkills = (description) => {
    const techKeywords = ['React', 'TypeScript', 'Next.js', 'JavaScript', 'C#', 'Node.js', 'MongoDB', 'CI/CD', 
                         'REST', 'API', 'Frontend', 'Backend', 'Full-stack', 'Microservices', 'UX', 'CSS', 'HTML',
                         'Git', 'Agile', 'Design', 'Testing', 'Architecture'];
    
    let skills = [];
    techKeywords.forEach(keyword => {
      if (description.includes(keyword)) {
        skills.push(keyword);
      }
    });
    
    // Add some default skills if none found
    if (skills.length === 0) {
      if (experience.title.includes('Frontend')) {
        skills = ['React', 'CSS', 'TypeScript', 'Next.js'];
      } else if (experience.title.includes('Application')) {
        skills = ['Progress 4GL', 'APIs'];
      } else if (experience.title.includes('Degree')) {
        skills = ['C#', 'C++', 'SQL', 'MongoDB', 'Node.js'];
      } else {
        skills = ['Docker', 'Kubernetes', 'Testing'];
      }
    }
    
    return skills.slice(0, 5); // Limit to 5 skills
  };
  
  const skills = getSkills(experience.description);
  const isLeft = index % 2 === 0;
  const icon = getIconForTitle(experience.title);
  const year = experience.date.split(' ')[0]; // Extract year from date
  
  // Animation variants
  const contentVariants = {
    hidden: { 
      opacity: 0,
      y: 70,
      x: isLeft ? 40 : -40,
      scale: 0.95,
      rotateX: -5
    },
    visible: { 
      opacity: 1, 
      y: 0,
      x: isLeft ? 40 : -40,
      scale: 1,
      rotateX: 0,
      transition: { 
        type: 'spring',
        damping: 22,
        stiffness: 80,
        delay: index * 0.25
      } 
    }
  };
  
  const expandVariants = {
    collapsed: { height: '0px', opacity: 0, marginTop: '0px' },
    expanded: { 
      height: 'auto', 
      opacity: 1,
      marginTop: '1rem',
      transition: { 
        duration: 0.4,
      }
    }
  };
  
  const skillVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: i => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.1 + (i * 0.05) }
    })
  };
  
  return (
    <TimelineItem ref={ref}>

      
      <TimelineContent 
        darkMode={darkMode}
        isLeft={isLeft}
        variants={contentVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        whileHover={{ 
          y: -5, 
          boxShadow: '0 15px 30px rgba(0, 0, 0, 0.2)',
          transition: { duration: 0.3 }
        }}
        ref={contentRef}
      >
        <ContentHeader darkMode={darkMode}>
          <div className="date-container">
            <TimelineDate darkMode={darkMode}>{experience.date}</TimelineDate>
          </div>
          <TimelineTitle darkMode={darkMode}>{experience.title}</TimelineTitle>
          <TimelineCompany darkMode={darkMode}>
            <TimelineIcon>
              <FontAwesomeIcon icon={icon} />
            </TimelineIcon>
            {experience.companyUrl ? (
              <a 
                href={experience.companyUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ 
                  color: '#0077b5', 
                  textDecoration: 'none',
                  fontWeight: 'bold',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.textDecoration = 'underline';
                  e.currentTarget.style.color = '#00c6ff';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.textDecoration = 'none';
                  e.currentTarget.style.color = '#0077b5';
                }}
              >
                {experience.company}
              </a>
            ) : (
              experience.company
            )}
          </TimelineCompany>
        </ContentHeader>
        

        <ContentBody darkMode={darkMode}>

          
          <TimelineDescription darkMode={darkMode}>
            {isExpanded ? experience.description : `${experience.description.substring(0, 100)}...`}
          </TimelineDescription>
          
          <motion.div
            variants={expandVariants}
            initial="collapsed"
            animate={isExpanded ? "expanded" : "collapsed"}
          >
            <SkillsContainer>
              {skills.map((skill, i) => (
                <SkillTag 
                  key={i} 
                  darkMode={darkMode}
                  custom={i}
                  variants={skillVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {skill}
                </SkillTag>
              ))}
            </SkillsContainer>
          </motion.div>
          
          <ExploreButton 
            darkMode={darkMode} 
            onClick={() => setIsExpanded(!isExpanded)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{ marginTop: '1rem' }}
          >
            {isExpanded ? (
              <>
                <FontAwesomeIcon icon={faArrowUp} /> Less
              </>
            ) : (
              <>
                <FontAwesomeIcon icon={faArrowDown} /> More
              </>
            )}
          </ExploreButton>
        </ContentBody>
      </TimelineContent>
    </TimelineItem>
  );
};

interface ProfessionalSummaryProps {
  darkMode: boolean;
}

const strengths = [
  {
    icon: faCode,
    title: "Full-Stack Development",
    description: "Expertise in building end-to-end solutions with TypeScript, React, C#, and Progress 4GL. I develop responsive, accessible, and performant applications that meet business requirements."
  },
  {
    icon: faServer,
    title: "System Integration",
    description: "Experience with RESTful APIs, Docker, and Kubernetes for seamless integration between different systems and services. I ensure smooth data flow and system communication."
  },
  {
    icon: faPuzzlePiece,
    title: "Problem Solving",
    description: "Strong analytical approach to troubleshooting and resolving complex technical challenges. I identify root causes and develop efficient solutions."
  },
  {
    icon: faLaptopCode,
    title: "Modern Frameworks",
    description: "Proficient with modern frameworks and libraries including React, Node.js, and .NET. I stay updated with the latest technologies and best practices."
  },
  {
    icon: faGraduationCap,
    title: "Continuous Learning",
    description: "Committed to ongoing professional development. I actively seek new knowledge and skills to enhance my capabilities and deliver better solutions."
  },
  {
    icon: faBriefcase,
    title: "Project Management",
    description: "Experience in planning, executing, and delivering projects on time and within scope."
  }
];

const experiences = [
  {
    date: "2024 - 2025",
    title: "Frontend Developer",
    company: "PICIT",
    companyUrl: "https://www.picit.dk/",
    description: "Developed and maintained web components using React, TypeScript, and Next.js."
  },
  {
    date: "2023 - 2024",
    title: "Application Developer",
    company: "PICIT",
    companyUrl: "https://www.picit.dk/",
    description: "Developed enterprise solutions for the transport and logistics industry."
  },
  {
    date: "Jan 2023 - Apr 2023",
    title: "Backend Developer Intern",
    company: "Affinity Tryg",
    companyUrl: "https://affinity.tryg.dk/",
    description: "Conducted exploratory testing for backend systems to identify edge-case bugs and improve software reliability. Assisted in Docker containerization of applications, gaining experience in environment setup and deployment workflows."
  },
  {
    date: "2020 - 2023",
    title: "Computer Science Degree",
    company: "Dania",
    companyUrl: "https://eadania.dk/",
    description: "Gained proficiency in object-oriented programming (C++, C#), web development (HTML/CSS), and back-end systems (Node.js, MongoDB). Explored machine learning fundamentals and applied project management tools (GitHub, Jira, Trello) using Agile/Scrum methodologies."
  }
];

const ProfessionalSummary: React.FC<ProfessionalSummaryProps> = ({ darkMode }) => {
  const [autoAnimate, setAutoAnimate] = useState(true);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.1 });
  const controls = useAnimation();
  
  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);
  
  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };
  
  const titleVariants = {
    hidden: { y: -50, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: 'spring',
        damping: 12,
        stiffness: 100
      }
    }
  };
  return (
    <SummarySection darkMode={darkMode} ref={sectionRef}>
      <motion.div
        initial="hidden"
        animate={controls}
        variants={sectionVariants}
      >
        <motion.div variants={titleVariants}>
          <SectionTitle darkMode={darkMode}>My Professional Journey</SectionTitle>
          <SummaryText darkMode={darkMode}>
            With over 2 years of experience in software development, I've worked across various domains and technologies.
            My journey has equipped me with not just technical skills, but also the ability to understand business needs and translate them into effective solutions.
          </SummaryText>
        </motion.div>
      
      <CoreStrengthsGrid>
        {strengths.map((strength, index) => (
          <StrengthCard 
            key={index}
            darkMode={darkMode}
            initial={{ opacity: 0, y: 50, rotateZ: -2 }}
            whileInView={{ opacity: 1, y: 0, rotateZ: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            whileTap={{ scale: 0.97 }}
          >
            <IconWrapper>
              <FontAwesomeIcon icon={strength.icon} />
            </IconWrapper>
            <StrengthTitle darkMode={darkMode}>{strength.title}</StrengthTitle>
            <StrengthDescription darkMode={darkMode}>{strength.description}</StrengthDescription>
          </StrengthCard>
        ))}
      </CoreStrengthsGrid>
      
      <motion.div 
        style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          marginBottom: '2rem'
        }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ 
            duration: 2, 
            repeat: Infinity, 
            repeatType: 'loop' 
          }}
          style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            color: darkMode ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)',
            cursor: 'pointer' 
          }}
        >
          <span style={{ marginBottom: '0.5rem' }}>My Timeline</span>
          <FontAwesomeIcon icon={faArrowDown} />
        </motion.div>
      </motion.div>
      
      <SectionTitle darkMode={darkMode}>Experience Timeline</SectionTitle>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <ExperienceTimeline>
          {experiences.map((exp, index) => (
            <TimelineItemWithAnimation 
              key={index}
              experience={exp} 
              darkMode={darkMode} 
              index={index} 
            />
          ))}
        </ExperienceTimeline>
      </motion.div>
      </motion.div>
    </SummarySection>
  );
};

export default ProfessionalSummary;
