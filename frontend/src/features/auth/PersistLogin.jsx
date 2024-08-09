import { Outlet, Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useRefreshMutation } from "./authApiSlice";
import usePersist from "../../hooks/usePersist";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "./authSlice";

const PersistLogin = () => {
  const [persist] = usePersist();
  const token = useSelector(selectCurrentToken);
  const effectRan = useRef(false);

  const [refresh, { isLoading }] = useRefreshMutation();

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        const res = await refresh();
      } catch (err) {
        console.log(err);
      }
    };

    if (!token && persist) verifyRefreshToken();

    return () => (effectRan.current = true);
  }, []);

  if (isLoading) {
    return <div>Loading ...</div>;
  }
  return <Outlet />;
};
export default PersistLogin;
