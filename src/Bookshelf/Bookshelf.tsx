import { useState } from "react";
const books = [
  {
    title: "You Gotta Eat",
    author: "Margaret Eby",
    imgSrc: "src/assets/you-gotta-eat.jpg",
  },
  {
    title: "Popsicle Party",
    author: "Louise Pickford",
    imgSrc: "src/assets/popsicle-party.jpg",
  },
  {
    title: "Sport Smoothies",
    author: "Fern Green",
    imgSrc: "src/assets/sport-smoothies.jpg",
  },
];
function Bookshelf() {
  const [bookList, _setBookList] = useState(books);

  return (
    <section id="bookshelf">
      <h2>Bookshelf</h2>
      <div className="book-list">
        {bookList.map((book) => (
          <div key={book.title} className="book">
            <h3 className="book-title">{book.title}</h3>
            <p className="book-author">by {book.author}</p>
            <img
              src={book.imgSrc}
              alt={`Cover of ${book.title} by ${book.author}`}
              className="book-cover"
            />
          </div>
        ))}
      </div>
    </section>
  );
}

export default Bookshelf;
