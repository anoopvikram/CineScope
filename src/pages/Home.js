import React, { useEffect, useState } from "react";
import axios from "axios";
import MovieCard from "../components/MovieCard";
import "./styles/Home.css";
import LandingPage from "../components/LandingPage";

function Home() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
      const res = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`
      );
      setMovies(res.data.results);
    };

    fetchMovies();
  }, []);

  return (
    <div className="container">
      
      <div className="landing-page">
        <LandingPage />
      </div>
      <div >
        <p className="sub-head">This website is built using React and showcases some of my favorite movies while highlighting my front-end development skills through smooth UI and responsive design.
        </p>
      </div>
      <h2>Popular Movies</h2>
      <div className="movie-grid">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
      <footer><p>&copy; 2025 Made by Anoop Vikram. All rights reserved.</p></footer>
    </div>
  );
}

export default Home;
