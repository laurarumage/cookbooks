import "./App.css";

import Bookshelf from "./Bookshelf/Bookshelf";
import Search from "./Search/Search";

function App() {
  return (
    <>
      <section id="center">
        <h1>Laura's Cookbooks</h1>
        <Bookshelf />
        <Search />
      </section>
    </>
  );
}

export default App;
