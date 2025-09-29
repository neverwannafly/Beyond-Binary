export interface NavigationItem {
  id: string;
  label: string;
  path: string;
  icon?: string;
  description?: string;
}

export const navigationItems: NavigationItem[] = [
  {
    id: 'home',
    label: 'Home',
    path: '/',
    icon: '🏠',
    description: 'Welcome & About Me',
  },
  {
    id: 'portfolio',
    label: 'Portfolio',
    path: '/portfolio',
    icon: '💼',
    description: 'Projects & technical work',
  },
  {
    id: 'writing',
    label: 'Writing',
    path: '/writing',
    icon: '✍️',
    description: 'Blog posts, articles & journal',
  },
  {
    id: 'adventures',
    label: 'Adventures',
    path: '/adventures',
    icon: '🏔️',
    description: 'Outdoor experiences & stories',
  },
  {
    id: 'goals',
    label: 'Goals',
    path: '/goals',
    icon: '🎯',
    description: 'Life goals & achievement tracking',
  },
  {
    id: 'collections',
    label: 'Collections',
    path: '/collections',
    icon: '📚',
    description: 'Anime, books, music & more',
  },
  {
    id: 'contact',
    label: 'Contact',
    path: '/contact',
    icon: '💬',
    description: 'Get in touch',
  },
];
