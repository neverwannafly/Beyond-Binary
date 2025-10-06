import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { ChessStats } from '@/services/realDataService';
import { Trophy, TrendingUp, Target, Circle, ExternalLink } from 'lucide-react';

interface ChessStatsCardProps {
  stats: ChessStats;
}

type TimeClass = 'all' | 'blitz' | 'bullet' | 'rapid';

export const ChessStatsCard: React.FC<ChessStatsCardProps> = ({ stats }) => {
  const [activeTab, setActiveTab] = useState<TimeClass>('all');

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  // Filter data by time class
  const filteredData = useMemo(() => {
    if (activeTab === 'all') {
      return {
        games: stats.recentGames,
        rating: stats.currentRating,
        bestRating: stats.bestRating,
        avgRating: stats.averageRating,
        progress: stats.ratingProgress
      };
    }

    const filtered = stats.recentGames.filter(g => g.time_class === activeTab);
    const progressFiltered = stats.ratingProgress.filter(p => p.gameType === activeTab);
    
    const ratings = progressFiltered.map(p => p.rating);
    const currentRating = ratings[ratings.length - 1] || stats.currentRating;
    const bestRating = Math.max(...ratings, 0);
    const avgRating = ratings.length > 0 ? Math.round(ratings.reduce((a, b) => a + b, 0) / ratings.length) : 0;

    return {
      games: filtered,
      rating: currentRating,
      bestRating,
      avgRating,
      progress: progressFiltered
    };
  }, [activeTab, stats]);

  // Calculate W/L/D for filtered data
  const { wins, losses, draws, total } = useMemo(() => {
    let w = 0, l = 0, d = 0;
    filteredData.games.forEach(game => {
      const isUserWhite = game.white.username === 'alwayswannaly';
      const isWin = (isUserWhite && game.result === '1-0') || (!isUserWhite && game.result === '0-1');
      const isDraw = game.result === '1/2-1/2';
      
      if (isWin) w++;
      else if (isDraw) d++;
      else l++;
    });
    return { wins: w, losses: l, draws: d, total: w + l + d };
  }, [filteredData.games]);

  const winRate = total > 0 ? (wins / total) * 100 : 0;

  // Win rate circular progress
  const circumference = 2 * Math.PI * 36;
  const strokeDashoffset = circumference - (winRate / 100) * circumference;

  const tabs: { id: TimeClass; label: string; color: string }[] = [
    { id: 'all', label: 'All Games', color: 'bg-primary' },
    { id: 'blitz', label: 'Blitz', color: 'bg-blue-500' },
    { id: 'bullet', label: 'Bullet', color: 'bg-red-500' },
    { id: 'rapid', label: 'Rapid', color: 'bg-green-500' }
  ];

  return (
    <div className="space-y-4 sm:space-y-6 p-4 sm:p-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center space-x-3">
          <motion.div 
            className="p-2 sm:p-3 bg-primary/10 rounded-xl border border-primary/20"
            whileHover={{ scale: 1.05, rotate: [0, -10, 10, 0] }}
            transition={{ duration: 0.3 }}
          >
            <Trophy className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
          </motion.div>
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-foreground">Chess Performance</h3>
            <p className="text-xs sm:text-sm text-muted-foreground">{stats.totalGames} games</p>
          </div>
        </div>
        <Badge variant="outline" className="border-primary/30 text-primary font-mono text-xs sm:text-sm shrink-0">
          {filteredData.rating} ELO
        </Badge>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {tabs.map((tab) => (
          <Button
            key={tab.id}
            variant={activeTab === tab.id ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveTab(tab.id)}
            className={`shrink-0 text-xs sm:text-sm ${activeTab === tab.id ? '' : 'hover:bg-accent'}`}
          >
            <Circle className={`w-2 h-2 mr-1 ${activeTab === tab.id ? 'fill-current' : ''}`} />
            {tab.label}
          </Button>
        ))}
      </div>

      {/* Combined Chart: Win% + Progress (Last 30 days) */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="space-y-4"
        >
          {/* Win Rate Circle + Stats */}
          <div className="grid grid-cols-[auto_1fr] gap-4 sm:gap-6">
            {/* Win Rate Circular Progress */}
            <motion.div 
              className="relative flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
            >
              <svg className="w-24 h-24 sm:w-28 sm:h-28 transform -rotate-90">
                <circle
                  cx="50%"
                  cy="50%"
                  r="36"
                  stroke="hsl(var(--muted))"
                  strokeWidth="6"
                  fill="none"
                  opacity="0.2"
                />
                <motion.circle
                  cx="50%"
                  cy="50%"
                  r="36"
                  stroke="hsl(var(--primary))"
                  strokeWidth="6"
                  fill="none"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  initial={{ strokeDashoffset: circumference }}
                  animate={{ strokeDashoffset }}
                  transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-xl sm:text-2xl font-bold text-foreground">{Math.round(winRate)}%</span>
                <span className="text-xs text-muted-foreground">Win Rate</span>
              </div>
            </motion.div>

            {/* Rating Stats Grid */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-2 sm:p-3 text-center"
              >
                <div className="text-base sm:text-xl font-bold text-green-500">{filteredData.rating}</div>
                <div className="text-xs text-muted-foreground">Current</div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-2 sm:p-3 text-center"
              >
                <div className="text-base sm:text-xl font-bold text-yellow-500">{filteredData.bestRating}</div>
                <div className="text-xs text-muted-foreground">Best</div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-2 sm:p-3 text-center"
              >
                <div className="text-base sm:text-xl font-bold text-purple-500">{filteredData.avgRating}</div>
                <div className="text-xs text-muted-foreground">Average</div>
              </motion.div>

              {/* W/L/D Distribution */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="col-span-3 bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-2 sm:p-3"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-muted-foreground font-medium">Results</span>
                  <div className="flex items-center space-x-2 text-xs">
                    <span className="text-green-500">{wins}W</span>
                    <span className="text-red-500">{losses}L</span>
                    <span className="text-gray-500">{draws}D</span>
                  </div>
                </div>
                <div className="h-2 bg-muted/30 rounded-full overflow-hidden flex">
                  <motion.div
                    className="bg-green-500"
                    initial={{ width: 0 }}
                    animate={{ width: total > 0 ? `${(wins / total) * 100}%` : '0%' }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                  />
                  <motion.div
                    className="bg-red-500"
                    initial={{ width: 0 }}
                    animate={{ width: total > 0 ? `${(losses / total) * 100}%` : '0%' }}
                    transition={{ delay: 0.9, duration: 0.8 }}
                  />
                  <motion.div
                    className="bg-gray-500"
                    initial={{ width: 0 }}
                    animate={{ width: total > 0 ? `${(draws / total) * 100}%` : '0%' }}
                    transition={{ delay: 1.0, duration: 0.8 }}
                  />
                </div>
              </motion.div>
            </div>
          </div>

          {/* Rating Progress Chart - Last 30 Days */}
          <motion.div 
            className="space-y-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-4 h-4 text-muted-foreground" />
              <h4 className="text-sm font-medium text-foreground">30-Day Progress</h4>
            </div>
            
            <div className="relative h-24 sm:h-32 bg-card/30 backdrop-blur-sm border border-border/50 rounded-lg p-3 sm:p-4">
              {filteredData.progress.length > 0 ? (
                <>
                  <div className="absolute left-0 top-0 bottom-0 w-8 flex flex-col justify-between text-xs text-muted-foreground">
                    <span>{Math.max(...filteredData.progress.map(p => p.rating))}</span>
                    <span>{Math.min(...filteredData.progress.map(p => p.rating))}</span>
                  </div>
                  
                  <svg className="w-full h-full pl-8" viewBox="0 0 400 100" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id={`ratingGradient-${activeTab}`} x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.05" />
                      </linearGradient>
                    </defs>
                    
                    {(() => {
                      const points = filteredData.progress.slice(-30);
                      const maxRating = Math.max(...points.map(p => p.rating));
                      const minRating = Math.min(...points.map(p => p.rating));
                      const range = maxRating - minRating || 1;
                      
                      const pathData = points.map((point, index) => {
                        const x = (index / (points.length - 1 || 1)) * 400;
                        const y = 100 - ((point.rating - minRating) / range) * 80 - 10;
                        return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
                      }).join(' ');
                      
                      const areaData = `${pathData} L 400 100 L 0 100 Z`;
                      
                      return (
                        <>
                          <motion.path
                            d={areaData}
                            fill={`url(#ratingGradient-${activeTab})`}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.2, duration: 0.5 }}
                          />
                          
                          <motion.path
                            d={pathData}
                            fill="none"
                            stroke="hsl(var(--primary))"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ delay: 1.0, duration: 1.5, ease: "easeOut" }}
                          />
                        </>
                      );
                    })()}
                  </svg>
                </>
              ) : (
                <div className="flex items-center justify-center h-full text-sm text-muted-foreground">
                  No data available
                </div>
              )}
            </div>
          </motion.div>

          {/* Recent Games */}
          <motion.div 
            className="space-y-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            <div className="flex items-center space-x-2">
              <Target className="w-4 h-4 text-muted-foreground" />
              <h4 className="text-sm font-medium text-foreground">Recent Games</h4>
            </div>
            
            <div className="space-y-2">
              {filteredData.games.slice(0, 5).map((game, index) => {
                const isUserWhite = game.white.username === 'alwayswannaly';
                const opponent = isUserWhite ? game.black : game.white;
                const isWin = (isUserWhite && game.result === '1-0') || (!isUserWhite && game.result === '0-1');
                const isDraw = game.result === '1/2-1/2';

                return (
                  <motion.a
                    key={game.game_id}
                    href={game.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.4 + index * 0.1 }}
                    className="flex items-center justify-between bg-card/30 backdrop-blur-sm border border-border/50 rounded-lg p-2 sm:p-3 hover:bg-card/50 hover:border-primary/30 transition-all cursor-pointer group"
                  >
                    <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1">
                      <Badge 
                        variant={isWin ? "default" : isDraw ? "secondary" : "destructive"}
                        className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0"
                      >
                        {isWin ? 'W' : isDraw ? 'D' : 'L'}
                      </Badge>
                      <div className="min-w-0 flex-1">
                        <div className="text-xs sm:text-sm text-foreground font-medium group-hover:text-primary transition-colors truncate">
                          vs {opponent.username}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {opponent.rating} • {isUserWhite ? 'White' : 'Black'}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 shrink-0">
                      <div className="text-right hidden sm:block">
                        <div className="text-xs text-muted-foreground">
                          {formatDate(new Date(game.end_time * 1000).toISOString())}
                        </div>
                      </div>
                      <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                  </motion.a>
                );
              })}
              {filteredData.games.length === 0 && (
                <div className="text-center text-sm text-muted-foreground py-4">
                  No games in this format
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};