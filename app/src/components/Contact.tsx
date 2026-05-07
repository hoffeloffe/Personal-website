import React, { useState, useRef } from 'react';
import styled from "styled-components";
import { motion } from "framer-motion";
import { fadeInUp } from '../utils/animations';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faGithub, 
  faLinkedin
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faCheck, faPaperPlane } from "@fortawesome/free-solid-svg-icons";

// Styled components for responsive design
const ContactSection = styled.div<{ darkMode: boolean }>`
  background: ${({ theme, darkMode }) => darkMode ? theme.colors.background.default : theme.colors.background.elevated};
  padding: ${({ theme }) => theme.spacing[16]} 10%;
  
  @media (max-width: 768px) {
    padding: ${({ theme }) => theme.spacing[12]} 5%;
  }
`;

const ContactTitle = styled(motion.h2)`
  font-size: ${({ theme }) => theme.typography.fontSize['4xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing[8]};
  letter-spacing: -0.02em;
`;

const ConnectTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing[4]};
`;

const ConnectText = styled.p`
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
  margin-bottom: ${({ theme }) => theme.spacing[6]};
`;

const FormLabel = styled.label<{ darkMode: boolean }>`
  display: block;
  margin-bottom: ${({ theme }) => theme.spacing[2]};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.colors.text.primary};
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
  gap: ${({ theme }) => theme.spacing[2]};
  color: ${({ theme }) => theme.colors.text.primary};
  text-decoration: none;
  padding: ${({ theme }) => theme.spacing[2]} ${({ theme }) => theme.spacing[4]};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  background: ${({ theme, darkMode }) => darkMode ? theme.colors.gray[100] : theme.colors.background.elevated};
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  transition: all ${({ theme }) => theme.transitions.base};
  
  &:hover {
    background: ${({ theme }) => theme.colors.primary[500]};
    color: ${({ theme }) => theme.colors.text.inverse};
    border-color: ${({ theme }) => theme.colors.primary[500]};
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.md};
  }
`;

const FormInput = styled.input<{ darkMode: boolean }>`
  width: 100%;
  padding: ${({ theme }) => theme.spacing[3]} ${({ theme }) => theme.spacing[4]};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  border: 1px solid ${({ theme }) => theme.colors.border.default};
  background: ${({ theme, darkMode }) => darkMode ? theme.colors.gray[100] : theme.colors.background.elevated};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing[4]};
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  transition: all ${({ theme }) => theme.transitions.base};
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary[500]};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary[100]};
  }
`;

const FormTextArea = styled.textarea<{ darkMode: boolean }>`
  width: 100%;
  padding: ${({ theme }) => theme.spacing[3]} ${({ theme }) => theme.spacing[4]};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  border: 1px solid ${({ theme }) => theme.colors.border.default};
  background: ${({ theme, darkMode }) => darkMode ? theme.colors.gray[100] : theme.colors.background.elevated};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing[4]};
  min-height: 150px;
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  transition: all ${({ theme }) => theme.transitions.base};
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary[500]};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary[100]};
  }
`;

const SubmitButton = styled(motion.button)<{ darkMode: boolean }>`
  width: 100%;
  padding: ${({ theme }) => theme.spacing[3]};
  margin-top: ${({ theme }) => theme.spacing[6]};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary[500]}, ${({ theme }) => theme.colors.primary[600]});
  color: ${({ theme }) => theme.colors.text.inverse};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.base};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing[2]};
  box-shadow: ${({ theme }) => theme.shadows.base};
  
  &:hover:not(:disabled) {
    background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary[600]}, ${({ theme }) => theme.colors.primary[700]});
    transform: translateY(-1px);
    box-shadow: ${({ theme }) => theme.shadows.md};
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary[100]};
  }
  
  &:disabled {
    background: ${({ theme }) => theme.colors.gray[300]};
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

interface ContactFormProps {
  darkMode: boolean;
}

const ContactForm: React.FC<ContactFormProps> = React.memo(({ darkMode }) => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const formRef = useRef<HTMLFormElement>(null);
  
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
      // Send form data to Formspree
      const response = await fetch('https://formspree.io/f/xzdoavdk', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsSubmitted(true);
        setFormData({ name: "", email: "", message: "" });
      } else {
        setError('Failed to send message. Please try again later.');
      }
    } catch (err) {
      console.error('Form submission error:', err);
      setError('Failed to send message. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ContactSection darkMode={darkMode} id="contact">
      <ContactTitle
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        Get In Touch
      </ContactTitle>

      <ContactGrid>
        <SocialLinksContainer darkMode={darkMode}>
          <ConnectTitle>Connect With Me</ConnectTitle>
          <ConnectText>
            Feel free to reach out through any of these platforms. I'm always open to discussing
            new projects, creative ideas, or opportunities to be part of your vision.
          </ConnectText>
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
              href="https://www.linkedin.com/in/christian-hoffmann-thomsen-8027ba207/"
              target="_blank"
              rel="noopener noreferrer"
              darkMode={darkMode}
              aria-label="LinkedIn Profile"
            >
              <FontAwesomeIcon icon={faLinkedin} /> LinkedIn
            </SocialLink>
            <SocialLink
              href="mailto:christian.hoffmann.thomsen@gmail.com"
              darkMode={darkMode}
              aria-label="Email Contact"
            >
              <FontAwesomeIcon icon={faEnvelope} /> Email Me
            </SocialLink>
          </SocialLinks>
        </SocialLinksContainer>

        <div>
          <form ref={formRef} onSubmit={handleSubmit}>
            <div>
              <FormLabel darkMode={darkMode} htmlFor="name">Name</FormLabel>
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
              <FormLabel darkMode={darkMode} htmlFor="email">Email</FormLabel>
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
              <FormLabel darkMode={darkMode} htmlFor="message">Message</FormLabel>
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
                  background: "rgba(34, 197, 94, 0.1)"
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
                style={{
                  marginTop: "1rem",
                  color: "rgb(239, 68, 68)",
                  fontWeight: 600,
                  textAlign: "center",
                  padding: "0.75rem",
                  borderRadius: "4px",
                  background: "rgba(239, 68, 68, 0.1)"
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
});

ContactForm.displayName = 'ContactForm';

export default ContactForm;