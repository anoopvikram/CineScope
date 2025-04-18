import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import './styles/LandingPage.css';

// 🎬 Movie titles to search on TMDB
const featuredTitles = [
  "John Wick",
  "Taken",
  "Interstellar",
  "The Pursuit of Happyness",
  "Empuraan",
  "KGF 2"
];

function LandingPage() {
  const [featuredMovies, setFeaturedMovies] = useState([]);

  useEffect(() => {
    const fetchFeaturedMovies = async () => {
      const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

      const moviePromises = featuredTitles.map(async (title) => {
        try {
          const res = await axios.get(
            `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(title)}`
          );
          const movie = res.data.results[0];

          return movie
            ? {
                id: movie.id,
                title: movie.title,
                image: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
                release_date: movie.release_date
              }
            : null;
        } catch (err) {
          console.error(`Failed to fetch "${title}":`, err);
          return null;
        }
      });

      const results = await Promise.all(moviePromises);
      setFeaturedMovies(results.filter((m) => m !== null));
    };

    fetchFeaturedMovies();
  }, []);

  return (
    <div className="landing-section">
      <div className="containers">
        {featuredMovies.map((movie) => (
          <Link key={movie.id} to={`/movie/${movie.id}`} className="landing-movie-card">
            <img
              className="img"
              src={movie.image}
              alt={movie.title}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default LandingPage;
