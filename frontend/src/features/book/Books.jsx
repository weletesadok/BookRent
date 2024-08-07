import React, { useState, useEffect } from "react";
import {
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Grid,
  Typography,
  Pagination,
  Box,
  CircularProgress,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import BookCard from "./BookCard"; // Import your BookCard component
import { useGetAllBooksQuery } from "./bookSlice"; // Your API slice

const BookList = () => {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState("");
  const [limit] = useState(10);

  const { data, error, isLoading } = useGetAllBooksQuery({
    search,
    sort,
    page,
    category,
    limit,
  });

  const handleSearchChange = (event) => setSearch(event.target.value);
  const handleSortChange = (event) => setSort(event.target.value);
  const handleCategoryChange = (event) => setCategory(event.target.value);
  const handlePageChange = (event, value) => setPage(value);

  if (isLoading) return <CircularProgress />;
  if (error) return <Typography color="error">Error loading books</Typography>;

  return (
    <Box padding={2}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <TextField
            label="Search"
            variant="outlined"
            fullWidth
            value={search}
            onChange={handleSearchChange}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <FormControl fullWidth>
            <InputLabel>Sort</InputLabel>
            <Select value={sort} onChange={handleSortChange} label="Sort">
              <MenuItem value="">None</MenuItem>
              <MenuItem value="name">Name</MenuItem>
              <MenuItem value="author">Author</MenuItem>
              <MenuItem value="publicationDate">Publication Date</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={4}>
          <FormControl fullWidth>
            <InputLabel>Category</InputLabel>
            <Select
              value={category}
              onChange={handleCategoryChange}
              label="Category"
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="Fiction">Fiction</MenuItem>
              <MenuItem value="Adventure">Adventure</MenuItem>
              {/* Add other categories as needed */}
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <Box mt={3}>
        <Grid container spacing={3}>
          {data.books.map((book) => (
            <Grid item xs={12} sm={6} md={4} key={book.id}>
              <BookCard book={book} />
            </Grid>
          ))}
        </Grid>
      </Box>

      <Box mt={3} display="flex" justifyContent="center">
        <Pagination
          count={data.totalPages}
          page={page}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
    </Box>
  );
};

export default BookList;
