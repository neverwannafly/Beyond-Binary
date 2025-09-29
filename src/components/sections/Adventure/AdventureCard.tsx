import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { type Adventure } from '@/types/adventure';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  Thermometer,
  Star,
  Camera
} from 'lucide-react';

interface AdventureCardProps {
  adventure: Adventure;
  index: number;
}

export const AdventureCard = ({ adventure, index }: AdventureCardProps) => {
  const activityIcons = {
    'rock-climbing': '🧗',
    'kayaking': '🚣',
    'hiking': '🥾',
    'camping': '🏕️',
    'other': '🏔️',
  };

  const activityColors = {
    'rock-climbing': 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
    'kayaking': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    'hiking': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    'camping': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
    'other': 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200',
  };

  const difficultyStars = Array.from({ length: 5 }, (_, i) => (
    <Star
      key={i}
      size={14}
      className={i < adventure.difficulty ? 'text-yellow-400 fill-current' : 'text-gray-300'}
    />
  ));

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
    >
      <Card className="h-full hover:shadow-xl transition-all duration-300 group overflow-hidden">
        {/* Hero Image Area - Placeholder for now */}
        <div className="relative h-48 bg-gradient-to-br from-primary/20 to-secondary overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-6xl opacity-70">{activityIcons[adventure.activity]}</span>
          </div>
          
          {/* Overlay with basic info */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
            <div className="flex items-center space-x-2 text-white">
              <Badge className={activityColors[adventure.activity]}>
                {adventure.activity.replace('-', ' ')}
              </Badge>
              <div className="flex">{difficultyStars}</div>
            </div>
          </div>

          {/* Media Count */}
          {adventure.media.length > 0 && (
            <div className="absolute top-4 right-4 bg-black/50 text-white px-2 py-1 rounded-full text-xs flex items-center">
              <Camera size={12} className="mr-1" />
              {adventure.media.length}
            </div>
          )}
        </div>

        <CardHeader>
          <CardTitle className="text-xl group-hover:text-primary transition-colors line-clamp-2">
            {adventure.title}
          </CardTitle>
          
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Calendar size={14} />
              <span>{formatDate(adventure.date)}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock size={14} />
              <span>{adventure.duration}</span>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <p className="text-muted-foreground line-clamp-3">
            {adventure.description}
          </p>

          {/* Location */}
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <MapPin size={14} />
            <span>{adventure.location}</span>
          </div>

          {/* Weather & Companions */}
          <div className="space-y-2 text-sm">
            {adventure.weather && (
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Thermometer size={14} />
                <span>{adventure.weather}</span>
              </div>
            )}
            
            {adventure.companions && adventure.companions.length > 0 && (
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Users size={14} />
                <span>
                  {adventure.companions.length === 1 && adventure.companions[0] === 'Solo' 
                    ? 'Solo adventure' 
                    : `With ${adventure.companions.join(', ')}`}
                </span>
              </div>
            )}
          </div>

          {/* Highlights */}
          {adventure.highlights.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-semibold text-sm">Highlights:</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                {adventure.highlights.slice(0, 2).map((highlight, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span className="line-clamp-1">{highlight}</span>
                  </li>
                ))}
                {adventure.highlights.length > 2 && (
                  <li className="text-xs text-muted-foreground">
                    +{adventure.highlights.length - 2} more highlights
                  </li>
                )}
              </ul>
            </div>
          )}

          {/* Instagram Link Placeholder */}
          {adventure.instagramPostId && (
            <div className="pt-2">
              <Badge variant="outline" className="text-xs">
                📸 Featured on Instagram
              </Badge>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};
