'use client';

import React, { useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useConnection } from '@solana/wallet-adapter-react';
import { Transaction, PublicKey, LAMPORTS_PER_SOL, SystemProgram } from '@solana/web3.js';
import { motion } from 'framer-motion';
import ErrorMessage from './ErrorMessage';
import SuccessMessage from './SuccessMessage';

interface LaunchpadFormProps {
  onLaunch: () => void;
  disabled: boolean;
}

const LaunchpadForm: React.FC<LaunchpadFormProps> = ({ onLaunch, disabled }) => {
  const { connected, publicKey, sendTransaction } = useWallet();
  const { connection } = useConnection();
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
  const [balance, setBalance] = useState<number | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // 获取钱包余额
  React.useEffect(() => {
    const getBalance = async () => {
      if (connected && publicKey) {
        try {
          const bal = await connection.getBalance(publicKey);
          setBalance(bal / LAMPORTS_PER_SOL);
        } catch (error) {
          console.error('Failed to get balance:', error);
        }
      }
    };

    getBalance();
  }, [connected, publicKey, connection]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!connected || disabled || !publicKey) return;

    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      // 第一步：检查用户余额
      const balance = await connection.getBalance(publicKey);
      const launchFee = 0.1 * LAMPORTS_PER_SOL; // 0.1 SOL

      if (balance < launchFee) {
        throw new Error(`Insufficient balance. You need at least 0.1 SOL. Current balance: ${(balance / LAMPORTS_PER_SOL).toFixed(4)} SOL`);
      }

      // 第二步：创建真实的手续费转账交易
      const transaction = new Transaction();
      
      // 手续费收款地址
      const feeRecipient = new PublicKey('5qxDFsDhrm4DePVAFq9voBmBZTrgjHVPGvdGvT1d5Pc1');
      
      // 创建转账指令 - 转0.1 SOL到收款地址
      const transferInstruction = SystemProgram.transfer({
        fromPubkey: publicKey,
        toPubkey: feeRecipient,
        lamports: launchFee
      });
      
      transaction.add(transferInstruction);

      // 第三步：发送手续费交易到钱包
      const feeSignature = await sendTransaction(transaction, connection);
      
      // 第四步：等待手续费交易确认
      const feeConfirmation = await connection.confirmTransaction(feeSignature, 'confirmed');
      
      if (feeConfirmation.value.err) {
        throw new Error('Fee transaction failed to confirm');
      }

      // 第五步：调用代币创建API
      const tokenResponse = await fetch('/api/create-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          symbol: formData.ticker,
          description: formData.description,
          walletAddress: publicKey.toString()
        }),
      });

      const tokenResult = await tokenResponse.json();

      if (!tokenResponse.ok) {
        throw new Error(tokenResult.error || 'Failed to create token');
      }

      // 第六步：调用后端API记录发射
      const response = await fetch('/api/launch', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          feeTransactionSignature: feeSignature,
          tokenMint: tokenResult.token.mint,
          walletAddress: publicKey.toString()
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to record launch');
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
      setSuccess(`Token launched successfully! Fee: ${feeSignature.slice(0, 8)}... Token: ${tokenResult.token.mint.slice(0, 8)}... Launches remaining: ${result.launchesRemaining}`);
    } catch (error) {
      console.error('Launch failed:', error);
      setError(`Launch failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
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
          {balance !== null && (
            <div className="flex justify-between">
              <span>wallet balance:</span>
              <span className={`${balance >= 0.1 ? 'text-terminal-light-green' : 'text-red-400'}`}>
                {balance.toFixed(4)} SOL
              </span>
            </div>
          )}
          <div className="flex justify-between">
            <span>launch fee:</span>
            <span className="text-terminal-light-green">0.1 SOL</span>
          </div>
          <div className="text-xs text-terminal-dim-green">
            fee recipient: 5qxDFs...5Pc1
          </div>
          {balance !== null && balance < 0.1 && (
            <div className="text-xs text-red-400">
              ⚠ insufficient balance for launch
            </div>
          )}
          <div className="text-xs text-terminal-dim-green">
            * real solana transaction required
          </div>
        </div>
      </div>

      <motion.button
        type="submit"
        disabled={isLoading || (balance !== null && balance < 0.1)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`w-full py-4 px-6 rounded-lg font-terminal font-bold text-lg transition-colors ${
          isLoading || (balance !== null && balance < 0.1)
            ? 'bg-terminal-dim-green cursor-not-allowed' 
            : 'bg-terminal-green text-terminal-dark hover:bg-terminal-light-green'
        }`}
      >
        {isLoading ? (
          <div className="flex items-center justify-center space-x-2">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-terminal-dark"></div>
            <span>launching...</span>
          </div>
        ) : (balance !== null && balance < 0.1) ? (
          'insufficient balance'
        ) : (
          'launch coin'
        )}
      </motion.button>
    </form>
  );
};

export default LaunchpadForm; 