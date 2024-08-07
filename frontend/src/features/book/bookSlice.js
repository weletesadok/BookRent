import { apiSlice } from "./../../app/api/apiSlice";

const booksApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllBooks: builder.query({
      query: ({
        search = "",
        sort = "",
        page = 1,
        category = "",
        limit = 10,
      }) =>
        `/book?search=${search}&sort=${sort}&page=${page}&category=${category}&limit=${limit}`,
      providesTags: (result, error, arg) =>
        result
          ? [...result.books.map(({ id }) => ({ type: "Book", id })), "Book"]
          : ["Book"],
    }),
    getBookById: builder.query({
      query: (id) => `/book/${id}`,
      providesTags: (result, error, id) => [{ type: "Book", id }],
    }),
    addBook: builder.mutation({
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
          url: "/book",
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: ["Book"],
    }),
    editBook: builder.mutation({
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
          url: `/book/${id}`,
          method: "PUT",
          body: formData,
        };
      },
      invalidatesTags: (result, error, { id }) => [{ type: "Book", id }],
    }),
    deleteBook: builder.mutation({
      query: (id) => ({
        url: `/book/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [{ type: "Book", id }],
    }),
    getBookStatisticsByCategory: builder.query({
      query: () => `/book/statistics/category`,
      providesTags: ["Book"],
    }),
    approveBook: builder.mutation({
      query: (bookId) => ({
        url: `/book/approve/${bookId}`,
        method: "PUT",
      }),
      invalidatesTags: (result, error, { bookId }) => [
        { type: "Book", id: bookId },
      ],
    }),
  }),
});

export const {
  useGetAllBooksQuery,
  useGetBookByIdQuery,
  useAddBookMutation,
  useEditBookMutation,
  useDeleteBookMutation,
  useGetBookStatisticsByCategoryQuery,
  useApproveBookMutation,
} = booksApiSlice;
