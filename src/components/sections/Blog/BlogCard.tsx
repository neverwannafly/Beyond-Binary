import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { type BlogPost } from '@/types/content';
import { Calendar, Clock, User, Star } from 'lucide-react';

interface BlogCardProps {
  post: BlogPost;
  index: number;
}

export const BlogCard = ({ post, index }: BlogCardProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const categoryColors = {
    technical: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    personal: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    tutorial: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
    opinion: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
    'project-log': 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
    >
      <Link to={`/blog/${post.slug}`}>
        <Card className="h-full hover:shadow-xl transition-all duration-300 group">
          {/* Featured Badge */}
          {post.featured && (
            <div className="absolute top-4 right-4 z-10">
              <Badge className="bg-yellow-500 text-yellow-900 hover:bg-yellow-600">
                <Star size={12} className="mr-1" />
                Featured
              </Badge>
            </div>
          )}

          <CardHeader className="space-y-4">
            <div className="flex items-center space-x-2">
              <Badge className={categoryColors[post.category]}>
                {post.category.replace('-', ' ')}
              </Badge>
              <Badge variant="outline" className="text-xs">
                <Clock size={12} className="mr-1" />
                {post.readingTime} min read
              </Badge>
            </div>

            <CardTitle className="text-xl group-hover:text-primary transition-colors line-clamp-2">
              {post.title}
            </CardTitle>

            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center space-x-1">
                <Calendar size={14} />
                <span>{formatDate(post.publishedDate)}</span>
              </div>
              <div className="flex items-center space-x-1">
                <User size={14} />
                <span>{post.author}</span>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            <p className="text-muted-foreground line-clamp-3">
              {post.excerpt}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {post.tags.slice(0, 3).map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
              {post.tags.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{post.tags.length - 3} more
                </Badge>
              )}
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-sm text-primary font-medium group-hover:underline">
                Read More →
              </span>
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
};
