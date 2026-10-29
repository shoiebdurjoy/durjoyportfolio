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
  { value: 2, suffix: 'nd', label: 'National place', detail: 'Second Prize in the Bangladesh Securities & Exchange Commission (BSEC) national financial-literacy short-video competition.' },
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
  tone: 'ink' | 'clay' | 'sage' | 'sky' | 'violet' | 'mint';
  // Recruiter-facing summary: the problem, what was built, and checkable proof.
  problem?: string;
  built?: string;
  proof?: string[];
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
    problem: 'A video agency moves every edit from raw footage to client delivery through QC sign-off, revisions and many hands. Generic task tools don’t know that workflow.',
    built: 'A full-stack production workspace modelled on Think Big Brand’s real pipeline, built from the editor’s chair: 10-stage QC workflow, roles enforced by the database, and a plain-English assistant.',
    proof: ['Live on Vercel', 'Public repo, 60+ commits', '15-phase gated roadmap', 'RLS-tested permissions'],
  },
  {
    id: 'baeky',
    title: 'Baeky',
    short: 'Money agreements app · in progress',
    tagline: 'A Flutter app for borrowing and lending between friends: agree, track, remind, pay, confirm.',
    category: 'Mobile App',
    year: 'In progress',
    overview:
      'Baeky makes borrowing and lending money between friends, family and trusted contacts clear and accountable. Users connect with friends, chat, and create digital agreements called Gigs that record the amount, repayment date, payment method (such as bKash or a bank card) and photo evidence. Both sides get due-date reminders and a clean history, instead of relying on scattered chats, screenshots or memory. Baeky is not a bank or wallet: it records agreements and payments made outside the app. Android first, iOS ready.',
    architecture: {
      title: 'Agreement Lifecycle & Backend Architecture',
      flow: ['Flutter App (Riverpod)', 'FastAPI Modular Monolith', 'PostgreSQL (exact money math)', 'Redis Chat & Rate Limits', 'Reminder Scheduler', 'Push Notifications (FCM)'],
      details:
        'Every agreement follows Agree → Track → Remind → Pay → Confirm → Complete. Amounts are stored as exact decimals, repayments are confirmed by the lender with row locking so a payment can never be confirmed twice, and a durable Asia/Dhaka reminder scheduler deduplicates reminders with PostgreSQL advisory locks.',
    },
    features: [
      'Gigs: money agreements with amount, due date, payment method and photo proof',
      'Friends, profiles and real-time 1-to-1 chat (WebSockets + Redis)',
      'Due-date reminders, notification centre and push notifications',
      'Dashboard showing what you owe, what you are owed and your net balance',
      'Argon2id sign-in with rotating refresh tokens and theft detection',
      'Private proof uploads with file verification and participant-only access',
    ],
    stack: ['Flutter', 'Dart', 'Riverpod', 'FastAPI', 'Python', 'PostgreSQL', 'Redis', 'Firebase'],
    tone: 'mint',
    problem: 'Money lent between friends lives in chats, screenshots and memory, so repayments get missed and conversations get awkward.',
    built: 'A Flutter + FastAPI app where both people agree on a Gig with amount, due date, payment method and proof, then get reminders until it’s repaid and confirmed.',
    proof: ['201 backend tests', '114 mobile tests', 'Android build verified', 'Exact-decimal money math'],
  },
  {
    id: 'durjoyai',
    title: 'DurjoyAI',
    short: 'Multi-LLM voice assistant',
    tagline: 'Amazon Alexa voice integration and multi-provider LLM orchestration with persistent Brain-0 memory.',
    category: 'Artificial Intelligence',
    year: 'AI',
    overview:
      'DurjoyAI is a personal AI assistant with an Amazon Alexa voice front end. A TypeScript / Express backend verifies every Alexa request, keeps a persistent "Brain 0" profile and memory so the assistant remembers who it is talking to, and routes questions through a provider layer that supports OpenAI, Gemini and OpenRouter — with automatic model failover through OpenRouter.',
    architecture: {
      title: 'Voice → LLM Architecture',
      flow: ['Alexa Voice Command', 'Signed Alexa Webhook', 'Express API (TypeScript)', 'Brain 0 Memory (SQLite)', 'LLM Provider Layer', 'Spoken Answer'],
      details:
        'Alexa requests hit a signature-verified webhook on an Express server. The service loads the user’s Brain 0 context, picks the configured LLM provider (OpenAI, Gemini or OpenRouter), and falls back across models via OpenRouter if one fails. Containerised with Docker. PC control lives in the companion Alexa-PC-Control project.',
    },
    features: [
      'Custom Amazon Alexa skill with request-signature verification',
      'Provider layer over OpenAI, Gemini and OpenRouter, with model failover',
      'Persistent "Brain 0" memory for long-term user context',
      'Containerised with Docker for reproducible deploys',
    ],
    stack: ['TypeScript', 'Node.js', 'Express', 'SQLite', 'Docker', 'OpenRouter', 'Alexa Skills Kit'],
    github: 'https://github.com/shoiebdurjoy/DurjoyAI',
    tone: 'ink',
    problem: 'Everyday AI help is split across apps and forgets who you are between conversations.',
    built: 'A voice assistant with a provider layer over OpenAI, Gemini and OpenRouter, a persistent “Brain 0” memory, and a signature-verified Alexa webhook as its voice front end.',
    proof: ['Public repo', 'Multi-LLM failover', 'Signed Alexa webhook', 'Dockerised'],
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
    problem: 'In an emergency, requests, responders and locations end up scattered across calls and messages.',
    built: 'With a four-person team: real-time Socket.IO coordination, automated Twilio SMS alerts and live Google Maps locations for each request.',
    proof: ['Team of 4', 'Backend on Render', 'Frontend on Vercel', 'Real-time WebSockets'],
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
      { name: 'FastAPI', context: 'Async Python backend for Baeky' },
      { name: 'Flutter', context: 'Cross-platform mobile client for Baeky (Android first, iOS ready)' },
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

// Covers live in /public/videos/<id>.webp (the shorts are vertical, letterboxed in a 4:3 frame).
export const videos = [
  { id: '246267417', title: 'Talking Head', kind: 'Talking head' },
  { id: '208647901', title: 'Fitness', kind: 'Brand short' },
  { id: '254329919', title: 'Piercing', kind: 'Ad' },
  { id: '237032839', title: 'Promotional Music Video', kind: 'Promo' },
  { id: '254329497', title: 'Tattoo', kind: 'Brand short' },
];

// The 30-second recruiter view. Every line is checkable against the résumé or a repo.
export const quickView = {
  role: 'Software engineer (full-stack & AI) who also edits brand video',
  lookingFor: 'Software engineering roles (full-stack, AI) and brand video projects',
  location: 'Dhaka, Bangladesh · open to remote',
  education: 'B.S. Computer Science, BRAC University · expected 2027',
  experience: 'Video Editor (part-time), Think Big Brand · 2023 – present',
  highlight: '2nd place, BSEC national financial-literacy short-video competition (Apr 2026) · IBM Introduction to DevOps certificate (Jun 2026)',
  skills: [
    ['Languages', 'TypeScript, Python, JavaScript, SQL, Dart'],
    ['Engineering', 'React, Next.js, Flutter, FastAPI, Flask, NestJS, Supabase, PostgreSQL, Redis, Docker'],
    ['AI', 'PyTorch, CUDA, OpenAI / Gemini / OpenRouter APIs, Alexa Skills'],
    ['Video', 'Premiere Pro, After Effects, DaVinci Resolve, CapCut'],
  ] as const,
  topWork: ['tbb', 'baeky', 'durjoyai'],
};

export const featuredRepos = [
  { name: 'DurjoyAI', desc: 'Alexa-powered modular assistant with Brain-0 memory context', lang: 'TypeScript' },
  { name: 'lowkeybd', desc: 'Full-stack platform on Next.js and NestJS microservices', lang: 'TypeScript' },
  { name: 'Game-Critic', desc: 'Community game review and aggregation platform', lang: 'JavaScript' },
  { name: 'Alexa-PC-Control', desc: 'Windows agent that lets Alexa control a PC', lang: 'C#' },
];

// Certificates shown as real documents. Proof says honestly what the evidence on screen is.
export type CertificateProof = 'verifiable' | 'photo' | 'pending';

export type Certificate = {
  id: 'bsec' | 'ibm-devops' | 'brac-webdev';
  index: string;
  track: 'Video' | 'Engineering';
  kind: string;
  title: string;
  issuer: string;
  context: string;
  issued?: { label: string; iso: string };
  proof: CertificateProof;
  verifyUrl?: string;
  credentialId?: string;
  note?: string;
  provenance?: string;
  listedOn?: { label: string; href: string };
  image?: { src: string; width: number; height: number; alt: string; optimize: boolean };
};

export const certificates: Certificate[] = [
  {
    id: 'bsec',
    index: '01',
    track: 'Video',
    kind: 'Certificate of Achievement',
    title: 'Second Prize Award',
    issuer: 'Bangladesh Securities and Exchange Commission (BSEC)',
    context: 'National financial-literacy short-video competition · Category 3 · Team Akatsuki, BRAC University',
    issued: { label: '12 Apr 2026', iso: '2026-04-12' },
    proof: 'photo',
    note: 'A national award for a short video, where the editing side of my work met a cause.',
    provenance: 'Photo of the original printed certificate, shown at its full resolution (569 × 426). No online verification is available for this award.',
    image: {
      src: '/certificates/bsec-second-prize.webp',
      width: 569,
      height: 426,
      alt: 'Photo of the BSEC Certificate of Achievement, Second Prize Award, Team Akatsuki from BRAC University, dated 12 April 2026',
      optimize: false,
    },
  },
  {
    id: 'ibm-devops',
    index: '02',
    track: 'Engineering',
    kind: 'Course certificate',
    title: 'Introduction to DevOps',
    issuer: 'IBM · offered through Coursera',
    context: 'DevOps fundamentals, CI/CD, automation, agile and collaboration',
    issued: { label: '26 Jun 2026', iso: '2026-06-26' },
    proof: 'verifiable',
    verifyUrl: 'https://coursera.org/verify/JXZIU8WIU3AX',
    credentialId: 'JXZIU8WIU3AX',
    note: 'Taken alongside my CS degree: the pipeline side of shipping software.',
    provenance: 'Coursera hosts the official record. The same verification link is printed on the certificate, bottom right.',
    image: {
      src: '/certificates/ibm-devops.webp',
      width: 1600,
      height: 1228,
      alt: 'Coursera course certificate for Introduction to DevOps, an online course authorized by IBM, dated 26 June 2026',
      optimize: true,
    },
  },
  {
    id: 'brac-webdev',
    index: '03',
    track: 'Engineering',
    kind: 'Certification',
    title: 'Web Development (Advanced Level)',
    issuer: 'BRAC University',
    context: 'The certificate scan will be added here.',
    proof: 'pending',
    listedOn: { label: 'Résumé', href: profile.resume },
  },
];
