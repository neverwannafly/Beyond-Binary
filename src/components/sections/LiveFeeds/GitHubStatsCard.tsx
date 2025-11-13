import React from 'react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import type { GitHubStats } from '@/services/realDataService';
import { Github, Star, GitFork, Code, Flame, ExternalLink, TrendingUp } from 'lucide-react';

interface GitHubStatsCardProps {
  stats: GitHubStats;
}

export const GitHubStatsCard: React.FC<GitHubStatsCardProps> = ({ stats }) => {
  // Get contribution level color - theme aware
  function getLanguageColor(language: string): string {
    const colors: { [key: string]: string } = {
      TypeScript: 'hsl(211, 60%, 50%)',
      JavaScript: 'hsl(50, 95%, 55%)',
      Python: 'hsl(210, 60%, 45%)',
      Rust: 'hsl(20, 90%, 50%)',
      Go: 'hsl(180, 60%, 50%)',
      HTML: 'hsl(15, 80%, 50%)',
      CSS: 'hsl(270, 60%, 50%)',
      Java: 'hsl(25, 80%, 45%)',
      C: 'hsl(0, 0%, 40%)',
      'C++': 'hsl(210, 50%, 40%)',
    };
    return colors[language] || 'hsl(var(--muted-foreground))';
  }

  // Calculate total contributions in last 7 days
  const weeklyContributions = stats.contributions.slice(-7).reduce((sum, day) => sum + day.count, 0);

  return (
    <div className="space-y-4 sm:space-y-6 p-4 sm:p-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center space-x-3">
          <motion.div 
            className="p-2 sm:p-3 bg-primary/10 rounded-xl border border-primary/20"
            whileHover={{ scale: 1.05, rotate: 360 }}
            transition={{ duration: 0.5 }}
          >
            <Github className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
          </motion.div>
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-foreground">GitHub Activity</h3>
            <p className="text-xs sm:text-sm text-muted-foreground">{stats.totalCommits.toLocaleString()} commits</p>
          </div>
        </div>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: "spring" }}
        >
          <Badge variant="outline" className="border-orange-400/30 text-orange-400 flex items-center space-x-1 text-xs sm:text-sm shrink-0">
            <Flame className="w-3 h-3" />
            <span className="font-mono">{stats.contributionStreak}d</span>
          </Badge>
        </motion.div>
      </div>

      {/* Key Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-3 text-center"
        >
          <Code className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500 mx-auto mb-1" />
          <div className="text-lg sm:text-xl font-bold text-foreground">{stats.publicRepos}</div>
          <div className="text-xs text-muted-foreground">Repos</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-3 text-center"
        >
          <Star className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500 mx-auto mb-1" />
          <div className="text-lg sm:text-xl font-bold text-foreground">{stats.totalStars}</div>
          <div className="text-xs text-muted-foreground">Stars</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-3 text-center"
        >
          <GitFork className="w-4 h-4 sm:w-5 sm:h-5 text-purple-500 mx-auto mb-1" />
          <div className="text-lg sm:text-xl font-bold text-foreground">{stats.totalForks}</div>
          <div className="text-xs text-muted-foreground">Forks</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-3 text-center"
        >
          <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mx-auto mb-1" />
          <div className="text-lg sm:text-xl font-bold text-foreground">{weeklyContributions}</div>
          <div className="text-xs text-muted-foreground">This Week</div>
        </motion.div>
      </div>

      {/* Top Languages - Compact */}
      <motion.div 
        className="space-y-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <div className="flex items-center space-x-2">
          <Code className="w-4 h-4 text-muted-foreground" />
          <h4 className="text-sm font-medium text-foreground">Top Languages</h4>
        </div>

        <div className="space-y-2">
          {Object.entries(stats.languages)
            .sort(([,a], [,b]) => b - a)
            .slice(0, 4)
            .map(([language, count], index) => {
              const total = Object.values(stats.languages).reduce((a, b) => a + b, 0);
              const percentage = (count / total) * 100;
              
              return (
                <motion.div
                  key={language}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  className="flex items-center justify-between gap-3"
                >
                  <div className="flex items-center space-x-2 min-w-0 flex-1">
                    <div 
                      className="w-3 h-3 rounded-full shrink-0" 
                      style={{ backgroundColor: getLanguageColor(language) }}
                    />
                    <span className="text-sm text-foreground truncate">{language}</span>
                  </div>
                  <div className="flex items-center space-x-2 shrink-0">
                    <div className="w-20 sm:w-24 bg-muted/30 rounded-full h-1.5">
                      <motion.div
                        className="h-1.5 rounded-full"
                        style={{ backgroundColor: getLanguageColor(language) }}
                        initial={{ width: 0 }}
                        animate={{ width: `${percentage}%` }}
                        transition={{ delay: 1.0 + index * 0.1, duration: 0.8 }}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground w-8 text-right font-mono">
                      {count}
                    </span>
                  </div>
                </motion.div>
              );
            })}
        </div>
      </motion.div>


      {/* Top Repositories */}
      <motion.div 
        className="space-y-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
      >
        <div className="flex items-center space-x-2">
          <Star className="w-4 h-4 text-muted-foreground" />
          <h4 className="text-sm font-medium text-foreground">Top Repositories</h4>
        </div>

        <div className="space-y-2">
          {stats.topRepos.slice(0, 4).map((repo, index) => (
            <motion.a
              key={repo.name}
              href={repo.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8 + index * 0.1 }}
              className="bg-card/30 backdrop-blur-sm border border-border/50 rounded-lg p-3 hover:bg-card/50 hover:border-primary/30 transition-all cursor-pointer group block"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex items-center space-x-2">
                    <h5 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                      {repo.name}
                    </h5>
                    <Badge variant="outline" className="text-xs shrink-0">
                      <div 
                        className="w-2 h-2 rounded-full mr-1" 
                        style={{ backgroundColor: getLanguageColor(repo.language) }}
                      />
                      {repo.language}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-1">
                    {repo.description || 'No description'}
                  </p>
                </div>
                <div className="flex items-center space-x-1 shrink-0">
                  <Star className="w-3 h-3 text-yellow-500" />
                  <span className="text-sm font-mono text-foreground">{repo.stars}</span>
                  <ExternalLink className="w-3 h-3 text-muted-foreground group-hover:text-primary transition-colors ml-1" />
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </motion.div>
    </div>
  );
};
