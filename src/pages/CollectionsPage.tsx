import { useState } from 'react';
import { motion } from 'framer-motion';
import { PageLayout } from '@/components/layout/PageLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FadeInView } from '@/components/animations/FadeInView';
import { 
  animeList,
  booksList,
  musicCollection,
  getAnimeByStatus,
  getBooksByStatus,
  getFavoriteAnime,
  getFavoriteBooks,
  getFavoriteMusic,
  getCurrentlyReading,
  getCurrentlyWatching,
  type AnimeEntry,
  type Book
} from '@/data/collections';
import { 
  Star, 
  Calendar, 
  Clock, 
  Book as BookIcon, 
  Play
} from 'lucide-react';

export const CollectionsPage = () => {
  const [animeFilter, setAnimeFilter] = useState('all');
  const [bookFilter, setBookFilter] = useState('all');

  const getFilteredAnime = (): AnimeEntry[] => {
    switch (animeFilter) {
      case 'watching':
      case 'completed':
      case 'on-hold':
      case 'plan-to-watch':
        return getAnimeByStatus(animeFilter as AnimeEntry['status']);
      case 'favorites':
        return getFavoriteAnime();
      default:
        return animeList;
    }
  };

  const getFilteredBooks = (): Book[] => {
    switch (bookFilter) {
      case 'reading':
      case 'completed':
      case 'to-read':
        return getBooksByStatus(bookFilter as Book['status']);
      case 'favorites':
        return getFavoriteBooks();
      default:
        return booksList;
    }
  };

  const statusColors: Record<string, string> = {
    watching: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    completed: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    'on-hold': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    'plan-to-watch': 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200',
    dropped: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
    reading: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    'to-read': 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200',
    abandoned: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  };

  const renderStars = (rating?: number) => {
    if (!rating) return null;
    return (
      <div className="flex">
        {Array.from({ length: 5 }, (_, i) => (
          <Star
            key={i}
            size={14}
            className={i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}
          />
        ))}
      </div>
    );
  };

  return (
    <PageLayout>
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="space-y-12">
            {/* Header */}
            <FadeInView className="text-center">
              <motion.h1 
                className="text-4xl md:text-5xl font-bold mb-6"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                Collections 📚
              </motion.h1>
              <motion.p 
                className="text-xl text-muted-foreground max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                My curated collections of anime, books, and music. 
                Tracking what I've enjoyed and what's next on the list.
              </motion.p>
            </FadeInView>

            {/* Quick Stats */}
            <FadeInView>
              <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-8">
                <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600 mb-1">{getCurrentlyWatching().length}</div>
                  <div className="text-xs text-muted-foreground">Watching</div>
                </div>
                <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <div className="text-2xl font-bold text-green-600 mb-1">{getAnimeByStatus('completed').length}</div>
                  <div className="text-xs text-muted-foreground">Anime Done</div>
                </div>
                <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600 mb-1">{getCurrentlyReading().length}</div>
                  <div className="text-xs text-muted-foreground">Reading</div>
                </div>
                <div className="text-center p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600 mb-1">{getBooksByStatus('completed').length}</div>
                  <div className="text-xs text-muted-foreground">Books Done</div>
                </div>
                <div className="text-center p-4 bg-pink-50 dark:bg-pink-900/20 rounded-lg">
                  <div className="text-2xl font-bold text-pink-600 mb-1">{getFavoriteMusic().length}</div>
                  <div className="text-xs text-muted-foreground">Fav Albums</div>
                </div>
                <div className="text-center p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                  <div className="text-2xl font-bold text-yellow-600 mb-1">{musicCollection.length}</div>
                  <div className="text-xs text-muted-foreground">Music Total</div>
                </div>
              </div>
            </FadeInView>

            {/* Collections Tabs */}
            <Tabs defaultValue="anime" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="anime" className="flex items-center space-x-2">
                  <span>🎌</span>
                  <span>Anime</span>
                </TabsTrigger>
                <TabsTrigger value="books" className="flex items-center space-x-2">
                  <span>📚</span>
                  <span>Books</span>
                </TabsTrigger>
                <TabsTrigger value="music" className="flex items-center space-x-2">
                  <span>🎵</span>
                  <span>Music</span>
                </TabsTrigger>
              </TabsList>

              {/* Anime Tab */}
              <TabsContent value="anime" className="space-y-8">
                {/* Anime Filters */}
                <div className="flex flex-wrap justify-center gap-2">
                  {['all', 'watching', 'completed', 'plan-to-watch', 'favorites'].map((filter) => (
                    <Button
                      key={filter}
                      variant={animeFilter === filter ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setAnimeFilter(filter)}
                    >
                      {filter.replace('-', ' ')}
                    </Button>
                  ))}
                </div>

                {/* Anime Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {getFilteredAnime().map((anime, index) => (
                    <motion.div
                      key={anime.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="h-full hover:shadow-lg transition-all duration-300">
                        <CardHeader className="space-y-3">
                          <div className="flex items-center justify-between">
                            <Badge className={statusColors[anime.status]}>
                              {anime.status.replace('-', ' ')}
                            </Badge>
                            {anime.favorite && <Star className="text-yellow-500 fill-current" size={16} />}
                          </div>
                          <CardTitle className="text-lg line-clamp-2">{anime.title}</CardTitle>
                          {anime.japaneseTitle && (
                            <p className="text-sm text-muted-foreground">{anime.japaneseTitle}</p>
                          )}
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <p className="text-sm text-muted-foreground line-clamp-3">{anime.synopsis}</p>
                          
                          <div className="flex items-center justify-between text-sm">
                            <span>{anime.watchedEpisodes}/{anime.episodes} episodes</span>
                            {anime.rating && renderStars(anime.rating)}
                          </div>
                          
                          <div className="flex flex-wrap gap-1">
                            {anime.genre.slice(0, 3).map((genre) => (
                              <Badge key={genre} variant="secondary" className="text-xs">
                                {genre}
                              </Badge>
                            ))}
                          </div>
                          
                          <div className="text-xs text-muted-foreground">
                            {anime.studio} • {anime.year}
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>

              {/* Books Tab */}
              <TabsContent value="books" className="space-y-8">
                {/* Book Filters */}
                <div className="flex flex-wrap justify-center gap-2">
                  {['all', 'reading', 'completed', 'to-read', 'favorites'].map((filter) => (
                    <Button
                      key={filter}
                      variant={bookFilter === filter ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setBookFilter(filter)}
                    >
                      {filter.replace('-', ' ')}
                    </Button>
                  ))}
                </div>

                {/* Books Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {getFilteredBooks().map((book, index) => (
                    <motion.div
                      key={book.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="h-full hover:shadow-lg transition-all duration-300">
                        <CardHeader className="space-y-3">
                          <div className="flex items-center justify-between">
                            <Badge className={statusColors[book.status]}>
                              {book.status.replace('-', ' ')}
                            </Badge>
                            {book.favorite && <Star className="text-yellow-500 fill-current" size={16} />}
                          </div>
                          <CardTitle className="text-lg line-clamp-2">{book.title}</CardTitle>
                          <p className="text-sm text-muted-foreground">by {book.author}</p>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center space-x-1">
                              <BookIcon size={14} />
                              <span>{book.pageCount} pages</span>
                            </div>
                            {book.rating && renderStars(book.rating)}
                          </div>
                          
                          {book.status === 'reading' && book.currentPage && (
                            <div className="w-full bg-secondary rounded-full h-2">
                              <div 
                                className="bg-primary h-2 rounded-full transition-all duration-300"
                                style={{ width: `${(book.currentPage / (book.pageCount || 1)) * 100}%` }}
                              />
                            </div>
                          )}
                          
                          <div className="flex flex-wrap gap-1">
                            {book.genre.slice(0, 3).map((genre) => (
                              <Badge key={genre} variant="secondary" className="text-xs">
                                {genre}
                              </Badge>
                            ))}
                          </div>
                          
                          {book.notes && (
                            <p className="text-xs text-muted-foreground line-clamp-2 italic">
                              "{book.notes}"
                            </p>
                          )}
                          
                          <div className="text-xs text-muted-foreground">
                            {book.quotes.length} quotes saved
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>

              {/* Music Tab */}
              <TabsContent value="music" className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {musicCollection.map((album, index) => (
                    <motion.div
                      key={album.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="h-full hover:shadow-lg transition-all duration-300">
                        <CardHeader className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                              <Calendar size={14} />
                              <span>{album.releaseYear}</span>
                            </div>
                            {album.favorite && <Star className="text-yellow-500 fill-current" size={16} />}
                          </div>
                          <CardTitle className="text-lg line-clamp-1">{album.title}</CardTitle>
                          <p className="text-sm text-muted-foreground">by {album.artist}</p>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="flex items-center justify-between">
                            {album.rating && renderStars(album.rating)}
                            <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                              <Clock size={12} />
                              <span>Discovered {new Date(album.dateDiscovered).getFullYear()}</span>
                            </div>
                          </div>
                          
                          <div className="flex flex-wrap gap-1">
                            {album.genre.map((genre) => (
                              <Badge key={genre} variant="secondary" className="text-xs">
                                {genre}
                              </Badge>
                            ))}
                          </div>
                          
                          {album.notes && (
                            <p className="text-xs text-muted-foreground italic line-clamp-2">
                              "{album.notes}"
                            </p>
                          )}
                          
                          <div className="flex space-x-2">
                            {album.spotifyUrl && (
                              <Button size="sm" variant="outline" className="text-xs">
                                <Play size={12} className="mr-1" />
                                Spotify
                              </Button>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};
