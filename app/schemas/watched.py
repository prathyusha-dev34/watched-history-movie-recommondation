from pydantic import BaseModel
from datetime import datetime
from typing import Optional


# =========================
# REQUEST SCHEMA
# =========================
class WatchedCreate(BaseModel):
    movie_id: str
    title: str
    poster: Optional[str] = None
    genre: Optional[str] = None
    imdb_rating: Optional[float] = None


# =========================
# RESPONSE SCHEMA
# =========================
class WatchedOut(BaseModel):
    id: int
    movie_id: str
    title: str
    poster: Optional[str] = None
    genre: Optional[str] = None
    imdb_rating: Optional[float] = None
    watched_date: datetime

    class Config:
        from_attributes = True