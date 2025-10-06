import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FadeInView } from '@/components/animations/FadeInView';
import { 
  ExternalLink, 
  ChevronLeft,
  ChevronRight,
  Pause,
  Play
} from 'lucide-react';
import { fetchAllLiveData, type GitHubStats, type ChessStats } from '@/services/realDataService';
import { ChessStatsCard } from './ChessStatsCard';
import { GitHubStatsCard } from './GitHubStatsCard';

interface FeedData {
  id: string;
  title: string;
  icon: string;
  badge: string;
  data: any;
  type: 'chess' | 'github';
  gradient: string;
  link: string;
}

const StackedLiveFeeds: React.FC = () => {
  const [currentFeedIndex, setCurrentFeedIndex] = useState(0);
  const [liveData, setLiveData] = useState<{
    github: GitHubStats | null;
    chess: ChessStats | null;
  }>({
    github: null,
    chess: null
  });
  const [loading, setLoading] = useState(true);
  const [autoRotate, setAutoRotate] = useState(true);
  const [direction, setDirection] = useState(0);

  // Auto-rotation timer
  useEffect(() => {
    if (!autoRotate) return;
    
    const timer = setInterval(() => {
      nextFeed();
    }, 8000);

    return () => clearInterval(timer);
  }, [autoRotate, currentFeedIndex]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchAllLiveData();
        setLiveData({
          github: data.github,
          chess: data.chess
        });
      } catch (error) {
        console.error('Failed to load live data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const feeds: FeedData[] = [
    {
      id: 'chess',
      title: 'Chess Performance',
      icon: '♟️',
      badge: liveData.chess ? `${liveData.chess.currentRating} ELO` : 'Chess',
      data: liveData.chess,
      type: 'chess',
      gradient: 'from-amber-500/20 via-orange-500/20 to-red-500/20',
      link: 'https://chess.com/member/alwayswannaly'
    },
    {
      id: 'github',
      title: 'Code Contributions',
      icon: '💻',
      badge: 'neverwannafly',
      data: liveData.github,
      type: 'github',
      gradient: 'from-blue-500/20 via-purple-500/20 to-pink-500/20',
      link: 'https://github.com/neverwannafly'
    }
  ];

  const nextFeed = () => {
    setDirection(1);
    setCurrentFeedIndex((prev) => (prev + 1) % feeds.length);
  };

  const prevFeed = () => {
    setDirection(-1);
    setCurrentFeedIndex((prev) => (prev - 1 + feeds.length) % feeds.length);
  };

  const currentFeed = feeds[currentFeedIndex];

  const renderFeedContent = () => {
    if (loading) {
      return (
        <div className="space-y-4 p-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="flex space-x-3">
                <div className="w-16 h-16 bg-muted/30 rounded-lg" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-muted/30 rounded w-3/4" />
                  <div className="h-3 bg-muted/30 rounded w-1/2" />
                </div>
              </div>
            </div>
          ))}
        </div>
      );
    }

    switch (currentFeed.type) {
      case 'chess':
        const chessStats = currentFeed.data as ChessStats;
        return chessStats ? (
          <ChessStatsCard stats={chessStats} />
        ) : (
          <div className="text-center text-muted-foreground py-12">
            No chess data available
          </div>
        );

      case 'github':
        const githubStats = currentFeed.data as GitHubStats;
        return githubStats ? (
          <GitHubStatsCard stats={githubStats} />
        ) : (
          <div className="text-center text-muted-foreground py-12">
            No GitHub data available
          </div>
        );

      default:
        return <div>No data available</div>;
    }
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.9,
      rotateY: direction > 0 ? 45 : -45
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0,
      zIndex: 10
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.9,
      rotateY: direction < 0 ? 45 : -45,
      zIndex: 0
    })
  };

  return (
    <section className="py-12 sm:py-20 relative overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-secondary/5 to-background" />
      
      <div className="container mx-auto px-4 relative z-10">
        <FadeInView className="text-center mb-8 sm:mb-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Live Performance
            </h2>
            <p className="text-base sm:text-xl text-muted-foreground max-w-3xl mx-auto px-4">
              Real-time stats from my coding and chess adventures
            </p>
          </motion.div>
        </FadeInView>
        
        <div className="max-w-4xl mx-auto">
          <div className="relative perspective-1000" style={{ perspective: '1500px' }}>
            {/* Background Stacked Cards - 3D Effect - Hidden on mobile */}
            <div className="absolute inset-0 pointer-events-none hidden sm:block">
              {feeds.map((feed, index) => {
                if (index === currentFeedIndex) return null;
                
                const offset = index < currentFeedIndex ? -1 : 1;
                const distance = Math.abs(index - currentFeedIndex);
                
                return (
                  <motion.div
                    key={feed.id}
                    className={`absolute inset-0 rounded-2xl border border-border/20 backdrop-blur-xl bg-gradient-to-br ${feed.gradient}`}
                    initial={false}
                    animate={{
                      y: distance * 20,
                      scale: 1 - distance * 0.05,
                      opacity: 0.4 - distance * 0.2,
                      rotateX: offset * 5,
                      z: -distance * 100,
                    }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 300, 
                      damping: 30 
                    }}
                    style={{
                      transformStyle: 'preserve-3d',
                    }}
                  />
                );
              })}
            </div>

            {/* Main Active Card */}
            <div className="relative" style={{ transformStyle: 'preserve-3d' }}>
              <Card className="relative overflow-hidden border border-border/50 sm:border-2 backdrop-blur-xl bg-card/95 shadow-xl sm:shadow-2xl">
                {/* Gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${currentFeed.gradient} opacity-50 mix-blend-overlay`} />
                
                {/* Header */}
                <div className="relative border-b border-border/50 bg-card/50 backdrop-blur-sm">
                  <div className="flex items-center justify-between p-4 sm:p-6 gap-2">
                    <div className="flex items-center space-x-2 sm:space-x-4 min-w-0 flex-1">
                      <motion.div 
                        className="text-2xl sm:text-4xl shrink-0"
                        animate={{ 
                          rotate: [0, 10, -10, 0],
                          scale: [1, 1.1, 1.1, 1]
                        }}
                        transition={{ 
                          duration: 2, 
                          repeat: Infinity,
                          repeatDelay: 3
                        }}
                      >
                        {currentFeed.icon}
                      </motion.div>
                      <div className="min-w-0">
                        <h3 className="text-base sm:text-xl font-bold text-foreground truncate">
                          {currentFeed.title}
                        </h3>
                        <Badge variant="outline" className="mt-1 border-primary/30 text-xs sm:text-sm">
                          {currentFeed.badge}
                        </Badge>
                      </div>
                    </div>
                    
                    {/* Controls */}
                    <div className="flex items-center space-x-1 sm:space-x-2 shrink-0">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setAutoRotate(!autoRotate)}
                        className="w-8 h-8 sm:w-9 sm:h-9 p-0"
                        title={autoRotate ? 'Pause' : 'Play'}
                      >
                        {autoRotate ? <Pause className="w-3 h-3 sm:w-4 sm:h-4" /> : <Play className="w-3 h-3 sm:w-4 sm:h-4" />}
                      </Button>
                      
                      <div className="h-4 sm:h-6 w-px bg-border" />
                      
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={prevFeed}
                        className="w-8 h-8 sm:w-9 sm:h-9 p-0"
                      >
                        <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4" />
                      </Button>
                      
                      <div className="text-xs sm:text-sm text-muted-foreground font-mono px-1 sm:px-2">
                        {currentFeedIndex + 1}/{feeds.length}
                      </div>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={nextFeed}
                        className="w-8 h-8 sm:w-9 sm:h-9 p-0"
                      >
                        <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
                
                {/* Content */}
                <div className="relative min-h-[500px] sm:min-h-[600px]">
                  <AnimatePresence mode="wait" custom={direction} initial={false}>
                    <motion.div
                      key={currentFeedIndex}
                      custom={direction}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{
                        x: { type: "spring", stiffness: 300, damping: 30 },
                        opacity: { duration: 0.3 },
                        scale: { duration: 0.3 },
                        rotateY: { duration: 0.4 }
                      }}
                      style={{ transformStyle: 'preserve-3d' }}
                    >
                      {renderFeedContent()}
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Footer */}
                <div className="relative border-t border-border/50 p-4 sm:p-6 bg-card/50 backdrop-blur-sm">
                  <Button 
                    variant="outline" 
                    className="w-full group hover:bg-primary hover:text-primary-foreground transition-all text-sm sm:text-base" 
                    asChild
                  >
                    <a 
                      href={currentFeed.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      <span>View Full Profile</span>
                      <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </a>
                  </Button>
                </div>
              </Card>
            </div>

            {/* Dot Indicators */}
            <div className="flex justify-center space-x-2 sm:space-x-3 mt-6 sm:mt-8">
              {feeds.map((feed, index) => (
                <motion.button
                  key={feed.id}
                  onClick={() => {
                    setDirection(index > currentFeedIndex ? 1 : -1);
                    setCurrentFeedIndex(index);
                  }}
                  className="relative group"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <div className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 ${
                    index === currentFeedIndex 
                      ? 'w-8 sm:w-12 bg-primary' 
                      : 'w-1.5 sm:w-2 bg-muted-foreground/30 group-hover:bg-muted-foreground/60'
                  }`} />
                  
                  {/* Tooltip - hidden on mobile */}
                  <div className="hidden sm:block absolute -top-8 left-1/2 transform -translate-x-1/2 bg-popover text-popover-foreground px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-border shadow-lg">
                    {feed.title}
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StackedLiveFeeds;