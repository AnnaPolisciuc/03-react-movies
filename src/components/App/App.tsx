import { Toaster } from "react-hot-toast";
import SearchBar from "../SearchBar/SearchBar";
import Loader from "../Loader/Loader"
import { useState } from "react";
import type { Movie } from "../../types/movie";
import { fetchMovies } from "../../services/movieService";
import toast from "react-hot-toast";
import MovieGrid  from "../MovieGrid/MovieGrid";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";




export default function App() {


const [movies, setMovies] = useState<Movie[]>([]);
const [isLoading, setIsLoading] = useState(false);
const [isError, setIsError] = useState(false);
const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);


const handleSearch = async (query: string) => {
   try {
setIsError(false);
setIsLoading(true);
setMovies([]);

const results = await fetchMovies(query);

if (results.length === 0) {
   toast.error('No movies found for your request.');
   return;
}

setMovies(results);
   }
   catch {
    setIsError(true);
   } finally {
    setIsLoading(false);
   }
};
   

    return (
        <>
        <SearchBar 
    onSubmit = {handleSearch} />
    <Toaster />
    {isError && <ErrorMessage />}
      {isLoading && <Loader />}

      {!isLoading && !isError && movies.length > 0 && (
        <MovieGrid movies ={movies} onSelect={(movie) => setSelectedMovie(movie)}/>
      )}
      {selectedMovie && (
  <MovieModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
)}
        </>
    )
}