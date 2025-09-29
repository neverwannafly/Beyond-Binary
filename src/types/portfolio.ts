export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  imageUrl?: string;
  images?: string[];
  featured: boolean;
  status: 'completed' | 'in-progress' | 'planned';
  startDate: string;
  endDate?: string;
  category: 'web' | 'mobile' | 'desktop' | 'ai' | 'other';
  highlights: string[];
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  duration: string;
  startDate: string;
  endDate?: string;
  description: string;
  achievements: string[];
  technologies: string[];
  location: string;
  type: 'full-time' | 'part-time' | 'contract' | 'internship';
}

export interface Skill {
  name: string;
  category: 'frontend' | 'backend' | 'mobile' | 'devops' | 'database' | 'other';
  proficiency: 1 | 2 | 3 | 4 | 5;
  yearsOfExperience: number;
  icon?: string;
}

export interface PersonalStats {
  projectsCompleted: number;
  yearsOfExperience: number;
  technologiesUsed: number;
  coffeeConsumed: number;
  booksRead: number;
  chessRating: number;
  animeWatched: number;
}
