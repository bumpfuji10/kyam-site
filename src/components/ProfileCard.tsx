import { Github, Twitter } from 'lucide-react';
import Image from 'next/image';

export default function ProfileCard() {
  return (
    <div className="bg-white rounded-lg p-6 border border-gray-200">
      <div className="flex flex-col items-center">
        <Image
          src="/me.png"
          alt="Logo"
          width={100}
          height={100}
          className="rounded-full mx-auto mb-4 flex items-center justify-center"
        />
        <h3 className="text-xl font-semibold text-gray-900 mb-1">Yo Kamada</h3>
        <p className="text-gray-600 mb-4">ソフトウェアエンジニア</p>
        <p className="text-gray-600 text-sm text-center leading-relaxed mb-4">
          都内のスタートアップに(横浜の自宅から)稼働しているエンジニアです。技術的なことやその他つぶやき的なことを書いていきます。※このブログはClaude Codeさんに土下座して作ってもらいました。
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