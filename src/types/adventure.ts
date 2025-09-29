export interface BucketListItem {
  id: string;
  title: string;
  description: string;
  category: 'travel' | 'adventure' | 'learning' | 'achievement' | 'experience';
  completed: boolean;
  completedDate?: string;
  coinReward: number;
  priority: 'low' | 'medium' | 'high';
  difficulty: 1 | 2 | 3 | 4 | 5;
  estimatedCost?: number;
  location?: string;
  media: BucketListMedia[];
  journal?: string;
  tags: string[];
}

export interface BucketListMedia {
  id: string;
  type: 'image' | 'video';
  url: string;
  caption?: string;
  uploadDate: string;
}

export interface CoinTransaction {
  id: string;
  amount: number;
  reason: string;
  bucketListItemId?: string;
  date: string;
  type: 'earned' | 'spent' | 'bonus';
  description?: string;
}

export interface Adventure {
  id: string;
  title: string;
  activity: 'kayaking' | 'rock-climbing' | 'hiking' | 'camping' | 'other';
  date: string;
  location: string;
  description: string;
  media: AdventureMedia[];
  difficulty: 1 | 2 | 3 | 4 | 5;
  duration: string; // e.g., "2 hours", "full day"
  companions?: string[];
  weather?: string;
  highlights: string[];
  instagramPostId?: string;
}

export interface AdventureMedia {
  id: string;
  type: 'image' | 'video';
  url: string;
  caption?: string;
  uploadDate: string;
  featured: boolean;
}
