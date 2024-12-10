import React from 'react';

const Card = ({ movie, openModal }) => {
  return (
    <div className="card" onClick={() => openModal(movie)}>
      <img src={movie.Poster} alt={movie.Title} />
      <div className="card-info">
        <h3>{movie.Title}</h3>
        <p>{movie.Year}</p>
        <div className="rating">
          <span>{movie.imdbRating}</span>
        </div>
      </div>
    </div>
  );
};

export default Card;
