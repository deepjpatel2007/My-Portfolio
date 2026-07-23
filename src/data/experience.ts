export interface Experience {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  description: string[];
  techStack: string[];
  classification: 'Technical Experience' | 'Work Experience' | 'Volunteer Experience' | 'Internship';
}

export const experiences: Experience[] = [
  {
    id: "rivo-careers",
    role: "Technical Operations Assistant",
    company: "Rivo Careers",
    location: "Kitchener, ON",
    period: "Jan 2026 – Present",
    classification: "Technical Experience",
    description: [
      "Supported testing and workflow optimization for an AI-powered internship platform using analytical troubleshooting and digital workflow coordination.",
      "Applied troubleshooting, debugging, and analytical problem-solving skills to improve platform functionality, workflow efficiency, and overall user experience.",
      "Collaborated with team members to support technical operations, ongoing platform development, and organization of digital workflows and documentation."
    ],
    techStack: ["Quality Assurance", "Technical Troubleshooting", "System Testing", "Data Workflows", "Debugging"]
  },
  {
    id: "canada-fire-chimney",
    role: "Fire Protection Systems Technician",
    company: "Canada Fire Chimney System",
    location: "Kitchener, ON",
    period: "Jun 2025 – Apr 2026",
    classification: "Work Experience",
    description: [
      "Conducted inspection, maintenance, and servicing of commercial fire protection and suppression systems in compliance with safety regulations.",
      "Applied troubleshooting and analytical problem-solving skills to support repair and maintenance of mechanical and electrical fire safety equipment.",
      "Collaborated with team members to complete technical service tasks, documentation, and installation projects efficiently and safely."
    ],
    techStack: ["Compliance Inspections", "Mechanical Systems", "Electrical Diagnostics", "Safety Standards", "Troubleshooting"]
  },
  {
    id: "first-robotics",
    role: "STEM Program Assistant",
    company: "FIRST Robotics Waterloo Region",
    location: "Kitchener, ON",
    period: "Jun 2025 – Sept 2025",
    classification: "Volunteer Experience",
    description: [
      "Supported Arduino-based robotics workshops involving sensors, programming, and hardware integration activities.",
      "Troubleshot hardware components and basic electrical systems to support engineering activities.",
      "Communicated technical concepts and problem-solving strategies through hands-on learning environments.",
      "Collaborated with team members to organize workshop activities and maintain structured learning sessions."
    ],
    techStack: ["Arduino Systems", "STEM Mentorship", "Robotics Interfacing", "Electrical Circuits", "Problem Solving"]
  }
];
