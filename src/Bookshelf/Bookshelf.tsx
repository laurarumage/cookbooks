import { useState } from "react";

function Bookshelf({
  books,
  onSelectBook,
}: {
  books: { title: string; author: string; imgSrc: string }[];
  onSelectBook: (title: string) => void;
}) {
  const [bookList, _setBookList] = useState(books);

  return (
    <section id="bookshelf">
      <h2>Bookshelf</h2>
      <div className="book-list">
        {bookList.map((book) => (
          <button
            key={book.title}
            type="button"
            className="book"
            onClick={() => onSelectBook(book.title)}
            aria-label={`Search within ${book.title}`}
          >
            <h3 className="book-title">{book.title}</h3>
            <p className="book-author">by {book.author}</p>
            <img
              src={book.imgSrc}
              alt={`Cover of ${book.title} by ${book.author}`}
              className="book-cover"
            />
          </button>
        ))}
      </div>
    </section>
  );
}

export default Bookshelf;
