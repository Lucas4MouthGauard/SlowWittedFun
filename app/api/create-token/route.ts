import { NextRequest, NextResponse } from 'next/server';
import { Keypair } from '@solana/web3.js';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      name, 
      symbol, 
      description, 
      initialSupply = 1000000,
      decimals = 9,
      walletAddress 
    } = body;

    // 验证输入
    if (!name || !symbol || !walletAddress) {
      return NextResponse.json(
        { error: 'Name, symbol and wallet address are required' },
        { status: 400 }
      );
    }

    // 创建代币铸造账户
    const mint = Keypair.generate();
    
    // 注意：这里需要实际的签名者，但在API中我们无法直接访问用户的钱包
    // 所以这个API主要用于演示，实际生产环境需要更复杂的处理
    
    console.log('Token creation requested:', {
      name,
      symbol,
      description,
      initialSupply,
      decimals,
      walletAddress,
      mintAddress: mint.publicKey.toString()
    });

    // 返回代币信息（实际创建需要用户签名）
    const tokenData = {
      mint: mint.publicKey.toString(),
      name,
      symbol,
      description,
      initialSupply,
      decimals,
      walletAddress,
      status: 'pending_creation',
      message: 'Token creation requires user signature. Please use the frontend to complete the process.'
    };

    return NextResponse.json({
      success: true,
      token: tokenData,
      message: 'Token creation initiated. Complete the process in the frontend.'
    });

  } catch (error) {
    console.error('Token creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create token' },
      { status: 500 }
    );
  }
} 