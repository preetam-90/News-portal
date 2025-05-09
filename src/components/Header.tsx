import React, { useState, useEffect } from 'react';
import { Typography, InputBase, Box, IconButton, Drawer, List, ListItem, ListItemText } from '@mui/material';
import { Search as SearchIcon, Menu as MenuIcon, Close as CloseIcon } from '@mui/icons-material';
import { styled, alpha } from '@mui/material/styles';
import ThemeToggleButton from './ThemeToggleButton';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '20ch',
      '&:focus': {
        width: '30ch',
      },
    },
  },
}));

interface HeaderProps {
  onSearch: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onSearch }) => {
  const [searchValue, setSearchValue] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setSearchValue(newValue);
    onSearch(newValue);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const mobileMenuItems = [
    { text: 'Home', link: '/' },
    { text: 'Categories', link: '/categories' },
    { text: 'Sources', link: '/sources' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out 
                    bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl shadow-sm
                    ${isScrolled ? 'h-14' : 'h-20'}`}
      >
        <div className="container mx-auto px-4 h-full flex items-center justify-between">
          <Typography 
            variant="h6" 
            component="div" 
            className={`text-black dark:text-white font-bold transition-all duration-300 ${isScrolled ? 'text-lg' : 'text-xl'}`}
          >
            NewsPortal
          </Typography>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex space-x-6 items-center">
            <a href="#" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Home</a>
            <a href="#" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Categories</a>
            <a href="#" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Sources</a>
          </nav>

          <div className="flex items-center">
            <Search className="hidden sm:block">
              <SearchIconWrapper>
                <SearchIcon style={{ color: '#888' }}/>
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search news..."
                inputProps={{ 'aria-label': 'search' }}
                value={searchValue}
                onChange={handleSearchChange}
                className="dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400"
              />
            </Search>
            <ThemeToggleButton />
            {/* Hamburger Menu Icon for mobile */}
            <div className="md:hidden ml-2">
              <IconButton color="inherit" aria-label="open drawer" edge="start" onClick={toggleMobileMenu}>
                {isMobileMenuOpen ? <CloseIcon className="text-black dark:text-white" /> : <MenuIcon className="text-black dark:text-white" />}
              </IconButton>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <Drawer
        anchor="right"
        open={isMobileMenuOpen}
        onClose={toggleMobileMenu}
        sx={{
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: 250,
            paddingTop: isScrolled ? '3.5rem' : '5rem',
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(10px)',
            '@media (prefers-color-scheme: dark)': {
              backgroundColor: 'rgba(30, 41, 59, 0.8)',
            },
          },
        }}
        className="md:hidden"
      >
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleMobileMenu}
          onKeyDown={toggleMobileMenu}
        >
          <List>
            {mobileMenuItems.map((item) => (
              <ListItem key={item.text} component="a" href={item.link}>
                <ListItemText primary={item.text} primaryTypographyProps={{ className: "dark:text-white"}} />
              </ListItem>
            ))}
            {/* Search bar for mobile menu */}
            <ListItem>
                 <Search className="w-full sm:hidden">
                    <SearchIconWrapper>
                        <SearchIcon style={{ color: '#888' }} />
                    </SearchIconWrapper>
                    <StyledInputBase
                        placeholder="Search news..."
                        inputProps={{ 'aria-label': 'search' }}
                        value={searchValue}
                        onChange={handleSearchChange}
                        className="dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 w-full"
                    />
                </Search>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Header; 