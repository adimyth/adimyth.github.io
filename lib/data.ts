export const profile = {
  name: "Aditya Mishra",
  title: "Sr. Technical Architect & AI Engineer",
  tagline:
    "8+ years building production AI systems end-to-end, from classical ML and NLP to Generative AI, LLM-powered applications, and Agentic AI.",
  about: [
    "I bring both AI fundamentals and the Systems Engineering depth to take models from prototype to production; working across data pipelines, APIs, infrastructure, and model integration trade-offs.",
    "I have shipped AI products that scale to hundreds of concurrent users and integrate into enterprise systems where reliability, latency, and cost actually matter.",
  ],
  email: "mishraaditya6991@gmail.com",
  phone: "+91 9029080380",
  github: "https://github.com/adimyth",
  linkedin: "https://www.linkedin.com/in/aditya-mishra-b50623138/",
  twitter: "https://x.com/adi_myth",
  // Google Drive export: make sure the doc is set to "Anyone with the link can view"
  resumeUrl:
    "https://docs.google.com/document/d/1D80Skf82RIrlK2Hzr0n4y1Mfm0AwMi1D96fB4jzdMQE/export?format=pdf",
};

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
    items: [
      "MLOps",
      "Distributed Systems",
      "Data Engineering",
      "Monitoring & Observability",
    ],
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
          "AI-powered conversational roleplay platform for sales training. Led end-to-end development of proctoring, script reading, multi-language support, and real-time video-based conversational AI.",
        highlights: [
          "Scaled to 100K+ roleplays per month and up to 500 concurrent sessions",
          "Shaped proctoring and script reading features based on on-ground usage; users were gaming scores without them",
          "Added multi-language support for non-English-fluent sales reps who struggled with evaluation setup",
        ],
        stack: ["Pipecat", "Modal", "Daily", "LLMs", "Celery", "NLP"],
      },
      {
        name: "AI Agent Builder Framework",
        description:
          "Internal platform enabling developers, CS, and product teams to build and ship agents without reinventing infrastructure. Built on the insight that agents differ only in tools, system prompts, and context.",
        highlights: [
          "Built agent harness with model fallback, retries, context compaction, rate limiting, memory, and sub-agent composition",
          "Integrated MCP support with filtered tool exposure per agent to preserve context window and reduce noise",
          "Added safety middleware covering prompt injection detection, PII redaction, output sanitisation, and platform-specific guardrails",
        ],
        stack: ["LangGraph", "LangSmith", "MCP", "Python", "FastAPI"],
      },
      {
        name: "Voice Agents",
        description:
          "RAG-based voice agent for sales conversations delivering factually grounded responses and executing user-driven actions in real time.",
        highlights: [
          "Built retrieval pipeline over product knowledge bases with vector search, grounding all responses in client-approved content",
          "Integrated inline action execution (quote generation, poster sharing) within live conversations",
          "Designed for real-time latency constraints across STT, LLM, and TTS with full observability",
        ],
        stack: ["RAG", "Vector Search", "STT", "TTS", "LLMs", "Pipecat"],
      },
      {
        name: "Core Service",
        description:
          "In-house authentication and authorisation service in Go, powering every user and every request across the platform.",
        highlights: [
          "Supports phone-OTP, email-password, SSO (SAML and OAuth2.0), and custom login flows with JWT and API key issuance",
          "Flexible RBAC model with Super Admin, Company Admin, App User, and client-defined custom roles governing access across the platform",
          "Engineered in Go for sub-millisecond latency, sitting on the critical path of every authenticated request",
        ],
        stack: ["Go", "PostgreSQL", "Redis", "RabbitMQ", "JWT", "RBAC"],
      },
      {
        name: "Real-time Analytics Platform",
        description:
          "End-to-end analytics infrastructure built from the ground up, from raw events to actionable insights in under a few minutes.",
        highlights: [
          "Real-time data processing pipelines using Kafka, Flink, and ClickHouse delivering insights within minutes of raw events",
          "Designed full data sourcing, ETL pipelines, queuing, retries, observability, and scheduling",
          "Integrated customised Apache Superset dashboards into both the customer app and admin panel",
        ],
        stack: ["Apache Kafka", "Apache Flink", "ClickHouse", "Kubernetes"],
      },
      {
        name: "Sales Reels",
        description:
          "Short-form video platform solving tacit knowledge sharing in enterprises.",
        highlights: [
          "Built social engagement features (likes, shares, click tracking) and content performance analytics for creators",
          "Added AI-powered content enhancements including tag generation, summarisation, and title suggestions",
          "Built admin content moderation and approval workflow with user rewards for approved content",
        ],
        stack: ["MediaPipe", "LLMs", "FFmpeg", "AWS Lambda", "AWS MediaConvert"],
      },
      {
        name: "Trust & Data Compliance",
        description:
          "PII compliance across multiple microservices to meet enterprise data security requirements.",
        highlights: [
          "Designed custom encryption-at-rest for PII fields across services, protecting data even in the event of a breach",
          "Introduced field masking alongside encryption to preserve search, filter, and sort on sensitive fields",
          "Used Unleash feature flags for controlled, reversible rollout across all services",
        ],
        stack: ["Python", "PostgreSQL", "Unleash", "Encryption"],
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
        highlights: [
          "Built ETL pipeline for schema transformation from OLTP to analytics-ready format",
          "Developed deep learning model flagging proposals for approval, rejection, or human review",
          "Significantly reduced manual intervention and processing time across the underwriting pipeline",
        ],
        stack: ["Python", "TensorFlow", "ETL", "Deep Learning"],
      },
      {
        name: "Underwriting Automation Module",
        description:
          "Tools and dashboards for controlling automation flow and visualising underwriting results for client teams.",
        highlights: [
          "Created early claims detection models integrated into the core decision pipeline",
          "Designed decision systems combining results from Automation and Claims Detection modules",
          "Worked directly with clients to integrate the module into their existing systems",
        ],
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
        highlights: [
          "Built OLTP to OLAP ETL with Airflow orchestration and tree-based ensembles (XGBoost, CatBoost)",
          "Automated digital marketing report generation processing 130GB+ data and producing 34K+ reports in 6 hours",
          "Deployed as a Flask API with JWT auth and maintained CI/CD via CircleCI with full pytest coverage",
        ],
        stack: ["Python", "XGBoost", "CatBoost", "Airflow", "Flask", "Pandas"],
      },
      {
        name: "ML Across Domains",
        description:
          "Applied ML across diverse problem domains for multiple clients.",
        highlights: [
          "Student churn prediction from engagement signals",
          "PAN card OCR using Mask R-CNN and Tesseract",
          "Supreme Court judgment annotation tool covering 1950 to 2019",
        ],
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
