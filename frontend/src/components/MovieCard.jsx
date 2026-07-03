import React, { useEffect, useState } from "react";
import API from "../services/api";
import { useCompare } from "../context/CompareContext";
import {
  getCollections,
  addMovieToCollection,
} from "../services/collectionService";

function MovieCard({ movie }) {
  const [collections, setCollections] = useState([]);
  const [selectedCollection, setSelectedCollection] = useState("");
  const [watched, setWatched] = useState(false);

  const { isMovieSelected, addMovieToCompare, removeMovieFromCompare } =
    useCompare();

  const movieId = movie.imdbID || movie.movie_id || movie.title;
  const isSelected = isMovieSelected(movieId);

  useEffect(() => {
    loadCollections();
    checkWatchedStatus();
  }, []);

  // =========================
  // LOAD COLLECTIONS
  // =========================
  const loadCollections = async () => {
    try {
      const data = await getCollections();
      setCollections(data);
    } catch (error) {
      console.error("Failed to load collections:", error);
    }
  };

  // =========================
  // CHECK WATCHED STATUS
  // =========================
  const checkWatchedStatus = async () => {
    try {
      const res = await API.get(`/watched/status/${movieId}`);
      setWatched(res.data.watched);
    } catch (error) {
      console.error("Watched status error:", error);
    }
  };

  // =========================
  // FAVORITES
  // =========================
  const addToFavorites = async () => {
    try {
      const favoriteData = {
        movie_id: movieId,
        movie_title: movie.title,
        genre: movie.genre,
        poster: movie.poster,
      };

      const response = await API.post("/favorites/", favoriteData);
      alert(response.data.message || "Added to Favorites ❤️");
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.detail || "Favorite failed ❌");
    }
  };

  // =========================
  // WATCHLIST
  // =========================
  const addToWatchlist = async () => {
    try {
      const watchlistData = {
        movie_id: movieId,
        movie_title: movie.title,
        genre: movie.genre,
        poster: movie.poster,
      };

      const response = await API.post("/watchlist/", watchlistData);
      alert(response.data.message || "Added to Watchlist 📺");
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.detail || "Watchlist failed ❌");
    }
  };

  // =========================
  // MARK AS WATCHED
  // =========================
  const markAsWatched = async () => {
    try {
      const payload = {
        movie_id: movieId,
        title: movie.title,
        poster: movie.poster,
        genre: movie.genre,
        imdb_rating: movie.imdb_rating || "0",
      };

      const res = await API.post("/watched/", payload);

      alert(res.data.message || "Marked as Watched ✅");
      setWatched(true);
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.detail || "Failed to mark watched");
    }
  };

  // =========================
  // REVIEWS
  // =========================
  const addReview = async () => {
    try {
      const reviewData = {
        movie_id: movieId,
        movie_title: movie.title,
        rating: 5,
        review: "Excellent Movie ⭐",
      };

      const response = await API.post("/reviews/", reviewData);
      alert(response.data.message || "Review Added ⭐");
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.detail || "Review failed ❌");
    }
  };

  const getReviews = async () => {
    try {
      const response = await API.get(`/reviews/${movieId}`);

      if (response.data.reviews.length === 0) {
        alert("No reviews found");
        return;
      }

      const reviewsText = response.data.reviews
        .map((review) => `⭐ ${review.rating}/5\n${review.review}`)
        .join("\n\n");

      alert(reviewsText);
    } catch (error) {
      console.error(error);
      alert("Failed to load reviews");
    }
  };

  // =========================
  // COLLECTION
  // =========================
  const addToCollection = async () => {
    if (!selectedCollection) {
      alert("Please select a collection");
      return;
    }

    try {
      await addMovieToCollection(selectedCollection, {
        movie_id: String(movieId),
        movie_title: movie.title,
        poster_path: movie.poster,
      });

      alert("Movie added to collection 📁");
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.detail || "Failed to add movie");
    }
  };

  // =========================
  // COMPARE
  // =========================
  const handleCompareToggle = () => {
    if (isSelected) {
      removeMovieFromCompare(movieId);
    } else {
      addMovieToCompare({
        id: movieId,
        title: movie.title,
        poster: movie.poster,
      });
    }
  };

  // =========================
  // UI
  // =========================
  return (
    <div className="movie-card">
      <img
        src={
          movie.poster && movie.poster !== "N/A"
            ? movie.poster
            : "https://via.placeholder.com/300x450?text=No+Image"
        }
        alt={movie.title}
      />

      <div className="movie-info">
        <h3>{movie.title}</h3>
        <p>{movie.genre}</p>
        <p>{movie.reason}</p>

        {/* FAVORITE */}
        <button className="fav-btn" onClick={addToFavorites}>
          ❤️ Favorite
        </button>

        {/* WATCHLIST */}
        <button className="watch-btn" onClick={addToWatchlist}>
          📺 Watchlist
        </button>

        {/* WATCHED */}
        <button
          className="watch-btn"
          onClick={markAsWatched}
          disabled={watched}
          style={{
            background: watched ? "green" : "#333",
            color: "white",
            marginTop: "8px",
            opacity: watched ? 0.8 : 1,
            cursor: watched ? "not-allowed" : "pointer",
          }}
        >
          {watched ? "✓ Watched" : "🎬 Mark as Watched"}
        </button>

        {/* REVIEW */}
        <button className="review-btn" onClick={addReview}>
          ⭐ Add Review
        </button>

        <button className="review-btn" onClick={getReviews}>
          👁 View Reviews
        </button>

        {/* COLLECTION */}
        <select
          value={selectedCollection}
          onChange={(e) => setSelectedCollection(e.target.value)}
        >
          <option value="">Select Collection</option>
          {collections.map((collection) => (
            <option key={collection.id} value={collection.id}>
              {collection.name}
            </option>
          ))}
        </select>

        <button className="collection-btn" onClick={addToCollection}>
          📁 Add to Collection
        </button>

        {/* COMPARE */}
        <button
          className={`compare-toggle-btn ${isSelected ? "selected" : ""}`}
          onClick={handleCompareToggle}
        >
          {isSelected ? "✓ Comparing" : "＋ Compare"}
        </button>
      </div>
    </div>
  );
}

export default MovieCard;