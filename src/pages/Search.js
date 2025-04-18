import React, { useState, useEffect } from "react";
import axios from "axios";
import "./styles/Search.css"; // optional if you want separate CSS
import MovieCard from "../components/MovieCard";

function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    const savedQuery = sessionStorage.getItem("lastQuery");
    const savedResults = sessionStorage.getItem("lastResults");
  
    if (savedQuery && savedResults) {
      setQuery(savedQuery);
      setResults(JSON.parse(savedResults));
    }
  }, []);

  const handleSearch = async () => {
    if (!query) return;
  
    try {
      const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
      const res = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`
      );
      setResults(res.data.results);
      
      // Save to sessionStorage
      sessionStorage.setItem("lastQuery", query);
      sessionStorage.setItem("lastResults", JSON.stringify(res.data.results));
    } catch (err) {
      console.error("Search error:", err);
    }
  };
  
  return (
    <div className="search-container">
      <h2>Search Movies</h2>
      <div className="search-box">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        placeholder="Enter movie name"
      />

        <button onClick={handleSearch}>Search</button>
      </div>

      <div className="results-grid">
        {results.length === 0 ? (
          <div className="before-search"></div>
        ) : (
          results.map((movie) => (
            <div>
              {movie.poster_path ? (
                <MovieCard key={movie.id} movie={movie} />
              ) : (
                <div className="no-image">No Image</div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Search;
