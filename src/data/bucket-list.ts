import { type BucketListItem, type CoinTransaction, type Adventure } from '@/types/adventure';

export const bucketListItems: BucketListItem[] = [
  {
    id: 'climb-5-12a',
    title: 'Complete First 5.12a Climbing Route',
    description: 'Push my climbing skills to the next level by successfully completing a 5.12a difficulty route',
    category: 'adventure',
    completed: false,
    coinReward: 100,
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
    coinReward: 75,
    priority: 'medium',
    difficulty: 3,
    media: [],
    journal: 'Amazing year of reading! Discovered some incredible sci-fi authors and learned a lot about system design.',
    tags: ['reading', 'learning', 'personal-growth'],
  },
  {
    id: 'kayak-whitewater',
    title: 'Master Class IV Whitewater Kayaking',
    description: 'Progress from Class II/III to confidently running Class IV whitewater rapids',
    category: 'adventure',
    completed: false,
    coinReward: 150,
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
    completed: false,
    coinReward: 80,
    priority: 'medium',
    difficulty: 4,
    media: [],
    tags: ['chess', 'strategy', 'mental-training', 'competition'],
  },
  {
    id: 'backpack-jmt',
    title: 'Hike the John Muir Trail',
    description: 'Complete the 211-mile John Muir Trail through the Sierra Nevada mountains',
    category: 'travel',
    completed: false,
    coinReward: 200,
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
    coinReward: 90,
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
    coinReward: 300,
    priority: 'high',
    difficulty: 5,
    estimatedCost: 2000,
    media: [],
    tags: ['entrepreneurship', 'software', 'business', 'passive-income'],
  },
];

export const coinTransactions: CoinTransaction[] = [
  {
    id: 'initial-coins',
    amount: 50,
    reason: 'Starting coins',
    date: '2024-01-01',
    type: 'bonus',
    description: 'Welcome bonus for starting the bucket list journey!',
  },
  {
    id: 'read-50-books-reward',
    amount: 75,
    reason: 'Completed reading 50 books',
    bucketListItemId: 'read-50-books',
    date: '2023-12-28',
    type: 'earned',
    description: 'Amazing achievement! Expanded knowledge across multiple domains.',
  },
  {
    id: 'monthly-bonus-jan',
    amount: 25,
    reason: 'Monthly progress bonus',
    date: '2024-01-31',
    type: 'bonus',
    description: 'Great progress on climbing and Japanese learning goals.',
  },
];

export const adventures: Adventure[] = [
  {
    id: 'boulder-canyon-climb',
    title: 'Boulder Canyon Climbing Session',
    activity: 'rock-climbing',
    date: '2024-01-20',
    location: 'Boulder Canyon, Colorado',
    description: 'Amazing day climbing at Boulder Canyon. Successfully sent my first 5.11c route!',
    media: [],
    difficulty: 4,
    duration: '6 hours',
    companions: ['Alex', 'Sarah'],
    weather: 'Sunny, 45°F',
    highlights: [
      'First successful 5.11c send',
      'Perfect weather conditions',
      'Great climbing partners',
      'Improved confidence on overhangs',
    ],
  },
  {
    id: 'arkansas-river-kayak',
    title: 'Arkansas River Kayaking',
    activity: 'kayaking',
    date: '2024-01-15',
    location: 'Arkansas River, Colorado',
    description: 'Challenging day on the Arkansas River. Ran some Class III rapids and worked on my roll.',
    media: [],
    difficulty: 3,
    duration: '4 hours',
    weather: 'Cold but sunny, 38°F',
    highlights: [
      'Successfully ran Browns Canyon',
      'Improved eskimo roll technique',
      'Saw bald eagles along the river',
      'Great workout in cold conditions',
    ],
  },
];

// Helper functions
export const getTotalCoins = (): number => {
  return coinTransactions.reduce((total, transaction) => {
    return transaction.type === 'earned' || transaction.type === 'bonus' 
      ? total + transaction.amount 
      : total - transaction.amount;
  }, 0);
};

export const getCompletedItems = () => bucketListItems.filter(item => item.completed);
export const getPendingItems = () => bucketListItems.filter(item => !item.completed);
export const getItemsByCategory = (category: BucketListItem['category']) => 
  bucketListItems.filter(item => item.category === category);

export const getRecentAdventures = (limit: number = 5) => 
  adventures
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);
