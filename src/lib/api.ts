import { GenerationMode } from '@/lib/types';

/**
 * 验证写实模式输入
 * @param mode 生成模式
 * @param placement 选择的身体部位ID
 * @param gender 选择的性别ID
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
 * @param provider AI提供商，默认为'zhipu'
 * @returns 生成结果，包含图像URL和解析输入
 */
export async function generateTattooDesign(
  idea: string,
  style: string | null,
  placement: string | null,
  gender: string | null,
  mode: GenerationMode,
  provider: string = 'zhipu'
) {
  try {
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        idea,
        style,
        placement: mode === 'realistic' ? placement : null,
        gender: mode === 'realistic' ? gender : null,
        mode,
        provider
      }),
    });
    
    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.error || 'Our design service is currently experiencing high demand. Please try again in a few moments.');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error in generateTattooDesign:', error);
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error('We\'re experiencing technical difficulties. Please try again later.');
    }
  }
} 

/**
 * Generate ambigram designs using SiliconFlow API and font overlay
 * @param firstWord First word for the ambigram
 * @param secondWord Second word for the ambigram
 * @param style Selected style for the ambigram
 * @param font Selected font for the text overlay
 * @returns Array of generated design URLs
 */
export async function generateAmbigramDesign(
  firstWord: string,
  secondWord: string,
  style: string,
  font: string
) {
  try {
    const response = await fetch('/api/generate-ambigram', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstWord: firstWord.trim(),
        secondWord: secondWord.trim(),
        style,
        font
      }),
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.error || 'Failed to generate ambigram designs. Please try again later.');
    }

    return await response.json();
  } catch (error) {
    console.error('Error in generateAmbigramDesign:', error);
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error('We\'re experiencing technical difficulties. Please try again later.');
    }
  }
} 