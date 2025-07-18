# SLOW_WITTED - 复古风格Web3 MemeCoin发射平台

## 项目概述

SLOW_WITTED 是一个具有早期计算机复古风格的Web3 MemeCoin发射平台。我们的核心理念是"刻意的限制带来更好的专注"。

### 设计理念

- **复古终端风格**: 黑色背景，绿色文字，CRT扫描线效果
- **打字机效果**: 文字逐个出现，营造早期计算机的交互体验
- **限制性设计**: 每小时仅允许发射10个MemeCoin，强制用户慢下来思考
- **专注导向**: 通过限制数量，提高每个项目的关注度和质量

## 技术栈

### 前端
- **Next.js 14**: React框架，支持App Router
- **TypeScript**: 类型安全
- **Tailwind CSS**: 样式框架，自定义复古终端主题
- **Framer Motion**: 动画效果
- **VT323字体**: 复古终端字体

### Web3集成
- **Solana Web3.js**: Solana区块链交互
- **Solana Wallet Adapter**: 钱包连接
- **Meteora SDK**: 流动性池和DEX功能

## 功能特性

### 主页 (Home)
- 项目理念展示
- 打字机效果的文字动画
- 实时时钟显示
- 统计信息展示

### 发射平台 (LaunchPad)
- 代币创建表单（支持名称、符号、描述、社交链接）
- 每小时限制计数器（最多10个/小时）
- 实时倒计时
- 最近发射代币列表
- Solana钱包集成
- 错误处理和成功消息

### 后端API
- `/api/launch` - 代币发射API（POST/GET）
- `/api/tokens` - 代币列表API（GET/POST）
- 发射限制验证
- 实时统计更新

### 钱包功能
- 支持Phantom、Solflare等主流Solana钱包
- 钱包状态显示
- 连接状态管理

## 安装和运行

### 环境要求
- Node.js 18+
- npm 或 yarn

### 安装依赖
```bash
npm install
```

### 开发模式
```bash
npm run dev
```

### 构建生产版本
```bash
npm run build
npm start
```

## 项目结构

```
slowwitted/
├── app/
│   ├── components/
│   │   ├── TypingEffect.tsx      # 打字机效果组件
│   │   ├── WalletConnect.tsx     # 钱包连接组件
│   │   ├── LaunchpadForm.tsx     # 发射表单组件
│   │   └── TokenList.tsx         # 代币列表组件
│   ├── launchpad/
│   │   └── page.tsx              # 发射平台页面
│   ├── globals.css               # 全局样式
│   ├── layout.tsx                # 根布局
│   └── page.tsx                  # 主页
├── public/                       # 静态资源
├── package.json                  # 项目配置
├── tailwind.config.js           # Tailwind配置
├── tsconfig.json                # TypeScript配置
└── README.md                    # 项目说明
```

## 设计特色

### 复古终端风格
- 黑色背景 (#0a0a0a)
- 绿色文字 (#00ff00)
- CRT扫描线效果
- 故障效果 (Glitch)
- 打字机光标动画

### 交互体验
- 文字逐个出现效果
- 悬停动画
- 加载动画
- 响应式设计

## 限制机制

### 发射限制
- 每小时最多10个MemeCoin
- 自动重置计数器
- 实时倒计时显示
- 剩余次数提示

### 费用结构
- 发射费用: 0.1 SOL
- 初始流动性: 用户自定义
- 总计费用实时计算

## 开发计划

### 已完成
- [x] 基础项目结构
- [x] 复古终端UI设计
- [x] 打字机效果
- [x] 钱包连接
- [x] 发射表单
- [x] 代币列表

### 待完成
- [x] Meteora SDK集成
- [x] 基础代币创建功能
- [x] 发射限制系统
- [x] API后端集成
- [x] 错误处理
- [ ] 完整Meteora流动性池集成
- [ ] 价格图表
- [ ] 交易功能
- [ ] 用户仪表板

## 贡献指南

1. Fork 项目
2. 创建功能分支
3. 提交更改
4. 推送到分支
5. 创建Pull Request

## 许可证

MIT License

## 联系方式

- 项目名称: SLOW_WITTED
- 理念: 在快节奏中寻找慢智慧
- 目标: 通过限制创造专注

---

*"现在所有的LaunchPad都太聪明了，我们需要刻意的降低自己，慢一点。大家的注意力会更佳集中。"* 