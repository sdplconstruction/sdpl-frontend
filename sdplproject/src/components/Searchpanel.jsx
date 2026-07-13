import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Imported the router hook

import {
  FaMapMarkerAlt,
  FaBuilding,
  FaRulerCombined,
} from "react-icons/fa";
import { MdOutlineArchitecture } from "react-icons/md";
import { HiHomeModern } from "react-icons/hi2";

import CustomDropdown from "./CustomDropdown";

import "../styles/searchpanel.css";

export default function SearchPanel() {
  const navigate = useNavigate(); // Initialized the navigator hook

  // Inputs
  const [location, setLocation] = useState("");
  const [builtUpArea, setBuiltUpArea] = useState("");

  // Dropdowns
  const [plotUnit, setPlotUnit] = useState("");
  const [constructionType, setConstructionType] = useState("");
  const [propertyType, setPropertyType] = useState("");

  // Dropdown Options
  const plotOptions = [
    "sq.ft",
    "sq.m",
    "acre",
    "decimal",
  ];

  const constructionOptions = [
    "New Construction",
    "Renovation",
    "Under Construction",
  ];

  const propertyOptions = [
    "Apartment",
    "Simplex",
    "Duplex",
    "Triplex",
    "Private Villa",
    "Farm House",
  ];

  // Button Action
  const handleEstimate = () => {
    // 1. Log the details for verification
    console.log({
      location,
      plotUnit,
      builtUpArea,
      constructionType,
      propertyType,
    });

    // 2. Redirect to the login page cleanly
    navigate("/login");
  };

  return (
    <section className="search-panel">

      {/* Location */}
      <div className="search-field">
        <FaMapMarkerAlt className="field-icon" />
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>

      {/* Plot Area */}
      <CustomDropdown
        icon={<FaRulerCombined className="field-icon" />}
        placeholder="Plot Area"
        options={plotOptions}
        value={plotUnit}
        setValue={setPlotUnit}
      />

      {/* Built-up Area */}
      <div className="search-field">
        <FaBuilding className="field-icon" />
        <input
          type="text"
          placeholder="Built-up Area"
          value={builtUpArea}
          onChange={(e) => setBuiltUpArea(e.target.value)}
        />
      </div>

      {/* Construction Type */}
      <CustomDropdown
        icon={<MdOutlineArchitecture className="field-icon" />}
        placeholder="Construction Type"
        options={constructionOptions}
        value={constructionType}
        setValue={setConstructionType}
      />

      {/* Property Type */}
      <CustomDropdown
        icon={<HiHomeModern className="field-icon" />}
        placeholder="Property Type"
        options={propertyOptions}
        value={propertyType}
        setValue={setPropertyType}
      />

      {/* Button */}
      <button
        className="estimate-btn"
        onClick={handleEstimate}
      >
        Get Estimate
      </button>

    </section>
  );
}