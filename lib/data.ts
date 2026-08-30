export const SITE_URL = "https://adimyth.in";

export const upcomingEvent = {
  name: "AI Engineer Singapore",
  dates: "May 15 - 17, 2026",
  url: "https://www.ai.engineer/singapore",
};

export const profile = {
  name: "Aditya Mishra",
  title: "Principal Engineer & AI Engineer",
  tagline: "I’m a Principal Engineer with 9+ years of experience building foundational backend and platform systems, and the production AI applications that depend on them. My current work focuses on LLM applications, voice agents, and multi-agent systems. I write about the engineering decisions that make those systems reliable in production.",
  email: "mishraaditya6991@gmail.com",
  phone: "+91 9029080380",
  github: "https://github.com/adimyth",
  linkedin: "https://linkedin.com/in/adimyth",
  twitter: "https://x.com/adi_myth",
};

// Google Drive export: make sure each doc is set to "Anyone with the link can view"
export const resumes = [
  {
    role: "Principal Engineer",
    description:
      "Focused on distributed systems, platform engineering, real-time data infrastructure, and service design. Best for engineering leadership and architecture roles.",
    url: "https://docs.google.com/document/d/1jxlTpeo3LGoKuRN1S5tG99trEU-inq6lN1YYV_AqFSI/export?format=pdf",
  },
  {
    role: "AI Engineer",
    description:
      "Focused on LLM applications, agentic systems, RAG pipelines, voice AI, and MLOps. Best for AI-first product companies and research-adjacent roles.",
    url: "https://docs.google.com/document/d/1O1dJjBs6U4unnZY_bk4CMisWBNK58X-gs0CX2zdRhxk/export?format=pdf",
  },
];

export const skills = [
  {
    category: "Core Domains",
    items: [
      "AI Engineering",
      "Data Engineering",
      "Distributed Systems",
      "System Design",
      "DevOps",
    ],
  },
  {
    category: "Languages",
    items: ["Python", "Go"],
  },
  {
    category: "API Frameworks",
    items: ["FastAPI", "Gin"],
  },
  {
    category: "AI & ML",
    items: [
      "LangGraph",
      "Pipecat",
      "Deep Agents",
      "LangSmith",
      "DeepEval",
      "Scikit-learn",
      "TensorFlow",
    ],
  },
  {
    category: "Databases",
    items: ["PostgreSQL", "Redis", "ClickHouse", "MongoDB", "Vector Databases"],
  },
  {
    category: "Cloud & Infrastructure",
    items: ["AWS", "GCP", "Modal", "Docker", "Kubernetes", "Serverless"],
  },
  {
    category: "Data & Streaming",
    items: ["Apache Kafka", "Apache Flink", "Celery", "Airflow"],
  },
  {
    category: "Practices",
    items: ["MLOps", "Monitoring & Observability"],
  },
];

type ExperienceEntry = {
  company: string;
  url?: string;
  logo: string;
  location: string;
  /** Current or most recent title at the company. */
  role: string;
  /** Full tenure at the company. */
  period: string;
  /** Title progression, newest first. Omit for a single-title stint. */
  roles?: { title: string; period: string }[];
  projects: { name: string; description: string; stack: string[]; link?: string }[];
};

export const experience: ExperienceEntry[] = [
  {
    company: "Sharpsell.ai",
    url: "https://sharpsell.ai",
    logo: "https://enhancv.s3.amazonaws.com/company-logos-cache/sharpsell.ai.png",
    location: "Mumbai",
    role: "Principal Engineer",
    period: "Jan 2022 to Present",
    roles: [
      { title: "Principal Engineer", period: "May 2026 to Present" },
      { title: "Sr. Software Architect", period: "May 2024 to May 2026" },
      { title: "Software Architect", period: "Apr 2023 to May 2024" },
      { title: "Sr. Backend Engineer", period: "Jan 2022 to Apr 2023" },
    ],
    projects: [
      {
        name: "Pitchwiz",
        description:
          "Conversational roleplay and evaluation platform for sales training. Led end-to-end development of proctoring, script reading, multi-language support, and real-time video-based conversational AI.",
        stack: ["Pipecat", "Modal", "Daily", "LLMs", "Celery", "NLP"],
      },
      {
        name: "AI Agent Builder Framework",
        description:
          "Internal platform that lets developers, CS, and product teams ship agents without rebuilding the infrastructure each time. Built on the insight that agents differ only in their tools, system prompts, and context.",
        stack: ["LangGraph", "LangSmith", "MCP", "Python", "FastAPI"],
      },
      {
        name: "Voice Agents",
        description:
          "RAG-based voice agent for sales conversations. Grounds every response in retrieved source material and executes user-driven actions in real time.",
        stack: ["RAG", "Vector Search"],
      },
      {
        name: "Dynamic Presentation Engine",
        description:
          "Low-code builder of composable blocks that teams use to plug product features straight into client apps, without those features ever existing in the core Sharpsell platform. Cut client-specific delivery turnaround from months to days, and remains one of the foundational pieces that makes the platform adaptable to any client.",
        stack: ["Low-code", "Composable Architecture", "Python", "FastAPI"],
      },
      {
        name: "Core Service",
        description:
          "In-house authentication and authorisation service in Go, sitting behind every user and every request on the platform. Supports SSO, email and password, and phone OTP logins, with RBAC for access control. Scales to hundreds of requests per second.",
        stack: ["Go", "PostgreSQL", "Redis", "RabbitMQ", "JWT", "RBAC"],
      },
      {
        name: "Real-time Analytics Platform",
        description:
          "Analytics infrastructure built from scratch, carrying raw events through to usable insight in minutes.",
        stack: ["Apache Kafka", "Apache Flink", "ClickHouse", "Kubernetes", "Apache Superset"],
      },
      {
        name: "Sales Reels",
        description:
          "Short-form video platform for sharing the tacit knowledge locked inside an enterprise.",
        stack: ["MediaPipe", "LLMs", "FFmpeg", "AWS Lambda", "AWS MediaConvert"],
      },
      {
        name: "Trust & Data Compliance",
        description:
          "PII compliance across multiple microservices, bringing the platform in line with enterprise data security requirements.",
        stack: ["Python", "PostgreSQL", "Unleash (feature flag)", "Encryption"],
      },
    ],
  },
  {
    company: "Arya.ai",
    url: "https://arya.ai",
    logo: "https://enhancv.s3.amazonaws.com/company-logos-cache/arya.ai.png",
    location: "Mumbai",
    role: "Sr. ML Engineer",
    period: "Jul 2019 to Dec 2021",
    roles: [
      { title: "Sr. ML Engineer", period: "Jul 2020 to Dec 2021" },
      { title: "ML Engineer", period: "Jul 2019 to Jul 2020" },
    ],
    projects: [
      {
        name: "Life Insurance Underwriting Automation",
        description:
          "Deep learning system that automates underwriting decisions on life insurance proposals, cutting manual intervention across the pipeline.",
        stack: ["Python", "TensorFlow", "ETL", "Deep Learning"],
      },
      {
        name: "Underwriting Automation Module",
        description:
          "Tools and dashboards that let client teams control the automation flow and read the underwriting results themselves.",
        stack: ["Python", "Scikit-learn", "Dashboards", "ML"],
      },
    ],
  },
  {
    company: "difference-engine.ai",
    logo: "https://enhancv.s3.amazonaws.com/company-logos-cache/difference-engine.ai.png",
    location: "Mumbai",
    role: "Machine Learning Engineer",
    period: "Jun 2018 to Jul 2019",
    projects: [
      {
        name: "Credit Scoring Pipeline",
        description:
          "End-to-end credit scoring pipeline for a B2MicroSME lending platform, from raw OLTP data to a deployed scoring API.",
        stack: ["Python", "XGBoost", "CatBoost", "Airflow", "Flask", "Pandas"],
      },
      {
        name: "ML Across Domains",
        description:
          "Applied ML for multiple clients, spanning computer vision, OCR, and NLP problems.",
        stack: ["Python", "Mask R-CNN", "Tesseract", "NLP", "Scikit-learn"],
      },
    ],
  },
];

export const education = {
  institution: "University of Mumbai",
  degree: "B.E in Computer Science",
  period: "Aug 2014 to Jun 2018",
  cgpa: "8.8 CGPA",
};
