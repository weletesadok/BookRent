import { Outlet, Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useRefreshMutation } from "./authApiSlice";
import usePersist from "../../hooks/usePersist";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "./authSlice";
import Loading from "../../components/SkeletonLoading";

const PersistLogin = () => {
  const [persist] = usePersist();
  const token = useSelector(selectCurrentToken);
  const effectRan = useRef(false);

  const [trueSuccess, setTrueSuccess] = useState(false);

  const [refresh, { isUninitialized, isLoading, isSuccess, isError, error }] =
    useRefreshMutation();

  useEffect(() => {
    // if (effectRan.current === true || process.env.NODE_ENV !== "development") {
    const verifyRefreshToken = async () => {
      try {
        await refresh();
        setTrueSuccess(true);
      } catch (err) {
        // console.error(err);
      }
    };

    if (!token && persist) verifyRefreshToken();
    // }

    return () => (effectRan.current = true);
  }, []);

  let content;
  if (!persist) {
    content = <Outlet />;
  } else if (isLoading) {
    content = <Loading />;
  } else if (isError) {
    content = <Outlet />;
  } else if (isSuccess && trueSuccess) {
    content = <Outlet />;
  } else if (token && isUninitialized) {
    content = <Outlet />;
  }

  return content;
};
export default PersistLogin;
