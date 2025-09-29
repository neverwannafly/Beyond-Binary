import { type BlogPost } from '@/types/content';

export const blogPosts: BlogPost[] = [
  {
    id: 'react-performance-optimization',
    title: 'React Performance Optimization: Beyond the Basics',
    slug: 'react-performance-optimization',
    excerpt: 'Deep dive into advanced React performance techniques including memoization, virtualization, and code splitting strategies.',
    content: `# React Performance Optimization: Beyond the Basics

React applications can become slow when they grow in complexity. While React is generally fast out of the box, there are several advanced techniques that can help you squeeze every bit of performance from your applications.

## Understanding React's Rendering Process

Before diving into optimization techniques, it's crucial to understand how React renders components...

\`\`\`jsx
// Example: Expensive component re-rendering
const ExpensiveComponent = ({ data, filter }) => {
  // This will run on every render
  const filteredData = data.filter(item => item.type === filter);
  
  return (
    <div>
      {filteredData.map(item => (
        <ItemComponent key={item.id} item={item} />
      ))}
    </div>
  );
};
\`\`\`

## Memoization Strategies

### React.memo for Component Memoization

\`\`\`jsx
const OptimizedComponent = React.memo(({ data, filter }) => {
  const filteredData = useMemo(
    () => data.filter(item => item.type === filter),
    [data, filter]
  );
  
  return (
    <div>
      {filteredData.map(item => (
        <ItemComponent key={item.id} item={item} />
      ))}
    </div>
  );
});
\`\`\`

## Code Splitting with React.lazy

\`\`\`jsx
const LazyComponent = React.lazy(() => import('./HeavyComponent'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyComponent />
    </Suspense>
  );
}
\`\`\`

## Conclusion

Performance optimization is an ongoing process. Use the React DevTools Profiler to identify bottlenecks and apply these techniques strategically.`,
    publishedDate: '2024-01-15',
    author: 'Your Name',
    tags: ['React', 'Performance', 'JavaScript', 'Frontend'],
    category: 'technical',
    featured: true,
    readingTime: 8,
    status: 'published',
    seoTitle: 'Advanced React Performance Optimization Techniques',
    seoDescription: 'Learn advanced React performance optimization techniques including memoization, code splitting, and rendering optimization.',
  },
  {
    id: 'building-scalable-apis',
    title: 'Building Scalable APIs with Node.js and TypeScript',
    slug: 'building-scalable-apis',
    excerpt: 'A comprehensive guide to architecting robust, scalable APIs using Node.js, TypeScript, and modern best practices.',
    content: `# Building Scalable APIs with Node.js and TypeScript

Creating scalable APIs requires careful planning and the right architecture. In this guide, we'll explore how to build robust APIs that can handle growth.

## Project Structure

\`\`\`
src/
├── controllers/
├── services/
├── models/
├── middleware/
├── routes/
├── utils/
└── types/
\`\`\`

## Setting Up TypeScript

\`\`\`json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "lib": ["ES2020"],
    "outDir": "./dist",
    "strict": true,
    "esModuleInterop": true
  }
}
\`\`\`

## Error Handling Middleware

\`\`\`typescript
export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err.stack);
  
  res.status(500).json({
    error: 'Something went wrong!',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};
\`\`\`

This architecture provides a solid foundation for scalable API development.`,
    publishedDate: '2024-01-10',
    author: 'Your Name',
    tags: ['Node.js', 'TypeScript', 'API', 'Backend'],
    category: 'technical',
    featured: true,
    readingTime: 12,
    status: 'published',
  },
  {
    id: 'climbing-fear-to-flow',
    title: 'From Fear to Flow: My Rock Climbing Journey',
    slug: 'climbing-fear-to-flow',
    excerpt: 'How rock climbing taught me about conquering fear, building confidence, and finding flow state in challenging situations.',
    content: `# From Fear to Flow: My Rock Climbing Journey

Rock climbing has been one of the most transformative experiences in my life. What started as a weekend activity has become a metaphor for how I approach challenges in both coding and life.

## The Beginning: Facing the Wall

My first time at a climbing gym was intimidating. The walls looked impossibly high, and watching experienced climbers made it seem effortless. But like debugging a complex codebase, you have to start somewhere.

## The Mental Game

Climbing is 50% physical, 50% mental. The parallel to software development is striking:

- **Problem-solving under pressure**: Just like debugging production issues
- **Breaking down complex problems**: Each route is a puzzle to solve
- **Trusting your skills**: Confidence comes from practice and preparation

## Lessons for Code

1. **Start with the basics**: Master fundamental movements before attempting advanced techniques
2. **Fail fast and learn**: Every fall teaches you something new
3. **Read the route**: Planning your approach is crucial for success

## Current Goals

I'm currently working towards my first 5.12a route. The progression in climbing, like in programming, is gradual but rewarding.

Each project, whether it's a difficult climb or a complex feature, requires patience, persistence, and the willingness to step outside your comfort zone.`,
    publishedDate: '2024-01-05',
    author: 'Your Name',
    tags: ['Personal', 'Rock Climbing', 'Growth', 'Mindset'],
    category: 'personal',
    featured: false,
    readingTime: 6,
    status: 'published',
  },
];

export const getFeaturedPosts = () => blogPosts.filter(post => post.featured);
export const getPostsByCategory = (category: BlogPost['category']) => 
  blogPosts.filter(post => post.category === category);
export const getPostBySlug = (slug: string) => blogPosts.find(post => post.slug === slug);
