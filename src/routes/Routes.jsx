import { Routes, Route, HashRouter as Router } from "react-router-dom";
import PrivateLayout from "../layouts/PrivateLayout";
import PublicLayout from "../layouts/PublicLayout";
import Auth from "../pages/Auth";
import Home from "../pages/Home";
import Challenge from "../pages/Challenge";
import Leaderboard from "../pages/Leaderboard";
import OverallObjectives from "../pages/Objectives";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Auth />} />
        </Route>

        <Route element={<PrivateLayout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/challenge/:id" element={<Challenge />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/objectives" element={<OverallObjectives />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
