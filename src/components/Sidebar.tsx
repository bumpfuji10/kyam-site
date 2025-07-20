import { Search, ArrowRight } from 'lucide-react';
import ProfileCard from './ProfileCard';

interface SidebarProps {
  recentArticles?: Array<{
    id: string;
    title: string;
  }>;
}

export default function Sidebar({ recentArticles = [] }: SidebarProps) {
  const categories = [
    { name: 'Web開発', count: 12 },
    { name: '個人開発', count: 8 },
    { name: 'TypeScript', count: 6 },
    { name: 'React', count: 10 },
    { name: 'Next.js', count: 7 },
  ];

  return (
    <aside className="space-y-6">
      <ProfileCard />
      
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">記事を検索</h3>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="記事を検索..."
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>
      
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">カテゴリー</h3>
        <ul className="space-y-2">
          {categories.map((category) => (
            <li key={category.name}>
              <button className="flex items-center justify-between w-full text-left text-gray-600 hover:text-blue-600 transition-colors">
                <span>{category.name}</span>
                <span className="text-gray-400 text-sm">({category.count})</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
      
      {recentArticles.length > 0 && (
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">最新記事</h3>
          <ul className="space-y-3">
            {recentArticles.map((article) => (
              <li key={article.id}>
                <a
                  href={`/articles/${article.id}`}
                  className="flex items-center text-gray-600 hover:text-blue-600 transition-colors group"
                >
                  <ArrowRight className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform" />
                  <span className="text-sm line-clamp-2">{article.title}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </aside>
  );
}