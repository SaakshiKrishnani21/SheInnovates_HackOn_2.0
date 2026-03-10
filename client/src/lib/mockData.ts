export interface Project {
  id: number;
  title: string;
  domain: string;
}

export interface Student {
  id: number;
  name: string;
  department: string;
  year: string;
  skills: string[];
  projects: Project[];
  avatarUrl: string;
}

export const MOCK_STUDENTS: Student[] = [
  {
    id: 1,
    name: "Tanusri",
    department: "CSE",
    year: "3rd",
    skills: ["React", "Node", "AI"],
    projects: [{ id: 101, title: "AI Learning Chatbot", domain: "AI/ML" }],
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Tanusri"
  },
  {
    id: 2,
    name: "Rahul",
    department: "ECE",
    year: "4th",
    skills: ["Python", "ML", "FastAPI"],
    projects: [{ id: 102, title: "Resume Analyzer", domain: "AI/ML" }],
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul"
  },
  {
    id: 3,
    name: "Sneha",
    department: "IT",
    year: "2nd",
    skills: ["Java", "SQL", "Cybersecurity"],
    projects: [{ id: 103, title: "Threat Detection", domain: "Cybersecurity" }],
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sneha"
  },
  {
    id: 4,
    name: "Arjun",
    department: "CSE",
    year: "3rd",
    skills: ["Blockchain", "Solidity", "Rust"],
    projects: [{ id: 104, title: "Escrow System", domain: "Blockchain" }],
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Arjun"
  },
  {
    id: 5,
    name: "Priya",
    department: "ECE",
    year: "3rd",
    skills: ["Flutter", "Dart", "Firebase"],
    projects: [{ id: 105, title: "Campus Event App", domain: "Mobile" }],
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya"
  },
  {
    id: 6,
    name: "Vikram",
    department: "ME",
    year: "4th",
    skills: ["IoT", "Arduino", "Python"],
    projects: [{ id: 106, title: "Smart Irrigation", domain: "IoT" }],
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Vikram"
  },
  {
    id: 7,
    name: "Aisha",
    department: "CSE",
    year: "2nd",
    skills: ["React", "React Native", "Node"],
    projects: [{ id: 107, title: "Freelance Platform", domain: "Web" }],
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Aisha"
  },
  {
    id: 8,
    name: "Karan",
    department: "IT",
    year: "3rd",
    skills: ["AWS", "Docker", "Kubernetes"],
    projects: [{ id: 108, title: "Cloud Monitor", domain: "DevOps" }],
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Karan"
  },
  {
    id: 9,
    name: "Neha",
    department: "ECE",
    year: "3rd",
    skills: ["ComputerVision", "OpenCV"],
    projects: [{ id: 109, title: "Traffic Analyzer", domain: "AI/ML" }],
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Neha"
  },
  {
    id: 10,
    name: "Rohan",
    department: "CSE",
    year: "4th",
    skills: ["Solidity", "Web3", "React"],
    projects: [{ id: 110, title: "NFT Marketplace", domain: "Blockchain" }],
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rohan"
  }
];

// Helper to simulate the AI natural language query filter
export function interpretSearchQuery(query: string): Student[] {
  const lowerQuery = query.toLowerCase();
  
  if (!query) return MOCK_STUDENTS;

  return MOCK_STUDENTS.filter(student => {
    // If query matches any skill
    const matchesSkill = student.skills.some(skill => 
      lowerQuery.includes(skill.toLowerCase()) || skill.toLowerCase().includes(lowerQuery)
    );
    
    // If query matches any domain
    const matchesDomain = student.projects.some(project => 
      lowerQuery.includes(project.domain.toLowerCase()) || project.domain.toLowerCase().includes(lowerQuery)
    );
    
    // If query matches name or department
    const matchesBasic = student.name.toLowerCase().includes(lowerQuery) || 
                         student.department.toLowerCase().includes(lowerQuery);
                         
    return matchesSkill || matchesDomain || matchesBasic;
  });
}