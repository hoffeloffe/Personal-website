import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { 
  SiReact, 
  SiTypescript, 
  SiNextdotjs, 
  SiSharp, 
  SiDocker, 
  SiKubernetes,
  SiProgress,
  SiNodedotjs,
  SiPostgresql,
  SiMongodb,
  SiGit,
  SiFigma,
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiTailwindcss
} from 'react-icons/si';

const AboutContainer = styled.section<{ darkMode: boolean }>`
  padding: 4rem 10%;
  background: ${props => props.darkMode ? '#1a1a1a' : '#ffffff'};
  color: ${props => props.darkMode ? '#ffffff' : '#1a1a1a'};
  transition: background-color 0.5s ease, color 0.5s ease;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 4rem;
`;

const Title = styled(motion.h2)<{ darkMode: boolean }>`
  font-size: 2.5rem;
  color: ${props => props.darkMode ? '#ffffff' : '#1a1a1a'};
  margin-bottom: 1rem;
  position: relative;
  text-align: center;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: min(100%, 300px);
    height: 3px;
    background: linear-gradient(90deg, #00d4ff, #0099ff);
    border-radius: 2px;
  }
`;

const Subtitle = styled.p<{ darkMode: boolean }>`
  font-size: 1.2rem;
  color: ${props => props.darkMode ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.7)'};
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6rem;
  margin-bottom: 8rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 4rem;
  }
`;

const BioSection = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 3rem;
`;

const BioCard = styled.div<{ darkMode: boolean }>`
  background: ${props => props.darkMode ? '#2a2a2a' : '#f8f9fa'};
  padding: 2.5rem;
  border-radius: 16px;
  border: 1px solid ${props => props.darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
`;

const BioTitle = styled.h3<{ darkMode: boolean }>`
  font-size: 1.5rem;
  color: ${props => props.darkMode ? '#ffffff' : '#1a1a1a'};
  margin: 0rem 0rem 1.5rem;
`;

const BioText = styled.p<{ darkMode: boolean }>`
  color: ${props => props.darkMode ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.7)'};
  line-height: 1.6;
  margin-bottom: 1rem;
`;

const TimelineSection = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 4rem;
`;

const TimelineCard = styled.div<{ darkMode: boolean }>`
  background: ${props => props.darkMode ? '#2a2a2a' : '#f8f9fa'};
  padding: 2.5rem;
  border-radius: 16px;
  border: 1px solid ${props => props.darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'};
  position: relative;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
  cursor: pointer;
  margin-bottom: 2rem;
  
  &::before {
    content: '';
    position: absolute;
    left: -20px;
    top: 50%;
    transform: translateY(-50%);
    width: 12px;
    height: 12px;
    background: linear-gradient(135deg, #00d4ff, #0099ff);
    border-radius: 50%;
    box-shadow: 0 0 0 4px ${props => props.darkMode ? '#1a1a1a' : '#ffffff'};
    z-index: 2;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(
      circle 600px at var(--mouse-x, 50%) var(--mouse-y, 50%),
      rgba(0, 212, 255, 0.08),
      rgba(0, 153, 255, 0.03),
      transparent 40%
    );
    opacity: 0;
    transition: opacity 0.3s ease;
    pointer-events: none;
  }
  
  &:hover {  
    &::after {
      opacity: 1;
    }
  }
  
  > * {
    position: relative;
    z-index: 1;
  }
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const TimelineDate = styled.span<{ darkMode: boolean }>`
  color: ${props => props.darkMode ? '#00d4ff' : '#0099ff'};
  font-weight: 600;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
  display: block;
`;

const TimelineTitle = styled.h4<{ darkMode: boolean }>`
  font-size: 1.2rem;
  color: ${props => props.darkMode ? '#ffffff' : '#1a1a1a'};
  margin-bottom: 0.5rem;
`;

const TimelineCompany = styled.p<{ darkMode: boolean }>`
  color: ${props => props.darkMode ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.7)'};
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const TimelineDescription = styled.p<{ darkMode: boolean }>`
  color: ${props => props.darkMode ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.6)'};
  font-size: 0.9rem;
  line-height: 1.5;
  margin-bottom: 0px;
`;

const SkillsSection = styled.div`
  margin-bottom: 4rem;
`;

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 4rem;
  align-items: stretch;
`;

const SkillCategory = styled(motion.div)<{ darkMode: boolean }>`
  background: ${props => props.darkMode ? '#2a2a2a' : '#f8f9fa'};
  padding: 2.5rem;
  border-radius: 16px;
  border: 1px solid ${props => props.darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  transform-origin: center;
  will-change: transform;
  display: flex;
  flex-direction: column;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(
      circle 600px at var(--mouse-x, 50%) var(--mouse-y, 50%),
      rgba(0, 212, 255, 0.08),
      rgba(0, 153, 255, 0.03),
      transparent 40%
    );
    opacity: 0;
    transition: opacity 0.3s ease;
    pointer-events: none;
    z-index: 0;
  }
  
  &:hover {
    
    &::before {
      opacity: 1;
    }
  }
  
  > * {
    position: relative;
    z-index: 1;
  }
`;

const SkillCategoryTitle = styled.h3<{ darkMode: boolean }>`
  font-size: 1.3rem;
  color: ${props => props.darkMode ? '#ffffff' : '#1a1a1a'};
  margin: 0rem 0rem 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const SkillList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  flex: 1;
`;

const SkillItem = styled.div<{ darkMode: boolean }>`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.2rem;
  background: ${props => props.darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'};
  border-radius: 12px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(90deg, rgba(0, 212, 255, 0.1), transparent);
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  &:hover {
    background: ${props => props.darkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'};
    transform: translateX(8px);
    
    &::before {
      opacity: 1;
    }
  }
  
  > * {
    position: relative;
    z-index: 1;
  }
`;

const SkillIcon = styled.div<{ color: string }>`
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, ${props => props.color}, ${props => props.color}88);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  svg {
    width: 20px;
    height: 20px;
    color: white;
  }
`;

const SkillInfo = styled.div`
  flex: 1;
`;

const SkillName = styled.div<{ darkMode: boolean }>`
  font-weight: 600;
  color: ${props => props.darkMode ? '#ffffff' : '#1a1a1a'};
  margin-bottom: 0.25rem;
`;

const SkillLevel = styled.div<{ darkMode: boolean }>`
  font-size: 0.85rem;
  color: ${props => props.darkMode ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)'};
`;

const PersonalSection = styled.div<{ darkMode: boolean }>`
  background: ${props => props.darkMode ? '#2a2a2a' : '#f8f9fa'};
  padding: 3rem;
  border-radius: 16px;
  border: 1px solid ${props => props.darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'};
  text-align: center;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(
      circle 600px at var(--mouse-x, 50%) var(--mouse-y, 50%),
      rgba(0, 212, 255, 0.08),
      rgba(0, 153, 255, 0.03),
      transparent 40%
    );
    opacity: 0;
    transition: opacity 0.3s ease;
    pointer-events: none;
    z-index: 0;
  }
  
  &:hover {  
    &::before {
      opacity: 1;
    }
  }
  
  > * {
    position: relative;
    z-index: 1;
  }
`;

const PersonalTitle = styled.h3<{ darkMode: boolean }>`
  font-size: 1.8rem;
  color: ${props => props.darkMode ? '#ffffff' : '#1a1a1a'};
  margin-bottom: 2rem;
`;

const PersonalGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  margin: 0 auto;
`;

const PersonalItem = styled.div<{ darkMode: boolean }>`
  text-align: center;
  padding: 1.5rem;
  background: ${props => props.darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'};
  border-radius: 12px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  cursor: pointer;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(
      circle 600px at var(--mouse-x, 50%) var(--mouse-y, 50%),
      rgba(0, 212, 255, 0.06),
      rgba(0, 153, 255, 0.02),
      transparent 40%
    );
    opacity: 0;
    transition: opacity 0.3s ease;
    pointer-events: none;
  }
  
  &:hover {
    background: ${props => props.darkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'};
    transform: translateY(-2px);
    
    &::before {
      opacity: 1;
    }
  }
  
  > * {
    position: relative;
    z-index: 1;
  }
`;

const PersonalEmoji = styled.div`
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const PersonalLabel = styled.h4<{ darkMode: boolean }>`
  font-size: 1.1rem;
  color: ${props => props.darkMode ? '#ffffff' : '#1a1a1a'};
  margin-bottom: 0.5rem;
`;

const PersonalDesc = styled.p<{ darkMode: boolean }>`
  color: ${props => props.darkMode ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.7)'};
  font-size: 0.9rem;
  line-height: 1.5;
`;

const timeline = [
   {
    date: '2024 - 2025',
    title: 'Frontend Developer',
    company: 'PICIT',
    description: 'Developed responsive web interfaces using React and TypeScript. Improved user experience and performance.'
  },
  {
    date: '2023 - 2024',
    title: 'Application Developer',
    company: 'PICIT',
    description: 'Full-stack development with Progress 4GL, C++, and system integration. Focused on transport modules and database optimization.'
  },

  {
    date: '2020 - 2023',
    title: 'Computer Science Degree',
    company: 'Dania',
    description: 'Bachelor\'s degree in Computer Science with focus on software engineering, algorithms, and database systems.'
  }
];

const skillsData = {
  'Frontend': [
    { name: 'React', level: 'Advanced', icon: SiReact, color: '#61dafb' },
    { name: 'TypeScript', level: 'Advanced', icon: SiTypescript, color: '#3178c6' },
    { name: 'Next.js', level: 'Intermediate', icon: SiNextdotjs, color: '#000000' },
    { name: 'HTML/CSS', level: 'Advanced', icon: SiHtml5, color: '#e34c26' },
    { name: 'Tailwind CSS', level: 'Intermediate', icon: SiTailwindcss, color: '#06b6d4' }
  ],
  'Backend': [
    { name: 'C#', level: 'Advanced', icon: SiSharp, color: '#68217a' },
    { name: 'Node.js', level: 'Intermediate', icon: SiNodedotjs, color: '#339933' },
    { name: 'Progress 4GL', level: 'Advanced', icon: SiProgress, color: '#563d7c' },
    { name: 'C++', level: 'Intermediate', icon: SiJavascript, color: '#00599c' }
  ],
  'Database': [
    { name: 'PostgreSQL', level: 'Intermediate', icon: SiPostgresql, color: '#336791' },
    { name: 'MongoDB', level: 'Beginner', icon: SiMongodb, color: '#47a248' },
    { name: 'Entity Framework', level: 'Advanced', icon: SiSharp, color: '#68217a' }
  ],
  'Tools & DevOps': [
    { name: 'Docker', level: 'Intermediate', icon: SiDocker, color: '#0db7ed' },
    { name: 'Kubernetes', level: 'Beginner', icon: SiKubernetes, color: '#326ce5' },
    { name: 'Git', level: 'Advanced', icon: SiGit, color: '#f05032' },
    { name: 'VS Code', level: 'Advanced', icon: SiGit, color: '#007acc' }
  ]
};

const personalItems = [
  {
    emoji: '🎯',
    title: 'Problem Solver',
    description: 'Love tackling complex technical challenges and finding elegant solutions'
  },
  {
    emoji: '🚀',
    title: 'Continuous Learner',
    description: 'Always exploring new technologies and best practices in software development'
  },
  {
    emoji: '🤝',
    title: 'Team Player',
    description: 'Enjoy collaborating with cross-functional teams and sharing knowledge'
  },
  {
    emoji: '💡',
    title: 'Creative Thinker',
    description: 'Combine technical expertise with creative problem-solving approaches'
  }
];

interface AboutProps {
  darkMode: boolean;
}

const About: React.FC<AboutProps> = ({ darkMode }) => {
  const [mousePositions, setMousePositions] = useState<Record<string, { x: number; y: number }>>({});

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, id: string) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    setMousePositions(prev => ({
      ...prev,
      [id]: { x, y }
    }));
  };

  const handleMouseLeave = (id: string) => {
    setMousePositions(prev => ({
      ...prev,
      [id]: { x: 50, y: 50 }
    }));
  };

  return (
    <AboutContainer darkMode={darkMode} id="about">
      <Header>
        <Title 
          darkMode={darkMode}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          About Me
        </Title>
        <Subtitle darkMode={darkMode}>
          Passionate full-stack developer with a computer science degree and hands-on experience 
          building scalable web applications. I love turning complex problems into elegant solutions.
        </Subtitle>
      </Header>

      <ContentGrid>
        <BioSection
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <BioCard 
            darkMode={darkMode}
            onMouseMove={(e) => handleMouseMove(e, 'bio-card')}
            onMouseLeave={() => handleMouseLeave('bio-card')}
            style={{
              '--mouse-x': `${mousePositions['bio-card']?.x || 50}%`,
              '--mouse-y': `${mousePositions['bio-card']?.y || 50}%`,
            } as React.CSSProperties}
          >
            <BioTitle darkMode={darkMode}>My Story</BioTitle>
            <BioText darkMode={darkMode}>
              I'm a passionate full-stack developer with a computer science degree from Dania 
              and professional experience at PICIT. My journey in software development started 
              with a curiosity about how things work and evolved into a career focused on building 
              impactful digital solutions.
            </BioText>
            <BioText darkMode={darkMode}>
              I specialize in React, TypeScript, and C#, with experience across the full stack 
              from frontend interfaces to backend APIs and database design. I'm particularly 
              interested in system architecture, performance optimization, and creating seamless 
              user experiences.
            </BioText>
            <BioText darkMode={darkMode}>
              When I'm not coding, you'll find me exploring new technologies, contributing to 
              open source projects, or working on personal projects that push my boundaries 
              as a developer.
            </BioText>
          </BioCard>
        </BioSection>

        <TimelineSection
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <BioCard darkMode={darkMode}>
            <BioTitle darkMode={darkMode}>Career Journey</BioTitle>
            {timeline.map((item, index) => (
              <TimelineCard 
                key={index} 
                darkMode={darkMode}
                onMouseMove={(e) => handleMouseMove(e, `timeline-${index}`)}
                onMouseLeave={() => handleMouseLeave(`timeline-${index}`)}
                style={{
                  '--mouse-x': `${mousePositions[`timeline-${index}`]?.x || 50}%`,
                  '--mouse-y': `${mousePositions[`timeline-${index}`]?.y || 50}%`,
                } as React.CSSProperties}
              >
                <TimelineDate darkMode={darkMode}>{item.date}</TimelineDate>
                <TimelineTitle darkMode={darkMode}>{item.title}</TimelineTitle>
                <TimelineCompany darkMode={darkMode}>{item.company}</TimelineCompany>
                <TimelineDescription darkMode={darkMode}>{item.description}</TimelineDescription>
              </TimelineCard>
            ))}
          </BioCard>
        </TimelineSection>
      </ContentGrid>

      <PersonalSection 
        darkMode={darkMode}
        onMouseMove={(e) => handleMouseMove(e, 'personal-section')}
        onMouseLeave={() => handleMouseLeave('personal-section')}
        style={{
          '--mouse-x': `${mousePositions['personal-section']?.x || 50}%`,
          '--mouse-y': `${mousePositions['personal-section']?.y || 50}%`,
        } as React.CSSProperties}
      >
        <PersonalTitle darkMode={darkMode}>Beyond Code</PersonalTitle>
        <PersonalGrid>
          {personalItems.map((item, index) => (
            <PersonalItem 
              key={index} 
              darkMode={darkMode}
              onMouseMove={(e) => handleMouseMove(e, `personal-${index}`)}
              onMouseLeave={() => handleMouseLeave(`personal-${index}`)}
              style={{
                '--mouse-x': `${mousePositions[`personal-${index}`]?.x || 50}%`,
                '--mouse-y': `${mousePositions[`personal-${index}`]?.y || 50}%`,
              } as React.CSSProperties}
            >
              <PersonalEmoji>{item.emoji}</PersonalEmoji>
              <PersonalLabel darkMode={darkMode}>{item.title}</PersonalLabel>
              <PersonalDesc darkMode={darkMode}>{item.description}</PersonalDesc>
            </PersonalItem>
          ))}
        </PersonalGrid>
      </PersonalSection>
    </AboutContainer>
  );
};

export default About;
