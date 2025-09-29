import { useState } from 'react';
import { motion } from 'framer-motion';
import { PageLayout } from '@/components/layout/PageLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FadeInView } from '@/components/animations/FadeInView';
import { 
  getPublicPosts, 
  getFeaturedPosts, 
  getPostsByType, 
  getPostsByCategory,
  typeLabels,
  categoryLabels,
  type WritingPost 
} from '@/data/writing';
import { BlogPostModal } from '@/components/blog/BlogPostModal';
import { 
  Calendar, 
  Clock, 
  Star, 
  Lock 
} from 'lucide-react';

const filters = [
  { id: 'all', label: 'All Posts', icon: '📚' },
  { id: 'featured', label: 'Featured', icon: '⭐' },
  { id: 'blog', label: 'Blog Posts', icon: '📝' },
  { id: 'journal', label: 'Journal', icon: '📔' },
  { id: 'technical', label: 'Technical', icon: '💻' },
  { id: 'personal', label: 'Personal', icon: '🌱' },
];

export const WritingPage = () => {
  const [activeFilter, setActiveFilter] = useState('featured');
  const [visiblePosts, setVisiblePosts] = useState(6);
  const [selectedPost, setSelectedPost] = useState<WritingPost | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openPostModal = (post: WritingPost) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  const closePostModal = () => {
    setIsModalOpen(false);
    setSelectedPost(null);
  };

  const getFilteredPosts = (): WritingPost[] => {
    switch (activeFilter) {
      case 'featured':
        return getFeaturedPosts();
      case 'all':
        return getPublicPosts();
      case 'blog':
      case 'journal':
      case 'medium':
      case 'notion':
        return getPostsByType(activeFilter as WritingPost['type']);
      case 'technical':
      case 'personal':
      case 'tutorial':
      case 'opinion':
      case 'reflection':
        return getPostsByCategory(activeFilter as WritingPost['category']);
      default:
        return getPublicPosts();
    }
  };

  const filteredPosts = getFilteredPosts();
  const displayedPosts = filteredPosts.slice(0, visiblePosts);
  const hasMorePosts = filteredPosts.length > visiblePosts;

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
                Writing & Thoughts ✍️
              </motion.h1>
              <motion.p 
                className="text-xl text-muted-foreground max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Technical articles, personal reflections, and journal entries. 
                A mix of professional insights and life experiences.
              </motion.p>
            </FadeInView>

            {/* Stats */}
            <FadeInView>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="text-center p-6 bg-secondary/30 rounded-lg">
                  <div className="text-3xl font-bold text-primary mb-2">{getPublicPosts().length}</div>
                  <div className="text-sm text-muted-foreground">Published Posts</div>
                </div>
                <div className="text-center p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div className="text-3xl font-bold text-blue-600 mb-2">{getPostsByType('blog').length}</div>
                  <div className="text-sm text-muted-foreground">Blog Articles</div>
                </div>
                <div className="text-center p-6 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <div className="text-3xl font-bold text-purple-600 mb-2">{getPostsByType('journal').length}</div>
                  <div className="text-sm text-muted-foreground">Journal Entries</div>
                </div>
                <div className="text-center p-6 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                  <div className="text-3xl font-bold text-yellow-600 mb-2">{getFeaturedPosts().length}</div>
                  <div className="text-sm text-muted-foreground">Featured</div>
                </div>
              </div>
            </FadeInView>

            {/* Filter Buttons */}
            <FadeInView>
              <div className="flex flex-wrap justify-center gap-2">
                {filters.map((filter) => (
                  <Button
                    key={filter.id}
                    variant={activeFilter === filter.id ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => {
                      setActiveFilter(filter.id);
                      setVisiblePosts(6);
                    }}
                    className="transition-all duration-300"
                  >
                    <span className="mr-2">{filter.icon}</span>
                    {filter.label}
                  </Button>
                ))}
              </div>
            </FadeInView>

            {/* Posts Grid */}
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
            >
              {displayedPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card 
                    className="h-full hover:shadow-xl transition-all duration-300 group cursor-pointer"
                    onClick={() => openPostModal(post)}
                  >
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
                            <Badge className={typeColors[post.type]}>
                              {typeLabels[post.type]}
                            </Badge>
                            <Badge className={categoryColors[post.category]} variant="outline">
                              {categoryLabels[post.category]}
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
                              <Clock size={14} />
                              <span>{post.readingTime} min</span>
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

                          {/* Action */}
                          <div className="pt-2">
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-primary font-medium group-hover:underline">
                                {post.externalUrl ? 'Open External →' : 'Read More →'}
                              </span>
                              {post.privacy === 'private' && (
                                <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                                  <Lock size={12} />
                                  <span>Private</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>

            {/* Load More Button */}
            {hasMorePosts && (
              <FadeInView className="text-center">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => setVisiblePosts(prev => prev + 6)}
                  className="min-w-[200px]"
                >
                  Load More Posts
                </Button>
              </FadeInView>
            )}

            {/* No Posts Message */}
            {filteredPosts.length === 0 && (
              <FadeInView className="text-center py-12">
                <div className="text-6xl mb-4">📝</div>
                <h3 className="text-xl font-semibold mb-2">No posts found</h3>
                <p className="text-muted-foreground">
                  No posts in this category yet. Check back soon for new content!
                </p>
              </FadeInView>
            )}

            {/* Newsletter/Subscribe Section */}
            <FadeInView className="text-center">
              <div className="bg-secondary/50 rounded-lg p-8">
                <h3 className="text-2xl font-bold mb-4">Stay Updated</h3>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  Get notified when I publish new articles, tutorials, and personal reflections.
                </p>
                <div className="flex justify-center space-x-4">
                  <motion.div
                    className="inline-block bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold cursor-pointer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Follow on Social Media
                  </motion.div>
                  <motion.div
                    className="inline-block border border-border px-8 py-3 rounded-lg font-semibold cursor-pointer hover:bg-secondary"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    RSS Feed
                  </motion.div>
                </div>
              </div>
            </FadeInView>
          </div>
        </div>
      </section>

      {/* Blog Post Modal */}
      <BlogPostModal
        post={selectedPost}
        isOpen={isModalOpen}
        onClose={closePostModal}
      />
    </PageLayout>
  );
};
