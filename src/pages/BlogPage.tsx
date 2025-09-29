import { useState } from 'react';
import { motion } from 'framer-motion';
import { PageLayout } from '@/components/layout/PageLayout';
import { BlogCard } from '@/components/sections/Blog/BlogCard';
import { Button } from '@/components/ui/button';
import { FadeInView } from '@/components/animations/FadeInView';
import { blogPosts, getFeaturedPosts, getPostsByCategory } from '@/data/blog-posts';
import { type BlogPost } from '@/types/content';

const categories = [
  { id: 'all', label: 'All Posts', icon: '📝' },
  { id: 'featured', label: 'Featured', icon: '⭐' },
  { id: 'technical', label: 'Technical', icon: '💻' },
  { id: 'personal', label: 'Personal', icon: '🌱' },
  { id: 'tutorial', label: 'Tutorials', icon: '📚' },
];

export const BlogPage = () => {
  const [activeCategory, setActiveCategory] = useState('featured');
  const [visiblePosts, setVisiblePosts] = useState(6);

  const getFilteredPosts = (): BlogPost[] => {
    switch (activeCategory) {
      case 'featured':
        return getFeaturedPosts();
      case 'all':
        return blogPosts.filter(post => post.status === 'published');
      default:
        return getPostsByCategory(activeCategory as BlogPost['category']);
    }
  };

  const filteredPosts = getFilteredPosts();
  const displayedPosts = filteredPosts.slice(0, visiblePosts);
  const hasMorePosts = filteredPosts.length > visiblePosts;

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
                Tech Blog & Thoughts
              </motion.h1>
              <motion.p 
                className="text-xl text-muted-foreground max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Sharing insights from my journey as a software engineer, climbing adventures, 
                and everything in between. Technical deep-dives, personal reflections, and lessons learned.
              </motion.p>
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
                      setVisiblePosts(6);
                    }}
                    className="transition-all duration-300"
                  >
                    <span className="mr-2">{category.icon}</span>
                    {category.label}
                  </Button>
                ))}
              </div>
            </FadeInView>

            {/* Blog Posts Grid */}
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
                  <BlogCard post={post} index={index} />
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
                  Get notified when I publish new posts about software development, 
                  climbing adventures, and tech insights.
                </p>
                <motion.div
                  className="inline-block bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Follow on Social Media
                </motion.div>
              </div>
            </FadeInView>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};
