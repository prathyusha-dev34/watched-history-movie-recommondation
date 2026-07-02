from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.watched import Watched
from app.models.watchlist import Watchlist
from app.schemas.watched import WatchedCreate

router = APIRouter(prefix="/watched", tags=["Watched"])


# TEMP USER (replace later with JWT)
def get_user_id():
    return 1


# =========================
# ADD WATCHED
# =========================
@router.post("/")
def mark_watched(movie: WatchedCreate, db: Session = Depends(get_db)):

    user_id = get_user_id()

    new_movie = Watched(
        user_id=user_id,
        movie_id=movie.movie_id,
        title=movie.title,
        poster=movie.poster,
        genre=movie.genre,
        imdb_rating=movie.imdb_rating
    )

    db.add(new_movie)
    db.commit()

    return {"message": "Marked as watched"}


# =========================
# GET WATCHED
# =========================
@router.get("/")
def get_watched(db: Session = Depends(get_db)):

    user_id = get_user_id()

    return db.query(Watched).filter(
        Watched.user_id == user_id
    ).all()


# =========================
# STATUS
# =========================
@router.get("/status/{movie_id}")
def status(movie_id: str, db: Session = Depends(get_db)):

    user_id = get_user_id()

    movie = db.query(Watched).filter(
        Watched.user_id == user_id,
        Watched.movie_id == movie_id
    ).first()

    return {"watched": movie is not None}


# =========================
# DELETE
# =========================
@router.delete("/{movie_id}")
def delete_watched(movie_id: str, db: Session = Depends(get_db)):

    user_id = get_user_id()

    movie = db.query(Watched).filter(
        Watched.user_id == user_id,
        Watched.movie_id == movie_id
    ).first()

    if not movie:
        raise HTTPException(status_code=404, detail="Not found")

    db.delete(movie)
    db.commit()

    return {"message": "Deleted"}