import { useState, useEffect } from "react";
import "./App.css";
import "./styles.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MoviesGrid from "./components/MoviesGrid";
import WatchList from "./components/Watchlist";

function App() {
  const [movies, setMovies] = useState([]);
  const [watchList, setWatchList] = useState([]);

  useEffect(() => {
    fetch("movies.json")
      .then((response) => response.json())
      .then((data) => setMovies(data));
  }, []);

  const toggleWatchList = (movieId) => {
    setWatchList((prev) =>
      prev.includes(movieId)
        ? prev.filter((id) => id !== movieId)
        : [...prev, movieId],
    );
  };

  return (
    <div className="App">
      <div className="container">
        <Header></Header>

        <Router>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/watchlist">WatchList</Link>
              </li>
            </ul>
          </nav>
          <Routes>
            <Route
              path="/"
              element={
                <MoviesGrid
                  watchList={watchList}
                  movies={movies}
                  toggleWatchList={toggleWatchList}
                />
              }
            ></Route>
            <Route
              path="/watchlist"
              element={
                <WatchList
                  watchList={watchList}
                  movies={movies}
                  toggleWatchList={toggleWatchList}
                />
              }
            ></Route>
          </Routes>
        </Router>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default App;
