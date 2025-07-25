'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import TypingEffect from '../components/TypingEffect';
import LaunchpadForm from '../components/LaunchpadForm';
import { useLanguage } from '../i18n/LanguageContext';

export default function Launchpad() {
  const { t, language } = useLanguage();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [launchCount, setLaunchCount] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [launchesRemaining, setLaunchesRemaining] = useState(10);

  // 计算距离下一个整点的秒数
  const calculateTimeToNextHour = () => {
    const now = new Date();
    const nextHour = new Date(now);
    nextHour.setHours(now.getHours() + 1, 0, 0, 0); // 下一个整点
    return Math.floor((nextHour.getTime() - now.getTime()) / 1000);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now);
      setTimeRemaining(calculateTimeToNextHour());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // 获取发射统计
  useEffect(() => {
    const fetchLaunchStats = async () => {
      try {
        const response = await fetch('/api/launch');
        const result = await response.json();

        if (response.ok) {
          setLaunchCount(result.launchCount);
          setLaunchesRemaining(result.launchesRemaining);
          setTimeRemaining(Math.floor(result.timeUntilReset / 1000));
        }
      } catch (error) {
        console.error('Error fetching launch stats:', error);
      }
    };

    fetchLaunchStats();
    const interval = setInterval(fetchLaunchStats, 30000); // 每30秒更新一次

    return () => clearInterval(interval);
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
      
      {/* 时间显示 */}
      <div className="relative z-10 flex justify-end p-4">
        <div className="text-sm font-mono text-terminal-light-green">
          {currentTime.toLocaleTimeString()}
        </div>
      </div>

      {/* 主要内容 */}
      <main className="relative z-10 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* 标题区域 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-center mb-8"
          >
            <h1 className="text-5xl font-terminal font-bold mb-4 glitch" data-text={t('launchpad.title')}>
              {t('launchpad.title')}
            </h1>
            <div className="text-lg text-terminal-light-green">
              <TypingEffect 
                text={t('launchpad.subtitle')}
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
              <div className="text-sm">launched this hour</div>
            </div>
            
            <div className="bg-terminal-gray p-6 border border-terminal-green rounded-lg text-center">
              <div className="text-3xl font-terminal font-bold text-terminal-light-green mb-2">
                {formatTime(timeRemaining)}
              </div>
              <div className="text-sm">reset countdown</div>
            </div>
            
            <div className="bg-terminal-gray p-6 border border-terminal-green rounded-lg text-center">
              <div className="text-3xl font-terminal font-bold text-terminal-light-green mb-2">
                {launchesRemaining}
              </div>
              <div className="text-sm">launches remaining</div>
            </div>
          </motion.div>

          {/* 发射表单 - 居中布局 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
            className="flex justify-center"
          >
            <div className="bg-terminal-gray p-8 border border-terminal-green rounded-lg w-full max-w-2xl">
              <h2 className="text-3xl font-terminal font-bold mb-8 text-center">
                launch new coin
              </h2>
              <LaunchpadForm 
                onLaunch={() => {
                  setLaunchCount(prev => prev + 1);
                  setLaunchesRemaining(prev => Math.max(0, prev - 1));
                }}
                disabled={true}
              />
            </div>
          </motion.div>

          {/* 说明信息 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.5 }}
            className="mt-8 bg-terminal-gray p-6 border border-terminal-green rounded-lg"
          >
            <h3 className="text-xl font-terminal font-bold mb-4 text-center">
              launch rules
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-2">
                <span className="text-terminal-light-green">•</span>
                <span>maximum 10 meme coins per hour</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-terminal-light-green">•</span>
                <span>0.1 SOL launch fee per coin</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-terminal-light-green">•</span>
                <span>coin name and ticker must be unique</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-terminal-light-green">•</span>
                <span>initial liquidity provided by launcher</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-terminal-light-green">•</span>
                <span>meteora sdk ensures security and liquidity</span>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      {/* 底部信息 */}
      <footer className="relative z-10 text-center py-6 border-t border-terminal-green mt-12">
        <div className="text-sm text-terminal-dim-green">
          <TypingEffect 
            text="SlowWitted Fun LAUNCHPAD - Finding opportunities in limitations"
            speed={40}
          />
        </div>
      </footer>
    </div>
  );
} 