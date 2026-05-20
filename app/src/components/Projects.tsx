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

// Project data
const projectsData = [
  {
    id: 1,
    title: "Portfolio Website (Azure Transition Case Study)",
    description: "My main case study for learning Azure-oriented delivery with a React frontend and practical CI/CD discipline.",
    image: `https://opengraph.githubassets.com/1/hoffeloffe/Personal-website`,
    tech: ["React", "TypeScript", "styled-components", "GitHub Actions", "Azure Static Web Apps", "Bicep"],
    demoLink: "https://website.hoff3.net/",
    codeLink: "https://github.com/hoffeloffe/Personal-website",
    featured: true,
    category: "frontend",
    detailedDescription: "This portfolio is intentionally used as my cloud transition project. It combines frontend delivery with a clear Azure direction: separate dev/prod environments, infrastructure as code, and repeatable deployment flow.",
    keyFeatures: [
      "Responsive design for all devices",
      "Accessible navigation and section structure",
      "Dark/light mode toggle",
      "Project showcase with filterable categories",
      "Azure-first deployment documentation"
    ],
    challenges: "Keeping the messaging credible while improving the implementation was the main challenge. I focused on practical engineering choices and removed unsupported claims.",
    outcome: "A clearer portfolio narrative that better reflects my current level and my Junior Cloud/DevOps transition goals."
  },
  {
    id: 2,
    title: "Website Fleet Deployment",
    description: "Infrastructure repository focused on environment setup and repeatable deployment workflow for the portfolio.",
    image: `https://opengraph.githubassets.com/1/hoffeloffe/website-fleet-deployment`,
    tech: ["Bicep", "GitHub Actions", "Azure", "Environment Config"],
    demoLink: "",
    codeLink: "https://github.com/hoffeloffe/website-fleet-deployment",
    featured: true,
    category: "devops",
    detailedDescription: "This repository is where I practice infrastructure and release flow for dev/prod environments. It is focused on clear setup, reviewable changes, and low-complexity automation.",
    keyFeatures: [
      "Infrastructure as code baseline",
      "Separate environment configuration",
      "Workflow-based validation",
      "Deployment automation",
      "Documented operational approach"
    ],
    challenges: "Balancing simplicity and realism in a personal project setup required intentionally limiting scope and avoiding unnecessary platform complexity.",
    outcome: "A stronger foundation for demonstrating practical cloud deployment habits and environment discipline."
  },
  {
    id: 3,
    title: "AIDoc",
    description: "A learning project exploring document workflows, UI structure, and integration patterns in a small app.",
    image: `https://opengraph.githubassets.com/1/hoffeloffe/AIDoc`,
    tech: ["Typescript", "React", "Node.js"],
    demoLink: "https://aidoc.hoff3.net",
    codeLink: "https://github.com/hoffeloffe/AIDoc",
    featured: true,
    category: "misc",
    detailedDescription: "AIDoc is an experimental project used to practice structuring a larger feature set than a simple landing page. The focus is on clean organization and iterative delivery.",
    keyFeatures: [
      "Document upload and organization flow",
      "Basic processing pipeline structure",
      "Project-level component organization",
      "Simple dashboard interface",
      "Iterative feature experimentation"
    ],
    challenges: "Keeping scope under control while exploring multiple ideas required regular simplification and prioritization.",
    outcome: "A useful learning sandbox that improved my confidence in handling multi-part applications."
  },
  {
    id: 4,
    title: "AIDoc Fleet Deployment",
    description: "Deployment experiments for AIDoc with a focus on repeatable release setup and environment notes.",
    image: `https://opengraph.githubassets.com/1/hoffeloffe/AIDoc-fleet-deployment`,
    tech: ["Docker", "Kubernetes", "Fleet", "YAML"],
    demoLink: "",
    codeLink: "https://github.com/hoffeloffe/AIDoc-fleet-deployment",
    featured: false,
    category: "devops",
    detailedDescription: "This repo captures deployment experiments for AIDoc. It is used as a personal learning space to understand packaging, rollout flow, and operational tradeoffs.",
    keyFeatures: [
      "Container-based deployment setup",
      "Environment-specific configuration",
      "Automation workflow drafts",
      "Operational documentation",
      "Incremental improvement notes"
    ],
    challenges: "Evaluating several deployment approaches without overengineering required strict scope limits and clear success criteria.",
    outcome: "A better understanding of deployment fundamentals that informs my Azure-focused workflow decisions."
  },
  {
    id: 5,
    title: "DevOps Monitoring Platform",
    description: "A monitoring-oriented learning project for collecting metrics and visualizing system status.",
    image: `https://opengraph.githubassets.com/1/hoffeloffe/devops-monitoring-platform`,
    tech: ["Python", "HTML", "Docker", "REST API"],
    demoLink: "",
    codeLink: "https://github.com/hoffeloffe/devops-monitoring-platform",
    featured: true,
    category: "devops",
    detailedDescription: "This project explores the basics of monitoring and status visibility in a simple, self-contained setup.",
    keyFeatures: [
      "Live dashboard prototype",
      "Metrics collection endpoint",
      "Containerized local setup",
      "Basic alert flow experiments",
      "Historical metrics view"
    ],
    challenges: "Designing a simple monitoring model without introducing too many moving parts was the biggest challenge.",
    outcome: "A practical baseline project for understanding observability concepts before applying them in Azure environments."
  },
  {
    id: 6,
    title: "Distributed AI Cluster",
    description: "A homelab-style experiment with distributed workload execution across mixed hardware nodes.",
    image: `https://opengraph.githubassets.com/1/hoffeloffe/distributed-ai-cluster`,
    tech: ["Python", "Shell", "Docker", "Kubernetes"],
    demoLink: "",
    codeLink: "https://github.com/hoffeloffe/distributed-ai-cluster",
    featured: true,
    category: "misc",
    detailedDescription: "An experimental project used to understand distributed execution, scheduling basics, and infrastructure constraints in a low-cost setup.",
    keyFeatures: [
      "Multi-node task distribution",
      "Mixed ARM and AMD node support",
      "Container orchestration experiments",
      "Job lifecycle scripting",
      "Environment setup documentation"
    ],
    challenges: "Working with mixed hardware and constrained resources highlighted tradeoffs in scheduling and reliability.",
    outcome: "A better understanding of system-level constraints and deployment complexity."
  },
  {
    id: 7,
    title: "Marketing Campaign Orchestrator",
    description: "A workflow-oriented JavaScript project for managing campaign tasks and sequencing actions.",
    image: `https://opengraph.githubassets.com/1/hoffeloffe/marketing-campaign-orchestrator`,
    tech: ["JavaScript", "Node.js", "HTML"],
    demoLink: "",
    codeLink: "https://github.com/hoffeloffe/marketing-campaign-orchestrator",
    featured: false,
    category: "misc",
    detailedDescription: "A practice project that focuses on workflow state, data flow, and lightweight automation in a small JavaScript application.",
    keyFeatures: [
      "Multi-channel campaign management",
      "Workflow automation",
      "Campaign performance tracking",
      "Template management",
      "Scheduling and publishing"
    ],
    challenges: "Keeping the feature set manageable while preserving a clean user flow required careful trimming.",
    outcome: "A useful exercise in turning requirements into a structured workflow UI."
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
    detailedDescription: "A frontend case study built with Vue.js to explore dynamic theming, UI consistency, and interactive styling behavior.",
    keyFeatures: [
      "Dynamic colour theming",
      "Vue.js component architecture",
      "Real-time style manipulation",
      "Responsive design",
      "Interactive UI components"
    ],
    challenges: "Balancing flexibility and maintainability in a style-heavy interface while keeping interaction smooth.",
    outcome: "A focused UI experiment that improved my frontend implementation habits."
  }
];

// Project categories for filtering
const categories = [
  { id: "all", name: "All Projects" },
  { id: "frontend", name: "Frontend" },
  { id: "devops", name: "Cloud & DevOps" },
  { id: "misc", name: "Learning Labs" }
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
        Project Case Studies
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
