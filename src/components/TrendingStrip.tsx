import React, { useRef } from 'react';
import { Box, Chip, Typography, Tooltip, Paper } from '@mui/material';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';

interface TrendingTag {
  id: string;
  label: string;
  icon: string;
  color: string;
  articles: number;
}

interface ArticlePreview {
  id: string;
  title: string;
  imageUrl: string;
  tagId: string;
}

interface TrendingStripProps {
  tags: TrendingTag[];
  articlePreviews: ArticlePreview[];
  onTagClick: (tag: string) => void;
}

const TrendingStrip: React.FC<TrendingStripProps> = ({ 
  tags, 
  articlePreviews,
  onTagClick 
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleScrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };

  const handleScrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

  const getPreviewForTag = (tagId: string) => {
    return articlePreviews.find(preview => preview.tagId === tagId);
  };

  return (
    <Box className="relative w-full mb-10 mx-auto" sx={{ maxWidth: '1100px' }}>
      {/* Navigation Arrows */}
      <Box 
        className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white dark:bg-slate-800 
                  rounded-full shadow-md flex items-center justify-center cursor-pointer"
        sx={{ 
          width: 36, 
          height: 36,
          opacity: 0.8,
          '&:hover': { opacity: 1 },
          display: { xs: 'none', sm: 'flex' }
        }}
        onClick={handleScrollLeft}
      >
        <KeyboardArrowLeft />
      </Box>
      
      <Box 
        className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white dark:bg-slate-800 
                  rounded-full shadow-md flex items-center justify-center cursor-pointer"
        sx={{ 
          width: 36, 
          height: 36,
          opacity: 0.8,
          '&:hover': { opacity: 1 },
          display: { xs: 'none', sm: 'flex' }
        }}
        onClick={handleScrollRight}
      >
        <KeyboardArrowRight />
      </Box>
      
      {/* Scrollable Tag Container */}
      <Box 
        ref={scrollContainerRef}
        className="flex space-x-3 overflow-x-auto py-4 px-2 no-scrollbar"
        sx={{
          scrollSnapType: 'x mandatory',
          '&::-webkit-scrollbar': {
            display: 'none'
          },
          msOverflowStyle: 'none',
          scrollbarWidth: 'none',
        }}
      >
        {tags.map((tag) => {
          const preview = getPreviewForTag(tag.id);
          
          return (
            <Tooltip
              key={tag.id}
              title={
                preview ? (
                  <Paper elevation={0} className="p-2 max-w-xs">
                    <Box className="flex flex-col">
                      <Box 
                        className="w-full h-24 rounded-md mb-2 bg-cover bg-center"
                        sx={{ backgroundImage: `url(${preview.imageUrl})` }}
                      />
                      <Typography variant="subtitle2" className="font-medium">
                        {preview.title}
                      </Typography>
                      <Typography variant="caption" className="text-gray-500">
                        {tag.articles} articles
                      </Typography>
                    </Box>
                  </Paper>
                ) : (
                  ''
                )
              }
              arrow
              placement="bottom"
              enterDelay={700}
              leaveDelay={200}
            >
              <Chip
                label={
                  <Box className="flex items-center space-x-1 px-1">
                    <span>{tag.icon}</span>
                    <span>{tag.label}</span>
                  </Box>
                }
                onClick={() => onTagClick(tag.id)}
                className="cursor-pointer font-medium text-sm"
                sx={{
                  scrollSnapAlign: 'start',
                  backgroundColor: tag.color,
                  color: 'white',
                  borderRadius: '9999px',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                  },
                  transition: 'all 0.2s ease-in-out',
                  px: 1,
                  py: 2.5,
                }}
              />
            </Tooltip>
          );
        })}
      </Box>
    </Box>
  );
};

export default TrendingStrip; 