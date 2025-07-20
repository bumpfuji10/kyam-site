import { getArticle, getArticles } from '@/lib/microcms';
import { format } from 'date-fns';
import { ja } from 'date-fns/locale';
import { Calendar, Clock, ArrowLeft } from 'lucide-react';
import { calculateReadingTime } from '@/lib/microcms';
import Sidebar from '@/components/Sidebar';
import ArticleContent from '@/components/ArticleContent';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface ArticlePageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { id } = await params;
  try {
    const article = await getArticle(id);
    const readingTime = calculateReadingTime(article.content);
    const publishedDate = format(new Date(article.publishedAt), 'yyyy年M月d日', { locale: ja });
    
    const recentArticlesData = await getArticles({ limit: 5, orders: '-publishedAt' });
    const recentArticles = recentArticlesData.contents
      .filter(a => a.id !== article.id)
      .slice(0, 5)
      .map(a => ({
        id: a.id,
        title: a.title
      }));

    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <main className="lg:col-span-2">
            <div className="mb-6">
              <Link 
                href="/articles"
                className="inline-flex items-center text-blue-600 hover:text-blue-700 transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-1" />
                記事一覧に戻る
              </Link>
            </div>
            
            <article className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              {article.image && (
                <div className="aspect-video overflow-hidden">
                  <img
                    src={article.image.url}
                    alt={article.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              
              <div className="p-8">
                <div className="flex items-center text-gray-500 text-sm mb-4 space-x-4">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    <time dateTime={article.publishedAt}>{publishedDate}</time>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>{readingTime}分で読める</span>
                  </div>
                </div>
                
                <h1 className="text-3xl font-bold text-gray-900 mb-8 leading-tight">
                  {article.title}
                </h1>
                
                <ArticleContent content={article.content} />
              </div>
            </article>
            
            <div className="mt-8 text-center">
              <Link
                href="/articles"
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                他の記事も読む
              </Link>
            </div>
          </main>
          
          <aside className="lg:col-span-1">
            <Sidebar recentArticles={recentArticles} />
          </aside>
        </div>
      </div>
    );
  } catch {
    notFound();
  }
}

export async function generateMetadata({ params }: ArticlePageProps) {
  const { id } = await params;
  try {
    const article = await getArticle(id);
    const description = article.content.replace(/<[^>]*>/g, '').substring(0, 120) + '...';
    
    return {
      title: `${article.title} - Kyam Blog`,
      description,
      openGraph: {
        title: article.title,
        description,
        images: article.image ? [article.image.url] : undefined,
        type: 'article',
        publishedTime: article.publishedAt,
        modifiedTime: article.updatedAt,
      },
      twitter: {
        card: 'summary_large_image',
        title: article.title,
        description,
        images: article.image ? [article.image.url] : undefined,
      },
    };
  } catch {
    return {
      title: '記事が見つかりません - Kyam Blog',
      description: 'お探しの記事が見つかりませんでした。',
    };
  }
}

export async function generateStaticParams() {
  try {
    const articles = await getArticles({ limit: 100 });
    return articles.contents.map((article) => ({
      id: article.id,
    }));
  } catch (error) {
    console.error('Failed to generate static params:', error);
    return [];
  }
}