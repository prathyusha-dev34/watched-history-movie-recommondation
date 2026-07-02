import React, { useState, useEffect } from "react";
import axios from "axios";
import API from "../services/api";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import SearchBar from "../components/SearchBar";
import MovieCard from "../components/MovieCard";

const OMDB_API_KEY = import.meta.env.VITE_OMDB_API_KEY || "8b2506ba";

function Home() {
  const [movies, setMovies] = useState([]);
  const [recommendedMovies, setRecommendedMovies] = useState([]);
  const [searchError, setSearchError] = useState("");

  // =========================
  // SEARCH MOVIES
  // =========================
  const handleSearch = async (query) => {
    if (!query.trim()) return;

    setSearchError("");

    try {
      const response = await axios.get(
        `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${encodeURIComponent(query)}`
      );

      const searchResults = response.data.Search || [];

      if (searchResults.length === 0) {
        setMovies([]);
        setSearchError("No movies found for that search.");
        return;
      }

      // Fetch full details
      const detailedMovies = await Promise.all(
        searchResults.map(async (movie) => {
          try {
            const res = await axios.get(
              `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${movie.imdbID}`
            );

            return {
              imdbID: movie.imdbID,
              title: movie.Title,
              genre: res.data.Genre,
              poster: movie.Poster,
              reason: movie.Year,
              imdb_rating: "9", // 🔥 FORCED RATING
            };
          } catch {
            return {
              imdbID: movie.imdbID,
              title: movie.Title,
              genre: movie.Type,
              poster: movie.Poster,
              reason: movie.Year,
              imdb_rating: "9", // 🔥 FORCED RATING
            };
          }
        })
      );

      setMovies(detailedMovies);

      // optional backend call
      try {
        await API.get("/movies/search", {
          params: { query },
        });
      } catch {
        console.warn("Could not save search history");
      }

    } catch (error) {
      console.error("Search error:", error);
      setSearchError("Search failed. Please try again.");
    }
  };

  // =========================
  // RECOMMENDATIONS
  // =========================
  const fetchRecommendations = async () => {
    try {
      const response = await API.get("/recommendations/");
      setRecommendedMovies(response.data.recommended_movies || []);
    } catch (error) {
      console.error("Recommendations error:", error);
    }
  };

  useEffect(() => {
    fetchRecommendations();
  }, []);

  return (
    <div className="app-layout">
      <Sidebar />

      <div className="main-content">
        <Navbar />

        <SearchBar onSearch={handleSearch} />

        <h1 className="section-title">Search Results</h1>

        {searchError && <p style={{ color: "#e03333" }}>{searchError}</p>}

        <div className="movies-grid">
          {movies.length > 0 ? (
            movies.map((movie) => (
              <div key={movie.imdbID}>
                <MovieCard movie={movie} />
              </div>
            ))
          ) : (
            <p>No search results</p>
          )}
        </div>

        <h1 className="section-title">Recommended Movies</h1>

        <div className="movies-grid">
          {recommendedMovies.length > 0 ? (
            recommendedMovies.map((movie, index) => (
              <div key={index}>
                <MovieCard
                  movie={{
                    imdbID: movie.imdbID,
                    title: movie.title,
                    genre: movie.genre,
                    poster:
                      movie.poster ||
                      "https://via.placeholder.com/300x450?text=No+Image",
                    reason: movie.reason,
                    imdb_rating: "9", // 🔥 FORCED RATING
                  }}
                />
              </div>
            ))
          ) : (
            <p>No recommendations yet</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;