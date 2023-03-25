import { Routes, Route } from "react-router-dom";
import LandingPage from "../pages/landingpage";
import { LoginModal } from "../modal/Login";

const Browser = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
    </Routes>
  );
};
