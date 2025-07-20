import { Github, Twitter } from 'lucide-react';

export default function ProfileCard() {
  return (
    <div className="bg-white rounded-lg p-6 border border-gray-200">
      <div className="flex flex-col items-center">
        <div className="w-20 h-20 bg-gray-300 rounded-full mb-4 flex items-center justify-center">
          <span className="text-gray-500 text-sm">Photo</span>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-1">Yo Kamada</h3>
        <p className="text-gray-600 mb-4">ソフトウェアエンジニア</p>
        <p className="text-gray-600 text-sm text-center leading-relaxed mb-4">
          Web開発とソフトウェア設計に情熱を注ぐエンジニアです。
          新しい技術を学び、実践することが大好きです。
          このブログでは技術的な学びや個人開発について書いています。
        </p>
        
        <div className="flex space-x-3 mt-2">
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
  );
}