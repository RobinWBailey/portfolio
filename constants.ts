import { Project } from './types';

export const PROJECTS: Project[] = [
  {
    id: 'pulse',
    title: 'PULSE Student Success',
    category: 'Education',
    year: '2023',
    isSelected: true,
    summary: 'Transforming Medical Education at Plymouth University.',
    description: 'A comprehensive student success platform for the Faculty of Medicine and Dentistry at Plymouth University, encompassing a wide range of modules to support the entire student journey. I led the design and development from concept to launch. My role involved stakeholder engagement, requirements gathering, UX/UI design, and managing the agile development process. The platform now serves 1,200+ students daily and has reduced administrative overhead by 30%.',
    client: 'Plymouth University',
    role: 'Product Owner & Architect',
    images: [
      'https://placehold.co/1200x800/2d3748/ffffff?text=PULSE+Dashboard',
      'https://placehold.co/800x600/34495e/ffffff?text=Student+Profile',
      'https://placehold.co/800x600/2c3e50/ffffff?text=Analytics',
      'https://placehold.co/800x600/95a5a6/ffffff?text=Mobile+View'
    ],
    tags: ['Product Management', 'UX/UI Design', 'Salesforce', 'Agile'],
    link: '#'
  },
  {
    id: 'horizon',
    title: 'iotec Horizon',
    category: 'AdTech',
    year: '2018',
    isSelected: true,
    summary: 'Campaign management and reporting for high-scale AdTech.',
    description: 'A self-service campaign management and reporting tool for a cutting-edge AdTech platform, empowering clients to manage their own digital advertising campaigns. I led the entire product design lifecycle, from user research and wireframing to high-fidelity prototypes and front-end development support. We achieved an 80% reduction in campaign setup time and enabled the business to scale to 200+ clients without increasing support staff.',
    client: 'iotec Global',
    role: 'Lead UX Designer & Product Architect',
    images: [
      'https://placehold.co/1200x800/2d3748/ffffff?text=Horizon+Overview',
      'https://placehold.co/800x600/2d3748/ffffff?text=Wireframes',
      'https://placehold.co/800x600/2d3748/ffffff?text=Ad+Sets'
    ],
    tags: ['UX/UI', 'Product Design', 'Django', 'Python'],
    link: '#'
  },
  {
    id: 'bearforms',
    title: 'BearForms',
    category: 'Mobile App',
    year: '2025',
    isSelected: true,
    summary: 'Offline-first data capture application for iOS & Android.',
    description: 'A simple, offline, no-fuss data capture form app for iPhone, iPad, and Android. Design your form. Capture your responses. Export your data. Done. I designed, developed, and launched this multi-platform app from scratch. This involved UI/UX design, native development for iOS and Android using React Native, and App Store deployment.',
    client: 'Side Project',
    role: 'Designer, Developer, Founder',
    images: [
      'https://placehold.co/800x1200/2d3748/ffffff?text=BearForms+Mobile',
      'https://placehold.co/800x1200/e74c3c/ffffff?text=Form+Builder',
      'https://placehold.co/800x1200/c0392b/ffffff?text=Data+Export'
    ],
    tags: ['React Native', 'iOS & Android', 'UI/UX Design'],
    link: '#'
  },
  {
    id: 'bento',
    title: 'Bento',
    category: 'Concept',
    year: '2021',
    isSelected: true,
    summary: 'The "Do Less" To-Do List based on mindful productivity.',
    description: 'A conceptual to-do list application based on the Bento methodology, designed for focus and mindful productivity. This project explores the intersection of digital utility and mental well-being, using a limited-choice interface to reduce cognitive load.',
    client: 'Concept',
    role: 'Concept Designer',
    images: [
      'https://placehold.co/1200x800/2d3748/ffffff?text=Bento+Header',
      'https://placehold.co/800x1200/1abc9c/ffffff?text=Bento+List',
      'https://placehold.co/800x1200/16a085/ffffff?text=Focus+Mode'
    ],
    tags: ['iOS', 'Android', 'React Native', 'UI/UX Design'],
    link: '#'
  },
  {
    id: 'investigate',
    title: 'Investigate Invertebrates',
    category: 'Education',
    year: '2014',
    isSelected: true,
    summary: 'Interactive companion app for Paignton Zoo.',
    description: 'A companion iOS app for the Paignton Zoo exhibit, designed to educate and engage visitors, particularly younger audiences, with interactive content. The app utilized gamification to increase visitor dwell time and engagement with the exhibits.',
    client: 'Wild Planet Trust',
    role: 'Product Designer & iOS Developer',
    images: [
      'https://placehold.co/1200x800/2d3748/ffffff?text=Zoo+App',
      'https://placehold.co/800x1200/f1c40f/ffffff?text=Quiz+Interface',
      'https://placehold.co/800x1200/f39c12/ffffff?text=Map+View'
    ],
    tags: ['iOS', 'Objective C', 'UI/UX Design'],
    link: '#'
  },
  {
    id: 'learning-analytics',
    title: 'Learning Analytics',
    category: 'Data',
    year: '2025',
    isSelected: true,
    summary: 'Data Visualization for Educational Success.',
    description: 'A strategic project to visualize student learning data to identify trends and support student success. I led the product strategy and data visualization design, creating dashboards that allow faculty to identify at-risk students early in the semester.',
    client: 'Plymouth University',
    role: 'Product & Technical Lead',
    images: [
      'https://placehold.co/1200x800/2d3748/ffffff?text=Learning+Analytics',
      'https://placehold.co/1200x800/8e44ad/ffffff?text=Data+Charts',
      'https://placehold.co/1200x800/9b59b6/ffffff?text=Student+Trends'
    ],
    tags: ['Data Visualisation', 'Salesforce', 'Product Management'],
    link: '#'
  },
  {
    id: 'capt',
    title: 'CAPT',
    category: 'Education',
    year: '2023',
    isSelected: true,
    summary: 'Content Adaptive Progress Testing.',
    description: 'A sophisticated assessment platform delivering content-adaptive progress testing and topic mapping for medical students.',
    client: 'Peninsula Medical School',
    role: 'Technical Lead',
    images: [
      'https://placehold.co/1200x800/2d3748/ffffff?text=CAPT+Interface'
    ],
    tags: ['Salesforce', 'Assessment', 'Education'],
    link: '#'
  },
  {
    id: 'clinical-experience',
    title: 'Dental Experience',
    category: 'Education',
    year: '2023',
    isSelected: true,
    summary: 'On-Clinic Experience Assessment.',
    description: 'A specialized mobile-friendly tool for recording and validating clinical experience in real-time within dental clinics.',
    client: 'Peninsula Dental School',
    role: 'Product Owner',
    images: [
      'https://placehold.co/1200x800/2d3748/ffffff?text=Clinical+App'
    ],
    tags: ['Salesforce', 'Mobile'],
    link: '#'
  },
  // --- Non-Selected / Archive Projects ---
  {
    id: 'wave',
    title: 'Wave Digital Assistant',
    category: 'AI',
    year: '2023',
    isSelected: false,
    summary: 'AI Chatbot for student support.',
    description: 'AI chatbot for staff digital education queries in Moodle & student careers advice in the university app. Connects to live agents when needed.',
    client: 'Plymouth University',
    role: 'Product Manager',
    images: ['https://placehold.co/1200x800/2d3748/ffffff?text=Wave'],
    tags: ['AI', 'Chatbot', 'Mobile']
  },
  {
    id: 'soke',
    title: 'Soke',
    category: 'Branding',
    year: 'Concept',
    isSelected: false,
    summary: 'Branding Concept for a creative agency.',
    description: 'Branding and UI concept for a creative agency focused on clarity and impact.',
    client: 'Concept',
    role: 'Brand Designer',
    images: ['https://placehold.co/1200x800/2d3748/ffffff?text=Soke'],
    tags: ['Branding', 'UI/UX']
  },
  {
    id: 'trifecta',
    title: 'Trifecta Workout',
    category: 'Mobile',
    year: '2019',
    isSelected: false,
    summary: 'iOS Fitness App.',
    description: 'A beautiful and simply designed personal trainer app for iPhone, focusing on core workout principles.',
    client: 'Side Project',
    role: 'iOS Developer',
    images: ['https://placehold.co/1200x800/2d3748/ffffff?text=Trifecta'],
    tags: ['iOS', 'Swift', 'Health']
  },
  {
    id: 'stories',
    title: 'Stories',
    category: 'Mobile',
    year: 'Side Project',
    isSelected: false,
    summary: 'Content Aggregator App.',
    description: 'Sit back, relax, and catch up. A curated content aggregator for your favorite topics.',
    client: 'Side Project',
    role: 'iOS Developer',
    images: ['https://placehold.co/1200x800/2d3748/ffffff?text=Stories'],
    tags: ['iOS', 'Objective C', 'API']
  },
  {
    id: 'get-gear',
    title: 'Get Gear',
    category: 'Concept',
    year: 'Concept',
    isSelected: false,
    summary: 'Marketplace Concept.',
    description: 'A mobile and location-based marketplace concept for easily buying and selling gear.',
    client: 'Concept',
    role: 'UI/UX Designer',
    images: ['https://placehold.co/1200x800/2d3748/ffffff?text=Get+Gear'],
    tags: ['Concept', 'UI/UX', 'Mobile']
  },
  {
    id: 'short-courses',
    title: 'Short Courses Platform',
    category: 'Web',
    year: '2020',
    isSelected: false,
    summary: 'Platform for booking short courses.',
    description: 'A web-based platform handling booking, payment, and management of short professional development courses.',
    client: 'Plymouth University',
    role: 'Product Lead',
    images: ['https://placehold.co/1200x800/2d3748/ffffff?text=Short+Courses'],
    tags: ['Web', 'Commerce']
  },
  {
    id: 'local-gov',
    title: 'Local Govt Project',
    category: 'Government',
    year: '2016',
    isSelected: false,
    summary: 'Digital service transformation.',
    description: 'A project to digitize citizen services for local government.',
    client: 'Local Council',
    role: 'Developer',
    images: ['https://placehold.co/1200x800/2d3748/ffffff?text=Gov'],
    tags: ['Web', 'Accessibility']
  },
  {
    id: 'sse',
    title: 'Student Support Case Management',
    category: 'Education',
    year: '2025',
    isSelected: false,
    summary: 'Case management for student wellbeing.',
    description: 'Secure system for managing sensitive student support cases and wellbeing interventions.',
    client: 'Plymouth University',
    role: 'Product Architect',
    images: ['https://placehold.co/1200x800/2d3748/ffffff?text=Support'],
    tags: ['Salesforce', 'Privacy']
  },
  {
    id: 'da',
    title: 'Dynamic Assessments',
    category: 'Education',
    year: '2023',
    isSelected: false,
    summary: 'Real-time assessment integration.',
    description: 'Integration services connecting assessment platforms with student record systems.',
    client: 'Plymouth University',
    role: 'Tech Lead',
    images: ['https://placehold.co/1200x800/2d3748/ffffff?text=Assessments'],
    tags: ['API', 'Integration']
  },
  {
    id: 'bm',
    title: 'Academic Benchmarking',
    category: 'Data',
    year: '2023',
    isSelected: false,
    summary: 'Comparative academic performance analysis.',
    description: 'Tools for benchmarking academic performance across cohorts.',
    client: 'Plymouth University',
    role: 'Data Lead',
    images: ['https://placehold.co/1200x800/2d3748/ffffff?text=Benchmarking'],
    tags: ['Data', 'Analytics']
  },
  {
    id: 'competency',
    title: 'Competency Based Assessment',
    category: 'Education',
    year: '2024',
    isSelected: false,
    summary: 'Tracking skills mastery.',
    description: 'System for tracking and verifying student competency across practical skills.',
    client: 'Plymouth University',
    role: 'Product Owner',
    images: ['https://placehold.co/1200x800/2d3748/ffffff?text=Competency'],
    tags: ['Education', 'Skills']
  }
];