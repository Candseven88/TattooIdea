import { AIModelAdapter } from './AIModelAdapter';
import { ZhipuAdapter } from './ZhipuAdapter';
import { OpenAIAdapter } from './OpenAIAdapter';
import { StabilityAIAdapter } from './StabilityAIAdapter';
import { AIProvider, AIModelConfig } from '../types';

/**
 * 适配器工厂函数，根据提供商创建相应的适配器实例
 * @param provider AI提供商
 * @param config 模型配置
 * @returns 适配器实例
 */
export function createAIModelAdapter(provider: AIProvider, config: AIModelConfig): AIModelAdapter {
  switch (provider) {
    case 'zhipu':
      return new ZhipuAdapter(config);
    case 'openai':
      return new OpenAIAdapter(config);
    case 'stabilityai':
      return new StabilityAIAdapter(config);
    case 'custom':
      // 自定义适配器的处理逻辑
      throw new Error('Custom adapter requires implementation');
    default:
      throw new Error(`Unsupported AI provider: ${provider}`);
  }
}

export * from './AIModelAdapter';
export * from './ZhipuAdapter';
export * from './OpenAIAdapter';
export * from './StabilityAIAdapter'; 