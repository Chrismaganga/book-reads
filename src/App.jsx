import React, { useState, useEffect } from "react";
import * as BookAPI from "./utils/BookAPI";
import BookShelf from "./components/BookShelf";
import "./App.css";
import SearchPage from "./components/SearchPage";
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import { GrAdd } from "react-icons/gr";

function App() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    // Fetch all books when the component mounts
    BookAPI.getAll().then((data) => setBooks(data));
  }, []);

  const updateBookShelf = (book, shelf) => {
    BookAPI.update(book, shelf).then(() => {
      // Update local state after shelf update
      setBooks((prevBooks) =>
        prevBooks.map((b) =>
          b.id === book.id ? { ...b, shelf } : b
        )
      );
    });
  };

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route
            path="/"
            element={<HomePage books={books} onUpdateBook={updateBookShelf} />}
          />
          <Route
            path="/search"
            element={<SearchPage books={books} onUpdateBook={updateBookShelf} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

function HomePage({ books, onUpdateBook }) {
  const navigate = useNavigate();

  return (
    <div>
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <BookShelf books={books} onUpdateBook={onUpdateBook} />
      </div>
      <div className="open-search">
        <button onClick={() => navigate("/search")} className="add" >
          <GrAdd />
        </button>
      </div>
    </div>
  );
}

export default App;
