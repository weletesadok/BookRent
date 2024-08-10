import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import RequireAuth from "./features/auth/RequireAuth";
import Login from "./features/auth/Login";
import Register from "./features/auth/Register";
import Books from "./features/book/Books";
import BookDetails from "./features/book/BookDetails";
import Public from "./components/Public";
import PersistLogin from "./features/auth/PersistLogin";
import AddBookForm from "./features/book/AddBook";
import DashBoard from "./components/DashBoard";
import DashIndex from "./components/DashIndex";
import BooksTable from "./features/book/BookTable";
import Users from "./features/user/Users";
import useAuth from "./hooks/useAuth";

export default () => {
  const auth = useAuth();
  return (
    <Routes>
      <Route element={<PersistLogin />}>
        <Route element={<Public />}>
          <Route index element={<Books />} />
          <Route path="/book/:id" element={<BookDetails />} />
          {!auth.role && (
            <>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </>
          )}
        </Route>
        <Route element={<RequireAuth allowedRole={"OWNER"} />}>
          <Route path="/dash" element={<DashBoard />}>
            <Route index element={<DashIndex />} />
            <Route path="addbook" element={<AddBookForm />} />
            <Route path="books" element={<BooksTable />} />
            <Route element={<RequireAuth allowedRole={"ADMIN"} />}>
              <Route path="users" element={<Users />} />
              <Route path="owners" element={<Users />} />
            </Route>
          </Route>
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};
