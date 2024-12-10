import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Card from './components/Card';
import Modal from './components/Modal';
import './App.css';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('movie');

  const fetchMovies = useCallback(async (term) => {
    const response = await fetch(`https://omdbapi.com/?s=${term}&page=1&apikey=fc1fef96`);
    const data = await response.json();
    const moviesWithRatings = await Promise.all(data.Search.map(async (movie) => {
      const movieDetails = await fetchMovieDetails(movie.imdbID);
      return { ...movie, imdbRating: movieDetails.imdbRating };
    }));
    setMovies(moviesWithRatings);
  }, []);

  const fetchMovieDetails = async (id) => {
    const response = await fetch(`https://omdbapi.com/?i=${id}&apikey=fc1fef96`);
    const data = await response.json();
    return data;
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchMovies(searchTerm);
  };

  const openModal = (movie) => {
    fetchMovieDetails(movie.imdbID).then((data) => setSelectedMovie(data));
  };

  const closeModal = () => {
    setSelectedMovie(null);
  };

  useEffect(() => {
    fetchMovies(category);
  }, [category, fetchMovies]);

  return (
    <div className="App">
      <Header setCategory={setCategory} />
      <main>
        <form onSubmit={handleSearch}>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for a movie..."
          />
          <button type="submit">Search</button>
        </form>
        <div className="card-container">
          {movies && movies.map(movie => (
            <Card key={movie.imdbID} movie={movie} openModal={openModal} />
          ))}
        </div>
      </main>
      {selectedMovie && <Modal movie={selectedMovie} closeModal={closeModal} />}
      <Footer className="footer" />
    </div>
  );
};

export default App;
