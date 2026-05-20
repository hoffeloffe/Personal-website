import React, { useRef } from 'react';
import styled from 'styled-components';
import { motion, useInView } from 'framer-motion';
import { IconType } from 'react-icons';

interface SkillLogosProps {
  darkMode: boolean;
  skills: SkillItem[];
}

interface SkillItem {
  name: string;
  icon: IconType;
  color: string;
  category: string;
  description: string;
  tags: string[];
}

const SkillsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing[8]};
  margin: 0 auto;
  max-width: 1200px;
`;

const SkillCard = styled(motion.div)<{ darkMode: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 170px;
  padding: ${({ theme }) => theme.spacing[8]};
  border-radius: ${({ theme }) => theme.borderRadius['2xl']};
  background-color: ${({ theme, darkMode }) => darkMode ? theme.colors.gray[100] : theme.colors.background.elevated};
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  transition: all ${({ theme }) => theme.transitions.base};
  
  &:hover {
    transform: translateY(-6px);
    box-shadow: ${({ theme }) => theme.shadows.xl};
    border-color: ${({ theme }) => theme.colors.primary[300]};
  }
`;

const IconWrapper = styled.div`
  font-size: 4rem;
  margin-bottom: ${({ theme }) => theme.spacing[4]};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform ${({ theme }) => theme.transitions.base};
  
  ${SkillCard}:hover & {
    transform: scale(1.1);
  }
`;

const SkillName = styled.h3`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0 0 ${({ theme }) => theme.spacing[3]} 0;
  text-align: center;
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing[2]};
`;

const Tag = styled.span<{ darkMode: boolean }>`
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  padding: ${({ theme }) => theme.spacing[1]} ${({ theme }) => theme.spacing[2]};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background-color: ${({ theme, darkMode }) => darkMode ? theme.colors.primary[900] : theme.colors.primary[50]};
  color: ${({ theme, darkMode }) => darkMode ? theme.colors.primary[200] : theme.colors.primary[700]};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`;

const CategoryFilter = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
`;

const CategoryButton = styled.button<{ active: boolean; darkMode: boolean }>`
  padding: ${({ theme }) => theme.spacing[2]} ${({ theme }) => theme.spacing[5]};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  border: 1px solid ${({ theme, active }) => active ? 'transparent' : theme.colors.border.light};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  background-color: ${({ theme, active, darkMode }) => active 
    ? theme.colors.primary[500] 
    : darkMode ? theme.colors.gray[100] : theme.colors.background.elevated};
  color: ${({ theme, active }) => active 
    ? theme.colors.text.inverse 
    : theme.colors.text.primary};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.base};
  
  &:hover {
    background-color: ${({ theme, active }) => active 
      ? theme.colors.primary[600] 
      : theme.colors.primary[50]};
    border-color: ${({ theme, active }) => active ? 'transparent' : theme.colors.primary[200]};
  }
`;

const SkillLogos: React.FC<SkillLogosProps> = ({ darkMode, skills }) => {
  const [activeCategory, setActiveCategory] = React.useState<string>('All');
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.2 });
  
  const categories = ['All', ...Array.from(new Set(skills.map(skill => skill.category)))];
  
  const filteredSkills = activeCategory === 'All' 
    ? skills 
    : skills.filter(skill => skill.category === activeCategory);
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };
  
  return (
    <div ref={containerRef}>
      <CategoryFilter>
        {categories.map((category, index) => (
          <CategoryButton
            key={index}
            active={activeCategory === category}
            darkMode={darkMode}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </CategoryButton>
        ))}
      </CategoryFilter>
      
      <SkillsContainer
        as={motion.div}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {filteredSkills.map((skill, index) => (
          <SkillCard 
            key={index}
            darkMode={darkMode}
            variants={itemVariants}
          >
            <IconWrapper style={{ color: skill.color }}>
              <skill.icon />
            </IconWrapper>
            <SkillName>{skill.name}</SkillName>
            <TagsContainer>
              {skill.tags.slice(0, 2).map((tag, tagIndex) => (
                <Tag key={tagIndex} darkMode={darkMode}>{tag}</Tag>
              ))}
            </TagsContainer>
          </SkillCard>
        ))}
      </SkillsContainer>
    </div>
  );
};

export default SkillLogos;
