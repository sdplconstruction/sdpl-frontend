import React from "react";
import Header from "./components/Header";
import { Routes, Route, useLocation } from "react-router-dom";

import AboutPage from "./pages/AboutPage";
import Home from "./pages/Home";
import BudgetPlanner from "./pages/BudgetPlanner";
import ContactUs from "./pages/ContactUs";
import Services from "./pages/Services";
import Login from "./pages/Login";
import VerifyOTP from "./pages/VerifyOTP";

function App() {
  const location = useLocation();

  // Ensuring lowercase paths match your navigate commands exactly
  const hideHeader =
    location.pathname.toLowerCase() === "/login" ||
    location.pathname.toLowerCase() === "/verify-otp";
     

  return (
    <>
      {/* Renders the header only if we are NOT on login or verify-otp */}
      {!hideHeader && <Header />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/budget-planner" element={<BudgetPlanner />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/services" element={<Services />} />
        <Route path="/about" element={<AboutPage />} />

        <Route path="/login" element={<Login />} />
        <Route path="/verify-otp" element={<VerifyOTP />} />
      </Routes>
    </>
  );
}

export default App;