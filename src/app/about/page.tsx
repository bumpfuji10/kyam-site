import { Mail, Github, Twitter, MapPin, Calendar } from 'lucide-react';
import Image from 'next/image';

export default function AboutPage() {
  const skills = [
    { category: 'JobSkills', items: ['Ruby', 'Ruby on Rails', 'JavaScript', 'Vue.js', 'SaSS', 'SQL(MySQL)', 'Docker'] },
    { category: 'ExperiencedSkills', items: ['PHP', 'Laravel', 'GraphQL', 'TypeScript'] }
  ];

  const experiences = [
    {
      company: '事業会社',
      position: 'Webエンジニア',
      period: '2025年7月 - 現在',
      description: 'メインとなるプロダクトの開発に従事。',
    },
    {
      company: '事業会社',
      position: 'Webエンジニア',
      period: '2023年2月 - 2025年6月',
      description: 'オンラインコミュニティプラットフォームの機能開発に従事。社内ツールの改善や、問い合わせ対応なども行う。',
    },
    {
      company: '事業会社',
      position: 'サーバーサイドエンジニア',
      period: '2022年7月 - 2022年12月',
      description: 'レンタルスペースのマッチングプラットフォームの開発に従事。'
    },
    {
      company: '専門商社',
      position: 'セールス',
      period: '2019年4月 - 2022年6月',
      description: '防犯カメラをメインとしたセキュリティ関連商材を、分譲マンションの管理組合や賃貸物件オーナーに提案・販売。',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">プロフィール</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg border border-gray-200 p-6 sticky top-8">
            <div className="text-center mb-6">
              <Image
                src="/me.png"
                alt="Logo"
                width={100}
                height={100}
                className="rounded-full mx-auto mb-4 flex items-center justify-center"
              />
              <h2 className="text-2xl font-bold text-gray-900 mb-1">Yo Kamada</h2>
              <p className="text-gray-600 mb-4">ソフトウェアエンジニア</p>
            </div>
            
            <div className="space-y-3 text-sm">
              <div className="flex items-center text-gray-600">
                <MapPin className="w-4 h-4 mr-2" />
                <span>Yokohama, Japan</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Calendar className="w-4 h-4 mr-2" />
                <span>エンジニア歴 3年</span>
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
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Kyamについて</h3>
            <div className="prose prose-lg max-w-none text-gray-700">
              <p className="mb-4">
                Yo Kamadaです。都内のSaaSでソフトウェアエンジニアとして働いています。普段は自宅からリモートで稼働しています。
              </p>
              <p className="mb-4">
                このブログは技術的な学びやらtipsやらその他のサムシングなものを書いていくブログです。技術っぽい話が多め、それ以外の話は1割くらいです。
              </p>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">これまで</h3>
            <div className="prose prose-lg max-w-none text-gray-700">
              <p className="mb-4">
                （簡単な経歴については下部にある経歴を参照してください）
              </p>
              <p className="mb-4">
                2022年からエンジニアのお仕事をスタート。少しだけPHPやLaravelやGraphQLを触って実装したりテストを書いたりしました。
              </p>
              <p className="mb-4">
                その後2023年2月から都内でオンラインコミュニティのプラットフォームを作る会社にエンジニアとして入社し、開発業務にあたっておりました。
              </p>
              <p className="mb-4">
                2025年の7月から、都内にあるスタートアップでエンジニアとして(横浜の自宅から)稼働しています。
              </p>
              <p className='mb-4'>
                夢は海の見える街でワンコと散歩することです。
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