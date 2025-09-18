# TattooIdea AI 模板集成指南

本文档提供了将 TattooIdea AI 模板集成到现有项目中的详细步骤和最佳实践。

## 集成步骤

### 1. 复制模板文件

将整个`template`目录复制到您的项目中，推荐放在`src`目录下：

```
src/
└── template/
    ├── adapters/
    ├── api/
    ├── config/
    ├── services/
    ├── types/
    ├── index.ts
    └── README.md
```

### 2. 配置环境变量

1. 复制`src/template/env.local.example`文件到项目根目录，重命名为`.env.local`（如果已存在，则合并内容）
2. 填写您的AI提供商API密钥和其他配置项

### 3. 安装依赖

确保您的项目安装了以下依赖：

```bash
npm install --save next react react-dom
```

### 4. 集成到API路由

#### Next.js 应用路由 (App Router)

创建一个API路由处理函数：

```typescript
// src/app/api/generate/route.ts
import { NextResponse } from 'next/server';
import { generateTattooDesign, validateRealisticModeInput } from '@/template';
import { tattooStyles, tattooPlacements, genderOptions } from '@/data/tattooStyles';

export async function POST(request: Request) {
  try {
    const { idea, style, placement, gender, mode = 'design' } = await request.json();

    // 验证输入
    if (!idea || typeof idea !== 'string') {
      return NextResponse.json(
        { error: 'Please provide a valid tattoo idea' },
        { status: 400 }
      );
    }
    
    // 验证写实模式输入
    const validationError = validateRealisticModeInput(mode, placement, gender);
    if (validationError) {
      return NextResponse.json(
        { error: validationError },
        { status: 400 }
      );
    }

    try {
      // 调用模板生成函数
      const result = await generateTattooDesign(
        idea,
        style,
        placement,
        gender,
        mode,
        tattooStyles,
        tattooPlacements,
        genderOptions
      );

      return NextResponse.json({
        success: true,
        ...result
      });
    } catch (apiError) {
      console.error('API service error:', apiError);
      return NextResponse.json(
        { error: 'Our design service is currently experiencing high demand. Please try again in a few moments.' },
        { status: 503 }
      );
    }
  } catch (error) {
    console.error('Error generating tattoo design:', error);
    return NextResponse.json(
      { error: 'We\'re experiencing technical difficulties. Please try again later.' },
      { status: 500 }
    );
  }
}
```

#### Next.js 页面路由 (Pages Router)

```typescript
// src/pages/api/generate.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { generateTattooDesign, validateRealisticModeInput } from '@/template';
import { tattooStyles, tattooPlacements, genderOptions } from '@/data/tattooStyles';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { idea, style, placement, gender, mode = 'design' } = req.body;

    // 验证输入
    if (!idea || typeof idea !== 'string') {
      return res.status(400).json({ error: 'Please provide a valid tattoo idea' });
    }
    
    // 验证写实模式输入
    const validationError = validateRealisticModeInput(mode, placement, gender);
    if (validationError) {
      return res.status(400).json({ error: validationError });
    }

    try {
      // 调用模板生成函数
      const result = await generateTattooDesign(
        idea,
        style,
        placement,
        gender,
        mode,
        tattooStyles,
        tattooPlacements,
        genderOptions
      );

      return res.status(200).json({
        success: true,
        ...result
      });
    } catch (apiError) {
      console.error('API service error:', apiError);
      return res.status(503).json({ 
        error: 'Our design service is currently experiencing high demand. Please try again in a few moments.' 
      });
    }
  } catch (error) {
    console.error('Error generating tattoo design:', error);
    return res.status(500).json({ 
      error: 'We\'re experiencing technical difficulties. Please try again later.' 
    });
  }
}
```

### 5. 集成到前端组件

```tsx
// src/components/TattooForm.tsx
import React, { useState } from 'react';
import { GenerationMode, ParsedInput } from '@/template/types';

interface TattooFormProps {
  onGenerate?: (designUrl: string, realisticUrl: string, parsedInput: ParsedInput | null) => void;
}

const TattooForm = ({ onGenerate }: TattooFormProps) => {
  const [idea, setIdea] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('');
  const [selectedPlacement, setSelectedPlacement] = useState('');
  const [selectedGender, setSelectedGender] = useState('');
  const [generationMode, setGenerationMode] = useState<GenerationMode>('design');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState('');
  
  const handleGenerate = async () => {
    if (!idea.trim()) return;
    
    setIsGenerating(true);
    setError('');
    
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          idea,
          style: selectedStyle || null,
          placement: generationMode === 'realistic' ? selectedPlacement : null,
          gender: generationMode === 'realistic' ? selectedGender : null,
          mode: generationMode
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate tattoo design');
      }
      
      if (onGenerate) {
        onGenerate(data.designUrl || '', data.realisticUrl || '', data.parsedInput || null);
      }
      
    } catch (err) {
      console.error('Error generating tattoo:', err);
      setError(err instanceof Error ? err.message : 'Failed to generate tattoo design');
    } finally {
      setIsGenerating(false);
    }
  };
  
  return (
    <div>
      {/* 表单实现 */}
      <textarea
        value={idea}
        onChange={(e) => setIdea(e.target.value)}
        placeholder="Describe your tattoo idea..."
      />
      
      {/* 其他表单字段 */}
      
      <button 
        onClick={handleGenerate}
        disabled={!idea.trim() || isGenerating}
      >
        {isGenerating ? 'Generating...' : 'Generate Tattoo'}
      </button>
      
      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default TattooForm;
```

## 数据准备

### 创建风格、身体部位和性别数据

```typescript
// src/data/tattooStyles.ts

export const tattooStyles = [
  {
    id: "japanese",
    name: "Japanese",
    description: "Traditional Japanese tattoos feature bold outlines, vibrant colors and common motifs like koi fish, dragons, and cherry blossoms."
  },
  // 添加更多风格...
];

export const tattooPlacements = [
  {
    id: "forearm",
    name: "Forearm",
    description: "The forearm is one of the most popular and versatile tattoo placements.",
    suitableFor: ["Small", "Medium", "Large", "Text"]
  },
  // 添加更多身体部位...
];

export const genderOptions = [
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
  // 添加更多选项...
];
```

## 高级集成

### 自定义错误处理

您可以根据需要自定义错误处理逻辑：

```typescript
try {
  // 调用模板生成函数
  const result = await generateTattooDesign(...);
  
  // 处理成功结果
} catch (error) {
  // 自定义错误处理
  if (error.message.includes('API key')) {
    // 处理API密钥错误
  } else if (error.message.includes('high demand')) {
    // 处理服务繁忙错误
  } else {
    // 处理其他错误
  }
}
```

### 自定义模拟图像

如果您想使用自己的模拟图像，可以修改`aiService.getMockImageUrl`方法：

```typescript
// 创建自定义服务扩展
import { AIService } from '@/template';

class CustomAIService extends AIService {
  public getMockImageUrl(mode: GenerationMode): string {
    // 使用自定义本地图像
    if (mode === 'design') {
      return '/custom-design-mock.png';
    } else {
      return '/custom-realistic-mock.png';
    }
  }
}

// 使用自定义服务
const customAiService = new CustomAIService();
```

### 监控和日志

为了更好地监控API调用和性能，可以添加日志记录：

```typescript
import { aiService } from '@/template';
import { logger } from '@/utils/logger'; // 您的日志工具

// 扩展aiService添加日志
const originalParseUserInput = aiService.parseUserInput.bind(aiService);
aiService.parseUserInput = async (...args) => {
  const startTime = Date.now();
  logger.info('Starting user input parsing', { idea: args[0] });
  
  try {
    const result = await originalParseUserInput(...args);
    const duration = Date.now() - startTime;
    
    logger.info('User input parsing completed', { 
      duration, 
      success: true 
    });
    
    return result;
  } catch (error) {
    const duration = Date.now() - startTime;
    
    logger.error('User input parsing failed', { 
      duration, 
      error: error.message 
    });
    
    throw error;
  }
};
```

## 故障排除

### 环境变量未加载

确保您的环境变量正确加载。在Next.js中，您可能需要重启开发服务器以使新的环境变量生效。

### TypeScript 类型错误

如果遇到类型错误，确保您的`tsconfig.json`包含模板目录：

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", "src/**/*"]
}
```

### API调用失败

如果API调用失败，请检查：

1. 网络请求是否正确发送（检查浏览器网络面板）
2. API路由是否正确实现
3. 服务器日志中是否有错误信息

## 迁移指南

如果您已经有现有的AI生成逻辑，以下是迁移到此模板的步骤：

1. 识别现有代码中的关键组件：
   - 用户输入解析逻辑
   - 提示词构建逻辑
   - 图像生成API调用
   - 错误处理

2. 将现有的提示模板迁移到`config/index.ts`中的`DEFAULT_PROMPT_TEMPLATES`

3. 如果您使用的是模板支持的AI提供商，可以直接使用现有适配器；否则，创建自定义适配器

4. 逐步替换现有代码，先从API层开始，然后是服务层，最后是UI组件

## 性能优化

- **缓存结果**：考虑缓存生成结果，避免重复生成相同的内容
- **批处理请求**：如果需要生成多个图像，考虑批处理请求
- **优化提示词**：精心设计提示词可以显著提高生成质量和速度

## 安全注意事项

- **API密钥保护**：确保API密钥仅在服务器端使用，不要暴露给前端
- **输入验证**：始终验证用户输入，防止注入攻击
- **速率限制**：实施速率限制，防止API滥用

## 支持

如果您在集成过程中遇到任何问题，请参考以下资源：

- 查阅模板的README.md文件
- 检查各个适配器的实现细节
- 查看AI提供商的官方文档 