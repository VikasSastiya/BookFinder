function BookCard({ book }) {
  const { title, authors, publishedDate, description, imageLinks } = book;

  return (
    <div className="bg-white rounded-xl shadow-md p-4 flex flex-col hover:shadow-lg transition">
      <img
        src={
          imageLinks?.thumbnail ||
          "https://via.placeholder.com/150x200?text=No+Image"
        }
        alt={title}
        className="w-full h-60 object-cover rounded-lg mb-4"
      />
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-sm text-gray-600">
        {authors ? authors.join(", ") : "Unknown Author"}
      </p>
      <p className="text-xs text-gray-500 mb-2">{publishedDate}</p>
      <p className="text-sm text-gray-700 line-clamp-3">{description}</p>
    </div>
  );
}

export default BookCard;
