import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { type Project } from '@/types/portfolio';
import { ExternalLink, Github, Calendar, Star } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export const ProjectCard = ({ project, index }: ProjectCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const statusColors = {
    completed: 'bg-green-500',
    'in-progress': 'bg-blue-500',
    planned: 'bg-gray-500',
  };

  const categoryIcons = {
    web: '🌐',
    mobile: '📱',
    desktop: '💻',
    ai: '🤖',
    other: '⚡',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Card className="h-full overflow-hidden group hover:shadow-xl transition-all duration-300">
        {/* Featured Badge */}
        {project.featured && (
          <div className="absolute top-4 right-4 z-10">
            <Badge className="bg-yellow-500 text-yellow-900 hover:bg-yellow-600">
              <Star size={12} className="mr-1" />
              Featured
            </Badge>
          </div>
        )}

        {/* Project Image Placeholder */}
        <div className="relative h-48 bg-gradient-to-br from-primary/20 to-secondary overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-6xl opacity-50">{categoryIcons[project.category]}</span>
          </div>
          
          {/* Overlay on hover */}
          <motion.div
            className="absolute inset-0 bg-black/60 flex items-center justify-center space-x-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {project.liveUrl && (
              <motion.a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white rounded-full text-black hover:bg-gray-100 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ExternalLink size={20} />
              </motion.a>
            )}
            {project.githubUrl && (
              <motion.a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white rounded-full text-black hover:bg-gray-100 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Github size={20} />
              </motion.a>
            )}
          </motion.div>
        </div>

        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <CardTitle className="text-xl mb-2 line-clamp-1">
                {project.title}
              </CardTitle>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-2">
                <Calendar size={14} />
                <span>{project.startDate}</span>
                <div className={`w-2 h-2 rounded-full ${statusColors[project.status]}`} />
                <span className="capitalize">{project.status.replace('-', ' ')}</span>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <p className="text-muted-foreground line-clamp-3">
            {project.description}
          </p>

          {/* Technologies */}
          <div className="flex flex-wrap gap-2">
            {project.technologies.slice(0, 4).map((tech) => (
              <Badge key={tech} variant="secondary" className="text-xs">
                {tech}
              </Badge>
            ))}
            {project.technologies.length > 4 && (
              <Badge variant="outline" className="text-xs">
                +{project.technologies.length - 4} more
              </Badge>
            )}
          </div>

          {/* Highlights */}
          {project.highlights.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-semibold text-sm">Key Features:</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                {project.highlights.slice(0, 2).map((highlight, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span className="line-clamp-1">{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex space-x-2 pt-2">
            {project.liveUrl && (
              <Button size="sm" className="flex-1">
                <ExternalLink size={16} className="mr-2" />
                Live Demo
              </Button>
            )}
            {project.githubUrl && (
              <Button size="sm" variant="outline" className="flex-1">
                <Github size={16} className="mr-2" />
                Code
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
