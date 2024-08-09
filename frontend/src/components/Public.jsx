import Navbar from "./PublicNavBar";
import { Outlet } from "react-router-dom";
export default () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};
