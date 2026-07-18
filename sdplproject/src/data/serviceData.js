import approval from "../assets/services/approval.png";
import structural from "../assets/services/structural.png";
import layout from "../assets/services/layout.png";
import plan from "../assets/services/plan.png";
import elevation from "../assets/services/elevation.png";
import civil from "../assets/services/civil.png";
import interior from "../assets/services/interior.png";

export const services = [
 {
    id: "civil-construction",
    number: "01",
    title: "", // Removed "PREMIUM GRADE" completely
    highlight: "CONSTRUCTION",
    image: civil,
    reverse: false,
    description:
      "From foundational groundwork to structural completion, we deliver premium-grade engineering and robust civil construction services engineered for durability.",
    points: [
      "Civil Construction",
      "Residential & Commercial Construction",
      "End-to-End Project Engineering Management",
      "Premium Material Sourcing & Execution",
    ],
  },
  {
    id: "interior-design",
    number: "02",
    title: "",
    highlight: "INTERIOR DESIGN",
    image: interior,
    reverse: true, // Image on the right side
    description:
      "Transform your spaces with bespoke structural design plans, curated palettes, and space planning metrics optimized to marry elegance with practical utility.",
    points: [
      "Bespoke Spatial Layouts & Space Planning",
      "Curated Material & Color Palette Advisories",
      "Custom Furniture & Structural Fixture Placements",
      "Ergonomic Space Optimization Configurations",
    ],
  },

  {
    id: "building-approvals",
    number: "03",
    title: "",
    highlight: "BUILDING APPROVALS",
    image: approval,
    reverse: false,
    description:
      "We handle all statutory approvals from authorities ensuring your project starts on the right note with complete compliance.",
    points: [
      "Municipality Approval",
      "Panchayat Approval",
      "Development Authority Approval",
      "Fire & Safety Approval",
    ],
  },

  {
    id: "structural-design",
    number: "04",
    title: "",
    highlight: "STRUCTURAL DESIGN",
    image: structural,
    reverse: true,
    description:
      "Safe, stable and cost-effective structural solutions designed by expert engineers using advanced technology.",
    points: [
      "RCC Structural Design",
      "Steel Structural Design",
      "Foundation Design",
      "Retrofitting & Strengthening",
    ],
  },

  {
    id: "layout-ideas",
    number: "05",
    title: "",
    highlight: "LAYOUT IDEAS",
    image: layout,
    reverse: false,
    description:
      "Smart and well-planned layouts that maximize space utilization and enhance overall value.",
    points: [
      "Residential Layouts",
      "Commercial Layouts",
      "Industrial Layouts",
      "Township Layouts",
    ],
  },

  {
    id: "plan-approval",
    number: "06",
    title: "",
    highlight: "PLAN APPROVAL",
    image: plan,
    reverse: true,
    description:
      "We prepare and submit accurate building plans for quick approvals, saving your valuable time.",
    points: [
      "Building Plan Approval",
      "Working Drawing",
      "Land Use Approval",
      "Plan Sanction",
    ],
  },

  {
    id: "elevation-3d",
    number: "07",
    title: "",
    highlight: "ELEVATION, 3D MODEL & VIDEOS",
    image: elevation,
    reverse: false,
    description:
      "Bring your dream project to life with realistic elevations, immersive walkthroughs and detailed 3D models.",
    points: [
      "2D Elevations",
      "3D Exterior Design",
      "3D Interior Design",
      "Walkthrough Videos",
    ],
  },
];