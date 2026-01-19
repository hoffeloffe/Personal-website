import React, { useRef } from 'react';
import styled from 'styled-components';
import { motion, useInView } from 'framer-motion';
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
  gap: 2.5rem;
  margin: 0 auto;
  max-width: 1200px;
`;

const SkillCard = styled(motion.div)<{ darkMode: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 150px;
  padding: 1.5rem;
  border-radius: 12px;
  background-color: ${props => props.darkMode ? '#1a1a1a' : '#ffffff'};
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 12px 25px rgba(0, 0, 0, 0.15);
  }
`;

const IconWrapper = styled.div`
  font-size: 3.5rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SkillName = styled.h3<{ darkMode: boolean }>`
  font-size: 1.1rem;
  font-weight: 600;
  color: ${props => props.darkMode ? '#ffffff' : '#1a1a1a'};
  margin: 0;
  text-align: center;
`;

const SkillDescription = styled.p<{ darkMode: boolean }>`
  font-size: 0.9rem;
  color: ${props => props.darkMode ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)'};
  text-align: center;
  margin-top: 0.5rem;
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const Tag = styled.span<{ darkMode: boolean }>`
  font-size: 0.7rem;
  padding: 0.3rem 0.6rem;
  border-radius: 20px;
  background-color: ${props => props.darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'};
  color: ${props => props.darkMode ? 'rgba(255,255,255,0.9)' : 'rgba(0,0,0,0.8)'};
`;

const CategoryFilter = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
`;

const CategoryButton = styled.button<{ active: boolean; darkMode: boolean }>`
  padding: 0.5rem 1.2rem;
  border-radius: 30px;
  border: none;
  font-size: 0.9rem;
  font-weight: 500;
  background-color: ${props => props.active 
    ? 'rgb(0, 119, 181)' 
    : props.darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'};
  color: ${props => props.active 
    ? '#ffffff' 
    : props.darkMode ? 'rgba(255,255,255,0.9)' : 'rgba(0,0,0,0.8)'};
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${props => props.active 
      ? 'rgb(0, 119, 181)' 
      : props.darkMode ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.1)'};
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
            <SkillName darkMode={darkMode}>{skill.name}</SkillName>
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
