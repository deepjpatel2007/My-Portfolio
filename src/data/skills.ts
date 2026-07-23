export interface SkillItem {
  name: string;
  level: string;
  icon: string;
}

export interface SkillCategory {
  title: string;
  items: SkillItem[];
}

export const skillCategories: SkillCategory[] = [
  {
    title: "Programming Languages",
    items: [
      { name: "C", level: "Proficient", icon: "Code" },
      { name: "C++", level: "Proficient", icon: "Code" },
      { name: "Python", level: "Proficient", icon: "Code" },
      { name: "Java", level: "Proficient", icon: "Code" },
      { name: "SQL (PostgreSQL, Oracle, MySQL)", level: "Proficient", icon: "Code" },
      { name: "Object-Oriented Programming (OOP)", level: "Proficient", icon: "Code" }
    ]
  },
  {
    title: "Development Tools",
    items: [
      { name: "Git/GitHub", level: "Experienced", icon: "Terminal" },
      { name: "Visual Studio Code", level: "Experienced", icon: "Terminal" },
      { name: "Eclipse", level: "Experienced", icon: "Terminal" },
      { name: "IntelliJ IDEA", level: "Experienced", icon: "Terminal" }
    ]
  },
  {
    title: "Engineering & Design Software",
    items: [
      { name: "SolidWorks", level: "Proficient", icon: "Layers" },
      { name: "AutoCAD", level: "Proficient", icon: "Layers" },
      { name: "Microsoft Excel", level: "Proficient", icon: "Layers" },
      { name: "Microsoft Word", level: "Proficient", icon: "Layers" },
      { name: "Microsoft PowerPoint", level: "Proficient", icon: "Layers" },
      { name: "Microsoft 365", level: "Proficient", icon: "Layers" }
    ]
  },
  {
    title: "Technical Skills",
    items: [
      { name: "Arduino systems", level: "Experienced", icon: "Cpu" },
      { name: "Embedded Programming", level: "Experienced", icon: "Cpu" },
      { name: "Hardware Integration", level: "Experienced", icon: "Cpu" },
      { name: "Sensor Integration", level: "Experienced", icon: "Cpu" },
      { name: "Debugging", level: "Experienced", icon: "Cpu" },
      { name: "Testing", level: "Experienced", icon: "Cpu" },
      { name: "Data Analysis", level: "Experienced", icon: "Cpu" },
      { name: "Control Systems", level: "Experienced", icon: "Cpu" },
      { name: "CAD Modeling", level: "Experienced", icon: "Cpu" }
    ]
  },
  {
    title: "Computer Vision",
    items: [
      { name: "OpenCV", level: "Experienced", icon: "Eye" }
    ]
  },
  {
    title: "Professional Skills",
    items: [
      { name: "Strong analytical and problem-solving abilities", level: "Core", icon: "Sparkles" },
      { name: "effective written and verbal communication", level: "Core", icon: "Sparkles" },
      { name: "teamwork", level: "Core", icon: "Sparkles" },
      { name: "adaptability", level: "Core", icon: "Sparkles" },
      { name: "leadership", level: "Core", icon: "Sparkles" },
      { name: "technical documentation", level: "Core", icon: "Sparkles" },
      { name: "and a proactive attitude", level: "Core", icon: "Sparkles" }
    ]
  }
];
