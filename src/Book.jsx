import React, { useState, useEffect } from "react";
import BookCard from "./components/BookCard";

function Book() {
  const [books, setBooks] = useState([]);
  const [searchText, setSearchText] = useState("api"); // default search
  const [loading, setLoading] = useState(false);

  const fetchBooks = async (query) => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=20`
      );
      const data = await res.json();
      setBooks(data.items || []);
    } catch (err) {
      console.error("Error fetching books:", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchBooks(searchText);
  }, []);

  return (
    <div className="min-h-screen bg-[url('https://images.unsplash.com/photo-1521587760476-6c12a4b040da?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bGlicmFyeXxlbnwwfHwwfHx8MA%3D%3D')] bg-cover bg-center p-4 sm:p-6">
      {/* Search Bar */}
      <div className="flex flex-col sm:flex-row justify-center items-center mb-6 gap-2">
        <input
          type="text"
          placeholder="SEARCH BOOKS..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="border p-2 w-full sm:w-1/2 rounded-lg sm:rounded-l-lg sm:rounded-r-none outline-none border-amber-400 text-amber-600 placeholder-amber-400"
        />
        <button
          onClick={() => fetchBooks(searchText)}
          className="w-full sm:w-auto bg-blue-600 text-white px-4 py-2 rounded-lg sm:rounded-r-lg sm:rounded-l-none hover:bg-blue-700 transition"
        >
          Search
        </button>
      </div>

      {/* Book List */}
      {loading ? (
        <p className="text-center text-lg">Loading...</p>
      ) : books.length === 0 ? (
        <p className="text-center text-lg">No books found</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {books.map((book) => (
            <BookCard key={book.id} book={book.volumeInfo} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Book;
