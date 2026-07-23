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
      "Tested and validated workflow configurations for an internship platform to optimize usability and system response.",
      "Diagnosed functional bugs in user workflows and documented issues to facilitate quick developer resolutions.",
      "Optimized internal data tracking pipelines to increase data processing efficiency."
    ],
    techStack: ["Quality Assurance", "Technical Troubleshooting", "System Testing", "Data Workflows", "Debugging"]
  },
  {
    id: "canada-fire-chimney",
    role: "Fire Protection Systems Technician",
    company: "Canada Fire Chimney System",
    location: "Kitchener, ON",
    period: "Jun 2025 – Apr 2026",
    classification: "Technical Experience",
    description: [
      "Inspected and certified commercial fire suppression systems to verify compliance with local safety codes.",
      "Diagnosed mechanical and electrical faults in control circuits using multimeters and schematic diagrams to complete system repairs.",
      "Generated detailed technical logs and compliance reports to maintain structured safety documentation."
    ],
    techStack: ["Compliance Inspections", "Mechanical Systems", "Electrical Diagnostics", "Safety Standards", "Troubleshooting"]
  },
  {
    id: "first-robotics",
    role: "STEM Program Assistant (Volunteer)",
    company: "FIRST Robotics Waterloo Region",
    location: "Kitchener, ON",
    period: "Jun 2025 – Sept 2025",
    classification: "Volunteer Experience",
    description: [
      "Instructed students on Arduino configurations, sensor integration, and PWM motor controllers.",
      "Troubleshot hardware interfacing faults and UART/I2C communication signals in prototype circuits.",
      "Mentored workshop groups on applying the engineering design cycle to construct and test mobile robot chassis."
    ],
    techStack: ["Arduino Systems", "STEM Mentorship", "Robotics Interfacing", "Electrical Circuits", "Problem Solving"]
  }
];
