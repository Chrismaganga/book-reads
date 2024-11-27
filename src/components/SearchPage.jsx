import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as BookAPI from "../utils/BookAPI";
import Book from "./Book";
import { FaArrowLeft } from "react-icons/fa";

function SearchPage({ onCloseSearch, books, onUpdateBook }) {
    const [searchResults, setSearchResults] = useState([]);
    const [query, setQuery] = useState("");
    const navigate = useNavigate();

    const handleSearch = (query) => {
        setQuery(query);
        if (query) {
            BookAPI.search(query, 20)
                .then((results) => {
                    setSearchResults(
                        (results || []).map((result) => {
                            const bookInShelf = books.find((b) => b.id === result.id);
                            return bookInShelf ? { ...result, shelf: bookInShelf.shelf } : result;
                        })
                    );
                })
                .catch((error) => {
                    console.error("Error searching books:", error);
                    setSearchResults([]);
                });
        } else {
            setSearchResults([]);
        }
    };

    return (
        <div className="search-books">
            <div className="search-books-bar">
                {/* <button className="close-search" onClick={onCloseSearch}>
                    
                </button> */}
                <button className="close-search" onClick={() => navigate("/")}>
                <FaArrowLeft />
                </button>
                <div className="search-books-input-wrapper">
                    <input
                        type="text"
                        placeholder="Search by title or author"
                        value={query}
                        onChange={(e) => handleSearch(e.target.value)}
                    />
            
                </div>
            </div>
            <div className="search-books-results">
                <div className="books-grid">
                    {searchResults.map((book) => (
                        <Book key={book.id} book={book} onUpdateBook={onUpdateBook} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default SearchPage;
