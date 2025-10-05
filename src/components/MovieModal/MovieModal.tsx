import css from "./MovieModal.module.css"
import { createPortal } from "react-dom";
import type { Movie } from "../../types/movie";
import { useEffect } from "react";


interface MovieModalProps {
  movie: Movie;
  onClose: () => void;
}


export default function MovieModal({ movie, onClose}: MovieModalProps) {

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return createPortal(
    <div className={css.backdrop} role="dialog" aria-modal="true" onClick={(e) => {
      if (e.target === e.currentTarget) onClose();
    }}>
      <div className={css.modal}>
        <button className={css.closeButton} aria-label="Close modal" onClick={onClose}>
          &times;
        </button>
        <img
          src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`}
          alt={movie.title}
          className={css.image}
        />
        <div className={css.content}>
          <h2>{movie.title}</h2>
          <p>{movie.overview}</p>
          <p><strong>Release Date:</strong> {movie.release_date}</p>
          <p><strong>Rating:</strong> {movie.vote_average}/10</p>
        </div>
      </div>
    </div>,
    document.getElementById("modal-root")!
  );
}


    
