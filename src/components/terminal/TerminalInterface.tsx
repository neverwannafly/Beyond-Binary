import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTerminal } from '@/contexts/TerminalContext';
import { useTheme } from '@/contexts/ThemeContext';
import { TerminalCommands } from './TerminalCommands';
import { TerminalOutput } from './TerminalOutput';
import { DevModeOverlay } from './DevModeOverlay';
import { ThemeSelector } from '@/components/ThemeSelector';
import { X } from 'lucide-react';

interface TerminalLine {
  id: string;
  type: 'command' | 'output' | 'error' | 'system';
  content: string;
  timestamp: Date;
}

export const TerminalInterface: React.FC = () => {
  const { isTerminalMode, disableTerminalMode } = useTerminal();
  const { theme } = useTheme();

  // Disable body scroll when terminal is open
  React.useEffect(() => {
    if (isTerminalMode) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isTerminalMode]);
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [currentInput, setCurrentInput] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isInitialized, setIsInitialized] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  const commands = new TerminalCommands();

  useEffect(() => {
    if (isTerminalMode && !isInitialized) {
      setShowOverlay(true);
      setIsInitialized(true);
    }
  }, [isTerminalMode, isInitialized]);

  useEffect(() => {
    // Auto-focus input when in terminal mode
    if (isTerminalMode && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isTerminalMode]);

  useEffect(() => {
    // Auto-scroll to bottom when new lines are added
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [lines]);

  const initializeTerminal = () => {
    const welcomeLines: TerminalLine[] = [
      {
        id: '1',
        type: 'system',
        content: '╔══════════════════════════════════════════════════════════════╗',
        timestamp: new Date(),
      },
      {
        id: '2',
        type: 'system',
        content: '║                    🚀 DEV MODE UNLOCKED 🚀                   ║',
        timestamp: new Date(),
      },
      {
        id: '3',
        type: 'system',
        content: '║              Welcome to Terminal Portfolio v2.0             ║',
        timestamp: new Date(),
      },
      {
        id: '4',
        type: 'system',
        content: '╚══════════════════════════════════════════════════════════════╝',
        timestamp: new Date(),
      },
      {
        id: '5',
        type: 'output',
        content: '',
        timestamp: new Date(),
      },
      {
        id: '6',
        type: 'output',
        content: 'System initialized successfully! 🎉',
        timestamp: new Date(),
      },
      {
        id: '7',
        type: 'output',
        content: 'Type "help" to see available commands.',
        timestamp: new Date(),
      },
      {
        id: '8',
        type: 'output',
        content: 'Type "tour" for a guided tour of my portfolio.',
        timestamp: new Date(),
      },
      {
        id: '9',
        type: 'output',
        content: '',
        timestamp: new Date(),
      },
    ];
    setLines(welcomeLines);
  };

  const handleOverlayContinue = () => {
    setShowOverlay(false);
    initializeTerminal();
  };

  const addLine = (content: string, type: TerminalLine['type'] = 'output') => {
    const newLine: TerminalLine = {
      id: Date.now().toString(),
      type,
      content,
      timestamp: new Date(),
    };
    setLines(prev => [...prev, newLine]);
  };

  const handleCommand = async (command: string) => {
    // Add command to history
    if (command.trim()) {
      setCommandHistory(prev => [...prev, command]);
      setHistoryIndex(-1);
    }

    // Add command line to output
    addLine(`$ ${command}`, 'command');

    // Execute command instantly
    try {
      const result = commands.execute(command.trim());
      if (result === 'CLEAR_TERMINAL') {
        setLines([]);
      } else if (Array.isArray(result)) {
        result.forEach(line => addLine(line, 'output'));
      } else if (result) {
        addLine(result, 'output');
      }
    } catch (error) {
      addLine(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`, 'error');
    }

    setCurrentInput('');
  };

  const handleTabCompletion = () => {
    const trimmedInput = currentInput.trim();
    const parts = trimmedInput.split(' ');
    const currentWord = parts[parts.length - 1];
    
    // Get completions from terminal commands
    const completions = commands.getCompletions(trimmedInput, currentWord);
    
    if (completions.length === 1) {
      // Single completion - auto-complete
      const completion = completions[0];
      const newInput = parts.slice(0, -1).concat([completion]).join(' ');
      setCurrentInput(newInput + ' ');
    } else if (completions.length > 1) {
      // Multiple completions - show options
      addLine(`$ ${trimmedInput}`, 'command');
      addLine('Available completions:', 'system');
      completions.forEach(completion => {
        addLine(`  ${completion}`, 'output');
      });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case 'Enter':
        e.preventDefault();
        handleCommand(currentInput);
        break;
      case 'ArrowUp':
        e.preventDefault();
        if (commandHistory.length > 0) {
          const newIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
          setHistoryIndex(newIndex);
          setCurrentInput(commandHistory[newIndex]);
        }
        break;
      case 'ArrowDown':
        e.preventDefault();
        if (historyIndex >= 0) {
          const newIndex = historyIndex + 1;
          if (newIndex >= commandHistory.length) {
            setHistoryIndex(-1);
            setCurrentInput('');
          } else {
            setHistoryIndex(newIndex);
            setCurrentInput(commandHistory[newIndex]);
          }
        }
        break;
      case 'Tab':
        e.preventDefault();
        handleTabCompletion();
        break;
      case 'l':
        if (e.ctrlKey) {
          e.preventDefault();
          setLines([]);
        }
        break;
    }
  };

  if (!isTerminalMode) return null;

  // Get theme-based colors
  const getThemeColors = () => {
    const baseColors = {
      error: 'text-red-400',
    };
    
    // Theme-specific colors based on CSS variables
    switch (theme.name) {
      case 'Light':
        return {
          ...baseColors,
          background: 'bg-white',
          text: 'text-gray-800',
          accent: 'text-blue-600',
          system: 'text-purple-600',
          border: 'border-gray-300',
          overlay: 'bg-white/95',
          scrollbar: 'scrollbar-thumb-gray-400',
          buttonBg: 'bg-gray-100/50',
        };
      case 'VS Code Dark':
        return {
          ...baseColors,
          background: 'bg-[#1e1e1e]',
          text: 'text-[#d4d4d4]',
          accent: 'text-[#569cd6]',
          system: 'text-[#dcdcaa]',
          border: 'border-[#3e3e42]',
          overlay: 'bg-[#1e1e1e]/95',
          scrollbar: 'scrollbar-thumb-[#424242]',
          buttonBg: 'bg-[#2d2d30]/50',
        };
      case 'Terminal':
        return {
          ...baseColors,
          background: 'bg-black',
          text: 'text-green-400',
          accent: 'text-green-300',
          system: 'text-yellow-400',
          border: 'border-green-500/30',
          overlay: 'bg-black/95',
          scrollbar: 'scrollbar-thumb-green-500',
          buttonBg: 'bg-green-900/20',
        };
      case 'Midnight Dark':
        return {
          ...baseColors,
          background: 'bg-[#0f0f23]',
          text: 'text-[#cccccc]',
          accent: 'text-[#00cccc]',
          system: 'text-[#ffff66]',
          border: 'border-[#333366]',
          overlay: 'bg-[#0f0f23]/95',
          scrollbar: 'scrollbar-thumb-[#333366]',
          buttonBg: 'bg-[#1a1a3e]/50',
        };
      case 'Solarized Dark':
        return {
          ...baseColors,
          background: 'bg-[#002b36]',
          text: 'text-[#839496]',
          accent: 'text-[#268bd2]',
          system: 'text-[#b58900]',
          border: 'border-[#073642]',
          overlay: 'bg-[#002b36]/95',
          scrollbar: 'scrollbar-thumb-[#073642]',
          buttonBg: 'bg-[#073642]/50',
        };
      case 'Abyss':
        return {
          ...baseColors,
          background: 'bg-[#000c18]',
          text: 'text-[#6688cc]',
          accent: 'text-[#22ccdd]',
          system: 'text-[#ffeebb]',
          border: 'border-[#223344]',
          overlay: 'bg-[#000c18]/95',
          scrollbar: 'scrollbar-thumb-[#223344]',
          buttonBg: 'bg-[#001122]/50',
        };
      case 'GitHub Dark':
        return {
          ...baseColors,
          background: 'bg-[#0d1117]',
          text: 'text-[#c9d1d9]',
          accent: 'text-[#58a6ff]',
          system: 'text-[#f2cc60]',
          border: 'border-[#30363d]',
          overlay: 'bg-[#0d1117]/95',
          scrollbar: 'scrollbar-thumb-[#484f58]',
          buttonBg: 'bg-[#21262d]/50',
        };
      case 'Dracula':
        return {
          ...baseColors,
          background: 'bg-[#282a36]',
          text: 'text-[#f8f8f2]',
          accent: 'text-[#bd93f9]',
          system: 'text-[#f1fa8c]',
          border: 'border-[#44475a]',
          overlay: 'bg-[#282a36]/95',
          scrollbar: 'scrollbar-thumb-[#44475a]',
          buttonBg: 'bg-[#44475a]/50',
        };
      case 'Monokai':
        return {
          ...baseColors,
          background: 'bg-[#272822]',
          text: 'text-[#f8f8f2]',
          accent: 'text-[#a6e22e]',
          system: 'text-[#e6db74]',
          border: 'border-[#49483e]',
          overlay: 'bg-[#272822]/95',
          scrollbar: 'scrollbar-thumb-[#49483e]',
          buttonBg: 'bg-[#49483e]/50',
        };
      default: // Dark theme
        return {
          ...baseColors,
          background: 'bg-black',
          text: 'text-white',
          accent: 'text-cyan-400',
          system: 'text-yellow-400',
          border: 'border-gray-700',
          overlay: 'bg-black/95',
          scrollbar: 'scrollbar-thumb-gray-600',
          buttonBg: 'bg-gray-800/50',
        };
    }
  };

  const themeColors = getThemeColors();

  return (
    <>
      <DevModeOverlay isVisible={showOverlay} onContinue={handleOverlayContinue} />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
          className={`fixed inset-0 z-50 ${themeColors.overlay} backdrop-blur-sm overscroll-none`}
      >
      <div className="h-full flex flex-col">
        {/* Terminal Header */}
        <div className={`flex items-center justify-between p-4 border-b ${themeColors.border}`}>
          <div className="flex items-center space-x-4">
            <div className="flex space-x-2">
              <button
                onClick={disableTerminalMode}
                className="w-3 h-3 bg-red-500 rounded-full hover:bg-red-400 transition-colors"
                title="Close Terminal"
              />
              <button
                onClick={disableTerminalMode}
                className="w-3 h-3 bg-yellow-500 rounded-full hover:bg-yellow-400 transition-colors"
                title="Minimize"
              />
              <div className={`w-3 h-3 ${themeColors.accent.replace('text-', 'bg-')} rounded-full opacity-50`} />
            </div>
            <span className={`${themeColors.accent} font-mono text-sm`}>
              terminal@portfolio:{commands.getCurrentDirectory()}$
            </span>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className={`${themeColors.text} text-sm font-mono`}>
              Theme:
            </div>
            <ThemeSelector compact />
            <button
              onClick={disableTerminalMode}
              className={`${themeColors.accent} hover:opacity-80 transition-colors`}
              title="Exit Terminal Mode"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Terminal Content */}
        <div 
          ref={terminalRef}
          className={`flex-1 p-4 font-mono text-sm ${themeColors.text} overflow-y-auto overscroll-contain scrollbar-thin scrollbar-track-gray-900 ${themeColors.scrollbar}`}
          style={{ height: 'calc(100vh - 10rem)' }}
        >
          <div className="space-y-1">
            <AnimatePresence>
              {lines.map((line) => (
                <motion.div
                  key={line.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.1 }}
                  className={`${
                    line.type === 'command' 
                      ? themeColors.accent 
                      : line.type === 'error'
                      ? themeColors.error
                      : line.type === 'system'
                      ? themeColors.system
                      : themeColors.text
                  }`}
                >
                  <TerminalOutput content={line.content} type={line.type} />
                </motion.div>
              ))}
            </AnimatePresence>
            
            {/* Input Line */}
            <div className={`flex items-center space-x-2 ${themeColors.accent}`}>
              <span>$</span>
              <input
                ref={inputRef}
                type="text"
                value={currentInput}
                onChange={(e) => setCurrentInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className={`flex-1 bg-transparent border-none outline-none ${themeColors.text} font-mono`}
                placeholder="Type a command..."
                autoFocus
              />
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className={themeColors.text}
              >
                █
              </motion.span>
            </div>
          </div>
        </div>

        {/* Status Bar */}
        <div className={`border-t ${themeColors.border} p-2 ${themeColors.buttonBg}`}>
          <div className={`flex items-center justify-between text-xs ${themeColors.text}`}>
            <div className="flex space-x-4">
              <span>ESC: Exit</span>
              <span>↑↓: History</span>
              <span>Ctrl+L: Clear</span>
              <span>Tab: Complete</span>
            </div>
            <div>
              Lines: {lines.length} | Commands: {commandHistory.length}
            </div>
          </div>
        </div>
      </div>
      </motion.div>
    </>
  );
};
