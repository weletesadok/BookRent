import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BooksList = () => {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('');
  const [category, setCategory] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get('http://localhost:8000/book', {
          params: { search, sort, page, category },
        });
        setBooks(response.data.books);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        setError('Error fetching books');
      } finally {
        setIsLoading(false);
      }
    };

    fetchBooks();
  }, [search, sort, category, page]);

  const handleSearchChange = (e) => setSearch(e.target.value);
  const handleSortChange = (e) => setSort(e.target.value);
  const handleCategoryChange = (e) => setCategory(e.target.value);
  const handlePageChange = (newPage) => setPage(newPage);

  return (
    <div>
      <h1>Books List</h1>

      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={handleSearchChange}
      />
      <select value={sort} onChange={handleSortChange}>
        <option value="">Sort By</option>
        <option value="name">Name</option>
        <option value="author">Author</option>
      </select>
      <select value={category} onChange={handleCategoryChange}>
        <option value="">All Categories</option>
        <option value="fiction">Fiction</option>
        <option value="non-fiction">Non-Fiction</option>
        {/* Add more categories as needed */}
      </select>

      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <ul>
          {books.map((book) => (
            <li key={book.id}>
              <h2>{book.name}</h2>
              <p>Author: {book.author}</p>
              <p>{book.details}</p>
            </li>
          ))}
        </ul>
      )}

      <div>
        <button
          disabled={page <= 1}
          onClick={() => handlePageChange(page - 1)}
        >
          Previous
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          disabled={page >= totalPages}
          onClick={() => handlePageChange(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default BooksList;
