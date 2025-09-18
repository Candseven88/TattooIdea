/**
 * 模板核心类型定义
 */

// 生成模式类型
export type GenerationMode = 'design' | 'realistic';

// AI提供商类型
export type AIProvider = 'zhipu' | 'openai' | 'stabilityai' | 'custom';

// 解析输入结果类型
export interface ParsedInput {
  mainElements?: string;
  colorScheme?: string;
  placement?: string;
  styleNotes?: string;
  additionalDetails?: string;
  formattedPrompt?: string;
}

// 风格类型
export interface Style {
  id: string;
  name: string;
  description: string;
}

// 身体部位类型
export interface Placement {
  id: string;
  name: string;
  description: string;
  suitableFor: string[];
}

// 性别选项类型
export interface GenderOption {
  id: string;
  name: string;
  description: string;
}

// 图像生成结果
export interface ImageGenerationResult {
  url: string;
  [key: string]: any; // 允许不同提供商返回额外字段
}

// 图像生成请求参数
export interface ImageGenerationParams {
  prompt: string;
  mode: GenerationMode;
  size: string;
  additionalParams?: Record<string, any>;
}

// 用户输入解析参数
export interface UserInputParseParams {
  idea: string;
  style: string | null;
  placement: string | null;
  gender: string | null;
  additionalContext: Record<string, any>;
}

// AI模型配置
export interface AIModelConfig {
  apiKey: string;
  apiUrl?: string;
  model?: string;
  imageSize?: string;
  openaiApiKey?: string; // 用于StabilityAI适配器的OpenAI API密钥
  openaiApiUrl?: string; // 用于StabilityAI适配器的OpenAI API URL
  openaiModel?: string; // 用于StabilityAI适配器的OpenAI模型
  imageModel?: string; // 图像模型名称
  isPremium?: boolean; // 是否为高级付费模式
  [key: string]: any; // 允许不同提供商的额外配置
}

// 提示模板
export interface PromptTemplates {
  userInputAnalysis: string;
  designModePrompt: string;
  realisticModePrompt: string;
  [key: string]: string; // 允许自定义额外的提示模板
}

// 模板配置
export interface TemplateConfig {
  provider: AIProvider;
  modelConfigs: Record<AIProvider, AIModelConfig>;
  promptTemplates: PromptTemplates;
  defaultImageSize: string;
}

// 生成选项
export interface GenerationOptions {
  provider: AIProvider;
  isPremium: boolean;
  price?: number;
} 