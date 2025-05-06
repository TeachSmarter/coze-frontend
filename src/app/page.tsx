'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function WelcomePage() {
  const router = useRouter();

  const handleStart = () => {
    router.push('/chat');
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-white">
      <div className="text-center space-y-8 px-4">
        <div className="relative w-32 h-32 mx-auto mb-8">
          <Image
            src="/logo.png"
            alt="深圳中学 Logo"
            fill
            className="object-contain"
            priority
          />
        </div>
        
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          深圳中学智能AI助手
        </h1>
        
        <p className="text-lg text-gray-600 mb-8">
          欢迎使用深圳中学智能AI助手，您的学习好伙伴
        </p>

        <button
          onClick={handleStart}
          className="px-8 py-4 bg-blue-600 text-white text-xl rounded-full hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl transform hover:scale-105 duration-200"
        >
          开始AI之旅
        </button>
      </div>
    </main>
  );
}
