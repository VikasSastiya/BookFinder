import React from "react";

function BookCard({ book }) {
  const { title, authors, publishedDate, subtitle, imageLinks } = book;

  return (
    <div
      className="bg-amber-400 rounded-xl text-gray-700 shadow-md p-4 flex flex-col items-center text-center
                 hover:bg-amber-800 hover:bg-opacity-80 hover:text-white hover:shadow-2xl 
                 transition duration-300"
    >
      {/* Book Image */}
      <img
        src={
          imageLinks?.thumbnail ||
          "https://via.placeholder.com/150x200?text=No+Image"
        }
        alt={title}
        className="w-full h-48 sm:h-56 md:h-60 object-cover rounded-lg mb-4"
      />

      {/* Title */}
      <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-1">
        {title}
      </h3>

      {/* Author */}
      <p className="text-xs sm:text-sm">
        {authors ? authors.join(", ") : "Unknown Author"}
      </p>

      {/* Published Date */}
      <p className="text-[10px] sm:text-xs md:text-sm mb-2">{publishedDate}</p>

      {/* Subtitle */}
      <p className="text-xs sm:text-sm md:text-base line-clamp-3">{subtitle}</p>
    </div>
  );
}

export default BookCard;
