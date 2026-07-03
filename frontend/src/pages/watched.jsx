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

      // safer handling if API returns {data: []} or direct array
      const data = response.data;
      setWatched(Array.isArray(data) ? data : data?.data || []);
    } catch (error) {
      console.error("Failed to fetch watched:", error);
      setWatched([]);
    }
  };

  const removeWatched = async (movieId) => {
    try {
      await API.delete(`/watched/${movieId}`);

      // safe state update (avoids stale state bug)
      setWatched((prev) =>
        prev.filter((m) => m.movie_id !== movieId)
      );
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
          {watched.map((movie, index) => (
            <div key={movie.id || index} className="movie-card">

              <img
                src={movie.poster || "https://via.placeholder.com/150"}
                alt={movie.title || "Movie"}
              />

              <h3>{movie.title || "Untitled"}</h3>

              <p>{movie.genre || "Unknown Genre"}</p>

              <p>⭐ {movie.imdb_rating ?? "N/A"}</p>

              <p>
                📅{" "}
                {movie.watched_date
                  ? new Date(movie.watched_date).toLocaleDateString()
                  : "N/A"}
              </p>

              <button onClick={() => removeWatched(movie.movie_id)}>
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