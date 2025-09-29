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
  malId?: number;
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
  goodreadsUrl?: string;
}

export interface BookQuote {
  id: string;
  text: string;
  page?: number;
  chapter?: string;
  date: string;
  note?: string;
}

export interface MusicAlbum {
  id: string;
  title: string;
  artist: string;
  genre: string[];
  releaseYear: number;
  coverImage?: string;
  rating?: 1 | 2 | 3 | 4 | 5;
  favorite: boolean;
  dateDiscovered: string;
  notes?: string;
  spotifyUrl?: string;
  appleMusicUrl?: string;
  tracks?: MusicTrack[];
}

export interface MusicTrack {
  id: string;
  title: string;
  duration: string;
  favorite: boolean;
}

// Sample data
export const animeList: AnimeEntry[] = [
  {
    id: 'attack-on-titan',
    title: 'Attack on Titan',
    japaneseTitle: '進撃の巨人',
    synopsis: 'Humanity fights for survival against giant humanoid Titans in a walled city.',
    status: 'completed',
    rating: 5,
    episodes: 87,
    watchedEpisodes: 87,
    genre: ['Action', 'Drama', 'Fantasy'],
    studio: 'Mappa',
    year: 2013,
    season: 'spring',
    startDate: '2023-01-15',
    finishDate: '2023-04-20',
    notes: 'Incredible storytelling and plot twists. The final season was mind-blowing.',
    favorite: true,
  },
  {
    id: 'demon-slayer',
    title: 'Demon Slayer',
    japaneseTitle: '鬼滅の刃',
    synopsis: 'A young boy becomes a demon slayer to save his sister who was turned into a demon.',
    status: 'completed',
    rating: 4,
    episodes: 44,
    watchedEpisodes: 44,
    genre: ['Action', 'Supernatural', 'Historical'],
    studio: 'Ufotable',
    year: 2019,
    season: 'spring',
    startDate: '2023-05-01',
    finishDate: '2023-06-15',
    notes: 'Amazing animation quality, especially the fight scenes.',
    favorite: true,
  },
  {
    id: 'jujutsu-kaisen',
    title: 'Jujutsu Kaisen',
    japaneseTitle: '呪術廻戦',
    synopsis: 'High school student joins a secret organization of Jujutsu Sorcerers to kill a powerful Curse.',
    status: 'watching',
    rating: 4,
    episodes: 24,
    watchedEpisodes: 18,
    genre: ['Action', 'School', 'Supernatural'],
    studio: 'Mappa',
    year: 2020,
    season: 'fall',
    startDate: '2024-01-01',
    notes: 'Great character development and power system.',
    favorite: false,
  },
  {
    id: 'spirited-away',
    title: 'Spirited Away',
    japaneseTitle: '千と千尋の神隠し',
    synopsis: 'A girl enters a world ruled by gods and witches where humans are changed into beasts.',
    status: 'completed',
    rating: 5,
    episodes: 1,
    watchedEpisodes: 1,
    genre: ['Adventure', 'Family', 'Supernatural'],
    studio: 'Studio Ghibli',
    year: 2001,
    finishDate: '2023-12-25',
    notes: 'Miyazaki masterpiece. Rewatched during holidays with family.',
    favorite: true,
  },
];

export const booksList: Book[] = [
  {
    id: 'project-hail-mary',
    title: 'Project Hail Mary',
    author: 'Andy Weir',
    genre: ['Science Fiction', 'Thriller'],
    status: 'completed',
    rating: 5,
    startDate: '2023-11-01',
    finishDate: '2023-11-15',
    pageCount: 496,
    notes: 'Incredible hard sci-fi with humor. The friendship with Rocky was beautiful.',
    quotes: [
      {
        id: 'quote-1',
        text: 'I penetrated the outer cell membrane with a nanosyringe.',
        page: 150,
        date: '2023-11-10',
        note: 'Classic Grace humor in a serious moment',
      },
    ],
    favorite: true,
  },
  {
    id: 'designing-data-intensive',
    title: 'Designing Data-Intensive Applications',
    author: 'Martin Kleppmann',
    genre: ['Technology', 'Computer Science'],
    status: 'reading',
    rating: 4,
    startDate: '2024-01-15',
    pageCount: 590,
    currentPage: 245,
    notes: 'Deep dive into distributed systems. Taking it slow to absorb concepts.',
    quotes: [
      {
        id: 'quote-2',
        text: 'In a distributed system, you cannot rely on system clocks.',
        page: 287,
        date: '2024-02-01',
        note: 'Key insight about distributed systems timing',
      },
    ],
    favorite: false,
  },
  {
    id: 'atomic-habits',
    title: 'Atomic Habits',
    author: 'James Clear',
    genre: ['Self-Help', 'Psychology'],
    status: 'completed',
    rating: 4,
    startDate: '2023-09-01',
    finishDate: '2023-09-20',
    pageCount: 320,
    notes: 'Practical advice on habit formation. Applied the 1% better concept to climbing training.',
    quotes: [
      {
        id: 'quote-3',
        text: 'You do not rise to the level of your goals. You fall to the level of your systems.',
        page: 27,
        date: '2023-09-05',
        note: 'Core philosophy of the book',
      },
    ],
    favorite: true,
  },
  {
    id: 'the-pragmatic-programmer',
    title: 'The Pragmatic Programmer',
    author: 'David Thomas, Andrew Hunt',
    genre: ['Technology', 'Programming'],
    status: 'to-read',
    pageCount: 352,
    notes: 'Classic programming book on my reading list.',
    quotes: [],
    favorite: false,
  },
];

export const musicCollection: MusicAlbum[] = [
  {
    id: 'in-rainbows',
    title: 'In Rainbows',
    artist: 'Radiohead',
    genre: ['Alternative Rock', 'Art Rock'],
    releaseYear: 2007,
    rating: 5,
    favorite: true,
    dateDiscovered: '2020-03-15',
    notes: 'Perfect album for coding sessions. "15 Step" is my go-to focus track.',
    tracks: [
      { id: '15-step', title: '15 Step', duration: '3:57', favorite: true },
      { id: 'bodysnatchers', title: 'Bodysnatchers', duration: '4:02', favorite: false },
      { id: 'nude', title: 'Nude', duration: '4:15', favorite: true },
    ],
  },
  {
    id: 'random-access-memories',
    title: 'Random Access Memories',
    artist: 'Daft Punk',
    genre: ['Electronic', 'Funk', 'Disco'],
    releaseYear: 2013,
    rating: 5,
    favorite: true,
    dateDiscovered: '2019-08-10',
    notes: 'Masterpiece blend of electronic and live instrumentation.',
  },
  {
    id: 'currents',
    title: 'Currents',
    artist: 'Tame Impala',
    genre: ['Psychedelic Pop', 'Electronic'],
    releaseYear: 2015,
    rating: 4,
    favorite: true,
    dateDiscovered: '2021-05-20',
    notes: 'Great for outdoor adventures and kayaking sessions.',
  },
  {
    id: 'bon-iver',
    title: 'For Emma, Forever Ago',
    artist: 'Bon Iver',
    genre: ['Indie Folk', 'Alternative'],
    releaseYear: 2007,
    rating: 4,
    favorite: false,
    dateDiscovered: '2022-11-12',
    notes: 'Perfect for quiet evening reflection and journaling.',
  },
];

// Helper functions
export const getAnimeByStatus = (status: AnimeEntry['status']) => 
  animeList.filter(anime => anime.status === status);

export const getFavoriteAnime = () => animeList.filter(anime => anime.favorite);

export const getBooksByStatus = (status: Book['status']) => 
  booksList.filter(book => book.status === status);

export const getFavoriteBooks = () => booksList.filter(book => book.favorite);

export const getFavoriteMusic = () => musicCollection.filter(album => album.favorite);

export const getRecentlyDiscovered = () => 
  musicCollection
    .sort((a, b) => new Date(b.dateDiscovered).getTime() - new Date(a.dateDiscovered).getTime())
    .slice(0, 5);

export const getCurrentlyReading = () => getBooksByStatus('reading');

export const getCurrentlyWatching = () => getAnimeByStatus('watching');
