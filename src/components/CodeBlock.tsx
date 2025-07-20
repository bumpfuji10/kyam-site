'use client';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Copy, Check } from 'lucide-react';
import { useState } from 'react';

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
  showLineNumbers?: boolean;
}

export default function CodeBlock({ 
  code, 
  language = 'javascript', 
  filename,
  showLineNumbers = true 
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  return (
    <div className="relative group rounded-lg overflow-hidden bg-gray-900 border border-gray-700">
      {filename && (
        <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
          <span className="text-gray-300 text-sm font-mono">{filename}</span>
          <div className="flex items-center space-x-2">
            <div className="flex space-x-1">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
          </div>
        </div>
      )}
      
      <div className="relative">
        <button
          onClick={handleCopy}
          className="absolute top-3 right-3 p-2 bg-gray-800 hover:bg-gray-700 rounded-md transition-colors opacity-0 group-hover:opacity-100 z-10"
          title="コードをコピー"
        >
          {copied ? (
            <Check className="w-4 h-4 text-green-400" />
          ) : (
            <Copy className="w-4 h-4 text-gray-300" />
          )}
        </button>
        
        <SyntaxHighlighter
          language={language}
          style={oneDark}
          showLineNumbers={showLineNumbers}
          customStyle={{
            margin: 0,
            padding: '1rem',
            background: 'transparent',
            fontSize: '14px',
            lineHeight: '1.6',
            fontFamily: 'var(--font-geist-mono), ui-monospace, SFMono-Regular, "SF Mono", Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
            tabSize: 2,
            whiteSpace: 'pre',
          }}
          lineNumberStyle={{
            color: '#6B7280',
            backgroundColor: 'transparent',
            paddingLeft: '0.5rem',
            paddingRight: '1rem',
            marginRight: '1rem',
            borderRight: '1px solid #374151',
            textAlign: 'right',
            userSelect: 'none',
          }}
          wrapLines={false}
          wrapLongLines={false}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}

interface InlineCodeProps {
  children: string;
}

export function InlineCode({ children }: InlineCodeProps) {
  return (
    <code className="bg-gray-100 text-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">
      {children}
    </code>
  );
}