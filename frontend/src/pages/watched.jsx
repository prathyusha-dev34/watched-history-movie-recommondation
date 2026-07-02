import React, { useEffect, useState } from "react";
import API from "../services/api";

function Watched() {
  const [watched, setWatched] = useState([]);

  useEffect(() => {
    fetchWatched();
  }, []);

  const fetchWatched = async () => {
    try {
      const response = await API.get("/watched/");
      setWatched(response.data || []);
    } catch (error) {
      console.error("Failed to fetch watched:", error);
    }
  };

  const removeWatched = async (movieId) => {
    try {
      await API.delete(`/watched/${movieId}`);
      setWatched(watched.filter((m) => m.movie_id !== movieId));
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  return (
    <div className="page">
      <h1>🎬 Watched History</h1>

      {watched.length === 0 ? (
        <p>No watched movies yet</p>
      ) : (
        <div className="movies-grid">
          {watched.map((movie) => (
            <div key={movie.id} className="movie-card">
              <img src={movie.poster} alt={movie.title} />

              <h3>{movie.title}</h3>
              <p>{movie.genre}</p>
              <p>⭐ {movie.imdb_rating}</p>
              <p>📅 {new Date(movie.watched_date).toLocaleDateString()}</p>

              <button
                onClick={() => removeWatched(movie.movie_id)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Watched;