import historyJson from "../../data/history.json";
import projectsJson from "../../data/projects.json";

export type SkillGroup = {
  label: string;
  items: string[];
};

export type Project = {
  title: string;
  description: string;
  details: string;
  tags: string[];
  imageSrc: string;
  status?: string;
  accent: string;
  source?: string;
  demo?: string;
};

export type Experience = {
  role: string;
  company: string;
  date: string;
  year: string;
  logoText: string;
  points: string[];
};

export type Recommendation = {
  title: string;
  meta: string;
  description: string;
  accent: string;
};

export type ExploringArea = {
  title: string;
  description: string;
};

type RawProject = {
  title: string;
  imageSrc: string;
  description: string;
  skills: string[];
  demo?: string;
  source: string;
};

type RawExperience = {
  role: string;
  organisation: string;
  startDate: string;
  endDate: string;
  experiences: string[];
};

const projectAccents = [
  "#ffd678",
  "#a7d8d5",
  "#f6b6c9",
  "#b9e9e4",
  "#f36b5d",
  "#ffe68c",
  "#9cc6c3",
  "#c7d2fe",
  "#f5b5a8",
];

const projectImages: Record<string, string> = {
  "ClearSpeak": "/project-images/ClearSpeak.png",
  "CourtVision": "/project-images/CourtVision.png",
  "FIFA WC Predictor": "/project-images/FIFA%20WC%20Predictor.png",
  "HoopIQ": "/project-images/HoopIQ.png",
  "March Metrics": "/project-images/March%20Metrics.png",
  "Rentify App": "/project-images/rentify.png",
  "Embedded Systems Lab – Alarm System & Linear Pong Game": "/project-images/Embedded%20Systems.png",
  "UART-Enabled Traffic Light Controller": "/project-images/UART.png",
  "BudgetBuddy": "/project-images/BudgetBuddy.png",
};

const organisationMark = (organisation: string, fallback: number) => {
  const initials = organisation
    .split(/[\s()+,-]+/)
    .filter(Boolean)
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return initials || String(fallback + 1).padStart(2, "0");
};

const yearFromDate = (date: string) => date.match(/\d{4}/)?.[0] ?? "Now";

const projects = (projectsJson as RawProject[]).map((project, index): Project => ({
  title: project.title,
  description: project.description,
  details: project.description,
  tags: project.skills,
  imageSrc: projectImages[project.title] ?? project.imageSrc,
  accent: projectAccents[index % projectAccents.length],
  demo: project.demo,
  source: project.source,
}));

const experience = (historyJson as RawExperience[]).map((item, index): Experience => ({
  role: item.role,
  company: item.organisation,
  date: `${item.startDate} - ${item.endDate}`,
  year: yearFromDate(item.startDate),
  logoText: organisationMark(item.organisation, index),
  points: item.experiences,
}));

const skills = [
  {
    label: "Languages",
    items: ["Python", "Java", "JavaScript", "C", "R", "SQL", "VHDL", "MATLAB"],
  },
  {
    label: "Frameworks & Technologies",
    items: [
      "React",
      "FastAPI",
      "Flask",
      "Vite",
      "PostgreSQL",
      "Firebase",
      "SQLAlchemy",
      "scikit-learn",
      "PyTorch",
      "Pandas",
      "NumPy",
      "Docker",
    ],
  },
  {
    label: "Tools & Hardware",
    items: [
      "Git",
      "GitHub",
      "GitHub Actions",
      "VS Code",
      "Jupyter",
      "Android Studio",
      "Vercel",
      "Render",
      "Quartus",
      "ModelSim",
      "STM32",
      "FPGA",
      "Raspberry Pi",
    ],
  },
] satisfies SkillGroup[];

export const portfolio = {
  person: {
    name: "Khizar",
    shortName: "Khizar",
    headline: "I turn ideas into reality, one commit at a time",
    bio: "Short biography placeholder. Replace this with a concise story about your work, interests, and the kind of problems you like solving.",
    email: "khizarhaider8@hotmail.com",
    resume: "/resume.pdf",
    github: "https://github.com/khizarhaider2000",
    linkedin: "https://www.linkedin.com/in/khizarhaider/",
    twitter: "https://twitter.com/your-username",
  },
  education: {
    school: "University of Ottawa",
    degree: "B.S. Computer Engineering",
    focus: "Expected graduation May 2028",
  },
  currentlyExploring: [
    {
      title: "ML & Sports Analytics",
      description: "Exploring predictive models through sports data.",
    },
    {
      title: "FPGA & Digital Design",
      description: "Building digital systems using VHDL and FPGA boards.",
    },
    {
      title: "Full-Stack Development",
      description: "Creating interactive web applications.",
    },
    {
      title: "Data & Automation",
      description: "Exploring data pipelines and automation with Python and SQL.",
    },
  ] satisfies ExploringArea[],
  skills,
  projects,
  experience,
  recommendations: [
    {
      title: "Favorite Tool",
      meta: "Productivity - Workflow",
      description: "A placeholder recommendation card. Swap this for books, tools, talks, or media you like.",
      accent: "#f15d37",
    },
    {
      title: "Favorite Book",
      meta: "Reading - Craft",
      description: "A placeholder recommendation with the same carousel behavior as the reference.",
      accent: "#171717",
    },
    {
      title: "Favorite Course",
      meta: "Learning - Technical",
      description: "A placeholder for a course, resource, or inspiration.",
      accent: "#efefef",
    },
    {
      title: "Favorite Talk",
      meta: "Engineering - Ideas",
      description: "A placeholder item for a talk, podcast, or article.",
      accent: "#ffd84d",
    },
    {
      title: "Favorite Framework",
      meta: "Build - Systems",
      description: "A placeholder item for a framework or library you recommend.",
      accent: "#20aee5",
    },
    {
      title: "Favorite Practice",
      meta: "Process - Quality",
      description: "A placeholder item for a professional practice or principle.",
      accent: "#6d4c41",
    },
  ] satisfies Recommendation[],
};
