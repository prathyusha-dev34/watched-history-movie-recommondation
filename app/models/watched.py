from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from datetime import datetime
from app.database import Base


class Watched(Base):
    __tablename__ = "Watched"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)

    movie_id = Column(String, nullable=False)

    title = Column(String, nullable=False)
    poster = Column(String)
    genre = Column(String)
    imdb_rating = Column(String)

    Watched_date = Column(DateTime, default=datetime.utcnow)