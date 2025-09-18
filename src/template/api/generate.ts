import { aiService } from '../services/aiService';
import { GenerationMode, ParsedInput } from '../types';

/**
 * 验证写实模式输入
 * @param mode 生成模式
 * @param placement 选择的身体部位
 * @param gender 选择的性别
 * @returns 错误信息，如果没有错误则返回空字符串
 */
export function validateRealisticModeInput(
  mode: GenerationMode,
  placement: string | null,
  gender: string | null
): string {
  if (mode === 'realistic') {
    if (!placement && !gender) {
      return 'For realistic mode, please select gender and body placement';
    } else if (!placement) {
      return 'For realistic mode, please select a body placement';
    } else if (!gender) {
      return 'For realistic mode, please select a gender';
    }
  }
  return '';
}

/**
 * 生成纹身设计
 * @param idea 纹身创意描述
 * @param style 选择的风格ID
 * @param placement 选择的身体部位ID
 * @param gender 选择的性别ID
 * @param mode 生成模式
 * @param styles 风格数据
 * @param placements 身体部位数据
 * @param genderOptions 性别选项数据
 * @returns 生成结果，包含图像URL和解析输入
 */
export async function generateTattooDesign(
  idea: string,
  style: string | null,
  placement: string | null,
  gender: string | null,
  mode: GenerationMode,
  styles: any[],
  placements: any[],
  genderOptions: any[]
): Promise<{
  designUrl?: string;
  realisticUrl?: string;
  parsedInput?: ParsedInput;
  success: boolean;
}> {
  try {
    // 验证输入
    if (!idea || typeof idea !== 'string') {
      throw new Error('Please provide a valid tattoo idea');
    }
    
    // 验证写实模式输入
    const validationError = validateRealisticModeInput(mode, placement, gender);
    if (validationError) {
      throw new Error(validationError);
    }
    
    // 检查API密钥是否配置
    const isApiConfigured = process.env.AI_API_KEY || 
      process.env.ZHIPUAI_API_KEY || 
      process.env.OPENAI_API_KEY || 
      process.env.STABILITYAI_API_KEY;
      
    if (!isApiConfigured) {
      console.warn('No API key configured, using mock response');
      
      // 使用模拟响应
      const mockImageUrl = aiService.getMockImageUrl(mode);
      
      // 模拟处理时间
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      return {
        success: true,
        [mode === 'design' ? 'designUrl' : 'realisticUrl']: mockImageUrl,
        parsedInput: {
          mainElements: idea,
          formattedPrompt: `Mock ${mode} mode for: ${idea}`
        }
      };
    }
    
    console.log('Using AI service to generate real designs');
    
    try {
      // 1. 解析用户输入
      const parsedInput = await aiService.parseUserInput(
        idea, 
        style, 
        placement, 
        gender, 
        styles, 
        placements, 
        genderOptions
      );
      
      console.log('Parsed input:', parsedInput);
      
      // 2. 生成图像
      const imageResults = await aiService.generateImage(
        parsedInput, 
        style, 
        placement, 
        gender, 
        mode,
        styles,
        placements,
        genderOptions
      );
      
      console.log('Generated image URLs:', imageResults);
      
      return {
        success: true,
        ...imageResults,
        parsedInput
      };
    } catch (apiError) {
      console.error('AI service error:', apiError);
      throw new Error('Our design service is currently experiencing high demand. Please try again in a few moments.');
    }
  } catch (error) {
    console.error('Error generating tattoo design:', error);
    throw error;
  }
} 