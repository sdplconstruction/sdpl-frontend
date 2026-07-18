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
  "Angul",
  "Balangir",
  "Balasore",
  "Bargarh",
  "Bhadrak",
  "Boudh",
  "Cuttack",
  "Deogarh",
  "Dhenkanal",
  "Gajapati",
  "Ganjam",
  "Jagatsinghpur",
  "Jajpur",
  "Jharsuguda",
  "Kalahandi",
  "Kandhamal",
  "Kendrapara",
  "Keonjhar",
  "Khordha (Bhubaneswar)",
  "Koraput",
  "Malkangiri",
  "Mayurbhanj",
  "Nabarangpur",
  "Nayagarh",
  "Nuapada",
  "Puri",
  "Rayagada",
  "Sambalpur",
  "Subarnapur",
  "Sundargarh",
];

export default function SearchPanel() {
  const navigate = useNavigate();

  const dropdownRef = useRef(null);
  const suggestionsListRef = useRef(null);

  const [location, setLocation] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeDistrictIndex, setActiveDistrictIndex] = useState(-1);

  const [plotUnit, setPlotUnit] = useState("");
  const [builtUpArea, setBuiltUpArea] = useState("");
  const [constructionType, setConstructionType] = useState("");
  const [propertyType, setPropertyType] = useState("");

  const plotOptions = ["sq.ft", "sq.m", "acre", "decimal"];

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

  const filteredDistricts = location.trim() === ""
  ? odishaDistricts
  : odishaDistricts.filter((district) =>
      district.toLowerCase().includes(location.toLowerCase())
    );

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false);
        setActiveDistrictIndex(-1);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const scrollIntoView = (index) => {
    if (!suggestionsListRef.current) return;

    const container = suggestionsListRef.current;
    const items = container.querySelectorAll("li");
    const activeItem = items[index];

    if (!activeItem) return;

    const containerTop = container.scrollTop;
    const containerBottom = containerTop + container.clientHeight;
    const itemTop = activeItem.offsetTop;
    const itemBottom = itemTop + activeItem.clientHeight;

    if (itemTop < containerTop) {
      container.scrollTop = itemTop;
    } else if (itemBottom > containerBottom) {
      container.scrollTop =
        itemBottom - container.clientHeight;
    }
  };

  const handleKeyDown = (e) => {
    if (!isDropdownOpen) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setActiveDistrictIndex((prev) => {
          const next =
            prev < filteredDistricts.length - 1 ? prev + 1 : prev;
          setTimeout(() => scrollIntoView(next), 10);
          return next;
        });
        break;

      case "ArrowUp":
        e.preventDefault();
        setActiveDistrictIndex((prev) => {
          const next = prev > 0 ? prev - 1 : prev;
          setTimeout(() => scrollIntoView(next), 10);
          return next;
        });
        break;

      case "Enter":
        e.preventDefault();

        if (
          activeDistrictIndex >= 0 &&
          activeDistrictIndex < filteredDistricts.length
        ) {
          setLocation(filteredDistricts[activeDistrictIndex]);
          setIsDropdownOpen(false);
          setActiveDistrictIndex(-1);
        }
        break;

      case "Escape":
        setIsDropdownOpen(false);
        setActiveDistrictIndex(-1);
        break;

      default:
        break;
    }
  };

  const handleEstimate = () => {
    if (!location.trim()) {
      alert("Please enter or select a Location.");
      return;
    }

    if (!plotUnit) {
      alert("Please select a Plot Area.");
      return;
    }

    if (!builtUpArea.trim()) {
      alert("Please enter Built-up Area.");
      return;
    }

    if (!constructionType) {
      alert("Please select Construction Type.");
      return;
    }

    if (!propertyType) {
      alert("Please select Property Type.");
      return;
    }

    const matchedDistrict = odishaDistricts.find(
      (district) =>
        district.toLowerCase() === location.trim().toLowerCase()
    );

    if (!matchedDistrict) {
      alert("Please select a valid Odisha district.");
      return;
    }

    if (
      isNaN(builtUpArea) ||
      Number(builtUpArea) <= 0
    ) {
      alert("Please enter a valid Built-up Area.");
      return;
    }

    navigate("/login", {
      state: {
        estimateData: {
          location: matchedDistrict,
          plotUnit,
          builtUpArea,
          constructionType,
          propertyType,
        },
      },
    });

    setLocation("");
    setPlotUnit("");
    setBuiltUpArea("");
    setConstructionType("");
    setPropertyType("");
    setActiveDistrictIndex(-1);
    setIsDropdownOpen(false);
  };

  return (
    <section className="search-panel">

      {/* Location */}
      <div
        ref={dropdownRef}
        className="search-field location-field"
      >
        <FaMapMarkerAlt className="field-icon" />

        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            position: "relative",
          }}
        >
          <input
            type="text"
            placeholder="Enter Location"
            value={location}
            onClick={() => {
            setLocation("");
           setIsDropdownOpen(true);
          }}
            onFocus={() => {
              setIsDropdownOpen(true);
              setActiveDistrictIndex(-1);
            }}
            onChange={(e) => {
              const val = e.target.value;
              setLocation(e.target.value);
              // setIsDropdownOpen(true);
              // setActiveDistrictIndex(-1);
            }}
            onKeyDown={handleKeyDown}
            style={{
              width: "100%",
              border: "none",
              outline: "none",
            }}
          />

          <FaChevronDown
            className="dropdown-arrow-icon"
            onClick={() => {
              // If opening, maybe clear the text so they see the full list
             if (!isDropdownOpen) {
            setLocation("");
             }
              setIsDropdownOpen(!isDropdownOpen);
              setActiveDistrictIndex(-1);
            }}
            style={{
              cursor: "pointer",
              marginLeft: "10px",
              transition: "transform 0.2s",
              transform: isDropdownOpen
                ? "rotate(180deg)"
                : "rotate(0deg)",
            }}
          />
        </div>

        {isDropdownOpen && (
          <ul
            ref={suggestionsListRef}
            className="location-suggestions-dropdown"
          >
            {filteredDistricts.length > 0 ? (
              filteredDistricts.map((district, index) => (
                <li
                  key={district}
                  className={
                    index === activeDistrictIndex
                      ? "active"
                      : ""
                  }
                  onMouseEnter={() =>
                    setActiveDistrictIndex(index)
                  }
                  onClick={() => {
                    setLocation(district);
                    setIsDropdownOpen(false);
                    setActiveDistrictIndex(-1);
                  }}
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
            const value = e.target.value;

            if (
              value === "" ||
              /^[0-9]*\.?[0-9]*$/.test(value)
            ) {
              setBuiltUpArea(value);
            }
          }}
        />
      </div>

      {/* Construction Type */}
      <CustomDropdown
        icon={
          <MdOutlineArchitecture className="field-icon" />
        }
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

      <button
        className="estimate-btn"
        onClick={handleEstimate}
      >
        Get Estimate
      </button>
    </section>
  );
}