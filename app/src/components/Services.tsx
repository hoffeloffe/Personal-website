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
  SiFigma
} from 'react-icons/si';

const ServicesContainer = styled.section<{ darkMode: boolean }>`
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

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
  align-items: stretch;
`;

const ServiceCard = styled(motion.div)<{ darkMode: boolean }>`
  background: ${props => props.darkMode ? '#2a2a2a' : '#f8f9fa'};
  padding: 2rem;
  border-radius: 16px;
  border: 1px solid ${props => props.darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'};
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
      rgba(0, 212, 255, 0.15),
      rgba(0, 153, 255, 0.05),
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

const ServiceIcon = styled.div<{ color: string }>`
  width: 64px;
  height: 64px;
  background: linear-gradient(135deg, ${props => props.color}, ${props => props.color}dd);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  
  svg {
    width: 32px;
    height: 32px;
    color: white;
    transition: transform 0.3s ease;
  }
  
  ${ServiceCard}:hover & {
    transform: translateY(-2px) rotate(5deg);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
    
    svg {
      transform: scale(1.1);
    }
  }
`;

const ServiceTitle = styled.h3<{ darkMode: boolean }>`
  font-size: 1.5rem;
  color: ${props => props.darkMode ? '#ffffff' : '#1a1a1a'};
  margin-bottom: 1rem;
`;

const ServiceDescription = styled.p<{ darkMode: boolean }>`
  color: ${props => props.darkMode ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.7)'};
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: auto;
`;

const TechBadge = styled.span<{ darkMode: boolean }>`
  background: ${props => props.darkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'};
  color: ${props => props.darkMode ? '#ffffff' : '#1a1a1a'};
  padding: 0.4rem 0.9rem;
  border-radius: 24px;
  font-size: 0.85rem;
  font-weight: 500;
  border: 1px solid ${props => props.darkMode ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.1)'};
  transition: all 0.2s ease;
  
  &:hover {
    background: ${props => props.darkMode ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.1)'};
    transform: translateY(-1px);
  }
`;

const WorkStyle = styled.div<{ darkMode: boolean }>`
  background: ${props => props.darkMode ? '#2a2a2a' : '#f8f9fa'};
  padding: 0rem 2.5rem 2.5rem;
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
      rgba(0, 212, 255, 0.06),
      rgba(0, 153, 255, 0.02),
      transparent 40%
    );
    opacity: 0;
    transition: opacity 0.3s ease;
    pointer-events: none;
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

const WorkStyleTitle = styled.h3<{ darkMode: boolean }>`
  font-size: 1.8rem;
  color: ${props => props.darkMode ? '#ffffff' : '#1a1a1a'};
  margin-bottom: 2rem;
`;

const WorkStyleGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  margin: 0 auto;
`;

const WorkStyleItem = styled.div<{ darkMode: boolean }>`
  text-align: center;
  padding: 1.5rem;
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
    &::before {
      opacity: 1;
    }
  }
  
  > * {
    position: relative;
    z-index: 1;
  }
`;

const WorkStyleIcon = styled.div<{ color: string }>`
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, ${props => props.color}, ${props => props.color}88);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
  
  svg {
    width: 25px;
    height: 25px;
    color: white;
  }
`;

const WorkStyleLabel = styled.h4<{ darkMode: boolean }>`
  font-size: 1.1rem;
  color: ${props => props.darkMode ? '#ffffff' : '#1a1a1a'};
  margin-bottom: 0.5rem;
`;

const WorkStyleDesc = styled.p<{ darkMode: boolean }>`
  color: ${props => props.darkMode ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.7)'};
  font-size: 0.9rem;
  line-height: 1.5;
`;

const services = [
  {
    icon: SiReact,
    color: '#61dafb',
    title: 'Frontend Development',
    description: 'Building responsive, performant, and accessible user interfaces with modern React ecosystems.',
    tech: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Framer Motion']
  },
  {
    icon: SiSharp,
    color: '#68217a',
    title: 'Backend Development',
    description: 'Creating robust APIs and services with C#/.NET and Node.js, focusing on scalability and security.',
    tech: ['C#', '.NET Core', 'Node.js', 'Entity Framework', 'REST/GraphQL']
  },
  {
    icon: SiPostgresql,
    color: '#336791',
    title: 'Database Design',
    description: 'Designing and optimizing database schemas for both SQL and NoSQL solutions.',
    tech: ['PostgreSQL', 'MongoDB', 'Entity Framework', 'Database Optimization']
  },
  {
    icon: SiDocker,
    color: '#0db7ed',
    title: 'DevOps & Deployment',
    description: 'Containerizing applications and setting up CI/CD pipelines for reliable deployments.',
    tech: ['Docker', 'Kubernetes', 'CI/CD', 'Cloud Deployment']
  },
  {
    icon: SiGit,
    color: '#f05032',
    title: 'Code Review & Consulting',
    description: 'Providing code reviews, architecture guidance, and best practices for development teams.',
    tech: ['Code Review', 'Architecture', 'Best Practices', 'Mentoring']
  },
  {
    icon: SiReact,
    color: '#61dafb',
    title: 'Full-Stack Projects',
    description: 'Taking projects from concept to deployment with end-to-end development expertise.',
    tech: ['End-to-End Development', 'System Design', 'Testing', 'Documentation']
  }
];

const workStyleItems = [
  {
    icon: SiGit,
    color: '#f05032',
    title: 'Agile/Scrum',
    description: 'Iterative development with regular feedback and delivery'
  },
  {
    icon: SiFigma,
    color: '#f24e1e',
    title: 'Clear Communication',
    description: 'Regular updates and collaborative decision-making'
  },
  {
    icon: SiGit,
    color: '#f05032',
    title: 'Documentation First',
    description: 'Well-documented code and architectural decisions'
  },
  {
    icon: SiReact,
    color: '#61dafb',
    title: 'Testing Focused',
    description: 'Unit tests, integration tests, and quality assurance'
  }
];

interface ServicesProps {
  darkMode: boolean;
}

const Services: React.FC<ServicesProps> = ({ darkMode }) => {
  const [mousePositions, setMousePositions] = useState<Record<string, { x: number; y: number }>>({});

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number | string) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    setMousePositions(prev => ({
      ...prev,
      [typeof index === 'number' ? `card-${index}` : index]: { x, y }
    }));
  };

  const handleMouseLeave = (index: number | string) => {
    setMousePositions(prev => ({
      ...prev,
      [typeof index === 'number' ? `card-${index}` : index]: { x: 50, y: 50 }
    }));
  };

  return (
    <ServicesContainer darkMode={darkMode} id="services">
      <Header>
        <Title 
          darkMode={darkMode}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          What I Offer
        </Title>
        <Subtitle darkMode={darkMode}>
          I help teams ship fast, clean, and scalable web applications. 
          From frontend interfaces to backend APIs and deployment pipelines, 
          I provide end-to-end development expertise.
        </Subtitle>
      </Header>

      <ServicesGrid>
        {services.map((service, index) => (
          <ServiceCard
            key={index}
            darkMode={darkMode}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            onMouseMove={(e) => handleMouseMove(e, index)}
            onMouseLeave={() => handleMouseLeave(index)}
            style={{
              '--mouse-x': `${mousePositions[`card-${index}`]?.x || 50}%`,
              '--mouse-y': `${mousePositions[`card-${index}`]?.y || 50}%`,
            } as React.CSSProperties}
          >
            <ServiceIcon color={service.color}>
              <service.icon />
            </ServiceIcon>
            <ServiceTitle darkMode={darkMode}>
              {service.title}
            </ServiceTitle>
            <ServiceDescription darkMode={darkMode}>
              {service.description}
            </ServiceDescription>
            <TechStack>
              {service.tech.map((tech, techIndex) => (
                <TechBadge key={techIndex} darkMode={darkMode}>
                  {tech}
                </TechBadge>
              ))}
            </TechStack>
          </ServiceCard>
        ))}
      </ServicesGrid>

      <WorkStyle 
        darkMode={darkMode}
        onMouseMove={(e) => handleMouseMove(e, 'work-style')}
        onMouseLeave={() => handleMouseLeave('work-style')}
        style={{
          '--mouse-x': `${mousePositions['work-style']?.x || 50}%`,
          '--mouse-y': `${mousePositions['work-style']?.y || 50}%`,
        } as React.CSSProperties}
      >
        <WorkStyleTitle darkMode={darkMode}>
          How I Work
        </WorkStyleTitle>
        <WorkStyleGrid>
          {workStyleItems.map((item, index) => (
            <WorkStyleItem 
              key={index} 
              darkMode={darkMode}
              onMouseMove={(e) => handleMouseMove(e, `work-item-${index}`)}
              onMouseLeave={() => handleMouseLeave(`work-item-${index}`)}
              style={{
                '--mouse-x': `${mousePositions[`work-item-${index}`]?.x || 50}%`,
                '--mouse-y': `${mousePositions[`work-item-${index}`]?.y || 50}%`,
              } as React.CSSProperties}
            >
              <WorkStyleIcon color={item.color}>
                <item.icon />
              </WorkStyleIcon>
              <WorkStyleLabel darkMode={darkMode}>
                {item.title}
              </WorkStyleLabel>
              <WorkStyleDesc darkMode={darkMode}>
                {item.description}
              </WorkStyleDesc>
            </WorkStyleItem>
          ))}
        </WorkStyleGrid>
      </WorkStyle>
    </ServicesContainer>
  );
};

export default Services;
