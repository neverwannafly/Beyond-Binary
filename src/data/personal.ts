import { type PersonalStats } from '@/types/portfolio';

export const personalStats: PersonalStats = {
  projectsCompleted: 25,
  yearsOfExperience: 5,
  technologiesUsed: 20,
  coffeeConsumed: 1247, // cups per year
  booksRead: 24, // this year
  chessRating: 1850,
  animeWatched: 150, // total series
};

export const interests = [
  {
    id: 'programming',
    name: 'Programming',
    icon: '💻',
    description: 'Building solutions that make a difference',
    color: 'from-blue-500 to-purple-600',
    skills: ['TypeScript', 'React', 'Node.js', 'Python'],
  },
  {
    id: 'chess',
    name: 'Chess',
    icon: '♟️',
    description: 'Strategic thinking and pattern recognition',
    color: 'from-gray-600 to-gray-800',
    skills: ['Tactical Puzzles', 'Opening Theory', 'Endgames'],
  },
  {
    id: 'anime',
    name: 'Anime',
    icon: '🎌',
    description: 'Exploring Japanese storytelling and culture',
    color: 'from-pink-500 to-red-500',
    skills: ['Studio Analysis', 'Genre Deep-dives', 'Seasonal Tracking'],
  },
  {
    id: 'climbing',
    name: 'Rock Climbing',
    icon: '🧗',
    description: 'Pushing physical and mental limits',
    color: 'from-orange-500 to-yellow-500',
    skills: ['Sport Climbing', 'Bouldering', 'Route Reading'],
  },
  {
    id: 'kayaking',
    name: 'Kayaking',
    icon: '🚣',
    description: 'Finding peace on the water',
    color: 'from-blue-400 to-cyan-500',
    skills: ['Whitewater', 'Sea Kayaking', 'Rolling Techniques'],
  },
  {
    id: 'reading',
    name: 'Reading',
    icon: '📚',
    description: 'Continuous learning and growth',
    color: 'from-green-500 to-teal-600',
    skills: ['Technical Books', 'Sci-Fi', 'Philosophy', 'Biographies'],
  },
];

export const personalInfo = {
  name: 'Your Name',
  age: 27,
  location: 'Your City, Country',
  role: 'Software Engineer',
  bio: `I'm a passionate software engineer who believes in the power of technology to solve real-world problems. 
  When I'm not coding, you'll find me scaling rock faces, paddling through rapids, or getting lost in a good book. 
  I love the strategic thinking that chess demands, and I'm always excited to discover new anime series that push 
  the boundaries of storytelling.`,
  motto: 'Code, climb, create, repeat.',
  currentlyReading: 'Clean Architecture by Robert C. Martin',
  currentlyWatching: 'Attack on Titan: Final Season',
  currentGoal: 'Complete my first 5.12a climbing route',
};

export const skills = [
  { name: 'TypeScript', proficiency: 90, category: 'frontend' },
  { name: 'React', proficiency: 95, category: 'frontend' },
  { name: 'Node.js', proficiency: 85, category: 'backend' },
  { name: 'Python', proficiency: 80, category: 'backend' },
  { name: 'AWS', proficiency: 75, category: 'devops' },
  { name: 'PostgreSQL', proficiency: 80, category: 'database' },
  { name: 'MongoDB', proficiency: 70, category: 'database' },
  { name: 'Docker', proficiency: 85, category: 'devops' },
];
