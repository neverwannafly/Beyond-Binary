import MDEditor from '@uiw/react-md-editor';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface MDRendererProps {
  content: string;
  className?: string;
}

export const MDRenderer = ({ content, className = '' }: MDRendererProps) => {
  return (
    <div className={`prose prose-lg dark:prose-invert max-w-none ${className}`}>
      <MDEditor.Markdown 
        source={content}
        components={{
          code: ({ children, className }) => {
            const match = /language-(\w+)/.exec(className || '');
            const language = match ? match[1] : '';
            
            if (language) {
              return (
                <SyntaxHighlighter
                  style={oneDark}
                  language={language}
                  customStyle={{
                    margin: '1rem 0',
                    borderRadius: '0.5rem',
                    fontSize: '0.875rem',
                  }}
                >
                  {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
              );
            }
            
            return (
              <code className="bg-secondary px-1.5 py-0.5 rounded text-sm font-mono">
                {children}
              </code>
            );
          },
        }}
        style={{
          backgroundColor: 'transparent',
          color: 'inherit',
        }}
      />
    </div>
  );
};
