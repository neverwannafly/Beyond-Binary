import { motion } from 'framer-motion';
import { AnimatedCounter } from '@/components/animations/AnimatedCounter';
import { Card, CardContent } from '@/components/ui/card';
import { personalStats } from '@/data/personal';
import { staggerContainer, staggerItem } from '@/lib/animations';

const statsConfig = [
  {
    key: 'projectsCompleted' as keyof typeof personalStats,
    label: 'Projects Completed',
    icon: '🚀',
    suffix: '+',
  },
  {
    key: 'yearsOfExperience' as keyof typeof personalStats,
    label: 'Years Experience',
    icon: '💼',
    suffix: '+',
  },
  {
    key: 'technologiesUsed' as keyof typeof personalStats,
    label: 'Technologies Used',
    icon: '⚡',
    suffix: '+',
  },
  {
    key: 'coffeeConsumed' as keyof typeof personalStats,
    label: 'Cups of Coffee',
    icon: '☕',
    suffix: '+',
  },
  {
    key: 'booksRead' as keyof typeof personalStats,
    label: 'Books Read This Year',
    icon: '📖',
    suffix: '',
  },
  {
    key: 'chessRating' as keyof typeof personalStats,
    label: 'Chess Rating',
    icon: '♟️',
    suffix: '',
  },
  {
    key: 'animeWatched' as keyof typeof personalStats,
    label: 'Anime Series',
    icon: '🎌',
    suffix: '+',
  },
];

export const StatsDisplay = () => {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
    >
      {statsConfig.map((stat) => (
        <motion.div key={stat.key} variants={staggerItem}>
          <Card className="text-center hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-6">
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="text-2xl font-bold text-primary mb-1">
                <AnimatedCounter 
                  to={personalStats[stat.key]} 
                  suffix={stat.suffix}
                  duration={1.5}
                />
              </div>
              <div className="text-sm text-muted-foreground font-medium">
                {stat.label}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
};
