import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PageLayout } from '@/components/layout/PageLayout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FadeInView } from '@/components/animations/FadeInView';
import { getPostBySlug, typeLabels, categoryLabels } from '@/data/writing';
import { ArrowLeft, Calendar, Clock, User } from 'lucide-react';
import MDEditor from '@uiw/react-md-editor';

export const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPostBySlug(slug) : null;

  if (!post) {
    return (
      <PageLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold">Post Not Found</h1>
            <p className="text-muted-foreground">The blog post you're looking for doesn't exist.</p>
            <Link to="/writing">
              <Button>
                <ArrowLeft className="mr-2" size={16} />
                Back to Writing
              </Button>
            </Link>
          </div>
        </div>
      </PageLayout>
    );
  }

  if (post.externalUrl) {
    // Redirect to external URL
    window.open(post.externalUrl, '_blank');
    return (
      <PageLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center space-y-4">
            <h1 className="text-2xl font-bold">Redirecting...</h1>
            <p className="text-muted-foreground">You're being redirected to the external article.</p>
            <Link to="/writing">
              <Button>
                <ArrowLeft className="mr-2" size={16} />
                Back to Writing
              </Button>
            </Link>
          </div>
        </div>
      </PageLayout>
    );
  }

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
      <article className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="space-y-8">
            {/* Back Button */}
            <FadeInView>
              <Link to="/writing">
                <Button variant="ghost" className="group">
                  <ArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" size={16} />
                  Back to Writing
                </Button>
              </Link>
            </FadeInView>

            {/* Article Header */}
            <FadeInView className="space-y-6">
              <div className="space-y-4">
                {/* Badges */}
                <div className="flex items-center space-x-3">
                  <Badge className={typeColors[post.type]}>
                    {typeLabels[post.type]}
                  </Badge>
                  <Badge className={categoryColors[post.category]} variant="outline">
                    {categoryLabels[post.category]}
                  </Badge>
                  {post.featured && (
                    <Badge className="bg-yellow-500 text-yellow-900">
                      Featured
                    </Badge>
                  )}
                </div>

                {/* Title */}
                <motion.h1 
                  className="text-4xl md:text-5xl font-bold leading-tight"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  {post.title}
                </motion.h1>

                {/* Meta Information */}
                <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
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
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      #{tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </FadeInView>

            {/* Article Content */}
            <FadeInView>
              <div className="prose prose-lg max-w-none dark:prose-invert">
                <MDEditor.Markdown 
                  source={post.content} 
                  style={{ backgroundColor: 'transparent' }}
                  data-color-mode="auto"
                />
              </div>
            </FadeInView>

            {/* Article Footer */}
            <FadeInView>
              <div className="border-t border-border pt-8">
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
                  
                  <Link to="/writing">
                    <Button>
                      <ArrowLeft className="mr-2" size={16} />
                      More Articles
                    </Button>
                  </Link>
                </div>
              </div>
            </FadeInView>
          </div>
        </div>
      </article>
    </PageLayout>
  );
};
