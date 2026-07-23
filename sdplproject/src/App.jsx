import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Header from "./components/Header";
import ScrollToTop from "./components/ScrollToTop";

import Home from "./pages/Home";
import AboutPage from "./pages/AboutPage";
import BudgetPlanner from "./pages/BudgetPlanner";
import ContactUs from "./pages/ContactUs";
import Services from "./pages/Services";
import Login from "./pages/Login";
import VerifyOTP from "./pages/VerifyOTP";

import TermAndCondition from "./pages/TermAndCondition";
import PrivacyPolicy from "./pages/PrivacyPolicy";

import OngoingProjects from "./pages/OngoingProjects";
import UpcomingProjects from "./pages/UpcomingProjects";
import CompletedProjects from "./pages/CompletedProjects";
import ProjectDetails from "./pages/ProjectDetails";

import ExecutionPlan from "./pages/ExecutionPlan";
import DirectorProfile from "./pages/DirectorProfile";

// 1. IMPORT YOUR NEW LANDING PAGE
import ConstructionCompanyOdisha from "./pages/ConstructionCompanyOdisha";
import ConstructionCompanyBhubaneswarCuttack from "./pages/ConstructionCompanyBhubaneswarCuttack";
import CivilContractorBhubaneswarOdisha from "./pages/CivilContractorBhubaneswarOdisha";


function App() {
  const location = useLocation();

  const hideHeader =
    location.pathname.toLowerCase() === "/login" ||
    location.pathname.toLowerCase() === "/verify-otp" ||
    location.pathname.toLowerCase() === "/budget-planner" ||
    location.pathname === "/director";

  return (
    <>
      {!hideHeader && <Header />}

      <ScrollToTop />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services" element={<Services />} />
        <Route path="/budget-planner" element={<BudgetPlanner />} />
        <Route path="/contact-us" element={<ContactUs />} />

        <Route path="/login" element={<Login />} />
        <Route path="/verify-otp" element={<VerifyOTP />} />

        <Route path="/terms-and-conditions" element={<TermAndCondition />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />

        <Route path="/execution-plan" element={<ExecutionPlan />} />

        <Route path="/projects/ongoing" element={<OngoingProjects />} />
        <Route path="/projects/upcoming" element={<UpcomingProjects />} />
        <Route path="/projects/completed" element={<CompletedProjects />} />
        <Route path="/projects/:slug" element={<ProjectDetails />} />
        <Route path="/director" element={<DirectorProfile />} />

        {/* 2. REGISTER THE SEO LANDING PAGE ROUTE */}
        <Route
  path="/construction-company-odisha"
  element={<ConstructionCompanyOdisha />}
/>
<Route
  path="/construction-company-bhubaneswar-cuttack"
  element={<ConstructionCompanyBhubaneswarCuttack />}
/>
 <Route
    path="/civil-contractor-bhubaneswar-odisha"
    element={<CivilContractorBhubaneswarOdisha />}
  />
      </Routes>
    </>
  );
}

export default App;