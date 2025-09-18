# TattooIdea AI 模板快速入门

本指南将帮助您在5分钟内完成模板的设置和使用。

## 1. 安装

将整个`template`目录复制到您的项目中：

```bash
# 假设您已经克隆了项目仓库
cp -r src/template /path/to/your/project/src/
```

## 2. 配置

创建`.env.local`文件，添加您的API密钥：

```
# 选择AI提供商
AI_PROVIDER=zhipu  # 或 openai, stabilityai

# 智谱AI (如果选择zhipu)
ZHIPUAI_API_KEY=your_zhipu_api_key_here

# OpenAI (如果选择openai)
OPENAI_API_KEY=your_openai_api_key_here
```

## 3. 创建API路由

在Next.js项目中创建API路由：

```typescript
// src/app/api/generate/route.ts (App Router)
// 或 src/pages/api/generate.ts (Pages Router)

import { NextResponse } from 'next/server';
import { generateTattooDesign } from '@/template';
import { tattooStyles, tattooPlacements, genderOptions } from '@/data/tattooStyles';

export async function POST(request: Request) {
  const { idea, style, placement, gender, mode = 'design' } = await request.json();
  
  try {
    const result = await generateTattooDesign(
      idea, style, placement, gender, mode,
      tattooStyles, tattooPlacements, genderOptions
    );
    
    return NextResponse.json({ success: true, ...result });
  } catch (error) {
    return NextResponse.json(
      { error: error.message || 'Generation failed' },
      { status: 500 }
    );
  }
}
```

## 4. 创建数据文件

```typescript
// src/data/tattooStyles.ts
export const tattooStyles = [
  {
    id: "japanese",
    name: "Japanese",
    description: "Traditional Japanese tattoo style"
  },
  {
    id: "minimalist",
    name: "Minimalist",
    description: "Clean and simple designs"
  }
];

export const tattooPlacements = [
  {
    id: "forearm",
    name: "Forearm",
    description: "Popular placement with good visibility",
    suitableFor: ["Small", "Medium", "Text"]
  }
];

export const genderOptions = [
  {
    id: "male",
    name: "Male",
    description: "Male body type"
  },
  {
    id: "female",
    name: "Female",
    description: "Female body type"
  }
];
```

## 5. 创建前端组件

```tsx
// src/components/TattooGenerator.tsx
import { useState } from 'react';
import { ParsedInput } from '@/template/types';

export default function TattooGenerator() {
  const [idea, setIdea] = useState('');
  const [result, setResult] = useState<{
    designUrl?: string;
    realisticUrl?: string;
    parsedInput?: ParsedInput;
  } | null>(null);
  const [loading, setLoading] = useState(false);
  
  const handleGenerate = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idea, mode: 'design' })
      });
      
      const data = await response.json();
      if (response.ok) {
        setResult(data);
      } else {
        alert(data.error || 'Generation failed');
      }
    } catch (error) {
      alert('Error: ' + (error.message || 'Unknown error'));
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div>
      <h1>Tattoo Generator</h1>
      <div>
        <textarea 
          value={idea} 
          onChange={(e) => setIdea(e.target.value)}
          placeholder="Describe your tattoo idea..."
        />
        <button 
          onClick={handleGenerate} 
          disabled={!idea.trim() || loading}
        >
          {loading ? 'Generating...' : 'Generate'}
        </button>
      </div>
      
      {result && (
        <div>
          <h2>Result</h2>
          {result.designUrl && (
            <div>
              <h3>Design</h3>
              <img src={result.designUrl} alt="Tattoo Design" />
            </div>
          )}
          {result.parsedInput && (
            <div>
              <h3>Analysis</h3>
              <pre>{JSON.stringify(result.parsedInput, null, 2)}</pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
```

## 6. 在页面中使用组件

```tsx
// src/app/page.tsx
import TattooGenerator from '@/components/TattooGenerator';

export default function Home() {
  return (
    <main>
      <TattooGenerator />
    </main>
  );
}
```

## 7. 运行项目

```bash
npm run dev
```

访问 http://localhost:3000 即可使用您的纹身生成器！

## 8. 下一步

- 查看完整文档：`src/template/README.md`
- 了解集成指南：`src/template/INTEGRATION.md`
- 探索模板结构，了解更多高级功能

## 常见问题

### 生成失败

- 检查API密钥是否正确配置
- 查看服务器控制台日志
- 确保网络连接正常

### 模拟模式

如果未配置API密钥，模板会使用模拟模式，返回本地图片。这对于开发和测试很有用。

### 获取帮助

如有问题，请参考完整文档或提交issue。 