import React, { useContext, useEffect } from 'react';
import { Container, Grid, Typography, Button, Box } from '@mui/material';
import MovieCard from '../components/MovieCard';
import { MovieContext } from '../context/MovieContext';

const Home = () => {
  const { movies, trending, loading, error, loadMore, page, totalPages } = useContext(MovieContext);

  useEffect(() => {
    const lastSearch = localStorage.getItem('lastSearch');
    if (lastSearch && !movies.length) {
    }
  }, [movies.length]); 

  if (error) {
    return (
      <Container>
        <Typography color="error">{error}</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {!movies.length && (
        <>
          <Typography variant="h4" gutterBottom>
            Trending Movies
          </Typography>
          <Grid container spacing={3}>
            {trending.map(movie => (
              <Grid item key={movie.id} xs={12} sm={6} md={4} lg={3}>
                <MovieCard movie={movie} />
              </Grid>
            ))}
          </Grid>
        </>
      )}

      {movies.length > 0 && (
        <>
          <Typography variant="h4" gutterBottom>
            Search Results
          </Typography>
          <Grid container spacing={3}>
            {movies.map(movie => (
              <Grid item key={movie.id} xs={12} sm={6} md={4} lg={3}>
                <MovieCard movie={movie} />
              </Grid>
            ))}
          </Grid>

          {page < totalPages && (
            <Box display="flex" justifyContent="center" mt={4}>
              <Button
                variant="contained"
                onClick={loadMore}
                disabled={loading}
              >
                {loading ? 'Loading...' : 'Load More'}
              </Button>
            </Box>
          )}
        </>
      )}
    </Container>
  );
};

export default Home;
