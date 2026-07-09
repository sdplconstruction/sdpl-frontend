import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import BudgetPlanner from "./pages/BudgetPlanner";
import ContactUs from "./pages/ContactUs";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/budget-planner" element={<BudgetPlanner />} />
      <Route path="/contact-us" element={<ContactUs />} />
    </Routes>
  );
}

export default App;