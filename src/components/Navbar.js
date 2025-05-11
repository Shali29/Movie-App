import React, { useContext } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  TextField, 
  InputAdornment, 
  IconButton,
  Box
} from '@mui/material';
import { MovieContext } from '../context/MovieContext';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import SearchIcon from '@mui/icons-material/Search';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import LogoutIcon from '@mui/icons-material/Logout';

const Navbar = () => {
  const { search } = useContext(MovieContext);
  const { darkMode, toggleTheme } = useTheme();
  const { isAuthenticated, logout } = useAuth();
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
        
        {isAuthenticated && (
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
        )}
        
        <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
          <IconButton onClick={toggleTheme} color="inherit">
            {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
          
          {isAuthenticated && (
            <IconButton onClick={logout} color="inherit">
              <LogoutIcon />
            </IconButton>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;