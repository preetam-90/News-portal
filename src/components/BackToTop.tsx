import React, { useState, useEffect } from 'react';
import { Fab, Zoom } from '@mui/material';
import { KeyboardArrowUp } from '@mui/icons-material';

const BackToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    const checkScrollPosition = () => {
      const scrollY = window.scrollY;
      const pageHeight = document.documentElement.scrollHeight;
      const viewportHeight = window.innerHeight;
      const scrollPercentage = scrollY / (pageHeight - viewportHeight);
      
      // Show button when scrolled past 60% of the page
      setIsVisible(scrollPercentage > 0.6);
    };

    window.addEventListener('scroll', checkScrollPosition);
    
    // Run once to set initial state
    checkScrollPosition();
    
    return () => {
      window.removeEventListener('scroll', checkScrollPosition);
    };
  }, []);

  return (
    <Zoom in={isVisible}>
      <Fab
        color="primary"
        size="medium"
        aria-label="scroll back to top"
        onClick={scrollToTop}
        sx={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
          zIndex: 1000,
          backgroundColor: 'white',
          color: 'black',
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            backgroundColor: 'white',
            transform: 'translateY(-4px)',
            boxShadow: '0 8px 24px rgba(0,0,0,0.25)',
          }
        }}
        className="dark:bg-slate-700 dark:text-white hover:dark:bg-slate-600"
      >
        <KeyboardArrowUp />
      </Fab>
    </Zoom>
  );
};

export default BackToTop; 