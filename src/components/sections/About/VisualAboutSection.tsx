import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FadeInView } from '@/components/animations/FadeInView';
import { 
  Mountain, 
  Code2, 
  Coffee, 
  Map,
  Heart,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Calendar
} from 'lucide-react';

// Placeholder hero images - replace with actual photos
const heroImages = [
  {
    id: 1,
    url: '/api/placeholder/800/600',
    alt: 'Rock climbing in Colorado',
    title: 'Conquering Crags',
    location: 'Boulder, CO',
    date: '2024',
    activity: 'climbing'
  },
  {
    id: 2,
    url: '/api/placeholder/800/600',
    alt: 'Kayaking adventure',
    title: 'River Rapids',
    location: 'Arkansas River, CO',
    date: '2024',
    activity: 'kayaking'
  },
  {
    id: 3,
    url: '/api/placeholder/800/600',
    alt: 'Coding setup with mountain view',
    title: 'Code with a View',
    location: 'Home Office, CO',
    date: '2024',
    activity: 'coding'
  },
  {
    id: 4,
    url: '/api/placeholder/800/600',
    alt: 'Hiking mountain trail',
    title: 'Summit Seeker',
    location: 'Rocky Mountain National Park',
    date: '2024',
    activity: 'hiking'
  }
];

const personalStory = {
  title: "From Code to Crags",
  subtitle: "Building software by day, conquering peaks by weekend",
  paragraphs: [
    "Hey there! I'm a 27-year-old software engineer living the Colorado dream, where world-class outdoor adventures are literally in my backyard.",
    "My journey started with a love for solving puzzles - whether it's debugging complex code, planning the perfect chess move, or finding the optimal route up a challenging climb.",
    "When I'm not crafting elegant solutions in TypeScript or React, you'll find me hanging off rock faces, navigating whitewater rapids, or exploring the latest anime series that everyone's talking about.",
    "I believe the best code comes from a balanced life. The problem-solving skills I develop on the rock translate directly to cleaner, more creative software solutions."
  ]
};

const skills = [
  { name: 'React/TypeScript', level: 95, icon: <Code2 size={16} /> },
  { name: 'Rock Climbing', level: 88, icon: <Mountain size={16} /> },
  { name: 'Chess Strategy', level: 82, icon: '♟️' },
  { name: 'Adventure Planning', level: 90, icon: <Map size={16} /> },
  { name: 'Coffee Brewing', level: 78, icon: <Coffee size={16} /> },
];

export const VisualAboutSection: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  // Auto-advance carousel
  React.useEffect(() => {
    if (!isPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isPlaying]);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    setIsPlaying(false);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + heroImages.length) % heroImages.length);
    setIsPlaying(false);
  };

  const currentImage = heroImages[currentImageIndex];

  return (
    <section id="about" className="py-20 bg-gradient-to-br from-background via-secondary/20 to-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Visual Side - Photos Carousel */}
          <FadeInView>
            <div className="relative">
              {/* Main Photo Display */}
              <Card className="relative overflow-hidden group cursor-pointer" onClick={() => setIsPlaying(!isPlaying)}>
                <div className="aspect-[4/3] relative">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentImageIndex}
                      initial={{ opacity: 0, scale: 1.1 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.6 }}
                      className="absolute inset-0"
                    >
                      <img
                        src={currentImage.url}
                        alt={currentImage.alt}
                        className="w-full h-full object-cover"
                      />
                      
                      {/* Overlay with info */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <div className="absolute bottom-4 left-4 text-white">
                        <h4 className="text-xl font-bold mb-1">{currentImage.title}</h4>
                        <div className="flex items-center space-x-3 text-sm opacity-90">
                          <div className="flex items-center space-x-1">
                            <MapPin size={14} />
                            <span>{currentImage.location}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Calendar size={14} />
                            <span>{currentImage.date}</span>
                          </div>
                        </div>
                      </div>

                      {/* Activity Badge */}
                      <div className="absolute top-4 right-4">
                        <Badge className="bg-primary/90 text-primary-foreground">
                          {currentImage.activity}
                        </Badge>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Navigation Arrows */}
                <button
                  onClick={(e) => { e.stopPropagation(); prevImage(); }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); nextImage(); }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <ChevronRight size={20} />
                </button>
              </Card>

              {/* Thumbnail Strip */}
              <div className="flex space-x-2 mt-4 justify-center">
                {heroImages.map((image, index) => (
                  <button
                    key={image.id}
                    onClick={() => {
                      setCurrentImageIndex(index);
                      setIsPlaying(false);
                    }}
                    className={`w-16 h-12 rounded-lg overflow-hidden border-2 transition-all ${
                      index === currentImageIndex
                        ? 'border-primary shadow-lg'
                        : 'border-transparent hover:border-primary/50'
                    }`}
                  >
                    <img
                      src={image.url}
                      alt={image.alt}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>

              {/* Auto-play indicator */}
              <div className="flex justify-center mt-3">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <div className={`w-2 h-2 rounded-full transition-colors ${isPlaying ? 'bg-green-500' : 'bg-gray-400'}`} />
                  <span>{isPlaying ? 'Auto-playing' : 'Paused'}</span>
                </div>
              </div>
            </div>
          </FadeInView>

          {/* Story Side */}
          <FadeInView className="space-y-8">
            <div>
              <motion.h2 
                className="text-4xl md:text-5xl font-bold mb-4"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                {personalStory.title}
              </motion.h2>
              <motion.p 
                className="text-xl text-primary mb-8"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                {personalStory.subtitle}
              </motion.p>
            </div>

            {/* Personal Story */}
            <div className="space-y-6">
              {personalStory.paragraphs.map((paragraph, index) => (
                <motion.p
                  key={index}
                  className="text-muted-foreground leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>

            {/* Skills with Visual Bars */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold">Skills & Passions</h3>
              <div className="space-y-4">
                {skills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        {skill.icon}
                        <span className="font-medium">{skill.name}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <motion.div
                        className="bg-gradient-to-r from-primary to-primary/80 h-2 rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: index * 0.1 + 0.3 }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex items-center space-x-2 text-primary"
            >
              <Heart size={20} className="text-red-500" />
              <span className="font-medium">Let's build something amazing together!</span>
            </motion.div>
          </FadeInView>
        </div>
      </div>
    </section>
  );
};
