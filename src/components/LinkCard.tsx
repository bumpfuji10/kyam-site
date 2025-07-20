import { ExternalLink } from 'lucide-react';
import { LinkCardData } from '@/types/blog';

interface LinkCardProps {
  data: LinkCardData;
  className?: string;
}

export default function LinkCard({ data, className = '' }: LinkCardProps) {
  const handleClick = () => {
    window.open(data.url, '_blank', 'noopener,noreferrer');
  };

  const getDomain = (url: string) => {
    try {
      return new URL(url).hostname;
    } catch {
      return url;
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow cursor-pointer bg-white ${className}`}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      }}
    >
      <div className="flex h-32">
        {data.image && (
          <div className="w-32 flex-shrink-0">
            <img
              src={data.image}
              alt={data.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>
        )}
        
        <div className="flex-1 p-4 flex flex-col justify-between min-w-0">
          <div>
            <h3 className="font-semibold text-gray-900 text-sm line-clamp-2 mb-1">
              {data.title}
            </h3>
            {data.description && (
              <p className="text-gray-600 text-xs line-clamp-2 mb-2">
                {data.description}
              </p>
            )}
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center text-gray-500 text-xs">
              <span className="truncate">
                {data.siteName || getDomain(data.url)}
              </span>
            </div>
            <ExternalLink className="w-4 h-4 text-gray-400 flex-shrink-0" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function LinkCardSkeleton({ className = '' }: { className?: string }) {
  return (
    <div className={`border border-gray-200 rounded-lg overflow-hidden bg-white ${className}`}>
      <div className="flex h-32">
        <div className="w-32 flex-shrink-0 bg-gray-200 animate-pulse" />
        <div className="flex-1 p-4 flex flex-col justify-between">
          <div>
            <div className="h-4 bg-gray-200 rounded animate-pulse mb-2" />
            <div className="h-3 bg-gray-200 rounded animate-pulse mb-1" />
            <div className="h-3 bg-gray-200 rounded animate-pulse w-3/4" />
          </div>
          <div className="flex items-center justify-between">
            <div className="h-3 bg-gray-200 rounded animate-pulse w-20" />
            <div className="w-4 h-4 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}