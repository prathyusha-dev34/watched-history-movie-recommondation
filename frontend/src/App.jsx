import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Favorites from "./pages/Favorites";
import History from "./pages/History"; // (Search History)
import Watched from "./pages/Watched"; // ⭐ NEW WATCHED PAGE
import Profile from "./pages/Profile";
import Watchlist from "./pages/Watchlist";
import AdminDashboard from "./pages/AdminDashboard";
import AdminUsers from "./pages/AdminUsers";
import AdminReviews from "./pages/AdminReviews";
import Collections from "./pages/Collections";
import CollectionDetails from "./pages/CollectionDetails";
import Notifications from "./pages/Notifications";
import ComparePage from "./pages/ComparePage";

// Route Guards
import ProtectedRoute from "./router";
import AdminRoute from "./components/AdminRoute";

// Context
import { CompareProvider } from "./context/CompareContext";
import CompareBar from "./components/CompareBar";

function App() {
  return (
    <CompareProvider>
      <BrowserRouter>
        <Routes>

          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Home */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />

          {/* Compare */}
          <Route
            path="/compare"
            element={
              <ProtectedRoute>
                <ComparePage />
              </ProtectedRoute>
            }
          />

          {/* Favorites */}
          <Route
            path="/favorites"
            element={
              <ProtectedRoute>
                <Favorites />
              </ProtectedRoute>
            }
          />

          {/* Search History */}
          <Route
            path="/history"
            element={
              <ProtectedRoute>
                <History />
              </ProtectedRoute>
            }
          />

          {/* ⭐ WATCHED MOVIES */}
          <Route
            path="/watched"
            element={
              <ProtectedRoute>
                <Watched />
              </ProtectedRoute>
            }
          />

          {/* Watchlist */}
          <Route
            path="/watchlist"
            element={
              <ProtectedRoute>
                <Watchlist />
              </ProtectedRoute>
            }
          />

          {/* Profile */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          {/* Collections */}
          <Route
            path="/collections"
            element={
              <ProtectedRoute>
                <Collections />
              </ProtectedRoute>
            }
          />

          {/* Collection Details */}
          <Route
            path="/collections/:id"
            element={
              <ProtectedRoute>
                <CollectionDetails />
              </ProtectedRoute>
            }
          />

          {/* Admin Dashboard */}
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />

          {/* Admin Users */}
          <Route
            path="/admin/users"
            element={
              <AdminRoute>
                <AdminUsers />
              </AdminRoute>
            }
          />

          {/* Admin Reviews */}
          <Route
            path="/admin/reviews"
            element={
              <AdminRoute>
                <AdminReviews />
              </AdminRoute>
            }
          />

          {/* Notifications */}
          <Route
            path="/notifications"
            element={
              <ProtectedRoute>
                <Notifications />
              </ProtectedRoute>
            }
          />

          {/* Redirect Unknown Routes */}
          <Route path="*" element={<Navigate to="/" replace />} />

        </Routes>

        {/* Global floating comparison bar */}
        <CompareBar />

      </BrowserRouter>
    </CompareProvider>
  );
}

export default App;