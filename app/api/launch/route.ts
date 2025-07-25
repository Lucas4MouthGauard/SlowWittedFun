import { NextRequest, NextResponse } from 'next/server';
import { PublicKey } from '@solana/web3.js';

// 内存存储（生产环境应该使用数据库）
let launchCount = 0;
let currentHour = new Date().getHours();



// 检查是否需要重置（基于世界时间）
const checkAndResetIfNeeded = () => {
  const now = new Date();
  const currentHourNow = now.getHours();
  
  if (currentHourNow !== currentHour) {
    launchCount = 0;
    currentHour = currentHourNow;
    console.log(`Reset launch count at hour ${currentHourNow}`);
  }
};

// 速率限制存储
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

// 安全配置
const SECURITY_CONFIG = {
  MAX_NAME_LENGTH: 50,
  MAX_TICKER_LENGTH: 10,
  MAX_DESCRIPTION_LENGTH: 500,
  MAX_WEBSITE_LENGTH: 200,
  RATE_LIMIT_WINDOW: 3600000, // 1小时
  MAX_REQUESTS_PER_WINDOW: 5, // 每个IP每小时最多5次请求
  FEE_RECIPIENT: '5qxDFsDhrm4DePVAFq9voBmBZTrgjHVPGvdGvT1d5Pc1'
};

// 输入验证函数
function validateInput(data: Record<string, unknown>) {
  const errors: string[] = [];

  // 名称验证
  if (!data.name || typeof data.name !== 'string') {
    errors.push('Name is required and must be a string');
  } else if (data.name.length > SECURITY_CONFIG.MAX_NAME_LENGTH) {
    errors.push(`Name must be less than ${SECURITY_CONFIG.MAX_NAME_LENGTH} characters`);
  } else if (!/^[a-zA-Z0-9\s\-_]+$/.test(data.name)) {
    errors.push('Name contains invalid characters');
  }

  // 符号验证
  if (!data.ticker || typeof data.ticker !== 'string') {
    errors.push('Ticker is required and must be a string');
  } else if (data.ticker.length > SECURITY_CONFIG.MAX_TICKER_LENGTH) {
    errors.push(`Ticker must be less than ${SECURITY_CONFIG.MAX_TICKER_LENGTH} characters`);
  } else if (!/^[A-Z0-9]+$/.test(data.ticker)) {
    errors.push('Ticker must contain only uppercase letters and numbers');
  }

  // 描述验证
  if (data.description && typeof data.description === 'string') {
    if (data.description.length > SECURITY_CONFIG.MAX_DESCRIPTION_LENGTH) {
      errors.push(`Description must be less than ${SECURITY_CONFIG.MAX_DESCRIPTION_LENGTH} characters`);
    }
  }

  // 网站验证
  if (data.website && typeof data.website === 'string') {
    if (data.website.length > SECURITY_CONFIG.MAX_WEBSITE_LENGTH) {
      errors.push(`Website URL must be less than ${SECURITY_CONFIG.MAX_WEBSITE_LENGTH} characters`);
    }
    try {
      new URL(data.website);
    } catch {
      errors.push('Invalid website URL format');
    }
  }

  // 钱包地址验证
  if (!data.walletAddress || typeof data.walletAddress !== 'string') {
    errors.push('Wallet address is required');
  } else {
    try {
      new PublicKey(data.walletAddress);
    } catch {
      errors.push('Invalid wallet address format');
    }
  }

  // 交易签名验证
  if (!data.feeTransactionSignature || typeof data.feeTransactionSignature !== 'string') {
    errors.push('Transaction signature is required');
  } else if (!/^[A-Za-z0-9]{88}$/.test(data.feeTransactionSignature)) {
    errors.push('Invalid transaction signature format');
  }

  return errors;
}

// 速率限制检查
function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const userData = rateLimitMap.get(ip);

  if (!userData || now > userData.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + SECURITY_CONFIG.RATE_LIMIT_WINDOW });
    return true;
  }

  if (userData.count >= SECURITY_CONFIG.MAX_REQUESTS_PER_WINDOW) {
    return false;
  }

  userData.count++;
  return true;
}

export async function POST(request: NextRequest) {
  try {
    // 获取客户端IP
    const ip = request.ip || request.headers.get('x-forwarded-for') || 'unknown';
    
    // 速率限制检查
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please try again later.' },
        { status: 429 }
      );
    }

    const body = await request.json();

    // 输入验证
    const validationErrors = validateInput(body);
    if (validationErrors.length > 0) {
      return NextResponse.json(
        { error: 'Validation failed', details: validationErrors },
        { status: 400 }
      );
    }

    const { name, ticker, description, website, x, telegram, feeTransactionSignature, tokenMint, walletAddress } = body;

    // 检查发射限制（基于世界时间）
    checkAndResetIfNeeded();

    if (launchCount >= 10) {
      return NextResponse.json(
        { error: 'Maximum launches per hour reached' },
        { status: 429 }
      );
    }

    // 代币数据
    const tokenData = {
      mint: tokenMint || `TOKEN_${Date.now()}`,
      name: name.trim(),
      ticker: ticker.trim().toUpperCase(),
      description: description?.trim() || '',
      website: website?.trim() || '',
      x: x?.trim() || '',
      telegram: telegram?.trim() || '',
      launchTime: new Date().toISOString(),
      initialPrice: 0.001,
      currentPrice: 0.001,
      volume24h: 0,
      feeTransactionSignature,
      walletAddress,
      ip // 记录IP用于审计
    };

    // 增加发射计数
    launchCount++;

    console.log('Token launched:', {
      ...tokenData,
      ip,
      timestamp: new Date().toISOString()
    });

    return NextResponse.json({
      success: true,
      token: tokenData,
      launchesRemaining: 10 - launchCount
    });

  } catch (error) {
    console.error('Launch error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// 获取发射统计
export async function GET() {
  checkAndResetIfNeeded();
  
  const now = new Date();
  const nextHour = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours() + 1, 0, 0, 0);
  const timeUntilReset = Math.max(0, nextHour.getTime() - now.getTime());

  return NextResponse.json({
    launchCount,
    maxLaunches: 10,
    launchesRemaining: 10 - launchCount,
    timeUntilReset
  });
} 