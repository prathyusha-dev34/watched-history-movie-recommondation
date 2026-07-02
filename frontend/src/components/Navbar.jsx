import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUnreadCount } from "../services/notificationService";

function Navbar() {
  const navigate = useNavigate();
  const [count, setCount] = useState(0);

  const loadCount = async () => {
    try {
      const data = await getUnreadCount();
      setCount(data.count);
    } catch (error) {
      console.error("Failed to load unread count:", error);
    }
  };

  useEffect(() => {
    loadCount();

    const interval = setInterval(loadCount, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="navbar">

      {/* LOGO */}
      <div className="logo" onClick={() => navigate("/")}>
        Movie<span>Box</span>
      </div>

      {/* NAV LINKS */}
      <div className="nav-links">
        <button onClick={() => navigate("/")} className="nav-btn">
          Home
        </button>

        <button onClick={() => navigate("/watchlist")} className="nav-btn">
          Watchlist
        </button>

        <button onClick={() => navigate("/watched")} className="nav-btn">
          Watched History
        </button>
      </div>

      {/* RIGHT SIDE */}
      <div className="nav-right">

        {/* NOTIFICATIONS */}
        <button
          className="notification-btn"
          onClick={() => navigate("/notifications")}
        >
          🔔
          {count > 0 && (
            <span className="notification-badge">{count}</span>
          )}
        </button>

        {/* PROFILE */}
        <div className="profile">
          <img src="https://i.pravatar.cc/40" alt="profile" />
          <span>John Doe</span>
        </div>

      </div>

    </div>
  );
}

export default Navbar;