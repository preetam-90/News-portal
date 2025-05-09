import { useMemo, useState, useEffect } from 'react';
import { ThemeProvider, createTheme, CssBaseline, Box } from '@mui/material';
import Grid from '@mui/material/Grid';
import axios from 'axios';
import { 
  Header, 
  NewsList, 
  Categories, 
  SourceSelector, 
  HeroSection, 
  TrendingStrip, 
  BackToTop 
} from './components';
import { useTheme } from './contexts/ThemeContext';

// Setup API keys with rotation mechanism
const API_KEYS = [
  import.meta.env.VITE_NEWS_API_KEY_1,
  import.meta.env.VITE_NEWS_API_KEY_2,
  import.meta.env.VITE_NEWS_API_KEY_3,
];

let currentApiKeyIndex = 0;

const getApiKey = () => {
  return API_KEYS[currentApiKeyIndex];
};

const switchApiKey = () => {
  currentApiKeyIndex = (currentApiKeyIndex + 1) % API_KEYS.length;
  console.log(`Switched to API key ${currentApiKeyIndex + 1}`);
  return API_KEYS[currentApiKeyIndex];
};

const BASE_URL = 'https://newsapi.org/v2';

// Sample trending tags for the TrendingStrip
const trendingTags = [
  { id: 'live', label: 'Live', icon: '🔴', color: '#f44336', articles: 15 },
  { id: 'opinion', label: 'Opinion', icon: '🧠', color: '#9c27b0', articles: 8 },
  { id: 'gaming', label: 'Gaming', icon: '🎮', color: '#2196f3', articles: 12 },
  { id: 'tech', label: 'Tech', icon: '💻', color: '#00bcd4', articles: 20 },
  { id: 'finance', label: 'Finance', icon: '💰', color: '#4caf50', articles: 10 },
  { id: 'sports', label: 'Sports', icon: '⚽', color: '#ff9800', articles: 18 },
  { id: 'health', label: 'Health', icon: '🏥', color: '#795548', articles: 7 },
  { id: 'world', label: 'World', icon: '🌎', color: '#607d8b', articles: 14 },
];

// Sample article previews for the TrendingStrip tooltips
const articlePreviews = [
  { id: '1', title: 'Breaking news: Major tech announcement', imageUrl: 'https://via.placeholder.com/300x150', tagId: 'live' },
  { id: '2', title: 'Why the market is shifting towards AI', imageUrl: 'https://via.placeholder.com/300x150', tagId: 'opinion' },
  { id: '3', title: 'New AAA game release breaks records', imageUrl: 'https://via.placeholder.com/300x150', tagId: 'gaming' },
  { id: '4', title: 'Latest smartphones compared', imageUrl: 'https://via.placeholder.com/300x150', tagId: 'tech' },
  { id: '5', title: 'Stock market updates for Q2', imageUrl: 'https://via.placeholder.com/300x150', tagId: 'finance' },
  { id: '6', title: 'Championship finals set for weekend', imageUrl: 'https://via.placeholder.com/300x150', tagId: 'sports' },
  { id: '7', title: 'New breakthrough in medical research', imageUrl: 'https://via.placeholder.com/300x150', tagId: 'health' },
  { id: '8', title: 'Global summit addresses climate change', imageUrl: 'https://via.placeholder.com/300x150', tagId: 'world' },
];

function App() {
  const { theme } = useTheme(); // Get current theme from our ThemeContext
  console.log('Current theme in App.tsx:', theme); // Debug theme state
  
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('general');
  const [selectedSource, setSelectedSource] = useState('');
  const [selectedTag, setSelectedTag] = useState('');

  // Create a Material UI theme that responds to our dark/light theme state
  const muiTheme = useMemo(() => createTheme({
    palette: {
      mode: theme === 'dark' ? 'dark' : 'light',
      primary: {
        main: '#1976d2',
      },
    },
  }), [theme]);

  const fetchNews = async (query = '', category = selectedCategory, source = selectedSource) => {
    setLoading(true);
    try {
      let endpoint;
      let apiKey = getApiKey();
      
      if (source) {
        // If a specific source is selected
        endpoint = `${BASE_URL}/top-headlines?sources=${source}&apiKey=${apiKey}`;
      } else if (query) {
        // If searching, use the /everything endpoint
        endpoint = `${BASE_URL}/everything?q=${query}&sortBy=popularity&apiKey=${apiKey}`;
      } else {
        // Otherwise fetch top headlines by category
        endpoint = `${BASE_URL}/top-headlines?country=us&category=${category}&apiKey=${apiKey}`;
      }

      const response = await axios.get(endpoint);
      setArticles(response.data.articles);
    } catch (error) {
      console.error('Error fetching news:', error);
      
      // Try another API key if we have an error
      if (API_KEYS.length > 1) {
        const newApiKey = switchApiKey();
        console.log('Retrying with another API key...');
        
        // Retry the fetch with the new API key
        try {
          let retryEndpoint;
          
          if (source) {
            retryEndpoint = `${BASE_URL}/top-headlines?sources=${source}&apiKey=${newApiKey}`;
          } else if (query) {
            retryEndpoint = `${BASE_URL}/everything?q=${query}&sortBy=popularity&apiKey=${newApiKey}`;
          } else {
            retryEndpoint = `${BASE_URL}/top-headlines?country=us&category=${category}&apiKey=${newApiKey}`;
          }

          const retryResponse = await axios.get(retryEndpoint);
          setArticles(retryResponse.data.articles);
        } catch (retryError) {
          console.error('Error with fallback API key:', retryError);
        }
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews('', selectedCategory, selectedSource);
  }, [selectedCategory, selectedSource]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.length >= 3) {
      fetchNews(query, selectedCategory, '');
      setSelectedSource(''); // Reset source when searching
    } else if (query.length === 0) {
      fetchNews('', selectedCategory, selectedSource);
    }
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setSearchQuery('');
    setSelectedSource(''); // Reset source when changing category
  };

  const handleSourceSelect = (source: string) => {
    setSelectedSource(source);
    setSearchQuery('');
    // When a source is selected, category is not applicable
    // since the News API doesn't support filtering by both source and category
    if (source) {
      setSelectedCategory('general');
    }
  };

  const handleTagClick = (tagId: string) => {
    setSelectedTag(tagId);
    fetchNews(tagId, 'general', '');
    
    console.log(`Selected tag: ${tagId}, state updated to: ${selectedTag}`);
  };

  // Get the featured article (first article) for the hero section
  const featuredArticle = articles.length > 0 ? articles[0] : null;
  // Rest of the articles for the news list (skip the first one)
  const restOfArticles = articles.slice(1);

  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <div className={`App min-h-screen ${theme === 'dark' ? 'bg-slate-900 text-white' : 'bg-gray-50 text-slate-900'}`}>
        <Header onSearch={handleSearch} />
        
        <div className="pt-20 pb-8 container max-w-6xl mx-auto px-4 relative"> 
          {/* Hero Section */}
          {!searchQuery && !selectedSource && featuredArticle && (
            <HeroSection article={featuredArticle} />
          )}
          
          {/* Trending Tags */}
          <TrendingStrip 
            tags={trendingTags} 
            articlePreviews={articlePreviews}
            onTagClick={handleTagClick} 
          />
          
          {/* Filters Section */}
          <Box sx={{ mb: 4 }}>
            <Grid container spacing={2}>
              <Box sx={{ width: { xs: '100%', md: '66.66%' }, p: 1 }}>
                <Categories 
                  onCategorySelect={handleCategorySelect} 
                  selectedCategory={selectedCategory} 
                />
              </Box>
              <Box sx={{ width: { xs: '100%', md: '33.33%' }, p: 1 }}>
                <SourceSelector 
                  onSourceSelect={handleSourceSelect}
                  selectedSource={selectedSource}
                />
              </Box>
            </Grid>
          </Box>
          
          {/* News Grid */}
          <NewsList 
            articles={searchQuery || selectedSource ? articles : restOfArticles} 
            loading={loading} 
          />
          
          {/* Back to Top Button */}
          <BackToTop />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
