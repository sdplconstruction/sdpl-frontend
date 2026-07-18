import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import html2pdf from 'html2pdf.js';
import { CALCULATION_RATES, ADD_ON_PRICES } from '../data/rates';
import './BudgetPlanner.css';

// Import local assets securely
import coreImg from '../assets/core.jpg';
import lockKeyImg from '../assets/lockkey.jpg';
import semiFurnishedImg from '../assets/semifurnished.jpg';
import fullyFurnishedImg from '../assets/fullyfurnished.jpg';

// Google Apps Script Web App URL
const GOOGLE_SHEETS_API_URL = "https://script.google.com/macros/s/AKfycbx4dtk2FPhdIUatBkeg8_oVfra6BAQPk-SG9tA7saog6zqAUZX7HfxBjUP89aA1-GBl/exec";

const ODISHA_DISTRICTS = [
  "Angul", "Balangir", "Balasore", "Bargarh", "Bhadrak", "Baudh", "Cuttack",
  "Deogarh", "Dhenkanal", "Gajapati", "Ganjam", "Jagatsinghpur", "Jajpur",
  "Jharsuguda", "Kalahandi", "Kandhamal", "Kendrapara", "Kendujhar", "Khordha (Bhubaneswar)",
  "Koraput", "Malkangiri", "Mayurbhanj", "Nabarangpur", "Nayagarh", "Nuapada",
  "Puri", "Rayagada", "Sambalpur", "Subarnapur", "Sundargarh"
];

const FLOOR_OPTIONS = [
  "G",
  ...Array.from({ length: 20 }, (_, i) => `G+${i + 1}`),
  "S+2", "S+3", "S+4",
  "B+S+G+1", "B+S+G+2", "B+S+G+3", "B+S+G+4", "B+S+G+5", "B+S+G+6", "B+S+G+7"
];

const PACKAGE_DETAILS = {
  coreHouse: {
    name: "Core House",
    desc: "Structure Only (Gray Structure)",
    range: "₹1,200 - ₹1,450",
    img: coreImg,
    inclusions: ["Site Layout & Excavation", "PCC, Foundation & Plinth Beam", "RCC Columns, Beams & Slab", "Brick/Block Masonry", "Electrical Conduits & Drainage Pipes"]
  },
  lockAndKey: {
    name: "Lock & Key",
    desc: "Standard Ready to Move",
    range: "₹1,700 - ₹2,500",
    img: lockKeyImg,
    inclusions: ["Complete Gray Structure", "Roof Waterproofing & Plastering", "Ceramic/Vitrified Flooring", "Flush Doors & Aluminium Windows", "Interior/Exterior Painting"]
  },
  semiFurnished: {
    name: "Semi Furnished",
    desc: "Premium Finish + Modular Kitchen",
    range: "₹2,100 - ₹3,000",
    img: semiFurnishedImg,
    inclusions: ["Everything in Lock & Key", "Granite Kitchen Counter & Sink", "Modular Kitchen Woodwork", "Premium Wardrobes & TV Unit", "Selected Area False Ceilings"]
  },
  fullyFurnished: {
    name: "Fully Furnished",
    desc: "Luxury Finish + Complete Furniture & Appliances",
    range: "₹2,800 - ₹4,200",
    img: fullyFurnishedImg,
    inclusions: ["Everything in Semi-Furnished", "Complete House Designer False Ceiling", "Luxury Sofa Set, Beds & Dining Table", "Television, Fridge & Air Conditioner", "Decorative Chandeliers & Curtains"]
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
  const plannerRef = useRef(null);
  const locationDropdownRef = useRef(null);
  const floorDropdownRef = useRef(null);

  useEffect(() => {
    if (import.meta.env.DEV) return;
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [navigate]);

  const [formData, setFormData] = useState({
    mobile: '',
    area: '',
    location: '',
    buildingType: 'Residential',
    numFloors: 'G',
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

  const [summary, setSummary] = useState({ baseCost: 0, addOnsCost: 0, otherCharges: 0, totalCost: 0 });
  const [totalBuiltUpArea, setTotalBuiltUpArea] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [isFloorOpen, setIsFloorOpen] = useState(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    function handleClickOutside(event) {
      if (locationDropdownRef.current && !locationDropdownRef.current.contains(event.target)) {
        setIsLocationOpen(false);
      }
      if (floorDropdownRef.current && !floorDropdownRef.current.contains(event.target)) {
        setIsFloorOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Structural dynamic calculations
  useEffect(() => {
    const baseRatePerSqFt = CALCULATION_RATES[formData.packageType]?.[formData.qualityTier] || 2100;
    const selectedFloorString = formData.numFloors;

    let totalFloorsCount = 1;

    if (selectedFloorString && selectedFloorString.startsWith('B+S+G+')) {
      const upperFloorsCount = parseInt(selectedFloorString.replace('B+S+G+', ''), 10) || 1;
      totalFloorsCount = 3 + upperFloorsCount;
    } else if (selectedFloorString && selectedFloorString.startsWith('S+')) {
      const upperFloorsCount = parseInt(selectedFloorString.replace('S+', ''), 10) || 2;
      totalFloorsCount = 1 + upperFloorsCount;
    } else if (selectedFloorString && selectedFloorString.startsWith('G+')) {
      const upperFloorsCount = parseInt(selectedFloorString.replace('G+', ''), 10) || 1;
      totalFloorsCount = 1 + upperFloorsCount;
    }

    let heightMultiplierAdjustment = 1.0;
    if (selectedFloorString && selectedFloorString.startsWith('G+')) {
      const upperCount = parseInt(selectedFloorString.replace('G+', ''), 10) || 1;
      if (upperCount > 3) {
        heightMultiplierAdjustment += (upperCount - 3) * 0.03;
      }
    }

    const inputArea = Number(formData.area || 0);
    const calculatedTotalArea = inputArea * totalFloorsCount;
    setTotalBuiltUpArea(calculatedTotalArea);

    const baseCost = calculatedTotalArea * baseRatePerSqFt * heightMultiplierAdjustment;

    let addOnsCost = 0;
    Object.keys(formData.addOns).forEach((key) => {
      if (formData.addOns[key]) {
        addOnsCost += ADD_ON_PRICES[key] || 0;
      }
    });

    const otherCharges = Math.round(baseCost * 0.101);

    setSummary({
      baseCost,
      addOnsCost,
      otherCharges,
      totalCost: baseCost + addOnsCost + otherCharges
    });
  }, [formData]);

  // Lead Auto-Save Mechanism
  useEffect(() => {
    const mobileRegex = /^[6-9]\d{9}$/;
    const isRepeatingDigits = /^(\d)\1{9}$/.test(formData.mobile);

    if (mobileRegex.test(formData.mobile) && !isRepeatingDigits && formData.area) {
      const delaySave = setTimeout(() => {
        saveDataToGoogleSheets();
      }, 2000);

      return () => clearTimeout(delaySave);
    }
  }, [formData]);

  const saveDataToGoogleSheets = async () => {
    if (!GOOGLE_SHEETS_API_URL || GOOGLE_SHEETS_API_URL.includes("YOUR_GOOGLE_APPS_SCRIPT")) {
      console.warn("Google Sheet Web App URL is not configured.");
      return;
    }

    const activeAddOnsList = Object.keys(formData.addOns)
      .filter(key => formData.addOns[key])
      .map(key => key.replace(/([A-Z])/g, ' $1'))
      .join(', ');

    const payload = {
      mobile: formData.mobile,
      area: formData.area,
      location: formData.location,
      buildingType: formData.buildingType,
      numFloors: formData.numFloors,
      packageType: PACKAGE_DETAILS[formData.packageType].name,
      qualityTier: QUALITY_TIERS[formData.qualityTier].name,
      addOns: activeAddOnsList || "None",
      totalCost: summary.totalCost
    };

    try {
      await fetch(GOOGLE_SHEETS_API_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });
      console.log("Lead captured!");
    } catch (error) {
      console.error("Error logging to Google Sheets:", error);
    }
  };

  const handleInputChange = (e) => setFormData({ ...formData, area: e.target.value });
  const handleMobileChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 10) {
      setFormData({ ...formData, mobile: value });
      if (value.length === 10) {
        const isRepeatingDigits = /^(\d)\1{9}$/.test(value);
        const mobileRegex = /^[6-9]\d{9}$/;
        if (!mobileRegex.test(value) || isRepeatingDigits) {
          setError("Please enter a valid 10-digit mobile number.");
        } else {
          setError("");
        }
      } else {
        setError("");
      }
    }
  };

  const handleSelect = (field, value) => setFormData({ ...formData, [field]: value });

  const handleToggleAddOn = (key) => {
    setFormData({
      ...formData,
      addOns: { ...formData.addOns, [key]: !formData.addOns[key] }
    });
  };

  const formatCurrency = (num) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(num);
  };

  const filteredDistricts = ODISHA_DISTRICTS.filter(d => d.toLowerCase().includes(searchQuery.toLowerCase()));
  const currentPackage = PACKAGE_DETAILS[formData.packageType];
  const activeQualityData = QUALITY_TIERS[formData.qualityTier];

  const handleDownloadPDF = async () => {
    const mobileRegex = /^[6-9]\d{9}$/;
    const isRepeatingDigits = /^(\d)\1{9}$/.test(formData.mobile);

    if (!formData.mobile || !mobileRegex.test(formData.mobile) || isRepeatingDigits) {
      setError("Please enter a valid 10-digit mobile number.");
      alert("Please enter a valid 10-digit mobile number to download your estimate.");
      return;
    }

    setError("");
    await saveDataToGoogleSheets();
    setIsGeneratingPdf(true);

    const activeAddOnsList = Object.keys(formData.addOns)
      .filter(key => formData.addOns[key])
      .map(key => key.replace(/([A-Z])/g, ' $1'));

    const element = document.createElement('div');
    element.innerHTML = `
      <div style="font-family: 'Segoe UI', Helvetica, Arial, sans-serif; padding: 40px; color: #2c3e50; background-color: #fff;">
        <div style="border-bottom: 2px solid #cc1b1b; padding-bottom: 20px; margin-bottom: 30px; display: block; overflow: hidden;">
          <div style="float: left; width: 70%;">
            <h1 style="margin: 0; color: #cc1b1b; font-size: 32px; font-weight: 800; letter-spacing: -0.5px;">SDPL CONSTRUCTION</h1>
            <p style="margin: 5px 0 0 0; color: #34495e; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Dream Home Planner • Cost Estimation Summary</p>
          </div>
          <div style="float: right; width: 30%; text-align: right; margin-top: 10px;">
            <div style="font-size: 12px; color: #7f8c8d;">Report Date</div>
            <div style="font-size: 14px; font-weight: 600; color: #111;">${new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</div>
          </div>
          <div style="clear: both;"></div>
        </div>

        <div style="margin-bottom: 35px; background-color: #f8f9fa; border-radius: 8px; padding: 20px; page-break-inside: avoid;">
          <h3 style="margin: 0 0 15px 0; font-size: 14px; color: #cc1b1b; text-transform: uppercase; letter-spacing: 0.5px;">Project Parameters</h3>
          <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
            <tr>
              <td style="padding: 6px 0; color: #7f8c8d; width: 25%;">Base Layout Area:</td>
              <td style="padding: 6px 0; font-weight: 600; color: #111; width: 25%;">${formData.area || '—'} sq.ft</td>
              <td style="padding: 6px 0; color: #7f8c8d; width: 25%;">Total Built-up Area:</td>
              <td style="padding: 6px 0; font-weight: 700; color: #cc1b1b; width: 25%;">${totalBuiltUpArea ? `${totalBuiltUpArea} sq.ft` : '—'}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #7f8c8d;">Structure Matrix:</td>
              <td style="padding: 6px 0; font-weight: 600; color: #111;">${formData.numFloors ? (formData.numFloors === 'G' ? 'Ground Floor Only' : formData.numFloors) : '—'}</td>
              <td style="padding: 6px 0; color: #7f8c8d;">Building Type:</td>
              <td style="padding: 6px 0; font-weight: 600; color: #111;">${formData.buildingType}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #7f8c8d;">Selected Package:</td>
              <td style="padding: 6px 0; font-weight: 600; color: #cc1b1b;">${currentPackage.name}</td>
              <td style="padding: 6px 0; color: #7f8c8d;">Site Location:</td>
              <td style="padding: 6px 0; font-weight: 600; color: #111;">${formData.location || '—'}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #7f8c8d;">Contact Mobile:</td>
              <td style="padding: 6px 0; font-weight: 600; color: #111;">+91 ${formData.mobile}</td>
              <td style="padding: 6px 0; color: #7f8c8d;">Material Tier:</td>
              <td style="padding: 6px 0; font-weight: 600; color: #111;">${activeQualityData.name} Quality</td>
            </tr>
          </table>
        </div>

        ${activeAddOnsList.length > 0 ? `
        <div style="margin-bottom: 35px; page-break-inside: avoid;">
          <h3 style="margin: 0 0 12px 0; font-size: 14px; color: #cc1b1b; text-transform: uppercase; letter-spacing: 0.5px;">Selected Infrastructure Add-ons</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 4px 0; display: block;">
                ${activeAddOnsList.map(item => `
                  <span style="display: inline-block; background-color: #f5f6fa; border: 1px solid #dcdde1; padding: 6px 12px; border-radius: 4px; font-size: 12px; color: #2f3542; font-weight: 500; text-transform: capitalize; margin-right: 8px; margin-bottom: 8px;">
                    + ${item}
                  </span>
                `).join('')}
              </td>
            </tr>
          </table>
        </div>
        ` : ''}

        <div style="margin-top: 40px; margin-bottom: 40px; border-top: 1px dashed #bdc3c7; padding-top: 25px; page-break-inside: avoid;">
          <h3 style="margin: 0 0 15px 0; font-size: 14px; color: #cc1b1b; text-transform: uppercase; letter-spacing: 0.5px;">Estimated Cost Breakdown</h3>
          <table style="width: 55%; margin-left: auto; border-collapse: collapse; font-size: 14px;">
            <tr>
              <td style="padding: 8px 0; color: #7f8c8d; text-align: left;">Base Structure Cost:</td>
              <td style="padding: 8px 0; color: #111; font-weight: 600; text-align: right;">${formatCurrency(summary.baseCost)}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #7f8c8d; text-align: left;">Add-on Amenities:</td>
              <td style="padding: 8px 0; color: #111; font-weight: 600; text-align: right;">${formatCurrency(summary.addOnsCost)}</td>
            </tr>
            <tr style="border-bottom: 1px solid #e0e0e0;">
              <td style="padding: 8px 0; color: #7f8c8d; text-align: left; padding-bottom: 15px;">Regulatory & Custom Overheads:</td>
              <td style="padding: 8px 0; color: #111; font-weight: 600; text-align: right; padding-bottom: 15px;">${formatCurrency(summary.otherCharges)}</td>
            </tr>
            <tr>
              <td style="padding: 20px 0 10px 0; color: #cc1b1b; font-weight: 800; font-size: 16px; text-align: left;">Total Estimated Budget:</td>
              <td style="padding: 20px 0 10px 0; color: #cc1b1b; font-weight: 800; font-size: 24px; text-align: right; line-height: 1.5 !important; vertical-align: middle;">
                <span style="display: inline-block; padding-bottom: 8px;">${formatCurrency(summary.totalCost)}</span>
              </td>
            </tr>
          </table>
        </div>

        <div style="border-top: 1px solid #e0e0e0; padding-top: 15px; margin-top: 40px; text-align: center; font-size: 11px; color: #95a5a6; line-height: 1.6; page-break-inside: avoid;">
          <strong>Disclaimer Note:</strong> This assessment presents a structural estimate computed via localized material valuation parameters for structural engineering guidelines inside the Odisha framework. Definitive on-site procurement charges may scale marginally subject to real-time supply chain fluctuations.
        </div>
      </div>
    `;

    const options = {
      margin: [12, 12, 12, 12],
      filename: `SDPL_Estimate_${formData.location ? formData.location.split(' ')[0] : 'Plan'}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2pdf: { scale: 2, useCORS: true, letterRendering: true, scrollY: 0 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    document.fonts.ready.then(() => {
      html2pdf().from(element).set(options).output('bloburl').then((blobUrl) => {
        window.open(blobUrl, '_blank');
        setIsGeneratingPdf(false);
      }).catch((err) => {
        console.error(err);
        setIsGeneratingPdf(false);
      });
    });
  };

  const getFloorDropdownLabel = (floorValue) => {
    if (!floorValue) return 'Select number of floors';
    if (floorValue === 'G') return 'Ground Floor Only (G)';
    if (floorValue.startsWith('S+')) return `Stilt + ${floorValue.replace('S+', '')} Floors`;
    if (floorValue.startsWith('B+S+G+')) return `Basement + Stilt + G + ${floorValue.replace('B+S+G+', '')} Floors`;
    return `${floorValue} Floors`;
  };

  const handleContactRedirect = () => {
    window.location.href = '/contact-us';
  };

  return (
    <div className="planner-wrapper" ref={plannerRef}>
      <header className="planner-main-header">
        <div className="header-left">
          {/* ADD THIS BUTTON */}
    <button
      className="home-nav-btn"
      onClick={() => navigate("/")}
      style={{ background: 'none', border: 'none', cursor: 'pointer', marginBottom: '10px', color: '#666', fontSize: '14px' }}
    >
      ← Back to Home
    </button>
          <h1>Dream2Home <span>Calculator</span></h1>
          <p>Get your estimated construction cost instantly</p>
        </div>
        <div className="header-right-badge">
          <div className="badge-text">Estimated Budget</div>
          <div className="badge-amount">{formatCurrency(summary.totalCost)}</div>
          <div className="badge-status"><span>•</span> Updating automatically</div>
        </div>
      </header>

      <div className="planner-main-grid">
        <div className="options-column">

          {/* Step 1: Project Details */}
          <section className="form-card-section">
            <h2 className="section-step-title"><span>📋</span> 1. Project Details</h2>
            <div className="project-details-row full-clean-dropdowns">

              {/* Mobile Number Input */}
              <div className="input-box-wrapper">
                <label>Mobile Number <span style={{ color: 'var(--brand-red)' }}>*</span></label>
                <div className="input-with-unit">
                  <input
                    type="tel"
                    value={formData.mobile}
                    onChange={handleMobileChange}
                    placeholder="Enter 10-digit Mobile"
                    maxLength={10}
                    style={{ paddingRight: '12px', borderColor: error ? 'var(--brand-red)' : '' }}
                  />
                </div>
                {error && <div style={{ color: 'var(--brand-red)', fontSize: '12px', marginTop: '5px' }}>⚠️ {error}</div>}
              </div>

              {/* Area Input */}
              <div className="input-box-wrapper">
                <label>Base Area (Per Floor)</label>
                <div className="input-with-unit">
                  <input
                    type="number"
                    value={formData.area}
                    onChange={handleInputChange}
                    onKeyDown={(e) => {
                      if (['e', 'E', '+', '-'].includes(e.key)) {
                        e.preventDefault();
                      }
                    }}
                    min="1"
                    placeholder="e.g. 800"
                  />
                  <span className="unit-tag">sq.ft</span>
                </div>
              </div>

              {/* Location Input */}
              <div className="input-box-wrapper" ref={locationDropdownRef}>
                <label>Location (Odisha District)</label>
                <div className="searchable-dropdown-container">
                  <input
                    type="text"
                    placeholder={formData.location || "Type district name..."}
                    value={searchQuery}
                    onChange={(e) => { setSearchQuery(e.target.value); setIsLocationOpen(true); }}
                    onFocus={() => setIsLocationOpen(true)}
                    className="custom-select search-input"
                  />
                  {isLocationOpen && (
                    <div className="dropdown-options-list standard-forced-down">
                      {filteredDistricts.length > 0 ? (
                        filteredDistricts.map(d => (
                          <div key={d} className="dropdown-item-row" onClick={() => { handleSelect('location', d); setSearchQuery(''); setIsLocationOpen(false); }}>
                            {d}
                          </div>
                        ))
                      ) : (
                        <div className="dropdown-no-results-row">
                          <div className="no-location-found">
                            <h4>No Location Found</h4>
                            <p>We couldn't find <strong>"{searchQuery}"</strong>.</p>
                            <small>Please select a district from Odisha.</small>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Building Type Selector */}
              <div className="input-box-wrapper">
                <label>Building Type</label>
                <div className="toggle-tabs">
                  {['Residential', 'Commercial'].map(t => (
                    <button key={t} className={`tab-btn ${formData.buildingType === t ? 'active' : ''}`} onClick={() => handleSelect('buildingType', t)}>
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Number of Floors Selector */}
              <div className="input-box-wrapper" ref={floorDropdownRef}>
                <label>No. of Floors</label>
                <div className="searchable-dropdown-container">
                  <div
                    className="custom-select display-trigger-dropdown"
                    onClick={() => setIsFloorOpen(!isFloorOpen)}
                    style={{ color: formData.numFloors ? 'inherit' : 'var(--text-light)' }}
                  >
                    {getFloorDropdownLabel(formData.numFloors)}
                  </div>
                  {isFloorOpen && (
                    <div className="dropdown-options-list standard-forced-down">
                      {FLOOR_OPTIONS.map(f => (
                        <div key={f} className="dropdown-item-row" onClick={() => { handleSelect('numFloors', f); setIsFloorOpen(false); }}>
                          {getFloorDropdownLabel(f)}
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
            <h2 className="section-step-title"><span>🏗️</span> 2. Construction Package</h2>
            <div className="packages-premium-grid">
              {Object.keys(PACKAGE_DETAILS).map((key) => {
                const pkg = PACKAGE_DETAILS[key];
                return (
                  <div key={key} className={`package-premium-card ${formData.packageType === key ? 'selected' : ''}`} onClick={() => handleSelect('packageType', key)}>
                    {formData.packageType === key && <div className="checked-indicator">✓</div>}
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
            <h2 className="section-step-title"><span>🛡️</span> 3. Building Quality</h2>
            <div className="quality-premium-grid">
              {Object.keys(QUALITY_TIERS).map((key) => {
                const tier = QUALITY_TIERS[key];
                return (
                  <div key={key} className={`quality-premium-card ${formData.qualityTier === key ? 'selected' : ''}`} onClick={() => handleSelect('qualityTier', key)}>
                    {formData.qualityTier === key && <div className="checked-indicator">✓</div>}
                    <h3>{tier.name}</h3>
                    <div className="stars-row">{tier.stars}</div>
                    <p>{tier.desc}</p>
                    <span className="tier-badge">{tier.badge}</span>
                  </div>
                );
              })}
            </div>

            <div className="visual-specifications-box">
              <h4>Scope of Work Included ({currentPackage.name})</h4>
              <div className="specifications-inline-grid">
                {currentPackage.inclusions.map((inc, idx) => (
                  <div key={idx} className="spec-inline-item">
                    <div>
                      <div className="spec-title">{inc}</div>
                      <div className="spec-sub">Standard Protocol Included</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Step 4: Add-On Features */}
          <section className="form-card-section">
            <h2 className="section-step-title"><span>➕</span> 4. Optional Infrastructure Add-Ons (Costs May Vary)</h2>
            <div className="addons-premium-grid">
              {Object.keys(ADD_ON_PRICES).map((key) => (
                <div key={key} className={`addon-premium-tile ${formData.addOns[key] ? 'active' : ''}`} onClick={() => handleToggleAddOn(key)}>
                  <input type="checkbox" checked={formData.addOns[key]} readOnly />
                  <div className="addon-tile-content">
                    <span className="addon-tile-name">{key.replace(/([A-Z])/g, ' $1')}</span>
                    <span className="addon-tile-price">+ {formatCurrency(ADD_ON_PRICES[key])}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right Sticky Sidebar Cost Summary Component Panel */}
        <div className="summary-sidebar-column">
          <div className="premium-sticky-sidebar">
            <div className="sidebar-header-branding">Your Estimate Summary <span>📋</span></div>
            <div className="sidebar-metrics-list">
              <div className="metric-item"><span>📐 Layout Base Area</span><span className="capitalize-text">{formData.area ? `${formData.area} sq.ft` : '—'}</span></div>
              <div className="metric-item"><span>🪜 Structure</span><span className="capitalize-text">{formData.numFloors || '—'}</span></div>
              <div className="metric-item" style={{ borderTop: '1px dashed var(--border-color)', paddingTop: '8px', marginTop: '4px' }}>
                <span style={{ color: 'var(--brand-red)', fontWeight: '700' }}>📐 Total Built Area</span>
                <span style={{ color: 'var(--brand-red)', fontWeight: '700' }}>{totalBuiltUpArea ? `${totalBuiltUpArea} sq.ft` : '—'}</span>
              </div>
              <div className="metric-item"><span>🏢 Type</span><span className="capitalize-text">{formData.buildingType}</span></div>
              <div className="metric-item"><span>📍 Location</span><span className="capitalize-text">{formData.location || '—'}</span></div>
              <div className="metric-item"><span>📦 Package</span><span className="capitalize-text">{currentPackage.name}</span></div>
              <div className="metric-item"><span>✨ Finish Tier</span><span className="capitalize-text">{activeQualityData.name}</span></div>
            </div>

            <h4 className="sidebar-sub-heading">Cost Breakdown</h4>
            <div className="sidebar-breakdown-table">
              <div className="breakdown-row"><span>Base Construction Cost</span><span>{formatCurrency(summary.baseCost)}</span></div>
              <div className="breakdown-row"><span>Add-on Infrastructure</span><span>{formatCurrency(summary.addOnsCost)}</span></div>
              <div className="breakdown-row"><span>Other Charges (Tax/Approval)</span><span>{formatCurrency(summary.otherCharges)}</span></div>
            </div>

            <div className="sidebar-total-block-fixed">
              <div className="total-label">Total Estimated Cost</div>
              <div className="total-val-fixed">{formatCurrency(summary.totalCost)}</div>
              <div className="total-subtext">(Inclusive of custom GST &amp; architectural overheads)</div>
            </div>

            <button
              onClick={handleDownloadPDF}
              disabled={isGeneratingPdf}
              className="sidebar-action-red-btn"
              style={{
                backgroundColor: isGeneratingPdf ? '#95a5a6' : 'var(--brand-red)',
                cursor: isGeneratingPdf ? 'not-allowed' : 'pointer'
              }}
            >
              {isGeneratingPdf ? 'Generating PDF...' : 'Download Estimate PDF'}
            </button>

            {/* <button
              type="button"
              className="sidebar-secondary-contact-btn"
              onClick={handleContactRedirect}
            >
              Speak with an Expert
            </button> */}
          </div>
        </div>

      </div>
    </div>
  );
}