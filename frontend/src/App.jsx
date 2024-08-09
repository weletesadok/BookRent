import { Route, Routes, BrowserRouter } from "react-router-dom";
import RequireAuth from "./features/auth/RequireAuth";
import Login from "./features/auth/Login";
import Register from "./features/auth/Register";
import Books from "./features/book/Books";
import BookDetails from "./features/book/BookDetails";
import Public from "./components/Public";
import PersistLogin from "./features/auth/PersistLogin";
import AddBookForm from "./features/book/AddBook";

export default () => {
  return (
    <Routes>
      <Route element={<PersistLogin />}>
        <Route element={<Public />}>
          <Route path="/book" element={<Books />} />
          <Route index element={<Books />} />
          <Route path="/book/:id" element={<BookDetails />} />
          <Route element={<RequireAuth allowedRole={"OWNER"} />}>
            <Route path="/book/add" element={<AddBookForm />} />
          </Route>
        </Route>
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};
