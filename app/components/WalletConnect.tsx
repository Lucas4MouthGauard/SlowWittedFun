'use client';

import React from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

const WalletConnect: React.FC = () => {
  const { connected } = useWallet();

  return (
    <div className="flex items-center space-x-2">
      <WalletMultiButton 
        className="bg-terminal-green text-terminal-dark px-4 py-2 rounded font-terminal font-bold hover:bg-terminal-light-green transition-colors border border-terminal-green"
      />
      {connected && (
        <div className="text-xs text-terminal-light-green">
          CONNECTED
        </div>
      )}
    </div>
  );
};

export default WalletConnect; 