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
import History from "./pages/History";
import Watched from "./pages/Watched";
import Profile from "./pages/Profile";
import Watchlist from "./pages/Watchlist";

import AdminDashboard from "./pages/AdminDashboard";
import AdminUsers from "./pages/AdminUsers";
import AdminReviews from "./pages/AdminReviews";

import Collections from "./pages/Collections";
import CollectionDetails from "./pages/CollectionDetails";
import Notifications from "./pages/Notifications";
import ComparePage from "./pages/ComparePage";

// Guards
import ProtectedRoute from "./router";
import AdminRoute from "./components/AdminRoute";

// Context
import { CompareProvider } from "./context/CompareContext";
import CompareBar from "./components/CompareBar";

function App() {
  const isAuthRoute =
    window.location.pathname === "/login" ||
    window.location.pathname === "/register";

  return (
    <CompareProvider>
      <BrowserRouter>
        <Routes>

          {/* Public */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected */}
          <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/compare" element={<ProtectedRoute><ComparePage /></ProtectedRoute>} />
          <Route path="/favorites" element={<ProtectedRoute><Favorites /></ProtectedRoute>} />
          <Route path="/history" element={<ProtectedRoute><History /></ProtectedRoute>} />
          <Route path="/watched" element={<ProtectedRoute><Watched /></ProtectedRoute>} />
          <Route path="/watchlist" element={<ProtectedRoute><Watchlist /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/collections" element={<ProtectedRoute><Collections /></ProtectedRoute>} />
          <Route path="/collections/:id" element={<ProtectedRoute><CollectionDetails /></ProtectedRoute>} />
          <Route path="/notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />

          {/* Admin */}
          <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
          <Route path="/admin/users" element={<AdminRoute><AdminUsers /></AdminRoute>} />
          <Route path="/admin/reviews" element={<AdminRoute><AdminReviews /></AdminRoute>} />

          {/* fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />

        </Routes>

        {/* Hide CompareBar on auth pages */}
        {!isAuthRoute && <CompareBar />}

      </BrowserRouter>
    </CompareProvider>
  );
}

export default App;