import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { interests } from '@/data/personal';
import { staggerContainer, staggerItem } from '@/lib/animations';

export const InterestCards = () => {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {interests.map((interest) => (
        <motion.div
          key={interest.id}
          variants={staggerItem}
          whileHover="hover"
          initial="rest"
          animate="rest"
          onHoverStart={() => setHoveredCard(interest.id)}
          onHoverEnd={() => setHoveredCard(null)}
        >
          <Card className="h-full cursor-pointer overflow-hidden relative group">
            {/* Gradient Background */}
            <div 
              className={`absolute inset-0 bg-gradient-to-br ${interest.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
            />
            
            <CardHeader className="relative">
              <div className="flex items-center space-x-3">
                <motion.div
                  className="text-3xl"
                  animate={hoveredCard === interest.id ? { 
                    scale: 1.2, 
                    rotate: [0, -10, 10, 0] 
                  } : { scale: 1, rotate: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {interest.icon}
                </motion.div>
                <CardTitle className="text-xl">{interest.name}</CardTitle>
              </div>
            </CardHeader>
            
            <CardContent className="relative">
              <p className="text-muted-foreground mb-4">
                {interest.description}
              </p>
              
              <AnimatePresence>
                {hoveredCard === interest.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="border-t border-border pt-4">
                      <h4 className="font-semibold mb-2 text-sm">Focus Areas:</h4>
                      <div className="flex flex-wrap gap-2">
                        {interest.skills.map((skill) => (
                          <span
                            key={skill}
                            className="px-2 py-1 bg-secondary text-secondary-foreground rounded-md text-xs"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
};
