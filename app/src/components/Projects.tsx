import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import styled from 'styled-components';

const ProjectsContainer = styled.section`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  padding: 5rem 2rem;
  background-color: #fff;

  .project-card {
    background: #f7f7f7;
    margin: 1rem;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    width: 30%;
    text-align: center;
    opacity: 0;
    transform: translateY(100px);
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-10px);
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
    }

    h3 {
      font-size: 1.5rem;
      color: #333;
      margin-bottom: 1rem;
    }

    p {
      color: #777;
      font-size: 1rem;
    }
  }
`;

export const Projects = () => {
  useEffect(() => {
    gsap.from('.project-card', { opacity: 0, y: 50, stagger: 0.2, duration: 1 });
  }, []);

  return (
    <ProjectsContainer id="projects">
      <div className="project-card">
        <h3>Project 1</h3>
        <p>Description of the project.</p>
      </div>
      <div className="project-card">
        <h3>Project 2</h3>
        <p>Description of the project.</p>
      </div>
      <div className="project-card">
        <h3>Project 3</h3>
        <p>Description of the project.</p>
      </div>
    </ProjectsContainer>
  );
};
