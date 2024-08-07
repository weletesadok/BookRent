import { Route, Routes, BrowserRouter } from "react-router-dom";
// import PersistLogin from "./features/auth/PersistLogin";
// import RequireAuth from "./features/auth/RequireAuth";
import Login from "./features/auth/Login";
import Register from "./features/auth/Register";
import Books from "./features/book/Books";

export default () => {
  return (
    <Routes>
      <Route index element={<Books />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};
