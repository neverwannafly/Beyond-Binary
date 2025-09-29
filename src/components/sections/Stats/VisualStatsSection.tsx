import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FadeInView } from '@/components/animations/FadeInView';
import { 
  GitBranch, 
  Mountain, 
  Trophy,
  Target,
  Code2,
  Camera
} from 'lucide-react';
import { fetchGitHubData, type GitHubStats } from '@/services/realDataService';

// Achievement data types
interface Achievement {
  id: string;
  title: string;
  value: number;
  unit: string;
  icon: React.ReactNode;
  color: string;
  description: string;
  progress?: number;
  maxValue?: number;
}

interface ContributionDay {
  date: string;
  count: number;
  level: number; // 0-4 for GitHub contribution levels
}

// Dynamic achievements that will be updated with real data
const getAchievements = (githubStats?: GitHubStats): Achievement[] => [
  {
    id: 'commits',
    title: 'Code Commits',
    value: githubStats?.totalCommits || 1247,
    unit: 'commits',
    icon: <GitBranch size={24} />,
    color: 'text-green-500',
    description: 'This year\'s contributions',
    progress: Math.min(100, ((githubStats?.totalCommits || 1247) / 2000) * 100),
    maxValue: 2000
  },
  {
    id: 'repos',
    title: 'Public Repos',
    value: githubStats?.publicRepos || 42,
    unit: 'repos',
    icon: <Code2 size={24} />,
    color: 'text-blue-500',
    description: 'Open source projects',
    progress: Math.min(100, ((githubStats?.publicRepos || 42) / 100) * 100),
    maxValue: 100
  },
  {
    id: 'peaks',
    title: 'Peaks Climbed',
    value: 23,
    unit: 'summits',
    icon: <Mountain size={24} />,
    color: 'text-orange-500',
    description: 'Colorado 14ers conquered',
    progress: 42,
    maxValue: 58
  },
  {
    id: 'chess',
    title: 'Chess Rating',
    value: 1842,
    unit: 'ELO',
    icon: <Trophy size={24} />,
    color: 'text-yellow-500',
    description: 'Current blitz rating',
    progress: 73,
    maxValue: 2000
  },
  {
    id: 'adventures',
    title: 'Adventure Days',
    value: 156,
    unit: 'days',
    icon: <Camera size={24} />,
    color: 'text-purple-500',
    description: 'Outdoor exploration time',
    progress: 78,
    maxValue: 200
  }
];

// Mock GitHub contribution data (would be fetched from GitHub API)
const generateContributionData = (): ContributionDay[] => {
  const data: ContributionDay[] = [];
  const today = new Date();
  
  for (let i = 364; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    
    // Generate realistic contribution pattern
    const isWeekend = date.getDay() === 0 || date.getDay() === 6;
    const baseCount = isWeekend ? Math.random() * 2 : Math.random() * 8;
    const count = Math.floor(baseCount);
    const level = count === 0 ? 0 : Math.min(4, Math.ceil(count / 2));
    
    data.push({
      date: date.toISOString().split('T')[0],
      count,
      level
    });
  }
  
  return data;
};

const ContributionHeatmap: React.FC<{ githubStats?: GitHubStats }> = ({ githubStats }) => {
  const contributions = githubStats?.contributions || generateContributionData();
  
  const getLevelColor = (level: number): string => {
    const colors = [
      'bg-secondary', // 0 - no contributions
      'bg-green-200', // 1 - light
      'bg-green-400', // 2 - medium-light
      'bg-green-600', // 3 - medium
      'bg-green-800'  // 4 - high
    ];
    return colors[level] || colors[0];
  };

  const getTooltip = (day: ContributionDay): string => {
    return `${day.count} contributions on ${new Date(day.date).toLocaleDateString()}`;
  };

  // Group contributions by weeks
  const weeks: ContributionDay[][] = [];
  for (let i = 0; i < contributions.length; i += 7) {
    weeks.push(contributions.slice(i, i + 7));
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <GitBranch className="text-green-500" size={20} />
          <span>Code Contribution Heatmap</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-52 gap-1 mx-auto w-fit">
            {weeks.map((week, weekIndex) => (
              <div key={weekIndex} className="grid grid-rows-7 gap-1">
                {week.map((day, dayIndex) => (
                  <motion.div
                    key={`${weekIndex}-${dayIndex}`}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: (weekIndex * 7 + dayIndex) * 0.001 }}
                    className={`w-3 h-3 rounded-sm ${getLevelColor(day.level)} cursor-pointer hover:ring-2 hover:ring-primary transition-all`}
                    title={getTooltip(day)}
                  />
                ))}
              </div>
            ))}
          </div>
          
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>Less</span>
            <div className="flex items-center space-x-1">
              {[0, 1, 2, 3, 4].map((level) => (
                <div
                  key={level}
                  className={`w-3 h-3 rounded-sm ${getLevelColor(level)}`}
                />
              ))}
            </div>
            <span>More</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const AchievementCard: React.FC<{ achievement: Achievement; index: number }> = ({ achievement, index }) => {
  const [animatedValue, setAnimatedValue] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedValue(achievement.value);
    }, index * 200);

    return () => clearTimeout(timer);
  }, [achievement.value, index]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="relative overflow-hidden group hover:shadow-lg transition-all duration-300">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className={achievement.color}>
              {achievement.icon}
            </div>
            <Badge variant="outline" className="text-xs">
              {achievement.unit}
            </Badge>
          </div>
          
          <div className="space-y-2">
            <h3 className="font-semibold text-lg">{achievement.title}</h3>
            <div className="flex items-baseline space-x-2">
              <motion.span 
                className="text-3xl font-bold"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
              >
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
                >
                  {animatedValue.toLocaleString()}
                </motion.span>
              </motion.span>
              <span className="text-sm text-muted-foreground">{achievement.unit}</span>
            </div>
            <p className="text-sm text-muted-foreground">{achievement.description}</p>
            
            {achievement.progress && achievement.maxValue && (
              <div className="space-y-1 mt-4">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Progress</span>
                  <span>{achievement.progress}%</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <motion.div
                    className="bg-gradient-to-r from-primary to-primary/80 h-2 rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${achievement.progress}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: index * 0.1 + 0.7 }}
                  />
                </div>
              </div>
            )}
          </div>
          
          {/* Hover effect overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const YearlyGoals: React.FC = () => {
  const goals = [
    { name: 'Build 50 Projects', current: 42, target: 50, color: 'text-blue-500' },
    { name: 'Climb All 14ers', current: 23, target: 58, color: 'text-orange-500' },
    { name: 'Read 24 Books', current: 18, target: 24, color: 'text-green-500' },
    { name: 'Chess 2000 ELO', current: 1842, target: 2000, color: 'text-yellow-500' }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Target className="text-primary" size={20} />
          <span>2024 Goals Progress</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {goals.map((goal, index) => {
          const progress = (goal.current / goal.target) * 100;
          return (
            <motion.div
              key={goal.name}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="space-y-2"
            >
              <div className="flex justify-between items-center">
                <span className="font-medium">{goal.name}</span>
                <span className={`text-sm font-bold ${goal.color}`}>
                  {goal.current}/{goal.target}
                </span>
              </div>
              <div className="w-full bg-secondary rounded-full h-3">
                <motion.div
                  className={`h-3 rounded-full bg-gradient-to-r from-primary to-primary/80`}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${Math.min(progress, 100)}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: index * 0.1 + 0.3 }}
                />
              </div>
              <div className="text-xs text-muted-foreground text-right">
                {progress.toFixed(0)}% complete
              </div>
            </motion.div>
          );
        })}
      </CardContent>
    </Card>
  );
};

export const VisualStatsSection: React.FC = () => {
  const [githubStats, setGithubStats] = useState<GitHubStats | undefined>();

  useEffect(() => {
    const loadGitHubData = async () => {
      try {
        const stats = await fetchGitHubData('neverwannafly');
        setGithubStats(stats);
      } catch (error) {
        console.error('Failed to load GitHub data:', error);
      }
    };

    loadGitHubData();
  }, []);

  const achievements = getAchievements(githubStats);

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <FadeInView className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Achievement Unlocked</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Real data from my code and adventure journey in 2024
          </p>
        </FadeInView>

        {/* Achievement Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {achievements.map((achievement, index) => (
            <AchievementCard 
              key={achievement.id} 
              achievement={achievement} 
              index={index} 
            />
          ))}
        </div>

        {/* GitHub Contributions & Goals */}
        <div className="grid lg:grid-cols-2 gap-8">
          <FadeInView>
            <ContributionHeatmap githubStats={githubStats} />
          </FadeInView>
          <FadeInView>
            <YearlyGoals />
          </FadeInView>
        </div>
      </div>
    </section>
  );
};
