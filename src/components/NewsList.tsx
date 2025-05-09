import React from 'react';
import { Container, CircularProgress, Box, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import NewsCard from './NewsCard';

interface Article {
  title: string;
  description: string;
  urlToImage: string;
  url: string;
  source: {
    name: string;
  };
  publishedAt: string;
}

interface NewsListProps {
  articles: Article[];
  loading: boolean;
}

const NewsList: React.FC<NewsListProps> = ({ articles, loading }) => {
  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '60vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (articles.length === 0) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '60vh',
        }}
      >
        <Typography variant="h5" color="text.secondary">
          No articles found. Try a different search or category.
        </Typography>
      </Box>
    );
  }

  return (
    <Container sx={{ py: 6 }} maxWidth="lg">
      <Grid container spacing={3}>
        {articles.map((article, index) => (
          <Box 
            key={index} 
            sx={{ 
              width: { xs: '100%', sm: '50%', md: '33.33%' }, 
              p: 1.5,
              aspectRatio: '1/1'
            }}
          >
            <Box sx={{ height: '100%' }}>
              <NewsCard
                title={article.title}
                description={article.description}
                imageUrl={article.urlToImage}
                url={article.url}
                source={article.source.name}
                publishedAt={article.publishedAt}
                category={article.source.name.split('.')[0]} // Simple category derivation
              />
            </Box>
          </Box>
        ))}
      </Grid>
    </Container>
  );
};

export default NewsList; 