import ongoingpic3 from "../assets/projects/ongoingpic3.jpeg";
import ongoingpic2 from "../assets/projects/ongoingpic2.jpeg";
import ongoingpic1 from "../assets/projects/ongoingpic1.jpeg";
import ongoingpic4 from "../assets/projects/ongoingpic4.jpeg";
import completedpic1 from "../assets/projects/completedpic1.jpeg";
import completedpic2 from "../assets/projects/completedpic2.jpeg";
import completedpic3 from "../assets/projects/completedpic3.jpeg";
import completedpic4 from "../assets/projects/completedpic4.jpeg";
import completedpic5 from "../assets/projects/completedpic5.jpeg";
import completedpic6 from "../assets/projects/completedpic6.jpeg";
// import project5 from "../assets/projects/project5.jpg";
// import project6 from "../assets/projects/project6.jpg";

const projects = [
  {
    id: 1,
    slug: "trisulia",
    title: "Project At Trisulia",
    category: "ongoing",
    location: "Cuttack",
    image: ongoingpic3,
    progress: 30,
    description: "Premium residential apartments."
  },
  {
    id: 2,
    slug: "madanpur",
    title: "Project At Madanpur",
    category: "ongoing",
    location: "Bhubaneswar",
    image: ongoingpic2,
    progress: 20,
    description: "Modern family apartments."
  },
  {
    id: 3,
    slug: "core-house",
    title: "Core House Project",
    category: "ongoing",
    location: "Madanpur, Bhubaneswar",
    image: ongoingpic4,
    progress: 75,
    description: "Successfully delivered."
  },
  {
    id: 4,
    slug: "Tamando",
    title: "Project At Tamando",
    category: "ongoing",
    location: "Bhubaneswar",
    image: ongoingpic1,
    progress: 40,
    description: "Premium residential apartments."
  },
  {
    id: 5,
    slug: "triplex",
    title: "Triplex Project",
    category: "upcoming",
    location: "Hanspal, Bhubaneswar",
    // image: project5,
    progress: 0,
    description: "Launching soon."
  },
   {
    id: 6,
    slug: "triplex",
    title: "Triplex Project",
    category: "upcoming",
    location: "Kashipur, Khorda",
    // image: project5,
    progress: 0,
    description: "Launching soon."
  },
   {
    id: 7,
    slug: "independent",
    title: "Independent S+3 Project",
    category: "upcoming",
    location: "Patrapada, Bhubaneswar",
    // image: project5,
    progress: 0,
    description: "Launching soon."
  },
  {
    id: 8,
    slug: "independent",
    title: "Independent S+4 Project",
    category: "upcoming",
    location: "Raghunathpur, Bhubaneswar",
    // image: project6,
    progress: 0,
    description: "Launching soon."
  },

  {
    id: 9,
    slug: "ready-to-move",
    title: "Ready To Move Project",
    category: "completed",
    location: "Sundarpada, Bhubaneswar",
    image: completedpic1,
    progress: 100,
    description: "Successfully delivered."
  },
  {
    id: 10,
    slug: "completed-house-hanspal",
    title: "Complete House Project",
    category: "completed",
    location: "Hanspal, Bhubaneswar",
    image: completedpic2,
    progress: 100,
    description: "Premium gated community."
  },
  {
    id: 11,
    slug: "complete-house-malipada",
    title: "Complete House Project",
    category: "completed",
    location: "Malipada, Bhubaneswar",
    image: completedpic3,
    progress: 100,
    description: "Premium gated community."
  },
  {
    id: 12,
    slug: "complete-house-fulnakhara",
    title: "Complete House Project",
    category: "completed",
    location: "Fulnakhara, Bhubaneswar",
    image: completedpic4,
    progress: 100,
    description: "Premium gated community."
  },
  {
    id: 13,
    slug: "complete-house-tamando",
    title: "Complete House Project",
    category: "completed",
    location: "Tamando, Bhubaneswar",
    image: completedpic5,
    progress: 100,
    description: "Premium gated community."
  },

  {
    id: 14,
    slug: "complete-house-tamando",
    title: "Complete House Project",
    category: "completed",
    location: "Bhagwanpur, Bhubaneswar",
    image: completedpic6,
    progress: 100,
    description: "Premium gated community."
  }
];

export default projects;