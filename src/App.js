import React, {useEffect, useState} from "react";

import SearchIcon from "./search.svg"
import "./App.css"
import MovieCard from "./components/MovieCard"

const API_URL = "http://www.omdbapi.com?apikey=ecedee00"

const App = () => {

    const [searchTerm, setSearchTerm] = useState("");
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        searchMovies('batman')
    }, []);


    const searchMovies = async (movieTitle) => {
        const response = await fetch(`${API_URL}&s=${movieTitle}`);
        const data = await response.json();

        setMovies(data.Search);
    }


    return (
        <div className="app">
            <h1>Simply movies</h1>

            <div className="search">
                <input
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyPress={ (e) => {
                         if(e.key === "Enter") {
                             searchMovies(searchTerm)
                         }
                    } }
                    placeholder="Search for movies"
                />
                <img
                    src={SearchIcon}
                    alt="search"
                    onClick={() => searchMovies(searchTerm)}
                />
            </div>

            <div className="container">
                {
                    movies.length > 0 ?
                        movies.map((movie) => (
                            <MovieCard movie={movie}/>
                        )) :
                        (
                            <div className="empty">
                                <h2>No movies found</h2>
                            </div>
                        )
                }
            </div>
        </div>
    );
}

export default App;