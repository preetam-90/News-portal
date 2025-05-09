import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Chip,
  IconButton,
  Tooltip,
} from '@mui/material';
import { AccessTime as TimeIcon, Favorite, FavoriteBorder, Share } from '@mui/icons-material';

interface NewsCardProps {
  title: string;
  description: string;
  imageUrl: string;
  url: string;
  source: string;
  publishedAt: string;
  category?: string;
}

const NewsCard: React.FC<NewsCardProps> = ({
  title,
  description,
  imageUrl,
  url,
  source,
  publishedAt,
  category = 'News',
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

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

  const handleLikeToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Implement share functionality here
    if (navigator.share) {
      navigator.share({
        title: title,
        text: description,
        url: url,
      }).catch((error) => console.log('Error sharing', error));
    } else {
      console.log('Web Share API not supported');
      // Fallback could be to copy to clipboard
      navigator.clipboard.writeText(url)
        .then(() => console.log('URL copied to clipboard'))
        .catch(err => console.log('Could not copy URL: ', err));
    }
  };

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
        transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 12px 20px rgba(0,0,0,0.1)',
        },
        // Make card a square
        aspectRatio: '1/1',
        height: '100%',
        width: '100%',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => window.open(url, '_blank', 'noopener,noreferrer')}
      className="cursor-pointer"
    >
      <Box sx={{ position: 'relative', overflow: 'hidden', flex: '1 0 50%' }}>
        <CardMedia
          component="img"
          sx={{
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.4s ease-in-out',
            transform: isHovered ? 'scale(1.05)' : 'scale(1)',
          }}
          image={imageUrl || 'https://via.placeholder.com/300x300?text=No+Image'}
          alt={title}
        />
        <Chip
          label={category}
          size="small"
          className="absolute top-3 left-3"
          sx={{
            backgroundColor: 'rgba(33, 150, 243, 0.85)',
            color: 'white',
            fontWeight: 'medium',
            backdropFilter: 'blur(4px)',
          }}
        />

        {/* Actions Overlay (visible on hover) */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            padding: '8px',
            transition: 'opacity 0.2s ease-in-out',
            opacity: isHovered ? 1 : 0,
            display: 'flex',
            gap: '4px',
            background: 'linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0))',
            width: '100%',
            justifyContent: 'flex-end',
            paddingBottom: '12px',
          }}
        >
          <Tooltip title="Like">
            <IconButton
              size="small"
              onClick={handleLikeToggle}
              sx={{
                backgroundColor: 'rgba(255,255,255,0.15)',
                backdropFilter: 'blur(4px)',
                '&:hover': { backgroundColor: 'rgba(255,255,255,0.25)' },
              }}
            >
              {isLiked ? <Favorite sx={{ color: '#f44336' }} /> : <FavoriteBorder sx={{ color: 'white' }} />}
            </IconButton>
          </Tooltip>
          <Tooltip title="Share">
            <IconButton
              size="small"
              onClick={handleShare}
              sx={{
                backgroundColor: 'rgba(255,255,255,0.15)',
                backdropFilter: 'blur(4px)',
                '&:hover': { backgroundColor: 'rgba(255,255,255,0.25)' },
              }}
            >
              <Share sx={{ color: 'white' }} />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      <CardContent sx={{ 
        flexGrow: 0, 
        p: 2, 
        flex: '1 0 50%', 
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <Typography 
          gutterBottom 
          variant="h6" 
          component="h3"
          className="line-clamp-2 font-semibold"
          sx={{
            fontSize: '1rem',
            mb: 1,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            flex: '0 0 auto'
          }}
        >
          {title}
        </Typography>
        <Typography 
          variant="body2" 
          color="text.secondary"
          className="line-clamp-2"
          sx={{
            mb: 'auto',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            fontSize: '0.75rem',
            flex: '1 1 auto'
          }}
        >
          {description || 'No description available'}
        </Typography>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          mt: 1,
          pt: 1,
          borderTop: '1px solid',
          borderColor: 'rgba(0,0,0,0.08)',
          flex: '0 0 auto'
        }}>
          <Typography variant="caption" color="text.secondary" className="font-medium" sx={{ fontSize: '0.7rem' }}>
            {source}
          </Typography>
          <Box className="flex items-center text-gray-500">
            <TimeIcon fontSize="small" sx={{ mr: 0.5, fontSize: '0.75rem' }} />
            <Typography variant="caption" sx={{ fontSize: '0.7rem' }}>
              {formatTime(publishedAt)}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default NewsCard; 