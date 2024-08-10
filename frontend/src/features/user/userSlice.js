import { apiSlice } from "./../../app/api/apiSlice";

const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: ({ search = "", page = 1, limit = 10 }) =>
        `/user?search=${search}&page=${page}&limit=${limit}`,
      providesTags: (result, error, arg) =>
        result
          ? [...result.users.map(({ id }) => ({ type: "User", id })), "User"]
          : ["User"],
    }),
    getUserById: builder.query({
      query: (id) => `/user/${id}`,
      providesTags: (result, error, id) => [{ type: "User", id }],
    }),
    addUser: builder.mutation({
      query: (post) => {
        const formData = new FormData();
        Object.entries(post).forEach(([key, value]) => {
          if (Array.isArray(value)) {
            value.forEach((file) => formData.append(key, file));
          } else {
            formData.append(key, value);
          }
        });
        return {
          url: "/user",
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: ["User"],
    }),
    editUser: builder.mutation({
      query: ({ id, ...post }) => {
        const formData = new FormData();
        Object.entries(post).forEach(([key, value]) => {
          if (Array.isArray(value)) {
            value.forEach((file) => formData.append(key, file));
          } else {
            formData.append(key, value);
          }
        });
        return {
          url: `/user/${id}`,
          method: "PUT",
          body: formData,
        };
      },
      invalidatesTags: (result, error, { id }) => [{ type: "User", id }],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/user/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [{ type: "User", id }],
    }),
    approveUser: builder.mutation({
      query: (userId) => ({
        url: `/user/approve/${userId}`,
        method: "PATCH",
      }),
      invalidatesTags: (result, error, { userId }) => [
        { type: "User", id: userId },
      ],
    }),
    activateUser: builder.mutation({
      query: (userId) => ({
        url: `/user/activate/${userId}`,
        method: "PATCH",
      }),
      invalidatesTags: (result, error, { userId }) => [
        { type: "User", id: userId },
      ],
    }),
    deactivateUser: builder.mutation({
      query: (userId) => ({
        url: `/user/deactivate/${userId}`,
        method: "PATCH",
      }),
      invalidatesTags: (result, error, { userId }) => [
        { type: "User", id: userId },
      ],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useGetUserByIdQuery,
  useAddUserMutation,
  useEditUserMutation,
  useDeleteUserMutation,
  useApproveUserMutation,
  useActivateUserMutation,
  useDeactivateUserMutation,
} = userApiSlice;
