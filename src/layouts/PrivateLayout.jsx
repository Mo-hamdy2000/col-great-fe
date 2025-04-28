import { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../Components/Auth/AuthcontextProvider";
import Header from "../Components/Header/Header";

const PrivateLayout = () => {
  const navigate = useNavigate();
  const { token, isAdmin } = useContext(AuthContext);

  useEffect(() => {
    if (!token) navigate("/");
    if (isAdmin === true) navigate("/dashboard")
  }, [token]);

  return (
    <>
      <Header />
      <div className="dental-background"></div>
      <Outlet />
    </>
  );
};

export default PrivateLayout;
