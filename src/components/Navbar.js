import React, { useContext } from 'react';
import { AppBar, Toolbar, Typography, Button, TextField, InputAdornment, IconButton } from '@mui/material';
import { MovieContext } from '../context/MovieContext';
import { ThemeContext } from '../context/ThemeContext';
import SearchIcon from '@mui/icons-material/Search';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

const Navbar = () => {
  const { search } = useContext(MovieContext);
  const { darkMode, toggleTheme } = useContext(ThemeContext);
  const [searchQuery, setSearchQuery] = React.useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    search(searchQuery);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Movie Explorer
        </Typography>
        
        <form onSubmit={handleSearch}>
          <TextField
            size="small"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search movies..."
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </form>
        
        <IconButton onClick={toggleTheme} color="inherit">
          {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;