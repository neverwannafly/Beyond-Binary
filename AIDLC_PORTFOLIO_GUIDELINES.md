# Portfolio Development Guidelines

## 🎯 **Project Vision**

A sophisticated, animation-driven portfolio for a 27M software engineer showcasing technical expertise, personal interests, and lifestyle adventures with smooth scrolling and professional aesthetics.

## 👤 **User Profile**
- **Role**: Software Engineer
- **Interests**: Programming, reading, chess, anime, music
- **Activities**: Kayaking, rock climbing, tech blogging, journaling
- **Goals**: Showcase projects, maintain content, track achievements

## 🎨 **Visual Style Direction**
- **Aesthetic**: Modern, minimalist, yet playful
- **Theme**: Dark preference with 11 theme options
- **Layout**: Card-based, clean organization
- **Animations**: Smooth, professional, micro-interactions
- **Typography**: Clean, readable, code-friendly

## 📋 **Website Structure & Sections**

### **1. Hero Section** (Landing Experience)
- Animated terminal-style introduction
- Particle background or geometric animations
- Theme selector integration
- Smooth scroll indicators
- Professional photo with animated text

### **2. About Me** (Personal Introduction)
- Split-screen design: Photo + interests
- Animated stats (books read, chess rating, projects)
- Interactive hobby icons with expand effects
- Personal story with professional journey

### **3. Technical Portfolio** (Professional Showcase)
- Project showcase with live demos
- GitHub integration and tech stacks
- Skills visualization (interactive)
- Experience timeline with smooth scrolling
- Code snippets and architecture diagrams

### **4. Content Hub** (Creative Side)
- **Tech Blog**: Rich MD renderer (Notion-like)
- **Personal Journal**: Privacy-controlled entries
- **Reading List**: Book covers and reviews
- **Music Dashboard**: Spotify/Apple Music integration

### **5. Adventure Zone** (Lifestyle & Goals)
- **Bucket List Tracker**: Coin reward system
- **Adventure Gallery**: Kayaking, rock climbing media
- **Achievement Timeline**: Earned coins with dates
- **Instagram Integration**: Outdoor activity posts

### **6. Interactive Features**
- **Anime List Manager**: MyAnimeList-style interface
- **Chess.com Integration**: Rating, recent games
- **Music Stats**: Listening habits, favorites
- **Contact Form**: Professional networking

## 🏗️ **Component Architecture**

```
src/
├── components/
│   ├── ui/                     # shadcn/ui components
│   ├── layout/
│   │   ├── Header.tsx          # Navigation with theme selector
│   │   ├── Footer.tsx          # Social links, contact
│   │   ├── ScrollProgress.tsx  # Smooth scroll indicator
│   │   └── PageTransition.tsx  # Route transitions
│   ├── sections/
│   │   ├── Hero/
│   │   │   ├── HeroSection.tsx
│   │   │   ├── TerminalIntro.tsx
│   │   │   ├── ParticleBackground.tsx
│   │   │   └── ScrollIndicator.tsx
│   │   ├── About/
│   │   │   ├── AboutSection.tsx
│   │   │   ├── InterestCards.tsx
│   │   │   ├── StatsDisplay.tsx
│   │   │   └── PersonalStory.tsx
│   │   ├── Portfolio/
│   │   │   ├── ProjectShowcase.tsx
│   │   │   ├── ProjectCard.tsx
│   │   │   ├── TechStack.tsx
│   │   │   └── SkillsVisualization.tsx
│   │   ├── Content/
│   │   │   ├── BlogSection.tsx
│   │   │   ├── JournalSection.tsx
│   │   │   ├── MDRenderer.tsx
│   │   │   └── ReadingList.tsx
│   │   ├── Adventure/
│   │   │   ├── BucketList.tsx
│   │   │   ├── CoinSystem.tsx
│   │   │   ├── AdventureGallery.tsx
│   │   │   └── InstagramFeed.tsx
│   │   └── Interactive/
│   │       ├── AnimeList.tsx
│   │       ├── MusicDashboard.tsx
│   │       ├── ChessStats.tsx
│   │       └── ContactForm.tsx
│   ├── animations/
│   │   ├── SmoothScroll.tsx
│   │   ├── ParallaxContainer.tsx
│   │   ├── AnimatedCounter.tsx
│   │   ├── FadeInView.tsx
│   │   └── TypingEffect.tsx
│   ├── markdown/
│   │   ├── NotionRenderer.tsx
│   │   ├── CodeBlock.tsx
│   │   ├── MediaEmbed.tsx
│   │   └── TableOfContents.tsx
│   └── common/
│       ├── LoadingSpinner.tsx
│       ├── ErrorBoundary.tsx
│       └── SEOHead.tsx
├── lib/
│   ├── animations.ts           # Framer Motion configurations
│   ├── api/
│   │   ├── instagram.ts        # Instagram API
│   │   ├── spotify.ts          # Spotify API
│   │   ├── chess.ts            # Chess.com API
│   │   └── github.ts           # GitHub API
│   ├── data.ts                 # Static data management
│   ├── markdown.ts             # MD parsing utilities
│   ├── coins.ts                # Coin reward system
│   └── storage.ts              # Local storage utilities
├── types/
│   ├── portfolio.ts            # Project, experience types
│   ├── adventure.ts            # Bucket list, coin system
│   ├── content.ts              # Blog, journal types
│   ├── media.ts                # Image, video types
│   └── api.ts                  # External API response types
├── data/
│   ├── projects.ts             # Project showcase data
│   ├── experience.ts           # Professional experience
│   ├── bucket-list.ts          # Adventure goals and coins
│   ├── anime-list.ts           # Anime tracking data
│   ├── books.ts                # Reading list
│   ├── music.ts                # Music preferences
│   └── blog-posts/             # Markdown blog files
├── hooks/
│   ├── useScrollProgress.ts    # Scroll position tracking
│   ├── useInView.ts            # Intersection observer
│   ├── useLocalStorage.ts      # Local storage hook
│   └── useApi.ts               # API integration hooks
└── styles/
    ├── animations.css          # Custom animations
    └── components.css          # Component-specific styles
```

## 🚀 **Technology Stack**

### **Core Framework:**
- React 18 with TypeScript
- Vite for build tooling
- Tailwind CSS with 11 custom themes
- shadcn/ui component library

### **Animation & Interactions:**
- **Framer Motion** - Page transitions and smooth animations
- **React Spring** - Physics-based micro-interactions
- **Lenis** - Smooth scrolling library
- **React Intersection Observer** - Scroll-triggered animations

### **Rich Content Management:**
- **@uiw/react-md-editor** - Notion-like MD editor/renderer
- **React Syntax Highlighter** - Code highlighting
- **React Image Gallery** - Media galleries
- **React Virtualized** - Performance for large lists

### **State Management:**
- **Zustand** - Global state (coins, achievements, preferences)
- **React Query** - API data fetching and caching
- **React Hook Form** - Form management

### **Data Persistence:**
- **LocalStorage** - User preferences, coins
- **IndexedDB** - Large data (blog drafts, media)
- **JSON files** - Static content

### **External Integrations:**
- **Instagram Basic Display API** - Adventure photos
- **Spotify Web API** - Music listening data
- **Chess.com API** - Chess statistics
- **GitHub API** - Repository information

## 🎯 **Implementation Phases**

### **Phase 1: Foundation & Core Structure**
1. Install animation dependencies
2. Set up smooth scrolling system
3. Create responsive layout with navigation
4. Implement theme system integration
5. Build hero section with terminal intro

### **Phase 2: Content Sections**
1. About Me section with interactive elements
2. Technical portfolio showcase
3. Basic blog system with MD renderer
4. Project cards with hover effects

### **Phase 3: Advanced Features**
1. Bucket list with coin reward system
2. Adventure gallery with media management
3. Rich markdown editor (Notion-like)
4. Interactive stats and counters

### **Phase 4: External Integrations**
1. Instagram feed integration
2. Spotify music dashboard
3. Chess.com statistics
4. GitHub repository showcase

### **Phase 5: Polish & Performance**
1. Advanced animations and micro-interactions
2. SEO optimization
3. Performance optimization
4. Mobile responsiveness fine-tuning
5. Accessibility improvements

## 🎨 **Animation Guidelines**

### **Timing & Easing:**
- **Page transitions**: 300-500ms with easeInOut
- **Hover effects**: 150-250ms for responsiveness
- **Scroll animations**: Triggered at 20% viewport entry
- **Loading states**: Smooth skeleton animations

### **Animation Principles:**
- **Subtle but engaging** - Never overwhelming
- **Purposeful motion** - Each animation serves UX
- **Performance first** - 60fps target
- **Reduced motion respect** - Accessibility compliance

### **Scroll Behavior:**
- **Smooth scrolling** throughout the site
- **Parallax effects** for depth (performance conscious)
- **Sticky navigation** with scroll progress
- **Section transitions** with fade/slide effects

## 📱 **Responsive Design Strategy**

### **Breakpoints:**
- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px - 1440px
- **Large**: 1440px+

### **Mobile Considerations:**
- **Touch-friendly** interactions
- **Simplified animations** for performance
- **Optimized media** loading
- **Gesture navigation** support

## 🔧 **Development Standards**

### **Code Quality:**
- **TypeScript strict mode** enabled
- **ESLint + Prettier** for consistency
- **Component composition** over inheritance
- **Custom hooks** for reusable logic

### **Performance:**
- **Lazy loading** for images and components
- **Code splitting** by route and feature
- **Optimized bundle size** monitoring
- **Web Vitals** tracking

### **Accessibility:**
- **ARIA labels** for interactive elements
- **Keyboard navigation** support
- **Screen reader** compatibility
- **Color contrast** compliance

## 📚 **Content Strategy**

### **Blog Content:**
- Technical tutorials and insights
- Personal development journey
- Project retrospectives
- Industry observations

### **Journal Entries:**
- Personal reflections (privacy controls)
- Adventure logs with media
- Learning experiences
- Goal tracking and achievements

### **Media Management:**
- **Optimized images** with WebP format
- **Video compression** for faster loading
- **Gallery organization** by category
- **Alt text** for all media

This document serves as the single source of truth for the portfolio development. Every implementation decision should align with these guidelines.
