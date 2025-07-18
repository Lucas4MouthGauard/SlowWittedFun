'use client';

import React, { useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { motion } from 'framer-motion';

interface LaunchpadFormProps {
  onLaunch: () => void;
  disabled: boolean;
}

const LaunchpadForm: React.FC<LaunchpadFormProps> = ({ onLaunch, disabled }) => {
  const { connected } = useWallet();
  const [formData, setFormData] = useState({
    name: '',
    symbol: '',
    description: '',
    initialSupply: '',
    initialLiquidity: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!connected || disabled) return;

    setIsLoading(true);
    try {
      // 这里将集成Meteora SDK进行代币创建
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Launching token:', formData);
      onLaunch();
      
      // 重置表单
      setFormData({
        name: '',
        symbol: '',
        description: '',
        initialSupply: '',
        initialLiquidity: ''
      });
    } catch (error) {
      console.error('Launch failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!connected) {
    return (
      <div className="text-center py-8">
        <div className="text-lg mb-4">请先连接钱包</div>
        <div className="text-sm text-terminal-dim-green">
          连接Solana钱包以发射代币
        </div>
      </div>
    );
  }

  if (disabled) {
    return (
      <div className="text-center py-8">
        <div className="text-lg mb-4 text-terminal-dim-green">
          本小时发射次数已用完
        </div>
        <div className="text-sm">
          请等待下一小时重置
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-terminal font-bold mb-2">
          代币名称 *
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required
          className="w-full bg-terminal-dark border border-terminal-green text-terminal-green px-4 py-3 rounded font-mono focus:outline-none focus:border-terminal-light-green"
          placeholder="例如: SlowWitted Token"
        />
      </div>

      <div>
        <label className="block text-sm font-terminal font-bold mb-2">
          代币符号 *
        </label>
        <input
          type="text"
          name="symbol"
          value={formData.symbol}
          onChange={handleInputChange}
          required
          maxLength={10}
          className="w-full bg-terminal-dark border border-terminal-green text-terminal-green px-4 py-3 rounded font-mono focus:outline-none focus:border-terminal-light-green uppercase"
          placeholder="例如: SWT"
        />
      </div>

      <div>
        <label className="block text-sm font-terminal font-bold mb-2">
          描述
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          rows={3}
          className="w-full bg-terminal-dark border border-terminal-green text-terminal-green px-4 py-3 rounded font-mono focus:outline-none focus:border-terminal-light-green resize-none"
          placeholder="代币描述..."
        />
      </div>

      <div>
        <label className="block text-sm font-terminal font-bold mb-2">
          初始供应量 *
        </label>
        <input
          type="number"
          name="initialSupply"
          value={formData.initialSupply}
          onChange={handleInputChange}
          required
          min="1"
          className="w-full bg-terminal-dark border border-terminal-green text-terminal-green px-4 py-3 rounded font-mono focus:outline-none focus:border-terminal-light-green"
          placeholder="例如: 1000000"
        />
      </div>

      <div>
        <label className="block text-sm font-terminal font-bold mb-2">
          初始流动性 (SOL) *
        </label>
        <input
          type="number"
          name="initialLiquidity"
          value={formData.initialLiquidity}
          onChange={handleInputChange}
          required
          min="0.1"
          step="0.1"
          className="w-full bg-terminal-dark border border-terminal-green text-terminal-green px-4 py-3 rounded font-mono focus:outline-none focus:border-terminal-light-green"
          placeholder="例如: 1.0"
        />
      </div>

      <div className="bg-terminal-dark p-4 border border-terminal-dim-green rounded">
        <div className="text-sm space-y-2">
          <div className="flex justify-between">
            <span>发射费用:</span>
            <span className="text-terminal-light-green">0.1 SOL</span>
          </div>
          <div className="flex justify-between">
            <span>初始流动性:</span>
            <span className="text-terminal-light-green">{formData.initialLiquidity || '0'} SOL</span>
          </div>
          <div className="border-t border-terminal-dim-green pt-2 mt-2">
            <div className="flex justify-between font-bold">
              <span>总计:</span>
              <span className="text-terminal-light-green">
                {(parseFloat(formData.initialLiquidity) || 0) + 0.1} SOL
              </span>
            </div>
          </div>
        </div>
      </div>

      <motion.button
        type="submit"
        disabled={isLoading}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`w-full py-4 px-6 rounded-lg font-terminal font-bold text-lg transition-colors ${
          isLoading 
            ? 'bg-terminal-dim-green cursor-not-allowed' 
            : 'bg-terminal-green text-terminal-dark hover:bg-terminal-light-green'
        }`}
      >
        {isLoading ? (
          <div className="flex items-center justify-center space-x-2">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-terminal-dark"></div>
            <span>发射中...</span>
          </div>
        ) : (
          '发射代币'
        )}
      </motion.button>
    </form>
  );
};

export default LaunchpadForm; 