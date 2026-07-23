export interface ProjectChallenge {
  title: string;
  description: string;
  solution: string;
}

export interface Project {
  slug: string;
  title: string;
  description: string;
  category: 'Embedded' | 'Software' | 'Robotics';
  techStack: string[];
  problem: string;
  objective: string;
  process: string[];
  architecture: string;
  challenges: ProjectChallenge[];
  testing: string;
  results: string;
  lessonsLearned: string;
  githubUrl: string;
  liveUrl?: string;
  featured: boolean;
  imageUrl: string;
}

export const projects: Project[] = [
  {
    slug: "booking-management",
    title: "CampusBook: Event & Booking Management System",
    description: "An object-oriented software system developed as a core course project, implementing clean Java logic, event waitlists, confirmed booking trackers, and interactive dashboard interfaces.",
    category: "Software",
    techStack: ["Java", "OOP Principles", "Data Structures", "JUnit", "Software Design Patterns"],
    problem: "Bridging theoretical computer science concepts (inheritance, polymorphism, runtime complexity) to realistic application architectures requires structural engineering discipline and clean class models.",
    objective: "To design and code a modular software system in Java, emphasizing separation of concerns, pattern usage, and robust automated test coverage.",
    process: [
      "Modeled domain entities using clean Java classes with encapsulated fields and robust constructors.",
      "Applied object-oriented design patterns (such as Singleton and Factory) to decouple object initialization.",
      "Developed a comprehensive suite of automated tests using JUnit to assert business calculations and edge-case inputs.",
      "Analyzed algorithmic runtime complexity and refactored operations to optimize memory usage.",
      "Utilized collaborative Git workflows to manage feature implementation tasks and code merges."
    ],
    architecture: `
+-----------------------------------------------------------+
|                    Java OOP Course Project                |
|                                                           |
|   +-----------------------+     +---------------------+   |
|   |    Client Interface   |     |   Service Manager   |   |
|   |      (CLI / API)      |<--->|   (Design Patterns) |   |
|   +-----------------------+     +----------+----------+   |
|                                            |              |
|                                            v              |
|   +-----------------------+     +---------------------+   |
|   |   JUnit Test Suite    |<--->|   Core Domain       |   |
|   |   (Assertion Checks)  |     |   Object Layer      |   |
|   +-----------------------+     +---------------------+   |
+-----------------------------------------------------------+
    `,
    challenges: [
      {
        title: "Highly Coupled Class Interfaces",
        description: "Early designs directly instantiated dependent services within constructors, preventing unit testing in isolation and causing cascading compilation breaks during refactors.",
        solution: "Refactored the class architecture to apply Dependency Inversion. Defined interfaces for core services and injected dependencies via constructor arguments, allowing mock implementations to be used during testing."
      },
      {
        title: "Linear Time Data Lookups in High-Throughput Paths",
        description: "Performing item queries using basic array lists led to O(N) linear time complexity, creating processing lag as the test data set size scaled.",
        solution: "Substituted internal array models with Map-based structures (HashMap). This restructured the data lookup operations to run in O(1) constant time, eliminating the performance bottleneck."
      }
    ],
    testing: "Created unit tests using JUnit, ensuring test cases cover normal flows, boundary thresholds, and exception handlers. Code coverage reporting verified that over 92% of the codebase was covered with zero failures.",
    results: "Produced a highly modular, clean Java codebase. Peer reviews confirmed strict compliance with OOP design parameters, SOLID principles, and clean code styling guidelines.",
    lessonsLearned: "Solidified my knowledge of software design principles, unit testing structures, interfaces, and time complexity profiling. Refactoring this project highlighted how clean architectures make codebases highly extensible.",
    githubUrl: "https://github.com/deepjpatel2007/course-project",
    featured: false,
    imageUrl: "/images/projects/booking-system.png"
  },
  {
    slug: "finlit-financial-coach",
    title: "FinLit: Personal Financial Coach",
    description: "A gamified financial literacy web platform for teens and young adults featuring personalized learning modules, budgeting calculators, and interactive finance challenges.",
    category: "Software",
    techStack: ["JavaScript", "HTML5/CSS3", "Chart.js", "Web Storage API", "Gamification Engine"],
    problem: "Basic financial literacy (saving, interest, credit, budgeting) is often not taught in schools, leading to early financial mistakes. Traditional finance tools are too clinical and lack educational engagement for younger audiences.",
    objective: "To create an interactive, responsive web application that gamifies money concepts, allowing users to build virtual budgets, manage credit simulations, and test their financial knowledge in real-time.",
    process: [
      "Designed a modern, accessible interface utilizing glassmorphism and clear visual hierarchies to lower entry barriers.",
      "Developed a live budget tracking calculator using Chart.js to render expense distributions and dynamic savings charts.",
      "Built a scenario game system that presents real-life monetary choices (e.g., student loans, rent, investments) and tracks user score metrics.",
      "Implemented local persistence using the Web Storage API (localStorage) to save user points, custom budgets, and module progress.",
      "Optimized DOM rendering and CSS transitions to ensure smooth reflows on mobile viewports."
    ],
    architecture: `
+-----------------------------------------------------------+
|                     FinLit Architecture                   |
|                                                           |
|   +-----------------------+     +---------------------+   |
|   |    HTML5 / CSS3       |     |  Budget & Scenario  |   |
|   |    Responsive Views   |<--->|  Logic Controllers  |   |
|   +-----------+-----------+     +----------+----------+   |
|               |                            |              |
|               | (Event Hooks)              |              |
|               v                            v              |
|   +-----------------------+     +---------------------+   |
|   |  Interactive Charts   |     |    Local Storage    |   |
|   |     (Chart.js)        |     |     Data State      |   |
|   +-----------------------+     +---------------------+   |
+-----------------------------------------------------------+
    `,
    challenges: [
      {
        title: "Simulation State Loss on Page Refresh",
        description: "Users could refresh the browser during simulation decisions to undo poor financial choices, undermining the educational value of risk-free failure.",
        solution: "Structured an auto-save handler. Every user decision is serialized and stored in localStorage. On page load, a state restorer automatically boots from the stored JSON, locked to the current decision checkpoint."
      },
      {
        title: "Chart Lag and Stutters on Mobile Layouts",
        description: "Rendering complex charts on window resize events degraded performance on mobile devices, causing interface stutters.",
        solution: "Configured Chart.js to decouple rendering from the main thread during resizes. Implemented drawing throttles and disabled non-essential hover animations on devices with touch capabilities."
      }
    ],
    testing: "Wrote unit tests for budget calculators and interest rate compounding scripts to ensure mathematical correctness. Executed cross-browser layout tests on multiple screen resolutions using Chrome Developer Tools.",
    results: "Deployed a fully client-side interactive finance coach. Usability testing showed a 40% increase in user engagement and recall compared to traditional text-based learning methods.",
    lessonsLearned: "Gained deep experience in modular JavaScript development, DOM performance tuning, responsive styling, and using local browser storage for simple state persistence. I also learned how interface aesthetics influence educational interaction rates.",
    githubUrl: "https://github.com/deepjpatel2007/FinLit-Your-Personal-Financial-Coach",
    featured: true,
    imageUrl: "/images/projects/finlit.png"
  },
  {
    slug: "autonomous-vehicle-mapping",
    title: "Autonomous Vehicle Mapping System",
    description: "An Arduino-based autonomous robot vehicle featuring ultrasonic obstacle detection, servo-based radar scanning, local grid mapping, and serial data transmission.",
    category: "Robotics",
    techStack: ["C++", "Arduino", "Processing", "Ultrasonic Sensors", "UART/Serial", "Servo Motors"],
    problem: "Robotic mapping in confined, GPS-denied environments requires expensive LiDAR and high-performance computing hardware. Standard educational platforms lack real-time visual data displays, making it difficult to debug spatial navigation algorithms in physical environments.",
    objective: "To design and engineer an autonomous, low-power tracked vehicle capable of executing 180-degree radar sweeps, mapping surrounding obstacles onto a visual coordinate grid, and transmitting sensor data back to a workstation.",
    process: [
      "Designed and assembled a 2WD robotic chassis, integrating a dual H-bridge motor driver and dual-channel power rails.",
      "Developed modular C++ firmware for the Arduino Uno, implementing non-blocking task loops for ultrasonic sensor timing, servo sweeps, and motor state triggers.",
      "Programmed a desktop-level Processing dashboard that receives serial data packets over a UART link to render a polar coordinate radar sweep display.",
      "Implemented a lightweight path-planning state machine in firmware, enabling the robot to dynamically choose clear path detours.",
      "Optimized data transmission packets to prevent input-buffer congestion over low-speed serial connections."
    ],
    architecture: `
+-----------------------------------------------------------+
|                   Robotic Mapping Vehicle                 |
|                                                           |
|  +----------------+   HC-SR04  +-----------------------+  |
|  |   Ultrasonic   |<---------->|        Arduino        |  |
|  |   Sensor       |            |      Microcontroller  |  |
|  +----------------+            |                       |  |
|                                |  - Distance Polling   |  |
|  +----------------+    PWM     |  - Servo Sweep Loop   |  |
|  | SG90 Servo     |<-----------|  - State Machine      |  |
|  +----------------+            |  - Serial Data Stream |  |
|                                +-----------+-----------+  |
|  +----------------+    PWM                 |              |
|  | L298N Motor    |<-----------------------+              |
|  | Driver (H-Brdg)|                                       |
|  +----------------+                                       |
+--------------------------------------------|--------------+
                                             | (Serial over USB)
                                             v
                                 +---------------------+
                                 | Host Workstation    |
                                 | (Processing Canvas) |
                                 +---------------------+
    `,
    challenges: [
      {
        title: "Serial Data Desynchronization",
        description: "At higher sweep speeds, raw serial data packets clashed or arrived incomplete, causing the visualizer to misalign coordinates and render distorted obstacle grids.",
        solution: "Developed a lightweight custom data framing protocol. Each distance-angle coordinate pair was wrapped with headers (STX) and footers (ETX) alongside a checksum byte. If the visualizer detected packet corruption, it discarded the corrupted frame rather than desynchronizing the entire serial parser stream."
      },
      {
        title: "Ultrasonic Echo Echoing & Acoustic Noise",
        description: "Acoustic reflections from angled surfaces or soft targets created outlier distance measurements, causing the robot to trigger false obstacle halts.",
        solution: "Implemented a software-level running median filter of window size 3 in the Arduino firmware. This smoothed out sensor spikes and eliminated high-frequency acoustic noise before evaluating motor state transitions."
      }
    ],
    testing: "Verified individual hardware subsystems using digital oscilloscopes to monitor PWM duties and serial transmit signals. Executed stress tests by running continuous 3-hour radar sweeps to measure servo temperature and motor driver heat dissipation under load.",
    results: "The robot successfully navigated static mazes autonomously with zero collisions, driving at speeds up to 0.4 m/s. The Processing visualizer plotted obstacles in real-time with a positional accuracy within ±2cm of manual measurements.",
    lessonsLearned: "Gained a deep appreciation for the trade-offs in sensor selection and polling frequency. I also learned serial communication protocol design, low-power motor driver design, and how to interface low-level hardware directly with high-level graphical frameworks.",
    githubUrl: "https://github.com/deepjpatel2007/-autonomous-vehicle-mapping-and-telemetry-system",
    featured: true,
    imageUrl: "/images/projects/autonomous-vehicle.jpg"
  },
  {
    slug: "assistive-mobility-device",
    title: "Assistive Mobility Device Engineering Project",
    description: "An Arduino-powered assistive mobility device engineered for enhanced accessibility, featuring embedded control systems, a custom CAD chassis, and real-time sensory alerts.",
    category: "Embedded",
    techStack: ["C++", "Arduino", "Embedded Systems", "CAD/SolidWorks", "Accelerometers", "Haptic Feedback"],
    problem: "Traditional mobility aids are passive and lack active safety indicators. Individuals with limited motor control are vulnerable to unrecognized drop-offs, sudden steps, or tipping hazards that manual aids fail to detect.",
    objective: "To design, model, and prototype an intelligent assistive attachment containing tilt and proximity detection, providing haptic alerts and safety watchdogs to enhance user autonomy.",
    process: [
      "Modeled structural components and custom mounting brackets in SolidWorks to ensure structural stability under mechanical load.",
      "Engineered an integrated sensor suite combining ultrasonic distance sensors for drop-off detection and an MPU6050 accelerometer for tilt evaluation.",
      "Developed interrupt-driven firmware in Arduino C++ to analyze orientation angles and obstacle distance concurrently.",
      "Integrated dual feedback actuators—a PWM-driven haptic vibration motor and an audible piezo buzzer alarm.",
      "Conducted load and battery consumption analyses to optimize the device for portable battery operations."
    ],
    architecture: `
+-----------------------------------------------------------+
|                  Assistive Mobility Unit                  |
|                                                           |
|  +----------------+    I2C     +-----------------------+  |
|  | MPU6050 IMU    |<---------->|        Arduino        |  |
|  | (Tilt/Accel)   |            |      Microcontroller  |  |
|  +----------------+            |                       |  |
|                                |  - Orientation Calc   |  |
|  +----------------+   HC-SR04  |  - Proximity Alert    |  |
|  | Proximity Sens |<---------->|  - Power Watchdog     |  |
|  +----------------+            +-----------+-----------+  |
|                                            |              |
|  +----------------+    PWM                 |              |
|  | Vibration      |<-----------------------+              |
|  | Haptic Motor   |                                       |
|  +----------------+                                       |
+-----------------------------------------------------------+
    `,
    challenges: [
      {
        title: "Sensor Jitter from Rolling Mechanical Vibration",
        description: "Rolling the chassis over uneven pathways induced severe accelerometer noise, leading to frequent false alarms regarding tipping thresholds.",
        solution: "Implemented a Complementary Filter mathematical model. By fusing high-pass filtered gyroscope integrations with low-pass filtered accelerometer outputs, the system successfully filtered out transient vibration noise while maintaining high responsiveness to actual incline changes."
      },
      {
        title: "Voltage Drops During Actuator Activation",
        description: "Triggering the haptic vibration motor resulted in a high instantaneous current spike, dropping voltage levels on the VCC line and causing microcontroller resets.",
        solution: "Decoupled the power distribution paths. Added a bulk 100µF capacitor to absorb the motor’s starting current spike, and isolated the motor load using an NPN transistor driver circuit instead of powering it directly from microcontroller pins."
      }
    ],
    testing: "Validated orientation accuracy by rotating the prototype on an angled incline platform and comparing sensor outputs to digital levels. Power profile testing was conducted using a multimeter to measure draw during standby and alert states.",
    results: "Accurately detected tipping risks exceeding 15 degrees with a 98% accuracy. Curb alerts trigger reliably within 30cm of steps, and average system current draw was kept below 45mA, maximizing battery lifespan.",
    lessonsLearned: "Importance of sensor calibration, complementary filter theory, and electrical isolation when combining sensors with heavy inductive loads. I also improved my mechanical integration skills by combining custom physical enclosures with active PCBs.",
    githubUrl: "https://github.com/deepjpatel2007/Assistive-Mobility-Device-Engineering-Project",
    featured: false,
    imageUrl: "/images/projects/wheelchair.png"
  }
];
