# TattooIdea AI 模板

这个模板提供了一个完整的纹身设计AI生成系统，支持多种AI提供商，包括智谱AI、OpenAI等。该模板基于适配器模式设计，使您可以轻松切换不同的AI提供商，同时保留所有已有的业务逻辑。

## 特性

- **多AI提供商支持**：支持智谱AI、OpenAI，可扩展支持其他提供商
- **适配器模式**：模块化的AI适配器架构，易于扩展和维护
- **用户输入解析**：使用大语言模型分析用户输入，提取关键设计元素
- **专业提示词构建**：根据用户输入和选择自动构建专业的提示词
- **多种生成模式**：支持设计模式（纹身草图）和写实模式（真实皮肤效果）
- **错误处理**：完善的错误处理和回退机制
- **模拟模式**：当API未配置时使用本地图像进行模拟

## 快速开始

### 安装

将整个`template`目录复制到您的项目中，然后在需要使用的地方导入：

```typescript
import { aiService, generateTattooDesign } from '@/template';
```

### 配置

1. 创建`.env.local`文件，添加以下配置：

```
# 选择AI提供商: zhipu, openai, stabilityai
AI_PROVIDER=zhipu

# 智谱AI配置
ZHIPUAI_API_KEY=your_zhipu_api_key_here

# OpenAI配置
OPENAI_API_KEY=your_openai_api_key_here

# StabilityAI配置
STABILITYAI_API_KEY=your_stabilityai_api_key_here
```

### 基本使用

```typescript
import { generateTattooDesign } from '@/template';
import { tattooStyles, tattooPlacements, genderOptions } from '@/data/tattooStyles';

// 在组件或API路由中使用
async function handleGenerate() {
  try {
    const result = await generateTattooDesign(
      "Wolf with blue eyes", // 创意描述
      "japanese",           // 风格ID
      "forearm",            // 身体部位ID（写实模式必填）
      "male",               // 性别ID（写实模式必填）
      "design",             // 生成模式："design" 或 "realistic"
      tattooStyles,         // 风格数据
      tattooPlacements,     // 身体部位数据
      genderOptions         // 性别选项数据
    );
    
    if (result.success) {
      // 处理生成结果
      console.log("设计URL:", result.designUrl);
      console.log("写实URL:", result.realisticUrl);
      console.log("解析结果:", result.parsedInput);
    }
  } catch (error) {
    console.error("生成失败:", error);
  }
}
```

## 模板结构

```
template/
├── adapters/                 # AI适配器实现
│   ├── AIModelAdapter.ts     # 适配器接口
│   ├── ZhipuAdapter.ts       # 智谱AI适配器
│   ├── OpenAIAdapter.ts      # OpenAI适配器
│   └── index.ts              # 适配器工厂
├── api/                      # API函数
│   └── generate.ts           # 生成纹身设计API
├── config/                   # 配置文件
│   └── index.ts              # 默认配置和提示模板
├── services/                 # 服务层
│   └── aiService.ts          # AI服务实现
├── types/                    # 类型定义
│   └── index.ts              # 模板类型定义
├── index.ts                  # 模板入口
└── README.md                 # 文档
```

## 高级使用

### 自定义AI适配器

如果您需要使用其他AI提供商，可以创建自己的适配器：

1. 创建新的适配器类，实现`AIModelAdapter`接口：

```typescript
import { AIModelAdapter } from '@/template/adapters/AIModelAdapter';
import { 
  ParsedInput, 
  ImageGenerationResult, 
  UserInputParseParams,
  ImageGenerationParams,
  AIModelConfig
} from '@/template/types';

export class CustomAdapter implements AIModelAdapter {
  private config: AIModelConfig;
  
  constructor(config: AIModelConfig) {
    this.config = config;
  }
  
  async parseUserInput(params: UserInputParseParams): Promise<ParsedInput> {
    // 实现您的自定义逻辑
  }
  
  async generateImage(params: ImageGenerationParams): Promise<ImageGenerationResult> {
    // 实现您的自定义逻辑
  }
  
  async testConnection(): Promise<{ success: boolean; message?: string }> {
    // 实现您的自定义逻辑
  }
}
```

2. 在适配器工厂中注册您的适配器：

```typescript
// src/template/adapters/index.ts
import { CustomAdapter } from './CustomAdapter';

export function createAIModelAdapter(provider: AIProvider, config: AIModelConfig): AIModelAdapter {
  switch (provider) {
    case 'zhipu':
      return new ZhipuAdapter(config);
    case 'openai':
      return new OpenAIAdapter(config);
    // 添加您的自定义适配器
    case 'custom':
      return new CustomAdapter(config);
    default:
      throw new Error(`Unsupported AI provider: ${provider}`);
  }
}
```

### 自定义提示模板

您可以自定义提示模板以获得更好的生成结果：

```typescript
import { DEFAULT_TEMPLATE_CONFIG } from '@/template';

// 创建自定义配置
const customConfig = {
  ...DEFAULT_TEMPLATE_CONFIG,
  promptTemplates: {
    ...DEFAULT_TEMPLATE_CONFIG.promptTemplates,
    // 自定义提示模板
    designModePrompt: `Custom tattoo design blueprint: {{basePrompt}}, your custom prompt here`
  }
};

// 使用自定义配置初始化服务
// 注意：这需要修改aiService的实现，添加接受自定义配置的功能
```

## 数据结构

### 风格数据示例

```typescript
const tattooStyles = [
  {
    id: "japanese",
    name: "Japanese",
    description: "Traditional Japanese tattoos feature bold outlines, vibrant colors and common motifs like koi fish, dragons, and cherry blossoms."
  },
  {
    id: "minimalist",
    name: "Minimalist",
    description: "Minimalist tattoos use clean lines, negative space, and simple designs to create elegant and subtle artwork."
  },
  // 更多风格...
];
```

### 身体部位数据示例

```typescript
const tattooPlacements = [
  {
    id: "forearm",
    name: "Forearm",
    description: "The forearm is one of the most popular and versatile tattoo placements.",
    suitableFor: ["Small", "Medium", "Large", "Text"]
  },
  {
    id: "back",
    name: "Back",
    description: "The back provides the largest canvas for tattoos, perfect for large, detailed designs.",
    suitableFor: ["Medium", "Large", "Full body"]
  },
  // 更多部位...
];
```

### 性别选项数据示例

```typescript
const genderOptions = [
  {
    id: "male",
    name: "Male",
    description: "Masculine body type with typically more angular features and less body fat."
  },
  {
    id: "female",
    name: "Female",
    description: "Feminine body type with typically more curved features."
  },
  // 更多选项...
];
```

## 故障排除

### API密钥未配置

如果您看到"No API key configured, using mock response"的警告，请检查您的环境变量是否正确设置。模板会在API未配置时使用本地图像进行模拟。

### 连接测试失败

使用`aiService.testConnection()`测试AI提供商连接：

```typescript
const result = await aiService.testConnection();
if (result.success) {
  console.log("连接成功:", result.message);
} else {
  console.error("连接失败:", result.message);
}
```

### 生成失败

如果生成失败，请检查：

1. API密钥是否有效
2. 网络连接是否正常
3. 写实模式是否提供了必要的身体部位和性别信息

## 贡献

欢迎贡献代码、报告问题或提出改进建议。

## 许可

MIT 