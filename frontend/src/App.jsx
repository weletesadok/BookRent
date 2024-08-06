import React, { useState, useEffect, useCallback } from "react";
import {MaterialReactTable} from "material-react-table";
import {
  Avatar,
  Button,
  IconButton,
  Switch,
  Tooltip,
  TextField,
  Paper,
} from "@mui/material";
import {
  CheckCircleOutline,
  DeleteOutline,
  RemoveRedEye,
} from "@mui/icons-material";
import axios from "axios";

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState({ field: "id", direction: "asc" });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [totalCount, setTotalCount] = useState(0);

  const fetchUsers = useCallback(async () => {
    try {
      const params = {
        search,
        sort: `${sort.field}:${sort.direction}`,
        limit: rowsPerPage,
        page: page + 1,
      };
      const response = await axios.get("http://localhost:8000/user", {
        params,
      });
      setUsers(response.data.users);
      setTotalCount(response.data.totalCount);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }, [search, sort, rowsPerPage, page]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleSearch = (event) => {
    setSearch(event.target.value);
    setPage(0); // Reset to first page on search
  };

  const handleSort = (field) => {
    const isAsc = sort.field === field && sort.direction === "asc";
    setSort({ field, direction: isAsc ? "desc" : "asc" });
    setPage(0); // Reset to first page on sort
  };

  const handleToggleActive = (id) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === id ? { ...user, active: !user.active } : user
      )
    );
  };

  const handleApprove = (id) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === id ? { ...user, approved: true } : user
      )
    );
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/user/${id}`);
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleView = (id) => {
    // Handle navigation to the user's details page
    console.log(`Viewing user with id: ${id}`);
  };

  return (
    <Paper sx={{ padding: "20px", borderRadius: "10px" }}>
      <TextField
        sx={{ marginBottom: "10px", width: "100%" }}
        label="Search by email"
        variant="outlined"
        value={search}
        onChange={handleSearch}
      />
      <MaterialReactTable
        columns={[
          {
            header: "ID",
            accessorKey: "id",
          },
          {
            header: "Email",
            accessorKey: "email",
            Cell: ({ row }) => (
              <div style={{ display: "flex", alignItems: "center" }}>
                <Avatar
                  sx={{ marginRight: "10px" }}
                  src={row.original.avatar}
                  alt={row.original.email}
                />
                <span>{row.original.email}</span>
              </div>
            ),
          },
          {
            header: "Location",
            accessorKey: "location",
          },
          {
            header: "Active",
            accessorKey: "active",
            Cell: ({ row }) => (
              <Switch
                checked={row.original.active}
                onChange={() => handleToggleActive(row.original.id)}
                color={row.original.active ? "primary" : "secondary"}
              />
            ),
          },
          {
            header: "Approved",
            accessorKey: "approved",
            Cell: ({ row }) => (
              <Button
                variant="contained"
                color="primary"
                disabled={row.original.approved}
                onClick={() => handleApprove(row.original.id)}
              >
                Approve
              </Button>
            ),
          },
          {
            header: "Actions",
            Cell: ({ row }) => (
              <div style={{ display: "flex", justifyContent: "space-around" }}>
                <Tooltip title="View">
                  <IconButton onClick={() => handleView(row.original.id)}>
                    <RemoveRedEye />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete">
                  <IconButton
                    onClick={() => handleDelete(row.original.id)}
                    sx={{ color: "red" }}
                  >
                    <DeleteOutline />
                  </IconButton>
                </Tooltip>
              </div>
            ),
          },
        ]}
        data={users}
        manualPagination
        pageCount={Math.ceil(totalCount / rowsPerPage)}
        onPageChange={(page) => setPage(page)}
        onPageSizeChange={(size) => setRowsPerPage(size)}
        initialPageSize={rowsPerPage}
        manualSorting
        onSortChange={({ sortBy }) => {
          const { id, desc } = sortBy[0];
          handleSort(id, desc ? "desc" : "asc");
        }}
        state={{
          pagination: { pageIndex: page, pageSize: rowsPerPage },
          sorting: [{ id: sort.field, desc: sort.direction === "desc" }],
        }}
        sx={{
          backgroundColor: "#ffffff",
          borderRadius: "10px",
          padding: "10px",
          "& .MuiTable-root": {
            backgroundColor: "#ffffff",
          },
        }}
      />
    </Paper>
  );
};

export default UsersList;
