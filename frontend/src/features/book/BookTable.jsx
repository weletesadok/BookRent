import React, { useMemo, useState } from "react";
import { useGetAllBooksQuery, useApproveBookMutation } from "./bookSlice";
import { MaterialReactTable } from "material-react-table";
import {
  Box,
  Typography,
  Avatar,
  Switch,
  ThemeProvider,
  Select,
  MenuItem,
  Pagination,
} from "@mui/material";
import ClipLoader from "react-spinners/ClipLoader";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import customTheme from "./customTheme";
import useAuth from "../../hooks/useAuth";

const BooksTable = () => {
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(4);
  const { role, id } = useAuth();

  const { data, isLoading } = useGetAllBooksQuery({
    search: "",
    sort: "",
    page: page + 1,
    category: "",
    limit: limit,
  });
  const booksToSee = () => {
    if (!data?.books) return [];
    if (role === "ADMIN") return data.books;
    if (role === "OWNER") {
      // return data.books.filter((item) => item.ownerId === id);
      return data.books;
    }
    return [];
  };

  const [approveBook] = useApproveBookMutation();

  const columns = useMemo(
    () => [
      {
        header: "No",
        accessorKey: "id",
        size: 50,
      },
      {
        header: "Author",
        accessorKey: "author",
        size: 100,
      },
      {
        header: "Owner",
        accessorKey: "ownerId",
        size: 150,
        Cell: ({ row }) => (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Avatar
              src={
                row.original.owner.avatar.length > 0
                  ? String(
                      `http://localhost:8000${row.original.owner.avatar[0].slice(
                        5
                      )}`
                    )
                  : ""
              }
              alt="Profile Pic"
            />
            <Typography sx={{ marginLeft: "0.5rem" }}>
              {row.original.owner.email}
            </Typography>
          </Box>
        ),
      },
      {
        header: "Category",
        accessorKey: "category",
        size: 100,
        Cell: ({ row }) => row.original.category.join(", "),
      },
      {
        header: "Quantity",
        accessorKey: "quantity",
        size: 80,
      },
      {
        header: "Book Name",
        accessorKey: "name",
        size: 150,
      },
    ],
    []
  );
  if (role === "ADMIN") {
    columns.push({
      header: "Approve",
      accessorKey: "approved",
      size: 80,
      Cell: ({ row }) => (
        <Switch
          checked={row.original.approved}
          onChange={() =>
            handleApprovalChange(row.original.id, !row.original.approved)
          }
        />
      ),
    });
  }
  const handleApprovalChange = async (bookId, newStatus) => {
    try {
      await approveBook(bookId).unwrap();
      toast.success("Book approved successfully");
    } catch (error) {
      toast.error("Failed to update book approval status");
    }
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
    setPage(0);
  };

  const handlePageChange = (event, value) => {
    setPage(value - 1);
  };

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <ClipLoader size={50} color={"#123abc"} loading={isLoading} />
      </Box>
    );
  }

  return (
    <>
      <ToastContainer />
      <ThemeProvider theme={customTheme}>
        <Box
          sx={{
            height: "80%",
            overflow: "auto",
            padding: 1,
          }}
        >
          <MaterialReactTable
            columns={columns}
            data={booksToSee()}
            manualPagination
            enablePagination={false}
            rowCount={booksToSee().length || 0}
            state={{ isLoading }}
            initialState={{ density: "compact" }}
            enableDensityToggle={false}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <Select value={limit} onChange={handleLimitChange}>
            {[2, 4, 8, 16, 32, 64].map((value) => (
              <MenuItem key={value} value={value}>
                {value}
              </MenuItem>
            ))}
          </Select>
          <Pagination
            count={Math.ceil((data?.totalBooks || 0) / limit)}
            page={page + 1}
            onChange={handlePageChange}
            color="primary"
          />
        </Box>
      </ThemeProvider>
    </>
  );
};

export default BooksTable;
