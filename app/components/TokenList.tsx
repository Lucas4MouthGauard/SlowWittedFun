'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface Token {
  id: string;
  name: string;
  ticker: string;
  address: string;
  launchTime: string;
  initialPrice: number;
  currentPrice: number;
  volume24h: number;
}

const TokenList: React.FC = () => {
  const [tokens, setTokens] = useState<Token[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 模拟加载数据
    const loadTokens = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockTokens: Token[] = [
        {
          id: '1',
          name: 'SlowWitted Token',
          ticker: 'SWT',
          address: 'SWT...1234',
          launchTime: '2024-01-15 14:30',
          initialPrice: 0.001,
          currentPrice: 0.0025,
          volume24h: 1500
        },
        {
          id: '2',
          name: 'Retro Coin',
          ticker: 'RETRO',
          address: 'RET...5678',
          launchTime: '2024-01-15 13:45',
          initialPrice: 0.0005,
          currentPrice: 0.0008,
          volume24h: 800
        },
        {
          id: '3',
          name: 'Terminal Token',
          ticker: 'TERM',
          address: 'TER...9012',
          launchTime: '2024-01-15 12:15',
          initialPrice: 0.002,
          currentPrice: 0.0015,
          volume24h: 2200
        }
      ];
      
      setTokens(mockTokens);
      setIsLoading(false);
    };

    loadTokens();
  }, []);

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const formatPrice = (price: number) => {
    return price.toFixed(6);
  };

  const formatVolume = (volume: number) => {
    if (volume >= 1000) {
      return `${(volume / 1000).toFixed(1)}K`;
    }
    return volume.toString();
  };

  const getPriceChange = (current: number, initial: number) => {
    const change = ((current - initial) / initial) * 100;
    return change;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-terminal-green"></div>
        <span className="ml-3 text-sm">加载中...</span>
      </div>
    );
  }

  if (tokens.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="text-lg mb-2">暂无发射记录</div>
        <div className="text-sm text-terminal-dim-green">
          成为第一个发射代币的人
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {tokens.map((token, index) => (
        <motion.div
          key={token.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="bg-terminal-dark p-4 border border-terminal-green rounded-lg hover:border-terminal-light-green transition-colors"
        >
          <div className="flex justify-between items-start mb-3">
            <div>
              <div className="font-terminal font-bold text-lg">{token.name}</div>
              <div className="text-sm text-terminal-light-green">{token.ticker}</div>
            </div>
            <div className="text-right">
              <div className="text-sm font-mono">{formatAddress(token.address)}</div>
              <div className="text-xs text-terminal-dim-green">{token.launchTime}</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <div className="text-terminal-dim-green">初始价格</div>
              <div className="font-mono">{formatPrice(token.initialPrice)} SOL</div>
            </div>
            <div>
              <div className="text-terminal-dim-green">当前价格</div>
              <div className="font-mono">{formatPrice(token.currentPrice)} SOL</div>
            </div>
            <div>
              <div className="text-terminal-dim-green">24h成交量</div>
              <div className="font-mono">{formatVolume(token.volume24h)} SOL</div>
            </div>
            <div>
              <div className="text-terminal-dim-green">价格变化</div>
              <div className={`font-mono ${
                getPriceChange(token.currentPrice, token.initialPrice) >= 0 
                  ? 'text-green-400' 
                  : 'text-red-400'
              }`}>
                {getPriceChange(token.currentPrice, token.initialPrice) >= 0 ? '+' : ''}
                {getPriceChange(token.currentPrice, token.initialPrice).toFixed(2)}%
              </div>
            </div>
          </div>

          <div className="mt-3 pt-3 border-t border-terminal-dim-green">
            <div className="flex justify-between items-center">
              <button className="text-xs bg-terminal-green text-terminal-dark px-3 py-1 rounded font-terminal font-bold hover:bg-terminal-light-green transition-colors">
                查看详情
              </button>
              <button className="text-xs border border-terminal-green text-terminal-green px-3 py-1 rounded font-terminal font-bold hover:bg-terminal-green hover:text-terminal-dark transition-colors">
                交易
              </button>
            </div>
          </div>
        </motion.div>
      ))}

      <div className="text-center pt-4">
        <button className="text-sm text-terminal-light-green hover:text-terminal-green transition-colors font-terminal">
          查看全部代币 →
        </button>
      </div>
    </div>
  );
};

export default TokenList; 