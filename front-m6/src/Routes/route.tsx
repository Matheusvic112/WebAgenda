import { Routes, Route } from "react-router-dom";
import LandingPage from "../pages/landingpage";
import { Dashboard } from "../pages/Dashboard";

export const Browser = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
};
