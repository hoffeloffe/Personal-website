// Centralized animation variants for consistent motion throughout the app
import { Variants } from 'framer-motion';

// Easing curves for different interaction types
export const easing = {
  easeInOut: [0.4, 0, 0.2, 1],
  easeOut: [0.0, 0, 0.2, 1],
  easeIn: [0.4, 0, 1, 1],
  sharp: [0.4, 0, 0.6, 1],
} as const;

// Standard durations (in seconds)
export const duration = {
  instant: 0.1,
  fast: 0.2,
  base: 0.3,
  slow: 0.5,
  slower: 0.7,
} as const;

// Fade in animation
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      duration: duration.base,
      ease: easing.easeOut,
    }
  }
};

// Fade in with slide up
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: duration.base,
      ease: easing.easeOut,
    }
  }
};

// Fade in with slide down
export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: duration.base,
      ease: easing.easeOut,
    }
  }
};

// Stagger children animation
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05, // Reduced from 0.1s for smoother feel
      delayChildren: 0.1,
    }
  }
};

// Scale animation for hover effects
export const scaleOnHover = {
  rest: { scale: 1 },
  hover: { 
    scale: 1.02, // Subtle scale, reduced from 1.05
    transition: { 
      duration: duration.fast,
      ease: easing.easeOut,
    }
  }
};

// Lift animation for cards
export const liftOnHover = {
  rest: { y: 0 },
  hover: { 
    y: -1, // Subtle lift, reduced from -2px
    transition: { 
      duration: duration.fast,
      ease: easing.easeOut,
    }
  }
};

// Modal animations
export const modalOverlay: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: duration.fast }
  },
  exit: { 
    opacity: 0,
    transition: { duration: duration.fast }
  }
};

export const modalContent: Variants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    y: 0,
    transition: { 
      duration: duration.base,
      ease: easing.easeOut,
    }
  },
  exit: { 
    opacity: 0, 
    scale: 0.95, 
    y: 20,
    transition: { 
      duration: duration.fast,
      ease: easing.easeIn,
    }
  }
};

// Page transition
export const pageTransition: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      duration: duration.slow,
      ease: easing.easeOut,
    }
  }
};

// Reduced motion variants (for accessibility)
export const reducedMotion: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 }
};
