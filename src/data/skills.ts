export interface SkillItem {
  name: string;
  level: string; // Practical description / context
  icon: string;  // Lucide icon name mapping
}

export interface SkillCategory {
  title: string;
  items: SkillItem[];
}

export const skillCategories: SkillCategory[] = [
  {
    title: "Programming Languages",
    items: [
      { name: "C", level: "Firmware programming, microcontrollers, embedded hardware", icon: "Cpu" },
      { name: "C++", level: "Object-oriented software, hardware drivers, robot systems", icon: "Code" },
      { name: "Python", level: "Script automation, data analysis, computer vision, and ML scripting", icon: "FileCode" },
      { name: "Java", level: "Application logic, OOP systems, data structures", icon: "Terminal" },
      { name: "SQL", level: "Relational database queries (PostgreSQL, Oracle, MySQL)", icon: "Database" },
      { name: "TypeScript", level: "Type-safe Next.js web application architecture", icon: "FileCode" },
      { name: "JavaScript", level: "Interactive browser scripting and client-side calculators", icon: "FileJson" },
      { name: "OpenCV", level: "Computer vision algorithms, image filtering, and object tracking", icon: "Eye" },
      { name: "Object-Oriented Programming (OOP)", level: "Design patterns, inheritance, polymorphism", icon: "Layers" }
    ]
  },
  {
    title: "Development Tools",
    items: [
      { name: "Git & GitHub", level: "Version control, code collaboration, pull requests", icon: "Github" },
      { name: "Visual Studio Code", level: "Primary IDE for script editing, web apps, and C++ coding", icon: "Terminal" },
      { name: "Eclipse IDE", level: "Legacy Java and firmware application development", icon: "FileCode" },
      { name: "IntelliJ IDEA", level: "Advanced Java software engineering environment", icon: "FileJson" }
    ]
  },
  {
    title: "Engineering & Design Software",
    items: [
      { name: "SolidWorks", level: "3D CAD modeling, structural assembly, chassis modeling", icon: "Layers" },
      { name: "AutoCAD", level: "2D drafting, electrical wiring schematics, layout design", icon: "FileText" },
      { name: "MATLAB", level: "Numerical computing, matrix math, data analytics, and control simulations", icon: "Activity" },
      { name: "Microsoft Excel", level: "Data tables, engineering formulas, validation plots", icon: "Table" },
      { name: "Office 365 Suites", level: "Technical reports, presentations, and documentation", icon: "FileText" }
    ]
  },
  {
    title: "Technical Skills",
    items: [
      { name: "Arduino Systems", level: "Microcontroller setups, sensory interface loops", icon: "Cpu" },
      { name: "Raspberry Pi", level: "Single-board computing setups, Linux configurations, and GPIO interfacing", icon: "Cpu" },
      { name: "Hardware Integration", level: "Fusing actuators, sensors, and electrical rails", icon: "Cable" },
      { name: "Circuit Boards", level: "Prototype breadboarding, PCB testing, and component layout", icon: "Layers" },
      { name: "Soldering", level: "PCB assembly, wire splicing, connector joints, and hardware prototyping", icon: "Wrench" },
      { name: "System Debugging & Testing", level: "Logical isolation, serial parsing, multimeter diagnostics", icon: "Activity" },
      { name: "Control Systems", level: "Closed-loop feedback control, obstacle safety calculations", icon: "Orbit" },
      { name: "CAD Modeling", level: "Structural design, mechanical stress considerations", icon: "Layers" }
    ]
  },
  {
    title: "Professional Skills",
    items: [
      { name: "Analytical & Problem-Solving", level: "Surgical debugging, design root-cause isolation", icon: "Search" },
      { name: "Written & Verbal Communication", level: "Clear lab reporting, team alignment sessions", icon: "MessageSquare" },
      { name: "Teamwork & Adaptability", level: "Multi-disciplinary coordination, quick framework learning", icon: "Users" },
      { name: "Proactive Attitude", level: "Autonomous learning, early project scoping", icon: "Sparkles" }
    ]
  }
];
