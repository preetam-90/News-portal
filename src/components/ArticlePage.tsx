import React, { useEffect, useState } from 'react';
import { Box, Typography, Container, Divider, Avatar, Chip } from '@mui/material';
import { AccessTime as TimeIcon, Person as PersonIcon } from '@mui/icons-material';

interface ArticlePageProps {
  article: {
    title: string;
    content: string;
    imageUrl: string;
    author: string;
    publishedAt: string;
    category: string;
    source: string;
    readTime: number;
  };
}

const ArticlePage: React.FC<ArticlePageProps> = ({ article }) => {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Format date for display
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Function to create content with drop cap for first paragraph
  const renderContent = (content: string) => {
    const paragraphs = content.split('\n\n');
    
    return paragraphs.map((paragraph, index) => {
      if (index === 0) {
        // First paragraph with drop cap
        const firstLetter = paragraph.charAt(0);
        const restOfParagraph = paragraph.slice(1);
        
        return (
          <Typography 
            key={index} 
            variant="body1" 
            paragraph 
            className="first-letter:float-left first-letter:text-7xl first-letter:font-serif
                      first-letter:mr-3 first-letter:text-gray-900 dark:first-letter:text-gray-100
                      first-letter:mt-1"
            sx={{ 
              mb: 4,
              fontSize: '1.125rem',
              lineHeight: 1.8
            }}
          >
            {firstLetter}{restOfParagraph}
          </Typography>
        );
      }
      
      return (
        <Typography 
          key={index} 
          variant="body1" 
          paragraph
          sx={{ 
            mb: 4,
            fontSize: '1.125rem',
            lineHeight: 1.8
          }}
        >
          {paragraph}
        </Typography>
      );
    });
  };

  return (
    <Box className="min-h-screen bg-gray-50 dark:bg-slate-900">
      {/* Article Header */}
      <Container maxWidth="md" sx={{ pt: 12, pb: 6 }}>
        <Box sx={{ mb: 4 }}>
          <Chip 
            label={article.category} 
            size="small"
            color="primary"
            sx={{ mb: 2, fontWeight: 'medium' }}
          />
          <Typography 
            variant="h1" 
            component="h1" 
            className="font-serif dark:text-white"
            sx={{ 
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3.5rem' },
              lineHeight: 1.2,
              fontWeight: 700,
              mb: 3
            }}
          >
            {article.title}
          </Typography>
          
          <Box className="flex items-center space-x-4 mt-4 mb-6">
            <Box className="flex items-center">
              <Avatar sx={{ mr: 1, width: 32, height: 32 }}>
                <PersonIcon />
              </Avatar>
              <Typography variant="subtitle1" className="text-gray-700 dark:text-gray-300">
                By {article.author}
              </Typography>
            </Box>
            <Divider orientation="vertical" flexItem />
            <Typography variant="subtitle2" className="text-gray-500 dark:text-gray-400 flex items-center">
              {formatDate(article.publishedAt)}
            </Typography>
            <Divider orientation="vertical" flexItem />
            <Typography variant="subtitle2" className="text-gray-500 dark:text-gray-400 flex items-center">
              <TimeIcon sx={{ fontSize: 16, mr: 0.5 }} />
              {article.readTime} min read
            </Typography>
          </Box>
        </Box>
      </Container>
      
      {/* Cover Image with Parallax */}
      <Box 
        className="relative w-full overflow-hidden"
        sx={{ 
          height: { xs: '30vh', sm: '40vh', md: '60vh' },
          maxHeight: '800px',
          mb: { xs: 4, md: 8 }
        }}
      >
        <Box 
          className="absolute inset-0 w-full h-full"
          sx={{
            backgroundImage: `url(${article.imageUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transform: `translateY(${scrollPosition * 0.3}px)`,
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: 0,
              left: 0,
              width: '100%',
              height: '30%',
              background: 'linear-gradient(to top, var(--bg-color), transparent)',
              backdropFilter: 'blur(2px)',
            }
          }}
        />
      </Box>
      
      {/* Article Content */}
      <Container 
        maxWidth="md" 
        sx={{ 
          py: 4,
          px: { xs: 3, sm: 4, md: 6 },
          mb: 10,
          backgroundColor: 'white',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
        }}
        className="dark:bg-slate-800 dark:text-gray-100"
      >
        <Box sx={{ maxWidth: '650px', mx: 'auto' }}>
          {renderContent(article.content)}
          
          <Divider sx={{ my: 6 }} />
          
          <Box className="flex justify-between items-center">
            <Typography variant="subtitle2" className="text-gray-600 dark:text-gray-400">
              Source: {article.source}
            </Typography>
            <Typography variant="subtitle2" className="text-gray-600 dark:text-gray-400">
              Published: {formatDate(article.publishedAt)}
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default ArticlePage; 