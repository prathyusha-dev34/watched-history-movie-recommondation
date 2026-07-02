from pydantic import BaseModel
from datetime import datetime


# =========================
# REQUEST SCHEMA
# =========================
class WatchedCreate(BaseModel):
    movie_id: str
    title: str
    poster: str | None = None
    genre: str | None = None
    imdb_rating: str | None = None


# =========================
# RESPONSE SCHEMA
# =========================
class WatchedOut(BaseModel):
    id: int
    movie_id: str
    title: str
    poster: str | None = None
    genre: str | None = None
    imdb_rating: str | None = None
    watched_date: datetime

    class Config:
        from_attributes = True