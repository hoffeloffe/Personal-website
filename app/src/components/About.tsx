import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const AboutContainer = styled.section<{ $darkMode: boolean }>`
  padding: ${({ theme }) => theme.spacing[16]} 10%;
  background: ${({ theme, $darkMode }) => $darkMode ? theme.colors.background.default : theme.colors.background.elevated};
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
  text-align: center;
  letter-spacing: -0.02em;
`;

const Subtitle = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  color: ${({ theme }) => theme.colors.text.secondary};
  max-width: 600px;
  margin: 0 auto;
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
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

const BioCard = styled(motion.div)<{ $darkMode: boolean }>`
  background: ${({ theme, $darkMode }) => $darkMode ? theme.colors.gray[100] : theme.colors.gray[50]};
  padding: ${({ theme }) => theme.spacing[10]};
  border-radius: ${({ theme }) => theme.borderRadius['2xl']};
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  transition: all ${({ theme }) => theme.transitions.base};
  
  &:hover {
    box-shadow: ${({ theme }) => theme.shadows.lg};
    border-color: ${({ theme }) => theme.colors.primary[200]};
  }
`;

const BioTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0 0 ${({ theme }) => theme.spacing[6]};
`;

const BioText = styled.p`
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
  margin-bottom: ${({ theme }) => theme.spacing[4]};
`;

const TimelineSection = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 4rem;
`;

const TimelineCard = styled(motion.div)<{ $darkMode: boolean }>`
  background: ${({ theme, $darkMode }) => $darkMode ? theme.colors.gray[100] : theme.colors.gray[50]};
  padding: ${({ theme }) => theme.spacing[8]};
  border-radius: ${({ theme }) => theme.borderRadius['2xl']};
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  position: relative;
  transition: all ${({ theme }) => theme.transitions.base};
  margin-bottom: ${({ theme }) => theme.spacing[6]};
  border-left: 3px solid ${({ theme }) => theme.colors.primary[500]};
  
  &:hover {
    box-shadow: ${({ theme }) => theme.shadows.md};
    transform: translateX(8px);
    border-left-color: ${({ theme }) => theme.colors.accent[500]};
  }
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const TimelineDate = styled.span`
  color: ${({ theme }) => theme.colors.primary[500]};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  margin-bottom: ${({ theme }) => theme.spacing[2]};
  display: block;
`;

const TimelineTitle = styled.h4`
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing[1]};
`;

const TimelineCompany = styled.p`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  margin-bottom: ${({ theme }) => theme.spacing[2]};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
`;

const TimelineDescription = styled.p`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
  margin: 0;
`;


const timeline = [
   {
    date: '2024 - 2025',
    title: 'Software Developer (Frontend Focus)',
    company: 'PICIT',
    description: 'Built and maintained React/TypeScript UI features and collaborated on practical improvements to usability and maintainability.'
  },
  {
    date: '2023 - 2024',
    title: 'Application Developer',
    company: 'PICIT',
    description: 'Worked with Progress 4GL and integrations in business systems, with focus on stable delivery and everyday support tasks.'
  },

  {
    date: '2020 - 2023',
    title: 'Computer Science Degree',
    company: 'Dania',
    description: 'Academy Profession degree in Computer Science, with foundation in software development, data structures, and databases.'
  }
];


interface AboutProps {
  darkMode: boolean;
}

const About: React.FC<AboutProps> = React.memo(({ darkMode }) => {
  return (
    <AboutContainer $darkMode={darkMode} id="about">
      <Header>
        <Title 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        >
          About Me
        </Title>
        <Subtitle>
          Software Developer with practical product experience, currently transitioning into
          Junior Cloud/DevOps on Azure through hands-on infrastructure and delivery work.
        </Subtitle>
      </Header>

      <ContentGrid>
        <BioSection
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <BioCard $darkMode={darkMode}>
            <BioTitle>My Story</BioTitle>
            <BioText>
              I have a computer science background from Dania and hands-on development experience
              at PICIT. My core foundation is application development, with growing focus on cloud
              delivery practices that are useful in real teams.
            </BioText>
            <BioText>
              Right now I am intentionally building Azure skills around Static Web Apps,
              infrastructure as code with Bicep, and GitHub Actions CI/CD. This portfolio is my
              main public case study for that transition.
            </BioText>
            <BioText>
              I value clear documentation, small repeatable improvements, and honest delivery
              claims over broad marketing language.
            </BioText>
          </BioCard>
        </BioSection>

        <TimelineSection
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <BioCard $darkMode={darkMode}>
            <BioTitle>Career Journey</BioTitle>
            {timeline.map((item, index) => (
              <TimelineCard 
                key={index} 
                $darkMode={darkMode}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <TimelineDate>{item.date}</TimelineDate>
                <TimelineTitle>{item.title}</TimelineTitle>
                <TimelineCompany>{item.company}</TimelineCompany>
                <TimelineDescription>{item.description}</TimelineDescription>
              </TimelineCard>
            ))}
          </BioCard>
        </TimelineSection>
      </ContentGrid>

    </AboutContainer>
  );
});

About.displayName = 'About';

export default About;
