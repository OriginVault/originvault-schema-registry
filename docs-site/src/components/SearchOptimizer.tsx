import React, { useState, useEffect } from 'react';
import { Search } from '@mui/icons-material';
import {
  Autocomplete,
  Box,
  Card,
  CardContent,
  Chip,
  InputAdornment,
  TextField,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  Paper
} from '@mui/material';

interface SearchSuggestion {
  id: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
}

interface SearchOptimizerProps {
  onSearch?: (query: string) => void;
  suggestions?: SearchSuggestion[];
}

const SearchOptimizer: React.FC<SearchOptimizerProps> = ({ 
  onSearch, 
  suggestions = [] 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [popularSearches] = useState([
    'verifiable credentials',
    'JSON schema',
    'DID documents',
    'C2PA manifests',
    'trust registry',
    'identity verification',
    'content authenticity',
    'blockchain proofs'
  ]);

  // Load recent searches from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('recentSearches');
    if (saved) {
      try {
        setRecentSearches(JSON.parse(saved));
      } catch (error) {
        console.error('Failed to parse recent searches:', error);
      }
    }
  }, []);

  // Save search to recent searches
  const saveSearch = (query: string) => {
    if (!query.trim()) return;
    
    const updated = [query, ...recentSearches.filter(s => s !== query)].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem('recentSearches', JSON.stringify(updated));
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    saveSearch(query);
    if (onSearch) {
      onSearch(query);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleSearch(searchQuery);
    }
  };

  // Generate search suggestions based on query
  const getSuggestions = (query: string): SearchSuggestion[] => {
    if (!query.trim()) return [];
    
    const lowerQuery = query.toLowerCase();
    return suggestions.filter(item => 
      item.title.toLowerCase().includes(lowerQuery) ||
      item.description.toLowerCase().includes(lowerQuery) ||
      item.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
    );
  };

  const currentSuggestions = getSuggestions(searchQuery);

  return (
    <Box sx={{ width: '100%', maxWidth: 800, mx: 'auto' }}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Search OriginVault Schema Registry
      </Typography>
      
      <Typography variant="body1" color="text.secondary" align="center" sx={{ mb: 4 }}>
        Find schemas, examples, and documentation for verifiable credentials and decentralized identity
      </Typography>

      {/* Main Search Input */}
      <Autocomplete
        freeSolo
        options={currentSuggestions}
        getOptionLabel={(option) => 
          typeof option === 'string' ? option : option.title
        }
        inputValue={searchQuery}
        onInputChange={(_, newInputValue) => {
          setSearchQuery(newInputValue);
        }}
        onChange={(_, newValue) => {
          if (typeof newValue === 'string') {
            handleSearch(newValue);
          } else if (newValue) {
            handleSearch(newValue.title);
          }
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder="Search schemas, credentials, or documentation..."
            variant="outlined"
            fullWidth
            onKeyPress={handleKeyPress}
            InputProps={{
              ...params.InputProps,
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
          />
        )}
        renderOption={(props, option) => (
          <Box component="li" {...props}>
            <Box>
              <Typography variant="subtitle1">{option.title}</Typography>
              <Typography variant="body2" color="text.secondary">
                {option.description}
              </Typography>
              <Box sx={{ mt: 1 }}>
                {option.tags.map((tag) => (
                  <Chip
                    key={tag}
                    label={tag}
                    size="small"
                    sx={{ mr: 0.5, mb: 0.5 }}
                  />
                ))}
              </Box>
            </Box>
          </Box>
        )}
      />

      {/* Search Suggestions */}
      {currentSuggestions.length > 0 && (
        <Paper sx={{ mt: 2, p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Search Results
          </Typography>
          <List>
            {currentSuggestions.map((suggestion, index) => (
              <React.Fragment key={suggestion.id}>
                <ListItem button onClick={() => handleSearch(suggestion.title)}>
                  <ListItemText
                    primary={suggestion.title}
                    secondary={
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          {suggestion.description}
                        </Typography>
                        <Box sx={{ mt: 1 }}>
                          {suggestion.tags.map((tag) => (
                            <Chip
                              key={tag}
                              label={tag}
                              size="small"
                              sx={{ mr: 0.5, mb: 0.5 }}
                            />
                          ))}
                        </Box>
                      </Box>
                    }
                  />
                </ListItem>
                {index < currentSuggestions.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        </Paper>
      )}

      {/* Recent Searches */}
      {recentSearches.length > 0 && (
        <Card sx={{ mt: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Recent Searches
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {recentSearches.map((search) => (
                <Chip
                  key={search}
                  label={search}
                  clickable
                  onClick={() => handleSearch(search)}
                  onDelete={() => {
                    const updated = recentSearches.filter(s => s !== search);
                    setRecentSearches(updated);
                    localStorage.setItem('recentSearches', JSON.stringify(updated));
                  }}
                />
              ))}
            </Box>
          </CardContent>
        </Card>
      )}

      {/* Popular Searches */}
      <Card sx={{ mt: 2 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Popular Searches
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {popularSearches.map((search) => (
              <Chip
                key={search}
                label={search}
                clickable
                onClick={() => handleSearch(search)}
                variant="outlined"
              />
            ))}
          </Box>
        </CardContent>
      </Card>

      {/* Search Tips */}
      <Card sx={{ mt: 2 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Search Tips
          </Typography>
          <Typography variant="body2" paragraph>
            • Use specific terms like "verifiable credential" or "DID document"
          </Typography>
          <Typography variant="body2" paragraph>
            • Search by category: "identity", "business", "content", "trust"
          </Typography>
          <Typography variant="body2" paragraph>
            • Use tags to find related schemas and examples
          </Typography>
          <Typography variant="body2">
            • Try searching for specific standards like "C2PA" or "JSON-LD"
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default SearchOptimizer; 