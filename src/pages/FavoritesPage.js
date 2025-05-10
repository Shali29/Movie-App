import React, { useContext } from 'react';
import { Container, Grid, Typography, Box } from '@mui/material';
import MovieCard from '../components/MovieCard';
import { MovieContext } from '../context/MovieContext';

const FavoritesPage = () => {
  const { favorites } = useContext(MovieContext);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        My Favorite Movies
      </Typography>
      {favorites.length === 0 ? (
        <Typography variant="body1">You haven't added any favorites yet.</Typography>
      ) : (
        <Grid container spacing={3}>
          {favorites.map(movie => (
            <Grid item key={movie.id} xs={12} sm={6} md={4} lg={3}>
              <MovieCard movie={movie} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default FavoritesPage;