import { useState } from "react";
import "./App.css";
import BOOKS from "./BookProperties";

import Bookshelf from "./Bookshelf/Bookshelf";
import Search from "./Search/Search";

function App() {
  const [selectedBook, setSelectedBook] = useState<string | null>(null);
  const selectedBookDetails = BOOKS.find((book) => book.title === selectedBook);

  return (
    <>
      <section id="center">
        <h1>Laura's Cookbooks</h1>

        {selectedBook ? (
          <>
            <button
              type="button"
              className="back-button"
              onClick={() => setSelectedBook(null)}
            >
              ← Back to all books
            </button>
            {selectedBookDetails && (
              <div className="selected-book">
                <img
                  src={selectedBookDetails.imgSrc}
                  alt={`Cover of ${selectedBookDetails.title} by ${selectedBookDetails.author}`}
                  className="selected-book-cover"
                />
                <div>
                  <h2>{selectedBookDetails.title}</h2>
                  <p>by {selectedBookDetails.author}</p>
                </div>
              </div>
            )}
            <Search selectedBook={selectedBook} />
          </>
        ) : (
          <>
            <Bookshelf books={BOOKS} onSelectBook={setSelectedBook} />
            <Search />
          </>
        )}
      </section>
    </>
  );
}

export default App;
