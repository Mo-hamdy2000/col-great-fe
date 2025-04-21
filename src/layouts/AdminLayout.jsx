import { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../Components/Auth/AuthcontextProvider";
import Header from "../Components/Header/Header";

const AdminLayout = () => {
  const navigate = useNavigate();
  const { token, isAdmin } = useContext(AuthContext);

  useEffect(() => {
    if (!token || isAdmin == false) navigate("/");
  }, [token, isAdmin]);

  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default AdminLayout;
