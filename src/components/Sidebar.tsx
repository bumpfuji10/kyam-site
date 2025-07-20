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
    </aside>
  );
}