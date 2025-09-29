import React, { createContext, useContext, useState, type ReactNode } from 'react';

interface TerminalContextType {
  isTerminalMode: boolean;
  enableTerminalMode: () => void;
  disableTerminalMode: () => void;
  toggleTerminalMode: () => void;
}

const TerminalContext = createContext<TerminalContextType | undefined>(undefined);

export const useTerminal = () => {
  const context = useContext(TerminalContext);
  if (context === undefined) {
    throw new Error('useTerminal must be used within a TerminalProvider');
  }
  return context;
};

interface TerminalProviderProps {
  children: ReactNode;
}

export const TerminalProvider: React.FC<TerminalProviderProps> = ({ children }) => {
  const [isTerminalMode, setIsTerminalMode] = useState(false);

  const enableTerminalMode = () => {
    setIsTerminalMode(true);
    // Add terminal mode to document class for global styling
    document.documentElement.classList.add('terminal-mode');
  };

  const disableTerminalMode = () => {
    setIsTerminalMode(false);
    document.documentElement.classList.remove('terminal-mode');
  };

  const toggleTerminalMode = () => {
    if (isTerminalMode) {
      disableTerminalMode();
    } else {
      enableTerminalMode();
    }
  };

  const value = {
    isTerminalMode,
    enableTerminalMode,
    disableTerminalMode,
    toggleTerminalMode,
  };

  return (
    <TerminalContext.Provider value={value}>
      {children}
    </TerminalContext.Provider>
  );
};
