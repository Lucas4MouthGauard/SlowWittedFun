'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import WalletConnect from './components/WalletConnect';
import TypingEffect from './components/TypingEffect';

export default function Home() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-terminal-dark text-terminal-green relative overflow-hidden">
      {/* CRT扫描线效果 */}
      <div className="absolute inset-0 crt pointer-events-none"></div>
      
      {/* 顶部导航栏 */}
      <nav className="relative z-10 flex justify-between items-center p-4 border-b border-terminal-green">
        <div className="flex items-center space-x-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="text-2xl font-terminal font-bold glitch"
            data-text="SLOW_WITTED"
          >
            SLOW_WITTED
          </motion.div>
          
          <div className="flex space-x-6">
            <Link href="/" className="hover:text-terminal-light-green transition-colors">
              HOME
            </Link>
            <Link href="/launchpad" className="hover:text-terminal-light-green transition-colors">
              LAUNCHPAD
            </Link>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="text-sm font-mono">
            {currentTime.toLocaleTimeString()}
          </div>
          <WalletConnect />
        </div>
      </nav>

      {/* 主要内容 */}
      <main className="relative z-10 container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* 标题区域 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-center mb-16"
          >
            <h1 className="text-6xl font-terminal font-bold mb-6 glitch" data-text="SLOW_WITTED">
              SLOW_WITTED
            </h1>
            <div className="text-xl text-terminal-light-green">
              <TypingEffect 
                text="INTENTIONAL LIMITATIONS FOR BETTER FOCUS"
                speed={100}
              />
            </div>
          </motion.div>

          {/* 主要内容区域 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
            className="space-y-8"
          >
            <div className="bg-terminal-gray p-8 border border-terminal-green rounded-lg">
              <h2 className="text-3xl font-terminal font-bold mb-6 text-center">
                MANIFESTO
              </h2>
              
              <div className="space-y-6 text-lg leading-relaxed">
                <TypingEffect 
                  text="现在所有的LaunchPad都太聪明了，我们需要刻意的降低自己，慢一点。"
                  speed={50}
                  className="block"
                />
                
                <TypingEffect 
                  text="大家的注意力会更佳集中。所以我们每小时限制仅可以有10个MemeCoins发射。"
                  speed={50}
                  className="block"
                  delay={3000}
                />
                
                <TypingEffect 
                  text="在快节奏的世界里，我们选择慢下来。在信息过载的时代，我们选择专注。"
                  speed={50}
                  className="block"
                  delay={6000}
                />
                
                <TypingEffect 
                  text="SLOW_WITTED - 因为有时候，慢一点就是快一点。"
                  speed={50}
                  className="block font-bold text-terminal-light-green"
                  delay={9000}
                />
              </div>
            </div>

            {/* 统计信息 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-terminal-gray p-6 border border-terminal-green rounded-lg text-center">
                <div className="text-4xl font-terminal font-bold text-terminal-light-green mb-2">
                  10
                </div>
                <div className="text-sm">每小时最大发射数量</div>
              </div>
              
              <div className="bg-terminal-gray p-6 border border-terminal-green rounded-lg text-center">
                <div className="text-4xl font-terminal font-bold text-terminal-light-green mb-2">
                  24
                </div>
                <div className="text-sm">小时限制周期</div>
              </div>
              
              <div className="bg-terminal-gray p-6 border border-terminal-green rounded-lg text-center">
                <div className="text-4xl font-terminal font-bold text-terminal-light-green mb-2">
                  240
                </div>
                <div className="text-sm">每日最大发射数量</div>
              </div>
            </div>

            {/* 行动按钮 */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 12 }}
              className="text-center"
            >
              <Link 
                href="/launchpad"
                className="inline-block bg-terminal-green text-terminal-dark px-8 py-4 rounded-lg font-terminal font-bold text-xl hover:bg-terminal-light-green transition-colors border-2 border-terminal-green hover:border-terminal-light-green"
              >
                ENTER LAUNCHPAD
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </main>

      {/* 底部信息 */}
      <footer className="relative z-10 text-center py-8 border-t border-terminal-green">
        <div className="text-sm text-terminal-dim-green">
          <TypingEffect 
            text="SLOW_WITTED - 2024 - 在快节奏中寻找慢智慧"
            speed={30}
          />
        </div>
      </footer>
    </div>
  );
} 