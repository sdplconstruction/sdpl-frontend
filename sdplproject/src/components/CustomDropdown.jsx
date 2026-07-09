/*import { useState, useRef, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa";
import "../styles/customdropdown.css";

export default function CustomDropdown({
  icon,
  placeholder,
  options,
  value,
  setValue,
}) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
  }, []);
  

  return (
    <div className="custom-dropdown" ref={dropdownRef}>
      {icon}

      <div
        className="dropdown-trigger"
        onClick={() => setOpen(!open)}
      >
        <span>{value ? value : placeholder}</span>

        <FaChevronDown
          className={`dropdown-arrow ${open ? "rotate" : ""}`}
        />
      </div>

      {open && (
  <ul className="dropdown-menu">
    {options &&
      options.map((option, index) => (
        <li
          key={index}
          onClick={() => {
            setValue(option);
            setOpen(false);
          }}
        >
          {option}
        </li>
      ))}
  </ul>
)}
    </div>
  );
}*/
/*import { useState } from "react";

export default function CustomDropdown({
  placeholder,
  options,
  value,
  setValue,
}) {
  const [open, setOpen] = useState(false);

  return (
    <div
      style={{
        border: "2px solid blue",
        padding: "20px",
        position: "relative",
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%",
          padding: "10px",
          cursor: "pointer",
        }}
      >
        {value || placeholder}
      </button>

      {open && (
        <div
          style={{
            background: "red",
            color: "white",
            padding: "10px",
            position: "absolute",
            top: "100%",
            left: 0,
            width: "100%",
            zIndex: 999999,
          }}
        >
          {options.map((option) => (
            <div
              key={option}
              onClick={() => {
                setValue(option);
                setOpen(false);
              }}
              style={{ padding: "8px", cursor: "pointer" }}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}*/
import { useState, useRef, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa";
import "../styles/customdropdown.css";

export default function CustomDropdown({
  icon,
  placeholder,
  options,
  value,
  setValue,
}) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
  }, []);

  return (
    <div className="custom-dropdown" ref={dropdownRef}>

      <div
        className="dropdown-trigger"
        onClick={() => setOpen((prev) => !prev)}
      >
        {icon}

        <span>{value || placeholder}</span>

        <FaChevronDown className={`dropdown-arrow ${open ? "rotate" : ""}`} />
      </div>

      {open && (
  /* Changed class name here to prevent global header name clash */
  <ul className="search-dropdown-menu">
    {options &&
      options.map((option, index) => (
        <li
          key={index}
          onClick={() => {
            setValue(option);
            setOpen(false);
          }}
        >
          {option}
        </li>
      ))}
  </ul>
)}
    </div>
  );
}