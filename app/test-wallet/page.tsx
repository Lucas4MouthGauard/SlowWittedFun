'use client';

import React, { useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useConnection } from '@solana/wallet-adapter-react';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';

const TestWalletPage = () => {
  const { connected, publicKey, sendTransaction } = useWallet();
  const { connection } = useConnection();
  const [balance, setBalance] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<string>('');

  const getBalance = async () => {
    if (!connected || !publicKey) return;
    
    try {
      const bal = await connection.getBalance(publicKey);
      setBalance(bal / LAMPORTS_PER_SOL);
      setMessage(`Balance: ${(bal / LAMPORTS_PER_SOL).toFixed(4)} SOL`);
    } catch (error) {
      setMessage(`Error getting balance: ${error}`);
    }
  };

  const testTransaction = async () => {
    if (!connected || !publicKey) return;
    
    setIsLoading(true);
    setMessage('Testing fee transaction...');
    
    try {
      const { Transaction, PublicKey, SystemProgram, LAMPORTS_PER_SOL } = await import('@solana/web3.js');
      const transaction = new Transaction();
      
      // 手续费收款地址
      const feeRecipient = new PublicKey('5qxDFsDhrm4DePVAFq9voBmBZTrgjHVPGvdGvT1d5Pc1');
      const feeAmount = 0.001 * LAMPORTS_PER_SOL; // 0.001 SOL for testing
      
      // 创建转账指令
      const transferInstruction = SystemProgram.transfer({
        fromPubkey: publicKey,
        toPubkey: feeRecipient,
        lamports: feeAmount
      });
      
      transaction.add(transferInstruction);
      
      // 发送交易
      const signature = await sendTransaction(transaction, connection);
      setMessage(`Fee transaction sent! Signature: ${signature.slice(0, 8)}...`);
      
      // 等待确认
      const confirmation = await connection.confirmTransaction(signature, 'confirmed');
      if (confirmation.value.err) {
        setMessage('Transaction failed to confirm');
      } else {
        setMessage(`Fee transaction confirmed! Signature: ${signature.slice(0, 8)}...`);
      }
    } catch (error) {
      setMessage(`Transaction failed: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-terminal-dark text-terminal-green p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-terminal font-bold mb-8">Wallet Test Page</h1>
        
        <div className="space-y-6">
          <div className="bg-terminal-darker p-6 rounded border border-terminal-green">
            <h2 className="text-xl font-terminal font-bold mb-4">Connection Status</h2>
            <div className="space-y-2">
              <div>Connected: {connected ? 'Yes' : 'No'}</div>
              {publicKey && (
                <div>Address: {publicKey.toString().slice(0, 8)}...</div>
              )}
            </div>
          </div>

          {connected && (
            <div className="bg-terminal-darker p-6 rounded border border-terminal-green">
              <h2 className="text-xl font-terminal font-bold mb-4">Wallet Actions</h2>
              <div className="space-y-4">
                <button
                  onClick={getBalance}
                  className="bg-terminal-green text-terminal-dark px-4 py-2 rounded font-terminal font-bold hover:bg-terminal-light-green"
                >
                  Get Balance
                </button>
                
                <button
                  onClick={testTransaction}
                  disabled={isLoading}
                  className={`px-4 py-2 rounded font-terminal font-bold ${
                    isLoading 
                      ? 'bg-terminal-dim-green cursor-not-allowed' 
                      : 'bg-terminal-green text-terminal-dark hover:bg-terminal-light-green'
                  }`}
                >
                  {isLoading ? 'Testing...' : 'Test Transaction'}
                </button>
              </div>
            </div>
          )}

          {message && (
            <div className="bg-terminal-darker p-6 rounded border border-terminal-green">
              <h2 className="text-xl font-terminal font-bold mb-4">Message</h2>
              <div className="font-mono">{message}</div>
            </div>
          )}

          {balance !== null && (
            <div className="bg-terminal-darker p-6 rounded border border-terminal-green">
              <h2 className="text-xl font-terminal font-bold mb-4">Balance</h2>
              <div className="text-2xl font-mono">{balance.toFixed(4)} SOL</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TestWalletPage; 