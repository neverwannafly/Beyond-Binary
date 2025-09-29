import { type BucketListItem, type CoinTransaction } from '@/types/adventure';

export const lifeGoals: BucketListItem[] = [
  {
    id: 'climb-5-12a',
    title: 'Complete First 5.12a Climbing Route',
    description: 'Push my climbing skills to the next level by successfully completing a 5.12a difficulty route',
    category: 'adventure',
    completed: false,
    coinReward: 10, // Real gold coins
    priority: 'high',
    difficulty: 4,
    estimatedCost: 0,
    location: 'Local Climbing Gym / Outdoor Crags',
    media: [],
    tags: ['rock-climbing', 'fitness', 'challenge', 'skill-development'],
  },
  {
    id: 'read-50-books',
    title: 'Read 50 Books This Year',
    description: 'Expand knowledge and perspectives by reading 50 books across different genres',
    category: 'learning',
    completed: true,
    completedDate: '2023-12-28',
    coinReward: 5,
    priority: 'medium',
    difficulty: 3,
    media: [],
    journal: 'Amazing year of reading! Discovered some incredible sci-fi authors and learned a lot about system design. Favorites included "Project Hail Mary" and "Designing Data-Intensive Applications".',
    tags: ['reading', 'learning', 'personal-growth'],
  },
  {
    id: 'kayak-whitewater',
    title: 'Master Class IV Whitewater Kayaking',
    description: 'Progress from Class II/III to confidently running Class IV whitewater rapids',
    category: 'adventure',
    completed: false,
    coinReward: 15,
    priority: 'high',
    difficulty: 5,
    estimatedCost: 800,
    location: 'Colorado Rivers',
    media: [],
    tags: ['kayaking', 'whitewater', 'adrenaline', 'skill-development'],
  },
  {
    id: 'chess-2000-rating',
    title: 'Achieve 2000 Chess Rating',
    description: 'Improve strategic thinking and pattern recognition to reach 2000 ELO rating',
    category: 'achievement',
    completed: true,
    completedDate: '2024-02-15',
    coinReward: 8,
    priority: 'medium',
    difficulty: 4,
    media: [],
    journal: 'Finally broke 2000 after months of tactical training and studying endgames. The breakthrough came when I started focusing more on positional understanding rather than just calculating variations.',
    tags: ['chess', 'strategy', 'mental-training', 'competition'],
  },
  {
    id: 'backpack-jmt',
    title: 'Hike the John Muir Trail',
    description: 'Complete the 211-mile John Muir Trail through the Sierra Nevada mountains',
    category: 'travel',
    completed: false,
    coinReward: 20,
    priority: 'high',
    difficulty: 5,
    estimatedCost: 1500,
    location: 'California, USA',
    media: [],
    tags: ['hiking', 'backpacking', 'endurance', 'nature'],
  },
  {
    id: 'learn-japanese',
    title: 'Reach N3 Level Japanese',
    description: 'Learn Japanese to better understand anime and manga in their original language',
    category: 'learning',
    completed: false,
    coinReward: 12,
    priority: 'medium',
    difficulty: 4,
    media: [],
    tags: ['language', 'japanese', 'culture', 'anime'],
  },
  {
    id: 'build-saas',
    title: 'Launch a Profitable SaaS Product',
    description: 'Build and launch a software-as-a-service product that generates consistent revenue',
    category: 'achievement',
    completed: false,
    coinReward: 25,
    priority: 'high',
    difficulty: 5,
    estimatedCost: 2000,
    media: [],
    tags: ['entrepreneurship', 'software', 'business', 'passive-income'],
  },
  {
    id: 'complete-ironman',
    title: 'Complete an Ironman Triathlon',
    description: 'Train for and complete a full Ironman triathlon (2.4mi swim, 112mi bike, 26.2mi run)',
    category: 'achievement',
    completed: false,
    coinReward: 30,
    priority: 'medium',
    difficulty: 5,
    estimatedCost: 3000,
    media: [],
    tags: ['triathlon', 'endurance', 'fitness', 'challenge'],
  },
];

export const goldTransactions: CoinTransaction[] = [
  {
    id: 'initial-gold',
    amount: 2,
    reason: 'Starting gold coins',
    date: '2024-01-01',
    type: 'bonus',
    description: 'Welcome bonus for starting the life goals journey!',
  },
  {
    id: 'read-50-books-gold',
    amount: 5,
    reason: 'Completed reading 50 books goal',
    bucketListItemId: 'read-50-books',
    date: '2023-12-28',
    type: 'earned',
    description: 'Incredible reading year with 50 books completed across multiple genres.',
  },
  {
    id: 'chess-2000-gold',
    amount: 8,
    reason: 'Achieved 2000 chess rating',
    bucketListItemId: 'chess-2000-rating',
    date: '2024-02-15',
    type: 'earned',
    description: 'Breakthrough in chess understanding led to crossing the 2000 rating milestone.',
  },
  {
    id: 'monthly-bonus-jan',
    amount: 1,
    reason: 'Monthly progress bonus',
    date: '2024-01-31',
    type: 'bonus',
    description: 'Consistent progress on climbing and Japanese learning goals.',
  },
  {
    id: 'monthly-bonus-feb',
    amount: 1,
    reason: 'Monthly progress bonus',
    date: '2024-02-28',
    type: 'bonus',
    description: 'Great progress on multiple fronts, especially chess and climbing training.',
  },
  {
    id: 'monthly-bonus-mar',
    amount: 1,
    reason: 'Monthly progress bonus',
    date: '2024-03-31',
    type: 'bonus',
    description: 'Sent first 5.11c climbing route, making good progress toward 5.12a goal.',
  },
];

// Helper functions
export const getTotalGold = (): number => {
  return goldTransactions.reduce((total, transaction) => {
    return transaction.type === 'earned' || transaction.type === 'bonus' 
      ? total + transaction.amount 
      : total - transaction.amount;
  }, 0);
};

export const getCompletedGoals = () => lifeGoals.filter(goal => goal.completed);
export const getPendingGoals = () => lifeGoals.filter(goal => !goal.completed);
export const getGoalsByCategory = (category: BucketListItem['category']) => 
  lifeGoals.filter(goal => goal.category === category);

export const getGoalByIdWithJournal = (id: string) => {
  const goal = lifeGoals.find(g => g.id === id);
  if (!goal) return null;
  
  return {
    ...goal,
    // Add blog post content for completed goals
    blogContent: goal.completed && goal.journal ? `# ${goal.title}

${goal.journal}

## Reflections

Completing this goal was a significant milestone in my journey. The process taught me valuable lessons about persistence, dedication, and the importance of setting meaningful objectives.

## What's Next

This achievement opens up new possibilities and sets the foundation for even more ambitious goals ahead.

---

*Gold earned: ${goal.coinReward} coins*
*Completed: ${goal.completedDate}*
` : null
  };
};

export const getTimelineData = () => {
  return goldTransactions
    .filter(t => t.type === 'earned')
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .map(transaction => ({
      date: transaction.date,
      amount: transaction.amount,
      goal: lifeGoals.find(g => g.id === transaction.bucketListItemId),
      description: transaction.description,
    }));
};
