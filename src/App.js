import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { MovieProvider } from './context/MovieContext';
import { ThemeProvider as CustomThemeProvider, ThemeContext } from './context/ThemeContext'; // Import ThemeContext
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import FavoritesPage from './pages/FavoritesPage';
import MovieDetails from './components/MovieDetails';

const AppContent = () => {
  const { darkMode } = React.useContext(ThemeContext); // Use ThemeContext here

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/favorites" element={<FavoritesPage />} />
        </Routes>
        <MovieDetails />
      </Router>
    </ThemeProvider>
  );
};

const App = () => {
  return (
    <CustomThemeProvider>
      <MovieProvider>
        <AppContent />
      </MovieProvider>
    </CustomThemeProvider>
  );
};

export default App;