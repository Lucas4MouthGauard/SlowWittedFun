'use client';

import React, { useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { motion } from 'framer-motion';
import ErrorMessage from './ErrorMessage';
import SuccessMessage from './SuccessMessage';

interface LaunchpadFormProps {
  onLaunch: () => void;
  disabled: boolean;
}

const LaunchpadForm: React.FC<LaunchpadFormProps> = ({ onLaunch, disabled }) => {
  const { connected } = useWallet();
  const [formData, setFormData] = useState({
    name: '',
    ticker: '',
    description: '',
    website: '',
    x: '',
    telegram: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

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
      // 调用发射API
      const response = await fetch('/api/launch', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Launch failed');
      }

      console.log('Token launched successfully:', result);
      onLaunch();
      
      // 重置表单
      setFormData({
        name: '',
        ticker: '',
        description: '',
        website: '',
        x: '',
        telegram: ''
      });

      // 显示成功消息
      setSuccess(`Token launched successfully! Launches remaining: ${result.launchesRemaining}`);
      setError(null);
    } catch (error) {
      console.error('Launch failed:', error);
      setError(`Launch failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
      setSuccess(null);
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
      {error && (
        <ErrorMessage 
          message={error} 
          onClose={() => setError(null)} 
        />
      )}
      {success && (
        <SuccessMessage 
          message={success} 
          onClose={() => setSuccess(null)} 
        />
      )}
      {/* Coin Name */}
      <div>
        <label className="block text-sm font-terminal font-bold mb-2">
          coin name
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required
          className="w-full bg-terminal-dark border border-terminal-green text-terminal-green px-4 py-3 rounded font-mono focus:outline-none focus:border-terminal-light-green"
          placeholder="name your coin"
        />
      </div>

      {/* Ticker */}
      <div>
        <label className="block text-sm font-terminal font-bold mb-2">
          ticker
        </label>
        <input
          type="text"
          name="ticker"
          value={formData.ticker}
          onChange={handleInputChange}
          required
          maxLength={10}
          className="w-full bg-terminal-dark border border-terminal-green text-terminal-green px-4 py-3 rounded font-mono focus:outline-none focus:border-terminal-light-green uppercase"
          placeholder="add a coin ticker (e.g. DOGE)"
        />
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-terminal font-bold mb-2">
          description (optional)
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          rows={3}
          className="w-full bg-terminal-dark border border-terminal-green text-terminal-green px-4 py-3 rounded font-mono focus:outline-none focus:border-terminal-light-green resize-none"
          placeholder="write a short description"
        />
      </div>

      {/* Social Links Section */}
      <div className="space-y-4">
        <div className="text-sm font-terminal font-bold text-terminal-light-green">
          add social links (optional)
        </div>
        
        {/* Website */}
        <div>
          <label className="block text-sm font-terminal font-bold mb-2">
            website
          </label>
          <input
            type="url"
            name="website"
            value={formData.website}
            onChange={handleInputChange}
            className="w-full bg-terminal-dark border border-terminal-green text-terminal-green px-4 py-3 rounded font-mono focus:outline-none focus:border-terminal-light-green"
            placeholder="add URL"
          />
        </div>

        {/* X (Twitter) */}
        <div>
          <label className="block text-sm font-terminal font-bold mb-2">
            X
          </label>
          <input
            type="url"
            name="x"
            value={formData.x}
            onChange={handleInputChange}
            className="w-full bg-terminal-dark border border-terminal-green text-terminal-green px-4 py-3 rounded font-mono focus:outline-none focus:border-terminal-light-green"
            placeholder="add URL"
          />
        </div>

        {/* Telegram */}
        <div>
          <label className="block text-sm font-terminal font-bold mb-2">
            telegram
          </label>
          <input
            type="url"
            name="telegram"
            value={formData.telegram}
            onChange={handleInputChange}
            className="w-full bg-terminal-dark border border-terminal-green text-terminal-green px-4 py-3 rounded font-mono focus:outline-none focus:border-terminal-light-green"
            placeholder="add URL"
          />
        </div>
      </div>

      {/* Launch Fee Info */}
      <div className="bg-terminal-dark p-4 border border-terminal-dim-green rounded">
        <div className="text-sm space-y-2">
          <div className="flex justify-between">
            <span>launch fee:</span>
            <span className="text-terminal-light-green">0.1 SOL</span>
          </div>
          <div className="text-xs text-terminal-dim-green">
            * additional liquidity will be required during launch
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
            <span>launching...</span>
          </div>
        ) : (
          'launch coin'
        )}
      </motion.button>
    </form>
  );
};

export default LaunchpadForm; 