export interface SkillItem {
  name: string;
}

export interface SkillCategory {
  title: string;
  items: SkillItem[];
}

export const skillCategories: SkillCategory[] = [
  {
    title: "Programming Languages",
    items: [
      { name: "C" },
      { name: "C++" },
      { name: "Java" },
      { name: "Python" },
      { name: "SQL (PostgreSQL, Oracle, MySQL)" },
      { name: "Object-Oriented Programming (OOP)" }
    ]
  },
  {
    title: "Development Tools",
    items: [
      { name: "Git/GitHub" },
      { name: "Visual Studio Code" },
      { name: "Eclipse" },
      { name: "IntelliJ IDEA" }
    ]
  },
  {
    title: "Engineering & Design Software",
    items: [
      { name: "SolidWorks" },
      { name: "AutoCAD" },
      { name: "Microsoft Excel" },
      { name: "Word" },
      { name: "PowerPoint" },
      { name: "Microsoft 365" }
    ]
  },
  {
    title: "Technical Skills",
    items: [
      { name: "Arduino systems" },
      { name: "hardware integration" },
      { name: "debugging" },
      { name: "testing" },
      { name: "data analysis" },
      { name: "control systems" },
      { name: "CAD modeling" }
    ]
  },
  {
    title: "Professional Skills",
    items: [
      { name: "Strong analytical and problem-solving abilities" },
      { name: "effective written and verbal communication" },
      { name: "teamwork" },
      { name: "adaptability" },
      { name: "and proactive attitude" }
    ]
  }
];
