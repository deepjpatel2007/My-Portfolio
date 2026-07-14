export interface Award {
  title: string;
  issuer: string;
  date: string;
  description: string;
  credentialUrl?: string; // Single credential link fallback
  credentials?: { label: string; url: string }[]; // Support for multiple links
  category: 'honour' | 'certification';
}

export const awards: Award[] = [
  // Academic & Exhibition Honours
  {
    title: "Dean's Honours List Recipient",
    issuer: "University of Guelph",
    date: "Fall 2025 & Winter 2026",
    description: "Maintained a perfect academic standing (GPA 4.0/4.0) during consecutive semesters of the Computer Engineering degree program.",
    category: "honour",
    credentials: [
      { label: "VIEW FALL 2025", url: "https://drive.google.com/file/d/1ar6jYh7LDpUH7YOvJCgDXIntAQkPW0rk/view?usp=sharing" },
      { label: "VIEW WINTER 2026", url: "https://drive.google.com/file/d/1hGlEm5UFTQSLqd4Av0BQjxGbGsU0MXKr/view?usp=sharing" }
    ]
  },
  {
    title: "1st Place - Guelph Engineering Competition",
    issuer: "University of Guelph",
    date: "Jan 2026",
    description: "Placed 1st in the Guelph Engineering Competition (GEC), designing and prototyping optimized hardware/software solutions under strict time limits.",
    category: "honour"
  },
  {
    title: "2nd Place & Fastest Vehicle Award - Assistive-Mobility-Device-Engineering-Project",
    issuer: "University of Guelph",
    date: "Oct 2025",
    description: "Achieved second place and won the Fastest Vehicle Award in the design exhibition, recognized for SolidWorks CAD design, MPU6050 IMU calibration, and haptic safety watchdog firmware.",
    category: "honour"
  },
  // Professional Certifications
  {
    title: "Google AI Essentials Professional Certificate",
    issuer: "Google",
    date: "Completed Jun 2026",
    description: "Gained core fundamentals in generative AI prompt engineering, AI use cases, and leveraging AI tools to increase productivity and workflow optimization.",
    credentialUrl: "https://drive.google.com/file/d/14ialqZBJ1MJAwec8Xn4pNGPDpO9q4qji/view?usp=sharing",
    category: "certification"
  },
  {
    title: "Cybersecurity Fundamentals",
    issuer: "IBM SkillsBuild",
    date: "Completed Jun 2026",
    description: "Mastered fundamental security concepts, cryptography, access management models, endpoint security, and compliance principles.",
    credentialUrl: "https://drive.google.com/file/d/1zgSRlALdgGpzLyMRyO8FC1yVX1sk04dk/view?usp=sharing",
    category: "certification"
  },
  {
    title: "SQL (Intermediate) Certification",
    issuer: "HackerRank",
    date: "Completed May 2026",
    description: "Certified proficiency in intermediate relational database concepts, including advanced joins, subqueries, unions, and aggregate logic.",
    credentialUrl: "https://drive.google.com/file/d/1mbJ9tOybfP5hjBK216agIToHGwOxORLU/view?usp=sharing",
    category: "certification"
  },
  {
    title: "Cloud Computing Fundamentals Credential",
    issuer: "IBM SkillsBuild",
    date: "Completed May 2026",
    description: "Mastered fundamental cloud models (IaaS, PaaS, SaaS), cloud architectures, deployment strategies, and virtualization technologies.",
    credentialUrl: "https://drive.google.com/file/d/10sbGmjadVj7-akjmXYwWlAJXaMvMPRs0/view?usp=sharing",
    category: "certification"
  }
];
