import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import styled from 'styled-components';

const AboutContainer = styled.section`
  padding: 5rem 2rem;
  background-color: #f5f5f5;
  text-align: center;

  h2 {
    font-size: 2.5rem;
    color: #333;
    margin-bottom: 1rem;
  }

  p {
    font-size: 1.2rem;
    color: #555;
    line-height: 1.5;
  }
`;

export const About = () => {
  useEffect(() => {
    gsap.from('.about-text', { opacity: 0, y: 50, duration: 1, delay: 0.5 });
  }, []);

  return (
    <AboutContainer id="about">
      <h2>About Me</h2>
      <p className="about-text">
        I'm a passionate web developer specializing in frontend technologies like React and TypeScript. I love building clean and scalable user interfaces and crafting smooth experiences for users.
      </p>
    </AboutContainer>
  );
};
