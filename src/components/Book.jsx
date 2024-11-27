
import { useState, useEffect } from 'react';
import BookAPI from '../utils/BookAPI';

function Book() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    BookAPI.getAll().then((books) => {
      const uniqueBooks = Array.from(new Set(books.map(book => book.id)))
        .map(id => books.find(book => book.id === id));
      setBooks(uniqueBooks.slice(0, 1));
    });
  }, []);

  const handleUpdateBook = (book, newShelf) => {
    BookAPI.update(book, newShelf).then(() => {
      setBooks((prevBooks) =>
        prevBooks.map((b) => (b.id === book.id ? { ...b, shelf: newShelf } : b))
      );
    });
  };

  const Book = ({ book, onUpdateBook }) => {
    const handleChange = (event) => {
      const newShelf = event.target.value;
      onUpdateBook(book, newShelf);
    };

    return (
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url(${book.imageLinks?.thumbnail || ""})`,
            }}
          ></div>
          <div className="book-shelf-changer">
            <select value={book.shelf || "none"} onChange={handleChange}>
              <option value="move" disabled>
                Move to...
              </option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">{book.authors?.join(", ")}</div>
      </div>
    );
  };

  return (
    <div className="book-list">
      {books.map((book) => (
        <Book key={book.id} book={book} onUpdateBook={handleUpdateBook} />
      ))}
    </div>
  );
}

export default Book;
