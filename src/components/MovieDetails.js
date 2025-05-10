import React, { useContext } from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Button, 
  Typography, 
  Chip, 
  Box, 
  Grid, 
  Rating,
  IconButton
} from '@mui/material';
import { MovieContext } from '../context/MovieContext';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import YouTubeIcon from '@mui/icons-material/YouTube';
import CloseIcon from '@mui/icons-material/Close';

const MovieDetails = () => {
  const { selectedMovie, selectMovie, favorites, addToFavorites, removeFromFavorites } = useContext(MovieContext);
  const isFavorite = selectedMovie && favorites.some(fav => fav.id === selectedMovie.id);

  if (!selectedMovie) return null;

  const handleClose = () => {
    selectMovie(null);
  };

  const handleFavoriteClick = () => {
    if (isFavorite) {
      removeFromFavorites(selectedMovie.id);
    } else {
      addToFavorites(selectedMovie);
    }
  };

  const trailer = selectedMovie.videos?.results.find(video => video.type === 'Trailer');

  return (
    <Dialog open={!!selectedMovie} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          {selectedMovie.title}
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <img
              src={selectedMovie.poster_path ? `https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}` : 'https://via.placeholder.com/500x750'}
              alt={selectedMovie.title}
              style={{ width: '100%', borderRadius: 8 }}
            />
            <Box mt={2} display="flex" justifyContent="space-between" alignItems="center">
              <Rating
                value={selectedMovie.vote_average / 2}
                precision={0.5}
                readOnly
              />
              <IconButton onClick={handleFavoriteClick} size="large">
                {isFavorite ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
              </IconButton>
            </Box>
          </Grid>
          <Grid item xs={12} md={8}>
            <Typography variant="h6" gutterBottom>
              Overview
            </Typography>
            <Typography paragraph>
              {selectedMovie.overview}
            </Typography>
            
            <Typography variant="h6" gutterBottom>
              Genres
            </Typography>
            <Box mb={2}>
              {selectedMovie.genres?.map(genre => (
                <Chip key={genre.id} label={genre.name} style={{ marginRight: 8, marginBottom: 8 }} />
              ))}
            </Box>
            
            <Typography variant="h6" gutterBottom>
              Release Date
            </Typography>
            <Typography paragraph>
              {new Date(selectedMovie.release_date).toLocaleDateString()}
            </Typography>
            
            {trailer && (
              <>
                <Typography variant="h6" gutterBottom>
                  Trailer
                </Typography>
                <Button
                  variant="contained"
                  color="error"
                  startIcon={<YouTubeIcon />}
                  href={`https://www.youtube.com/watch?v=${trailer.key}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Watch Trailer
                </Button>
              </>
            )}
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default MovieDetails;