import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { MovieProvider } from './context/MovieContext';
import { ThemeProvider as CustomThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import FavoritesPage from './pages/FavoritesPage';
import MovieDetails from './components/MovieDetails';

const App = () => {
  const { darkMode } = useContext(CustomThemeProvider);

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
  });

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/favorites" element={<FavoritesPage />} />
        </Routes>
        <MovieDetails />
      </ThemeProvider>
    </Router>
  );
};

const AppWrapper = () => {
  return (
    <CustomThemeProvider>
      <MovieProvider>
        <App />
      </MovieProvider>
    </CustomThemeProvider>
  );
};

export default AppWrapper;