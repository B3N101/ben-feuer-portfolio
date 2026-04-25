export type Project = {
  id: string;
  num: string;
  name: string;
  subtitle: string;
  year: string;
  status: string;
  blurb: string;
  problem: string;
  software: string[];
  materials: { label: string; value: string }[];
  specs: { k: string; v: string }[];
  accent: string;
  robot: string;
  modelUrl: string;
};

export const PROJECTS: Project[] = [
  {
    id: "centurion",
    num: "01",
    name: "Centurion",
    subtitle: "3lb Combat Robot",
    year: "2024",
    status: "3rd place · UIUC 3lb",
    blurb:
      "A horizontal-spinner 3lb beetleweight built for the UIUC combat event. Emphasis on a compact, low-profile wedge with a heavy kinetic weapon and survivable drive.",
    problem:
      "Survive high-energy hits while keeping weapon spin-up under 2s in a 3 lb envelope.",
    software: ["Onshape", "Fusion 360"],
    materials: [
      { label: "Shell", value: "Carbon Fiber Plate" },
      { label: "Armor", value: "AR 500 Steel" },
      { label: "Wheels", value: "FDM TPU" },
      { label: "Slides", value: "UHMW-PE" },
    ],
    specs: [
      { k: "WEIGHT", v: "3.00 lb" },
      { k: "TOP SPEED", v: "14 ft/s" },
      { k: "WEAPON RPM", v: "11 400" },
      { k: "DRIVE", v: "2WD · brushless" },
    ],
    accent: "#FF7A1A",
    robot: "centurion",
    modelUrl: "/models/centurion.glb",
  },
  {
    id: "ftc",
    num: "02",
    name: "FTC 24173",
    subtitle: "Competition Robot · 2024–25",
    year: "2024–25",
    status: "Built & competed",
    blurb:
      "Season robot for FIRST Tech Challenge team 24173. Carbon fiber chassis with a custom clutch gearbox to absorb intake impacts and extend motor life.",
    problem:
      "High-cycle scoring under a 42 in sizing box, with a clutch-protected intake to survive contact.",
    software: ["Onshape"],
    materials: [
      { label: "Chassis", value: "Carbon Fiber Plate" },
      { label: "Gearbox", value: "Custom Clutch · AL 7075" },
      { label: "Drive", value: "Mecanum" },
      { label: "Slides", value: "2-stage Linear" },
    ],
    specs: [
      { k: "WEIGHT", v: "18.4 lb" },
      { k: "REACH", v: "38 in" },
      { k: "DOF", v: "5" },
      { k: "CYCLE", v: "< 6 s" },
    ],
    accent: "#4FC3FF",
    robot: "ftc",
    modelUrl: "/models/ftc-24173.glb",
  },
];

export const CONTACT = {
  email: "benjamin.m.feuer@gmail.com",
  linkedin: "linkedin.com/in/benjamin-feuer",
  github: "github.com/B3N101",
  school: "Purdue University · Mechanical Engineering",
};
