import React from 'react';
import { Box, Typography, Button, Chip } from '@mui/material';
import { AccessTime as TimeIcon } from '@mui/icons-material';

interface HeroSectionProps {
  article: {
    title: string;
    description: string;
    urlToImage: string;
    url: string;
    source: {
      name: string;
    };
    publishedAt: string;
  } | null;
}

const HeroSection: React.FC<HeroSectionProps> = ({ article }) => {
  if (!article) {
    return null;
  }

  const formatTime = (dateString: string) => {
    const published = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - published.getTime();
    const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
    
    if (diffHrs < 1) {
      const diffMins = Math.floor(diffMs / (1000 * 60));
      return `${diffMins}m ago`;
    } else if (diffHrs < 24) {
      return `${diffHrs}h ago`;
    } else {
      const diffDays = Math.floor(diffHrs / 24);
      return `${diffDays}d ago`;
    }
  };

  return (
    <Box 
      className="relative w-full overflow-hidden rounded-xl mb-8 mx-auto"
      sx={{ 
        height: { xs: '60vh', md: '70vh' },
        maxHeight: '700px',
        minHeight: '400px',
        maxWidth: '1100px'
      }}
    >
      {/* Background Image with Gradient Overlay */}
      <Box 
        className="absolute inset-0 w-full h-full transition-transform duration-700 ease-in-out hover:scale-105"
        sx={{
          backgroundImage: `url(${article.urlToImage || 'https://via.placeholder.com/1200x800?text=No+Image'})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'linear-gradient(0deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.2) 100%)',
            backdropFilter: 'blur(2px)',
          }
        }}
      />
      
      {/* Content */}
      <Box 
        className="absolute inset-0 flex flex-col justify-end p-6 md:p-12"
        sx={{ zIndex: 1 }}
      >
        <Box className="flex items-center mb-4 space-x-2">
          <Chip 
            label="🔥 Trending" 
            size="small"
            className="bg-red-500 text-white font-medium"
          />
          <Box className="flex items-center text-white/80">
            <TimeIcon fontSize="small" className="mr-1" />
            <Typography variant="body2">
              {formatTime(article.publishedAt)}
            </Typography>
          </Box>
        </Box>
        
        <Typography 
          variant="h3" 
          component="h1" 
          className="text-white font-bold mb-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl"
          sx={{ 
            textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
            fontWeight: 800,
            lineHeight: 1.2
          }}
        >
          {article.title}
        </Typography>
        
        <Typography 
          variant="subtitle1" 
          className="text-white/90 mb-6 max-w-3xl"
          sx={{ 
            display: {xs: 'none', sm: 'block'},
            fontSize: {sm: '1rem', md: '1.1rem'} 
          }}
        >
          {article.description}
        </Typography>
        
        <Box className="flex items-center space-x-4">
          <Typography variant="body2" className="text-white/80">
            {article.source.name}
          </Typography>
          <Button 
            variant="contained" 
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-black hover:bg-white/90"
            sx={{ 
              fontWeight: 'bold',
              textTransform: 'none',
              borderRadius: '2rem',
              px: 3
            }}
          >
            Read Article
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default HeroSection; 