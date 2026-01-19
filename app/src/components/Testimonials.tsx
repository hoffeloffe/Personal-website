import React, { useRef } from 'react';
import styled from 'styled-components';
import { motion, useInView } from 'framer-motion';

interface TestimonialProps {
  darkMode: boolean;
}

interface TestimonialItem {
  name: string;
  role: string;
  company: string;
  text: string;
  avatar?: string;
}

const TestimonialsSection = styled.section<{ darkMode: boolean }>`
  padding: 5rem 10%;
  background-color: ${props => props.darkMode ? '#2a2a2a' : '#f8f8f8'};
  
  @media (max-width: 768px) {
    padding: 4rem 5%;
  }
`;

const SectionTitle = styled.h2<{ darkMode: boolean }>`
  font-size: 2.2rem;
  text-align: center;
  margin-bottom: 3rem;
  color: ${props => props.darkMode ? '#ffffff' : '#1a1a1a'};
  position: relative;
  
  &:after {
    content: '';
    display: block;
    width: 50px;
    height: 3px;
    background: rgb(0, 119, 181);
    margin: 1rem auto 0;
  }
`;

const TestimonialsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const TestimonialCard = styled(motion.div)<{ darkMode: boolean }>`
  background-color: ${props => props.darkMode ? '#1a1a1a' : '#ffffff'};
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  height: 100%;
  position: relative;
  
  &:before {
    content: '"';
    position: absolute;
    top: 1rem;
    left: 1.5rem;
    font-size: 4rem;
    color: rgba(0, 119, 181, 0.2);
    font-family: Georgia, serif;
  }
`;

const TestimonialText = styled.p<{ darkMode: boolean }>`
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  color: ${props => props.darkMode ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.7)'};
  flex-grow: 1;
  padding-left: 1rem;
  position: relative;
  font-style: italic;
`;

const TestimonialAuthor = styled.div`
  display: flex;
  align-items: center;
  margin-top: auto;
`;

const Avatar = styled.div<{ src?: string }>`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-image: ${props => props.src ? `url(${props.src})` : 'linear-gradient(45deg, #0077b5, #00a0dc)'};
  background-size: cover;
  background-position: center;
  margin-right: 1rem;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  font-size: 1.2rem;
`;

const AuthorInfo = styled.div<{ darkMode: boolean }>`
  display: flex;
  flex-direction: column;
`;

const AuthorName = styled.span<{ darkMode: boolean }>`
  font-weight: 600;
  font-size: 1rem;
  color: ${props => props.darkMode ? '#ffffff' : '#1a1a1a'};
`;

const AuthorTitle = styled.span<{ darkMode: boolean }>`
  font-size: 0.85rem;
  color: ${props => props.darkMode ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.6)'};
`;

const Testimonials: React.FC<TestimonialProps> = ({ darkMode }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });
  
  const testimonials: TestimonialItem[] = [
    {
      name: "Sarah Johnson",
      role: "Project Manager",
      company: "TechSolutions Inc.",
      text: "Christian's work on our web application was exceptional. He delivered a clean, intuitive interface that perfectly aligned with our vision, and his communication throughout the project was outstanding.",
    },
    {
      name: "Michael Chen",
      role: "CTO",
      company: "StartupHub",
      text: "Working with Christian was a game-changer for our startup. His technical expertise and problem-solving abilities helped us launch our platform ahead of schedule. I highly recommend his services!",
    },
    {
      name: "Emma Rodriguez",
      role: "Marketing Director",
      company: "DigitalGrowth",
      text: "Christian transformed our outdated website into a modern, responsive platform that has significantly increased our conversion rates. His attention to detail and understanding of user experience is impressive.",
    }
  ];
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 }
    }
  };
  
  return (
    <TestimonialsSection darkMode={darkMode} ref={ref} id="testimonials">
      <SectionTitle darkMode={darkMode}>What People Say</SectionTitle>
      
      <TestimonialsGrid
        as={motion.div}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {testimonials.map((testimonial, index) => (
          <TestimonialCard 
            key={index}
            darkMode={darkMode}
            variants={itemVariants}
          >
            <TestimonialText darkMode={darkMode}>
              {testimonial.text}
            </TestimonialText>
            
            <TestimonialAuthor>
              <Avatar src={testimonial.avatar}>
                {!testimonial.avatar && testimonial.name.charAt(0)}
              </Avatar>
              <AuthorInfo darkMode={darkMode}>
                <AuthorName darkMode={darkMode}>{testimonial.name}</AuthorName>
                <AuthorTitle darkMode={darkMode}>
                  {testimonial.role}, {testimonial.company}
                </AuthorTitle>
              </AuthorInfo>
            </TestimonialAuthor>
          </TestimonialCard>
        ))}
      </TestimonialsGrid>
    </TestimonialsSection>
  );
};

export default Testimonials;
