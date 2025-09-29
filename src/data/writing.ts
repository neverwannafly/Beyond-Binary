export interface WritingPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  publishedDate: string;
  updatedDate?: string;
  author: string;
  tags: string[];
  type: 'blog' | 'journal' | 'medium' | 'notion';
  category: 'technical' | 'personal' | 'tutorial' | 'opinion' | 'reflection' | 'adventure' | 'learning';
  featured: boolean;
  readingTime: number;
  status: 'draft' | 'published' | 'archived';
  externalUrl?: string; // For Medium/Notion articles
  privacy: 'public' | 'private';
  coverImage?: string;
}

export const writingPosts: WritingPost[] = [
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

## Conclusion

Performance optimization is an ongoing process. Use the React DevTools Profiler to identify bottlenecks and apply these techniques strategically.`,
    publishedDate: '2024-01-15',
    author: 'Your Name',
    tags: ['React', 'Performance', 'JavaScript', 'Frontend'],
    type: 'blog',
    category: 'technical',
    featured: true,
    readingTime: 8,
    status: 'published',
    privacy: 'public',
  },
  {
    id: 'climbing-fear-to-flow',
    title: 'From Fear to Flow: My Rock Climbing Journey',
    slug: 'climbing-fear-to-flow',
    excerpt: 'Personal reflections on how rock climbing taught me about conquering fear, building confidence, and finding flow state.',
    content: `# From Fear to Flow: My Rock Climbing Journey

Rock climbing has been one of the most transformative experiences in my life. What started as a weekend activity has become a metaphor for how I approach challenges in both coding and life.

## The Beginning: Facing the Wall

My first time at a climbing gym was intimidating. The walls looked impossibly high, and watching experienced climbers made it seem effortless. But like debugging a complex codebase, you have to start somewhere.

## The Mental Game

Climbing is 50% physical, 50% mental. The parallel to software development is striking:

- **Problem-solving under pressure**: Just like debugging production issues
- **Breaking down complex problems**: Each route is a puzzle to solve
- **Trusting your skills**: Confidence comes from practice and preparation

## Finding Flow

There's a moment in climbing when everything clicks. You stop thinking about the moves and start flowing through them. It's the same feeling I get when coding in the zone - time disappears, and solutions emerge naturally.

## Current Goals

I'm currently working towards my first 5.12a route. The progression in climbing, like in programming, is gradual but rewarding.

Each project, whether it's a difficult climb or a complex feature, requires patience, persistence, and the willingness to step outside your comfort zone.`,
    publishedDate: '2024-01-05',
    author: 'Your Name',
    tags: ['Personal', 'Rock Climbing', 'Growth', 'Mindset', 'Flow State'],
    type: 'journal',
    category: 'reflection',
    featured: true,
    readingTime: 6,
    status: 'published',
    privacy: 'public',
  },
  {
    id: 'daily-reflection-march-15',
    title: 'Daily Reflection: Progress and Setbacks',
    slug: 'daily-reflection-march-15',
    excerpt: 'Today was a mix of breakthrough moments and frustrating obstacles. Reflecting on the ups and downs.',
    content: `# Daily Reflection: March 15, 2024

## Morning Energy

Started the day with a great kayaking session on Clear Creek. The water was perfect - not too high, not too low. I finally nailed that eddy turn that's been giving me trouble for weeks.

## Work Challenges

Hit a wall with the authentication system I'm building. Spent 3 hours debugging what turned out to be a simple environment variable issue. Sometimes the simplest things trip you up the most.

## Evening Thoughts

- **Wins**: Kayaking breakthrough, solved the auth bug, good conversation with Sarah about life goals
- **Struggles**: Procrastinated on Japanese study again, need better discipline
- **Tomorrow**: Focus on the new feature implementation, don't get distracted by perfectionism

## Gratitude

Grateful for:
1. Having access to beautiful rivers for kayaking
2. Challenging work that keeps me growing
3. Friends who listen and offer perspective

The day reminds me that progress isn't always linear. Some days you flow, some days you struggle, but both are part of the journey.`,
    publishedDate: '2024-03-15',
    author: 'Your Name',
    tags: ['Daily Life', 'Reflection', 'Gratitude', 'Personal Growth'],
    type: 'journal',
    category: 'personal',
    featured: false,
    readingTime: 3,
    status: 'published',
    privacy: 'public',
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
    tags: ['Node.js', 'TypeScript', 'API', 'Backend', 'Architecture'],
    type: 'blog',
    category: 'tutorial',
    featured: true,
    readingTime: 12,
    status: 'published',
    privacy: 'public',
  },
  {
    id: 'medium-article-example',
    title: 'The Future of Web Development (Medium)',
    slug: 'future-web-development-medium',
    excerpt: 'My thoughts on where web development is heading, published on Medium.',
    content: '',
    publishedDate: '2024-02-20',
    author: 'Your Name',
    tags: ['Web Development', 'Future', 'Technology', 'Trends'],
    type: 'medium',
    category: 'opinion',
    featured: false,
    readingTime: 7,
    status: 'published',
    privacy: 'public',
    externalUrl: 'https://medium.com/@yourusername/future-web-development-123',
  },
  {
    id: 'private-journal-struggles',
    title: 'Dealing with Imposter Syndrome',
    slug: 'imposter-syndrome-private',
    excerpt: 'Private thoughts on dealing with self-doubt in my career.',
    content: `# Dealing with Imposter Syndrome

## The Weight of Expectations

Some days I feel like I'm just pretending to know what I'm doing. Everyone else seems so confident, so sure of their abilities. Meanwhile, I'm googling basic concepts and wondering if I belong here.

## What Triggers It

- Seeing amazing projects on Twitter/LinkedIn
- Being in meetings with senior developers
- Getting assigned complex tasks
- Comparing myself to bootcamp classmates who seem to progress faster

## Strategies That Help

1. **Document wins**: Keep a list of problems I've solved
2. **Remember everyone googles**: Even senior developers look things up
3. **Focus on growth**: Compare myself to yesterday's me, not to others
4. **Talk to mentors**: They remind me that struggle is normal

## Tomorrow's Focus

Going to work on that authentication feature without overthinking it. One step at a time.`,
    publishedDate: '2024-03-10',
    author: 'Your Name',
    tags: ['Mental Health', 'Career', 'Self-Doubt', 'Growth'],
    type: 'journal',
    category: 'personal',
    featured: false,
    readingTime: 4,
    status: 'published',
    privacy: 'private',
  },
];

// Helper functions
export const getPublicPosts = () => writingPosts.filter(post => post.privacy === 'public' && post.status === 'published');
export const getFeaturedPosts = () => writingPosts.filter(post => post.featured && post.privacy === 'public');
export const getPostsByType = (type: WritingPost['type']) => 
  writingPosts.filter(post => post.type === type && post.privacy === 'public');
export const getPostsByCategory = (category: WritingPost['category']) => 
  writingPosts.filter(post => post.category === category && post.privacy === 'public');
export const getPostBySlug = (slug: string) => writingPosts.find(post => post.slug === slug);

export const typeLabels = {
  blog: '📝 Blog Post',
  journal: '📔 Journal Entry',
  medium: '📰 Medium Article',
  notion: '📄 Notion Article',
};

export const categoryLabels = {
  technical: 'Technical',
  personal: 'Personal',
  tutorial: 'Tutorial',
  opinion: 'Opinion',
  reflection: 'Reflection',
  adventure: 'Adventure',
  learning: 'Learning',
};

