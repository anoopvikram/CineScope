import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./styles/MovieDetails.css";

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
    axios
      .get(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!movie) return <div 
  style={{ 
    width: "100vw", 
    height: "100vh", 
    padding: "2rem", 
    backgroundColor: "#121212" 
  }}>
    <p style={{color:"white"}}>Loading..</p>
  </div>;

  return (
    <div className="container movie-detail">
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        className="poster"
      />
      <div className="info">
        <h1>{movie.title}</h1>
        <p><strong>Release:</strong> {movie.release_date}</p>
        <p><strong>Overview:</strong> {movie.overview}</p>
        <p><strong>Rating:</strong> ⭐ {movie.vote_average}</p>
        <p><strong>Runtime:</strong> {movie.runtime} mins</p>
      </div>
    </div>
  );
}

export default MovieDetails;
