import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faChrome } from "@fortawesome/free-brands-svg-icons";
import { faArrowRight, faTimes, faTools } from "@fortawesome/free-solid-svg-icons";

// Define styled components for responsive layout
const ProjectsSection = styled.section<{ darkMode: boolean }>`
  padding: ${({ theme }) => theme.spacing[24]} 10%;
  background: ${({ theme, darkMode }) => darkMode ? theme.colors.gray[50] : theme.colors.gray[50]};
  
  @media (max-width: 768px) {
    padding: ${({ theme }) => theme.spacing[16]} 5%;
  }
`;

const SectionTitle = styled(motion.h2)`
  font-size: ${({ theme }) => theme.typography.fontSize['4xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing[12]};
  letter-spacing: -0.02em;
`;

const ProjectFilter = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 3rem;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const FilterButton = styled(motion.button)<{ darkMode: boolean; active: boolean }>`
  padding: ${({ theme }) => theme.spacing[2]} ${({ theme }) => theme.spacing[5]};
  background: ${({ theme, active, darkMode }) => active ? theme.colors.primary[500] : darkMode ? theme.colors.gray[100] : theme.colors.background.elevated};
  color: ${({ theme, active }) => active ? theme.colors.text.inverse : theme.colors.text.primary};
  border: 1px solid ${({ theme, active }) => active ? 'transparent' : theme.colors.border.light};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.base};
  
  &:hover {
    background: ${({ theme, active }) => active ? theme.colors.primary[600] : theme.colors.primary[50]};
    border-color: ${({ theme, active }) => active ? 'transparent' : theme.colors.primary[200]};
  }
`;

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  
  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ProjectCard = styled(motion.div)<{ darkMode: boolean }>`
  background: ${({ theme, darkMode }) => darkMode ? theme.colors.gray[100] : theme.colors.background.elevated};
  border-radius: ${({ theme }) => theme.borderRadius['2xl']};
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.base};
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  transition: all ${({ theme }) => theme.transitions.base};
  
  &:hover {
    box-shadow: ${({ theme }) => theme.shadows.xl};
    transform: translateY(-6px);
    border-color: ${({ theme }) => theme.colors.primary[200]};
  }
`;

const ProjectImage = styled(motion.div)<{ imageUrl: string }>`
  width: 100%;
  height: 220px;
  background-image: url(${props => props.imageUrl});
  background-size: cover;
  background-position: center;
  position: relative;
  overflow: hidden;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.7) 100%);
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  &:hover:before {
    opacity: 1;
  }
`;

const ProjectBadge = styled.div<{ isFeatured?: boolean }>`
  position: absolute;
  top: 1rem;
  right: 1rem;
  padding: 0.3rem 0.8rem;
  background: ${props => props.isFeatured ? 'rgb(0, 119, 181)' : 'rgba(0,0,0,0.7)'};
  color: white;
  font-size: 0.8rem;
  font-weight: 500;
  border-radius: 20px;
  z-index: 2;
`;

const ProjectContent = styled.div<{ darkMode: boolean }>`
  padding: 1.5rem;
  color: ${props => props.darkMode ? '#ffffff' : '#1a1a1a'};
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: space-between;
`;

const ProjectTitle = styled(motion.h3)<{ darkMode: boolean }>`
  font-size: 1.3rem;
  margin-bottom: 0.75rem;
  color: ${props => props.darkMode ? '#ffffff' : '#1a1a1a'};
  transition: color 0.3s ease;
  position: relative;
  display: inline-block;
  
  &:after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -5px;
    width: 0;
    height: 2px;
    background: rgb(0, 119, 181);
    transition: width 0.3s ease;
  }
  
  ${ProjectCard}:hover &:after {
    width: 100%;
  }
`;

const ProjectDescription = styled.p<{ darkMode: boolean }>`
  color: ${props => props.darkMode ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)'};
  margin-bottom: 1.5rem;
  line-height: 1.6;
`;

const TechTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 1.5rem;
  gap: 0.5rem;
`;

const TechTag = styled.span<{ darkMode: boolean }>`
  display: inline-block;
  background: ${props => props.darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'};
  color: ${props => props.darkMode ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.7)'};
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 500;
`;

const ProjectActions = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: auto;
`;

const ActionButton = styled(motion.a)<{ darkMode: boolean; primary?: boolean; disabled?: boolean }>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
  padding: ${({ theme }) => theme.spacing[2]} ${({ theme }) => theme.spacing[4]};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  text-decoration: none;
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  background: ${({ theme, primary, disabled, darkMode }) => {
    if (disabled) return darkMode ? theme.colors.gray[700] : theme.colors.gray[200];
    if (primary) return `linear-gradient(135deg, ${theme.colors.primary[500]}, ${theme.colors.primary[600]})`;
    return darkMode ? theme.colors.gray[100] : theme.colors.gray[50];
  }};
  color: ${({ theme, primary, disabled }) => {
    if (disabled) return theme.colors.text.disabled;
    if (primary) return theme.colors.text.inverse;
    return theme.colors.text.primary;
  }};
  border: 1px solid ${({ theme, primary, disabled }) => {
    if (disabled) return theme.colors.border.default;
    if (primary) return 'transparent';
    return theme.colors.border.light;
  }};
  transition: all ${({ theme }) => theme.transitions.base};
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  
  &:hover {
    background: ${({ theme, primary, disabled }) => {
      if (disabled) return theme.colors.gray[200];
      if (primary) return `linear-gradient(135deg, ${theme.colors.primary[600]}, ${theme.colors.primary[700]})`;
      return theme.colors.primary[50];
    }};
    border-color: ${({ theme, disabled }) => disabled ? theme.colors.border.default : theme.colors.primary[300]};
    transform: ${props => props.disabled ? 'none' : 'translateY(-2px)'};
    box-shadow: ${({ theme, disabled }) => disabled ? 'none' : theme.shadows.sm};
  }
`;

const ViewDetailsButton = styled(motion.button)<{ darkMode: boolean }>`
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  background: rgba(0, 119, 181, 0.9);
  color: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  opacity: 0;
  transform: translateY(10px);
  transition: all 0.3s ease;
  z-index: 2;
  
  ${ProjectImage}:hover & {
    opacity: 1;
    transform: translateY(0);
  }
`;

const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing[8]};
  z-index: 1000;
  overflow-y: auto;
`;

const ModalContent = styled(motion.div)<{ darkMode: boolean }>`
  background: ${({ theme, darkMode }) => darkMode ? theme.colors.gray[100] : theme.colors.background.elevated};
  max-width: 800px;
  width: 100%;
  border-radius: ${({ theme }) => theme.borderRadius['2xl']};
  overflow: hidden;
  position: relative;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  box-shadow: ${({ theme }) => theme.shadows['2xl']};
  border: 1px solid ${({ theme }) => theme.colors.border.light};
`;

const ModalCloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(0, 0, 0, 0.3);
  color: white;
  border: none;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  transition: background 0.3s ease;
  
  &:hover {
    background: rgba(0, 0, 0, 0.5);
  }
`;

const ModalImageGallery = styled.div`
  width: 100%;
  height: 300px;
  position: relative;
  background: #000;
`;

const ModalImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ModalBody = styled.div<{ darkMode: boolean }>`
  padding: 2rem;
  color: ${props => props.darkMode ? '#ffffff' : '#1a1a1a'};
  overflow-y: auto;
`;

const ModalTitle = styled.h3<{ darkMode: boolean }>`
  font-size: 1.8rem;
  margin-bottom: 1rem;
  color: ${props => props.darkMode ? '#ffffff' : '#1a1a1a'};
`;

const ModalSection = styled.div`
  margin-bottom: 2rem;
`;

const ModalSectionTitle = styled.h4<{ darkMode: boolean }>`
  font-size: 1.2rem;
  margin-bottom: 1rem;
  color: ${props => props.darkMode ? '#ffffff' : '#1a1a1a'};
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  svg {
    color: rgb(0, 119, 181);
  }
`;

const ModalDescription = styled.p<{ darkMode: boolean }>`
  color: ${props => props.darkMode ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)'};
  line-height: 1.7;
  margin-bottom: 1rem;
`;

const KeyFeaturesList = styled.ul`
  padding-left: 1.5rem;
  margin-bottom: 1rem;
`;

const KeyFeatureItem = styled.li<{ darkMode: boolean }>`
  color: ${props => props.darkMode ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)'};
  margin-bottom: 0.5rem;
  line-height: 1.6;
`;

const ModalTechTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

const ModalActions = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
`;

// Project data with your actual GitHub repositories
const projectsData = [
  {
    id: 1,
    title: "Personal Website",
    description: "My personal portfolio website built with modern web technologies to showcase my skills and projects.",
    image: `https://opengraph.githubassets.com/1/hoffeloffe/Personal-website`,
    tech: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Framer Motion"],
    demoLink: "https://website.hoff3.net/",
    codeLink: "https://github.com/hoffeloffe/Personal-website",
    featured: true,
    category: "frontend",
    detailedDescription: "This is my professional portfolio website designed to showcase my skills, experience, and projects. Built with React and TypeScript, it features a responsive design, interactive animations, and a clean, modern UI.",
    keyFeatures: [
      "Responsive design for all devices",
      "Interactive animations with Framer Motion",
      "Dark/light mode toggle",
      "Project showcase with filterable categories",
      "Professional timeline with employment history"
    ],
    challenges: "Creating a portfolio that stands out while maintaining performance was a key challenge. I implemented code splitting and optimized assets to ensure fast loading times while keeping the animations smooth and engaging.",
    outcome: "The website effectively showcases my skills and has helped me connect with potential employers and collaborators."
  },
  {
    id: 2,
    title: "Website Fleet Deployment",
    description: "Infrastructure as code for automated deployment of my personal website across multiple environments.",
    image: `https://opengraph.githubassets.com/1/hoffeloffe/website-fleet-deployment`,
    tech: [],
    demoLink: "",
    codeLink: "https://github.com/hoffeloffe/website-fleet-deployment",
    featured: true,
    category: "devops",
    detailedDescription: "This repository contains the infrastructure as code and deployment pipelines for my personal website. It uses Terraform to provision cloud resources and automates the deployment process across multiple environments.",
    keyFeatures: [
      "Infrastructure as code with Terraform",
      "Multi-environment setup (dev, staging, production)",
      "Automated CI/CD pipeline",
      "Containerized deployment with Docker",
      "Cloud resource management"
    ],
    challenges: "Setting up a reliable and repeatable deployment process that works across different environments required careful planning. I designed the infrastructure to be modular and configurable, allowing for easy updates and scaling.",
    outcome: "The deployment system provides reliable, consistent environments and significantly reduces the time required to release updates."
  },
  {
    id: 3,
    title: "AIDoc",
    description: "An AI-powered document management system for automatic document processing, analysis, and information extraction.",
    image: `https://opengraph.githubassets.com/1/hoffeloffe/AIDoc`,
    tech: ["Typescript", "React", "Node.js"],
    demoLink: "https://aidoc.hoff3.net",
    codeLink: "https://github.com/hoffeloffe/AIDoc",
    featured: true,
    category: "fullstack",
    detailedDescription: "AIDoc is an intelligent document management system that uses machine learning to automate document processing, extract key information, and provide insights from unstructured text content.",
    keyFeatures: [
      "Automated document classification",
      "Text extraction from various document formats",
      "Named entity recognition and information extraction",
      "Document similarity search",
      "User-friendly dashboard for document management"
    ],
    challenges: "Building accurate machine learning models that could work across different document types was the biggest challenge. I implemented a hybrid approach using both rule-based systems and deep learning models to achieve high accuracy.",
    outcome: "The system has significantly reduced manual document processing time and improved information retrieval accuracy for users."
  },
  {
    id: 4,
    title: "AIDoc Fleet Deployment",
    description: "Containerized deployment and orchestration setup for the AIDoc application across multiple cloud environments.",
    image: `https://opengraph.githubassets.com/1/hoffeloffe/AIDoc-fleet-deployment`,
    tech: ["Docker", "Kubernetes", "Fleet", "YAML"],
    demoLink: "",
    codeLink: "https://github.com/hoffeloffe/AIDoc-fleet-deployment",
    featured: false,
    category: "devops",
    detailedDescription: "This repository contains the Kubernetes manifests, Helm charts, and CI/CD pipelines for deploying the AIDoc application. It follows GitOps principles for infrastructure management and provides a scalable, resilient deployment architecture.",
    keyFeatures: [
      "Kubernetes-based orchestration",
      "Helm charts for application packaging",
      "GitOps workflow with ArgoCD",
      "Scalable microservices architecture",
      "Monitoring and logging infrastructure"
    ],
    challenges: "Designing a deployment architecture that could scale efficiently while maintaining reliability required careful consideration of resource allocation and service dependencies. I implemented auto-scaling and health checking to ensure high availability.",
    outcome: "The deployment system enables reliable scaling of the AIDoc application and simplifies the management of multiple environments."
  },
  {
    id: 5,
    title: "DevOps Monitoring Platform",
    description: "A monitoring platform with live dashboards and REST API for tracking infrastructure and application health.",
    image: `https://opengraph.githubassets.com/1/hoffeloffe/devops-monitoring-platform`,
    tech: ["Python", "HTML", "Docker", "REST API"],
    demoLink: "",
    codeLink: "https://github.com/hoffeloffe/devops-monitoring-platform",
    featured: true,
    category: "backend",
    detailedDescription: "A full-featured DevOps monitoring platform built with Python that provides live dashboards and a REST API for monitoring infrastructure health, application metrics, and system performance.",
    keyFeatures: [
      "Real-time monitoring dashboards",
      "REST API for metrics collection",
      "Dockerized deployment",
      "Alerting and notification system",
      "Historical data analysis"
    ],
    challenges: "Building a real-time monitoring system that could handle high-frequency data while maintaining responsive dashboards required careful optimization of data pipelines and efficient frontend rendering.",
    outcome: "The platform provides reliable visibility into system health and has reduced incident response times."
  },
  {
    id: 6,
    title: "Distributed AI Cluster",
    description: "A distributed computing cluster for running AI/ML workloads across multiple nodes with automated orchestration.",
    image: `https://opengraph.githubassets.com/1/hoffeloffe/distributed-ai-cluster`,
    tech: ["Python", "Shell", "Docker", "Kubernetes"],
    demoLink: "",
    codeLink: "https://github.com/hoffeloffe/distributed-ai-cluster",
    featured: true,
    category: "backend",
    detailedDescription: "A distributed computing system designed to run AI and machine learning workloads across multiple nodes. The cluster handles task distribution, resource management, and result aggregation automatically.",
    keyFeatures: [
      "Multi-node task distribution",
      "Automated resource management",
      "Docker and Kubernetes orchestration",
      "Support for various ML frameworks",
      "Scalable architecture for ARM and AMD nodes"
    ],
    challenges: "Efficiently distributing ML workloads across heterogeneous hardware (ARM Raspberry Pis and AMD servers) while maintaining consistent performance required custom scheduling algorithms.",
    outcome: "The cluster successfully runs distributed AI workloads and demonstrates the feasibility of affordable edge computing for ML."
  },
  {
    id: 7,
    title: "Marketing Campaign Orchestrator",
    description: "A JavaScript application for planning, managing, and orchestrating marketing campaigns across channels.",
    image: `https://opengraph.githubassets.com/1/hoffeloffe/marketing-campaign-orchestrator`,
    tech: ["JavaScript", "Node.js", "HTML"],
    demoLink: "",
    codeLink: "https://github.com/hoffeloffe/marketing-campaign-orchestrator",
    featured: false,
    category: "fullstack",
    detailedDescription: "A campaign management tool built with JavaScript for coordinating marketing efforts across multiple channels. It provides workflow automation and campaign tracking capabilities.",
    keyFeatures: [
      "Multi-channel campaign management",
      "Workflow automation",
      "Campaign performance tracking",
      "Template management",
      "Scheduling and publishing"
    ],
    challenges: "Coordinating campaigns across multiple channels with different APIs and requirements while maintaining a unified interface was the primary challenge.",
    outcome: "The orchestrator streamlines campaign management and provides a single source of truth for marketing activities."
  },
  {
    id: 8,
    title: "Recolour Case",
    description: "A Vue.js application for a recolouring case study, featuring interactive UI components and dynamic styling.",
    image: `https://opengraph.githubassets.com/1/hoffeloffe/recolour-case`,
    tech: ["Vue.js", "JavaScript", "CSS"],
    demoLink: "",
    codeLink: "https://github.com/hoffeloffe/recolour-case",
    featured: false,
    category: "frontend",
    detailedDescription: "A frontend case study built with Vue.js demonstrating dynamic theming and recolouring capabilities. The application showcases interactive UI components with real-time style manipulation.",
    keyFeatures: [
      "Dynamic colour theming",
      "Vue.js component architecture",
      "Real-time style manipulation",
      "Responsive design",
      "Interactive UI components"
    ],
    challenges: "Implementing real-time colour manipulation while maintaining smooth performance and consistent visual output across different browsers.",
    outcome: "A polished case study demonstrating proficiency with Vue.js and dynamic styling techniques."
  }
];

// Project categories for filtering
const categories = [
  { id: "all", name: "All Projects" },
  { id: "frontend", name: "Frontend" },
  { id: "fullstack", name: "Full Stack" },
  { id: "backend", name: "Backend" },
  { id: "devops", name: "DevOps" },
  { id: "misc", name: "Misc" }
];



interface ProjectsProps {
  darkMode: boolean;
}





const Projects: React.FC<ProjectsProps> = React.memo(({ darkMode }) => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedProject, setSelectedProject] = useState<any>(null);
  
  // Filter projects based on selected category
  const filteredProjects = activeCategory === "all" 
    ? projectsData 
    : projectsData.filter(project => project.category === activeCategory);

  
  // Animation variants for cards
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({ 
      opacity: 1, 
      y: 0, 
      transition: { 
        delay: i * 0.1,
        duration: 0.5
      } 
    })
  };
  
  return (
    <ProjectsSection darkMode={darkMode} id="projects">
      <SectionTitle
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      >
        Featured Projects
      </SectionTitle>
      
      <ProjectFilter>
        {categories.map(category => (
          <FilterButton
            key={category.id}
            darkMode={darkMode}
            active={activeCategory === category.id}
            onClick={() => setActiveCategory(category.id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {category.name}
          </FilterButton>
        ))}
      </ProjectFilter>
      
      <AnimatePresence>
        <ProjectsGrid>
          {filteredProjects.map((project, index) => (
            <ProjectCard 
              key={project.id}
              darkMode={darkMode}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, y: 20, transition: { duration: 0.3 } }}
              layoutId={`project-container-${project.id}`}
            >
              {project.featured && <ProjectBadge isFeatured={true}>Featured</ProjectBadge>}
              
              <ProjectImage 
                imageUrl={project.image}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <ViewDetailsButton 
                  darkMode={darkMode}
                  onClick={() => setSelectedProject(project)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FontAwesomeIcon icon={faArrowRight} />
                </ViewDetailsButton>
              </ProjectImage>
              
              <ProjectContent darkMode={darkMode}>
                <div>
                  <ProjectTitle darkMode={darkMode}>{project.title}</ProjectTitle>
                  <ProjectDescription darkMode={darkMode}>
                    {project.description}
                  </ProjectDescription>
                </div>
                
                <div>
                  <TechTags>
                    {project.tech.slice(0, 3).map((tech, index) => (
                      <TechTag key={index} darkMode={darkMode}>{tech}</TechTag>
                    ))}
                    {project.tech.length > 3 && (
                      <TechTag darkMode={darkMode}>+{project.tech.length - 3}</TechTag>
                    )}
                  </TechTags>
                  
                  <ProjectActions>
                    <ActionButton 
                      href={project.codeLink} 
                      darkMode={darkMode}
                      target="_blank" 
                      rel="noopener noreferrer"
                      whileHover={{ y: -3 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FontAwesomeIcon icon={faGithub} /> View Code
                    </ActionButton>
                    <ActionButton 
                      href={project.demoLink || '#'} 
                      darkMode={darkMode} 
                      primary
                      disabled={!project.demoLink}
                      target="_blank" 
                      rel="noopener noreferrer"
                      whileHover={{ y: project.demoLink ? -3 : 0 }}
                      whileTap={{ scale: project.demoLink ? 0.95 : 1 }}
                    >
                      <FontAwesomeIcon icon={faChrome} /> Live Demo
                    </ActionButton>
                  </ProjectActions>
                </div>
              </ProjectContent>
            </ProjectCard>
          ))}
        </ProjectsGrid>
      </AnimatePresence>
      
      <AnimatePresence>
        {selectedProject && (
          <ModalOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
          >
            <ModalContent 
              darkMode={darkMode}
              onClick={e => e.stopPropagation()}
              layoutId={`project-container-${selectedProject.id}`}
            >
              <ModalCloseButton onClick={() => setSelectedProject(null)}>
                <FontAwesomeIcon icon={faTimes} />
              </ModalCloseButton>
              
              <ModalImageGallery>
                <ModalImage src={selectedProject.image} alt={selectedProject.title} />
              </ModalImageGallery>
              
              <ModalBody darkMode={darkMode}>
                <ModalTitle darkMode={darkMode}>{selectedProject.title}</ModalTitle>
                
                <ModalSection>
                  <ModalDescription darkMode={darkMode}>
                    {selectedProject.detailedDescription}
                  </ModalDescription>
                </ModalSection>
                
                <ModalSection>
                  <ModalSectionTitle darkMode={darkMode}>
                    <FontAwesomeIcon icon={faTools} /> Key Features
                  </ModalSectionTitle>
                  <KeyFeaturesList>
                    {selectedProject.keyFeatures.map((feature: string, index: number) => (
                      <KeyFeatureItem key={index} darkMode={darkMode}>
                        {feature}
                      </KeyFeatureItem>
                    ))}
                  </KeyFeaturesList>
                </ModalSection>
                
                <ModalSection>
                  <ModalSectionTitle darkMode={darkMode}>
                    Technologies Used
                  </ModalSectionTitle>
                  <ModalTechTags>
                    {selectedProject.tech.map((tech: string, index: number) => (
                      <TechTag key={index} darkMode={darkMode}>{tech}</TechTag>
                    ))}
                  </ModalTechTags>
                </ModalSection>
                
                <ModalSection>
                  <ModalSectionTitle darkMode={darkMode}>
                    Challenges & Solutions
                  </ModalSectionTitle>
                  <ModalDescription darkMode={darkMode}>
                    {selectedProject.challenges}
                  </ModalDescription>
                </ModalSection>
                
                <ModalSection>
                  <ModalSectionTitle darkMode={darkMode}>
                    Outcome
                  </ModalSectionTitle>
                  <ModalDescription darkMode={darkMode}>
                    {selectedProject.outcome}
                  </ModalDescription>
                </ModalSection>
                
                <ModalActions>
                  <ActionButton 
                    href={selectedProject.demoLink || '#'} 
                    darkMode={darkMode} 
                    primary
                    disabled={!selectedProject.demoLink}
                    target="_blank" 
                    rel="noopener noreferrer"
                    whileHover={{ y: selectedProject.demoLink ? -3 : 0 }}
                  >
                    <FontAwesomeIcon icon={faChrome} /> View Live Demo
                  </ActionButton>
                  <ActionButton 
                    href={selectedProject.codeLink} 
                    darkMode={darkMode}
                    target="_blank" 
                    rel="noopener noreferrer"
                    whileHover={{ y: -3 }}
                  >
                    <FontAwesomeIcon icon={faGithub} /> View Source Code
                  </ActionButton>
                </ModalActions>
              </ModalBody>
            </ModalContent>
          </ModalOverlay>
        )}
      </AnimatePresence>
    </ProjectsSection>
  );
});

Projects.displayName = 'Projects';

export default Projects;
