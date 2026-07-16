import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import {
  FaMapMarkerAlt,
  FaBuilding,
  FaRulerCombined,
  FaChevronDown,
} from "react-icons/fa";
import { MdOutlineArchitecture } from "react-icons/md";
import { HiHomeModern } from "react-icons/hi2";

import CustomDropdown from "./CustomDropdown";
import "../styles/searchpanel.css";

const odishaDistricts = [
  "Angul", "Balangir", "Balasore", "Bargarh", "Bhadrak", "Boudh",
  "Cuttack", "Deogarh", "Dhenkanal", "Gajapati", "Ganjam", "Jagatsinghpur",
  "Jajpur", "Jharsuguda", "Kalahandi", "Kandhamal", "Kendrapara", "Keonjhar",
  "Khordha(Bhubaneswar)", "Koraput", "Malkangiri", "Mayurbhanj", "Nabarangpur", "Nayagarh",
  "Nuapada", "Puri", "Rayagada", "Sambalpur", "Subarnapur", "Sundargarh"
];

export default function SearchPanel() {
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const suggestionsListRef = useRef(null);

  // Inputs & Toggles
  const [location, setLocation] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [builtUpArea, setBuiltUpArea] = useState("");

  // Track keyboard navigation index
  const [activeDistrictIndex, setActiveDistrictIndex] = useState(-1);

  // Dropdowns
  const [plotUnit, setPlotUnit] = useState("");
  const [constructionType, setConstructionType] = useState("");
  const [propertyType, setPropertyType] = useState("");

  // Dropdown Options
  const plotOptions = ["sq.ft", "sq.m", "acre", "decimal"];
  const constructionOptions = ["New Construction", "Renovation", "Under Construction"];
  const propertyOptions = ["Apartment", "Simplex", "Duplex", "Triplex", "Private Villa", "Farm House"];

  // Filter districts dynamically based on what user types
  const filteredDistricts = odishaDistricts.filter((district) =>
    district.toLowerCase().includes(location.toLowerCase())
  );

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Auto-scroll the dropdown menu to keep the highlighted district in view
  const scrollIntoView = (index) => {
    if (!suggestionsListRef.current) return;
    const container = suggestionsListRef.current;
    const items = container.querySelectorAll("li");
    const activeItem = items[index];

    if (activeItem) {
      const containerTop = container.scrollTop;
      const containerBottom = containerTop + container.clientHeight;
      const elemTop = activeItem.offsetTop;
      const elemBottom = elemTop + activeItem.clientHeight;

      if (elemTop < containerTop) {
        container.scrollTop = elemTop;
      } else if (elemBottom > containerBottom) {
        container.scrollTop = elemBottom - container.clientHeight;
      }
    }
  };

  // Keyboard navigation event handler
  const handleKeyDown = (e) => {
    if (!isDropdownOpen) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveDistrictIndex((prevIndex) => {
        const nextIndex = prevIndex < filteredDistricts.length - 1 ? prevIndex + 1 : prevIndex;
        setTimeout(() => scrollIntoView(nextIndex), 10);
        return nextIndex;
      });
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveDistrictIndex((prevIndex) => {
        const nextIndex = prevIndex > 0 ? prevIndex - 1 : prevIndex;
        setTimeout(() => scrollIntoView(nextIndex), 10);
        return nextIndex;
      });
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (activeDistrictIndex >= 0 && activeDistrictIndex < filteredDistricts.length) {
        setLocation(filteredDistricts[activeDistrictIndex]);
        setIsDropdownOpen(false);
        setActiveDistrictIndex(-1);
      }
    } else if (e.key === "Escape") {
      setIsDropdownOpen(false);
      setActiveDistrictIndex(-1);
    }
  };

  // Process the calculation route and forward data parameters safely
  const handleEstimate = () => {
    if (!location || !location.trim()) {
      alert("Please enter or select a Location.");
      return;
    }

    if (!plotUnit) {
      alert("Please select a Plot Area unit.");
      return;
    }

    if (!builtUpArea || !builtUpArea.trim()) {
      alert("Please enter the Built-up Area.");
      return;
    }

    if (!constructionType) {
      alert("Please select a Construction Type.");
      return;
    }

    if (!propertyType) {
      alert("Please select a Property Type.");
      return;
    }

    const matchedDistrict = odishaDistricts.find(
      (district) => district.toLowerCase() === location.trim().toLowerCase()
    );

    if (!matchedDistrict) {
      alert("Please select a valid district from Odisha from the list.");
      return;
    }

    if (isNaN(builtUpArea) || parseFloat(builtUpArea) <= 0) {
      alert("Please enter a valid numeric value for the Built-up Area.");
      return;
    }

    // 🌟 FIX: Route user to login screen, packing all selected data properties inside history state
    navigate("/login", {
      state: {
        estimateData: {
          location: matchedDistrict,
          plotUnit: plotUnit,
          builtUpArea: builtUpArea,
          constructionType: constructionType,
          propertyType: propertyType
        }
      }
    });

    // 🌟 FIX: Clear these local states AFTER navigation values have been packed and handed off
    setLocation("");
    setBuiltUpArea("");
    setPlotUnit("");
    setConstructionType("");
    setPropertyType("");
    setActiveDistrictIndex(-1);
    setIsDropdownOpen(false);
  };

  return (
    <section className="search-panel">

      {/* Location Input Wrapper */}
      <div ref={dropdownRef} className="search-field location-field">
        <FaMapMarkerAlt className="field-icon" />
        <div style={{ flex: 1, display: "flex", alignItems: "center", position: "relative" }}>
          <input
            type="text"
            placeholder="Enter Location"
            value={location}
            onFocus={() => {
              setIsDropdownOpen(true);
              setActiveDistrictIndex(-1);
            }}
            onChange={(e) => {
              setLocation(e.target.value);
              setIsDropdownOpen(true);
              setActiveDistrictIndex(-1);
            }}
            onKeyDown={handleKeyDown}
            style={{ width: "100%", border: "none", outline: "none" }}
          />

          <FaChevronDown
            className="dropdown-arrow-icon"
            onClick={() => {
              setIsDropdownOpen(!isDropdownOpen);
              setActiveDistrictIndex(-1);
            }}
            style={{
              transform: isDropdownOpen ? "rotate(180deg)" : "rotate(0deg)",
              cursor: "pointer",
              marginLeft: "10px"
            }}
          />
        </div>

        {/* Custom White Scrollable Dropdown */}
        {isDropdownOpen && (
          <ul ref={suggestionsListRef} className="location-suggestions-dropdown">
            {filteredDistricts.length > 0 ? (
              filteredDistricts.map((district, index) => (
                <li
                  key={district}
                  className={index === activeDistrictIndex ? "active" : ""}
                  onClick={() => {
                    setLocation(district);
                    setIsDropdownOpen(false);
                    setActiveDistrictIndex(-1);
                  }}
                  onMouseEnter={() => setActiveDistrictIndex(index)}
                >
                  {district}
                </li>
              ))
            ) : (
              <li className="no-location-msg">
                No location found
              </li>
            )}
          </ul>
        )}
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
          placeholder="Enter Built-up Area"
          value={builtUpArea}
          onChange={(e) => {
            const val = e.target.value;
            if (val === "" || /^[0-9]*\.?[0-9]*$/.test(val)) {
              setBuiltUpArea(val);
            }
          }}
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
      <button className="estimate-btn" onClick={handleEstimate}>
        Get Estimate
      </button>

    </section>
  );
}
