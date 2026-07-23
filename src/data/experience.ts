export interface Experience {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  description: string[];
  techStack: string[];
}

export const experiences: Experience[] = [
  {
    id: "rivo-careers",
    role: "Technical Operations Assistant",
    company: "Rivo Careers",
    location: "Kitchener, ON",
    period: "Jan 2026 – Present",
    description: [
      "Tested and validated workflow configurations for an AI-integrated platform to optimize usability and system performance.",
      "Diagnosed and documented software errors in client flows, coordinating with developers to ensure quick resolution of issues.",
      "Collaborated with project managers to refine internal data tracking pipelines and improve overall database entry speed."
    ],
    techStack: ["Quality Assurance", "Technical Troubleshooting", "System Testing", "Data Workflows", "Debugging"]
  },
  {
    id: "canada-fire-chimney",
    role: "Fire Protection Systems Technician",
    company: "Canada Fire Chimney System",
    location: "Kitchener, ON",
    period: "Jun 2025 – Apr 2026",
    description: [
      "Inspected and certified commercial fire suppression layouts in accordance with safety codes and safety standards.",
      "Diagnosed mechanical and electrical faults in safety circuitry using multimeters and circuit diagrams to perform system repairs.",
      "Authored technical service logs and safety reports, ensuring compliance documentation was completed on schedule."
    ],
    techStack: ["Compliance Inspections", "Mechanical Systems", "Electrical Diagnostics", "Safety Standards", "Troubleshooting"]
  },
  {
    id: "first-robotics",
    role: "STEM Program Assistant (Volunteer)",
    company: "FIRST Robotics Waterloo Region",
    location: "Kitchener, ON",
    period: "Jun 2025 – Sept 2025",
    description: [
      "Instructed student groups on Arduino microcontroller setups, including sensor integration and basic PWM motor controls.",
      "Troubleshot hardware interfacing issues and UART/I2C communication signals during team build workshops.",
      "Mentored workshop groups on applying the engineering design process to build, test, and optimize tracked robot chassis."
    ],
    techStack: ["Arduino Systems", "STEM Mentorship", "Robotics Interfacing", "Electrical Circuits", "Problem Solving"]
  }
];
