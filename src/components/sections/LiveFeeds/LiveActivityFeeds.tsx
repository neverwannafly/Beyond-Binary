import React, { useState } from 'react';
import { motion } from 'framer-motion';
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
  Zap
} from 'lucide-react';

// Types for external API data
interface InstagramPost {
  id: string;
  caption: string;
  media_url: string;
  thumbnail_url?: string;
  media_type: 'IMAGE' | 'VIDEO';
  timestamp: string;
  permalink: string;
}

interface ChessGame {
  game_id: string;
  white: { username: string; rating: number };
  black: { username: string; rating: number };
  time_control: string;
  end_time: number;
  rated: boolean;
  result: string;
  url: string;
}

interface StravaActivity {
  id: string;
  name: string;
  type: string;
  distance: number;
  moving_time: number;
  elevation_gain: number;
  start_date: string;
  location_city?: string;
  location_state?: string;
}

// Mock data - will be replaced with real API calls
const mockInstagramPosts: InstagramPost[] = [
  {
    id: '1',
    caption: 'Incredible climbing session at Flatirons! 🧗‍♂️ The rock quality here never ceases to amaze me. #climbing #colorado #flatirons',
    media_url: '/api/placeholder/400/400',
    media_type: 'IMAGE',
    timestamp: '2024-01-15T10:30:00Z',
    permalink: 'https://instagram.com/p/example1'
  },
  {
    id: '2',
    caption: 'Early morning kayak session on the Arkansas River 🛶 Perfect conditions and amazing sunrise views!',
    media_url: '/api/placeholder/400/400',
    media_type: 'IMAGE',
    timestamp: '2024-01-12T06:45:00Z',
    permalink: 'https://instagram.com/p/example2'
  },
  {
    id: '3',
    caption: 'Weekend coding session with this incredible mountain backdrop 💻⛰️ Remote work perks!',
    media_url: '/api/placeholder/400/400',
    media_type: 'IMAGE',
    timestamp: '2024-01-10T14:20:00Z',
    permalink: 'https://instagram.com/p/example3'
  }
];

const mockChessGames: ChessGame[] = [
  {
    game_id: '1',
    white: { username: 'alwayswannaly', rating: 1842 },
    black: { username: 'opponent1', rating: 1798 },
    time_control: '600',
    end_time: 1642176000,
    rated: true,
    result: '1-0',
    url: 'https://chess.com/game/1'
  },
  {
    game_id: '2',
    white: { username: 'opponent2', rating: 1876 },
    black: { username: 'alwayswannaly', rating: 1842 },
    time_control: '300',
    end_time: 1642089600,
    rated: true,
    result: '0-1',
    url: 'https://chess.com/game/2'
  }
];

const mockStravaActivities: StravaActivity[] = [
  {
    id: '1',
    name: 'Morning Climb at Eldorado Canyon',
    type: 'Rock Climbing',
    distance: 2400,
    moving_time: 7200,
    elevation_gain: 300,
    start_date: '2024-01-14T08:00:00Z',
    location_city: 'Boulder',
    location_state: 'Colorado'
  },
  {
    id: '2', 
    name: 'Arkansas River Kayaking',
    type: 'Kayaking',
    distance: 12000,
    moving_time: 3600,
    elevation_gain: 50,
    start_date: '2024-01-12T07:00:00Z',
    location_city: 'Buena Vista',
    location_state: 'Colorado'
  }
];

const InstagramFeed: React.FC = () => {
  const [posts] = useState<InstagramPost[]>(mockInstagramPosts);

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center space-x-2">
          <Instagram className="text-pink-500" size={20} />
          <span>Latest Adventures</span>
          <Badge variant="outline" className="ml-auto">@alwayswannaly</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {posts.slice(0, 3).map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
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
        <Button variant="outline" className="w-full" asChild>
          <a href="https://instagram.com/alwayswannaly" target="_blank" rel="noopener noreferrer">
            View All Posts
          </a>
        </Button>
      </CardContent>
    </Card>
  );
};

const ChessFeed: React.FC = () => {
  const [games] = useState<ChessGame[]>(mockChessGames);

  const formatTimeControl = (seconds: string) => {
    const mins = parseInt(seconds) / 60;
    return `${mins} min`;
  };

  const getGameResult = (game: ChessGame, isWhite: boolean) => {
    if (game.result === '1-0') return isWhite ? 'Won' : 'Lost';
    if (game.result === '0-1') return isWhite ? 'Lost' : 'Won';
    return 'Draw';
  };

  const getResultColor = (result: string) => {
    if (result === 'Won') return 'text-green-500';
    if (result === 'Lost') return 'text-red-500';
    return 'text-yellow-500';
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center space-x-2">
          <span className="text-2xl">♟️</span>
          <span>Recent Games</span>
          <Badge variant="outline" className="ml-auto">1842 ELO</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {games.slice(0, 3).map((game, index) => {
          const isWhite = game.white.username === 'alwayswannaly';
          const myRating = isWhite ? game.white.rating : game.black.rating;
          const opponentRating = isWhite ? game.black.rating : game.white.rating;
          const result = getGameResult(game, isWhite);
          
          return (
            <motion.div
              key={game.game_id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-3 border rounded-lg hover:bg-secondary/50 transition-colors group"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${isWhite ? 'bg-white border' : 'bg-black'}`} />
                  <span className="font-medium">vs {isWhite ? game.black.username : game.white.username}</span>
                </div>
                <span className={`font-bold ${getResultColor(result)}`}>
                  {result}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>{formatTimeControl(game.time_control)}</span>
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
        <Button variant="outline" className="w-full" asChild>
          <a href="https://chess.com/member/alwayswannaly" target="_blank" rel="noopener noreferrer">
            View Chess Profile
          </a>
        </Button>
      </CardContent>
    </Card>
  );
};

const StravaFeed: React.FC = () => {
  const [activities] = useState<StravaActivity[]>(mockStravaActivities);

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

  return (
    <Card className="h-full">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center space-x-2">
          <Zap className="text-orange-500" size={20} />
          <span>Latest Activities</span>
          <Badge variant="outline" className="ml-auto">Strava</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {activities.slice(0, 3).map((activity, index) => (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
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
        <Button variant="outline" className="w-full" asChild>
          <a href="https://strava.com/athletes/alwayswannaly" target="_blank" rel="noopener noreferrer">
            View Strava Profile
          </a>
        </Button>
      </CardContent>
    </Card>
  );
};

export const LiveActivityFeeds: React.FC = () => {
  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <FadeInView className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Live from the Adventure</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Follow my real-time adventures across the digital and physical worlds
          </p>
        </FadeInView>
        
        <div className="grid md:grid-cols-3 gap-8">
          <FadeInView>
            <InstagramFeed />
          </FadeInView>
          <FadeInView>
            <ChessFeed />
          </FadeInView>
          <FadeInView>
            <StravaFeed />
          </FadeInView>
        </div>
      </div>
    </section>
  );
};
