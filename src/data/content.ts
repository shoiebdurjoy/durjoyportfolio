export const siteUrl = 'https://durjoyportfolio.onrender.com';

export const profile = {
  name: 'Md Shoieb Hossain',
  nickname: 'Durjoy',
  email: 'shoiebdurjoy@gmail.com',
  location: 'Dhaka, Bangladesh',
  github: 'https://github.com/shoiebdurjoy',
  githubHandle: 'shoiebdurjoy',
  linkedin: 'https://www.linkedin.com/in/shoieb-durjoy-01a942234/',
  behance: 'https://www.behance.net/shoiebdurjoy9',
  resume: '/resume.pdf',
};

export const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Timeline', href: '#experience' },
  { label: 'Work', href: '#work' },
  { label: 'Stack', href: '#stack' },
  { label: 'Research', href: '#thesis' },
  { label: 'Videos', href: '#cutting-room' },
  { label: 'Contact', href: '#contact' },
];

export const stats = [
  { value: 3, suffix: '+', label: 'Years editing', detail: 'Think Big Brand, an international content agency: ads, shorts and talking-head videos for businesses.' },
  { value: 7, suffix: '+', label: 'Shipped repos', detail: 'Production AI (DurjoyAI), full-stack platforms (LowKeyBD) and deep learning research.' },
  { value: 2, suffix: 'nd', label: 'National place', detail: 'Runner-up in the Bangladesh Securities & Exchange Commission (BSEC) national competition.' },
  { value: 27, prefix: "'", label: 'BRAC CS', detail: 'B.S. in Computer Science, focused on backend architecture and machine learning.' },
];

export type Project = {
  id: string;
  title: string;
  short: string;
  tagline: string;
  category: string;
  year: string;
  overview: string;
  architecture: { title: string; flow: string[]; details: string };
  features: string[];
  stack: string[];
  github?: string;
  liveDemo?: string;
  tone: 'ink' | 'clay' | 'sage' | 'sky' | 'violet';
};

export const projects: Project[] = [
  {
    id: 'tbb',
    title: 'TBB Workspace',
    short: 'Video production workflow platform',
    tagline: 'A ClickUp-style workspace for video production, with a 10-stage QC pipeline, roles and a built-in assistant.',
    category: 'Full-Stack Platform',
    year: 'Flagship',
    overview:
      "TBB Workspace is the internal production workspace for Think Big Brand, built around how a video agency really works: client pipelines, editors, QC reviewers and revision rounds. It models Workspace → Space → Folder → List → Task → Subtask, runs every video through a 10-stage workflow with QC gating, and is backed by Supabase Postgres with row-level security so each role only sees and changes what it should. Built in 15 gated phases, with a documented roadmap, permission model and test strategy.",
    architecture: {
      title: 'Workspace, Workflow & Permissions Architecture',
      flow: ['React + Vite Client', 'Supabase Auth (roles)', 'PostgreSQL + Row-Level Security', 'Workflow & QC Engine', 'Comments, Activity & Notifications', 'Built-in Assistant'],
      details:
        'The typed React client talks to Supabase through TanStack Query. Roles (Owner, Admin, Manager, QC, Editor) are enforced in the database with RLS, not only in the UI, and every migration is exercised by an offline in-process Postgres test suite plus live checks. The workflow engine moves each video through the production stages, auto-assigning QC reviewers and counting revisions.',
    },
    features: [
      'Six-level hierarchy (Workspace to Subtask) that mirrors real client pipelines',
      '10-stage production workflow with QC gating, revision counters and role-based status rules',
      'List, board and table views, filters, and a global Ctrl+K command palette',
      'Threaded @mentions, timestamped video notes, activity log and notification centre',
      'Row-level security verified by an in-process Postgres suite and live tests',
      'Built-in assistant that understands plain English and runs changes with the manager’s own permissions, after confirmation, with no external AI service',
    ],
    stack: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Supabase', 'PostgreSQL', 'TanStack Query', 'Vitest'],
    github: 'https://github.com/shoiebdurjoy/workspace-manager',
    liveDemo: 'https://workspace-manager-five.vercel.app/login',
    tone: 'violet',
  },
  {
    id: 'durjoyai',
    title: 'DurjoyAI',
    short: 'Multi-LLM voice assistant',
    tagline: 'Amazon Alexa voice integration and multi-provider LLM orchestration with persistent Brain-0 memory.',
    category: 'Artificial Intelligence',
    year: 'AI',
    overview:
      'DurjoyAI is an intelligent personal AI assistant engineered with custom Amazon Alexa voice command integration, multi-model failover (OpenAI, Google Gemini, OpenRouter), and a persistent context architecture ("Brain 0"). Designed to execute automated PC scripts, process multimodal queries, and maintain long-term memory across voice sessions.',
    architecture: {
      title: 'Distributed Voice & LLM Architecture',
      flow: ['User Voice Command', 'Alexa Skill / Webhook', 'FastAPI Gateway', 'Multi-LLM Engine', 'Brain-0 Memory Context', 'PC Execution'],
      details:
        'Voice queries received via Amazon Alexa custom skills are dispatched through an authenticated webhook into a containerized FastAPI gateway. The gateway queries the Brain 0 profile database, routes to the optimal LLM dynamically, and triggers local script executions.',
    },
    features: [
      'Custom Amazon Alexa voice skill for hands-free command dispatch',
      'Multi-provider LLM failover (OpenAI, Google Gemini, OpenRouter)',
      'Persistent "Brain 0" memory context for long-term profile state',
      'Containerized deployment using Docker for reproducible environments',
    ],
    stack: ['TypeScript', 'Python', 'Docker', 'FastAPI', 'OpenAI API', 'Alexa Skills Kit'],
    github: 'https://github.com/shoiebdurjoy/DurjoyAI',
    tone: 'ink',
  },
  {
    id: 'lowkeybd',
    title: 'LowKeyBD',
    short: 'Full-stack platform',
    tagline: 'Scalable full-stack platform built with Next.js and enterprise NestJS microservices.',
    category: 'Full-Stack Platform',
    year: 'Platform',
    overview:
      'A full-stack ecosystem built using Next.js on the frontend and NestJS with PostgreSQL on the backend. Designed with high-concurrency capabilities, search infrastructure, session caching with Redis, and modular service separation.',
    architecture: {
      title: 'Full-Stack Microservice Pipeline',
      flow: ['Next.js Client', 'NestJS API Gateway', 'PostgreSQL DB', 'Redis Cache', 'Meilisearch'],
      details:
        'Frontend SSR/SSG queries the NestJS gateway over typed REST and WebSocket connections. Cached responses are served via Redis with full-text search handled by Meilisearch.',
    },
    features: [
      'Type-safe end-to-end architecture with TypeScript across client and server',
      'High-performance database indexing and relation modeling with PostgreSQL',
      'In-memory session and cache management powered by Redis',
      'Modern responsive design system with sub-second page transitions',
    ],
    stack: ['Next.js', 'NestJS', 'PostgreSQL', 'Redis', 'TypeScript', 'Tailwind CSS'],
    github: 'https://github.com/shoiebdurjoy/lowkeybd',
    tone: 'clay',
  },
  {
    id: 'emergon',
    title: 'EMERGON',
    short: 'Smart emergency dispatch',
    tagline: 'Real-time emergency coordination with automated risk triage and WebSocket alerts.',
    category: 'Real-time Systems',
    year: 'Systems',
    overview:
      'EMERGON is a full-stack emergency response coordination platform. Built with Flask and React, featuring real-time WebSocket alert dispatch, PostgreSQL audit logs, and AI risk-flagging to prioritize critical medical and rescue calls.',
    architecture: {
      title: 'Real-time Emergency Dispatch Architecture',
      flow: ['SOS Event', 'Flask Gateway', 'Socket.IO Server', 'PostgreSQL Logs', 'Responder Map'],
      details:
        'When an emergency trigger occurs, the platform calculates location coordinates, assigns priority scores via AI triage algorithms, and broadcasts WebSocket alerts to emergency responder dispatchers.',
    },
    features: [
      'Instant real-time event broadcasting using WebSockets (Socket.IO)',
      'Automated priority and severity triage based on incoming report metadata',
      'Location tracking and responsive emergency responder coordination map',
      'Secure PostgreSQL relational storage for incident history and auditing',
    ],
    stack: ['Flask', 'React', 'PostgreSQL', 'Socket.IO', 'Python', 'Tailwind CSS'],
    tone: 'sage',
  },
  {
    id: 'gamecritic',
    title: 'Game-Critic',
    short: 'Community review platform',
    tagline: 'Community video game reviews with dynamic scoring and user authentication.',
    category: 'Full-Stack Community',
    year: 'Community',
    overview:
      'Game-Critic is a community-driven game rating and review platform. Built with a React frontend and Node.js/Express backend with MongoDB, offering user authentication, review aggregation, and dynamic rating calculations.',
    architecture: {
      title: 'Review Aggregation Stack',
      flow: ['React Frontend', 'Express REST API', 'JWT Security', 'MongoDB Cluster'],
      details:
        'Users can search games, submit formatted reviews, and view weighted rating scores computed across community entries.',
    },
    features: [
      'Secure JWT-based user authentication and role management',
      'Dynamic rating aggregation and sorting algorithms',
      'Search and filter by genres, release year, and platforms',
      'Responsive interface optimized for desktop and mobile devices',
    ],
    stack: ['React', 'Node.js', 'Express', 'MongoDB', 'JavaScript'],
    github: 'https://github.com/shoiebdurjoy/Game-Critic',
    tone: 'sky',
  },
];

export type StackGroup = { key: string; title: string; blurb: string; items: { name: string; context: string }[] };

export const stackGroups: StackGroup[] = [
  {
    key: 'eng',
    title: 'Engineering',
    blurb: 'Backends, platforms and the infrastructure under them.',
    items: [
      { name: 'TypeScript', context: 'Primary language for DurjoyAI, LowKeyBD and web platforms' },
      { name: 'Python', context: 'AI pipelines, thesis research and FastAPI/Flask backends' },
      { name: 'Next.js', context: 'Full-stack framework for LowKeyBD and this portfolio' },
      { name: 'NestJS', context: 'Enterprise backend for LowKeyBD REST & WebSocket APIs' },
      { name: 'FastAPI', context: 'High-throughput async Python APIs for AI model serving' },
      { name: 'React', context: 'Component-driven UI across multiple platforms' },
      { name: 'Flask', context: 'REST API and Socket.IO engine for EMERGON' },
      { name: 'Supabase', context: 'Auth, Postgres and row-level security behind TBB Workspace' },
      { name: 'PostgreSQL', context: 'Primary relational database for EMERGON and LowKeyBD' },
      { name: 'Redis', context: 'In-memory caching and session store for LowKeyBD' },
      { name: 'Docker', context: 'Containerization across DurjoyAI and full-stack environments' },
      { name: 'Socket.IO', context: 'Real-time event dispatch for EMERGON emergency alerts' },
      { name: 'C++', context: 'Algorithms and data structures foundation at BRAC University' },
      { name: 'Git & Linux', context: 'Version control, shell scripting and server infrastructure' },
    ],
  },
  {
    key: 'ai',
    title: 'AI & ML',
    blurb: 'Models, voice interfaces and LLM orchestration.',
    items: [
      { name: 'PyTorch', context: 'Deep learning framework for the Bangla emotion recognition thesis' },
      { name: 'CUDA', context: 'GPU acceleration for training multimodal thesis models' },
      { name: 'OpenAI API', context: 'LLM engine integration and prompt orchestration in DurjoyAI' },
      { name: 'Alexa Skills', context: 'Voice command interface built for DurjoyAI PC control' },
    ],
  },
  {
    key: 'cut',
    title: 'Video & Motion',
    blurb: 'Cut, animate and deliver brand videos.',
    items: [
      { name: 'Premiere Pro', context: 'Primary NLE for 3+ years at Think Big Brand' },
      { name: 'After Effects', context: 'Motion graphics, titles and typography animation for ads' },
      { name: 'DaVinci Resolve', context: 'Colour correction and final delivery' },
      { name: 'CapCut', context: 'High-velocity short-form social content' },
    ],
  },
];

export const thesisStages = [
  {
    step: '01',
    title: 'Raw Bangla video & audio corpus',
    tag: 'Data acquisition',
    desc: 'Curation of authentic conversational Bangla video clips and speech recordings across diverse speaker demographics.',
    tech: ['Kaggle Datasets', 'Bangla Speech Corpus', 'Audio Segmentation'],
  },
  {
    step: '02',
    title: 'Preprocessing & temporal alignment',
    tag: 'Signal normalization',
    desc: 'Extracting video frames, normalizing audio sample rates to 16kHz, noise reduction, and aligning visual facial crops with acoustic frames.',
    tech: ['FFmpeg', 'Audio Normalization', 'Face Bounding Crops'],
  },
  {
    step: '03',
    title: 'Multimodal feature extraction',
    tag: 'Dual feature space',
    desc: 'Extracting Mel-Frequency Cepstral Coefficients (MFCC), chromagrams, and visual spatial features from frame sequences simultaneously.',
    tech: ['Librosa', 'Mel-Spectrograms', 'OpenCV Spatial Embeddings'],
  },
  {
    step: '04',
    title: 'Cross-modal attention fusion',
    tag: 'PyTorch / CUDA model',
    desc: 'Training multimodal neural networks that fuse acoustic temporal embeddings with visual facial action representations via cross-attention.',
    tech: ['PyTorch', 'CUDA Acceleration', 'Cross-Attention Layer'],
  },
  {
    step: '05',
    title: 'Emotion classification inference',
    tag: 'Prediction engine',
    desc: 'Softmax classification predicting Bangla emotional state (Happy, Sad, Angry, Fear, Neutral) with high precision and F1 confidence.',
    tech: ['Softmax Classifier', 'Confusion Matrix Evaluation', 'F1 Metrics'],
  },
];

export const behanceProjects = ['254329919', '246267417', '208647901', '237032839', '254329497'];

export const featuredRepos = [
  { name: 'DurjoyAI', desc: 'Alexa-powered modular assistant with Brain-0 memory context', lang: 'TypeScript' },
  { name: 'lowkeybd', desc: 'Full-stack platform on Next.js and NestJS microservices', lang: 'TypeScript' },
  { name: 'Game-Critic', desc: 'Community game review and aggregation platform', lang: 'JavaScript' },
  { name: 'Alexa-PC-Control', desc: 'Voice-controlled PC execution scripts and skill handler', lang: 'Python' },
];
