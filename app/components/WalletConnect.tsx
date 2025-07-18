'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';
import { motion } from 'framer-motion';

const WalletConnect: React.FC = () => {
  const { connected, publicKey, disconnect, wallet } = useWallet();
  const { setVisible } = useWalletModal();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showCopySuccess, setShowCopySuccess] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleConnect = () => {
    setVisible(true);
  };

  const handleDisconnect = () => {
    disconnect();
    setIsDropdownOpen(false);
  };

  const copyAddress = async () => {
    if (publicKey) {
      try {
        await navigator.clipboard.writeText(publicKey.toString());
        setShowCopySuccess(true);
        setTimeout(() => setShowCopySuccess(false), 2000);
      } catch (error) {
        console.error('Failed to copy address:', error);
      }
    }
  };

  const shortenAddress = (address: string) => {
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  };

  // 点击外部关闭下拉菜单
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  if (!connected) {
    return (
      <motion.button
        onClick={handleConnect}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="bg-terminal-green text-terminal-dark px-4 py-2 rounded font-terminal font-bold hover:bg-terminal-light-green transition-colors border border-terminal-green"
      >
        connect wallet
      </motion.button>
    );
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <motion.button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="bg-terminal-green text-terminal-dark px-4 py-2 rounded font-terminal font-bold hover:bg-terminal-light-green transition-colors border border-terminal-green flex items-center space-x-2"
      >
        <span>{wallet?.adapter.name || 'Wallet'}</span>
        <span className="text-xs">▼</span>
      </motion.button>

      {isDropdownOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute top-full right-0 mt-2 bg-terminal-darker border border-terminal-green rounded shadow-lg z-50 min-w-48"
        >
          <div className="p-3 border-b border-terminal-dim-green">
            <div className="text-xs text-terminal-dim-green">connected</div>
            <div className="font-mono text-sm">
              {publicKey ? shortenAddress(publicKey.toString()) : 'Unknown'}
            </div>
          </div>
          
          <div className="py-1">
            <button
              onClick={copyAddress}
              className="w-full text-left px-3 py-2 text-sm hover:bg-terminal-dark transition-colors flex items-center space-x-2"
            >
              <span>📋</span>
              <span>{showCopySuccess ? 'copied!' : 'copy address'}</span>
            </button>
            
            <button
              onClick={handleDisconnect}
              className="w-full text-left px-3 py-2 text-sm hover:bg-terminal-dark transition-colors flex items-center space-x-2 text-red-400"
            >
              <span>🚪</span>
              <span>disconnect</span>
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default WalletConnect; 