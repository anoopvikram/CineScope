import React, { useState } from "react";
import axios from "axios";
import "./styles/Search.css"; // optional if you want separate CSS

function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    if (!query) return;

    try {
      const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
      const res = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`
      );
      setResults(res.data.results);
    } catch (err) {
      console.error("Search error:", err);
    }
  };

  return (
    <div className="search-container">
      <h2>🎬 Search Movies</h2>
      <div className="search-box">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter movie name..."
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      <div className="results-grid">
        {results.length === 0 ? (
          <p style={{ color: "#999" }}>No results yet.</p>
        ) : (
          results.map((movie) => (
            <div className="movie-card" key={movie.id}>
              {movie.poster_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                  alt={movie.title}
                />
              ) : (
                <div className="no-image">No Image</div>
              )}
              <h3>{movie.title}</h3>
              <p>{movie.release_date}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Search;
