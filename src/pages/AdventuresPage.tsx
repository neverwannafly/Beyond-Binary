import { useState } from 'react';
import { motion } from 'framer-motion';
import { PageLayout } from '@/components/layout/PageLayout';
import { AdventureCard } from '@/components/sections/Adventure/AdventureCard';
import { Button } from '@/components/ui/button';
import { FadeInView } from '@/components/animations/FadeInView';
import { adventures, getAdventuresByActivity, getAdventuresByYear } from '@/data/adventures';
import { type Adventure } from '@/types/adventure';

const categories = [
  { id: 'all', label: 'All Adventures', icon: '🏔️' },
  { id: 'rock-climbing', label: 'Rock Climbing', icon: '🧗' },
  { id: 'kayaking', label: 'Kayaking', icon: '🚣' },
  { id: 'hiking', label: 'Hiking', icon: '🥾' },
  { id: 'camping', label: 'Camping', icon: '🏕️' },
];

export const AdventuresPage = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [visibleItems, setVisibleItems] = useState(6);

  const getFilteredAdventures = (): Adventure[] => {
    if (activeCategory === 'all') {
      return adventures;
    }
    return getAdventuresByActivity(activeCategory as Adventure['activity']);
  };

  const filteredAdventures = getFilteredAdventures();
  const displayedAdventures = filteredAdventures.slice(0, visibleItems);
  const hasMoreItems = filteredAdventures.length > visibleItems;

  const currentYear = new Date().getFullYear();
  const thisYearAdventures = getAdventuresByYear(currentYear);
  const climbingAdventures = getAdventuresByActivity('rock-climbing');
  const kayakingAdventures = getAdventuresByActivity('kayaking');

  return (
    <PageLayout>
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="space-y-12">
            {/* Header */}
            <FadeInView className="text-center">
              <motion.h1 
                className="text-4xl md:text-5xl font-bold mb-6"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                Outdoor Adventures 🏔️
              </motion.h1>
              <motion.p 
                className="text-xl text-muted-foreground max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Stories from the mountains, rivers, and trails. Each adventure is a journey 
                of growth, challenge, and connection with the natural world.
              </motion.p>
            </FadeInView>

            {/* Stats Overview */}
            <FadeInView>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="text-center p-6 bg-secondary/30 rounded-lg">
                  <div className="text-3xl font-bold text-primary mb-2">{adventures.length}</div>
                  <div className="text-sm text-muted-foreground">Total Adventures</div>
                </div>
                <div className="text-center p-6 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                  <div className="text-3xl font-bold text-orange-600 mb-2">{climbingAdventures.length}</div>
                  <div className="text-sm text-muted-foreground">Climbing Sessions</div>
                </div>
                <div className="text-center p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div className="text-3xl font-bold text-blue-600 mb-2">{kayakingAdventures.length}</div>
                  <div className="text-sm text-muted-foreground">Kayaking Trips</div>
                </div>
                <div className="text-center p-6 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <div className="text-3xl font-bold text-green-600 mb-2">{thisYearAdventures.length}</div>
                  <div className="text-sm text-muted-foreground">This Year</div>
                </div>
              </div>
            </FadeInView>

            {/* Category Filter */}
            <FadeInView>
              <div className="flex flex-wrap justify-center gap-2">
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    variant={activeCategory === category.id ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => {
                      setActiveCategory(category.id);
                      setVisibleItems(6);
                    }}
                    className="transition-all duration-300"
                  >
                    <span className="mr-2">{category.icon}</span>
                    {category.label}
                  </Button>
                ))}
              </div>
            </FadeInView>

            {/* Adventures Grid */}
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
            >
              {displayedAdventures.map((adventure, index) => (
                <motion.div
                  key={adventure.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <AdventureCard adventure={adventure} index={index} />
                </motion.div>
              ))}
            </motion.div>

            {/* Load More Button */}
            {hasMoreItems && (
              <FadeInView className="text-center">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => setVisibleItems(prev => prev + 6)}
                  className="min-w-[200px]"
                >
                  Load More Adventures
                </Button>
              </FadeInView>
            )}

            {/* No Adventures Message */}
            {filteredAdventures.length === 0 && (
              <FadeInView className="text-center py-12">
                <div className="text-6xl mb-4">🏔️</div>
                <h3 className="text-xl font-semibold mb-2">No adventures found</h3>
                <p className="text-muted-foreground">
                  No adventures in this category yet. More stories coming soon!
                </p>
              </FadeInView>
            )}

            {/* Instagram & Social Integration */}
            <FadeInView>
              <div className="bg-secondary/30 rounded-lg p-8">
                <h3 className="text-2xl font-bold mb-6 text-center">Follow My Adventures</h3>
                <p className="text-center text-muted-foreground mb-6">
                  See more photos and real-time updates from my outdoor adventures
                </p>
                <div className="flex justify-center space-x-4">
                  <Button variant="outline" className="flex items-center space-x-2">
                    <span>📸</span>
                    <span>Instagram</span>
                  </Button>
                  <Button variant="outline" className="flex items-center space-x-2">
                    <span>🏔️</span>
                    <span>Strava</span>
                  </Button>
                  <Button variant="outline" className="flex items-center space-x-2">
                    <span>📍</span>
                    <span>AllTrails</span>
                  </Button>
                </div>
              </div>
            </FadeInView>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};
