'use client';

import { useEffect, useRef, useState } from 'react';
import Script from 'next/script';

const fakeTopics = [
  '数学作业讲解',
  '英语作文修改建议',
  '物理实验报告格式',
  '历史考试复习要点',
  '生物知识点总结',
  '化学方程式平衡',
  '地理地图阅读技巧',
  '语文古诗文赏析',
  '英语单词记忆方法',
  '数学难题求助',
  '期中考试安排',
  '课外阅读推荐',
  '班级活动策划',
  '作业提交截止时间',
  '学习计划制定',
  '课堂笔记整理'
];

export default function ChatPage() {
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isScriptLoaded && window.CozeWebSDK && chatContainerRef.current) {
      try {
        // Remove any previous chat widget
        if (!process.env.BOT_ID || !process.env.BOT_SECRET) {
          throw new Error('BOT_ID or BOT_SECRET is not defined');
        }
        const client = new window.CozeWebSDK.WebChatClient({
          config: {
            bot_id: process.env.BOT_ID as string,
          },
          isIframe: false,
          auth: {
            type: 'token',
            token: process.env.BOT_SECRET as string,
            onRefreshToken: async () => process.env.BOT_SECRET as string,
          },
          userInfo: {
            id: 'user',
            url: 'https://i.miji.bid/2025/05/07/51b9d8f3cb5c7f3b20e9881825d36438.png',
            nickname: '深中小助手',
          },
          ui: {
            base: {
              icon: 'https://i.miji.bid/2025/05/07/51b9d8f3cb5c7f3b20e9881825d36438.png',
              layout: 'pc',
              lang: 'zh-CN',
              zIndex: 1000,
            },
            chatBot: {
              title: '深圳中学智能AI助手',
              uploadable: false,
              width: Math.min(window.innerWidth - 400, 1200), // 400px for sidebar, max width 1200px
            },
            header: {
              isNeedClose: false,
            },
            asstBtn: {
              isNeed: false,
            },
            footer: {
              isShow: true,
              expressionText: 'Powered by {{name}}',
              linkvars: {
                name: {
                  text: '深圳中学',
                  link: 'https://www.shenzhong.net'
                },
              }
            }
          },
        });
        // The SDK does not expose a container option, so we just call showChatBot()
        client.showChatBot();
      } catch (error) {
        console.error('Failed to initialize Coze chat:', error);
      }
    }
  }, [isScriptLoaded]);

  return (
    <main className="min-h-screen flex bg-[#181A20]">
      {/* Sidebar */}
      <aside className="w-80 bg-[#23262F] text-white flex flex-col border-r border-[#23262F] h-screen">
        <div className="flex items-center gap-2 px-6 py-4 border-b border-[#23262F]">
          <span className="text-lg font-semibold">深圳中学智能AI助手</span>
        </div>
        <button className="flex items-center gap-2 px-6 py-2 mt-2 mb-2 text-[#FF8133] hover:bg-[#26282F] rounded">
          <span className="text-xl">＋</span>
          <span className="font-medium">新建对话</span>
        </button>
        <div className="px-6 py-2 text-[#A1A7B3] text-sm font-semibold">聊天记录</div>
        <div className="flex-1 overflow-y-auto">
          <ul className="px-2">
            {fakeTopics.map((topic, idx) => (
              <li
                key={idx}
                className="px-4 py-2 my-1 rounded cursor-pointer hover:bg-[#26282F] text-[#E3E5E8] truncate"
                title={topic}
              >
                {topic}
              </li>
            ))}
          </ul>
        </div>
      </aside>
      {/* Chat Widget Area */}
      <div className="flex-1 relative flex items-center justify-center overflow-auto">
        <div ref={chatContainerRef} className="w-full h-full" />
        <Script
          src="https://lf-cdn.coze.cn/obj/unpkg/flow-platform/chat-app-sdk/1.2.0-beta.8/libs/cn/index.js"
          strategy="afterInteractive"
          onLoad={() => setIsScriptLoaded(true)}
          onError={(e) => {
            console.error('加载 Coze SDK 失败:', e);
          }}
        />
      </div>
    </main>
  );
} 