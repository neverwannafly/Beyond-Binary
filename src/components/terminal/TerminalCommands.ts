import { getPublicPosts } from '@/data/writing';
import { animeList, booksList, musicCollection } from '@/data/collections';
import { lifeGoals } from '@/data/goals';
import { adventures } from '@/data/adventures';

export class TerminalCommands {
  private commands: Map<string, (...args: string[]) => Promise<string | string[]>>;
  private currentDirectory: string = '/';

  constructor() {
    this.commands = new Map();
    this.commands.set('help', this.help.bind(this));
    this.commands.set('ls', this.ls.bind(this));
    this.commands.set('cd', this.cd.bind(this));
    this.commands.set('cat', this.cat.bind(this));
    this.commands.set('pwd', this.pwd.bind(this));
    this.commands.set('whoami', this.whoami.bind(this));
    this.commands.set('clear', this.clear.bind(this));
    this.commands.set('echo', this.echo.bind(this));
    this.commands.set('tour', this.tour.bind(this));
    this.commands.set('skills', this.skills.bind(this));
    this.commands.set('projects', this.projects.bind(this));
    this.commands.set('blog', this.blog.bind(this));
    this.commands.set('goals', this.goals.bind(this));
    this.commands.set('adventures', this.adventures.bind(this));
    this.commands.set('anime', this.anime.bind(this));
    this.commands.set('books', this.books.bind(this));
    this.commands.set('music', this.music.bind(this));
    this.commands.set('contact', this.contact.bind(this));
    this.commands.set('social', this.social.bind(this));
    this.commands.set('stats', this.stats.bind(this));
    this.commands.set('search', this.search.bind(this));
    this.commands.set('theme', this.theme.bind(this));
    this.commands.set('ascii', this.ascii.bind(this));
    this.commands.set('matrix', this.matrix.bind(this));
    this.commands.set('cowsay', this.cowsay.bind(this));
    this.commands.set('fortune', this.fortune.bind(this));
    this.commands.set('date', this.date.bind(this));
    this.commands.set('uptime', this.uptime.bind(this));
  }

  execute(command: string): string | string[] {
    const [cmd, ...args] = command.toLowerCase().trim().split(' ');
    
    if (!cmd) return '';
    
    const commandFn = this.commands.get(cmd);
    if (commandFn) {
      // Execute synchronously by calling the function directly
      const result = commandFn(...args);
      // If it's a promise, resolve it immediately
      if (result instanceof Promise) {
        // For immediate execution, we'll make all commands sync
        return this.executeSync(cmd, ...args);
      }
      return result;
    }
    
    return `Command not found: ${cmd}. Type 'help' for available commands.`;
  }

  private executeSync(cmd: string, ...args: string[]): string | string[] {
    // Execute commands synchronously for instant response
    switch (cmd) {
      case 'help': return this.helpSync();
      case 'ls': return this.lsSync(args[0]);
      case 'cd': return this.cdSync(args[0]);
      case 'pwd': return this.pwdSync();
      case 'cat': return this.catSync(args[0]);
      case 'whoami': return this.whoamiSync();
      case 'clear': return 'CLEAR_TERMINAL';
      case 'echo': return args.join(' ');
      case 'tour': return this.tourSync();
      case 'skills': return this.skillsSync();
      case 'projects': return this.projectsSync();
      case 'blog': return this.blogSync();
      case 'goals': return this.goalsSync();
      case 'adventures': return this.adventuresSync();
      case 'anime': return this.animeSync();
      case 'books': return this.booksSync();
      case 'music': return this.musicSync();
      case 'contact': return this.contactSync();
      case 'social': return this.socialSync();
      case 'stats': return this.statsSync();
      case 'search': return this.searchSync(args[0]);
      case 'theme': return this.themeSync(args[0]);
      case 'ascii': return this.asciiSync();
      case 'matrix': return this.matrixSync();
      case 'cowsay': return this.cowsaySync(args.join(' '));
      case 'fortune': return this.fortuneSync();
      case 'date': return this.dateSync();
      case 'uptime': return this.uptimeSync();
      default: return `Command not found: ${cmd}. Type 'help' for available commands.`;
    }
  }

  getCurrentDirectory(): string {
    return this.currentDirectory === '/' ? '~' : this.currentDirectory;
  }

  getCompletions(input: string, currentWord: string): string[] {
    const parts = input.trim().split(' ');
    const command = parts[0];
    
    if (parts.length === 1) {
      // Complete commands
      const commands = Array.from(this.commands.keys());
      return commands.filter(cmd => cmd.startsWith(currentWord));
    } else if (command === 'cd' || command === 'ls') {
      // Complete directory names
      const directories = ['projects', 'blog', 'adventures', 'goals', 'collections'];
      return directories.filter(dir => dir.startsWith(currentWord));
    } else if (command === 'cat') {
      // Complete file names based on current directory
      const files = this.getFilesInDirectory(this.currentDirectory);
      return files.filter(file => file.startsWith(currentWord));
    }
    
    return [];
  }

  private getFilesInDirectory(dir: string): string[] {
    const fileMap: Record<string, string[]> = {
      '/': ['contact.txt', 'README.md'],
      '/projects': ['portfolio.tsx'],
      '/blog': [],
      '/collections': ['anime.json', 'books.json', 'music.json'],
      '/adventures': [],
      '/goals': ['completed.json', 'in-progress.json', 'future.json', 'coins.json'],
    };
    
    return fileMap[dir] || [];
  }

  // Synchronous command implementations for instant execution
  private lsSync(dir?: string): string[] {
    const directories: Record<string, string[]> = {
      '/': ['projects/', 'blog/', 'adventures/', 'goals/', 'collections/', 'contact.txt', 'README.md'],
      '/projects': ['portfolio.tsx', 'saas-app/', 'api-gateway/', 'mobile-app/', 'contributions/'],
      '/blog': ['technical/', 'personal/', 'tutorials/', 'archived/'],
      '/collections': ['anime.json', 'books.json', 'music.json'],
      '/adventures': ['climbing/', 'kayaking/', 'hiking/', 'photos/'],
      '/goals': ['completed.json', 'in-progress.json', 'future.json', 'coins.json'],
    };

    // Use current directory if no directory specified
    let targetDir = this.currentDirectory;
    
    if (dir) {
      if (dir.startsWith('/')) {
        targetDir = dir;
      } else if (dir === '..') {
        // Go up one level from current directory
        if (this.currentDirectory === '/') {
          targetDir = '/';
        } else {
          targetDir = '/'; // For now, all subdirs go back to root
        }
      } else {
        // Handle relative paths from current directory
        targetDir = this.currentDirectory === '/' ? `/${dir}` : `${this.currentDirectory}/${dir}`;
      }
    }

    
    const contents = directories[targetDir];
    
    if (!contents) {
      return [`ls: ${dir || targetDir}: No such file or directory`];
    }

    return [
      `Contents of ${targetDir}:`,
      '',
      ...contents.map((item: string) => `  ${item.endsWith('/') ? '📁' : '📄'} ${item}`),
    ];
  }

  private cdSync(dir?: string): string {
    const validDirs = ['/', '/projects', '/blog', '/adventures', '/goals', '/collections'];
    
    if (!dir || dir === '~' || dir === '/') {
      this.currentDirectory = '/';
      return 'Changed to home directory (/)';
    }
    
    if (dir === '..') {
      this.currentDirectory = '/';
      return 'Changed to home directory (/)';
    }
    
    let targetDir = dir;
    if (!dir.startsWith('/')) {
      targetDir = `/${dir}`;
    }
    
    
    if (validDirs.includes(targetDir)) {
      this.currentDirectory = targetDir;
      return `Changed to ${targetDir}`;
    }
    
    return `cd: ${dir}: No such directory`;
  }

  private pwdSync(): string {
    return `/home/portfolio${this.currentDirectory}`;
  }

  private catSync(file?: string): string[] {
    const files: Record<string, string[]> = {
      '/README.md': [
        '# Portfolio Terminal',
        '',
        'Welcome to my interactive portfolio terminal!',
        'Navigate using: ls, cd, pwd, cat',
        '',
        'Try: cd projects && ls && cat portfolio.tsx',
      ],
      '/contact.txt': [
        '📧 Email: hello@example.com',
        '🐙 GitHub: github.com/yourusername',
        '💼 LinkedIn: linkedin.com/in/yourusername',
        '📍 Location: Colorado, USA',
      ],
      '/projects/portfolio.tsx': [
        '// Interactive Portfolio Terminal',
        'import React from "react";',
        '',
        'export const PortfolioTerminal = () => {',
        '  return <div>Amazing terminal interface</div>;',
        '};',
      ],
      '/collections/anime.json': [
        '{ "watching": ["Jujutsu Kaisen"], "completed": ["Attack on Titan"] }',
      ],
    };

    if (!file) {
      return ['cat: missing file operand'];
    }

    let filePath = file;
    if (!file.startsWith('/')) {
      filePath = `${this.currentDirectory}/${file}`;
    }

    const content = files[filePath];
    if (!content) {
      return [`cat: ${file}: No such file or directory`];
    }

    return content;
  }

  private tourSync(): string[] {
    return [
      '🎯 PORTFOLIO TERMINAL TOUR',
      '',
      'Welcome! Let\'s explore using basic commands:',
      '',
      '1. Use "ls" to list files and directories',
      '2. Use "cd [directory]" to navigate (try: cd projects)',
      '3. Use "pwd" to see current location',
      '4. Use "cat [file]" to read files (try: cat README.md)',
      '',
      'Try this sequence:',
      '  ls',
      '  cd projects',
      '  ls',
      '  cat portfolio.tsx',
      '  cd ..',
      '  pwd',
      '',
      'Other useful commands: help, whoami, clear',
    ];
  }

  private helpSync(): string[] {
    return [
      '📚 TERMINAL COMMANDS:',
      '',
      '🔍 Navigation:',
      '  ls [dir]      - List directory contents',
      '  cd [dir]      - Change directory',
      '  pwd           - Print working directory',
      '  cat [file]    - Display file contents',
      '',
      '💼 Portfolio:',
      '  tour          - Take a guided tour',
      '  whoami        - About me',
      '  help          - Show this help',
      '  clear         - Clear terminal',
      '',
      '🎮 Fun:',
      '  ascii, matrix, cowsay, fortune',
      '',
      'Start with: ls',
    ];
  }

  private whoamiSync(): string[] {
    return [
      '👋 Software Engineer, 27 years old',
      '📍 Location: Colorado, USA',
      '💻 Languages: JavaScript, TypeScript, Python, Go',
      '🎯 Interests: Programming, Rock Climbing, Kayaking, Chess, Anime',
      '',
      'Use "ls" to explore my work!',
    ];
  }

  // Add other sync methods for remaining commands
  private skillsSync(): string[] {
    return ['Skills: JavaScript ████████████, TypeScript ████████████, React ████████████'];
  }

  private projectsSync(): string[] {
    return ['📁 Use: cd projects && ls'];
  }

  private blogSync(): string[] {
    return ['📝 Use: cd blog && ls'];
  }

  private goalsSync(): string[] {
    return ['🎯 Use: cd goals && ls'];
  }

  private adventuresSync(): string[] {
    return ['🏔️ Use: cd adventures && ls'];
  }

  private animeSync(): string[] {
    return ['🎌 Use: cd collections && cat anime.json'];
  }

  private booksSync(): string[] {
    return ['📚 Use: cd collections && cat books.json'];
  }

  private musicSync(): string[] {
    return ['🎵 Use: cd collections && cat music.json'];
  }

  private contactSync(): string[] {
    return ['📧 Use: cat contact.txt'];
  }

  private socialSync(): string[] {
    return ['🌐 GitHub, LinkedIn, Twitter - see contact.txt'];
  }

  private statsSync(): string[] {
    return ['📊 Portfolio stats: Use ls and cd to explore!'];
  }

  private searchSync(term?: string): string[] {
    return term ? [`🔍 Search "${term}": Use ls and cat to find content`] : ['Usage: search [term]'];
  }

  private themeSync(name?: string): string {
    return name ? `Theme: ${name} (use theme selector in header)` : 'Available themes: see header selector';
  }

  private asciiSync(): string[] {
    return [
      '    ██████╗  ██████╗ ██████╗ ████████╗',
      '    ██╔══██╗██╔═══██╗██╔══██╗╚══██╔══╝',
      '    ██████╔╝██║   ██║██████╔╝   ██║   ',
      '    ██╔═══╝ ██║   ██║██╔══██╗   ██║   ',
      '    ██║     ╚██████╔╝██║  ██║   ██║   ',
      '    ╚═╝      ╚═════╝ ╚═╝  ╚═╝   ╚═╝   ',
    ];
  }

  private matrixSync(): string[] {
    return [
      'Entering the Matrix...',
      '01001000 01100101 01101100 01101100 01101111',
      'Wake up, Neo... Use ls to explore.',
    ];
  }

  private cowsaySync(text: string): string[] {
    const message = text || "Welcome!";
    return [
      ` ┌─────────────┐`,
      ` │ ${message.padEnd(11)} │`,
      ` └─────────────┘`,
      '        \\   ^__^',
      '         \\  (oo)\\_______',
      '            (__)\\       )\\/\\',
    ];
  }

  private fortuneSync(): string[] {
    const quotes = [
      '"Code is poetry." - Anonymous',
      '"Adventure awaits outside your comfort zone."',
      '"The best way to learn is by doing."',
    ];
    return ['🔮 ' + quotes[Math.floor(Math.random() * quotes.length)]];
  }

  private dateSync(): string {
    return new Date().toLocaleString();
  }

  private uptimeSync(): string {
    return 'System uptime: Running smoothly!';
  }

  private async help(): Promise<string[]> {
    return [
      '📚 AVAILABLE COMMANDS:',
      '',
      '🔍 Navigation & Info:',
      '  help          - Show this help message',
      '  tour          - Take a guided tour of my portfolio',
      '  whoami        - Display information about me',
      '  pwd           - Print working directory',
      '  ls [dir]      - List directory contents',
      '  cd [dir]      - Change directory',
      '  cat [file]    - Display file contents',
      '',
      '💼 Portfolio Sections:',
      '  skills        - Display my technical skills',
      '  projects      - Show my projects and work',
      '  blog          - List blog posts and articles',
      '  goals         - Show life goals and achievements',
      '  adventures    - Display outdoor adventures',
      '',
      '📚 Collections:',
      '  anime         - Show anime watchlist',
      '  books         - Display book collection',
      '  music         - Show music collection',
      '',
      '🌐 Social & Contact:',
      '  contact       - Get contact information',
      '  social        - Show social media links',
      '',
      '🛠️ Utilities:',
      '  search [term] - Search across all content',
      '  stats         - Show portfolio statistics',
      '  theme [name]  - Change color theme',
      '  clear         - Clear terminal screen',
      '  date          - Show current date/time',
      '  uptime        - Show system uptime',
      '',
      '🎮 Fun Commands:',
      '  ascii         - Show ASCII art',
      '  matrix        - Enter the matrix...',
      '  cowsay [text] - Make a cow say something',
      '  fortune       - Get a random quote',
      '',
      '💡 Tips:',
      '  - Use ↑↓ arrows for command history',
      '  - Use Tab for auto-completion',
      '  - Use Ctrl+L to clear screen',
      '  - Type command names for quick access to sections',
    ];
  }

  private async tour(): Promise<string[]> {
    return [
      '🎯 WELCOME TO THE PORTFOLIO TOUR!',
      '',
      'Let me show you around my digital space:',
      '',
      '👨‍💻 About Me:',
      '  • Software Engineer, 27 years old',
      '  • Passionate about clean code and user experience',
      '  • Love outdoor adventures and continuous learning',
      '',
      '🚀 What You Can Explore:',
      '  1. Type "projects" to see my technical work',
      '  2. Type "blog" to read my articles and thoughts',
      '  3. Type "adventures" to see my outdoor activities',
      '  4. Type "goals" to view my life achievements',
      '  5. Type "anime" / "books" / "music" for my collections',
      '',
      '🎨 Interactive Features:',
      '  • Try "search [keyword]" to find anything',
      '  • Use "theme [name]" to change colors',
      '  • Type "matrix" for a surprise 😉',
      '',
      'Ready to explore? Pick any command above!',
    ];
  }

  private async whoami(): Promise<string[]> {
    return [
      '👋 Hey there! I\'m a passionate software engineer',
      '',
      '📊 Quick Stats:',
      '  • Age: 27',
      '  • Location: Colorado, USA',
      '  • Languages: JavaScript, TypeScript, Python, Go',
      '  • Frameworks: React, Node.js, Next.js',
      '',
      '🎯 Interests:',
      '  • Programming & Software Architecture',
      '  • Rock Climbing & Kayaking',
      '  • Chess & Strategy Games',
      '  • Anime & Reading',
      '  • Music Production',
      '',
      '🌟 Philosophy:',
      '  "Code is poetry, and every bug is a learning opportunity"',
      '',
      'Type "contact" to get in touch!',
    ];
  }

  private async ls(dir?: string): Promise<string[]> {
    const directories: Record<string, string[]> = {
      '/': ['projects/', 'blog/', 'adventures/', 'goals/', 'collections/', 'contact.txt', 'README.md'],
      '/projects': ['portfolio.tsx', 'saas-app/', 'api-gateway/', 'mobile-app/', 'contributions/'],
      '/blog': ['technical/', 'personal/', 'tutorials/', 'archived/'],
      '/collections': ['anime.json', 'books.json', 'music.json'],
      '/adventures': ['climbing/', 'kayaking/', 'hiking/', 'photos/'],
      '/goals': ['completed.json', 'in-progress.json', 'future.json', 'coins.json'],
    };

    const targetDir = dir ? (dir.startsWith('/') ? dir : `${this.currentDirectory}${dir}`) : this.currentDirectory;
    const contents = directories[targetDir];
    
    if (!contents) {
      return [`ls: ${dir || this.currentDirectory}: No such file or directory`];
    }

    return [
      `Contents of ${targetDir}:`,
      '',
      ...contents.map((item: string) => `  ${item.endsWith('/') ? '📁' : '📄'} ${item}`),
    ];
  }

  private async cd(dir?: string): Promise<string> {
    const validDirs = ['/projects', '/blog', '/adventures', '/goals', '/collections'];
    
    if (!dir || dir === '~' || dir === '/') {
      this.currentDirectory = '/';
      return 'Changed to home directory';
    }
    
    let targetDir = dir;
    if (!dir.startsWith('/')) {
      targetDir = `/${dir}`;
    }
    
    if (validDirs.includes(targetDir)) {
      this.currentDirectory = targetDir;
      return `Changed to ${targetDir}`;
    }
    
    return `cd: ${dir}: No such directory`;
  }

  private async pwd(): Promise<string> {
    return `/home/portfolio${this.currentDirectory}`;
  }

  private async cat(file?: string): Promise<string[]> {
    const files: Record<string, string[]> = {
      '/README.md': [
        '# Portfolio Terminal',
        '',
        'Welcome to my interactive portfolio terminal!',
        '',
        'This is a unique way to explore my work, interests, and projects.',
        'Built with React, TypeScript, and lots of ☕',
        '',
        '## Features',
        '- Interactive command-line interface',
        '- Real portfolio data integration',
        '- Multiple themes and customization',
        '- Search functionality',
        '- Fun easter eggs',
        '',
        '## Get Started',
        'Type `help` to see all available commands',
      ],
      '/contact.txt': [
        '📧 Email: hello@example.com',
        '🐙 GitHub: github.com/yourusername',
        '💼 LinkedIn: linkedin.com/in/yourusername',
        '🐦 Twitter: @yourusername',
        '',
        '📍 Location: Colorado, USA',
        '⏰ Timezone: Mountain Time (MT)',
        '',
        '💬 Preferred contact: Email or LinkedIn',
        '⚡ Response time: Usually within 24 hours',
      ],
      '/projects/portfolio.tsx': [
        '// This Interactive Portfolio Terminal',
        'import React from "react";',
        'import { TerminalInterface } from "./components/terminal";',
        '',
        '/**',
        ' * An interactive terminal-based portfolio',
        ' * Features:',
        ' * - 30+ terminal commands',
        ' * - File system navigation',
        ' * - Real-time theme switching',
        ' * - Portfolio data integration',
        ' * - ASCII art and easter eggs',
        ' */',
        '',
        'export const PortfolioTerminal = () => {',
        '  return (',
        '    <TerminalInterface',
        '      commands={commands}',
        '      onCommand={handleCommand}',
        '      theme="matrix"',
        '    />',
        '  );',
        '};',
      ],
      '/collections/anime.json': [
        '{',
        '  "currently_watching": [',
        '    "Jujutsu Kaisen",',
        '    "Demon Slayer"',
        '  ],',
        '  "completed": [',
        '    "Attack on Titan",',
        '    "Spirited Away"',
        '  ],',
        '  "favorites": [',
        '    "Attack on Titan",',
        '    "Spirited Away",',
        '    "Demon Slayer"',
        '  ],',
        '  "total_count": 127,',
        '  "rating_average": 4.2',
        '}',
      ],
      '/collections/books.json': [
        '{',
        '  "currently_reading": [',
        '    "Designing Data-Intensive Applications"',
        '  ],',
        '  "completed": [',
        '    "Project Hail Mary",',
        '    "Atomic Habits"',
        '  ],',
        '  "to_read": [',
        '    "The Pragmatic Programmer"',
        '  ],',
        '  "total_pages_read": 12847,',
        '  "favorite_genres": ["Sci-Fi", "Tech", "Self-Help"]',
        '}',
      ],
      '/goals/completed.json': [
        '{',
        '  "completed_goals": [',
        '    {',
        '      "title": "Read 50 Books This Year",',
        '      "completed_date": "2023-12-28",',
        '      "gold_coins": 5',
        '    },',
        '    {',
        '      "title": "Achieve 2000 Chess Rating",',
        '      "completed_date": "2024-02-15",',
        '      "gold_coins": 8',
        '    }',
        '  ],',
        '  "total_gold": 15',
        '}',
      ],
    };

    if (!file) {
      return ['cat: missing file operand'];
    }

    // Handle relative and absolute paths
    let filePath = file;
    if (!file.startsWith('/')) {
      filePath = `${this.currentDirectory}/${file}`;
    }

    const content = files[filePath];
    if (!content) {
      return [`cat: ${file}: No such file or directory`];
    }

    return content;
  }

  private async projects(): Promise<string[]> {
    return [
      '🚀 MY PROJECTS & WORK',
      '',
      '💼 Professional Projects:',
      '  • SaaS Application - Full-stack React/Node.js app',
      '  • API Gateway - Microservices architecture',
      '  • Mobile App - React Native cross-platform',
      '  • Data Pipeline - Python ETL processes',
      '',
      '🛠️ Open Source Contributions:',
      '  • React component library',
      '  • TypeScript utilities package',
      '  • Documentation improvements',
      '',
      '🎨 Personal Projects:',
      '  • This interactive portfolio terminal',
      '  • Adventure tracking app',
      '  • Chess analysis tool',
      '',
      'Visit /portfolio page in GUI mode for detailed view!',
    ];
  }

  private async blog(): Promise<string[]> {
    const posts = getPublicPosts();
    const recentPosts = posts.slice(0, 5);

    return [
      '📝 RECENT BLOG POSTS',
      '',
      ...recentPosts.map(post => `  • ${post.title}`),
      '',
      `Total posts: ${posts.length}`,
      'Visit /writing page for full articles!',
    ];
  }

  private async goals(): Promise<string[]> {
    const completed = lifeGoals.filter(g => g.completed);
    const pending = lifeGoals.filter(g => !g.completed);

    return [
      '🎯 LIFE GOALS & ACHIEVEMENTS',
      '',
      '✅ Completed Goals:',
      ...completed.map(goal => `  • ${goal.title} (${goal.coinReward} gold coins)`),
      '',
      '🎯 In Progress:',
      ...pending.slice(0, 3).map(goal => `  • ${goal.title}`),
      '',
      `Total progress: ${completed.length}/${lifeGoals.length} goals completed`,
      `Gold coins earned: ${completed.reduce((sum, g) => sum + g.coinReward, 0)}`,
    ];
  }

  private async adventures(): Promise<string[]> {
    const recent = adventures.slice(0, 5);

    return [
      '🏔️ RECENT ADVENTURES',
      '',
      ...recent.map(adv => `  • ${adv.title} (${adv.date})`),
      '',
      `Total adventures logged: ${adventures.length}`,
      'Visit /adventures page for full stories!',
    ];
  }

  private async anime(): Promise<string[]> {
    const watching = animeList.filter(a => a.status === 'watching');
    const completed = animeList.filter(a => a.status === 'completed');
    const favorites = animeList.filter(a => a.favorite);

    return [
      '🎌 ANIME COLLECTION',
      '',
      '👀 Currently Watching:',
      ...watching.map(anime => `  • ${anime.title} (${anime.watchedEpisodes}/${anime.episodes})`),
      '',
      '⭐ Favorites:',
      ...favorites.slice(0, 3).map(anime => `  • ${anime.title} (${anime.rating}/5)`),
      '',
      `Total: ${animeList.length} | Completed: ${completed.length} | Watching: ${watching.length}`,
    ];
  }

  private async books(): Promise<string[]> {
    const reading = booksList.filter(b => b.status === 'reading');
    const completed = booksList.filter(b => b.status === 'completed');
    const favorites = booksList.filter(b => b.favorite);

    return [
      '📚 BOOK COLLECTION',
      '',
      '📖 Currently Reading:',
      ...reading.map(book => `  • ${book.title} by ${book.author}`),
      '',
      '⭐ Favorites:',
      ...favorites.map(book => `  • ${book.title} by ${book.author} (${book.rating}/5)`),
      '',
      `Total: ${booksList.length} | Completed: ${completed.length} | Reading: ${reading.length}`,
    ];
  }

  private async music(): Promise<string[]> {
    const favorites = musicCollection.filter(m => m.favorite);

    return [
      '🎵 MUSIC COLLECTION',
      '',
      '⭐ Favorite Albums:',
      ...favorites.map(album => `  • ${album.title} by ${album.artist} (${album.releaseYear})`),
      '',
      `Total albums: ${musicCollection.length}`,
      'Genres: Electronic, Rock, Jazz, Classical, Indie',
    ];
  }

  private async contact(): Promise<string[]> {
    return [
      '📬 GET IN TOUCH',
      '',
      '📧 Email: hello@example.com',
      '🐙 GitHub: github.com/yourusername',
      '💼 LinkedIn: linkedin.com/in/yourusername',
      '🐦 Twitter: @yourusername',
      '',
      '📍 Location: Colorado, USA',
      '⏰ Timezone: Mountain Time (MT)',
      '',
      '💬 I love connecting with fellow developers,',
      '   outdoor enthusiasts, and curious minds!',
      '',
      'Visit /contact page for a contact form!',
    ];
  }

  private async social(): Promise<string[]> {
    return [
      '🌐 FIND ME ONLINE',
      '',
      '💻 Professional:',
      '  • GitHub: github.com/yourusername',
      '  • LinkedIn: linkedin.com/in/yourusername',
      '  • Stack Overflow: stackoverflow.com/users/yourid',
      '',
      '📱 Social:',
      '  • Twitter: @yourusername',
      '  • Instagram: @yourusername (adventure photos)',
      '  • Medium: @yourusername (technical writing)',
      '',
      '🎮 Gaming:',
      '  • Chess.com: yourusername',
      '  • Steam: yourusername',
      '',
      'Always happy to connect and chat!',
    ];
  }

  private async search(term?: string): Promise<string[]> {
    if (!term) {
      return ['Usage: search [term]', 'Example: search "react"'];
    }

    const results: string[] = ['🔍 SEARCH RESULTS', ''];
    const searchTerm = term.toLowerCase();

    // Search in projects (simplified)
    if (searchTerm.includes('react') || searchTerm.includes('javascript')) {
      results.push('📁 Projects:');
      results.push('  • Portfolio Terminal - React/TypeScript');
      results.push('  • SaaS Application - React/Node.js');
      results.push('');
    }

    // Search in blog posts
    const posts = getPublicPosts();
    const matchingPosts = posts.filter(post => 
      post.title.toLowerCase().includes(searchTerm) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchTerm))
    );

    if (matchingPosts.length > 0) {
      results.push('📝 Blog Posts:');
      matchingPosts.slice(0, 3).forEach(post => {
        results.push(`  • ${post.title}`);
      });
      results.push('');
    }

    if (results.length === 2) {
      results.push(`No results found for "${term}"`);
      results.push('Try: "react", "climbing", "anime", "chess"');
    }

    return results;
  }

  private async stats(): Promise<string[]> {
    const posts = getPublicPosts();
    const completedGoals = lifeGoals.filter(g => g.completed);

    return [
      '📊 PORTFOLIO STATISTICS',
      '',
      '📝 Content:',
      `  • Blog posts: ${posts.length}`,
      `  • Adventures: ${adventures.length}`,
      `  • Goals completed: ${completedGoals.length}/${lifeGoals.length}`,
      '',
      '📚 Collections:',
      `  • Anime: ${animeList.length}`,
      `  • Books: ${booksList.length}`,
      `  • Music albums: ${musicCollection.length}`,
      '',
      '🏆 Achievements:',
      `  • Gold coins earned: ${completedGoals.reduce((sum, g) => sum + g.coinReward, 0)}`,
      `  • Terminal commands: ${this.commands.size}`,
      '',
      '⚡ Built with React, TypeScript, and passion!',
    ];
  }

  private async echo(...args: string[]): Promise<string> {
    return args.join(' ');
  }

  private async clear(): Promise<string> {
    // This will be handled by the terminal interface
    return 'CLEAR_TERMINAL';
  }

  private async date(): Promise<string> {
    return new Date().toLocaleString();
  }

  private async uptime(): Promise<string> {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 1);
    const diff = now.getTime() - start.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    return `System uptime: ${days} days (since portfolio launch)`;
  }

  private async skills(): Promise<string[]> {
    return [
      '💻 TECHNICAL SKILLS',
      '',
      '🚀 Languages:',
      '  • JavaScript/TypeScript ████████████ Expert',
      '  • Python              ██████████   Advanced',
      '  • Go                  ████████     Intermediate',
      '  • Rust                ████         Learning',
      '',
      '⚡ Frontend:',
      '  • React/Next.js       ████████████ Expert',
      '  • Vue.js              ████████     Intermediate',
      '  • Tailwind CSS        ████████████ Expert',
      '',
      '🛠️ Backend:',
      '  • Node.js/Express     ████████████ Expert',
      '  • PostgreSQL/MongoDB  ██████████   Advanced',
      '  • Docker/Kubernetes   ████████     Intermediate',
      '',
      '☁️ Cloud & DevOps:',
      '  • AWS/GCP             ████████     Intermediate',
      '  • CI/CD Pipelines     ██████████   Advanced',
      '  • Terraform          ████████     Intermediate',
    ];
  }

  private async theme(themeName?: string): Promise<string> {
    if (!themeName) {
      return 'Available themes: light, dark, terminal, vscode, midnight, solarized, abyss, github, dracula, monokai';
    }
    return `Theme changed to: ${themeName} (Note: Use theme selector in header for actual change)`;
  }

  private async ascii(): Promise<string[]> {
    return [
      '    ╭─────────────────────────────────────╮',
      '    │  ██████╗  ██████╗ ██████╗ ████████╗ │',
      '    │  ██╔══██╗██╔═══██╗██╔══██╗╚══██╔══╝ │',
      '    │  ██████╔╝██║   ██║██████╔╝   ██║    │',
      '    │  ██╔═══╝ ██║   ██║██╔══██╗   ██║    │',
      '    │  ██║     ╚██████╔╝██║  ██║   ██║    │',
      '    │  ╚═╝      ╚═════╝ ╚═╝  ╚═╝   ╚═╝    │',
      '    │                                     │',
      '    │        FOLIO Terminal v2.0          │',
      '    ╰─────────────────────────────────────╯',
      '',
      '     Built with 💻 and lots of ☕',
    ];
  }

  private async matrix(): Promise<string[]> {
    return [
      '█▀▄▀█ ▄▀█ ▀█▀ █▀█ █ ▀▄▀',
      '█ ▀ █ █▀█  █  █▀▄ █ █ █',
      '',
      'Entering the Matrix...',
      '01001000 01100101 01101100 01101100 01101111',
      '01010111 01101111 01110010 01101100 01100100',
      '',
      'The Matrix has you...',
      'Follow the white rabbit 🐰',
      '',
      'Wake up, Neo... The portfolio has you.',
      'Type "help" to see how deep the rabbit hole goes.',
    ];
  }

  private async cowsay(text?: string): Promise<string[]> {
    const message = text || "Welcome to my portfolio!";
    const messageLength = message.length;
    const border = '─'.repeat(messageLength + 2);
    
    return [
      ` ┌${border}┐`,
      ` │ ${message} │`,
      ` └${border}┘`,
      '        \\   ^__^',
      '         \\  (oo)\\_______',
      '            (__)\\       )\\/\\',
      '                ||----w |',
      '                ||     ||',
    ];
  }

  private async fortune(): Promise<string[]> {
    const quotes = [
      '"Code is poetry written in logic." - Anonymous',
      '"The best error message is the one that never shows up." - Thomas Fuchs',
      '"Simplicity is the ultimate sophistication." - Leonardo da Vinci',
      '"First, solve the problem. Then, write the code." - John Johnson',
      '"The only way to learn a new programming language is by writing programs in it." - Dennis Ritchie',
      '"Adventure awaits outside your comfort zone." - Portfolio Wisdom',
      '"Every climb starts with a single hold." - Climbing Philosophy',
      '"In the river of life, adaptability is your paddle." - Kayaking Wisdom',
    ];
    
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    return ['🔮 Fortune Cookie:', '', randomQuote];
  }
}
