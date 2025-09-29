export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  publishedDate: string;
  updatedDate?: string;
  author: string;
  tags: string[];
  category: 'technical' | 'personal' | 'tutorial' | 'opinion' | 'project-log';
  featured: boolean;
  readingTime: number; // in minutes
  coverImage?: string;
  status: 'draft' | 'published' | 'archived';
  seoTitle?: string;
  seoDescription?: string;
}

export interface JournalEntry {
  id: string;
  title: string;
  content: string;
  date: string;
  mood?: 'great' | 'good' | 'neutral' | 'low' | 'bad';
  tags: string[];
  private: boolean;
  location?: string;
  weather?: string;
  highlights: string[];
  media?: JournalMedia[];
  linkedBucketItem?: string; // bucket list item ID
}

export interface JournalMedia {
  id: string;
  type: 'image' | 'video' | 'audio';
  url: string;
  caption?: string;
  uploadDate: string;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  isbn?: string;
  coverImage?: string;
  genre: string[];
  status: 'to-read' | 'reading' | 'completed' | 'abandoned';
  rating?: 1 | 2 | 3 | 4 | 5;
  startDate?: string;
  finishDate?: string;
  notes?: string;
  quotes: BookQuote[];
  pageCount?: number;
  currentPage?: number;
  favorite: boolean;
}

export interface BookQuote {
  id: string;
  text: string;
  page?: number;
  chapter?: string;
  date: string;
  note?: string;
}

export interface AnimeEntry {
  id: string;
  title: string;
  japaneseTitle?: string;
  synopsis: string;
  status: 'watching' | 'completed' | 'on-hold' | 'dropped' | 'plan-to-watch';
  rating?: 1 | 2 | 3 | 4 | 5;
  episodes: number;
  watchedEpisodes: number;
  genre: string[];
  studio: string;
  year: number;
  season?: 'spring' | 'summer' | 'fall' | 'winter';
  coverImage?: string;
  startDate?: string;
  finishDate?: string;
  notes?: string;
  favorite: boolean;
  malId?: number; // MyAnimeList ID for API integration
}
