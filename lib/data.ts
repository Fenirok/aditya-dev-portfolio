// All site content lives here. Edit this file to update the portfolio.

export const site = {
  name: "Aditya Halder",
  title: "Aditya Halder",
  role: "Mobile App Developer",
  // business inbox – "Say Hello" opens the visitor's mail app with this in the To field
  email: "adityahalder.business@gmail.com",
  upwork: "https://www.upwork.com/freelancers/~01b80dc0089b0e22c7",
  location: "Kolkata, India",
  resume: "/resume.pdf",
  tagline: "I build apps for Android",
  intro:
    "I’m a mobile app developer specializing in building production-grade Android and cross-platform apps with Flutter and Kotlin. Currently, I’m shipping real-time, client-facing features at WhatBytes.",
  // Put a photo at public/me.jpg and set this to "/me.jpg"
  photo: "/me.jpg" as string,
};

export type Social = {
  name: "GitHub" | "LinkedIn" | "Medium" | "YouTube" | "X";
  handle: string;
  url: string;
  blurb: string;
};

export const socials: Social[] = [
  {
    name: "GitHub",
    handle: "@Fenirok",
    url: "https://github.com/Fenirok",
    blurb: "Code, experiments, and open-source projects — most recently pushed first.",
  },
  {
    name: "LinkedIn",
    handle: "in/aditya--halder",
    url: "https://www.linkedin.com/in/aditya--halder/",
    blurb: "Internships, work updates, and posts about building apps in public.",
  },
  {
    name: "Medium",
    handle: "@aditya-halder",
    url: "https://medium.com/@aditya-halder",
    blurb: "Blogs on careers, open source, and lessons from building software.",
  },
  {
    name: "YouTube",
    handle: "@scriptrok",
    url: "https://www.youtube.com/@scriptrok",
    blurb: "ScriptRok — Flutter tutorials, dev vlogs, and coding shorts.",
  },
  {
    name: "X",
    handle: "@what_a_aditya",
    url: "https://x.com/what_a_aditya",
    blurb: "Quick thoughts on dev life, Flutter, and tech.",
  },
];

export const navLinks = [
  { name: "About", url: "#about" },
  { name: "Experience", url: "#jobs" },
  { name: "Work", url: "#projects" },
  { name: "Beyond", url: "#beyond" },
  { name: "Socials", url: "#socials" },
  { name: "Contact", url: "#contact" },
];

export const about = {
  lead: "Hi, I’m Aditya a Software Engineer obsessed with mobile app development.",
  paragraphs: [
    "I started my journey as a mobile app developer by learning Flutter, and over time, I expanded into Native Android development to get closer to the platform. From there, I dove into backend engineering building with frameworks like Spring Boot and Django and got hands on with AI/ML integrations because, obviously, it’s the AI era!",
    "Right now, I’m using AI to accelerate how fast I learn not to skip the fundamentals. I’m constantly digging deeper into clean architecture and core software engineering so I can build real, original depth the kind where AI learns from me, not the other way around.",
  ],
  skills: [
    "Flutter & Dart",
    "Kotlin & Jetpack Compose",
    "BLoC / Cubit / Riverpod",
    "Clean Architecture & MVVM",
    "REST & GraphQL",
    "Spring Boot & PostgreSQL",
  ],
};

export type Job = {
  company: string;
  title: string;
  url?: string;
  range: string;
  location: string;
  points: string[];
};

export const jobs: Job[] = [
  {
    company: "WhatBytes",
    title: "App Developer Intern",
    range: "May 2026 — Present",
    location: "Remote",
    points: [
      "Developed and maintained production Flutter applications using BLoC/Cubit, Clean Architecture, and REST API integrations.",
      "Implemented real-time communication using WebRTC and WebSockets, alongside native platform integrations and notification workflows.",
      "Collaborated with clients, backend developers, and technical leads to clarify requirements, refine UI/UX, and deliver improvements.",
      "Coordinated fellow developers, resolved technical issues, and contributed to code reviews, testing, CI/CD workflows, and production releases.",
    ],
  },
  {
    company: "Advertyzement",
    title: "Flutter Developer Intern",
    range: "Sep 2025 — May 2026",
    location: "Remote",
    points: [
      "Developed and maintained production Flutter features across Android and iOS, focusing on responsive UI and consistent cross-platform behavior.",
      "Integrated GraphQL APIs with caching, loading states, and error handling while collaborating with backend engineers to ensure reliable data integration.",
    ],
  },
  {
    company: "SSoC",
    title: "Project Admin @ Source Summer of Code",
    range: "Season 4",
    location: "Open Source",
    points: [
      "Mentored contributors on open-source development and guided their project contributions.",
      "Reviewed pull requests and supported contributors throughout the development process.",
    ],
  },
];

export type Project = {
  title: string;
  description: string;
  tech: string[];
  github?: string;
  external?: string;
  /** Google Play store listing */
  playStore?: string;
  // Put a screenshot at public/projects/<name>.png and set e.g. "/projects/monepurse.png"
  image?: string;
  year: string;
};

export const featuredProjects: Project[] = [
  {
    title: "MonePurse",
    year: "2026",
    description:
      "A native Android finance and portfolio app built end-to-end. Intuitive UI with custom animations, Google Sign-In, and biometric authentication, backed by clean, modular networking and state management.",
    tech: ["Kotlin", "Jetpack Compose", "MVVM", "Hilt", "Retrofit", "Coroutines", "StateFlow"],
    github: "https://github.com/Fenirok/monepurse",
  },
  // Medtales – hidden for now; uncomment to show it again (between MonePurse and Octaraa).
  // {
  //   title: "Medtales",
  //   year: "2026",
  //   description:
  //     "A medical-learning app with Learn modules — curriculum navigation, lesson flows, quizzes, and backend-driven content. I refactored chat, feed, and profile experiences, built student-specific onboarding and follow features, and hardened auth, notifications, and socket lifecycle.",
  //   tech: ["Flutter", "Dart", "BLoC", "Clean Architecture", "REST APIs", "WebSockets"],
  // },
  {
    title: "Octaraa",
    year: "2026",
    description:
      "An investment platform featuring risk assessment questionnaires with scoring, plus APIs for profiles, family members, financial goals, and household investments — with polished onboarding and mutual fund interfaces.",
    tech: ["Flutter", "BLoC", "Clean Architecture", "REST APIs", "WebSockets"],
    playStore: "https://play.google.com/store/apps/details?id=com.octaraa.wealth",
  },
  {
    title: "Neurovice",
    year: "2026",
    description:
      "My final year project: an assessment platform with Spring Boot and PostgreSQL services, plus a FastAPI ML inference service using XGBoost to compute probabilistic risk scores — all integrated through a decoupled REST architecture.",
    tech: ["Spring Boot", "PostgreSQL", "FastAPI", "XGBoost"],
    external: "https://neurovice.vercel.app/",
  },
  {
    title: "Infinity Age Scroller",
    year: "2025",
    description:
      "An open-source Flutter package I designed and published on pub.dev — a smooth, scroll-based age picker built from reusable widgets with clean Dart architecture, documentation, and usage examples.",
    tech: ["Dart", "Flutter", "Open Source", "pub.dev"],
    external: "https://pub.dev/packages/infinity_age_scroller",
  },
];

export const otherProjects: Project[] = [
  {
    title: "RootBook",
    year: "2026",
    description:
      "A contacts and calling app with native Kotlin multi-call features bridged to Flutter via MethodChannels, plus call history, grouping, and Firebase Crashlytics.",
    tech: ["Kotlin", "Flutter", "MethodChannels", "Firebase"],
    playStore: "https://play.google.com/store/apps/details?id=com.rootbook.app",
  },
  {
    title: "AgroKart",
    year: "2025",
    description:
      "A farmer e-commerce app with YOLO-based product image validation, price negotiation workflows, and PostgreSQL-backed APIs. Presented at DoSIER 2025.",
    tech: ["Flutter", "Spring Boot", "PostgreSQL", "YOLO"],
    github: "https://github.com/Fenirok/farmconnect",
  },
  {
    title: "Academic Question Generator",
    year: "2025",
    description:
      "An AI-powered tool that generates customized academic questions and answers by topic, marks, and content type using prompt engineering.",
    tech: ["Python", "Streamlit", "LangChain", "Hugging Face"],
    github: "https://github.com/Fenirok/QAChatbot",
  },
  {
    title: "Dating App",
    year: "2025",
    description:
      "A cross-platform dating app with Supabase auth, PostgreSQL storage, and interactive Rive and Lottie animations.",
    tech: ["Flutter", "Supabase", "Provider", "Rive"],
    github: "https://github.com/Fenirok/dating_app2",
  },
  {
    title: "QuakeTrace",
    year: "2024",
    description:
      "Real-time earthquake data from the USGS API, visualized across regions with Provider-based state management.",
    tech: ["Flutter", "Provider", "USGS API"],
    github: "https://github.com/Fenirok/Earthquake_app",
  },
];

// Hero "What I work on" card
export const layers = [
  {
    key: "Flutter apps",
    label: "Application",
    title: "Cross-platform apps with Flutter",
    body: "Production Flutter apps for Android and iOS — BLoC/Cubit, Clean Architecture, real-time chat & calls over WebRTC and WebSockets, and polished, responsive UI.",
    tags: ["Flutter", "Dart", "BLoC", "WebRTC"],
    link: { label: "View Flutter work", url: "#projects" },
  },
  {
    key: "Native Android",
    label: "Platform",
    title: "Native Android with Kotlin",
    body: "Jetpack Compose apps end-to-end, plus native calling, contacts, and permissions bridged into Flutter through MethodChannels.",
    tags: ["Kotlin", "Compose", "Hilt", "Coroutines"],
    link: { label: "See MonePurse & RootBook", url: "#projects" },
  },
  {
    key: "Backend & APIs",
    label: "Services",
    title: "Backends, APIs & ML services",
    body: "Spring Boot and PostgreSQL services, FastAPI ML inference, and GraphQL/REST integrations with caching, loading, and error states.",
    tags: ["Spring Boot", "PostgreSQL", "GraphQL", "FastAPI"],
    link: { label: "See Neurovice", url: "#projects" },
  },
];

// "Beyond the code" rows
export type Row = { date: string; title: string; subtitle: string; url?: string };

export const recognition: Row[] = [
  {
    date: "2025",
    title: "DoSIER 2025 · Springer Conference",
    subtitle: "Presented research on an agricultural e-commerce platform with real-time negotiation and AI validation.",
  },
  {
    date: "Season 4",
    title: "Source Summer of Code · Project Admin",
    subtitle: "Mentored contributors and guided open-source contributions end to end.",
  },
  {
    date: "2023",
    title: "Smart India Hackathon",
    subtitle: "National-level innovation challenge — collaborative problem-solving and solution building.",
  },
];

// No links on purpose – certificate files stay private.
export const certifications: Row[] = [
  {
    date: "Udemy",
    title: "Flutter and Dart — The Complete Guide",
    subtitle: "Mobile development",
  },
  {
    date: "Udemy",
    title: "The Complete Android 14 & Kotlin Masterclass",
    subtitle: "Mobile development",
  },
  {
    date: "Udemy",
    title: "Master Spring Boot 3 & Spring Framework 6",
    subtitle: "Backend",
  },
  {
    date: "WhatBytes",
    title: "Beginner & Advanced in Django Python",
    subtitle: "Backend",
  },
  {
    date: "Course",
    title: "Java Data Structures & Algorithms",
    subtitle: "Computer science",
  },
  {
    date: "NPTEL",
    title: "Research Methodology",
    subtitle: "Research",
  },
];

