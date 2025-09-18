import { AIModelAdapter } from './AIModelAdapter';
import { 
  ParsedInput, 
  ImageGenerationResult, 
  UserInputParseParams,
  ImageGenerationParams,
  AIModelConfig
} from '../types';

/**
 * 智谱AI适配器实现
 */
export class ZhipuAdapter implements AIModelAdapter {
  private config: AIModelConfig;
  
  constructor(config: AIModelConfig) {
    this.config = config;
  }
  
  /**
   * 从可能包含代码块标记的内容中提取并解析JSON
   * @param content 可能包含代码块标记的内容
   * @returns 解析后的JSON对象
   */
  private extractAndParseJson(content: string): any {
    // 移除可能的代码块标记
    let jsonContent = content;
    
    // 移除开头的```json或```
    jsonContent = jsonContent.replace(/^```(json)?\s*/, '');
    
    // 移除结尾的```
    jsonContent = jsonContent.replace(/\s*```$/, '');
    
    // 解析JSON
    return JSON.parse(jsonContent);
  }
  
  async parseUserInput(params: UserInputParseParams): Promise<ParsedInput> {
    try {
      const { idea, style, placement, gender, additionalContext } = params;
      const { promptTemplates } = additionalContext;
      
      // 替换提示模板中的变量
      const prompt = promptTemplates.userInputAnalysis
        .replace('{{idea}}', idea)
        .replace('{{selectedStyle}}', style ? `Selected Tattoo Style: ${style}` : 'No specific tattoo style was selected')
        .replace('{{selectedPlacement}}', placement ? `Selected Body Placement: ${placement}` : 'No specific body placement was selected')
        .replace('{{selectedGender}}', gender ? `Selected Gender: ${gender}` : 'No specific gender was selected');
      
      const messages = [
        {
          role: "user",
          content: prompt
        }
      ];
      
      console.log('Sending request to GLM API...');
      
      try {
        // 智谱AI GLM API URL
        const apiUrl = this.config.apiUrl || 'https://open.bigmodel.cn/api/paas/v4/chat/completions';
        
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.config.apiKey}`
          },
          body: JSON.stringify({
            model: this.config.model || 'glm-4',
            messages: messages,
            temperature: 0.7,
            top_p: 0.8
          })
        });
        
        const data = await response.json();
        
        console.log('GLM API response status:', response.status);
        
        if (!response.ok) {
          console.error('GLM API error:', data);
          throw new Error('Our design service is currently experiencing high demand');
        }
        
        // 解析JSON字符串
        const content = data.choices[0].message.content;
        console.log('GLM API content:', content.substring(0, 200) + '...');
        
        try {
          const parsedContent = this.extractAndParseJson(content);
          return parsedContent;
        } catch (e) {
          console.error('Error parsing JSON from GLM-4:', e);
          console.log('Raw content:', content);
          // 如果JSON解析失败，尝试提取JSON部分
          const jsonMatch = content.match(/\{[\s\S]*\}/);
          if (jsonMatch) {
            try {
              return JSON.parse(jsonMatch[0]);
            } catch {
              throw new Error('The design service is temporarily unavailable');
            }
          } else {
            throw new Error('The design service is temporarily unavailable');
          }
        }
      } catch (error) {
        console.error('Network or API error:', error);
        throw new Error('Our design service is currently experiencing high demand. Please try again in a few moments.');
      }
    } catch (error) {
      console.error('Error parsing user input:', error);
      
      // 如果解析失败，返回基本结构
      return {
        mainElements: params.idea,
        formattedPrompt: `Professional tattoo design of ${params.idea}${params.style ? ` in ${params.style} style` : ''}${params.placement ? ` on ${params.placement}` : ''}${params.gender ? ` for ${params.gender}` : ''}, highly detailed artwork, created by master tattoo artist`
      };
    }
  }
  
  async generateImage(params: ImageGenerationParams): Promise<ImageGenerationResult> {
    try {
      const { prompt, mode, size, additionalParams } = params;
      
      console.log(`${mode.charAt(0).toUpperCase() + mode.slice(1)} prompt:`, prompt);
      console.log('Sending request to Cogview API...');
      
      // 智谱AI Cogview API URL
      const apiUrl = this.config.apiUrl || 'https://open.bigmodel.cn/api/paas/v4/images/generations';
      
      const requestBody = {
        model: this.config.model || 'cogview-3',
        prompt: prompt,
        size: size || this.config.imageSize || '1024x1024',
        ...additionalParams
      };
      
      try {
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.config.apiKey}`
          },
          body: JSON.stringify(requestBody)
        });
        
        const data = await response.json();
        
        if (!response.ok) {
          console.error('Cogview API error:', data);
          throw new Error('Our design service is currently experiencing high demand');
        }
        
        if (!data.data || !data.data[0] || !data.data[0].url) {
          throw new Error('Our design service is temporarily unavailable');
        }
        
        return {
          url: data.data[0].url
        };
      } catch (error) {
        console.error('Network or API error:', error);
        throw new Error('Our design service is currently experiencing high demand. Please try again in a few moments.');
      }
    } catch (error) {
      console.error('Error generating image:', error);
      throw error;
    }
  }
  
  async testConnection(): Promise<{ success: boolean; message?: string }> {
    try {
      // 简单测试智谱API连接
      const apiUrl = this.config.apiUrl || 'https://open.bigmodel.cn/api/paas/v4/chat/completions';
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.config.apiKey}`
        },
        body: JSON.stringify({
          model: this.config.model || 'glm-4',
          messages: [{ role: "user", content: "Hello" }],
          max_tokens: 5
        })
      });
      
      if (response.ok) {
        return { success: true, message: "Successfully connected to Zhipu AI" };
      } else {
        const error = await response.json();
        return { 
          success: false, 
          message: `Connection failed: ${error.error?.message || JSON.stringify(error)}` 
        };
      }
    } catch (error) {
      return { 
        success: false, 
        message: `Connection failed: ${error instanceof Error ? error.message : String(error)}` 
      };
    }
  }
} 