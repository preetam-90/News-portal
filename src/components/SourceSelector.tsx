import React, { useState, useEffect } from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import type { SelectChangeEvent } from '@mui/material';
import axios from 'axios';

interface SourceSelectorProps {
  onSourceSelect: (source: string) => void;
  selectedSource: string;
}

interface Source {
  id: string;
  name: string;
}

const SourceSelector: React.FC<SourceSelectorProps> = ({ onSourceSelect, selectedSource }) => {
  const [sources, setSources] = useState<Source[]>([]);
  const [loading, setLoading] = useState(true);
  
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
    console.log(`SourceSelector: Switched to API key ${currentApiKeyIndex + 1}`);
    return API_KEYS[currentApiKeyIndex];
  };

  useEffect(() => {
    const fetchSources = async () => {
      try {
        let apiKey = getApiKey();
        const response = await axios.get(`https://newsapi.org/v2/sources?apiKey=${apiKey}`);
        setSources(response.data.sources || []);
      } catch (error) {
        console.error('Error fetching sources:', error);
        
        // Try another API key if we have an error
        if (API_KEYS.length > 1) {
          const newApiKey = switchApiKey();
          console.log('Retrying with another API key...');
          
          try {
            const retryResponse = await axios.get(`https://newsapi.org/v2/sources?apiKey=${newApiKey}`);
            setSources(retryResponse.data.sources || []);
          } catch (retryError) {
            console.error('Error with fallback API key:', retryError);
            setSources([]);
          }
        } else {
          setSources([]);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchSources();
  }, []);

  const handleChange = (event: SelectChangeEvent) => {
    onSourceSelect(event.target.value);
  };

  return (
    <FormControl fullWidth sx={{ py: 2, px: 2 }}>
      <InputLabel id="news-source-label">News Source</InputLabel>
      <Select
        labelId="news-source-label"
        id="news-source-select"
        value={selectedSource}
        label="News Source"
        onChange={handleChange}
        disabled={loading}
      >
        <MenuItem value="">
          <em>All Sources</em>
        </MenuItem>
        {sources.map((source) => (
          <MenuItem key={source.id} value={source.id}>
            {source.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SourceSelector; 