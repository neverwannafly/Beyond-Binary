import React from 'react';

interface TerminalOutputProps {
  content: string;
  type: 'command' | 'output' | 'error' | 'system';
}

export const TerminalOutput: React.FC<TerminalOutputProps> = ({ content }) => {
  // Handle special commands
  if (content === 'CLEAR_TERMINAL') {
    return null;
  }

  // Format content based on type
  const getFormattedContent = () => {
    // Handle progress bars in skills
    if (content.includes('████')) {
      const parts = content.split('█');
      const label = parts[0];
      const filled = parts.length - 1;
      const total = 12; // Max progress bar length
      const progressBar = '█'.repeat(filled) + '░'.repeat(Math.max(0, total - filled));
      
      return (
        <span>
          {label}
          <span className="text-cyan-400">{progressBar}</span>
          {content.split('█').pop()}
        </span>
      );
    }

    // Handle ASCII art and special formatting
    if (content.includes('╭') || content.includes('╰') || content.includes('║')) {
      return <span className="text-yellow-400">{content}</span>;
    }

    // Handle bullet points
    if (content.includes('•')) {
      const [prefix, ...rest] = content.split('•');
      return (
        <span>
          {prefix}
          <span className="text-cyan-400">•</span>
          {rest.join('•')}
        </span>
      );
    }

    // Handle file/directory icons
    if (content.includes('📁') || content.includes('📄')) {
      return <span>{content}</span>;
    }

    // Handle emojis and special characters
    if (content.match(/[🎯🚀💼🛠️🎨📝✅🏔️🎌📚🎵📬🌐💻📊⚡☁️🔍]/)) {
      return <span>{content}</span>;
    }

    return content;
  };

  const baseClasses = "whitespace-pre-wrap font-mono";
  
  return (
    <div className={baseClasses}>
      {getFormattedContent()}
    </div>
  );
};
