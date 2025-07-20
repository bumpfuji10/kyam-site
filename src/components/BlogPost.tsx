import Link from 'next/link';
import { Calendar, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { ja } from 'date-fns/locale';
import { Article } from '@/types/blog';
import { calculateReadingTime, extractExcerpt } from '@/lib/microcms';

interface BlogPostProps {
  article: Article;
  showExcerpt?: boolean;
}

export default function BlogPost({ article, showExcerpt = true }: BlogPostProps) {
  const readingTime = calculateReadingTime(article.content);
  const excerpt = extractExcerpt(article.content);
  const publishedDate = format(new Date(article.publishedAt), 'yyyy年M月d日', { locale: ja });

  return (
    <article className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
      {article.image && (
        <div className="aspect-video overflow-hidden">
          <img
            src={article.image.url}
            alt={article.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      
      <div className="p-6">
        <div className="flex items-center text-gray-500 text-sm mb-3 space-x-4">
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-1" />
            <time dateTime={article.publishedAt}>{publishedDate}</time>
          </div>
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            <span>{readingTime}分で読める</span>
          </div>
        </div>
        
        <h2 className="text-xl font-semibold text-gray-900 mb-3 hover:text-blue-600 transition-colors">
          <Link href={`/articles/${article.id}`}>
            {article.title}
          </Link>
        </h2>
        
        {showExcerpt && (
          <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
            {excerpt}
          </p>
        )}
        
        <div className="flex items-center justify-between">
          <Link
            href={`/articles/${article.id}`}
            className="text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors"
          >
            続きを読む →
          </Link>
        </div>
      </div>
    </article>
  );
}