import { AIModelAdapter } from './AIModelAdapter';
import { 
  ParsedInput, 
  ImageGenerationResult, 
  UserInputParseParams,
  ImageGenerationParams,
  AIModelConfig
} from '../types';

/**
 * OpenAI适配器实现
 */
export class OpenAIAdapter implements AIModelAdapter {
  private config: AIModelConfig;
  
  constructor(config: AIModelConfig) {
    this.config = config;
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
      
      console.log('Sending request to OpenAI API...');
      
      try {
        // OpenAI API URL
        const apiUrl = this.config.apiUrl || 'https://api.openai.com/v1/chat/completions';
        
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.config.apiKey}`
          },
          body: JSON.stringify({
            model: this.config.model || 'gpt-4',
            messages: [
              { role: "system", content: "You are a professional tattoo designer with decades of experience." },
              { role: "user", content: prompt }
            ],
            temperature: 0.7
          })
        });
        
        const data = await response.json();
        
        if (!response.ok) {
          console.error('OpenAI API error:', data);
          throw new Error('Our design service is currently experiencing high demand');
        }
        
        // 解析JSON响应
        const content = data.choices[0].message.content;
        console.log('OpenAI API content:', content.substring(0, 200) + '...');
        
        try {
          // 提取JSON部分
          const jsonMatch = content.match(/\{[\s\S]*\}/);
          if (jsonMatch) {
            return JSON.parse(jsonMatch[0]);
          } else {
            throw new Error('Invalid response format');
          }
        } catch (e) {
          console.error('Error parsing JSON from OpenAI:', e);
          throw new Error('The design service is temporarily unavailable');
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
      console.log('Sending request to DALL-E API...');
      
      // OpenAI DALL-E API URL
      const apiUrl = this.config.apiUrl || 'https://api.openai.com/v1/images/generations';
      
      const requestBody = {
        model: this.config.model || 'dall-e-3',
        prompt: prompt,
        n: 1,
        size: size || this.config.imageSize || '1024x1024',
        quality: "hd",
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
          console.error('DALL-E API error:', data);
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
      // 简单测试OpenAI API连接
      const apiUrl = this.config.apiUrl || 'https://api.openai.com/v1/chat/completions';
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.config.apiKey}`
        },
        body: JSON.stringify({
          model: this.config.model || 'gpt-4',
          messages: [{ role: "user", content: "Hello" }],
          max_tokens: 5
        })
      });
      
      if (response.ok) {
        return { success: true, message: "Successfully connected to OpenAI" };
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