'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import WalletConnect from '../components/WalletConnect';
import TypingEffect from '../components/TypingEffect';
import LaunchpadForm from '../components/LaunchpadForm';
import TokenList from '../components/TokenList';

export default function Launchpad() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [launchCount, setLaunchCount] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(3600); // 1小时

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          return 3600; // 重置为1小时
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(countdown);
  }, []);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

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
      <main className="relative z-10 container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* 标题区域 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-center mb-8"
          >
            <h1 className="text-5xl font-terminal font-bold mb-4 glitch" data-text="LAUNCHPAD">
              LAUNCHPAD
            </h1>
            <div className="text-lg text-terminal-light-green">
              <TypingEffect 
                text="每小时限制10个MemeCoin发射 - 保持专注，保持简单"
                speed={80}
              />
            </div>
          </motion.div>

          {/* 限制信息面板 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
          >
            <div className="bg-terminal-gray p-6 border border-terminal-green rounded-lg text-center">
              <div className="text-3xl font-terminal font-bold text-terminal-light-green mb-2">
                {launchCount}/10
              </div>
              <div className="text-sm">本小时已发射</div>
            </div>
            
            <div className="bg-terminal-gray p-6 border border-terminal-green rounded-lg text-center">
              <div className="text-3xl font-terminal font-bold text-terminal-light-green mb-2">
                {formatTime(timeRemaining)}
              </div>
              <div className="text-sm">重置倒计时</div>
            </div>
            
            <div className="bg-terminal-gray p-6 border border-terminal-green rounded-lg text-center">
              <div className="text-3xl font-terminal font-bold text-terminal-light-green mb-2">
                {10 - launchCount}
              </div>
              <div className="text-sm">剩余发射次数</div>
            </div>
          </motion.div>

          {/* 主要内容区域 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* 发射表单 */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 1 }}
            >
              <div className="bg-terminal-gray p-6 border border-terminal-green rounded-lg">
                <h2 className="text-2xl font-terminal font-bold mb-6 text-center">
                  发射新代币
                </h2>
                <LaunchpadForm 
                  onLaunch={() => setLaunchCount(prev => Math.min(prev + 1, 10))}
                  disabled={launchCount >= 10}
                />
              </div>
            </motion.div>

            {/* 代币列表 */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 1.2 }}
            >
              <div className="bg-terminal-gray p-6 border border-terminal-green rounded-lg">
                <h2 className="text-2xl font-terminal font-bold mb-6 text-center">
                  最近发射
                </h2>
                <TokenList />
              </div>
            </motion.div>
          </div>

          {/* 说明信息 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.5 }}
            className="mt-8 bg-terminal-gray p-6 border border-terminal-green rounded-lg"
          >
            <h3 className="text-xl font-terminal font-bold mb-4 text-center">
              发射规则
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-2">
                <span className="text-terminal-light-green">•</span>
                <span>每小时最多发射10个MemeCoin</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-terminal-light-green">•</span>
                <span>每个代币需要支付0.1 SOL作为发射费用</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-terminal-light-green">•</span>
                <span>代币名称和符号必须唯一</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-terminal-light-green">•</span>
                <span>初始流动性由发射者提供</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-terminal-light-green">•</span>
                <span>使用Meteora SDK确保安全性和流动性</span>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      {/* 底部信息 */}
      <footer className="relative z-10 text-center py-6 border-t border-terminal-green mt-12">
        <div className="text-sm text-terminal-dim-green">
          <TypingEffect 
            text="SLOW_WITTED LAUNCHPAD - 在限制中寻找机会"
            speed={40}
          />
        </div>
      </footer>
    </div>
  );
} 