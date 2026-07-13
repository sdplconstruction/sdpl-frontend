import approval from "../assets/services/approval.png";
import structural from "../assets/services/structural.png";
import layout from "../assets/services/layout.png";
import plan from "../assets/services/plan.png";
import elevation from "../assets/services/elevation.png";
export const services = [
  {
    id: "building-approvals",
    number: "01",
    title: "ALL TYPES OF",
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
    number: "02",
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
    number: "03",
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
    number: "04",
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
    number: "05",
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