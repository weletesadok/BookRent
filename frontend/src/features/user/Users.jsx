import React, { useMemo, useState } from "react";
import {
  useGetAllUsersQuery,
  useDeleteUserMutation,
  useApproveUserMutation,
  useDeactivateUserMutation,
  useActivateUserMutation,
} from "./userSlice";
import { MaterialReactTable } from "material-react-table";
import {
  Box,
  Typography,
  Button,
  IconButton,
  ThemeProvider,
  Select,
  MenuItem,
  Pagination,
  Switch,
} from "@mui/material";
import ClipLoader from "react-spinners/ClipLoader";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import customTheme from "../book/customTheme";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const UsersTable = () => {
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(4);

  const { data, isLoading, refetch } = useGetAllUsersQuery({
    search: "",
    page: page + 1,
    limit: limit,
  });

  const [deleteUser] = useDeleteUserMutation();
  const [approveUser] = useApproveUserMutation();
  const [deactivateUser] = useDeactivateUserMutation();
  const [activateUser] = useActivateUserMutation();

  const columns = useMemo(
    () => [
      {
        header: "No",
        accessorKey: "id",
        size: 50,
      },
      {
        header: "User",
        accessorKey: "email",
        size: 120,
        Cell: ({ row }) => (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography>{row.original.email}</Typography>
          </Box>
        ),
      },
      {
        header: "Phone Number",
        accessorKey: "phoneNumber",
        size: 120,
      },
      {
        header: "Location",
        accessorKey: "location",
        size: 150,
      },
      {
        header: "Role",
        accessorKey: "role",
        size: 100,
      },
      {
        header: "Approved",
        accessorKey: "approved",
        size: 100,
        Cell: ({ row }) => (
          <Button
            variant="contained"
            color={row.original.approved ? "success" : "primary"}
            disabled={row.original.approved}
            onClick={() => handleApproveUser(row.original.id)}
          >
            {row.original.approved ? "Approved" : "Approve"}
          </Button>
        ),
      },
      {
        header: "Status",
        accessorKey: "status",
        size: 100,
        Cell: ({ row }) => (
          <Switch
            checked={row.original.active === true}
            onChange={() =>
              row.original.active === true
                ? handleDeactivateUser(row.original.id)
                : handleActivateUser(row.original.id)
            }
            color="primary"
          />
        ),
      },
      {
        header: "Actions",
        accessorKey: "actions",
        size: 150,
        Cell: ({ row }) => (
          <Box sx={{ display: "flex", justifyContent: "space-around" }}>
            <IconButton onClick={() => handleViewUser(row.original.id)}>
              <VisibilityIcon />
            </IconButton>
            <IconButton onClick={() => handleEditUser(row.original.id)}>
              <EditIcon />
            </IconButton>
            <IconButton onClick={() => handleDeleteUser(row.original.id)}>
              <DeleteIcon />
            </IconButton>
          </Box>
        ),
      },
    ],
    []
  );

  const handleApproveUser = async (userId) => {
    try {
      await approveUser(userId).unwrap();
      toast.success("User approved successfully");
      refetch();
    } catch (error) {
      toast.error("Failed to approve user");
    }
  };
  const handleActivateUser = async (userId) => {
    try {
      await activateUser(userId).unwrap();
      toast.success("User activated successfully");
      refetch();
    } catch (error) {
      toast.error("Failed to activate user");
    }
  };
  const handleDeactivateUser = async (userId) => {
    try {
      await deactivateUser(userId).unwrap();
      toast.success("User deactivated successfully");
      refetch();
    } catch (error) {
      toast.error("Failed to deactivate user");
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await deleteUser(userId).unwrap();
      toast.success("User deleted successfully");
      refetch();
    } catch (error) {
      toast.error(JSON.stringify(error));
    }
  };

  const handleViewUser = (userId) => {
    console.log("View user", userId);
  };

  const handleEditUser = (userId) => {
    console.log("Edit user", userId);
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
            height: "95%",
            overflow: "auto",
            padding: 1,
          }}
        >
          <MaterialReactTable
            columns={columns}
            data={data?.users || []}
            manualPagination
            enablePagination={false}
            rowCount={data?.totalUsers || 0}
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
            count={Math.ceil((data?.totalUsers || 0) / limit)}
            page={page + 1}
            onChange={handlePageChange}
            color="primary"
          />
        </Box>
      </ThemeProvider>
    </>
  );
};

export default UsersTable;
