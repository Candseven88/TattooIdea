/**
 * TattooIdea AI 模板
 * 
 * 这个模板提供了一个完整的纹身设计AI生成系统，支持多种AI提供商。
 * 主要功能包括用户输入解析、纹身设计生成、写实纹身效果图生成等。
 */

// 导出类型
export * from './types';

// 导出适配器
export * from './adapters';

// 导出服务
export { aiService, AIService } from './services/aiService';

// 导出API函数
export { 
  generateTattooDesign,
  validateRealisticModeInput
} from './api/generate';

// 导出配置
export { 
  DEFAULT_PROMPT_TEMPLATES,
  DEFAULT_TEMPLATE_CONFIG,
  EXAMPLES,
  getConfig
} from './config'; 