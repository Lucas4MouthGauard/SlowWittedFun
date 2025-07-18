import { NextRequest, NextResponse } from 'next/server';

// 内存存储（生产环境应该使用数据库）
let launchCount = 0;
let lastResetTime = Date.now();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, ticker, description, website, x, telegram } = body;

    // 验证输入
    if (!name || !ticker) {
      return NextResponse.json(
        { error: 'Name and ticker are required' },
        { status: 400 }
      );
    }

    // 检查发射限制
    const now = Date.now();
    if (now - lastResetTime > 3600000) { // 1小时 = 3600000毫秒
      launchCount = 0;
      lastResetTime = now;
    }

    if (launchCount >= 10) {
      return NextResponse.json(
        { error: 'Maximum launches per hour reached' },
        { status: 429 }
      );
    }

    // 模拟代币创建
    const tokenData = {
      mint: `TOKEN_${Date.now()}`,
      name,
      ticker,
      description,
      website,
      x,
      telegram,
      launchTime: new Date().toISOString(),
      initialPrice: 0.001,
      currentPrice: 0.001,
      volume24h: 0
    };

    // 增加发射计数
    launchCount++;

    console.log('Token launched:', tokenData);

    return NextResponse.json({
      success: true,
      token: tokenData,
      launchesRemaining: 10 - launchCount
    });

  } catch (error) {
    console.error('Launch error:', error);
    return NextResponse.json(
      { error: 'Failed to launch token' },
      { status: 500 }
    );
  }
}

// 获取发射统计
export async function GET() {
  const now = Date.now();
  if (now - lastResetTime > 3600000) {
    launchCount = 0;
    lastResetTime = now;
  }

  return NextResponse.json({
    launchCount,
    maxLaunches: 10,
    launchesRemaining: 10 - launchCount,
    timeUntilReset: Math.max(0, 3600000 - (now - lastResetTime))
  });
} 