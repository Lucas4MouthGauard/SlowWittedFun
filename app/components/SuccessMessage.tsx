'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface SuccessMessageProps {
  message: string;
  onClose?: () => void;
}

const SuccessMessage: React.FC<SuccessMessageProps> = ({ message, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-green-900 border border-green-500 text-green-200 p-4 rounded-lg mb-4"
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <span className="text-green-400">✓</span>
          <span className="font-terminal">{message}</span>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="text-green-400 hover:text-green-200 transition-colors"
          >
            ✕
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default SuccessMessage; 