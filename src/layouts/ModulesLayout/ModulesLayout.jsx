import { Outlet } from "react-router-dom";
import Sidebar from "../../Components/SideBar/SideBar";
import "./ModulesLayout.css";

const ModulesLayout = () => {
  return (
    <div className="modules-layout">
      <Sidebar />
      <div className="outlet">
        <Outlet />
      </div>
    </div>
  );
};

export default ModulesLayout;
