import { createAIModelAdapter } from '../adapters';
import { getConfig } from '../config';
import { 
  ParsedInput, 
  GenerationMode, 
  Style, 
  Placement, 
  GenderOption, 
  ImageGenerationResult 
} from '../types';

/**
 * AI服务类
 * 封装适配器的使用逻辑，提供统一的接口
 */
export class AIService {
  private static instance: AIService;
  private config = getConfig();
  private adapter = createAIModelAdapter(
    this.config.provider, 
    this.config.modelConfigs[this.config.provider]
  );
  
  /**
   * 获取单例实例
   */
  public static getInstance(): AIService {
    if (!AIService.instance) {
      AIService.instance = new AIService();
    }
    return AIService.instance;
  }
  
  /**
   * 重新初始化适配器（当配置改变时调用）
   */
  public reinitialize(): void {
    this.config = getConfig();
    this.adapter = createAIModelAdapter(
      this.config.provider, 
      this.config.modelConfigs[this.config.provider]
    );
  }
  
  /**
   * 解析用户输入
   * @param idea 纹身创意
   * @param selectedStyle 选择的风格
   * @param placement 选择的身体部位
   * @param gender 选择的性别
   * @param styles 风格数据
   * @param placements 身体部位数据
   * @param genderOptions 性别选项数据
   * @returns 解析结果
   */
  public async parseUserInput(
    idea: string, 
    selectedStyle: string | null, 
    placement: string | null, 
    gender: string | null,
    styles: Style[],
    placements: Placement[],
    genderOptions: GenderOption[]
  ): Promise<ParsedInput> {
    try {
      const styleName = selectedStyle ? 
        styles.find(s => s.id === selectedStyle)?.name || null : null;
      
      const placementName = placement ?
        placements.find(p => p.id === placement)?.name || null : null;
      
      const genderName = gender ?
        genderOptions.find(g => g.id === gender)?.name || null : null;
      
      return await this.adapter.parseUserInput({
        idea,
        style: styleName,
        placement: placementName,
        gender: genderName,
        additionalContext: {
          promptTemplates: this.config.promptTemplates,
          styles,
          placements,
          genderOptions
        }
      });
    } catch (error) {
      console.error('Error parsing user input:', error);
      
      // 如果解析失败，返回基本结构
      const placementText = placement ? 
        ` on ${placements.find(p => p.id === placement)?.name || 'body'}` : '';
      
      const styleName = selectedStyle ? 
        styles.find(s => s.id === selectedStyle)?.name || 'custom' : '';
      
      const genderText = gender ?
        ` for ${genderOptions.find(g => g.id === gender)?.name || 'person'}` : '';
      
      return {
        mainElements: idea,
        formattedPrompt: `Professional tattoo design of ${idea}${styleName ? ` in ${styleName} style` : ''}${placementText}${genderText}, highly detailed artwork, created by master tattoo artist`
      };
    }
  }
  
  /**
   * 生成纹身图像
   * @param parsedInput 解析后的输入
   * @param selectedStyle 选择的风格
   * @param placement 选择的身体部位
   * @param gender 选择的性别
   * @param mode 生成模式
   * @param styles 风格数据
   * @param placements 身体部位数据
   * @param genderOptions 性别选项数据
   * @returns 生成的图像URL
   */
  public async generateImage(
    parsedInput: ParsedInput, 
    selectedStyle: string | null, 
    placement: string | null, 
    gender: string | null, 
    mode: GenerationMode,
    styles: Style[],
    placements: Placement[],
    genderOptions: GenderOption[]
  ): Promise<{ designUrl?: string, realisticUrl?: string }> {
    try {
      // 构建基础提示
      let basePrompt = parsedInput.formattedPrompt || '';
      
      // 如果用户选择了风格但格式化提示中未包含，添加它
      if (selectedStyle) {
        const styleName = styles.find(s => s.id === selectedStyle)?.name;
        if (styleName && !basePrompt.toLowerCase().includes(styleName.toLowerCase())) {
          basePrompt += `, in ${styleName} tattoo style`;
        }
      }
      
      let finalPrompt: string;
      
      // 根据模式生成不同的提示
      if (mode === 'design') {
        // 设计模式：强调清晰设计，不强调身体部位
        finalPrompt = this.config.promptTemplates.designModePrompt.replace('{{basePrompt}}', basePrompt);
      } else {
        // 写实模式：强调特定身体部位的效果
        // 写实模式需要身体部位和性别
        if (!placement) {
          throw new Error('Body placement is required for realistic mode');
        }
        
        if (!gender) {
          throw new Error('Gender is required for realistic mode');
        }
        
        const placementName = placements.find(p => p.id === placement)?.name;
        if (!placementName) {
          throw new Error('Invalid body placement selected');
        }
        
        const genderName = genderOptions.find(g => g.id === gender)?.name;
        if (!genderName) {
          throw new Error('Invalid gender selected');
        }
        
        // 确保提示包含身体部位和性别
        if (!basePrompt.toLowerCase().includes(placementName.toLowerCase())) {
          basePrompt += `, on ${genderName.toLowerCase()} ${placementName.toLowerCase()}`;
        } else if (!basePrompt.toLowerCase().includes(genderName.toLowerCase())) {
          // 如果已包含部位但未包含性别，添加性别
          basePrompt = basePrompt.replace(placementName.toLowerCase(), `${genderName.toLowerCase()} ${placementName.toLowerCase()}`);
        }
        
        finalPrompt = this.config.promptTemplates.realisticModePrompt
          .replace('{{basePrompt}}', basePrompt)
          .replace('{{gender}}', genderName.toLowerCase())
          .replace('{{placement}}', placementName.toLowerCase());
      }
      
      // 调用适配器生成图像
      const result = await this.adapter.generateImage({
        prompt: finalPrompt,
        mode,
        size: this.config.defaultImageSize
      });
      
      // 返回结果
      return mode === 'design' 
        ? { designUrl: result.url }
        : { realisticUrl: result.url };
    } catch (error) {
      console.error('Error generating image:', error);
      throw error;
    }
  }
  
  /**
   * 获取模拟图像URL（当API未配置时使用）
   * @param mode 生成模式
   * @returns 模拟图像URL
   */
  public getMockImageUrl(mode: GenerationMode): string {
    // 使用本地图像
    if (mode === 'design') {
      return '/Sketch.png'; // 公共目录中的本地图像
    } else {
      return '/Realistic.png'; // 公共目录中的本地图像
    }
  }
  
  /**
   * 测试AI连接
   * @returns 连接测试结果
   */
  public async testConnection(): Promise<{ success: boolean; message?: string }> {
    try {
      return await this.adapter.testConnection();
    } catch (error) {
      return { 
        success: false, 
        message: `Connection test failed: ${error instanceof Error ? error.message : String(error)}` 
      };
    }
  }
}

// 导出单例实例
export const aiService = AIService.getInstance(); 