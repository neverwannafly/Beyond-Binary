import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ProjectCard } from './ProjectCard';
import { projects, getFeaturedProjects } from '@/data/projects';
import { type Project } from '@/types/portfolio';
import { FadeInView } from '@/components/animations/FadeInView';

const categories = [
  { id: 'all', label: 'All Projects', icon: '🚀' },
  { id: 'featured', label: 'Featured', icon: '⭐' },
  { id: 'web', label: 'Web Apps', icon: '🌐' },
  { id: 'mobile', label: 'Mobile', icon: '📱' },
  { id: 'desktop', label: 'Desktop', icon: '💻' },
];

export const ProjectShowcase = () => {
  const [activeCategory, setActiveCategory] = useState('featured');
  const [visibleProjects, setVisibleProjects] = useState(6);

  const getFilteredProjects = (): Project[] => {
    switch (activeCategory) {
      case 'featured':
        return getFeaturedProjects();
      case 'all':
        return projects;
      default:
        return projects.filter(project => project.category === activeCategory);
    }
  };

  const filteredProjects = getFilteredProjects();
  const displayedProjects = filteredProjects.slice(0, visibleProjects);
  const hasMoreProjects = filteredProjects.length > visibleProjects;

  return (
    <div className="space-y-8">
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
                setVisibleProjects(6); // Reset visible count when changing category
              }}
              className="transition-all duration-300"
            >
              <span className="mr-2">{category.icon}</span>
              {category.label}
            </Button>
          ))}
        </div>
      </FadeInView>

      {/* Projects Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
      >
        {displayedProjects.map((project, index) => (
          <motion.div
            key={project.id}
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <ProjectCard project={project} index={index} />
          </motion.div>
        ))}
      </motion.div>

      {/* Load More Button */}
      {hasMoreProjects && (
        <FadeInView className="text-center">
          <Button
            variant="outline"
            size="lg"
            onClick={() => setVisibleProjects(prev => prev + 6)}
            className="min-w-[200px]"
          >
            Load More Projects
          </Button>
        </FadeInView>
      )}

      {/* No Projects Message */}
      {filteredProjects.length === 0 && (
        <FadeInView className="text-center py-12">
          <div className="text-6xl mb-4">🚧</div>
          <h3 className="text-xl font-semibold mb-2">No projects found</h3>
          <p className="text-muted-foreground">
            No projects in this category yet. Check back soon!
          </p>
        </FadeInView>
      )}
    </div>
  );
};
