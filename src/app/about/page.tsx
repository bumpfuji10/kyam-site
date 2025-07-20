import { Mail, Github, Twitter, MapPin, Calendar } from 'lucide-react';

export default function AboutPage() {
  const skills = [
    { category: 'フロントエンド', items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Vue.js'] },
    { category: 'バックエンド', items: ['Node.js', 'Python', 'PostgreSQL', 'MongoDB', 'Redis'] },
    { category: 'インフラ・ツール', items: ['Docker', 'AWS', 'Vercel', 'Git', 'GitHub Actions'] },
    { category: 'その他', items: ['Figma', 'Sketch', 'Adobe XD', 'Photoshop', 'Illustrator'] },
  ];

  const experiences = [
    {
      company: 'テックスタートアップ株式会社',
      position: 'フロントエンドエンジニア',
      period: '2022年4月 - 現在',
      description: 'SaaSプロダクトのフロントエンド開発をリード。React/TypeScriptを使用したWebアプリケーションの設計・開発を担当。',
    },
    {
      company: 'フリーランス',
      position: 'Webデベロッパー',
      period: '2020年6月 - 2022年3月',
      description: '中小企業向けのWebサイト制作とWebアプリケーション開発。WordPress、React、Vue.jsを活用した案件を多数手がける。',
    },
    {
      company: 'システム開発会社',
      position: 'ジュニアエンジニア',
      period: '2019年4月 - 2020年5月',
      description: 'エンタープライズ向けWebシステムの開発・保守業務。Java、SpringBootを使用したバックエンド開発に従事。',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">プロフィール</h1>
        <p className="text-xl text-gray-600">Web開発とソフトウェア設計に情熱を注ぐエンジニアです</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg border border-gray-200 p-6 sticky top-8">
            <div className="text-center mb-6">
              <div className="w-32 h-32 bg-gray-300 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-gray-500">Photo</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-1">Yo Kamada</h2>
              <p className="text-gray-600 mb-4">ソフトウェアエンジニア</p>
            </div>
            
            <div className="space-y-3 text-sm">
              <div className="flex items-center text-gray-600">
                <MapPin className="w-4 h-4 mr-2" />
                <span>東京, 日本</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Calendar className="w-4 h-4 mr-2" />
                <span>エンジニア歴 5年</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Mail className="w-4 h-4 mr-2" />
                <a href="mailto:contact@example.com" className="text-blue-600 hover:text-blue-700">
                  contact@example.com
                </a>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex space-x-4 justify-center">
                <a 
                  href="https://github.com/bumpfuji10" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                  title="GitHub"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a 
                  href="https://x.com/bumpfuji10" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                  title="X (Twitter)"
                >
                  <Twitter className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-8">
          <section className="bg-white rounded-lg border border-gray-200 p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">自己紹介</h3>
            <div className="prose prose-lg max-w-none text-gray-700">
              <p className="mb-4">
                こんにちは！Yo Kamadaです。Web開発とソフトウェア設計に情熱を注ぐソフトウェアエンジニアです。
                新しい技術を学び、実践することが大好きで、常にユーザーにとって価値のあるプロダクトを作ることを心がけています。
              </p>
              <p className="mb-4">
                フロントエンドを中心としながらも、バックエンドからインフラまで幅広い技術領域に興味を持ち、
                チーム全体でより良いプロダクトを作り上げることを大切にしています。
              </p>
              <p>
                このブログでは、日々の技術的な学びや個人開発プロジェクトについて発信しています。
                読者の皆様の学習や開発に少しでもお役に立てれば幸いです。
              </p>
            </div>
          </section>

          <section className="bg-white rounded-lg border border-gray-200 p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">スキルセット</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {skills.map((skillGroup) => (
                <div key={skillGroup.category}>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">{skillGroup.category}</h4>
                  <div className="flex flex-wrap gap-2">
                    {skillGroup.items.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-white rounded-lg border border-gray-200 p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">経歴</h3>
            <div className="space-y-6">
              {experiences.map((exp, index) => (
                <div key={index} className="border-l-4 border-blue-500 pl-6">
                  <div className="mb-2">
                    <h4 className="text-lg font-semibold text-gray-900">{exp.position}</h4>
                    <p className="text-blue-600 font-medium">{exp.company}</p>
                    <p className="text-sm text-gray-500">{exp.period}</p>
                  </div>
                  <p className="text-gray-700">{exp.description}</p>
                </div>
              ))}
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}

export async function generateMetadata() {
  return {
    title: 'プロフィール - Kyam Blog',
    description: 'Web開発とソフトウェア設計に情熱を注ぐエンジニア Yo Kamada のプロフィールページです。スキルセット、経歴、お問い合わせ方法をご紹介しています。',
  };
}