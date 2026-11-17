// ---------------------------------------------------------------------------
// Selected work — EDITABLE PLACEHOLDERS.
//
// Replace each entry with a real project. Fields:
//   title       – project name
//   category    – short category label
//   description – one or two sentences on what it does and your role
//   date        – optional, e.g. 'Oct 2026'
//   stack       – technologies used
//   visual      – which built-in mockup to render:
//                 'dashboard' | 'editor' | 'api' | 'workflow' | 'subscription' |
//                 'dataviz' | 'quest' | 'crm' | 'booking' | 'marketplace'
//   image       – optional path to a screenshot (e.g. '/projects/foo.png');
//                 when set, it is shown instead of the generated mockup
//   github      – repository URL ('' shows a "soon" chip)
//   repos       – optional list of { label, url } for multiple repositories
//                 (e.g. frontend + backend); used instead of `github` when set
//   live        – live demo URL ('' shows a "soon" chip)
//   placeholder – set to false once the entry holds real project details
// ---------------------------------------------------------------------------

export const projects = [
  {
    title: 'LogicCraft',
    category: 'EdTech · Full-Stack',
    date: 'Oct 2026',
    description:
      'A gamified coding platform that turns learning to code into an interactive adventure: courses, sandboxed practice graded against real test suites, timed challenges, duels and leaderboards, an AI mentor, and a server-managed XP economy.',
    stack: ['React 19', 'TypeScript', 'Vite', 'Zustand', 'React Query', 'FastAPI', 'MongoDB', 'JWT', 'OpenRouter'],
    visual: 'quest',
    image: '',
    github: '',
    repos: [
      { label: 'Frontend', url: 'https://github.com/Sudharshannellore/logicCraft-frontend' },
      { label: 'Backend', url: 'https://github.com/Sudharshannellore/logicCraft-backend' },
    ],
    live: 'https://logic-craft-frontend.vercel.app',
    placeholder: false,
  },
  {
    title: 'BillStack',
    category: 'SaaS · Billing',
    date: 'Aug 2026',
    description:
      'A full-stack SaaS billing and subscription management platform that brings products, pricing, subscriptions, customers, usage tracking, invoices, wallets, coupons, analytics, webhooks and API management into one place — a modular NestJS + MongoDB backend with JWT auth and role-based access, and a React dashboard with super-admin and tenant consoles.',
    stack: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'shadcn/ui', 'Recharts', 'NestJS', 'MongoDB', 'Mongoose', 'JWT', 'RBAC', 'Swagger'],
    visual: 'subscription',
    image: '',
    github: '',
    repos: [
      { label: 'Frontend', url: 'https://github.com/Sudharshannellore/billstack-frontend' },
      { label: 'Backend', url: 'https://github.com/Sudharshannellore/billstack-backend' },
    ],
    live: 'https://billstack-frontend.vercel.app/',
    placeholder: false,
  },
  {
    title: 'CRMAI',
    category: 'AI · CRM',
    date: 'Jul 2026',
    description:
      'An AI-powered CRM covering leads, contacts, organizations, deals, tasks, meetings, campaigns and email. Qualified leads auto-convert into an organization and contact inside a MongoDB transaction, an OpenAI copilot answers questions grounded in live CRM data via function calling, and workflows can be generated from plain English, then edited on a drag-and-drop canvas and executed.',
    stack: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'shadcn/ui', 'React Flow', 'Recharts', 'NestJS', 'MongoDB', 'Mongoose', 'OpenAI', 'Nodemailer', 'Swagger'],
    visual: 'crm',
    image: '',
    github: '',
    repos: [
      { label: 'Frontend', url: 'https://github.com/Sudharshannellore/crm-frontend' },
      { label: 'Backend', url: 'https://github.com/Sudharshannellore/crm-backend' },
    ],
    live: 'https://crm-frontend-mu-nine.vercel.app/',
    placeholder: false,
  },
  {
    title: 'Luxe Hair',
    category: 'MERN · Booking',
    date: 'Oct 2025',
    description:
      'A full-stack MERN application built for modern hair clinics. Clients book appointments, purchase combo services and pay by COD or online checkout, with automated email reminders and payment updates; admins manage services, staff, offers, bookings, reviews and revenue analytics from a dedicated dashboard.',
    stack: ['React', 'React Router', 'Tailwind CSS', 'Recharts', 'Node.js', 'Express', 'MongoDB', 'Mongoose', 'JWT', 'Nodemailer', 'node-cron', 'Multer'],
    visual: 'booking',
    image: '',
    github: 'https://github.com/Sudharshannellore/Luxe_Hair',
    live: 'https://luxehair-ruby.vercel.app/',
    placeholder: false,
  },
  {
    title: 'LocalBazaar',
    category: 'eCommerce · Marketplace',
    date: 'May 2025',
    description:
      'An eCommerce marketplace connecting consumers with local farmers, tribal artisans and small businesses — like Swiggy or Zomato, but for local and traditional products. Four role-based apps (consumer, vendor, delivery partner, admin) with Razorpay or COD checkout, live order tracking and instant vendor order alerts over Socket.IO, admin-approved vendor onboarding and revenue analytics.',
    stack: ['React', 'Vite', 'Tailwind CSS', 'React Query', 'Framer Motion', 'Recharts', 'Node.js', 'Express', 'MongoDB', 'Socket.IO', 'Razorpay', 'JWT', 'Cloudinary', 'Docker'],
    visual: 'marketplace',
    image: '',
    github: 'https://github.com/Sudharshannellore/LocalBazaar',
    live: 'https://local-bazaar.vercel.app/',
    placeholder: false,
  },
  {
    title: 'Project Title — SaaS Platform',
    category: 'SaaS · Full-Stack',
    description:
      'Placeholder: describe the product, the problem it solves and the parts you engineered. Edit this entry in src/data/projects.js.',
    stack: ['NestJS', 'React', 'MongoDB'],
    visual: 'dashboard',
    image: '',
    github: '',
    live: '',
    placeholder: true,
  },
  {
    title: 'Project Title — AI Workflow',
    category: 'AI Engineering',
    description:
      'Placeholder: describe the AI workflow, the models or agents involved and how it integrates with the product.',
    stack: ['Python', 'FastAPI', 'LangGraph', 'OpenAI'],
    visual: 'workflow',
    image: '',
    github: '',
    live: '',
    placeholder: true,
  },
  {
    title: 'Project Title — API Platform',
    category: 'Backend · Architecture',
    description:
      'Placeholder: describe the services, API design and the architectural decisions behind them.',
    stack: ['Node.js', 'NestJS', 'REST'],
    visual: 'api',
    image: '',
    github: '',
    live: '',
    placeholder: true,
  },
];
