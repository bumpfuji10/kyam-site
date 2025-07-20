import { getArticles } from '@/lib/microcms';
import BlogPost from '@/components/BlogPost';
import Sidebar from '@/components/Sidebar';
import Link from 'next/link';

interface SearchParams {
  page?: string;
  q?: string;
}

interface ArticlesPageProps {
  searchParams: Promise<SearchParams>;
}

export default async function ArticlesPage({ searchParams }: ArticlesPageProps) {
  const { page: pageParam, q: query } = await searchParams;
  const page = Number(pageParam) || 1;
  const limit = 9;
  const offset = (page - 1) * limit;

  try {
    const articlesData = await getArticles({ 
      limit, 
      offset, 
      orders: '-publishedAt',
      q: query 
    });
    
    const recentArticlesData = await getArticles({ limit: 5, orders: '-publishedAt' });
    const recentArticles = recentArticlesData.contents.map(article => ({
      id: article.id,
      title: article.title
    }));

    const totalPages = Math.ceil(articlesData.totalCount / limit);
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;

    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <main className="lg:col-span-2">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {query ? `「${query}」の検索結果` : '記事一覧'}
              </h1>
              <p className="text-gray-600">
                {query 
                  ? `${articlesData.totalCount}件の記事が見つかりました`
                  : `全${articlesData.totalCount}件の記事`
                }
              </p>
            </div>
            
            {articlesData.contents.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {articlesData.contents.map((article) => (
                    <BlogPost key={article.id} article={article} />
                  ))}
                </div>
                
                {totalPages > 1 && (
                  <div className="mt-12 flex justify-center">
                    <nav className="flex items-center space-x-2">
                      {hasPrevPage && (
                        <a
                          href={`/articles?page=${page - 1}${query ? `&q=${query}` : ''}`}
                          className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          前のページ
                        </a>
                      )}
                      
                      <div className="flex items-center space-x-1">
                        {Array.from({ length: totalPages }, (_, i) => i + 1)
                          .filter(pageNum => 
                            pageNum === 1 || 
                            pageNum === totalPages || 
                            Math.abs(pageNum - page) <= 2
                          )
                          .map((pageNum, index, array) => (
                            <div key={pageNum} className="flex items-center">
                              {index > 0 && array[index - 1] !== pageNum - 1 && (
                                <span className="px-2 text-gray-400">...</span>
                              )}
                              <a
                                href={`/articles?page=${pageNum}${query ? `&q=${query}` : ''}`}
                                className={`px-4 py-2 rounded-lg transition-colors ${
                                  pageNum === page
                                    ? 'bg-blue-600 text-white'
                                    : 'text-gray-600 hover:bg-gray-100'
                                }`}
                              >
                                {pageNum}
                              </a>
                            </div>
                          ))
                        }
                      </div>
                      
                      {hasNextPage && (
                        <a
                          href={`/articles?page=${page + 1}${query ? `&q=${query}` : ''}`}
                          className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          次のページ
                        </a>
                      )}
                    </nav>
                  </div>
                )}
              </>
            ) : (
              <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
                <p className="text-gray-500">
                  {query ? '検索条件に一致する記事が見つかりませんでした。' : '記事がまだありません。'}
                </p>
                {query && (
                  <Link
                    href="/articles"
                    className="inline-block mt-4 text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    すべての記事を見る
                  </Link>
                )}
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
              <h1 className="text-3xl font-bold text-gray-900 mb-2">記事一覧</h1>
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

export async function generateMetadata({ searchParams }: ArticlesPageProps) {
  const { q: query } = await searchParams;
  
  return {
    title: query ? `「${query}」の検索結果 - Kyam Blog` : '記事一覧 - Kyam Blog',
    description: query 
      ? `「${query}」に関連する記事の検索結果です。`
      : 'Web開発とソフトウェア設計に関する技術記事の一覧です。',
  };
}