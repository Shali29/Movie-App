import React, { createContext, useState, useEffect } from 'react';
import { fetchTrendingMovies, searchMovies, getMovieDetails } from '../services/api';

export const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [trending, setTrending] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const loadTrending = async () => {
      try {
        setLoading(true);
        const data = await fetchTrendingMovies();
        setTrending(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadTrending();
  }, []);

  useEffect(() => {
    if (query) {
      const loadSearchResults = async () => {
        try {
          setLoading(true);
          const data = await searchMovies(query, page);
          setMovies(prev => page === 1 ? data.results : [...prev, ...data.results]);
          setTotalPages(data.total_pages);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };

      loadSearchResults();
    }
  }, [query, page]);

  const search = (searchQuery) => {
    setQuery(searchQuery);
    setPage(1);
    localStorage.setItem('lastSearch', searchQuery);
  };

  const loadMore = () => {
    if (page < totalPages) {
      setPage(prev => prev + 1);
    }
  };

  const selectMovie = async (id) => {
    try {
      setLoading(true);
      const movie = await getMovieDetails(id);
      setSelectedMovie(movie);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addToFavorites = (movie) => {
    const newFavorites = [...favorites, movie];
    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
  };

  const removeFromFavorites = (id) => {
    const newFavorites = favorites.filter(movie => movie.id !== id);
    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
  };

  return (
    <MovieContext.Provider value={{
      movies,
      trending,
      selectedMovie,
      loading,
      error,
      query,
      search,
      loadMore,
      selectMovie,
      favorites,
      addToFavorites,
      removeFromFavorites
    }}>
      {children}
    </MovieContext.Provider>
  );
};