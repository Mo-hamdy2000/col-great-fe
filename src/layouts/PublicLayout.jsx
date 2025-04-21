import { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../Components/Auth/AuthcontextProvider";

const PublicLayout = () => {
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);

  useEffect(() => {
    if (token) navigate("/home");
  }, [token]);

  return <Outlet />;
};

export default PublicLayout;
