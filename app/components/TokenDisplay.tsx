'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

const TokenDisplay: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const contractAddress = '0000000000000000000000000';

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(contractAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className="bg-terminal-gray p-6 border border-terminal-green rounded-lg hover:border-terminal-light-green transition-colors"
    >
      <div className="text-center mb-4">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="text-4xl font-terminal font-bold text-terminal-light-green mb-2"
        >
          $Slow
        </motion.div>
        <div className="text-sm text-terminal-dim-green">
          SlowWitted Fun Token
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-mono">CA:</span>
          <motion.button
            onClick={copyToClipboard}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center space-x-2 bg-terminal-dark px-3 py-2 rounded border border-terminal-green hover:border-terminal-light-green transition-colors"
          >
            <span className="text-xs font-mono text-terminal-green">
              {contractAddress}
            </span>
            <svg 
              className="w-4 h-4 text-terminal-light-green" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              {copied ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              )}
            </svg>
          </motion.button>
        </div>
        
        {copied && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs text-terminal-light-green text-center"
          >
            CA copied to clipboard!
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default TokenDisplay; 