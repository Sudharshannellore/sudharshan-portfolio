// ---------------------------------------------------------------------------
// All personal content lives here. Edit this file to update the portfolio.
// ---------------------------------------------------------------------------

export const profile = {
  name: 'Sudharshan Rao Nellore',
  brand: 'SUDHARSHAN',
  title: 'Full-Stack Developer | Backend Engineer | SaaS & AI Application Developer',
  shortTitle: 'Full-Stack Developer / Backend Engineer',
  location: 'Nellore, Andhra Pradesh, India',
  shortLocation: 'Nellore, India',
  coordinates: '14.4426° N, 79.9865° E',
  email: 'sudharshannellore123@gmail.com',
  linkedin: 'https://www.linkedin.com/in/sudharshannellore/',
  github: 'https://github.com/Sudharshannellore',
  githubHandle: 'Sudharshannellore',
  // Path to your résumé PDF in /public (e.g. '/resume.pdf'). Leave '' to hide the résumé buttons.
  resume: '',
  availability:
    'Open to full-time opportunities, freelance projects, SaaS development, AI integrations, and collaborations.',
};

export const navLinks = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'expertise', label: 'Expertise' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
];

export const hero = {
  eyebrow: 'Full-Stack Developer / Backend Engineer',
  // Cycled in the hero eyebrow with a scramble effect.
  roles: ['Full-Stack Developer', 'Backend Engineer', 'SaaS Developer', 'AI Application Developer'],
  headline: ['Engineering', 'digital experiences', 'that scale.'],
  supporting:
    'I build scalable backend systems, intelligent SaaS platforms, and AI-powered applications — turning complex ideas into production-ready products.',
  orbitLabels: ['NestJS', 'Node.js', 'Python', 'FastAPI', 'React', 'Next.js', 'MongoDB', 'OpenAI', 'LangGraph'],
  // One-liners shown when an orbiting label is hovered.
  orbitNotes: {
    NestJS: 'REST APIs at PRove IT & codinglimits · BillStack, CRMAI',
    'Node.js': 'Express backends for Luxe Hair & LocalBazaar',
    Python: 'Backend services at PRove IT Catalysts',
    FastAPI: 'LogicCraft API · services at PRove IT',
    React: 'Frontends for every project in the gallery',
    'Next.js': 'Frontend applications at PRove IT',
    MongoDB: 'The data layer behind all five products',
    OpenAI: 'CRMAI copilot via function calling',
    LangGraph: 'AI backend workflows at codinglimits',
  },
};

export const about = {
  label: '01 / About',
  headline: ['Curiosity drives the build.', 'Engineering makes it scale.'],
  paragraphs: [
    "I'm a Full-Stack Developer passionate about building software that is scalable, reliable, and useful.",
    'My primary strength is backend engineering — designing APIs, business logic, authentication systems, and scalable architectures.',
    'I also work across the frontend, allowing me to develop complete applications from initial architecture to polished user experiences.',
    "I'm particularly interested in SaaS products, AI integrations, system design, and solving challenging engineering problems.",
  ],
  facts: [
    { k: 'Location', v: 'Nellore, India' },
    { k: 'Primary Focus', v: 'Backend Engineering' },
    { k: 'Areas', v: 'SaaS, AI, Full-Stack' },
    { k: 'Availability', v: 'Opportunities & collaborations' },
  ],
};

export const expertise = {
  label: '02 / Expertise',
  headline: ['Engineering across', 'the entire stack.'],
  cards: [
    {
      id: 'backend',
      index: '01',
      title: 'Backend Engineering',
      blurb: 'APIs, services and the business logic that holds products together.',
      items: ['NestJS', 'Node.js', 'Python', 'FastAPI', 'REST APIs', 'System Design'],
      visual: 'backend',
    },
    {
      id: 'ai',
      index: '02',
      title: 'AI Engineering',
      blurb: 'LLM-powered workflows wired into real product backends.',
      items: ['OpenAI APIs', 'LangGraph', 'LLM Integrations', 'AI Workflows'],
      visual: 'ai',
    },
    {
      id: 'saas',
      index: '03',
      title: 'SaaS Development',
      blurb: 'Auth, access control and billing — the plumbing every SaaS needs.',
      items: ['JWT', 'OAuth', 'RBAC', 'Subscription Management', 'Razorpay Integrations', 'Credit-Based Systems'],
      visual: 'saas',
    },
    {
      id: 'frontend',
      index: '04',
      title: 'Frontend Engineering',
      blurb: 'Responsive interfaces that ship with the backend, not after it.',
      items: ['React.js', 'Next.js', 'JavaScript', 'Tailwind CSS'],
      visual: 'frontend',
    },
    {
      id: 'database',
      index: '05',
      title: 'Database Engineering',
      blurb: 'Data models designed for the queries the product actually runs.',
      items: ['MongoDB', 'Data Modeling', 'Database Optimization', 'API Integrations'],
      visual: 'database',
    },
  ],
};

export const experience = {
  label: '03 / Experience',
  headline: ['Building systems.', 'Solving problems.', 'Growing through engineering.'],
  roles: [
    {
      company: 'PRove IT Catalysts',
      role: 'Back End Developer',
      period: 'June 2026 – Present',
      location: 'Nellore, Andhra Pradesh, India',
      current: true,
      description: [
        'Developed scalable backend applications and RESTful APIs using NestJS, Python, and FastAPI. Built frontend applications with React.js and Next.js, implemented business logic and API integrations, and focused on performance optimization, clean code, and delivering reliable, production-ready applications.',
      ],
      stack: [
        'NestJS',
        'Node.js',
        'TypeScript',
        'Python',
        'FastAPI',
        'REST APIs',
        'API Integrations',
        'Business Logic',
        'React.js',
        'Next.js',
        'JavaScript',
        'Performance Optimization',
        'Clean Code',
      ],
    },
    {
      company: 'codinglimits',
      role: 'Back End Developer',
      period: 'November 2025 – May 2026',
      description: [
        'Converted from an intern to a full-time Backend Developer based on performance and technical contributions.',
        'Built scalable REST APIs using NestJS and Node.js, and implemented secure authentication systems using JWT, OAuth (Google, LinkedIn), and role-based access control (RBAC).',
        'Integrated Razorpay for subscription management and billing systems, and developed AI-powered backend workflows using LangGraph and OpenAI APIs.',
      ],
      stack: [
        'NestJS',
        'Node.js',
        'TypeScript',
        'REST APIs',
        'JWT',
        'OAuth (Google, LinkedIn)',
        'RBAC',
        'Authentication',
        'Razorpay',
        'Subscription Billing',
        'LangGraph',
        'OpenAI APIs',
        'AI Workflows',
      ],
    },
  ],
};

export const projectsSection = {
  label: '04 / Selected Work',
  headline: ['From ideas to', 'engineered products.'],
};

export const education = {
  label: '05 / Education',
  institution: 'Sree Venkateswara College of Engineering',
  degree: 'Bachelor of Technology — BTech',
  branch: 'Electronics and Communication Engineering',
  period: 'August 2019 – May 2023',
};

export const contact = {
  label: '06 / Contact',
  headline: ['Have an ambitious idea?', "Let's engineer it."],
  supporting:
    "I'm open to opportunities, freelance projects, SaaS development, AI integrations, and collaborations with teams building meaningful products.",
  cta: 'Start a Conversation',
};
