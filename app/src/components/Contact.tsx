import React, { useState, useRef } from 'react';
import { useSpring, animated } from "@react-spring/web";
import styled from "styled-components";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faGithub, 
  faLinkedin, 
  faTwitter,
  faCodepen
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faCheck, faPaperPlane } from "@fortawesome/free-solid-svg-icons";

// Styled components for responsive design
const ContactSection = styled.div<{ darkMode: boolean }>`
  background: ${props => props.darkMode ? '#1a1a1a' : '#f5f5f5'};
  padding: 4rem 10%;
  
  @media (max-width: 768px) {
    padding: 3rem 5%;
  }
`;

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const SocialLinksContainer = styled.div<{ darkMode: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: ${props => props.darkMode ? '#ffffff' : '#1a1a1a'};
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-top: 1.5rem;
  flex-wrap: wrap;
`;

const SocialLink = styled.a<{ darkMode: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${props => props.darkMode ? '#ffffff' : '#1a1a1a'};
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  background: ${props => props.darkMode ? '#2a2a2a' : '#ffffff'};
  transition: all 0.3s ease;
  
  &:hover {
    background: rgb(0, 119, 181);
    color: white;
    transform: translateY(-3px);
  }
`;

const FormInput = styled.input<{ darkMode: boolean }>`
  width: 100%;
  padding: 0.75rem 1rem;
  border-radius: 4px;
  border: 1px solid ${props => props.darkMode ? '#3a3a3a' : '#d1d1d1'};
  background: ${props => props.darkMode ? '#2a2a2a' : '#ffffff'};
  color: ${props => props.darkMode ? '#ffffff' : '#1a1a1a'};
  margin-bottom: 1rem;
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgb(0, 119, 181);
  }
`;

const FormTextArea = styled.textarea<{ darkMode: boolean }>`
  width: 100%;
  padding: 0.75rem 1rem;
  border-radius: 4px;
  border: 1px solid ${props => props.darkMode ? '#3a3a3a' : '#d1d1d1'};
  background: ${props => props.darkMode ? '#2a2a2a' : '#ffffff'};
  color: ${props => props.darkMode ? '#ffffff' : '#1a1a1a'};
  margin-bottom: 1rem;
  min-height: 150px;
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgb(0, 119, 181);
  }
`;

const SubmitButton = styled(motion.button)<{ darkMode: boolean }>`
  width: 100%;
  padding: 0.75rem;
  margin-top: 1.5rem;
  border: none;
  border-radius: 4px;
  background: rgb(0, 119, 181);
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  
  &:hover {
    background: rgb(0, 90, 150);
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(0, 119, 181, 0.5);
  }
  
  &:disabled {
    background: #cccccc;
    cursor: not-allowed;
    transform: none;
  }
`;

interface ContactFormProps {
  darkMode: boolean;
}

const ContactForm: React.FC<ContactFormProps> = ({ darkMode }) => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const formRef = useRef<HTMLFormElement>(null);

  const fadeIn = useSpring({
    from: { opacity: 0, transform: "translateY(20px)" },
    to: { opacity: 1, transform: "translateY(0)" },
    config: { duration: 1000 },
  });
  
  const successVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    },
    exit: { 
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.3
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    
    // Validate the form data
    if (!formData.name || !formData.email || !formData.message) {
      setError('Please fill in all fields');
      setIsSubmitting(false);
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      setIsSubmitting(false);
      return;
    }
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Form submitted successfully:', formData);
      
      // Show success message
      setIsSubmitted(true);
      setIsSubmitting(false);
      
      // Here's where you would normally send the form data to a server
      // For a real implementation, you could use:
      // 1. A backend API that you create
      // 2. A form service like Formspree.io or Netlify Forms
      // 3. A serverless function (AWS Lambda, Netlify Functions, etc.)
      
      // Reset form after 5 seconds
      setTimeout(() => {
        setFormData({ name: "", email: "", message: "" });
        setIsSubmitted(false);
      }, 5000);
    } catch (err) {
      console.error('Form submission error:', err);
      setError('Failed to send message. Please try again later.');
      setIsSubmitting(false);
    }
  };

  return (
    <ContactSection darkMode={darkMode} id="contact">
      <h2 style={fadeIn as any} className={`text-3xl font-bold text-center mb-8 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
        Get In Touch
      </h2>
      
      <ContactGrid>
        {/* Social Links */}
        <SocialLinksContainer darkMode={darkMode}>
          <h3 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            Connect With Me
          </h3>
          <p className="my-4">
            Feel free to reach out through any of these platforms. I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
          </p>
          
          <SocialLinks>
            <SocialLink 
              href="https://github.com/hoffeloffe" 
              target="_blank" 
              rel="noopener noreferrer"
              darkMode={darkMode}
              aria-label="GitHub Profile"
            >
              <FontAwesomeIcon icon={faGithub} /> GitHub
            </SocialLink>
            
            <SocialLink 
              href="https://linkedin.com/in/christian-hoffmann" 
              target="_blank" 
              rel="noopener noreferrer"
              darkMode={darkMode}
              aria-label="LinkedIn Profile"
            >
              <FontAwesomeIcon icon={faLinkedin} /> LinkedIn
            </SocialLink>
            
            <SocialLink 
              href="https://twitter.com/christianh" 
              target="_blank" 
              rel="noopener noreferrer"
              darkMode={darkMode}
              aria-label="Twitter Profile"
            >
              <FontAwesomeIcon icon={faTwitter} /> Twitter
            </SocialLink>
            
            <SocialLink 
              href="https://codepen.io/hoffmann" 
              target="_blank" 
              rel="noopener noreferrer"
              darkMode={darkMode}
              aria-label="CodePen Profile"
            >
              <FontAwesomeIcon icon={faCodepen} /> CodePen
            </SocialLink>
            
            <SocialLink 
              href="mailto:christian@picit.dk" 
              darkMode={darkMode}
              aria-label="Email Contact"
            >
              <FontAwesomeIcon icon={faEnvelope} /> Email Me
            </SocialLink>
          </SocialLinks>
        </SocialLinksContainer>
        
        {/* Contact Form */}
        <div style={fadeIn as any}>
          <form ref={formRef} onSubmit={handleSubmit}>
            <div>
              <label className={`block mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`} htmlFor="name">
                Name
              </label>
              <FormInput
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                darkMode={darkMode}
                required
                aria-required="true"
              />
            </div>
            
            <div>
              <label className={`block mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`} htmlFor="email">
                Email
              </label>
              <FormInput
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                darkMode={darkMode}
                required
                aria-required="true"
              />
            </div>
            
            <div>
              <label className={`block mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`} htmlFor="message">
                Message
              </label>
              <FormTextArea
                id="message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                darkMode={darkMode}
                required
                aria-required="true"
              />
            </div>
            
            <SubmitButton 
              type="submit"
              darkMode={darkMode}
              disabled={isSubmitting}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              {isSubmitting ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    style={{ display: "inline-block" }}
                  >
                    <FontAwesomeIcon icon={faPaperPlane} />
                  </motion.div>
                  Sending...
                </>
              ) : (
                <>
                  <FontAwesomeIcon icon={faPaperPlane} />
                  Send Message
                </>
              )}
            </SubmitButton>
            
            {isSubmitted && (
              <motion.div 
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={successVariants}
                style={{ 
                  marginTop: "1rem",
                  color: "rgb(34, 197, 94)",
                  fontWeight: 600,
                  textAlign: "center",
                  padding: "0.75rem",
                  borderRadius: "4px",
                  background: darkMode ? "rgba(34, 197, 94, 0.1)" : "rgba(34, 197, 94, 0.1)"
                }}
              >
                <FontAwesomeIcon icon={faCheck} style={{ marginRight: "0.5rem" }} />
                Thank you for your message! I'll get back to you soon.
              </motion.div>
            )}
            
            {error && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                style={{ 
                  marginTop: "1rem",
                  color: "rgb(239, 68, 68)",
                  fontWeight: 600,
                  textAlign: "center",
                  padding: "0.75rem",
                  borderRadius: "4px",
                  background: darkMode ? "rgba(239, 68, 68, 0.1)" : "rgba(239, 68, 68, 0.1)"
                }}
              >
                {error}
              </motion.div>
            )}
          </form>
        </div>
      </ContactGrid>
    </ContactSection>
  );
};

export default ContactForm;