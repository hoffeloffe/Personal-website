import React, { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

interface Skill {
  name: string;
  percentage: number;
  color: string;
  darkColor?: string;
  category?: string;
  description?: string;
  tags?: string[];
}

interface ProgressBarProps {
  skills: Skill[];
  title?: string;
  darkMode?: boolean;
  animate?: boolean;
}

// CSS styles for animation
const shimmerKeyframes = `
  @keyframes shimmer {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }
`;

const glowKeyframes = `
  @keyframes glow {
    0% { box-shadow: 0 0 5px rgba(0, 119, 181, 0.5); }
    50% { box-shadow: 0 0 20px rgba(0, 119, 181, 0.8); }
    100% { box-shadow: 0 0 5px rgba(0, 119, 181, 0.5); }
  }
`;

const progressKeyframes = (width: number) => `
  @keyframes progress-${width} {
    0% { width: 0; }
    100% { width: ${width}%; }
  }
`;



// Custom skill category component with tabs
const SkillsCategories = ({ categories, activeCategory, setActiveCategory, darkMode }) => {
  return (
    <motion.div 
      style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '1rem',
        marginBottom: '3rem',
        flexWrap: 'wrap'
      }}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {categories.map((category, index) => (
        <motion.button
          key={category}
          onClick={() => setActiveCategory(category)}
          style={{
            padding: '0.6rem 1.2rem',
            background: activeCategory === category 
              ? 'rgb(0, 119, 181)' 
              : darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
            border: 'none',
            borderRadius: '30px',
            color: activeCategory === category 
              ? '#ffffff' 
              : darkMode ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)',
            cursor: 'pointer',
            fontWeight: 500,
            transition: 'all 0.3s ease',
            fontSize: '0.9rem'
          }}
          whileHover={{ 
            scale: 1.05,
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
          }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          {category}
        </motion.button>
      ))}
    </motion.div>
  );
};

// Custom skill card component with animations
const SkillCard = ({ skill, index, darkMode }) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: false, amount: 0.3 });

  return (
    <motion.div
      ref={cardRef}
      style={{
        background: darkMode ? '#2a2a2a' : '#ffffff',
        borderRadius: '12px',
        padding: '1.5rem',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        position: 'relative',
        overflow: 'hidden'
      }}
      initial={{ opacity: 0, y: 50, rotateX: -10 }}
      animate={isInView ? { 
        opacity: 1, 
        y: 0, 
        rotateX: 0,
        transition: { 
          type: 'spring', 
          damping: 12, 
          stiffness: 100, 
          delay: index * 0.1 
        }
      } : { opacity: 0, y: 50, rotateX: -10 }}
      whileHover={{ 
        y: -10, 
        boxShadow: '0 10px 25px rgba(0, 119, 181, 0.3)',
        transition: { duration: 0.3 }
      }}
      whileTap={{ scale: 0.98 }}
    >
      <motion.div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          height: '4px',
          background: 'rgb(0, 119, 181)',
          width: '100%',
          transformOrigin: 'left'
        }}
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ delay: index * 0.1 + 0.3, duration: 0.8 }}
      />

      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'start',
        marginBottom: '1.5rem'
      }}>
        <h3 style={{
          margin: 0,
          color: darkMode ? '#ffffff' : '#1a1a1a',
          fontSize: '1.3rem',
          fontWeight: 600
        }}>
          {skill.name}
        </h3>
        <motion.div
          style={{
            background: 'rgb(0, 119, 181)',
            color: 'white',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 'bold',
            fontSize: '1rem'
          }}
          initial={{ scale: 0, rotate: -45 }}
          animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -45 }}
          transition={{ delay: index * 0.1 + 0.2, type: 'spring', stiffness: 200 }}
        >
          {skill.percentage}%
        </motion.div>
      </div>

      <div style={{
        height: '10px',
        backgroundColor: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
        borderRadius: '5px',
        overflow: 'hidden',
        position: 'relative',
        marginBottom: '1.2rem'
      }}>
        <motion.div 
          style={{
            height: '100%',
            borderRadius: '5px',
            background: skill.color || 'rgb(0, 119, 181)',
            width: `${skill.percentage || 0}%`,
            position: 'relative'
          }}
          initial={{ width: 0 }}
          animate={isInView ? { width: `${skill.percentage}%` } : { width: 0 }}
          transition={{ delay: index * 0.1 + 0.4, duration: 1, ease: 'easeOut' }}
        >
          <motion.div 
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0) 100%)'
            }}
            animate={{ x: ['0%', '100%'] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
          />
        </motion.div>
      </div>

      <p style={{
        margin: '0 0 1rem 0',
        color: darkMode ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)',
        fontSize: '0.95rem',
        lineHeight: 1.5
      }}>
        {skill.description || `Experienced with ${skill.name} development including best practices and performance optimization.`}
      </p>

      {skill.tags && (
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.5rem',
          marginTop: 'auto'
        }}>
          {skill.tags.map((tag, tagIndex) => (
            <motion.span
              key={tag}
              style={{
                padding: '0.2rem 0.5rem',
                backgroundColor: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
                borderRadius: '4px',
                fontSize: '0.8rem',
                color: darkMode ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)'
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ delay: index * 0.1 + 0.5 + (tagIndex * 0.1), duration: 0.3 }}
            >
              {tag}
            </motion.span>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export function ProgressBar({ 
  skills, 
  title = "My Skills", 
  darkMode = false,
  animate = true
}: ProgressBarProps) {
  if (!skills || skills.length === 0) {
    return null;
  }

  // Enhanced skill data with categories and descriptions
  const enhancedSkills = skills.map(skill => ({
    ...skill,
    category: skill.category || 'Frontend',
    description: skill.description || `Experienced with ${skill.name} for building robust, scalable applications.`,
    tags: skill.tags || [`${skill.name} Development`, 'Best Practices']
  }));

  // Extract unique categories
  const uniqueCategories = Array.from(new Set(enhancedSkills.map(skill => skill.category || '')));
  const allCategories = ['All', ...uniqueCategories];
  const [activeCategory, setActiveCategory] = useState('All');
  
  // Filter skills by category
  const filteredSkills = activeCategory === 'All' 
    ? enhancedSkills 
    : enhancedSkills.filter(skill => skill.category === activeCategory);

  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.1 });
  
  return (
    <motion.div 
      ref={sectionRef}
      style={{
        width: '100%',
        margin: '0 auto'
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <style>
        {shimmerKeyframes}
        {glowKeyframes}
        {enhancedSkills.map(skill => progressKeyframes(skill.percentage || 0)).join('')}
      </style>
      
      {title && (
        <motion.div 
          style={{ textAlign: 'center', marginBottom: '2rem' }}
          initial={{ opacity: 0, y: -30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -30 }}
          transition={{ duration: 0.7, type: 'spring', stiffness: 100 }}
        >
          <h2 style={{
            color: darkMode ? '#ffffff' : '#1a1a1a',
            fontSize: '2.2rem',
            position: 'relative',
            marginBottom: '0.5rem',
            display: 'inline-block',
          }}>
            {title}
          </h2>
          <motion.div 
            style={{
              height: '3px',
              width: '80px',
              background: 'rgb(0, 119, 181)',
              margin: '0 auto',
              marginTop: '1rem',
              borderRadius: '2px'
            }}
            initial={{ width: 0 }}
            animate={isInView ? { width: 80 } : { width: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          />
          <p style={{
            color: darkMode ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)',
            maxWidth: '700px',
            margin: '1.5rem auto',
            lineHeight: 1.6,
            fontSize: '1.1rem'
          }}>
            My technical expertise spans multiple domains and technologies, with a focus on creating
            efficient, scalable, and user-friendly applications.
          </p>
        </motion.div>
      )}
      
      <SkillsCategories 
        categories={allCategories} 
        activeCategory={activeCategory} 
        setActiveCategory={setActiveCategory} 
        darkMode={darkMode} 
      />
      
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '2rem'
          }}
        >
          {filteredSkills.map((skill, index) => (
            <SkillCard 
              key={`${skill.name}-${index}`}
              skill={skill} 
              index={index} 
              darkMode={darkMode} 
            />
          ))}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}