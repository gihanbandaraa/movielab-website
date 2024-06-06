import { useEffect, useState } from "react";
import "./App.css";
import SearchIcon from "./search.svg";
import MovieCard from "./MovieCard";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('')

  const API_URL = "http://www.omdbapi.com/?i=tt3896198&apikey=f7ef5d10";
  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();

    setMovies(data.Search);
  };
  useEffect(() => {
    searchMovies("Avengers");
  }, []);

  return (
    <div className="app">
      <h1>Movie Land</h1>

      <div className="search">
        <input
          placeholder="Search For Movies"
          value={searchQuery}
          onChange={(e) => {setSearchQuery(e.target.value)}}
        />
        <img src={SearchIcon} alt="search" onClick={() => {searchMovies(searchQuery)}} />
      </div>

      {movies?.length > 0 ? (
        <div className="container">
          {movies?.map((movie) => (
            <MovieCard movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No Movies Found</h2>
        </div>
      )}
    </div>
  );
};

export default App;
