import { Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop"; // Import the scroll controller

import Home from "./pages/Home";
import BudgetPlanner from "./pages/BudgetPlanner";
import ContactUs from "./pages/ContactUs";
import TermAndCondition from './pages/TermAndCondition';
import PrivacyPolicy from './pages/PrivacyPolicy';
import OngoingProjects from "./pages/OngoingProjects";
import UpcomingProjects from "./pages/UpcomingProjects";
import CompletedProjects from "./pages/CompletedProjects";
import ProjectDetails from "./pages/ProjectDetails";

// ADDED THIS IMPORT TO FIX THE REFERENCE ERROR
import ExecutionPlan from "./pages/ExecutionPlan";

function App() {
  return (
    <>
      {/* ScrollToTop sits perfectly here because a Router is already wrapping <App /> from outside! */}
      <ScrollToTop />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/budget-planner" element={<BudgetPlanner />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/terms-and-conditions" element={<TermAndCondition />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />

        {/* WORKS PERFECTLY NOW */}
        <Route path="/execution-plan" element={<ExecutionPlan />} />

        <Route path="/projects/ongoing" element={<OngoingProjects />} />
        <Route path="/projects/upcoming" element={<UpcomingProjects />} />
        <Route path="/projects/completed" element={<CompletedProjects />} />
        <Route path="/projects/:slug" element={<ProjectDetails />} />
      </Routes>
    </>
  );
}

export default App;