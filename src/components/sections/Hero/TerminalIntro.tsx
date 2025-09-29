import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cursorBlink } from '@/lib/animations';
import { useTerminal } from '@/contexts/TerminalContext';
import { useTheme } from '@/contexts/ThemeContext';

const terminalLines = [
  { text: '$ whoami', delay: 0 },
  { text: 'software_engineer_27', delay: 1000 },
  { text: '$ cat interests.txt', delay: 2000 },
  { text: 'Programming ✓', delay: 3000 },
  { text: 'Chess ♟️', delay: 3500 },
  { text: 'Anime 🎌', delay: 4000 },
  { text: 'Rock Climbing 🧗', delay: 4500 },
  { text: 'Kayaking 🚣', delay: 5000 },
  { text: 'Reading 📚', delay: 5500 },
  { text: '$ ls current_projects/', delay: 6500 },
  { text: 'portfolio.tsx', delay: 7000 },
  { text: 'bucket_list.json', delay: 7200 },
  { text: 'blog_posts/', delay: 7400 },
  { text: 'adventure_logs/', delay: 7600 },
  { text: '$ echo "Welcome to my digital space"', delay: 8500 },
  { text: 'Welcome to my digital space', delay: 9000 },
];

export const TerminalIntro = () => {
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [currentLine, setCurrentLine] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const { enableTerminalMode } = useTerminal();
  const { theme } = useTheme();

  useEffect(() => {
    const timeouts: ReturnType<typeof setTimeout>[] = [];

    terminalLines.forEach((line, index) => {
      const timeout = setTimeout(() => {
        setVisibleLines(index + 1);
        
        // Type out the current line
        if (index < terminalLines.length) {
          typeText(line.text, () => {
            if (index === terminalLines.length - 1) {
              setShowCursor(false);
            }
          });
        }
      }, line.delay);
      
      timeouts.push(timeout);
    });

    return () => {
      timeouts.forEach(clearTimeout);
    };
  }, []);

  const typeText = (text: string, onComplete?: () => void) => {
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i <= text.length) {
        setCurrentLine(text.slice(0, i));
        i++;
      } else {
        clearInterval(typingInterval);
        onComplete?.();
      }
    }, 50);
  };

  // Get maximize button color based on theme
  const getMaximizeButtonColor = () => {
    switch (theme.name) {
      case 'Terminal':
        return 'bg-green-500 hover:bg-green-400';
      case 'VS Code Dark':
        return 'bg-blue-500 hover:bg-blue-400';
      case 'Dracula':
        return 'bg-purple-500 hover:bg-purple-400';
      case 'Monokai':
        return 'bg-orange-500 hover:bg-orange-400';
      case 'Abyss':
        return 'bg-cyan-500 hover:bg-cyan-400';
      case 'GitHub Dark':
        return 'bg-blue-500 hover:bg-blue-400';
      case 'Solarized Dark':
        return 'bg-blue-500 hover:bg-blue-400';
      case 'Light':
        return 'bg-green-500 hover:bg-green-400';
      default:
        return 'bg-green-500 hover:bg-green-400';
    }
  };

  return (
    <div className="bg-background border border-border rounded-lg p-6 font-mono text-sm max-w-2xl w-full shadow-2xl">
      {/* Terminal Header */}
      <div className="flex items-center mb-4 pb-2 border-b border-border">
        <div className="flex space-x-2">
          <button 
            className="w-3 h-3 bg-red-500 rounded-full hover:bg-red-400 transition-colors cursor-pointer"
            title="Close"
          />
          <button 
            className="w-3 h-3 bg-yellow-500 rounded-full hover:bg-yellow-400 transition-colors cursor-pointer"
            title="Minimize"
          />
          <motion.button 
            className={`w-3 h-3 ${getMaximizeButtonColor()} rounded-full transition-colors cursor-pointer`}
            title="Maximize - Enter Terminal Mode"
            onClick={enableTerminalMode}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          />
        </div>
        <div className="flex-1 text-center text-muted-foreground">
          terminal — portfolio@local
        </div>
      </div>

      {/* Terminal Content */}
      <div className="space-y-1 min-h-[400px]">
        {terminalLines.slice(0, visibleLines).map((line, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.1 }}
            className={`${
              line.text.startsWith('$') 
                ? 'text-primary' 
                : line.text.includes('✓') || line.text.includes('🎌') || line.text.includes('🧗') || line.text.includes('🚣') || line.text.includes('📚')
                  ? 'text-green-400 ml-4'
                  : line.text.endsWith('.tsx') || line.text.endsWith('.json') || line.text.endsWith('/')
                    ? 'text-blue-400 ml-4'
                    : 'text-foreground ml-4'
            }`}
          >
            {index === visibleLines - 1 ? (
              <div className="flex">
                <span>{currentLine}</span>
                {showCursor && (
                  <motion.span
                    variants={cursorBlink}
                    animate="animate"
                    className="text-primary ml-1"
                  >
                    █
                  </motion.span>
                )}
              </div>
            ) : (
              line.text
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};
