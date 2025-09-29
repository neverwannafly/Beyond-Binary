import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Clock, User, ArrowLeft } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { typeLabels, categoryLabels, type WritingPost } from '@/data/writing';
import MDEditor from '@uiw/react-md-editor';

interface BlogPostModalProps {
  post: WritingPost | null;
  isOpen: boolean;
  onClose: () => void;
}

export const BlogPostModal: React.FC<BlogPostModalProps> = ({ post, isOpen, onClose }) => {
  // Disable body scroll when modal is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!post) return null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const typeColors = {
    blog: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    journal: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
    medium: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    notion: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200',
  };

  const categoryColors = {
    technical: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    personal: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    tutorial: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
    opinion: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
    reflection: 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200',
    adventure: 'bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200',
    learning: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200',
  };

  // Handle external URLs
  if (post.externalUrl) {
    // For external posts, open the link and close modal
    React.useEffect(() => {
      if (isOpen) {
        window.open(post.externalUrl, '_blank');
        onClose();
      }
    }, [isOpen, post.externalUrl, onClose]);
    return null;
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm overscroll-none"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-4 md:inset-8 lg:inset-12 bg-background border border-border rounded-xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border bg-secondary/20">
              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  className="hover:bg-secondary/50"
                >
                  <ArrowLeft size={16} className="mr-2" />
                  Back
                </Button>
                <div className="flex items-center space-x-2">
                  <Badge className={typeColors[post.type]}>
                    {typeLabels[post.type]}
                  </Badge>
                  <Badge className={categoryColors[post.category]} variant="outline">
                    {categoryLabels[post.category]}
                  </Badge>
                </div>
              </div>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="hover:bg-secondary/50"
              >
                <X size={18} />
              </Button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto overscroll-contain p-6" style={{ maxHeight: 'calc(100vh - 8rem)' }}>
              <article className="max-w-4xl mx-auto">
                <div className="space-y-6">
                  {/* Article Header */}
                  <div className="space-y-4">
                    {/* Title */}
                    <motion.h1 
                      className="text-3xl md:text-4xl font-bold leading-tight"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.1 }}
                    >
                      {post.title}
                    </motion.h1>

                    {/* Meta Information */}
                    <motion.div 
                      className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                    >
                      <div className="flex items-center space-x-2">
                        <User size={16} />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar size={16} />
                        <span>{formatDate(post.publishedDate)}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock size={16} />
                        <span>{post.readingTime} min read</span>
                      </div>
                    </motion.div>

                    {/* Tags */}
                    <motion.div 
                      className="flex flex-wrap gap-2"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                    >
                      {post.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          #{tag}
                        </Badge>
                      ))}
                    </motion.div>
                  </div>

                  {/* Article Content */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="prose prose-lg max-w-none dark:prose-invert"
                  >
                    <MDEditor.Markdown 
                      source={post.content} 
                      style={{ backgroundColor: 'transparent' }}
                      data-color-mode="auto"
                    />
                  </motion.div>

                  {/* Article Footer */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="border-t border-border pt-6 mt-12"
                  >
                    <div className="flex items-center justify-between">
                      <div className="space-y-2">
                        <p className="text-sm text-muted-foreground">
                          Published on {formatDate(post.publishedDate)}
                        </p>
                        {post.updatedDate && (
                          <p className="text-xs text-muted-foreground">
                            Last updated: {formatDate(post.updatedDate)}
                          </p>
                        )}
                      </div>
                      
                      <Button onClick={onClose}>
                        <ArrowLeft className="mr-2" size={16} />
                        Close Article
                      </Button>
                    </div>
                  </motion.div>
                </div>
              </article>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
