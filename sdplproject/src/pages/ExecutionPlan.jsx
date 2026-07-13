import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/executionPlan.css';

// Importing targeted icons for each distinct phase
import {
  FaClipboardList,
  FaFileSignature,
  FaCalculator,
  FaHardHat,
  FaBuilding,
  FaCheckDouble,
  FaFileContract,
  FaKey,
  FaShieldAlt,
  FaArrowRight
} from 'react-icons/fa';

export default function ExecutionPlan() {
  const navigate = useNavigate();

  const workflowPhases = [
    {
      num: "01",
      icon: <FaClipboardList />,
      title: "Project Initiation & Planning",
      items: [
        "Define Project Scope (Type of building, size, functionality, quality level, budget, and timeline)",
        "Feasibility Study (Site suitability, geotechnical soil report, utility availability, and ROI analysis)",
        "Land & Legal Verification (Clear land titles and zoning compliance with local regulations)"
      ]
    },
    {
      num: "02",
      icon: <FaFileSignature />,
      title: "Design & Approvals Phase",
      items: [
        "Appoint Consultants (Architect, Structural Engineer, MEP Engineer, Quantity Surveyor)",
        "Concept Design (Floor plans, elevations, 3D views, and initial cost estimates)",
        "Detailed Design (Structural drawings, electrical/plumbing conduits, HVAC layouts)",
        "Approvals & Permits (Submission for building permits, environmental clearance, and utility approvals)"
      ]
    },
    {
      num: "03",
      icon: <FaCalculator />,
      title: "Budgeting & Tendering",
      items: [
        "Detailed Cost Estimation (Comprehensive Bill of Quantities [BOQ] and material specs)",
        "Contractor Selection (Tender invitation, bid evaluation, negotiation, and contract signing)"
      ]
    },
    {
      num: "04",
      icon: <FaHardHat />,
      title: "Pre-Construction Activities",
      items: [
        "Site Mobilization (Temporary fencing, site office setup, storage, and utility layout)",
        "Setting Out (Marking building footprint layout on ground and running initial level checks)"
      ]
    },
    {
      num: "05",
      icon: <FaBuilding />,
      title: "Construction Phase",
      items: [
        "Substructure Work (Excavation, footings, foundation, plinth beam, and backfilling)",
        "Superstructure Work (Columns, beams, concrete slabs, masonry walls, and staircases)",
        "Roofing & Waterproofing (Roof slab casting, structural protection, and insulation coating)",
        "MEP Rough-ins (Chasing electrical conduits, running plumbing waterlines, HVAC ductwork)",
        "Finishing Works (Plastering, tiling, painting, false ceilings, and window/door installations)",
        "External Works (Compound walls, concrete driveways, drainage networks, and landscaping)"
      ]
    },
    {
      num: "06",
      icon: <FaCheckDouble />,
      title: "Testing & Quality Control",
      items: [
        "Rigorous Inspections (Structural stability checks, plumbing pressure tests, electrical load testing)",
        "Snag List / Punch List (Identifying minor defects for prompt contractor rectification)"
      ]
    },
    {
      num: "07",
      icon: <FaFileContract />,
      title: "Documentation & Compliance",
      items: [
        "Completion Certificates (Obtaining structural stability, fire safety approvals, and the Occupancy Certificate)"
      ]
    },
    {
      num: "08",
      icon: <FaKey />,
      title: "Project Handover",
      items: [
        "Final Deep Cleaning (Post-construction debris clearance and detailing)",
        "As-Built Drawings (Handing over final updated architectural schematics and utility service maps)",
        "Warranties & Manuals (Transferring equipment structural warranties and operational guides)",
        "Final Settlement (Releasing retention funds, signing document handovers, and physical key delivery)"
      ]
    },
    {
      num: "09",
      icon: <FaShieldAlt />,
      title: "Post-Handover Phase",
      items: [
        "Defect Liability Period (Dedicated 6–12 months post-occupancy structural maintenance window)",
        "Final project close-out documentation"
      ]
    }
  ];

  return (
    <>
      

      <main className="execution-plan-view">
        {/* Banner Section */}
        <section className="plan-hero-banner">
          <span className="plan-badge">🏗️ SDPL CONSTRUCTION STRATEGIES</span>
          <h1>Our Project Execution Workflow</h1>
          <p>From foundational concrete pours to the final key handoff, explore our step-by-step engineering roadmap built around precision, safety, and transparency.</p>

          <button
            className="budget-planner-btn"
            onClick={() => navigate('/budget-planner')}
          >
            📊 Open Interactive Budget Planner
          </button>
        </section>

        {/* Workflow Component Matrix */}
        <section className="plan-content-canvas">
          <div className="summary-flow-strip">
            <strong>Simple Workflow Flow:</strong>
            <span>Planning</span> <FaArrowRight className="flow-arrow"/>
            <span>Design</span> <FaArrowRight className="flow-arrow"/>
            <span>Approval</span> <FaArrowRight className="flow-arrow"/>
            <span>Tender</span> <FaArrowRight className="flow-arrow"/>
            <span>Construction</span> <FaArrowRight className="flow-arrow"/>
            <span>Inspection</span> <FaArrowRight className="flow-arrow"/>
            <span>Handover</span>
          </div>

          <div className="phases-vertical-stack">
            {workflowPhases.map((phase) => (
              <div className="phase-card-row" key={phase.num}>

                {/* Visual Icon Box Side */}
                <div className="phase-left-meta">
                  <div className="icon-badge-box">
                    {phase.icon}
                    <span className="mini-num-tag">{phase.num}</span>
                  </div>
                  <h3>{phase.title}</h3>
                </div>

                {/* Content Checklist Side */}
                <div className="phase-center-content">
                  <ul>
                    {phase.items.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>

              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}