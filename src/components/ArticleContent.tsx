'use client';

import { useEffect, useState } from 'react';
import LinkCard, { LinkCardSkeleton } from './LinkCard';
import CodeBlock from './CodeBlock';
import { LinkCardData } from '@/types/blog';
import { extractLinksFromContent, isValidUrl } from '@/lib/ogp';

interface ArticleContentProps {
  content: string;
}

interface LinkCardState {
  [url: string]: {
    data: LinkCardData | null;
    loading: boolean;
    error: boolean;
  };
}

export default function ArticleContent({ content }: ArticleContentProps) {
  const [linkCards, setLinkCards] = useState<LinkCardState>({});

  useEffect(() => {
    const extractedLinks = extractLinksFromContent(content);
    const validLinks = extractedLinks.filter(isValidUrl);

    if (validLinks.length === 0) {
      return;
    }

    // 初期状態を設定
    const initialState: LinkCardState = {};
    validLinks.forEach(url => {
      initialState[url] = {
        data: null,
        loading: true,
        error: false
      };
    });
    setLinkCards(initialState);

    // OGPデータを取得
    validLinks.forEach(async (url) => {
      try {
        const response = await fetch('/api/ogp', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ url }),
        });

        if (!response.ok) {
          throw new Error('Failed to fetch OGP data');
        }

        const ogpData = await response.json();

        setLinkCards(prev => ({
          ...prev,
          [url]: {
            data: ogpData,
            loading: false,
            error: false
          }
        }));
      } catch (error) {
        console.error('Error fetching OGP data for', url, error);
        setLinkCards(prev => ({
          ...prev,
          [url]: {
            data: {
              url,
              title: 'リンク先を確認できませんでした',
              description: 'リンク先の情報を取得できませんでした。'
            },
            loading: false,
            error: true
          }
        }));
      }
    });

  }, [content]);

  const processCodeBlocks = (htmlContent: string) => {
    // コードブロックを検出するための正規表現
    const codeBlockRegex = /<pre><code(?:\s+class="language-(\w+)")?[^>]*>([\s\S]*?)<\/code><\/pre>/gi;
    
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = codeBlockRegex.exec(htmlContent)) !== null) {
      // コードブロック前のコンテンツを追加
      if (match.index > lastIndex) {
        const beforeContent = htmlContent.substring(lastIndex, match.index);
        if (beforeContent.trim()) {
          parts.push(
            <div
              key={`content-${lastIndex}`}
              className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-p:leading-relaxed prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:bg-blue-50 prose-blockquote:pl-4"
              dangerouslySetInnerHTML={{ __html: beforeContent }}
            />
          );
        }
      }

      // コードブロックを CodeBlock コンポーネントに変換
      const language = match[1] || 'text';
      let codeContent = match[2];

      // HTMLエンティティをデコード
      codeContent = codeContent
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&amp;/g, '&')
        .replace(/&quot;/g, '"')
        .replace(/&#039;/g, "'")
        .replace(/&#x27;/g, "'")
        .replace(/&apos;/g, "'");

      // 改行文字を正規化（\n を実際の改行に変換）
      codeContent = codeContent.replace(/\\n/g, '\n');

      // JavaScript文字列結合形式（' + の部分）を除去
      codeContent = codeContent.replace(/'\s*\+\s*'/g, '');
      codeContent = codeContent.replace(/"\s*\+\s*"/g, '');

      // 余分な空行のみを除去し、インデントは保持
      const lines = codeContent.split('\n');
      
      // 先頭と末尾の空行を除去
      let startIndex = 0;
      let endIndex = lines.length - 1;
      
      while (startIndex < lines.length && lines[startIndex].trim() === '') {
        startIndex++;
      }
      
      while (endIndex >= 0 && lines[endIndex].trim() === '') {
        endIndex--;
      }
      
      if (startIndex <= endIndex) {
        const trimmedLines = lines.slice(startIndex, endIndex + 1);
        
        // 最小インデントを計算（空行以外で）
        const nonEmptyLines = trimmedLines.filter(line => line.trim() !== '');
        if (nonEmptyLines.length > 0) {
          const minIndent = Math.min(...nonEmptyLines.map(line => {
            const match = line.match(/^(\s*)/);
            return match ? match[1].length : 0;
          }));
          
          // 最小インデントを除去して相対的なインデントを保持
          codeContent = trimmedLines
            .map(line => line.trim() === '' ? '' : line.substring(minIndent))
            .join('\n');
        } else {
          codeContent = trimmedLines.join('\n');
        }
      } else {
        codeContent = '';
      }

      parts.push(
        <div key={`code-${match.index}`} className="my-6">
          <CodeBlock
            code={codeContent.trim()}
            language={language}
            showLineNumbers={true}
          />
        </div>
      );

      lastIndex = match.index + match[0].length;
    }

    // 残りのコンテンツを追加
    if (lastIndex < htmlContent.length) {
      const remainingContent = htmlContent.substring(lastIndex);
      if (remainingContent.trim()) {
        parts.push(
          <div
            key={`content-${lastIndex}`}
            className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-p:leading-relaxed prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:bg-blue-50 prose-blockquote:pl-4"
            dangerouslySetInnerHTML={{ __html: remainingContent }}
          />
        );
      }
    }

    return parts.length > 0 ? parts : [
      <div
        key="full-content"
        className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-p:leading-relaxed prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:bg-blue-50 prose-blockquote:pl-4"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
    ];
  };

  const renderContentWithLinkCards = () => {
    const extractedLinks = extractLinksFromContent(content);
    const validLinks = extractedLinks.filter(isValidUrl);
    
    if (validLinks.length === 0) {
      // リンクカードがない場合は、コードブロック処理だけ実行
      return <>{processCodeBlocks(content)}</>;
    }

    const parts = [];
    let remainingContent = content;
    
    validLinks.forEach((url, index) => {
      const linkRegex = new RegExp(`(<a[^>]*href=["']${url.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}["'][^>]*>.*?</a>)`, 'gi');
      const match = linkRegex.exec(remainingContent);
      
      if (match) {
        const beforeLink = remainingContent.substring(0, match.index);
        if (beforeLink.trim()) {
          // リンク前のコンテンツもコードブロック処理を通す
          parts.push(...processCodeBlocks(beforeLink));
        }

        // リンクカードを表示
        const linkState = linkCards[url];
        if (linkState?.loading) {
          parts.push(<LinkCardSkeleton key={`card-${index}`} className="my-4" />);
        } else if (linkState?.data) {
          parts.push(<LinkCard key={`card-${index}`} data={linkState.data} className="my-4" />);
        }

        remainingContent = remainingContent.substring(match.index! + match[0].length);
      }
    });

    // 残りのコンテンツもコードブロック処理を通す
    if (remainingContent.trim()) {
      parts.push(...processCodeBlocks(remainingContent));
    }

    return <>{parts}</>;
  };

  return <>{renderContentWithLinkCards()}</>;
}