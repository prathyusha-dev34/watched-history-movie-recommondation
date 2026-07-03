from app.database import Base
from sqlalchemy import Column, Integer, String, Float, DateTime
from datetime import datetime


class Watched(Base):
    __tablename__ = "watched"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, index=True)

    movie_id = Column(String, index=True)
    title = Column(String)
    poster = Column(String, nullable=True)
    genre = Column(String, nullable=True)
    imdb_rating = Column(Float, nullable=True)

    watched_date = Column(DateTime, default=datetime.utcnow)