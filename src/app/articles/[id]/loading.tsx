export default function Loading() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <main className="lg:col-span-2">
          {/* 戻るボタン部分のスケルトン */}
          <div className="mb-6">
            <div className="inline-flex items-center">
              <div className="w-4 h-4 bg-gray-200 rounded mr-1 animate-pulse"></div>
              <div className="w-24 h-4 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
          
          <article className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            {/* 画像部分のスケルトン */}
            <div className="aspect-video bg-gray-200 animate-pulse"></div>
            
            <div className="p-8">
              {/* メタ情報部分のスケルトン */}
              <div className="flex items-center text-gray-500 text-sm mb-4 space-x-4">
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-gray-200 rounded mr-1 animate-pulse"></div>
                  <div className="w-20 h-4 bg-gray-200 rounded animate-pulse"></div>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-gray-200 rounded mr-1 animate-pulse"></div>
                  <div className="w-16 h-4 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>
              
              {/* タイトル部分のスケルトン */}
              <div className="mb-8">
                <div className="w-full h-8 bg-gray-200 rounded mb-2 animate-pulse"></div>
                <div className="w-3/4 h-8 bg-gray-200 rounded animate-pulse"></div>
              </div>
              
              {/* コンテンツ部分のスケルトン */}
              <div className="space-y-4">
                <div className="w-full h-4 bg-gray-200 rounded animate-pulse"></div>
                <div className="w-full h-4 bg-gray-200 rounded animate-pulse"></div>
                <div className="w-5/6 h-4 bg-gray-200 rounded animate-pulse"></div>
                <div className="w-full h-4 bg-gray-200 rounded animate-pulse"></div>
                <div className="w-4/5 h-4 bg-gray-200 rounded animate-pulse"></div>
                
                <div className="py-4">
                  <div className="w-full h-32 bg-gray-200 rounded animate-pulse"></div>
                </div>
                
                <div className="w-full h-4 bg-gray-200 rounded animate-pulse"></div>
                <div className="w-full h-4 bg-gray-200 rounded animate-pulse"></div>
                <div className="w-3/4 h-4 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
          </article>
          
          {/* ボタン部分のスケルトン */}
          <div className="mt-8 text-center">
            <div className="inline-flex items-center px-6 py-3 bg-gray-200 rounded-lg animate-pulse">
              <div className="w-24 h-4 bg-gray-300 rounded"></div>
            </div>
          </div>
        </main>
        
        <aside className="lg:col-span-1">
          {/* サイドバー部分のスケルトン */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="w-32 h-6 bg-gray-200 rounded mb-4 animate-pulse"></div>
            <div className="space-y-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="w-full h-4 bg-gray-200 rounded animate-pulse"></div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}