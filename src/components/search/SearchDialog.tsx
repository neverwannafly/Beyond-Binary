import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  FileText, 
  User, 
  Briefcase, 
  Book,
  Music,
  Play,
  Target,
  Mountain,
  Mail,
  Hash,
  ArrowRight,
  Command
} from 'lucide-react';

// Import data from various sources
import { getPublicPosts } from '@/data/writing';
import { animeList, booksList, musicCollection } from '@/data/collections';
import { lifeGoals } from '@/data/goals';
import { adventures } from '@/data/adventures';

export interface SearchResult {
  id: string;
  title: string;
  description: string;
  category: 'page' | 'writing' | 'project' | 'goal' | 'adventure' | 'anime' | 'book' | 'music';
  url: string;
  tags?: string[];
  icon?: React.ReactNode;
}

interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const SearchDialog: React.FC<SearchDialogProps> = ({ open, onOpenChange }) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigate = useNavigate();

  // Static pages
  const staticPages: SearchResult[] = [
    {
      id: 'home',
      title: 'Home',
      description: 'Main landing page with hero and about sections',
      category: 'page',
      url: '/',
      icon: <User size={16} />,
    },
    {
      id: 'portfolio',
      title: 'Portfolio',
      description: 'Showcase of technical projects and work',
      category: 'page',
      url: '/portfolio',
      icon: <Briefcase size={16} />,
    },
    {
      id: 'writing',
      title: 'Writing',
      description: 'Blog posts, journal entries, and technical articles',
      category: 'page',
      url: '/writing',
      icon: <FileText size={16} />,
    },
    {
      id: 'adventures',
      title: 'Adventures',
      description: 'Outdoor activities, climbing, and kayaking posts',
      category: 'page',
      url: '/adventures',
      icon: <Mountain size={16} />,
    },
    {
      id: 'goals',
      title: 'Goals',
      description: 'Life goals, achievements, and gold coin tracking',
      category: 'page',
      url: '/goals',
      icon: <Target size={16} />,
    },
    {
      id: 'collections',
      title: 'Collections',
      description: 'Anime, books, and music collections',
      category: 'page',
      url: '/collections',
      icon: <Book size={16} />,
    },
    {
      id: 'contact',
      title: 'Contact',
      description: 'Get in touch and contact information',
      category: 'page',
      url: '/contact',
      icon: <Mail size={16} />,
    },
  ];

  // Generate search results from all data sources
  const allResults = useMemo((): SearchResult[] => {
    const results: SearchResult[] = [...staticPages];

    // Add writing posts
    getPublicPosts().forEach(post => {
      results.push({
        id: `writing-${post.id}`,
        title: post.title,
        description: post.excerpt,
        category: 'writing',
        url: `/writing/${post.slug}`,
        tags: post.tags,
        icon: <FileText size={16} />,
      });
    });

    // Add goals (if they exist)
    if (typeof lifeGoals !== 'undefined') {
      lifeGoals.forEach(goal => {
        results.push({
          id: `goal-${goal.id}`,
          title: goal.title,
          description: goal.description,
          category: 'goal',
          url: `/goals?selected=${goal.id}`,
          icon: <Target size={16} />,
        });
      });
    }

    // Add adventures (if they exist)
    if (typeof adventures !== 'undefined') {
      adventures.forEach(adventure => {
        results.push({
          id: `adventure-${adventure.id}`,
          title: adventure.title,
          description: adventure.description,
          category: 'adventure',
          url: `/adventures?selected=${adventure.id}`,
          tags: [adventure.activity, adventure.location],
          icon: <Mountain size={16} />,
        });
      });
    }

    // Add anime
    animeList.forEach(anime => {
      results.push({
        id: `anime-${anime.id}`,
        title: anime.title,
        description: anime.synopsis,
        category: 'anime',
        url: `/collections?tab=anime&search=${anime.title}`,
        tags: anime.genre,
        icon: <Play size={16} />,
      });
    });

    // Add books
    booksList.forEach(book => {
      results.push({
        id: `book-${book.id}`,
        title: book.title,
        description: `by ${book.author}`,
        category: 'book',
        url: `/collections?tab=books&search=${book.title}`,
        tags: book.genre,
        icon: <Book size={16} />,
      });
    });

    // Add music
    musicCollection.forEach(album => {
      results.push({
        id: `music-${album.id}`,
        title: album.title,
        description: `by ${album.artist}`,
        category: 'music',
        url: `/collections?tab=music&search=${album.title}`,
        tags: album.genre,
        icon: <Music size={16} />,
      });
    });

    return results;
  }, []);

  // Filter results based on query
  const filteredResults = useMemo(() => {
    if (!query.trim()) return staticPages;

    const lowercaseQuery = query.toLowerCase();
    
    return allResults.filter(result => {
      const titleMatch = result.title.toLowerCase().includes(lowercaseQuery);
      const descriptionMatch = result.description.toLowerCase().includes(lowercaseQuery);
      const categoryMatch = result.category.toLowerCase().includes(lowercaseQuery);
      const tagsMatch = result.tags?.some(tag => 
        tag.toLowerCase().includes(lowercaseQuery)
      ) || false;

      return titleMatch || descriptionMatch || categoryMatch || tagsMatch;
    }).slice(0, 10); // Limit to 10 results
  }, [query, allResults]);

  // Handle keyboard navigation
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setSelectedIndex(prev => Math.min(prev + 1, filteredResults.length - 1));
          break;
        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex(prev => Math.max(prev - 1, 0));
          break;
        case 'Enter':
          e.preventDefault();
          if (filteredResults[selectedIndex]) {
            handleResultClick(filteredResults[selectedIndex]);
          }
          break;
        case 'Escape':
          e.preventDefault();
          onOpenChange(false);
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, filteredResults, selectedIndex, onOpenChange]);

  // Reset selection when results change
  useEffect(() => {
    setSelectedIndex(0);
  }, [filteredResults]);

  // Reset search when dialog closes
  useEffect(() => {
    if (!open) {
      setQuery('');
      setSelectedIndex(0);
    }
  }, [open]);

  const handleResultClick = (result: SearchResult) => {
    navigate(result.url);
    onOpenChange(false);
  };

  const getCategoryLabel = (category: SearchResult['category']) => {
    const labels = {
      page: 'Page',
      writing: 'Article',
      project: 'Project',
      goal: 'Goal',
      adventure: 'Adventure',
      anime: 'Anime',
      book: 'Book',
      music: 'Music',
    };
    return labels[category];
  };

  const getCategoryColor = (category: SearchResult['category']) => {
    const colors = {
      page: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      writing: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      project: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
      goal: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
      adventure: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
      anime: 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200',
      book: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200',
      music: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
    };
    return colors[category];
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl p-0 overflow-hidden">
        <DialogHeader className="px-6 pt-6 pb-2">
          <DialogTitle className="flex items-center space-x-2">
            <Search size={20} />
            <span>Search Portfolio</span>
          </DialogTitle>
          <DialogDescription>
            Search for pages, articles, projects, and more
          </DialogDescription>
        </DialogHeader>

        <div className="px-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
            <Input
              value={query}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
              placeholder="Type to search..."
              className="pl-10 text-base"
              autoFocus
            />
          </div>
        </div>

        <div className="max-h-96 overflow-y-auto px-2 pb-4">
          <AnimatePresence mode="wait">
            {filteredResults.length > 0 ? (
              <motion.div
                key="results"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-1 px-4"
              >
                {filteredResults.map((result, index) => (
                  <motion.div
                    key={result.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`group flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-colors ${
                      index === selectedIndex
                        ? 'bg-primary/10 border border-primary/20'
                        : 'hover:bg-secondary/50'
                    }`}
                    onClick={() => handleResultClick(result)}
                  >
                    <div className="flex-shrink-0 text-muted-foreground group-hover:text-foreground">
                      {result.icon}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="font-medium text-sm truncate">{result.title}</h4>
                        <Badge variant="secondary" className={`text-xs ${getCategoryColor(result.category)}`}>
                          {getCategoryLabel(result.category)}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-1">
                        {result.description}
                      </p>
                      {result.tags && result.tags.length > 0 && (
                        <div className="flex items-center space-x-1 mt-1">
                          <Hash size={10} className="text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">
                            {result.tags.slice(0, 3).join(', ')}
                            {result.tags.length > 3 && ` +${result.tags.length - 3} more`}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="flex-shrink-0 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                      <ArrowRight size={14} />
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : query.trim() ? (
              <motion.div
                key="no-results"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-8 px-4"
              >
                <Search size={32} className="mx-auto text-muted-foreground mb-4" />
                <h3 className="font-medium mb-2">No results found</h3>
                <p className="text-sm text-muted-foreground">
                  Try searching for pages, articles, projects, or collections
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="suggestions"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="px-4 py-2"
              >
                <h4 className="text-sm font-medium text-muted-foreground mb-3">Quick Access</h4>
                <div className="space-y-1">
                  {staticPages.slice(0, 5).map((page, index) => (
                    <div
                      key={page.id}
                      className={`group flex items-center space-x-3 p-2 rounded-lg cursor-pointer transition-colors ${
                        index === selectedIndex
                          ? 'bg-primary/10 border border-primary/20'
                          : 'hover:bg-secondary/50'
                      }`}
                      onClick={() => handleResultClick(page)}
                    >
                      <div className="text-muted-foreground group-hover:text-foreground">
                        {page.icon}
                      </div>
                      <span className="text-sm">{page.title}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="border-t border-border px-6 py-3 bg-secondary/30">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <kbd className="px-1.5 py-0.5 rounded border border-border bg-background">↑↓</kbd>
                <span>Navigate</span>
              </div>
              <div className="flex items-center space-x-1">
                <kbd className="px-1.5 py-0.5 rounded border border-border bg-background">↵</kbd>
                <span>Select</span>
              </div>
              <div className="flex items-center space-x-1">
                <kbd className="px-1.5 py-0.5 rounded border border-border bg-background">Esc</kbd>
                <span>Close</span>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              <Command size={12} />
              <span>Search</span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
