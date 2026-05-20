import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { 
  SiGithubpages,
  SiGithubactions,
  SiReact, 
  SiDocker, 
  SiGit,
  SiTerraform
} from 'react-icons/si';
import { 
  FaSyncAlt, 
  FaComments, 
  FaFileAlt, 
  FaVial 
} from 'react-icons/fa';

const ServicesContainer = styled.section<{ darkMode: boolean }>`
  padding: ${({ theme }) => theme.spacing[16]} 10%;
  background: ${({ theme, darkMode }) => darkMode ? theme.colors.background.default : theme.colors.background.elevated};
  color: ${({ theme }) => theme.colors.text.primary};
  transition: background-color ${({ theme }) => theme.transitions.base}, color ${({ theme }) => theme.transitions.base};
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 4rem;
`;

const Title = styled(motion.h2)`
  font-size: ${({ theme }) => theme.typography.fontSize['4xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing[4]};
  letter-spacing: -0.02em;
`;

const Subtitle = styled.p<{ darkMode: boolean }>`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  color: ${({ theme }) => theme.colors.text.secondary};
  max-width: 600px;
  margin: 0 auto;
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
`;

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
  align-items: stretch;
`;

const ServiceCard = styled(motion.div)<{ darkMode: boolean }>`
  background: ${({ theme, darkMode }) => darkMode ? theme.colors.gray[100] : theme.colors.gray[50]};
  padding: ${({ theme }) => theme.spacing[8]};
  border-radius: ${({ theme }) => theme.borderRadius['2xl']};
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: all ${({ theme }) => theme.transitions.base};
  
  &:hover {
    transform: translateY(-6px);
    box-shadow: ${({ theme }) => theme.shadows.xl};
    border-color: ${({ theme }) => theme.colors.primary[200]};
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
  transition: all ${({ theme }) => theme.transitions.fast};
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  will-change: transform;
  transform: translateZ(0);
  
  svg {
    width: 32px;
    height: 32px;
    color: white;
    transition: transform ${({ theme }) => theme.transitions.fast};
  }
  
  ${ServiceCard}:hover & {
    transform: translateY(-1px) rotate(3deg) translateZ(0);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
    
    svg {
      transform: scale(1.05);
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
  background: ${({ theme, darkMode }) => darkMode ? theme.colors.gray[100] : theme.colors.gray[50]};
  padding: ${({ theme }) => theme.spacing[10]};
  border-radius: ${({ theme }) => theme.borderRadius['2xl']};
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  text-align: center;
  position: relative;
  overflow: hidden;
  transition: all ${({ theme }) => theme.transitions.base};
  
  &:hover {
    box-shadow: ${({ theme }) => theme.shadows.lg};
    border-color: ${({ theme }) => theme.colors.primary[200]};
  }
`;

const WorkStyleTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing[8]};
`;

const WorkStyleGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  margin: 0 auto;
`;

const WorkStyleItem = styled(motion.div)<{ darkMode: boolean }>`
  text-align: center;
  padding: ${({ theme }) => theme.spacing[6]};
  background: ${({ theme, darkMode }) => darkMode ? theme.colors.background.elevated : theme.colors.background.default};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  transition: all ${({ theme }) => theme.transitions.base};
  position: relative;
  overflow: hidden;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: ${({ theme }) => theme.shadows.md};
    border-color: ${({ theme }) => theme.colors.primary[300]};
  }
`;

const WorkStyleIcon = styled.div<{ color: string }>`
  width: 56px;
  height: 56px;
  background: linear-gradient(135deg, ${props => props.color}, ${props => props.color}dd);
  border-radius: ${({ theme }) => theme.borderRadius['2xl']};
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto ${({ theme }) => theme.spacing[4]};
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.1);
  transition: all ${({ theme }) => theme.transitions.base};
  
  svg {
    width: 26px;
    height: 26px;
    color: white;
  }
  
  ${WorkStyleItem}:hover & {
    transform: scale(1.05) rotate(3deg);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
  }
`;

const WorkStyleLabel = styled.h4`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing[2]};
`;

const WorkStyleDesc = styled.p`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
  margin: 0;
`;

const services = [
  {
    icon: SiGithubpages,
    color: '#0078d4',
    title: 'Azure Static Web Apps',
    description: 'Using Azure Static Web Apps as the primary hosting direction for this portfolio and related learning projects.',
    tech: ['Azure', 'Static Web Apps', 'Dev Environment', 'Prod Environment']
  },
  {
    icon: SiTerraform,
    color: '#0ea5e9',
    title: 'Infrastructure as Code (Bicep)',
    description: 'Defining cloud resources through Bicep templates so infrastructure is versioned, reviewable, and repeatable.',
    tech: ['Bicep', 'IaC', 'Resource Definitions', 'Environment Parity']
  },
  {
    icon: SiGithubactions,
    color: '#2088ff',
    title: 'CI/CD with GitHub Actions',
    description: 'Automating checks and deployment steps to keep delivery consistent across branches and environments.',
    tech: ['GitHub Actions', 'Type Check', 'Build Validation', 'Deployment Flow']
  },
  {
    icon: SiReact,
    color: '#61dafb',
    title: 'Frontend Delivery',
    description: 'Building and maintaining React + TypeScript interfaces with emphasis on clarity, performance, and maintainability.',
    tech: ['React', 'TypeScript', 'styled-components', 'Webpack']
  },
  {
    icon: SiGit,
    color: '#f05032',
    title: 'Documentation Discipline',
    description: 'Keeping implementation notes and project context clear enough for recruiters, teammates, and future maintenance.',
    tech: ['README', 'Architecture Notes', 'Change History', 'Operational Context']
  },
  {
    icon: SiDocker,
    color: '#0db7ed',
    title: 'Practical Tooling',
    description: 'Using Docker and other tooling when helpful, while keeping Azure Static Web Apps as the primary deployment story.',
    tech: ['Docker Basics', 'Local Tooling', 'Build Consistency', 'Learning by Doing']
  }
];

const workStyleItems = [
  {
    icon: FaSyncAlt,
    color: '#10b981',
    title: 'Agile/Scrum',
    description: 'Iterative development with regular feedback and delivery'
  },
  {
    icon: FaComments,
    color: '#f59e0b',
    title: 'Clear Communication',
    description: 'Regular updates and collaborative decision-making'
  },
  {
    icon: FaFileAlt,
    color: '#3b82f6',
    title: 'Documentation First',
    description: 'Well-documented code and architectural decisions'
  },
  {
    icon: FaVial,
    color: '#06b6d4',
    title: 'Testing Focused',
    description: 'Unit tests, integration tests, and quality assurance'
  }
];

interface ServicesProps {
  darkMode: boolean;
}

const Services: React.FC<ServicesProps> = React.memo(({ darkMode }) => {

  return (
    <ServicesContainer darkMode={darkMode} id="services">
      <Header>
        <Title 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        >
          Current Focus Areas
        </Title>
        <Subtitle darkMode={darkMode}>
          This portfolio tracks my transition into Junior Cloud/DevOps on Azure.
          The focus is practical delivery habits: infrastructure as code, CI/CD,
          environment separation, and clear documentation.
        </Subtitle>
      </Header>

      <ServicesGrid>
        {services.map((service, index) => (
          <ServiceCard
            key={index}
            darkMode={darkMode}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: index * 0.1, ease: [0.4, 0, 0.2, 1] }}
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

      <WorkStyle darkMode={darkMode}>
        <WorkStyleTitle>
          How I Work
        </WorkStyleTitle>
        <WorkStyleGrid>
          {workStyleItems.map((item, index) => (
            <WorkStyleItem 
              key={index} 
              darkMode={darkMode}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <WorkStyleIcon color={item.color}>
                <item.icon />
              </WorkStyleIcon>
              <WorkStyleLabel>
                {item.title}
              </WorkStyleLabel>
              <WorkStyleDesc>
                {item.description}
              </WorkStyleDesc>
            </WorkStyleItem>
          ))}
        </WorkStyleGrid>
      </WorkStyle>
    </ServicesContainer>
  );
});

Services.displayName = 'Services';

export default Services;
