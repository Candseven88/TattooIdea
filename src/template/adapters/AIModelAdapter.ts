import { 
  ParsedInput, 
  ImageGenerationResult, 
  GenerationMode,
  UserInputParseParams,
  ImageGenerationParams
} from '../types';

/**
 * AI模型适配器接口
 * 所有AI提供商实现必须遵循此接口
 */
export interface AIModelAdapter {
  /**
   * 解析用户输入，提取关键设计元素
   * @param params 用户输入解析参数
   * @returns 解析结果
   */
  parseUserInput(params: UserInputParseParams): Promise<ParsedInput>;
  
  /**
   * 生成图像
   * @param params 图像生成参数
   * @returns 生成结果，包含图像URL
   */
  generateImage(params: ImageGenerationParams): Promise<ImageGenerationResult>;
  
  /**
   * 测试连接是否有效
   * @returns 连接测试结果
   */
  testConnection(): Promise<{ success: boolean; message?: string }>;
} 