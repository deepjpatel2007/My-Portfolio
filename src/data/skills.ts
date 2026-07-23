export interface SkillItem {
  name: string;
  level: string; // Concise level/context description
  icon: string;  // Lucide icon mapping identifier
}

export interface SkillCategory {
  title: string;
  items: SkillItem[];
}

export const skillCategories: SkillCategory[] = [
  {
    title: "Programming",
    items: [
      { name: "C", level: "Embedded firmware development and hardware configurations", icon: "Cpu" },
      { name: "C++", level: "Object-oriented software and hardware interfaces", icon: "Code" },
      { name: "Java", level: "Data structures, OOP applications, and testing structures", icon: "Terminal" },
      { name: "Python", level: "Script automation, utility tools, and data modeling", icon: "FileCode" },
      { name: "JavaScript / TypeScript", level: "Interactive web logic and type-safe frontends", icon: "FileJson" }
    ]
  },
  {
    title: "Embedded Systems",
    items: [
      { name: "Microcontrollers", level: "Interfacing and configuring boards like Arduino Uno", icon: "Cpu" },
      { name: "Sensors & Actuators", level: "Integrating ultrasonic sensors, IMUs, haptic buzzers, and servos", icon: "Activity" },
      { name: "Serial Protocols", level: "Data exchanges using UART, I2C, and SPI basics", icon: "Cable" },
      { name: "Hardware Integration", level: "Breadboard prototyping, electrical connections, and power management", icon: "Layers" }
    ]
  },
  {
    title: "Software Development",
    items: [
      { name: "System Design", level: "Modular programming, division of concerns, and clean interface systems", icon: "Layers" },
      { name: "Design Patterns", level: "Implementing Singleton and Factory classes in OOP codebases", icon: "Code" },
      { name: "Debugging & Testing", level: "Logical troubleshooting, print statement tracing, and code analysis", icon: "Search" }
    ]
  },
  {
    title: "Web Technologies",
    items: [
      { name: "React & Next.js", level: "Component layouts, states, hooks, and responsive design integrations", icon: "FileCode" },
      { name: "HTML5 & CSS3", level: "Document structures, typography hierarchies, and layout styling", icon: "Globe" },
      { name: "Web APIs", level: "Local browser storage state setups and dynamic DOM structures", icon: "Network" }
    ]
  },
  {
    title: "Engineering Tools",
    items: [
      { name: "MATLAB", level: "Mathematical models, engineering calculations, and script setups", icon: "Activity" },
      { name: "IDE Environments", level: "Coding inside VS Code, IntelliJ IDEA, and Eclipse IDE", icon: "Terminal" }
    ]
  },
  {
    title: "CAD",
    items: [
      { name: "SolidWorks", level: "3D mechanical parts, robot chassis designs, and assembly layouts", icon: "Layers" },
      { name: "AutoCAD", level: "2D drafting, basic wiring diagrams, and layout plans", icon: "FileText" }
    ]
  },
  {
    title: "Automation",
    items: [
      { name: "Feedback Control", level: "Applying running median filter algorithms and complementary filters", icon: "Orbit" },
      { name: "Sensor Triggers", level: "Defining threshold checks for obstacle avoidance safety states", icon: "Activity" }
    ]
  },
  {
    title: "Data",
    items: [
      { name: "SQL", level: "Relational database queries, table queries, and basic joins", icon: "Database" },
      { name: "Data Structures", level: "Utilizing arrays, hash maps, structures, and list models in Java/C++", icon: "Table" }
    ]
  },
  {
    title: "Operating Systems",
    items: [
      { name: "Windows", level: "Primary desktop platform for compilation setups, IDEs, and documentation", icon: "Terminal" },
      { name: "Linux", level: "Running Raspberry Pi systems, terminal tasks, and CLI utilities", icon: "Cpu" }
    ]
  },
  {
    title: "Version Control",
    items: [
      { name: "Git & GitHub", level: "Managing files, commits, branch operations, and pushing source changes", icon: "Github" }
    ]
  }
];
