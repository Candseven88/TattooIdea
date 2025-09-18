# TattooIdea - AI纹身设计生成器

TattooIdea是一个AI驱动的纹身设计生成器，帮助用户根据文本描述创建个性化的纹身设计。

## 特性

- 基于文本描述生成纹身设计
- 支持多种纹身风格
- 提供设计模式和写实模式
- 智能分析用户输入，提取关键设计元素
- 支持多种AI提供商（智谱AI和StabilityAI）

## 技术栈

- Next.js
- React
- TypeScript
- Tailwind CSS
- PayPal集成
- AI集成：
  - 基础模式：智谱AI (GLM-4 + Cogview-3)
  - 高级模式：OpenAI (GPT-4o) + StabilityAI (Stable Diffusion 3.5 Large)

## 安装与设置

1. 克隆仓库：
   ```
   git clone https://github.com/Candseven88/TattooIdea.git
   cd TattooIdea
   ```

2. 安装依赖：
   ```
   npm install
   ```

3. 配置环境变量：
   - 复制`.env.local.example`为`.env.local`
   - 填写必要的API密钥和配置

4. 启动开发服务器：
   ```
   npm run dev
   ```

## 环境变量

- `ZHIPUAI_API_KEY`: 智谱AI API密钥（基础模式）
- `OPENAI_API_KEY`: OpenAI API密钥（高级模式文本分析）
- `STABILITYAI_API_KEY`: StabilityAI API密钥（高级模式图像生成）
- `NEXT_PUBLIC_API_ENABLED`: 是否启用API调用
- `NEXT_PUBLIC_PREMIUM_MODE_ENABLED`: 是否启用高级模式
- `NEXT_PUBLIC_PAYPAL_CLIENT_ID`: PayPal客户端ID
- `NEXT_PUBLIC_PAYPAL_CURRENCY`: PayPal货币代码
- `NEXT_PUBLIC_PAYPAL_MODE`: PayPal模式（sandbox或production）

## 使用方法

1. 访问网站首页
2. 输入纹身创意描述
3. 选择纹身风格（可选）
4. 选择生成模式（设计或写实）
5. 如果选择写实模式，还需选择性别和身体部位
6. 选择是否使用高级模式（如果启用）
7. 点击生成按钮，完成支付
8. 查看生成的纹身设计

## 模式说明

### 基础模式（免费）

- 使用智谱AI的GLM-4进行文本分析
- 使用智谱AI的Cogview-3生成图像
- 适合一般纹身设计需求

### 高级模式（付费）

- 使用OpenAI的GPT-4o进行文本分析
- 使用StabilityAI的Stable Diffusion 3.5 Large生成图像
- 提供更高质量、更精确的纹身设计
- 更好的提示词遵循度和细节表现

## 项目结构

```
TattooIdea/
├── public/            # 静态资源
├── src/
│   ├── app/           # Next.js应用路由
│   ├── components/    # React组件
│   ├── data/          # 数据文件
│   ├── lib/           # 工具函数和服务
│   │   ├── services/  # 服务层
│   │   └── template/  # AI模板
│   └── styles/        # 全局样式
├── .env.local.example # 环境变量示例
└── README.md          # 项目文档
```

## 贡献

欢迎贡献代码、报告问题或提出改进建议。

## 许可

MIT License
