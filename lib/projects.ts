export type ProjectTag = "Competition" | "Team" | "Club" | "Software" | "Course";

export type Project = {
  id: string;
  name: string;
  subtitle: string;
  date: string;
  tag: ProjectTag;
  role: string;
  status?: string;
  // Shows a caution-tape "In progress" banner across the card photo.
  inProgress?: boolean;
  summary: string;
  problem?: string;
  highlights: string[];
  tools: string[];
  materials?: { label: string; value: string }[];
  specs?: { k: string; v: string }[];
  // Card photo. Drop files in /public/blog-images/. Projects with a modelUrl
  // and no image show their real CAD model instead.
  image?: string;
  // "contain" for logos so they aren't cropped on the card.
  imageFit?: "cover" | "contain";
  // Larger image for the top of the project page; defaults to image.
  heroImage?: string;
  imageCredit?: string;
  // Optional video shown at the top of the project page.
  video?: string;
  logo?: string;
  gallery?: { src: string; caption: string; credit?: string }[];
  // Design history, oldest first. Each step shows a photo, render or video.
  iterations?: {
    label: string;
    title: string;
    caption: string;
    image?: string;
    video?: string;
    portrait?: boolean;
  }[];
  iterationsNote?: string;
  modelUrl?: string;
};

export const PROJECTS: Project[] = [
  {
    id: "mr27-rear-wing",
    name: "MR27 Rear Wing",
    subtitle: "MRacing · University of Michigan Formula SAE",
    date: "2026–27",
    tag: "Team",
    role: "Aerodynamics & Composites Engineer · MRacing",
    status: "In progress",
    inProgress: true,
    summary:
      "Designing the carbon fiber layup and internal structure of the secondary and tertiary rear wing elements on MRacing's MR27 Formula SAE car.",
    problem:
      "Make the wing elements as light as possible while keeping deflection under aero load within limits.",
    highlights: [
      "Designing the carbon layup and internal structure of the MR27 secondary and tertiary rear wing elements",
      "Evaluating material and structural options in Altair HyperMesh to minimize mass while meeting the deflection target",
      "Using full-vehicle STAR-CCM+ CFD to generate the load data that drives structural selection",
    ],
    tools: ["Altair HyperMesh", "Simcenter STAR-CCM+", "Composite Layup"],
    image: "/blog-images/mracing-overhead.jpg",
    imageCredit: "MRacing",
    gallery: [
      { src: "/blog-images/mold-web.jpg", caption: "Composite layup molds in the MRacing shop" },
      { src: "/blog-images/mracing-sunset.jpg", caption: "An MRacing car with its rear wing package", credit: "MRacing" },
      { src: "/blog-images/mracing-autocross.jpg", caption: "Autocross at Formula SAE Michigan", credit: "MRacing" },
    ],
  },
  {
    id: "mcrc-nhrl",
    name: "NHRL Hobbyweight",
    subtitle: "Michigan Combat Robotics Club · 12 lb Combat Robot",
    date: "2026–27",
    tag: "Competition",
    role: "Founder & President · Michigan Combat Robotics Club",
    status: "Building for 2027 NHRL",
    inProgress: true,
    summary:
      "A 12 lb hobbyweight combat robot that the club I founded at Michigan is designing and building for the 2027 NHRL competition.",
    problem:
      "Keep the weapon at the class-maximum kinetic energy while the armor survives impacts and the arena's flamethrowers.",
    highlights: [
      "Founded the Michigan Combat Robotics Club and lead its first 12 lb build",
      "Researching impact-deflecting and energy-absorbing armor materials, including AR500 and AR600 steel, Nitinol, and 3D-printed TPU and PEBA",
      "Researching ways to fire-proof 3D-printed, shock-absorbing plastics against the arena's flamethrowers",
      "Designing a modular weapon system so the robot's archetype can change to suit each opponent, on a chassis strong enough to carry every weapon configuration",
      "Designing a hub-motor weapon, which is rare at the 12 lb scale. It avoids the drawbacks of belted weapons and the shaft failures common in direct-drive weapons",
    ],
    tools: ["Onshape", "Ansys"],
    image: "/blog-images/nhrl-arena.jpg",
    imageCredit: "NHRL",
    gallery: [
      { src: "/blog-images/nhrl-fire.jpg", caption: "The NHRL arena, including its flamethrower hazards", credit: "NHRL" },
    ],
  },
  {
    id: "centurion",
    name: "Centurion",
    subtitle: "3 lb Combat Robot · Railside Robotics",
    date: "2025–26",
    tag: "Competition",
    role: "Mechanical Design Engineer · Railside Robotics",
    status: "3rd Place · UIUC Robobrawl",
    summary:
      "A horizontal-spinner beetleweight that the team built for UIUC Robobrawl. A compact, low-profile wedge with a heavy kinetic weapon and a drivetrain built to survive hits.",
    problem:
      "Survive high-energy hits while keeping weapon spin-up under 2 s in a 3 lb envelope.",
    highlights: [
      "Placed 3rd at UIUC Robobrawl",
      "Updated the CAD, materials and 3D-printed parts based on what failed in each match",
      "Carbon fiber shell with AR500 steel armor",
    ],
    tools: ["Onshape", "Fusion 360", "FDM 3D Printing"],
    materials: [
      { label: "Shell", value: "Carbon Fiber Plate" },
      { label: "Armor", value: "AR500 Steel" },
      { label: "Wheels", value: "FDM TPU" },
      { label: "Slides", value: "UHMW-PE" },
    ],
    specs: [
      { k: "Weight", v: "3.00 lb" },
      { k: "Top speed", v: "14 ft/s" },
      { k: "Weapon", v: "11,400 RPM" },
      { k: "Drive", v: "2WD brushless" },
    ],
    modelUrl: "/models/centurion.glb",
  },
  {
    id: "plastic-antweight",
    name: "Plastic Antweight",
    subtitle: "3D-Printed Combat Robot · Railside Robotics",
    date: "Fall 2025",
    tag: "Competition",
    role: "Mechanical Design Engineer · Railside Robotics",
    status: "v1 → v2 for Railside Rumble",
    summary:
      "An all-plastic, 3D-printed antweight built with my Railside Robotics team. Version 1 broke apart at the club's initiation competition. We used what failed to redesign it, and built version 2 for Railside Rumble.",
    problem:
      "Make a robot printed entirely from plastic survive spinner hits, after v1 lost its front forks and armor in its first fight.",
    highlights: [
      "Fought v1 at Railside Robotics' initiation competition, where it lost its forks and armor",
      "Studied the fight footage and broken parts to find where v1 failed",
      "Redesigned the chassis, weapon and armor, then built and tested v2 for Railside Rumble",
    ],
    tools: ["Onshape", "FDM 3D Printing"],
    image: "/blog-images/antweight-card.jpg",
    heroImage: "/blog-images/antweight-v1-v2.jpg",
    iterations: [
      {
        label: "v1",
        title: "Initiation competition",
        caption: "v1's first fight. Its forks and armor broke off under spinner hits.",
        video: "/blog-images/antweight-v1.mp4",
        image: "/blog-images/antweight-v1-poster.jpg",
        portrait: true,
      },
      {
        label: "v2",
        title: "Railside Rumble",
        caption: "v2 in testing: redesigned chassis, weapon and armor.",
        video: "/blog-images/antweight-v2.mp4",
        image: "/blog-images/antweight-v2-poster.jpg",
        portrait: true,
      },
    ],
    gallery: [
      { src: "/blog-images/antweight-v1-card.jpg", caption: "v1, before the initiation competition" },
      { src: "/blog-images/antweight-card.jpg", caption: "v2, rebuilt for Railside Rumble" },
    ],
  },
  {
    id: "ftc-24173",
    name: "FTC 24173 Robot",
    subtitle: "FIRST Tech Challenge Competition Robot",
    date: "2024–25",
    tag: "Team",
    role: "Co-Founder & Captain · Electric Zebras",
    status: "Built & competed",
    summary:
      "Season robot for FIRST Tech Challenge team 24173, a team I built from the ground up. Carbon fiber chassis with a custom clutch gearbox that absorbs intake impacts and extends motor life.",
    problem:
      "Score fast, repeated cycles inside a 42 in sizing box, with a clutch-protected intake that survives contact.",
    highlights: [
      "Built the team from the ground up and led its competition robot development",
      "Trained 15 students in mechanical design, Java programming and electronics",
      "Custom 7075 aluminum clutch gearbox",
    ],
    tools: ["Onshape", "Java"],
    materials: [
      { label: "Chassis", value: "Carbon Fiber Plate" },
      { label: "Gearbox", value: "Custom Clutch · AL 7075" },
      { label: "Drive", value: "Mecanum" },
      { label: "Slides", value: "2-stage Linear" },
    ],
    specs: [
      { k: "Weight", v: "18.4 lb" },
      { k: "Reach", v: "38 in" },
      { k: "DOF", v: "5" },
      { k: "Cycle", v: "< 6 s" },
    ],
    modelUrl: "/models/ftc-24173.glb",
    iterationsNote:
      "Four CAD iterations led to the final robot, which you can rotate in the interactive model above.",
    iterations: [
      { label: "v1", title: "First concept", caption: "First full-robot layout.", image: "/blog-images/ftc-24173-v1.jpg" },
      { label: "v2", title: "Revised layout", caption: "Second iteration of the robot.", image: "/blog-images/ftc-24173-v2.jpg" },
      { label: "v3", title: "Refined design", caption: "Third iteration of the robot.", image: "/blog-images/ftc-24173-v3.jpg" },
      { label: "v4", title: "Pre-final design", caption: "Fourth iteration, before the final model.", image: "/blog-images/ftc-24173-v4.jpg" },
    ],
    gallery: [
      { src: "/blog-images/ftc-ben.jpg", caption: "Working on the robot with my FTC team" },
    ],
  },
  {
    id: "cavitating-venturi",
    name: "Cavitating Venturi",
    subtitle: "Purdue Space Program · Rocket Propellant Feed",
    date: "Fall 2025",
    tag: "Team",
    role: "Member · Purdue Space Program",
    summary:
      "Sized and modeled a cavitating venturi for a liquid rocket engine's propellant feed system. The venturi sits upstream of the engine and keeps the propellant flow rate steady even when pressure downstream changes.",
    problem:
      "Hold a fixed propellant mass flow rate regardless of downstream pressure swings from combustion or ambient changes.",
    highlights: [
      "Wrote a MATLAB sizing script that computes venturi geometry from tank pressure, propellant temperature and mass flow rate",
      "Sized for both liquid oxygen and ethanol, using a 0.8 discharge coefficient",
      "Modeled the venturi in Siemens NX, with threaded ends for assembly into the feed system",
      "Learned fluid system diagrams, valve types and flow meter design",
    ],
    tools: ["MATLAB", "Siemens NX"],
    specs: [
      { k: "Propellants", v: "LOX / Ethanol" },
      { k: "Inlet pressure", v: "1000 / 800 psia" },
      { k: "Mass flow", v: "1.48 / 1.24 lbm/s" },
      { k: "Line size", v: "0.5 in OD" },
      { k: "Cd", v: "0.8" },
    ],
    image: "/blog-images/venturi-card.jpg",
    gallery: [
      { src: "/blog-images/venturi-section.jpg", caption: "NX model: threaded inlet, converging section, throat and diffuser" },
      { src: "/blog-images/venturi-block.jpg", caption: "Venturi housing with threaded port" },
      { src: "/blog-images/psp-team.jpg", caption: "With the Purdue Space Program team" },
    ],
  },
  {
    id: "me250-robot",
    name: "ME 250 Design Project",
    subtitle: "Design & Manufacturing I · Team 54 Robot",
    date: "Fall 2026",
    tag: "Course",
    role: "Design Team Member · ME 250 Team 54",
    status: "In progress · Design review complete",
    inProgress: true,
    summary:
      "A robot my four-person team is designing and building for ME 250 at Michigan. In the saloon section of the course, it opens the saloon door for our squad, knocks over robbers and hangs hats on hooks, all inside a 10 × 10 × 12 in envelope.",
    problem:
      "Open the saloon door in 30 ± 20 s, hang 3 ± 1 hats and knock over robbers, while sharing a cramped saloon with a second robot.",
    highlights: [
      "Generated eight concepts as a team (I sketched two of them) and scored them in a weighted Pugh chart",
      "Merged the best ideas: one concept's rack-and-pinion hat lift with another's rear door hook",
      "Measured door pull force with a force gauge at 11 opening distances: F = 0.198d + 7.47 N (R² = 0.95), giving a 10.6 N design load",
      "First-principles analysis showed the Tamiya double gearbox (344:1) opens the door with a 1.3× margin, in about 11 s",
      "A height analysis showed the 8.9 in lift only fits under the 12 in limit, so we reworked the lift layout",
      "Test data showed a pin couldn't pull the door reliably, so we switched to a 3D-printed J-hook",
    ],
    tools: ["CAD", "FDM 3D Printing", "Pugh Chart", "Force Gauge Testing"],
    specs: [
      { k: "Envelope", v: "10 × 10 × 12 in" },
      { k: "Drive", v: "Tamiya double, 344:1" },
      { k: "Door load", v: "10.6 N · 1.3× SF" },
      { k: "Lift travel", v: "6 in" },
    ],
    materials: [
      { label: "Frame", value: "Aluminum plate & angle" },
      { label: "Mast", value: "2 × 1 in aluminum tube" },
      { label: "Lift", value: "Nylon rack · Pololu motor" },
      { label: "Door hook", value: "3D-printed" },
      { label: "Wheels", value: "BaneBots + polypropylene" },
    ],
    image: "/blog-images/me250-card.jpg",
    heroImage: "/blog-images/me250-concepts.jpg",
    iterations: [
      {
        label: "1",
        title: "Concept scoring",
        caption: "Eight concepts scored on door, hats, robbers, mobility, manufacturability and creativity.",
        image: "/blog-images/me250-pugh.jpg",
      },
      {
        label: "2",
        title: "Final concept sketch",
        caption: "Hat lift on a rack, control box, and a door hook on the back.",
        image: "/blog-images/me250-sketch.jpg",
      },
      {
        label: "3",
        title: "CAD model",
        caption: "Rack-and-pinion lift with a scoop platform for the hats.",
        image: "/blog-images/me250-lift.jpg",
      },
    ],
    gallery: [
      { src: "/blog-images/me250-door-test.jpg", caption: "Measuring door pull force with a force gauge" },
      { src: "/blog-images/me250-force-plot.jpg", caption: "Door force vs. opening distance, with a linear fit" },
      { src: "/blog-images/me250-drivetrain.jpg", caption: "Drivetrain: double gearbox, rubber drive wheels, L-brackets" },
    ],
  },
  {
    id: "tshirt-cannon",
    name: "Pneumatic T-Shirt Cannon",
    subtitle: "Middlesex Physics Club",
    date: "2023–25",
    tag: "Club",
    role: "Co-Founder & Club Head",
    summary:
      "A pneumatic t-shirt cannon built by the hands-on physics club I co-founded, alongside a series of model rockets.",
    highlights: [
      "Led the design and build with club members",
      "Prepared students for the USA Physics Olympiad F=ma exam",
    ],
    tools: [],
    image: "/blog-images/t-shirt.jpg",
    video: "/blog-images/t-shirt.mp4",
  },
  {
    id: "words-words",
    name: "Middlesex Words Words",
    subtitle: "Vocabulary Learning Platform",
    date: "2024–25",
    tag: "Software",
    role: "Software Developer",
    summary:
      "A full-stack vocabulary learning platform used across the whole school, with about 400 weekly active users.",
    highlights: [
      "Adopted school-wide, with about 400 weekly active users",
      "Implemented the spaced-repetition review scheduler to improve long-term retention",
      "Full-stack: Next.js, TypeScript, MySQL, Tailwind CSS",
    ],
    tools: ["Next.js", "TypeScript", "MySQL", "Tailwind CSS"],
    image: "/blog-images/mxwordswords_logo.png",
    imageFit: "contain",
    heroImage: "/blog-images/mxwordswords_page-web.png",
    logo: "/blog-images/mxwordswords_logo.png",
  },
];

export type TimelineEntry = {
  kind: "education" | "project";
  date: string;
  title: string;
  org: string;
  place?: string;
  points: string[];
  projectId?: string;
};

export const TIMELINE: TimelineEntry[] = [
  {
    kind: "project",
    date: "Sep 2026 – Present",
    title: "Founder & President",
    org: "Michigan Combat Robotics Club",
    place: "Ann Arbor, MI",
    points: [
      "Designing and building a 12 lb hobbyweight for 2027 NHRL.",
      "Developing a modular weapon system, a hub-motor weapon and fire-resistant armor.",
    ],
    projectId: "mcrc-nhrl",
  },
  {
    kind: "project",
    date: "Sep 2026 – Present",
    title: "Aerodynamics & Composites Engineer",
    org: "MRacing · Michigan Formula SAE",
    place: "Ann Arbor, MI",
    points: [
      "Designing the carbon layup and internal structure of the MR27 rear wing elements.",
      "Running HyperMesh composite studies under STAR-CCM+ aero loads.",
    ],
    projectId: "mr27-rear-wing",
  },
  {
    kind: "project",
    date: "Fall 2026",
    title: "Design Team Member",
    org: "ME 250 · Design & Manufacturing I",
    place: "Ann Arbor, MI",
    points: [
      "Designing a robot that opens a door, hangs hats and knocks over robbers in a 10 × 10 × 12 in envelope.",
      "Ran door-force testing and first-principles drive and lift analyses ahead of the design review.",
    ],
    projectId: "me250-robot",
  },
  {
    kind: "education",
    date: "Fall 2026 – Dec 2028",
    title: "B.S.E. Mechanical Engineering",
    org: "University of Michigan, College of Engineering",
    place: "Ann Arbor, MI",
    points: [
      "Fall 2026: Solid Mechanics, Dynamics & Vibrations, Design & Manufacturing I, Engineering Acoustics",
      "Winter 2027: Design & Manufacturing II, Fluid Mechanics, Mechanical Behavior of Materials",
    ],
  },
  {
    kind: "project",
    date: "Aug 2025 – May 2026",
    title: "Code Lead & Mechanical Design Engineer",
    org: "Railside Robotics",
    place: "West Lafayette, IN",
    points: [
      "Designed and built 3 lb beetleweight, 1 lb antweight and plastic antweight combat robots, including team-built Centurion (3rd at UIUC Robobrawl).",
      "Took our plastic antweight from a v1 that broke apart at the initiation competition to a rebuilt v2 for Railside Rumble.",
      "Directed club software, including the beetleweight arena and an autonomous combat robot.",
    ],
    projectId: "centurion",
  },
  {
    kind: "project",
    date: "Fall 2025",
    title: "Member",
    org: "Purdue Space Program",
    place: "West Lafayette, IN",
    points: ["Sized a cavitating venturi for the propellant feed system in MATLAB and modeled it in Siemens NX."],
    projectId: "cavitating-venturi",
  },
  {
    kind: "education",
    date: "Aug 2025 – May 2026",
    title: "First-Year Engineering · GPA 3.7",
    org: "Purdue University, College of Engineering",
    place: "West Lafayette, IN",
    points: [
      "Transferred to the University of Michigan.",
      "Coursework: Thermodynamics, Linear Algebra, Multivariable Calculus, Differential Equations, CAD",
    ],
  },
  {
    kind: "project",
    date: "Apr 2024 – May 2025",
    title: "Software Developer",
    org: "Middlesex Words Words",
    place: "Concord, MA",
    points: ["Co-built a vocabulary platform adopted school-wide, with about 400 weekly active users."],
    projectId: "words-words",
  },
  {
    kind: "project",
    date: "May 2023 – May 2025",
    title: "Co-Founder & Captain",
    org: "FTC Team 24173 · Electric Zebras",
    place: "Concord, MA",
    points: [
      "Built the team from the ground up and led its competition robot development.",
      "Trained 15 students in mechanical design, Java and electronics.",
    ],
    projectId: "ftc-24173",
  },
  {
    kind: "project",
    date: "Sep 2023 – May 2025",
    title: "Co-Founder & Club Head",
    org: "Middlesex Physics Club",
    place: "Concord, MA",
    points: ["Led builds of model rockets and a pneumatic t-shirt cannon."],
    projectId: "tshirt-cannon",
  },
];

export const SKILLS = [
  {
    group: "CAD & Simulation",
    icon: "cad",
    items: ["Siemens NX", "SolidWorks", "Onshape", "Fusion 360", "Ansys", "Altair HyperMesh", "Simcenter STAR-CCM+"],
  },
  {
    group: "Manufacturing",
    icon: "mfg",
    items: ["Mill", "Lathe", "Waterjet", "ShopBot CNC", "Composite Layup", "FDM & SLA 3D Printing"],
  },
  {
    group: "Programming",
    icon: "code",
    items: ["C++", "Python", "MATLAB", "Java", "TypeScript / JavaScript", "SQL", "Git"],
  },
] as const;

export const CONTACT = {
  email: "benjamin.m.feuer@gmail.com",
  linkedin: "linkedin.com/in/benjamin-feuer",
  github: "github.com/B3N101",
  school: "University of Michigan · Mechanical Engineering",
  location: "Ann Arbor, MI · NYC",
};
