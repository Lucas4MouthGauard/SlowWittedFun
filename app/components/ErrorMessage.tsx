'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface ErrorMessageProps {
  message: string;
  onClose?: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-red-900 border border-red-500 text-red-200 p-4 rounded-lg mb-4"
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <span className="text-red-400">⚠</span>
          <span className="font-terminal">{message}</span>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="text-red-400 hover:text-red-200 transition-colors"
          >
            ✕
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default ErrorMessage; 