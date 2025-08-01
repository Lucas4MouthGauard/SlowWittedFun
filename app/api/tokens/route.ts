import { NextResponse } from 'next/server';

// 模拟代币数据存储
const tokens = [
  {
    id: '1',
    name: 'Slow Token',
    ticker: 'SWT',
    address: 'SWT...1234',
    launchTime: '2024-01-15 14:30',
    initialPrice: 0.001,
    currentPrice: 0.0025,
    volume24h: 1500
  },
  {
    id: '2',
    name: 'Retro Coin',
    ticker: 'RETRO',
    address: 'RET...5678',
    launchTime: '2024-01-15 13:45',
    initialPrice: 0.0005,
    currentPrice: 0.0008,
    volume24h: 800
  },
  {
    id: '3',
    name: 'Terminal Token',
    ticker: 'TERM',
    address: 'TER...9012',
    launchTime: '2024-01-15 12:15',
    initialPrice: 0.002,
    currentPrice: 0.0015,
    volume24h: 2200
  }
];

export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      tokens: tokens
    });
  } catch (error) {
    console.error('Get tokens error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch tokens' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newToken = {
      id: (tokens.length + 1).toString(),
      ...body,
      launchTime: new Date().toISOString(),
      initialPrice: 0.001,
      currentPrice: 0.001,
      volume24h: 0
    };

    tokens.unshift(newToken); // 添加到列表开头

    return NextResponse.json({
      success: true,
      token: newToken
    });
  } catch (error) {
    console.error('Add token error:', error);
    return NextResponse.json(
      { error: 'Failed to add token' },
      { status: 500 }
    );
  }
} 