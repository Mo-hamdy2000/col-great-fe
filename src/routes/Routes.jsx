import { Routes, Route, HashRouter as Router } from "react-router-dom";
import PrivateLayout from "../layouts/PrivateLayout";
import PublicLayout from "../layouts/PublicLayout";
import AdminLayout from "../layouts/AdminLayout";
import ModulesLayout from "../layouts/ModulesLayout/ModulesLayout";
import Auth from "../pages/Auth";
import Home from "../pages/Home";
import Challenge from "../pages/Challenge";
import Leaderboard from "../pages/Leaderboard";
import Profile from "../pages/Profile";
import Instructions from "../pages/Instructions";
import Objectives from "../pages/module/Objectives/Objectives";
import OverallObjectives from "../pages/Objectives";
import Content from "../pages/module/Content/Content";
import Activities from "../pages/module/Activities/Activities";
import Resources from "../pages/module/Resources/Resources";
import Tests from "../pages/module/Tests/Tests";
import Upload from "../Components/Upload";
import Dashboard from "../pages/Dashboard";
import User from "../pages/User";
import Contact from "../pages/Contact";
import EnlightenmentScale from "../pages/EnlightenmentScale";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Auth />} />
        </Route>

        <Route element={<PrivateLayout />}>
          <Route path="/upload" element={<Upload />} />
          <Route path="/home" element={<Home />} />
          <Route path="/challenge/:id" element={<Challenge />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/instructions" element={<Instructions />} />
          <Route path="/objectives" element={<OverallObjectives />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/modules/:id" element={<ModulesLayout />}>
            <Route path="objectives" element={<Objectives />} />
            <Route path="content" element={<Content />} />
            <Route path="activities" element={<Activities />} />
            <Route path="resources" element={<Resources />} />
            <Route path="tests" element={<Tests />} />
          </Route>
          <Route path="/contact" element={<Contact />} />
          <Route path="/enlightenment_scale" element={<EnlightenmentScale />} />
        </Route>

        <Route element={<AdminLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users/:id" element={<User />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
