export const translations = {
  en: {
    // Navigation
    nav: {
      home: "Home",
      launchpad: "Launchpad"
    },
    
    // Home page
    home: {
      title: "Slow Fun",
      subtitle: "Because sometimes, slower is faster.",
      description: "A retro-style Web3 MemeCoin launch platform with early computer aesthetics. Our core philosophy is 'deliberate limitations lead to better focus'.",
      features: {
        title: "Platform Features",
        hourlyLimit: "Hourly Launch Limit",
        limitDesc: "Maximum 10 tokens per hour",
        retroStyle: "Retro Terminal Style",
        styleDesc: "Early computer black background with green text",
        typewriter: "Typewriter Effects",
        effectDesc: "Authentic vintage computing experience",
        web3: "Web3 Integration",
        web3Desc: "Real Solana blockchain transactions"
      },
      stats: {
        title: "Platform Statistics",
        totalLaunches: "Total Launches",
        activeTokens: "Active Tokens",
        totalVolume: "Total Volume"
      },
      footer: "Slow Fun - 2024 - Finding slow wisdom in a fast-paced world"
    },
    
    // Launchpad page
    launchpad: {
      title: "Slow Fun LAUNCHPAD",
      subtitle: "Finding opportunities within limitations",
      form: {
        title: "Launch Your Token",
        name: "Token Name",
        namePlaceholder: "Enter token name",
        symbol: "Token Symbol",
        symbolPlaceholder: "Enter token symbol (3-5 characters)",
        description: "Description",
        descriptionPlaceholder: "Describe your token",
        initialSupply: "Initial Supply",
        initialSupplyPlaceholder: "Enter initial supply",
        decimals: "Decimals",
        decimalsPlaceholder: "Number of decimal places",
        socialLinks: "Social Links",
        twitter: "Twitter",
        twitterPlaceholder: "Twitter URL",
        telegram: "Telegram",
        telegramPlaceholder: "Telegram URL",
        website: "Website",
        websitePlaceholder: "Website URL",
        launchButton: "Launch Token",
        connecting: "Connecting Wallet...",
        launching: "Launching Token...",
        success: "Token launched successfully!",
        error: "Launch failed. Please try again."
      },
      stats: {
        title: "Launch Statistics",
        todayLaunches: "Today's Launches",
        hourlyLimit: "Hourly Limit",
        remaining: "Remaining",
        totalLaunched: "Total Launched"
      },
      tokens: {
        title: "Recent Launches",
        name: "Name",
        symbol: "Symbol",
        launchTime: "Launch Time",
        initialPrice: "Initial Price",
        currentPrice: "Current Price",
        volume24h: "24h Volume"
      }
    },
    
    // Wallet components
    wallet: {
      connect: "Connect Wallet",
      disconnect: "Disconnect",
      copyAddress: "Copy Address",
      addressCopied: "Address copied!",
      balance: "Balance",
      insufficientBalance: "Insufficient balance",
      feeRequired: "Fee required: 0.1 SOL"
    },
    
    // Common
    common: {
      loading: "Loading...",
      error: "Error",
      success: "Success",
      cancel: "Cancel",
      confirm: "Confirm",
      back: "Back",
      next: "Next",
      submit: "Submit",
      close: "Close"
    }
  },
  
  zh: {
    // Navigation
    nav: {
      home: "首页",
      launchpad: "发射平台"
    },
    
    // Home page
    home: {
      title: "Slow Fun",
      subtitle: "因为有时候，慢一点就是快一点。",
      description: "一个具有早期计算机复古风格的Web3 MemeCoin发射平台。我们的核心理念是'刻意的限制带来更好的专注'。",
      features: {
        title: "平台特色",
        hourlyLimit: "每小时发射限制",
        limitDesc: "每小时最多10个代币",
        retroStyle: "复古终端风格",
        styleDesc: "早期计算机黑色背景配绿色文字",
        typewriter: "打字机效果",
        effectDesc: "真实的复古计算体验",
        web3: "Web3集成",
        web3Desc: "真实的Solana区块链交易"
      },
      stats: {
        title: "平台统计",
        totalLaunches: "总发射数",
        activeTokens: "活跃代币",
        totalVolume: "总交易量"
      },
      footer: "Slow Fun - 2024 - 在快节奏中寻找慢智慧"
    },
    
    // Launchpad page
    launchpad: {
      title: "Slow Fun 发射平台",
      subtitle: "在限制中寻找机会",
      form: {
        title: "发射你的代币",
        name: "代币名称",
        namePlaceholder: "输入代币名称",
        symbol: "代币符号",
        symbolPlaceholder: "输入代币符号（3-5个字符）",
        description: "描述",
        descriptionPlaceholder: "描述你的代币",
        initialSupply: "初始供应量",
        initialSupplyPlaceholder: "输入初始供应量",
        decimals: "小数位数",
        decimalsPlaceholder: "小数位数",
        socialLinks: "社交链接",
        twitter: "推特",
        twitterPlaceholder: "推特链接",
        telegram: "电报",
        telegramPlaceholder: "电报链接",
        website: "网站",
        websitePlaceholder: "网站链接",
        launchButton: "发射代币",
        connecting: "连接钱包中...",
        launching: "发射代币中...",
        success: "代币发射成功！",
        error: "发射失败，请重试。"
      },
      stats: {
        title: "发射统计",
        todayLaunches: "今日发射",
        hourlyLimit: "每小时限制",
        remaining: "剩余",
        totalLaunched: "总发射数"
      },
      tokens: {
        title: "最近发射",
        name: "名称",
        symbol: "符号",
        launchTime: "发射时间",
        initialPrice: "初始价格",
        currentPrice: "当前价格",
        volume24h: "24小时交易量"
      }
    },
    
    // Wallet components
    wallet: {
      connect: "连接钱包",
      disconnect: "断开连接",
      copyAddress: "复制地址",
      addressCopied: "地址已复制！",
      balance: "余额",
      insufficientBalance: "余额不足",
      feeRequired: "需要手续费：0.1 SOL"
    },
    
    // Common
    common: {
      loading: "加载中...",
      error: "错误",
      success: "成功",
      cancel: "取消",
      confirm: "确认",
      back: "返回",
      next: "下一步",
      submit: "提交",
      close: "关闭"
    }
  }
};

export type Language = 'en' | 'zh';
export type TranslationKey = keyof typeof translations.en; 