import { useState } from "react";
import "./App.css";

import YouGottaEat from "./IndexPages/YouGottaEat";
import PopsicleParty from "./IndexPages/PopsicleParty";
import SportSmoothies from "./IndexPages/SportSmoothies";

type IngredientValue = string[] | { [key: string]: IngredientValue };
type SearchResult = { label: string; pages: string[] };
type CookbookMatch = { book: string; label: string; pages: string };

function flattenIngredients(
  value: IngredientValue,
  labelParts: string[],
): SearchResult[] {
  if (Array.isArray(value)) {
    return [{ label: labelParts.join(" > "), pages: value }];
  }

  return Object.entries(value).flatMap(([key, child]) =>
    flattenIngredients(child, [...labelParts, key]),
  );
}

function findIngredientMatches(
  data: { [key: string]: IngredientValue },
  searchText: string,
): SearchResult[] {
  const query = searchText.trim().toLowerCase();
  if (!query) return [];

  const matches: SearchResult[] = [];

  function searchEntries(
    entries: { [key: string]: IngredientValue },
    parentLabels: string[] = [],
  ) {
    Object.entries(entries).forEach(([key, value]) => {
      const labelParts = [...parentLabels, key];

      if (key.toLowerCase().includes(query)) {
        if (Array.isArray(value)) {
          matches.push({ label: labelParts.join(" > "), pages: value });
        } else {
          matches.push(...flattenIngredients(value, labelParts));
        }
      } else if (!Array.isArray(value)) {
        searchEntries(value, labelParts);
      }
    });
  }

  searchEntries(data);
  return matches;
}

function findFlatIndexMatches(
  data: { [key: string]: number | number[] | string },
  searchText: string,
  bookName: string,
): CookbookMatch[] {
  const query = searchText.trim().toLowerCase();
  if (!query) return [];

  return Object.entries(data)
    .filter(([label]) => label.toLowerCase().includes(query))
    .map(([label, page]) => ({
      book: bookName,
      label,
      pages: Array.isArray(page) ? page.join(", ") : String(page),
    }));
}

function findPopsicleMatches(searchText: string): CookbookMatch[] {
  return findFlatIndexMatches(PopsicleParty, searchText, "Popsicle Party");
}

function findSmoothieMatches(searchText: string): CookbookMatch[] {
  return findFlatIndexMatches(SportSmoothies, searchText, "Sport Smoothies");
}

function App() {
  const books = [
    { title: "You Gotta Eat", author: "Margaret Eby" },
    { title: "Popsicle Party", author: "Louise Pickford" },
    { title: "Sport Smoothies", author: "Fern Green" },
  ];
  const [bookList, _setBookList] = useState(books);
  const [searchText, setSearchText] = useState("");
  const matches = findIngredientMatches(YouGottaEat, searchText);
  const popsicleMatches = findPopsicleMatches(searchText);
  const smoothieMatches = findSmoothieMatches(searchText);

  return (
    <>
      <section id="center">
        <h1>Laura's Cookbooks</h1>
        <section id="bookshelf">
          <h2 className="bookshelf-title">Bookshelf</h2>
          <div className="book-list">
            {bookList.map((book) => (
              <div key={book.title} className="book">
                <h3 className="book-title">{book.title}</h3>
                <p className="book-author">by {book.author}</p>
              </div>
            ))}
          </div>
        </section>
        <section id="search">
          <h2>Search by ingredient</h2>
          <input
            type="text"
            placeholder="Enter an ingredient"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />

          {searchText.trim() && (
            <div className="search-results" aria-live="polite">
              {matches.length > 0 ||
              popsicleMatches.length > 0 ||
              smoothieMatches.length > 0 ? (
                <>
                  {matches.length > 0 && (
                    <div>
                      <h3>Matches in You Gotta Eat</h3>
                      <ul>
                        {matches.map((match) => (
                          <li key={`${match.label}-${match.pages.join("-")}`}>
                            <strong>{match.label}</strong>
                            <span> — pages {match.pages.join(", ")}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {popsicleMatches.length > 0 && (
                    <div>
                      <h3>Matches in Popsicle Party</h3>
                      <ul>
                        {popsicleMatches.map((match) => (
                          <li key={`${match.label}-${match.pages}`}>
                            <strong>{match.label}</strong>
                            <span> — page {match.pages}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {smoothieMatches.length > 0 && (
                    <div>
                      <h3>Matches in Sport Smoothies</h3>
                      <ul>
                        {smoothieMatches.map((match) => (
                          <li key={`${match.label}-${match.pages}`}>
                            <strong>{match.label}</strong>
                            <span> — page {match.pages}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </>
              ) : (
                <p>
                  No matching ingredients found in You Gotta Eat, Popsicle
                  Party, or Sport Smoothies.
                </p>
              )}
            </div>
          )}
        </section>
      </section>
    </>
  );
}

export default App;
