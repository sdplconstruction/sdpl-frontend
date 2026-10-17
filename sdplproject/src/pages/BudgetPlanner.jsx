
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import html2pdf from 'html2pdf.js';
import { CALCULATION_RATES } from '../data/rates';
import { MATERIAL_SPECS, EXTRA_WORK_ITEMS } from '../data/material';
import './BudgetPlanner.css';

// Import local assets
import logo from '../assets/logo.png';
import coreImg from '../assets/core.jpg';
import lockKeyImg from '../assets/lockkey.jpg';
import semiFurnishedImg from '../assets/semifurnished.jpg';
import fullyFurnishedImg from '../assets/fullyfurnished.jpg';

const ODISHA_DISTRICTS = [
  "Angul", "Balangir", "Balasore", "Bargarh", "Bhadrak", "Baudh", "Cuttack",
  "Deogarh", "Dhenkanal", "Gajapati", "Ganjam", "Jagatsinghpur", "Jajpur",
  "Jharsuguda", "Kalahandi", "Kandhamal", "Kendrapara", "Kendujhar", "Khordha (Bhubaneswar)",
  "Koraput", "Malkangiri", "Mayurbhanj", "Nabarangpur", "Nayagarh", "Nuapada",
  "Puri", "Rayagada", "Sambalpur", "Subarnapur", "Sundargarh"
];

const PROPERTY_TYPES = {
  Residential: [
    "Simplex",
    "Duplex",
    "Triplex",
    "Apartment",
    "Private Villa",
    "Farm House",
    "Standalone Property"
  ],
  Commercial: [
    "Office Space",
    "Shop",
    "Showroom",
    "Commercial Complex",
    "Warehouse",
    "Hotel",
    "Industrial Building"
  ]
};

const FLOOR_OPTIONS = [
  "GF", "G+1", "G+2", "G+3", "G+4", "G+5",
  "S+1", "S+2", "S+3", "S+4", "S+5", "S+6",
  "B+S+G+1", "B+S+G+2", "B+S+G+3", "B+S+G+4"
];

const ADD_ON_ITEMS = [
  "modularKitchen",
  "falseCeiling",
  "compoundWall",
  "borewell",
  "solarSystem",
  "smartHome",
  "lift"
];

const PACKAGE_DETAILS = {
  coreHouse: {
    name: "Core House",
    desc: "Structure Only (Gray Structure)",
    range: "₹999 - ₹1,400",
    img: coreImg,
    inclusions: [
      "Site Layout & Excavation",
      "PCC, Foundation & Plinth Beam",
      "RCC Columns, Beams & Slab",
      "Brick/Block Masonry",
      "Electrical Conduits & Drainage Pipes"
    ]
  },
  lockAndKey: {
    name: "Lock & Key",
    desc: "Standard Ready to Move",
    range: "₹1,600 - ₹2,200",
    img: lockKeyImg,
    inclusions: [
      "Complete Gray Structure",
      "Roof Waterproofing & Plastering",
      "Ceramic/Vitrified Flooring",
      "Flush Doors & Aluminium Windows",
      "Interior/Exterior Painting"
    ]
  },
  semiFurnished: {
    name: "Semi Furnished",
    desc: "Premium Finish + Modular Kitchen",
    range: "₹1,800 - ₹2,400",
    img: semiFurnishedImg,
    inclusions: [
      "Everything in Lock & Key",
      "Granite Kitchen Counter & Sink",
      "Modular Kitchen Woodwork",
      "Premium Wardrobes & TV Unit",
      "Selected Area False Ceilings"
    ]
  },
  fullyFurnished: {
    name: "Fully Furnished",
    desc: "Luxury Finish + Complete Furniture & Appliances",
    range: "₹2,500 - ₹3,500",
    img: fullyFurnishedImg,
    inclusions: [
      "Everything in Semi-Furnished",
      "Complete House Designer False Ceiling",
      "Luxury Sofa Set, Beds & Dining Table",
      "Television, Fridge & Air Conditioner",
      "Decorative Chandeliers & Curtains"
    ]
  }
};

const QUALITY_TIERS = {
  basic: {
    name: "Basic",
    stars: "★★",
    desc: "Standard Quality",
    badge: "Economical"
  },
  classic: {
    name: "Classic",
    stars: "★★★",
    desc: "Good Quality",
    badge: "Best Value"
  },
  premium: {
    name: "Premium",
    stars: "★★★★★",
    desc: "High Quality",
    badge: "Luxury Finish"
  }
};

export default function BudgetPlanner() {
  const navigate = useNavigate();
  const location = useLocation();

  const locationDropdownRef = useRef(null);
  const floorDropdownRef = useRef(null);
  const propertyDropdownRef = useRef(null);
  const autoDownloadStartedRef = useRef(false);

  const [formData, setFormData] = useState({
    mobile: '',
    plotArea: '',
    totalBuiltUpArea: '',
    location: '',
    buildingType: 'Residential',
    propertyDetails: 'Simplex',
    numFloors: 'GF',
    packageType: 'coreHouse',
    qualityTier: 'basic',
    addOns: {
      modularKitchen: false,
      falseCeiling: false,
      compoundWall: false,
      borewell: false,
      solarSystem: false,
      smartHome: false,
      lift: false
    }
  });

  const [summary, setSummary] = useState({
    baseCost: 0,
    addOnsCost: 0,
    otherCharges: 0,
    totalCost: 0
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [isFloorOpen, setIsFloorOpen] = useState(false);
  const [isPropertyOpen, setIsPropertyOpen] = useState(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [error, setError] = useState('');
  const [autoDownloadPending, setAutoDownloadPending] = useState(false);
  const [showDownloadSuccess, setShowDownloadSuccess] = useState(false);

  // Structural dynamic calculations based purely on user-entered Total Built-Up Area
  useEffect(() => {
    const ratePerSqFt =
      CALCULATION_RATES[formData.packageType]?.[formData.qualityTier] || 1200;

    const builtUpAreaNum = Number(formData.totalBuiltUpArea || 0);
    const baseCost = builtUpAreaNum * ratePerSqFt;

    setSummary({
      baseCost,
      addOnsCost: 0,
      otherCharges: 0,
      totalCost: baseCost
    });
  }, [
    formData.totalBuiltUpArea,
    formData.packageType,
    formData.qualityTier
  ]);


  // Handle one-time automatic PDF download after OTP login
  useEffect(() => {
    const isLoggedIn =
  sessionStorage.getItem("isLoggedIn") === "true";

    const pendingDownload =
      sessionStorage.getItem("pendingBudgetPDFDownload") === "true";

    if (!isLoggedIn || !pendingDownload) {
      return;
    }

    if (autoDownloadStartedRef.current) {
      return;
    }

    // Consume the request before starting any download.
    autoDownloadStartedRef.current = true;
    sessionStorage.removeItem("pendingBudgetPDFDownload");
    localStorage.removeItem("autoDownloadPdf");

    const savedFormString =
      localStorage.getItem("pendingBudgetForm");

    if (savedFormString) {
      try {
        setFormData(JSON.parse(savedFormString));
      } catch (err) {
        console.error("Unable to restore saved budget form:", err);
      }

      localStorage.removeItem("pendingBudgetForm");
    }

    setAutoDownloadPending(true);
  }, []);

  // Generate the PDF after the restored form has rendered.
  useEffect(() => {
    if (!autoDownloadPending) {
      return;
    }

    setAutoDownloadPending(false);

    const timer = setTimeout(() => {
      handleDownloadPDF(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, [autoDownloadPending]);


  // Handle outside click to close dropdowns
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        locationDropdownRef.current &&
        !locationDropdownRef.current.contains(event.target)
      ) {
        setIsLocationOpen(false);
      }

      if (
        floorDropdownRef.current &&
        !floorDropdownRef.current.contains(event.target)
      ) {
        setIsFloorOpen(false);
      }

      if (
        propertyDropdownRef.current &&
        !propertyDropdownRef.current.contains(event.target)
      ) {
        setIsPropertyOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleMobileChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");

    if (value.length <= 10) {
      setFormData((prev) => ({
        ...prev,
        mobile: value
      }));

      setError("");
    }
  };

const handleSelect = (field, value) => {
  setFormData((prev) => {
    if (field === "buildingType") {
      const availableTypes = PROPERTY_TYPES[value];

      return {
        ...prev,
        buildingType: value,
        propertyDetails: availableTypes[0]
      };
    }

    return {
      ...prev,
      [field]: value
    };
  });
};

  const handleToggleAddOn = (key) => {
    setFormData((prev) => ({
      ...prev,
      addOns: {
        ...prev.addOns,
        [key]: !prev.addOns[key]
      }
    }));
  };

  const formatCurrency = (num) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(num);
  };

  const filteredDistricts = ODISHA_DISTRICTS.filter((district) =>
    district.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const currentPackage = PACKAGE_DETAILS[formData.packageType];
  const activeQualityData = QUALITY_TIERS[formData.qualityTier];
  const activeMaterialSpecs = MATERIAL_SPECS[formData.qualityTier];

  const selectedRate =
    CALCULATION_RATES[formData.packageType]?.[formData.qualityTier] || 1200;

  const handleDownloadPDF = async (skipLoginCheck = false) => {
 const isLoggedIn =
  sessionStorage.getItem("isLoggedIn") === "true";

if (!isLoggedIn && !skipLoginCheck) {
  // Preserve the complete Budget Planner form.
  localStorage.setItem(
    "pendingBudgetForm",
    JSON.stringify(formData)
  );

  // Tell Budget Planner to download the PDF after OTP verification.
  sessionStorage.setItem(
    "pendingBudgetPDFDownload",
    "true"
  );

  localStorage.setItem("autoDownloadPdf", "true");

  navigate("/login", {
    state: {
      contact: "",
      method: "mobile",
      fullName: "",
      estimateData: {
        "Total Built-Up Area": formData.totalBuiltUpArea,
        Package: formData.packageType,
        "Quality Tier": formData.qualityTier
      },
      autoDownloadBudgetPDF: true,
      returnTo: location.pathname
    }
  });

  return;
}

    setError("");
    setIsGeneratingPdf(true);

    const activeAddOnsList = Object.keys(formData.addOns)
      .filter((key) => formData.addOns[key])
      .map((key) => key.replace(/([A-Z])/g, ' $1'));

    const element = document.createElement('div');

   element.innerHTML = `
      <div style="font-family: 'Segoe UI', Helvetica, Arial, sans-serif; padding: 30px; color: #2c3e50; background-color: #fff;">

        <!-- Top Letterhead Branding -->
        <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 12px;">
          <img src="${logo}" alt="Subharambha Developer's Pvt. Ltd." style="height: 52px; object-fit: contain;" />
          <div>
            <h1 style="margin: 0; color: #D62828; font-size: 21px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px;">
              Subharambha Developer's Pvt. Ltd.
            </h1>
            <p style="margin: 2px 0 6px 0; color: #555; font-size: 11px; font-weight: 600;">
              BuildSmart365 Budget Planner & Cost Estimation Report
            </p>
            <div style="font-size: 11px; color: #444; display: flex; gap: 20px; font-weight: 600;">
              <span><strong>Phone:</strong> +91 9777-162-067</span>
              <span><strong>Website:</strong> www.sdplconstructions.com</span>
              <span><strong>Date:</strong> ${new Date().toLocaleDateString('en-IN')}</span>
            </div>
          </div>
        </div>

        <!-- Centered Civil Contractor Quotation Title Above Red Line Divider -->
        <div style="text-align: center; margin: 15px 0 8px 0;">
          <span style="font-size: 15px; font-weight: 800; color: #D62828; text-transform: uppercase; letter-spacing: 1px;">
            CIVIL CONTRACTOR QUOTATION
          </span>
        </div>
        <div style="border-top: 2.5px solid #D62828; margin-bottom: 20px;"></div>

        <!-- Section 1: Project Overview -->
        <div style="margin-bottom: 20px; background-color: #fcfcfc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 15px;">
          <h3 style="margin: 0 0 10px 0; font-size: 13px; color: #D62828; text-transform: uppercase; letter-spacing: 0.5px; border-bottom: 1px solid #f0f0f0; padding-bottom: 6px;">1. Project Overview & Property Details</h3>
          <table style="width: 100%; border-collapse: collapse; font-size: 12px;">
            <tr>
              <td style="padding: 5px 0; color: #7f8c8d; width: 25%;">Building Category:</td>
              <td style="padding: 5px 0; font-weight: 600; width: 25%;">${formData.buildingType} (${formData.propertyDetails})</td>
              <td style="padding: 5px 0; color: #7f8c8d; width: 25%;">Plot Area:</td>
              <td style="padding: 5px 0; font-weight: 600; width: 25%;">${formData.plotArea ? `${formData.plotArea} sq.ft` : '—'}</td>
            </tr>
            <tr>
              <td style="padding: 5px 0; color: #7f8c8d;">Floor Structure:</td>
              <td style="padding: 5px 0; font-weight: 600;">${formData.numFloors}</td>
              <td style="padding: 5px 0; color: #7f8c8d;">Total Built-Up Area:</td>
              <td style="padding: 5px 0; font-weight: 700; color: #D62828;">${formData.totalBuiltUpArea ? `${formData.totalBuiltUpArea} sq.ft` : '—'}</td>
            </tr>
            <tr>
              <td style="padding: 5px 0; color: #7f8c8d;">Package Chosen:</td>
              <td style="padding: 5px 0; font-weight: 600; color: #D62828;">${currentPackage.name}</td>
              <td style="padding: 5px 0; color: #7f8c8d;">Quality Tier:</td>
              <td style="padding: 5px 0; font-weight: 600;">${activeQualityData.name} Tier</td>
            </tr>
            <tr>
              <td style="padding: 5px 0; color: #7f8c8d;">Location (District):</td>
              <td style="padding: 5px 0; font-weight: 600;">${formData.location || '—'}</td>
              <td style="padding: 5px 0; color: #7f8c8d;">Contact Mobile:</td>
              <td style="padding: 5px 0; font-weight: 600;">
                ${formData.mobile ? `+91 ${formData.mobile}` : '—'}
              </td>
            </tr>
          </table>
        </div>

        <!-- Section 2: Material Specifications -->
        <div style="margin-bottom: 20px;">
          <h3 style="margin: 0 0 10px 0; font-size: 13px; color: #D62828; text-transform: uppercase; letter-spacing: 0.5px;">2. Included Material Specifications</h3>
          <table style="width: 100%; border-collapse: collapse; font-size: 11px; border: 1px solid #e0e0e0;">
            <tr style="background-color: #f8fafc;">
              <th style="padding: 7px; border: 1px solid #e0e0e0; text-align: left; color: #333; width: 35%;">Category</th>
              <th style="padding: 7px; border: 1px solid #e0e0e0; text-align: left; color: #333;">Brand / Quality Specifications</th>
            </tr>
            <tr><td style="padding: 6px; border: 1px solid #e0e0e0; font-weight: 600;">Cement</td><td style="padding: 6px; border: 1px solid #e0e0e0;">${activeMaterialSpecs.cement}</td></tr>
            <tr><td style="padding: 6px; border: 1px solid #e0e0e0; font-weight: 600;">Steel</td><td style="padding: 6px; border: 1px solid #e0e0e0;">${activeMaterialSpecs.steel}</td></tr>
            <tr><td style="padding: 6px; border: 1px solid #e0e0e0; font-weight: 600;">Bricks</td><td style="padding: 6px; border: 1px solid #e0e0e0;">${activeMaterialSpecs.bricks}</td></tr>
            <tr><td style="padding: 6px; border: 1px solid #e0e0e0; font-weight: 600;">Sanitary & Fittings</td><td style="padding: 6px; border: 1px solid #e0e0e0;">${activeMaterialSpecs.sanitary}</td></tr>
            <tr><td style="padding: 6px; border: 1px solid #e0e0e0; font-weight: 600;">Electrical</td><td style="padding: 6px; border: 1px solid #e0e0e0;">${activeMaterialSpecs.electrical}</td></tr>
            <tr><td style="padding: 6px; border: 1px solid #e0e0e0; font-weight: 600;">Tiles</td><td style="padding: 6px; border: 1px solid #e0e0e0;">${activeMaterialSpecs.tiles}</td></tr>
            <tr><td style="padding: 6px; border: 1px solid #e0e0e0; font-weight: 600;">Paintings</td><td style="padding: 6px; border: 1px solid #e0e0e0;">${activeMaterialSpecs.painting}</td></tr>
            <tr><td style="padding: 6px; border: 1px solid #e0e0e0; font-weight: 600;">Door Frame / Chaukatha</td><td style="padding: 6px; border: 1px solid #e0e0e0;">${activeMaterialSpecs.doorFrame}</td></tr>
            <tr><td style="padding: 6px; border: 1px solid #e0e0e0; font-weight: 600;">Window Frame</td><td style="padding: 6px; border: 1px solid #e0e0e0;">${activeMaterialSpecs.windowFrame}</td></tr>
            <tr><td style="padding: 6px; border: 1px solid #e0e0e0; font-weight: 600;">Doors & Locks</td><td style="padding: 6px; border: 1px solid #e0e0e0;">${activeMaterialSpecs.doorsAndLocks || activeMaterialSpecs.locks}</td></tr>
          </table>
        </div>

        <!-- Section 3: Add-On Infrastructure -->
        <div style="margin-bottom: 20px;">
          <h3 style="margin: 0 0 10px 0; font-size: 13px; color: #D62828; text-transform: uppercase; letter-spacing: 0.5px;">3. Selected Add-On Infrastructure</h3>
          ${activeAddOnsList.length > 0 ? `
            <table style="width: 100%; border-collapse: collapse; font-size: 11px; border: 1px solid #e0e0e0;">
              <tr style="background-color: #f8fafc;">
                <th style="padding: 7px; border: 1px solid #e0e0e0; text-align: left; color: #333; width: 45%;">Add-On Feature</th>
                <th style="padding: 7px; border: 1px solid #e0e0e0; text-align: left; color: #333;">Status & Pricing Note</th>
              </tr>
              ${activeAddOnsList.map(addon => `
                <tr>
                  <td style="padding: 6px; border: 1px solid #e0e0e0; font-weight: 600; text-transform: capitalize;">${addon}</td>
                  <td style="padding: 6px; border: 1px solid #e0e0e0; color: #27ae60; font-weight: 600;">
                    ✓ Selected <span style="color: #666; font-weight: normal; font-size: 10px;">(Charged as per actual site requirements)</span>
                  </td>
                </tr>
              `).join('')}
            </table>
          ` : `
            <p style="font-size: 12px; color: #7f8c8d; font-style: italic; margin: 0; background-color: #f9f9f9; padding: 10px; border-radius: 4px; border: 1px solid #eee;">
              No optional infrastructure add-ons selected.
            </p>
          `}
        </div>

        <!-- Section 4: Extra Work Notice -->
        <div style="margin-bottom: 20px; font-size: 11px; background: #fff8f8; padding: 12px; border: 1px dashed #D62828; border-radius: 6px;">
          <h4 style="margin: 0 0 8px 0; color: #D62828; font-size: 12px; text-transform: uppercase;">⚠️ Extra Work — Charged Separately</h4>
          <ol style="margin: 0; padding-left: 18px; color: #333; line-height: 1.5;">
            ${(EXTRA_WORK_ITEMS || []).map(item => `<li>${item.replace(/^\d+\.\s*/, '')}</li>`).join('')}
          </ol>
        </div>

        <!-- PAGE BREAK to push Section 5 cleanly onto the next page -->
        <div style="page-break-before: always; break-before: page; height: 1px;"></div>

        <!-- Section 5: Financial Summary -->
        <div style="border-top: 2px solid #D62828; padding-top: 15px; margin-top: 20px;">
          <h3 style="margin: 0 0 10px 0; font-size: 13px; color: #D62828; text-transform: uppercase; letter-spacing: 0.5px;">5. Financial Cost Summary</h3>
          <table style="width: 55%; margin-left: auto; border-collapse: collapse; font-size: 13px;">
            <tr>
              <td style="padding: 6px 0; color: #7f8c8d;">Base Calculation (${formData.totalBuiltUpArea || 0} sq.ft × ₹${selectedRate}):</td>
              <td style="padding: 6px 0; text-align: right; font-weight: 700;">${formatCurrency(summary.baseCost)}</td>
            </tr>
            <tr style="border-top: 2px solid #D62828;">
              <td style="padding: 8px 0; color: #D62828; font-weight: 800; font-size: 15px;">Estimated Total Cost (approx.):</td>
              <td style="padding: 8px 0; text-align: right; color: #D62828; font-weight: 800; font-size: 18px;">
                ${formatCurrency(summary.totalCost)} <span style="font-size: 11px; font-weight: 600; color: #7f8c8d;">(approx.)</span>
              </td>
            </tr>
          </table>

          <!-- Disclaimer / Pricing Variation Note Box -->
          <div style="margin-top: 12px; padding: 10px 14px; background-color: #fffbe6; border: 1px solid #ffe58f; border-radius: 6px; font-size: 11px; color: #8c6b00; line-height: 1.5;">
            <strong>📌 Note:</strong> Prices are indicative and not fixed. Final estimated costs may vary depending on local market material rate fluctuations, actual site conditions, and custom structural design requirements. GST, plan approvals, and municipal taxes are extra as applicable.
          </div>
        </div>

      </div>
    `;

    const options = {
      margin: [10, 10, 10, 10],
      filename: `Subharambha_BuildSmart365_Estimate.pdf`,
      image: {
        type: 'jpeg',
        quality: 0.98
      },
      html2pdf: {
        scale: 2,
        useCORS: true
      },
      jsPDF: {
        unit: 'mm',
        format: 'a4',
        orientation: 'portrait'
      }
    };

   try {
  await html2pdf().from(element).set(options).save();

  // Clear login after the PDF download has been triggered.
  sessionStorage.removeItem("isLoggedIn");

  // Display the success popup.
  setShowDownloadSuccess(true);
} catch (err) {
  console.error("PDF generation failed:", err);
  alert("Unable to generate the PDF. Please try again.");
} finally {
  setIsGeneratingPdf(false);
}
  };

  return (
    <div className="planner-wrapper">
      <header className="planner-main-header">
        <div className="header-left">
          <button
            className="home-nav-btn"
            onClick={() => navigate("/")}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              marginBottom: '10px',
              color: '#666',
              fontSize: '14px'
            }}
          >
            ← Back to Home
          </button>

          <h1>BuildSmart365<span> Calculator</span></h1>
          <p>Your Dream Home Planned within Your Budget</p>
        </div>

        <div className="header-right-badge">
          <div className="badge-text">Estimated Budget</div>
          <div className="badge-amount">{formatCurrency(summary.totalCost)}</div>
          <div className="badge-status">
            <span>•</span> Updating automatically
          </div>
        </div>
      </header>

      <div className="planner-main-grid">
        <div className="options-column">

          {/* Step 1: Project Details */}
          <section className="form-card-section">
            <h2 className="section-step-title">
              <span>📋</span> Project Details
            </h2>

            <div className="project-details-row full-clean-dropdowns">

              {/* Mobile Number Input (span-full makes it take both columns on mobile) */}
              <div className="input-box-wrapper span-full">
                <label>Mobile Number</label>

                <div className="input-with-unit">
                  <input
                    type="tel"
                    value={formData.mobile}
                    onChange={handleMobileChange}
                    placeholder="Enter 10-digit Mobile"
                    maxLength={10}
                    style={{
                      paddingRight: '12px',
                      borderColor: error ? 'var(--brand-red)' : ''
                    }}
                  />
                </div>

                {error && (
                  <div
                    style={{
                      color: 'var(--brand-red)',
                      fontSize: '12px',
                      marginTop: '5px'
                    }}
                  >
                    ⚠️ {error}
                  </div>
                )}
              </div>

              {/* Location Input (span-full makes it take both columns on mobile) */}
              <div
                className="input-box-wrapper span-full"
                ref={locationDropdownRef}
              >
                <label>Location (Odisha District)</label>

                <div className="searchable-dropdown-container">
                  <input
                    type="text"
                    placeholder={formData.location || "Type district name..."}
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setIsLocationOpen(true);
                    }}
                    onFocus={() => setIsLocationOpen(true)}
                    className="custom-select search-input"
                  />

                  {isLocationOpen && (
                    <div className="dropdown-options-list standard-forced-down">
                      {filteredDistricts.length > 0 ? (
                        filteredDistricts.map((district) => (
                          <div
                            key={district}
                            className="dropdown-item-row"
                            onClick={() => {
                              handleSelect('location', district);
                              setSearchQuery('');
                              setIsLocationOpen(false);
                            }}
                          >
                            {district}
                          </div>
                        ))
                      ) : (
                        <div className="dropdown-no-results-row">
                          No District Found
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Building Type Toggle */}
              <div className="input-box-wrapper">
                <label>Building Type</label>

                <div className="toggle-tabs">
                  {['Residential', 'Commercial'].map((type) => (
                    <button
                      type="button"
                      key={type}
                      className={`tab-btn ${
                        formData.buildingType === type ? 'active' : ''
                      }`}
                      onClick={() => handleSelect('buildingType', type)}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Plot Area Input */}
              <div className="input-box-wrapper">
                <label>Plot Area</label>

                <div className="input-with-unit">
                  <input
                    type="number"
                    value={formData.plotArea}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        plotArea: e.target.value
                      })
                    }
                    min="1"
                    placeholder="e.g. 1500"
                  />
                  <span className="unit-tag">sq.ft</span>
                </div>
              </div>

              {/* Total Built-Up Area Input */}
              <div className="input-box-wrapper">
                <label>
                  Total Built-Up Area{' '}
                  <span style={{ color: 'var(--brand-red)' }}>*</span>
                </label>

                <div className="input-with-unit">
                  <input
                    type="number"
                    value={formData.totalBuiltUpArea}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        totalBuiltUpArea: e.target.value
                      })
                    }
                    min="1"
                    placeholder="e.g. 2400"
                  />
                  <span className="unit-tag">sq.ft</span>
                </div>
              </div>

              {/* Property Details Dropdown */}
              <div
                className="input-box-wrapper"
                ref={propertyDropdownRef}
              >
                <label>Property Details</label>

                <div className="searchable-dropdown-container">
                  <div
                    className="custom-select display-trigger-dropdown"
                    onClick={() => setIsPropertyOpen(!isPropertyOpen)}
                  >
                    {formData.propertyDetails}
                  </div>

                  {isPropertyOpen && (
                    <div className="dropdown-options-list standard-forced-down">
                      {PROPERTY_TYPES[formData.buildingType].map((type) => (
                        <div
                          key={type}
                          className="dropdown-item-row"
                          onClick={() => {
                            handleSelect('propertyDetails', type);
                            setIsPropertyOpen(false);
                          }}
                        >
                          {type}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Number of Floors Selector */}
              <div
                className="input-box-wrapper"
                ref={floorDropdownRef}
              >
                <label>No. of Floors</label>

                <div className="searchable-dropdown-container">
                  <div
                    className="custom-select display-trigger-dropdown"
                    onClick={() => setIsFloorOpen(!isFloorOpen)}
                  >
                    {formData.numFloors}
                  </div>

                  {isFloorOpen && (
                    <div className="dropdown-options-list standard-forced-down">
                      {FLOOR_OPTIONS.map((floor) => (
                        <div
                          key={floor}
                          className="dropdown-item-row"
                          onClick={() => {
                            handleSelect('numFloors', floor);
                            setIsFloorOpen(false);
                          }}
                        >
                          {floor}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

            </div>
          </section>

          {/* Step 2: Construction Package */}
          <section className="form-card-section">
            <h2 className="section-step-title">
              <span>🏗️</span> 2. Construction Package
            </h2>

            <div className="packages-premium-grid">
              {Object.keys(PACKAGE_DETAILS).map((key) => {
                const pkg = PACKAGE_DETAILS[key];

                return (
                  <div
                    key={key}
                    className={`package-premium-card ${
                      formData.packageType === key ? 'selected' : ''
                    }`}
                    onClick={() => handleSelect('packageType', key)}
                  >
                    {formData.packageType === key && (
                      <div className="checked-indicator">✓</div>
                    )}

                    <div className="package-image-frame">
                      <img src={pkg.img} alt={pkg.name} />
                    </div>

                    <h3>{pkg.name}</h3>
                    <p className="pkg-desc">{pkg.desc}</p>
                    <div className="pkg-cost-range">{pkg.range}</div>
                    <div className="pkg-unit">/ sq.ft</div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Step 3: Building Quality */}
          <section className="form-card-section">
            <h2 className="section-step-title">
              <span>🛡️</span> 3. Building Quality & Materials
            </h2>

            <div className="quality-premium-grid">
              {Object.keys(QUALITY_TIERS).map((key) => {
                const tier = QUALITY_TIERS[key];

                return (
                  <div
                    key={key}
                    className={`quality-premium-card ${
                      formData.qualityTier === key ? 'selected' : ''
                    }`}
                    onClick={() => handleSelect('qualityTier', key)}
                  >
                    {formData.qualityTier === key && (
                      <div className="checked-indicator">✓</div>
                    )}

                    <h3>{tier.name}</h3>
                    <div className="stars-row">{tier.stars}</div>
                    <p>{tier.desc}</p>
                    <span className="tier-badge">{tier.badge}</span>
                  </div>
                );
              })}
            </div>

            {/* Dynamic Material Specifications Preview */}
            <div
              className="material-spec-box-container"
              style={{
                marginTop: '24px',
                padding: '20px',
                background: '#fdfdfd',
                border: '1px solid #eaebf0',
                borderRadius: '12px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '16px',
                  borderBottom: '1px solid #f0f0f0',
                  paddingBottom: '12px'
                }}
              >
                <h4
                  style={{
                    margin: 0,
                    color: 'var(--brand-red)',
                    fontSize: '15px',
                    fontWeight: '700',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}
                >
                  📦 Included Material Specifications ({activeQualityData.name} Quality)
                </h4>

                <span
                  style={{
                    fontSize: '11px',
                    background: '#fff1f1',
                    color: 'var(--brand-red)',
                    padding: '4px 10px',
                    borderRadius: '20px',
                    fontWeight: '600'
                  }}
                >
                  {activeQualityData.badge}
                </span>
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                  gap: '14px'
                }}
              >

                <div
                  className="spec-card-item"
                  style={{
                    background: '#fff',
                    border: '1px solid #eef0f3',
                    borderRadius: '8px',
                    padding: '12px 14px'
                  }}
                >
                  <div style={{
                    fontSize: '12px',
                    color: '#888',
                    fontWeight: '600',
                    textTransform: 'uppercase',
                    marginBottom: '4px'
                  }}>
                    🧱 Structure & Masonry
                  </div>

                  <div style={{
                    fontSize: '13px',
                    color: '#2c3e50',
                    fontWeight: '600'
                  }}>
                    Cement: <span style={{ fontWeight: '400', color: '#555' }}>{activeMaterialSpecs.cement}</span>
                  </div>

                  <div style={{
                    fontSize: '13px',
                    color: '#2c3e50',
                    fontWeight: '600',
                    marginTop: '4px'
                  }}>
                    Steel: <span style={{ fontWeight: '400', color: '#555' }}>{activeMaterialSpecs.steel}</span>
                  </div>

                  <div style={{
                    fontSize: '13px',
                    color: '#2c3e50',
                    fontWeight: '600',
                    marginTop: '4px'
                  }}>
                    Bricks: <span style={{ fontWeight: '400', color: '#555' }}>{activeMaterialSpecs.bricks}</span>
                  </div>
                </div>

                <div
                  className="spec-card-item"
                  style={{
                    background: '#fff',
                    border: '1px solid #eef0f3',
                    borderRadius: '8px',
                    padding: '12px 14px'
                  }}
                >
                  <div style={{
                    fontSize: '12px',
                    color: '#888',
                    fontWeight: '600',
                    textTransform: 'uppercase',
                    marginBottom: '4px'
                  }}>
                    🚿 Plumbing & Sanitary
                  </div>

                  <div style={{
                    fontSize: '13px',
                    color: '#2c3e50',
                    fontWeight: '600'
                  }}>
                    Fittings & Sanitary: <span style={{ fontWeight: '400', color: '#555' }}>{activeMaterialSpecs.sanitary}</span>
                  </div>

                  <div style={{
                    fontSize: '13px',
                    color: '#2c3e50',
                    fontWeight: '600',
                    marginTop: '4px'
                  }}>
                    Tiles: <span style={{ fontWeight: '400', color: '#555' }}>{activeMaterialSpecs.tiles}</span>
                  </div>
                </div>

                <div
                  className="spec-card-item"
                  style={{
                    background: '#fff',
                    border: '1px solid #eef0f3',
                    borderRadius: '8px',
                    padding: '12px 14px'
                  }}
                >
                  <div style={{
                    fontSize: '12px',
                    color: '#888',
                    fontWeight: '600',
                    textTransform: 'uppercase',
                    marginBottom: '4px'
                  }}>
                    ⚡ Electrical & Fitting
                  </div>

                  <div style={{
                    fontSize: '13px',
                    color: '#2c3e50',
                    fontWeight: '600'
                  }}>
                    Wiring & Switches: <span style={{ fontWeight: '400', color: '#555' }}>{activeMaterialSpecs.electrical}</span>
                  </div>

                  <div style={{
                    fontSize: '13px',
                    color: '#2c3e50',
                    fontWeight: '600',
                    marginTop: '4px'
                  }}>
                    Painting: <span style={{ fontWeight: '400', color: '#555' }}>{activeMaterialSpecs.painting}</span>
                  </div>
                </div>

                <div
                  className="spec-card-item"
                  style={{
                    background: '#fff',
                    border: '1px solid #eef0f3',
                    borderRadius: '8px',
                    padding: '12px 14px'
                  }}
                >
                  <div style={{
                    fontSize: '12px',
                    color: '#888',
                    fontWeight: '600',
                    textTransform: 'uppercase',
                    marginBottom: '4px'
                  }}>
                    🚪 Doors, Frames & Windows
                  </div>

                  <div style={{
                    fontSize: '13px',
                    color: '#2c3e50',
                    fontWeight: '600'
                  }}>
                    Chaukatha: <span style={{ fontWeight: '400', color: '#555' }}>{activeMaterialSpecs.doorFrame}</span>
                  </div>

                  <div style={{
                    fontSize: '13px',
                    color: '#2c3e50',
                    fontWeight: '600',
                    marginTop: '4px'
                  }}>
                    Window Frame: <span style={{ fontWeight: '400', color: '#555' }}>{activeMaterialSpecs.windowFrame}</span>
                  </div>

                  <div style={{
                    fontSize: '13px',
                    color: '#2c3e50',
                    fontWeight: '600',
                    marginTop: '4px'
                  }}>
                    Doors & Locks: <span style={{ fontWeight: '400', color: '#555' }}>{activeMaterialSpecs.doorsAndLocks || activeMaterialSpecs.locks}</span>
                  </div>
                </div>

              </div>
            </div>

            {/* Step 4: Add-On Features */}
            <section
              className="form-card-section"
              style={{ marginTop: '35px' }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  marginBottom: '15px'
                }}
              >
                <h2 className="section-step-title" style={{ margin: 0 }}>
                  <span>➕</span> 4. Optional Infrastructure Add-Ons
                </h2>

                <span
                  style={{
                    fontSize: '13px',
                    color: '#e67e22',
                    fontStyle: 'italic',
                    fontWeight: '500'
                  }}
                >
                  * All add-on costs are charged separately as per market price
                </span>
              </div>

              <div className="addons-premium-grid">
                {ADD_ON_ITEMS.map((key) => (
                  <div
                    key={key}
                    className={`addon-premium-tile ${
                      formData.addOns[key] ? 'active' : ''
                    }`}
                    onClick={() => handleToggleAddOn(key)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '12px 16px'
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={formData.addOns[key]}
                      readOnly
                    />

                    <span
                      className="addon-tile-name"
                      style={{
                        textTransform: 'capitalize',
                        fontWeight: '600'
                      }}
                    >
                      {key.replace(/([A-Z])/g, ' $1')}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* Extra Work Notice Box rendering all points */}
            <div
              style={{
                marginTop: '15px',
                padding: '15px',
                background: '#fff8f8',
                border: '1px dashed #cc1b1b',
                borderRadius: '8px'
              }}
            >
              <h4
                style={{
                  margin: '0 0 10px 0',
                  color: 'var(--brand-red)',
                  fontSize: '14px',
                  fontWeight: '700'
                }}
              >
                ⚠️ EXTRA WORK — CHARGED SEPARATELY
              </h4>

              <ol
                style={{
                  paddingLeft: '18px',
                  margin: 0,
                  fontSize: '12px',
                  color: '#555',
                  lineHeight: '1.6'
                }}
              >
                {(EXTRA_WORK_ITEMS || []).map((item, index) => (
                  <li
                    key={index}
                    style={{ marginBottom: '4px' }}
                  >
                    {item.replace(/^\d+\.\s*/, '')}
                  </li>
                ))}
              </ol>
            </div>
          </section>

        </div>

        {/* Right Sidebar Cost Summary Panel */}
        <div className="summary-sidebar-column">
          <div className="premium-sticky-sidebar">
            <div className="sidebar-header-branding">
              Your Estimate Summary <span>📋</span>
            </div>

            <div className="sidebar-metrics-list">
              <div className="metric-item">
                <span>🏞️ Plot Area</span>
                <span>{formData.plotArea ? `${formData.plotArea} sq.ft` : '—'}</span>
              </div>

              <div className="metric-item">
                <span>🪜 Structure</span>
                <span>{formData.numFloors}</span>
              </div>

              <div className="metric-item">
                <span>🏢 Property Type</span>
                <span>{formData.propertyDetails}</span>
              </div>

              <div
                className="metric-item"
                style={{
                  borderTop: '1px dashed var(--border-color)',
                  paddingTop: '8px',
                  marginTop: '4px'
                }}
              >
                <span style={{
                  color: 'var(--brand-red)',
                  fontWeight: '700'
                }}>
                  📐 Total Built-Up Area
                </span>

                <span style={{
                  color: 'var(--brand-red)',
                  fontWeight: '700'
                }}>
                  {formData.totalBuiltUpArea
                    ? `${formData.totalBuiltUpArea} sq.ft`
                    : '—'}
                </span>
              </div>

              <div className="metric-item">
                <span>📍 Location</span>
                <span>{formData.location || '—'}</span>
              </div>

              <div className="metric-item">
                <span>📦 Package</span>
                <span>{currentPackage.name}</span>
              </div>

              <div className="metric-item">
                <span>✨ Finish Tier</span>
                <span>{activeQualityData.name}</span>
              </div>
            </div>

            <h4 className="sidebar-sub-heading">Cost Calculation</h4>

            <div className="sidebar-breakdown-table">
              <div
                className="breakdown-row"
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '12px',
                  alignItems: 'center'
                }}
              >
                <span>
                  Base ({formData.totalBuiltUpArea || 0} sq.ft × ₹{selectedRate}/sq.ft)
                </span>

                <span style={{
                  fontWeight: '700',
                  color: '#2c3e50'
                }}>
                  {formatCurrency(summary.baseCost)}
                </span>
              </div>
            </div>

           <div
              className="sidebar-total-block-fixed"
              style={{ marginTop: '15px' }}
            >
              <div className="total-label">Estimated Total Price</div>

              <div className="total-val-fixed">
                {formatCurrency(summary.totalCost)}{' '}
                <span className="approx-tag">(approx.)</span>
              </div>

              <div
                style={{
                  fontSize: '11px',
                  color: '#666',
                  marginTop: '6px',
                  lineHeight: '1.3'
                }}
              >
                * GST, Plan Approvals & extra charges as per government/market rates applicable.
              </div>
            </div>

            <button
              type="button"
              onClick={() => handleDownloadPDF(false)}
              disabled={isGeneratingPdf}
              className="sidebar-action-red-btn"
              style={{
                backgroundColor: isGeneratingPdf
                  ? '#95a5a6'
                  : 'var(--brand-red)',
                cursor: isGeneratingPdf
                  ? 'not-allowed'
                  : 'pointer',
                marginTop: '15px'
              }}
            >
              {isGeneratingPdf
                ? 'Generating PDF...'
                : 'Download Estimate PDF'}
            </button>
          </div>
        </div>

      </div>
          {/* PDF Download Success Popup */}
      {showDownloadSuccess && (
        <div
          className="pdf-success-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="pdf-success-title"
        >
          <div className="pdf-success-modal">
            <div className="pdf-success-icon">
              ✓
            </div>

            <h2 id="pdf-success-title">
              PDF Downloaded Successfully!
            </h2>

            <p>
              Your BuildSmart365 construction estimate has been
              generated, and the download has been initiated.
            </p>

            <button
              type="button"
              className="pdf-success-continue"
              onClick={() => setShowDownloadSuccess(false)}
            >
              Continue
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
