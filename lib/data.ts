export const profile = {
  name: "Aditya Mishra",
  title: "Sr. Technical Architect & AI Engineer",
  tagline:
    "8+ years building AI systems that are scalable, reliable, and extensible - from classical ML and NLP to Generative AI, LLM-powered applications, and Agentic AI.",
  about:
    "I bring both AI fundamentals and the Systems Engineering depth to take models from prototype to production, working across data pipelines, APIs, infrastructure, and model integration trade-offs.",
  email: "mishraaditya6991@gmail.com",
  phone: "+91 9029080380",
  github: "https://github.com/adimyth",
  linkedin: "https://www.linkedin.com/in/aditya-mishra-b50623138/",
  twitter: "https://x.com/adi_myth",
};

// Google Drive export: make sure each doc is set to "Anyone with the link can view"
export const resumes = [
  {
    role: "AI Engineer",
    description:
      "Focused on LLM applications, agentic systems, RAG pipelines, voice AI, and MLOps. Best for AI-first product companies and research-adjacent roles.",
    url: "https://docs.google.com/document/d/1D80Skf82RIrlK2Hzr0n4y1Mfm0AwMi1D96fB4jzdMQE/export?format=pdf",
  },
  {
    role: "Software Architect",
    description:
      "Focused on distributed systems, platform engineering, real-time data infrastructure, and service design. Best for engineering leadership and architecture roles.",
    url: "https://docs.google.com/document/d/1elIzqrNWsiYgRUR1LO7hxAseqMiABf0AL6t5GV8Nbuk/export?format=pdf",
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

export const experience = [
  {
    company: "Sharpsell.ai",
    url: "https://sharpsell.ai",
    logo: "https://enhancv.s3.amazonaws.com/company-logos-cache/sharpsell.ai.png",
    location: "Mumbai",
    role: "Sr. Technical Architect",
    period: "Jan 2022 to Present",
    projects: [
      {
        name: "Pitchwiz",
        description:
          "AI-powered conversational roleplay platform & evaluation for sales training. Led end-to-end development of proctoring, script reading, multi-language support, and real-time video-based conversational AI.",
        stack: ["Pipecat", "Modal", "Daily", "LLMs", "Celery", "NLP"],
      },
      {
        name: "AI Agent Builder Framework",
        description:
          "Internal platform enabling developers, CS, and product teams to build and ship agents without reinventing infrastructure. Built on the insight that agents differ only in tools, system prompts, and context.",
        stack: ["LangGraph", "LangSmith", "MCP", "Python", "FastAPI"],
      },
      {
        name: "Voice Agents",
        description:
          "RAG-based voice agent for sales conversations delivering factually grounded responses and executing user-driven actions in real time.",
        stack: ["RAG", "Vector Search"],
      },
      {
        name: "Dynamic Presentation Engine",
        description:
          "Low-code tool builder system providing composable blocks that teams use to build and plug product features directly into client apps, without those features needing to exist in the core Sharpsell platform. Reduced client-specific delivery turnaround from months to days, it forms one of the foundational components that makes the platform adaptable to any client.",
        stack: ["Low-code", "Composable Architecture", "Python", "FastAPI"],
      },
      {
        name: "Core Service",
        description:
          "In-house authentication and authorisation service in Go, powering every user and every request across the platform. Supports SSO, Email-password, Phone-OTP login types and RBAC for access control. Scales to hundreds of requests per second.",
        stack: ["Go", "PostgreSQL", "Redis", "RabbitMQ", "JWT", "RBAC"],
      },
      {
        name: "Real-time Analytics Platform",
        description:
          "End-to-end analytics infrastructure built from the ground up, from raw events to actionable insights in under a few minutes.",
        stack: ["Apache Kafka", "Apache Flink", "ClickHouse", "Kubernetes", "Apache Superset"],
      },
      {
        name: "Sales Reels",
        description:
          "Short-form video platform solving tacit knowledge sharing in enterprises.",
        stack: ["MediaPipe", "LLMs", "FFmpeg", "AWS Lambda", "AWS MediaConvert"],
      },
      {
        name: "Trust & Data Compliance",
        description:
          "PII compliance across multiple microservices to meet enterprise data security requirements.",
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
    projects: [
      {
        name: "Life Insurance Underwriting Automation",
        description:
          "Deep learning system automating underwriting decisions for life insurance proposals, reducing manual intervention across the pipeline.",
        stack: ["Python", "TensorFlow", "ETL", "Deep Learning"],
      },
      {
        name: "Underwriting Automation Module",
        description:
          "Tools and dashboards for controlling automation flow and visualising underwriting results for client teams.",
        stack: ["Python", "Scikit-learn", "Dashboards", "ML"],
      },
    ],
  },
  {
    company: "difference-engine.ai",
    url: "#",
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
          "Applied ML across diverse problem domains for multiple clients.",
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

export const certifications = [
  {
    name: "OCPJP Oracle Certified Professional Java SE 6 Programmer",
    issuer: "Oracle",
    year: "2017",
    score: "92%",
  },
];

export const blogs = [
  {
    title: "Boost your Image Classification Model",
    url: "https://medium.com/@adi_myth/boost-your-image-classifier-e1cc7a56b59c",
    publication: "Medium",
    date: "May 2019",
    description:
      "Techniques for improving deep learning image classifier accuracy: progressive resizing, transfer learning, mixup augmentation, and test-time augmentation.",
  },
  {
    title: "Metrics to Evaluate Your Machine Learning Algorithm",
    url: "https://towardsdatascience.com/metrics-to-evaluate-your-machine-learning-algorithm-f10ba6e38234",
    publication: "Towards Data Science",
    date: "2019",
    description:
      "A practical guide to the most important evaluation metrics for ML models and when to use each one.",
  },
  {
    title: "Training a Deep Learning Model on Handwritten Characters using Keras",
    url: "https://medium.com/programmersclub/training-a-deep-learning-model-on-handwritten-characters-using-keras-4bad2124a6e1",
    publication: "ProgrammersClub",
    date: "Jan 2018",
    description:
      "Building a labeled dataset from handwritten character images and training a deep learning model with Keras from scratch.",
  },
];
