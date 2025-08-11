import { getArticles } from '@/lib/microcms';
import BlogPost from '@/components/BlogPost';
import Sidebar from '@/components/Sidebar';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function Home() {
  try {
    const articlesData = await getArticles({ limit: 6, orders: '-publishedAt' });
    const recentArticles = articlesData.contents.slice(0, 5).map(article => ({
      id: article.id,
      title: article.title
    }));

    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <main className="lg:col-span-2">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">最新の記事</h1>
              <p className="text-gray-600">個人開発とWeb技術について書いています</p>
            </div>
            
            <div className="space-y-6">
              {articlesData.contents.map((article) => (
                <BlogPost key={article.id} article={article} />
              ))}
            </div>
            
            {articlesData.totalCount > 6 && (
              <div className="mt-8 text-center">
                <Link
                  href="/articles"
                  className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  すべての記事を見る
                </Link>
              </div>
            )}
          </main>
          
          <aside className="lg:col-span-1">
            <Sidebar recentArticles={recentArticles} />
          </aside>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Failed to fetch articles:', error);
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <main className="lg:col-span-2">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">最新の記事</h1>
              <p className="text-gray-600">個人開発とWeb技術について書いています</p>
            </div>
            
            <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
              <p className="text-gray-500">記事の読み込みに失敗しました。しばらく時間をおいてから再度お試しください。</p>
            </div>
          </main>
          
          <aside className="lg:col-span-1">
            <Sidebar />
          </aside>
        </div>
      </div>
    );
  }
}
