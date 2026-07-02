from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import Base, engine

# =========================
# MODELS (CREATE TABLES)
# =========================
from app.models.collection import Collection, CollectionMovie
from app.models.notification import Notification
from app.models.review_like import ReviewLike
from app.models.watched import Watched

# =========================
# ROUTES
# =========================
from app.routes import (
    auth,
    favorites,
    history,
    dashboard,
    recommendations,
    movies,
    watchlist,
    reviews,
    profile,
    collections,
    notification,
    watched
)

from app.routes.admin import router as admin_router

# =========================
# CREATE TABLES
# =========================
Base.metadata.create_all(bind=engine)

# =========================
# FASTAPI APP
# =========================
app = FastAPI(title="Movie Backend API")

# =========================
# CORS CONFIG (FIXED)
# =========================
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# =========================
# ROUTES INCLUDE
# =========================
app.include_router(auth.router)
app.include_router(favorites.router)
app.include_router(history.router)
app.include_router(dashboard.router)
app.include_router(recommendations.router)
app.include_router(movies.router)
app.include_router(watchlist.router)
app.include_router(reviews.router)
app.include_router(profile.router)
app.include_router(collections.router)
app.include_router(notification.router)
app.include_router(watched.router)

# =========================
# ADMIN ROUTE
# =========================
app.include_router(admin_router)