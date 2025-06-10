import type { Question } from "./types"

export const jobRoles = [
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Developer",
  "DevOps Engineer",
  "Data Scientist",
  "Product Manager",
  "UI/UX Designer",
  "Mobile Developer",
  "Software Architect",
  "QA Engineer",
  "Machine Learning Engineer",
  "Cloud Engineer",
  "Cybersecurity Specialist",
  "Database Administrator",
  "Technical Lead",
]

const questionBank: Record<string, Question[]> = {
  "Frontend Developer": [
    {
      id: "1",
      question: "What is the difference between let, const, and var in JavaScript?",
      context: "This question tests your understanding of JavaScript variable declarations and their scoping rules.",
      difficulty: "Easy",
      category: "JavaScript Fundamentals",
      hints: [
        "Consider the scope differences (function vs block scope)",
        "Think about hoisting behavior",
        "Consider reassignment and redeclaration rules",
        "Temporal dead zone for let and const",
      ],
    },
    {
      id: "2",
      question: "Explain the concept of closures in JavaScript with an example.",
      context: "Closures are a fundamental concept in JavaScript that every frontend developer should understand.",
      difficulty: "Medium",
      category: "JavaScript Advanced",
      hints: [
        "A closure gives you access to an outer function's scope from an inner function",
        "Variables in the outer scope remain accessible even after the outer function returns",
        "Common use cases include data privacy and function factories",
        "Provide a practical example like a counter function",
      ],
    },
    {
      id: "3",
      question: "How would you optimize the performance of a React application?",
      context: "Performance optimization is crucial for creating smooth user experiences in React applications.",
      difficulty: "Hard",
      category: "React Performance",
      hints: [
        "React.memo for preventing unnecessary re-renders",
        "useMemo and useCallback hooks for expensive calculations",
        "Code splitting with React.lazy and Suspense",
        "Virtual scrolling for large lists",
        "Bundle analysis and tree shaking",
      ],
    },
    {
      id: "4",
      question: "What are the differences between CSS Grid and Flexbox?",
      context: "Understanding when to use Grid vs Flexbox is essential for modern CSS layouts.",
      difficulty: "Medium",
      category: "CSS Layout",
      hints: [
        "Grid is two-dimensional, Flexbox is one-dimensional",
        "Grid is better for complex layouts, Flexbox for component-level layouts",
        "Consider browser support and use cases",
        "Mention alignment and distribution capabilities",
      ],
    },
    {
      id: "5",
      question: "Explain the event loop in JavaScript.",
      context: "The event loop is fundamental to understanding how JavaScript handles asynchronous operations.",
      difficulty: "Hard",
      category: "JavaScript Advanced",
      hints: [
        "Call stack, callback queue, and event loop interaction",
        "Microtasks vs macrotasks",
        "How setTimeout, Promises, and async/await work",
        "Non-blocking nature of JavaScript",
      ],
    },
  ],
  "Backend Developer": [
    {
      id: "6",
      question: "What is the difference between SQL and NoSQL databases?",
      context: "Understanding database types is crucial for backend architecture decisions.",
      difficulty: "Easy",
      category: "Database Design",
      hints: [
        "ACID properties vs eventual consistency",
        "Schema vs schema-less design",
        "Scalability patterns (vertical vs horizontal)",
        "Use cases for each type",
      ],
    },
    {
      id: "7",
      question: "Explain RESTful API design principles.",
      context: "REST is a fundamental architectural style for web APIs.",
      difficulty: "Medium",
      category: "API Design",
      hints: [
        "HTTP methods and their proper usage",
        "Resource-based URLs",
        "Stateless communication",
        "Status codes and error handling",
        "HATEOAS principle",
      ],
    },
    {
      id: "8",
      question: "How would you handle authentication and authorization in a web application?",
      context: "Security is paramount in backend development.",
      difficulty: "Hard",
      category: "Security",
      hints: [
        "JWT vs session-based authentication",
        "OAuth 2.0 and OpenID Connect",
        "Role-based access control (RBAC)",
        "Password hashing and salting",
        "Rate limiting and security headers",
      ],
    },
    {
      id: "9",
      question: "What is database indexing and how does it improve performance?",
      context: "Database optimization is crucial for scalable backend systems.",
      difficulty: "Medium",
      category: "Database Optimization",
      hints: [
        "B-tree and hash indexes",
        "Query execution plans",
        "Trade-offs between read and write performance",
        "Composite indexes and index selectivity",
      ],
    },
    {
      id: "10",
      question: "Explain microservices architecture and its trade-offs.",
      context: "Microservices are a popular architectural pattern for large-scale applications.",
      difficulty: "Hard",
      category: "System Architecture",
      hints: [
        "Service decomposition strategies",
        "Inter-service communication patterns",
        "Data consistency challenges",
        "Deployment and monitoring complexity",
        "When to choose microservices vs monolith",
      ],
    },
  ],
  "DevOps Engineer": [
    {
      id: "11",
      question: "What is Infrastructure as Code (IaC) and why is it important?",
      context: "IaC is a fundamental practice in modern DevOps workflows.",
      difficulty: "Easy",
      category: "Infrastructure Management",
      hints: [
        "Version control for infrastructure",
        "Reproducibility and consistency",
        "Tools like Terraform, CloudFormation, Ansible",
        "Benefits over manual infrastructure management",
      ],
    },
    {
      id: "12",
      question: "Explain the CI/CD pipeline and its components.",
      context: "Continuous Integration and Deployment are core DevOps practices.",
      difficulty: "Medium",
      category: "CI/CD",
      hints: [
        "Source control integration",
        "Automated testing stages",
        "Build and artifact management",
        "Deployment strategies (blue-green, canary)",
        "Monitoring and rollback procedures",
      ],
    },
    {
      id: "13",
      question: "How would you monitor and troubleshoot a distributed system?",
      context: "Observability is crucial for maintaining reliable distributed systems.",
      difficulty: "Hard",
      category: "Monitoring & Observability",
      hints: [
        "Three pillars: metrics, logs, and traces",
        "APM tools and distributed tracing",
        "SLIs, SLOs, and error budgets",
        "Alerting strategies and on-call procedures",
        "Root cause analysis techniques",
      ],
    },
    {
      id: "14",
      question: "What are containers and how do they differ from virtual machines?",
      context: "Containerization is a key technology in modern application deployment.",
      difficulty: "Medium",
      category: "Containerization",
      hints: [
        "Resource isolation vs virtualization",
        "Docker and container runtimes",
        "Image layers and optimization",
        "Orchestration with Kubernetes",
        "Security considerations",
      ],
    },
    {
      id: "15",
      question: "Describe your approach to implementing security in a DevOps pipeline.",
      context: "DevSecOps integrates security practices throughout the development lifecycle.",
      difficulty: "Hard",
      category: "Security",
      hints: [
        "Shift-left security approach",
        "Static and dynamic security testing",
        "Container and infrastructure security",
        "Secrets management",
        "Compliance and audit trails",
      ],
    },
  ],
}

// Default questions for custom roles or roles not in the question bank
const defaultQuestions: Question[] = [
  {
    id: "default-1",
    question: "Tell me about yourself and your professional background.",
    context: "This is a common opening question that allows you to set the tone for the interview.",
    difficulty: "Easy",
    category: "General",
    hints: [
      "Keep it professional and relevant to the role",
      "Highlight key achievements and experiences",
      "Connect your background to the position",
      "Keep it concise (2-3 minutes)",
    ],
  },
  {
    id: "default-2",
    question: "What interests you about this role and our company?",
    context: "This question assesses your research and genuine interest in the position.",
    difficulty: "Easy",
    category: "General",
    hints: [
      "Show you've researched the company",
      "Connect the role to your career goals",
      "Mention specific aspects that appeal to you",
      "Demonstrate enthusiasm and cultural fit",
    ],
  },
  {
    id: "default-3",
    question: "Describe a challenging project you worked on and how you overcame obstacles.",
    context: "This behavioral question evaluates your problem-solving skills and resilience.",
    difficulty: "Medium",
    category: "Behavioral",
    hints: [
      "Use the STAR method (Situation, Task, Action, Result)",
      "Choose a relevant technical or professional challenge",
      "Focus on your specific contributions and decisions",
      "Highlight lessons learned and growth",
    ],
  },
  {
    id: "default-4",
    question: "What are your greatest strengths and how do they apply to this role?",
    context: "This question allows you to highlight your key competencies and their relevance.",
    difficulty: "Easy",
    category: "General",
    hints: [
      "Choose strengths relevant to the job requirements",
      "Provide specific examples and evidence",
      "Connect strengths to potential contributions",
      "Be authentic and avoid generic answers",
    ],
  },
  {
    id: "default-5",
    question: "How do you stay updated with industry trends and technologies?",
    context: "This question assesses your commitment to continuous learning and professional development.",
    difficulty: "Medium",
    category: "Professional Development",
    hints: [
      "Mention specific resources (blogs, courses, conferences)",
      "Discuss how you apply new knowledge",
      "Show passion for learning and growth",
      "Connect learning to career advancement",
    ],
  },
  {
    id: "default-6",
    question: "Describe a time when you had to work with a difficult team member or stakeholder.",
    context: "This behavioral question evaluates your interpersonal and conflict resolution skills.",
    difficulty: "Medium",
    category: "Behavioral",
    hints: [
      "Focus on your approach and actions, not blame",
      "Demonstrate emotional intelligence and professionalism",
      "Show how you found common ground or solutions",
      "Highlight positive outcomes and lessons learned",
    ],
  },
  {
    id: "default-7",
    question: "Where do you see yourself in 5 years?",
    context: "This question assesses your career goals and long-term commitment.",
    difficulty: "Easy",
    category: "Career Goals",
    hints: [
      "Align your goals with the company's growth opportunities",
      "Show ambition while being realistic",
      "Demonstrate commitment to the field",
      "Mention skills you want to develop",
    ],
  },
]

export function getQuestionsForRole(role: string): Question[] {
  // Check if we have specific questions for this role
  const roleQuestions = questionBank[role]

  if (roleQuestions) {
    // Return role-specific questions plus some general ones
    return [...roleQuestions, ...defaultQuestions.slice(0, 2)]
  }

  // For custom roles or roles not in our bank, return default questions
  return defaultQuestions
}
