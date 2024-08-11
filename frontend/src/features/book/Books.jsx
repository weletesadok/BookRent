import { useState } from "react";
import {
  Box,
  IconButton,
  InputBase,
  Menu,
  MenuItem,
  Pagination,
  Select,
  FormControl,
  InputLabel,
  CircularProgress,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";
import FilterListIcon from "@mui/icons-material/FilterList";
import SortIcon from "@mui/icons-material/Sort";
import BookCard from "./BookCard";
import { useGetAllBooksQuery } from "./bookSlice";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useSendLogoutMutation } from "../auth/authApiSlice";

export default function MyComponent() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState("");
  const [limit, setLimit] = useState(10);
  const [anchorEl, setAnchorEl] = useState(null);
  const [filterAnchorEl, setFilterAnchorEl] = useState(null);
  const [sortAnchorEl, setSortAnchorEl] = useState(null);
  const auth = useAuth();

  const { data, error, isLoading } = useGetAllBooksQuery({
    search,
    sort,
    page,
    category,
    limit,
  });
  const [logout] = useSendLogoutMutation();
  const handleMenuOpen = (event, setter) => {
    setter(event.currentTarget);
  };

  const handleLogOUt = () => {
    localStorage.clear();
    logout();
    location.reload();
  };

  const handleMenuClose = (setter) => {
    setter(null);
  };

  const handleCategorySelect = (category) => {
    setCategory(category);
    handleMenuClose(setFilterAnchorEl);
  };

  const handleSortSelect = (sortOption) => {
    setSort(sortOption);
    handleMenuClose(setSortAnchorEl);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        p: 2,
      }}
    >
      <Box sx={{ flex: "75%", display: "flex", alignItems: "center", gap: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", flex: 1 }}>
          <SearchIcon sx={{ color: "orange", mr: 1 }} />
          <InputBase
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{ flex: 1 }}
          />
        </Box>
        <IconButton onClick={(e) => handleMenuOpen(e, setAnchorEl)}>
          <PersonIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => handleMenuClose(setAnchorEl)}
        >
          {auth.role && (
            <MenuItem onClick={() => handleLogOUt()}>Logout</MenuItem>
          )}
          {!auth.role && (
            <MenuItem onClick={() => navigate("/login")}>Login</MenuItem>
          )}
          {!auth.role && (
            <MenuItem onClick={() => navigate("/register")}>Sign Up</MenuItem>
          )}
          {auth.role === "OWNER" && (
            <MenuItem onClick={() => navigate("/dash")}>Dashboard</MenuItem>
          )}
        </Menu>
      </Box>

      <Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <IconButton onClick={(e) => handleMenuOpen(e, setFilterAnchorEl)}>
            <FilterListIcon />
          </IconButton>
          <Menu
            anchorEl={filterAnchorEl}
            open={Boolean(filterAnchorEl)}
            onClose={() => handleMenuClose(setFilterAnchorEl)}
          >
            <MenuItem onClick={() => handleCategorySelect("Science")}>
              Science
            </MenuItem>
            <MenuItem onClick={() => handleCategorySelect("Fiction")}>
              Fiction
            </MenuItem>
            <MenuItem onClick={() => handleCategorySelect("Education")}>
              Education
            </MenuItem>
          </Menu>

          <IconButton onClick={(e) => handleMenuOpen(e, setSortAnchorEl)}>
            <SortIcon />
          </IconButton>
          <Menu
            anchorEl={sortAnchorEl}
            open={Boolean(sortAnchorEl)}
            onClose={() => handleMenuClose(setSortAnchorEl)}
          >
            <MenuItem onClick={() => handleSortSelect("price")}>Price</MenuItem>
            <MenuItem onClick={() => handleSortSelect("rating")}>
              Rating
            </MenuItem>
          </Menu>

          <FormControl variant="outlined" size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Limit</InputLabel>
            <Select
              value={limit}
              onChange={(e) => setLimit(e.target.value)}
              label="Limit"
            >
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={15}>15</MenuItem>
              <MenuItem value={20}>20</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box
          sx={{
            mt: 2,
            p: 2,
            backgroundColor: "grey.200",
            justifyContent: "flex-start",
            display: "flex",
            flexWrap: "wrap",
            gap: 1,
            flex: "1",
          }}
        >
          {isLoading ? (
            <CircularProgress />
          ) : error ? (
            <Box>Error loading books</Box>
          ) : (
            data.books.map((book) => <BookCard key={book.id} book={book} />)
          )}
        </Box>
      </Box>

      <Box
        sx={{ width: "100%", display: "flex", justifyContent: "center", mt: 2 }}
      >
        <Pagination
          count={data?.totalPages || 1}
          page={page}
          onChange={(event, value) => setPage(value)}
          siblingCount={1}
          boundaryCount={2}
          shape="rounded"
          showFirstButton
          showLastButton
          sx={{
            "& .MuiPaginationItem-root": {
              fontSize: "1rem",
              color: "primary.main",
            },
          }}
        />
      </Box>
    </Box>
  );
}
