import React, { useContext } from 'react';
import { Card, CardMedia, CardContent, Typography, CardActions, Button, Rating, IconButton } from '@mui/material';
import { MovieContext } from '../context/MovieContext';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const MovieCard = ({ movie }) => {
  const { selectMovie, favorites, addToFavorites, removeFromFavorites } = useContext(MovieContext);
  const isFavorite = favorites.some(fav => fav.id === movie.id);

  const handleFavoriteClick = () => {
    if (isFavorite) {
      removeFromFavorites(movie.id);
    } else {
      addToFavorites(movie);
    }
  };

  return (
    <Card sx={{ maxWidth: 345, height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardMedia
        component="img"
        height="140"
        image={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'https://via.placeholder.com/500x750'}
        alt={movie.title}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h6" component="div">
          {movie.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {new Date(movie.release_date).getFullYear()}
        </Typography>
        <Rating
          name="read-only"
          value={movie.vote_average / 2}
          precision={0.5}
          readOnly
        />
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => selectMovie(movie.id)}>View Details</Button>
        <IconButton onClick={handleFavoriteClick}>
          {isFavorite ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default MovieCard;