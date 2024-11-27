
import Book from "./Book";

function BookShelf({ books, onUpdateBook }) {
  const shelves = {
    currentlyReading: "Currently Reading",
    wantToRead: "Want to Read",
    read: "Read",
  };

  return (
    <div className="bookshelf">
      {Object.entries(shelves).map(([shelfKey, shelfTitle]) => (
        <div key={shelfKey} className="bookshelf-books">
          <h2>{shelfTitle}</h2>
          <div className="books-grid">
            {books
              .filter((book) => book.shelf === shelfKey)
              .map((book) => (
                <Book
                  key={book.id}
                  book={book}
                  onUpdateBook={onUpdateBook}
                />
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default BookShelf;
