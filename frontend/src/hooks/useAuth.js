import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { selectCurrentToken } from "../features/auth/authSlice";
import { jwtDecode } from "jwt-decode";

const useAuth = () => {
  const token = useSelector(selectCurrentToken);
  const [auth, setAuth] = useState({
    id: "",
    role: null,
    OWNER: false,
    ADMIN: false,
    status: "RENTER",
    loading: true,
  });

  useEffect(() => {
    if (token) {
      const timer = setTimeout(() => {
        const decoded = jwtDecode(token);
        const { role, userId: id } = decoded;

        const OWNER = role === "OWNER";
        const ADMIN = role === "ADMIN";
        const status = OWNER ? "OWNER" : ADMIN ? "ADMIN" : "RENTER";

        setAuth({
          id,
          role,
          OWNER,
          ADMIN,
          status,
          loading: false,
        });
      }, 500);

      return () => clearTimeout(timer);
    } else {
      setAuth((prevAuth) => ({
        ...prevAuth,
        loading: false,
      }));
    }
  }, [token]);

  return auth;
};

export default useAuth;
