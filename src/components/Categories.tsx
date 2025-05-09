import React from 'react';
import { Box, Chip, Stack, Typography } from '@mui/material';

interface CategoriesProps {
  onCategorySelect: (category: string) => void;
  selectedCategory: string;
}

const Categories: React.FC<CategoriesProps> = ({ onCategorySelect, selectedCategory }) => {
  // Categories available in the News API
  const categories = [
    { name: 'general', label: 'General' },
    { name: 'business', label: 'Business' },
    { name: 'technology', label: 'Technology' },
    { name: 'entertainment', label: 'Entertainment' },
    { name: 'health', label: 'Health' },
    { name: 'science', label: 'Science' },
    { name: 'sports', label: 'Sports' },
  ];

  return (
    <Box sx={{ py: 2, px: 2 }}>
      <Typography variant="subtitle1" sx={{ mb: 1 }}>Categories</Typography>
      <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
        {categories.map((category) => (
          <Chip
            key={category.name}
            label={category.label}
            onClick={() => onCategorySelect(category.name)}
            color={selectedCategory === category.name ? 'primary' : 'default'}
            variant={selectedCategory === category.name ? 'filled' : 'outlined'}
            sx={{ mb: 1 }}
          />
        ))}
      </Stack>
    </Box>
  );
};

export default Categories; 