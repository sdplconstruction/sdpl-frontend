
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