import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { type BucketListItem } from '@/types/adventure';
import { 
  CheckCircle, 
  Circle, 
  Coins, 
  MapPin, 
  TrendingUp, 
  Calendar,
  Star,
  DollarSign
} from 'lucide-react';

interface BucketListCardProps {
  item: BucketListItem;
  index: number;
}

export const BucketListCard = ({ item, index }: BucketListCardProps) => {
  const categoryIcons = {
    travel: '✈️',
    adventure: '🏔️',
    learning: '📚',
    achievement: '🏆',
    experience: '🌟',
  };

  const priorityColors = {
    low: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200',
    medium: 'bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-200',
    high: 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-200',
  };

  const difficultyStars = Array.from({ length: 5 }, (_, i) => (
    <Star
      key={i}
      size={14}
      className={i < item.difficulty ? 'text-yellow-400 fill-current' : 'text-gray-300'}
    />
  ));

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
    >
      <Card className={`h-full hover:shadow-xl transition-all duration-300 group relative overflow-hidden ${
        item.completed ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800' : ''
      }`}>
        {/* Completion Status Icon */}
        <div className="absolute top-4 right-4">
          {item.completed ? (
            <CheckCircle className="text-green-500" size={24} />
          ) : (
            <Circle className="text-muted-foreground" size={24} />
          )}
        </div>

        <CardHeader className="space-y-4 pr-12">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">{categoryIcons[item.category]}</span>
            <Badge className={priorityColors[item.priority]}>
              {item.priority} priority
            </Badge>
            <Badge variant="outline">
              <Coins size={12} className="mr-1" />
              {item.coinReward}
            </Badge>
          </div>

          <CardTitle className={`text-xl group-hover:text-primary transition-colors ${
            item.completed ? 'line-through text-muted-foreground' : ''
          }`}>
            {item.title}
          </CardTitle>

          {/* Difficulty Rating */}
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">Difficulty:</span>
            <div className="flex">{difficultyStars}</div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <p className="text-muted-foreground line-clamp-3">
            {item.description}
          </p>

          {/* Location */}
          {item.location && (
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <MapPin size={14} />
              <span>{item.location}</span>
            </div>
          )}

          {/* Cost */}
          {item.estimatedCost && item.estimatedCost > 0 && (
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <DollarSign size={14} />
              <span>~${item.estimatedCost}</span>
            </div>
          )}

          {/* Completion Date */}
          {item.completed && item.completedDate && (
            <div className="flex items-center space-x-2 text-sm text-green-600 dark:text-green-400">
              <Calendar size={14} />
              <span>Completed {new Date(item.completedDate).toLocaleDateString()}</span>
            </div>
          )}

          {/* Journal Entry */}
          {item.journal && (
            <div className="p-3 bg-secondary/50 rounded-lg">
              <p className="text-sm italic">"{item.journal}"</p>
            </div>
          )}

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {item.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
            {item.tags.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{item.tags.length - 3} more
              </Badge>
            )}
          </div>

          {/* Action Button */}
          <div className="pt-2">
            {item.completed ? (
              <Button variant="outline" size="sm" className="w-full" disabled>
                <CheckCircle size={16} className="mr-2" />
                Completed
              </Button>
            ) : (
              <Button variant="outline" size="sm" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <TrendingUp size={16} className="mr-2" />
                Track Progress
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
