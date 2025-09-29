import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FadeInView } from '@/components/animations/FadeInView';
import { 
  Instagram, 
  ExternalLink, 
  MapPin,
  Timer,
  Mountain,
  Activity,
  Target,
  Zap,
  ChevronLeft,
  ChevronRight,
  GitBranch
} from 'lucide-react';
import { fetchAllLiveData, type InstagramPost, type ChessGame, type StravaActivity, type GitHubStats } from '@/services/realDataService';

interface FeedData {
  id: string;
  title: string;
  icon: React.ReactNode;
  badge: string;
  color: string;
  data: any;
  type: 'instagram' | 'chess' | 'strava' | 'github';
}

const StackedLiveFeeds: React.FC = () => {
  const [currentFeedIndex, setCurrentFeedIndex] = useState(0);
  const [liveData, setLiveData] = useState<{
    github: GitHubStats | null;
    chess: ChessGame[];
    strava: StravaActivity[];
    instagram: InstagramPost[];
  }>({
    github: null,
    chess: [],
    strava: [],
    instagram: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchAllLiveData();
        setLiveData(data);
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
      id: 'instagram',
      title: 'Latest Adventures',
      icon: <Instagram className="text-pink-500" size={24} />,
      badge: '@alwayswannaly',
      color: 'from-pink-500 to-purple-600',
      data: liveData.instagram,
      type: 'instagram'
    },
    {
      id: 'chess',
      title: 'Recent Chess Games',
      icon: <span className="text-2xl">♟️</span>,
      badge: '1842 ELO',
      color: 'from-amber-500 to-orange-600',
      data: liveData.chess,
      type: 'chess'
    },
    {
      id: 'strava',
      title: 'Outdoor Activities',
      icon: <Zap className="text-orange-500" size={24} />,
      badge: 'Strava',
      color: 'from-orange-500 to-red-600',
      data: liveData.strava,
      type: 'strava'
    },
    {
      id: 'github',
      title: 'Code Contributions',
      icon: <GitBranch className="text-gray-700 dark:text-gray-300" size={24} />,
      badge: 'neverwannafly',
      color: 'from-gray-600 to-gray-800',
      data: liveData.github,
      type: 'github'
    }
  ];

  const nextFeed = () => {
    setCurrentFeedIndex((prev) => (prev + 1) % feeds.length);
  };

  const prevFeed = () => {
    setCurrentFeedIndex((prev) => (prev - 1 + feeds.length) % feeds.length);
  };

  const currentFeed = feeds[currentFeedIndex];

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  const formatDistance = (meters: number) => {
    if (meters < 1000) return `${meters}m`;
    return `${(meters / 1000).toFixed(1)}km`;
  };

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
  };

  const getActivityIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'rock climbing':
      case 'climbing':
        return <Mountain className="text-orange-500" size={16} />;
      case 'kayaking':
        return <Activity className="text-blue-500" size={16} />;
      case 'hiking':
        return <Mountain className="text-green-500" size={16} />;
      default:
        return <Activity className="text-primary" size={16} />;
    }
  };

  const renderFeedContent = () => {
    if (loading) {
      return (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="flex space-x-3">
                <div className="w-16 h-16 bg-secondary rounded-lg" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-secondary rounded w-3/4" />
                  <div className="h-3 bg-secondary rounded w-1/2" />
                </div>
              </div>
            </div>
          ))}
        </div>
      );
    }

    switch (currentFeed.type) {
      case 'instagram':
        return (
          <div className="space-y-4">
            {(currentFeed.data as InstagramPost[]).slice(0, 3).map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <div className="flex space-x-3">
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={post.media_url}
                      alt="Instagram post"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                      {post.caption}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">
                        {formatDate(post.timestamp)}
                      </span>
                      <Button variant="ghost" size="sm" asChild>
                        <a href={post.permalink} target="_blank" rel="noopener noreferrer">
                          <ExternalLink size={14} />
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        );

      case 'chess':
        return (
          <div className="space-y-4">
            {(currentFeed.data as ChessGame[]).slice(0, 3).map((game, index) => {
              const isWhite = game.white.username === 'alwayswannaly';
              const myRating = isWhite ? game.white.rating : game.black.rating;
              const opponentRating = isWhite ? game.black.rating : game.white.rating;
              const opponentName = isWhite ? game.black.username : game.white.username;
              
              let result = 'Draw';
              if (game.result === '1-0') result = isWhite ? 'Won' : 'Lost';
              if (game.result === '0-1') result = isWhite ? 'Lost' : 'Won';
              
              const resultColor = result === 'Won' ? 'text-green-500' : result === 'Lost' ? 'text-red-500' : 'text-yellow-500';
              
              return (
                <motion.div
                  key={game.game_id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-3 border rounded-lg hover:bg-secondary/50 transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <div className={`w-3 h-3 rounded-full ${isWhite ? 'bg-white border' : 'bg-black'}`} />
                      <span className="font-medium">vs {opponentName}</span>
                    </div>
                    <span className={`font-bold ${resultColor}`}>
                      {result}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>{Math.floor(parseInt(game.time_control) / 60)} min</span>
                    <span>{myRating} vs {opponentRating}</span>
                    <Button variant="ghost" size="sm" asChild>
                      <a href={game.url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink size={14} />
                      </a>
                    </Button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        );

      case 'strava':
        return (
          <div className="space-y-4">
            {(currentFeed.data as StravaActivity[]).slice(0, 3).map((activity, index) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-3 border rounded-lg hover:bg-secondary/50 transition-colors"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    {getActivityIcon(activity.type)}
                    <span className="font-medium text-sm">{activity.name}</span>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 text-xs text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Target size={12} />
                    <span>{formatDistance(activity.distance)}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Timer size={12} />
                    <span>{formatDuration(activity.moving_time)}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Mountain size={12} />
                    <span>{activity.elevation_gain}m</span>
                  </div>
                </div>
                {activity.location_city && (
                  <div className="flex items-center space-x-1 mt-2 text-xs text-muted-foreground">
                    <MapPin size={12} />
                    <span>{activity.location_city}, {activity.location_state}</span>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        );

      case 'github':
        const github = currentFeed.data as GitHubStats;
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 border rounded-lg">
                <div className="text-2xl font-bold text-primary">{github?.publicRepos || 0}</div>
                <div className="text-xs text-muted-foreground">Public Repos</div>
              </div>
              <div className="text-center p-3 border rounded-lg">
                <div className="text-2xl font-bold text-primary">{github?.totalCommits || 0}</div>
                <div className="text-xs text-muted-foreground">Total Commits</div>
              </div>
            </div>
            <div className="p-3 border rounded-lg">
              <div className="text-sm font-medium mb-2">Recent Activity</div>
              <div className="text-xs text-muted-foreground">
                Active on GitHub with consistent contributions. Check the full heatmap below!
              </div>
            </div>
          </div>
        );

      default:
        return <div>No data available</div>;
    }
  };

  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <FadeInView className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Live from the Adventure</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Real-time updates from my digital and physical adventures
          </p>
        </FadeInView>
        
        <div className="max-w-2xl mx-auto">
          <div className="relative">
            {/* Background Cards (Stack Effect) */}
            <div className="absolute inset-0">
              {feeds.map((_, index) => {
                const offset = Math.abs(index - currentFeedIndex);
                if (offset > 2) return null;
                
                return (
                  <div
                    key={index}
                    className="absolute inset-0 bg-card border rounded-xl shadow-lg"
                    style={{
                      transform: `translateY(${offset * 4}px) scale(${1 - offset * 0.02})`,
                      opacity: 1 - offset * 0.2,
                      zIndex: 10 - offset
                    }}
                  />
                );
              })}
            </div>

            {/* Main Card */}
            <Card className="relative z-20 min-h-[500px]">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg bg-gradient-to-r ${currentFeed.color}`}>
                      <div className="text-white">
                        {currentFeed.icon}
                      </div>
                    </div>
                    <div>
                      <div className="text-lg">{currentFeed.title}</div>
                      <Badge variant="outline" className="mt-1">
                        {currentFeed.badge}
                      </Badge>
                    </div>
                  </CardTitle>
                  
                  {/* Navigation */}
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={prevFeed}
                      className="w-8 h-8 p-0"
                    >
                      <ChevronLeft size={16} />
                    </Button>
                    <div className="text-sm text-muted-foreground px-2">
                      {currentFeedIndex + 1} / {feeds.length}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={nextFeed}
                      className="w-8 h-8 p-0"
                    >
                      <ChevronRight size={16} />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentFeedIndex}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    {renderFeedContent()}
                  </motion.div>
                </AnimatePresence>
                
                {/* External Link */}
                <div className="mt-6 pt-4 border-t">
                  <Button variant="outline" className="w-full" asChild>
                    <a 
                      href={
                        currentFeed.type === 'instagram' ? 'https://instagram.com/alwayswannaly' :
                        currentFeed.type === 'chess' ? 'https://chess.com/member/alwayswannaly' :
                        currentFeed.type === 'strava' ? 'https://strava.com/athletes/alwayswannaly' :
                        'https://github.com/neverwannafly'
                      } 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      View Full Profile
                      <ExternalLink size={16} className="ml-2" />
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Dot Indicators */}
            <div className="flex justify-center space-x-2 mt-6">
              {feeds.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentFeedIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentFeedIndex 
                      ? 'bg-primary w-6' 
                      : 'bg-secondary hover:bg-secondary/80'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StackedLiveFeeds;
