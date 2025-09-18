import { AIModelAdapter } from './AIModelAdapter';
import { 
  ParsedInput, 
  ImageGenerationResult, 
  UserInputParseParams,
  ImageGenerationParams,
  AIModelConfig
} from '../types';

/**
 * StabilityAI适配器实现
 * 使用GPT语言模型和SDXL 1.0图像模型
 */
export class StabilityAIAdapter implements AIModelAdapter {
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
      
      console.log('Sending request to OpenAI API for text analysis...');
      
      try {
        // 使用OpenAI API进行文本分析
        const openaiApiUrl = this.config.openaiApiUrl || 'https://api.openai.com/v1/chat/completions';
        const openaiApiKey = this.config.openaiApiKey;
        
        if (!openaiApiKey) {
          throw new Error('OpenAI API key not configured for text analysis');
        }
        
        const response = await fetch(openaiApiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${openaiApiKey}`
          },
          body: JSON.stringify({
            model: this.config.openaiModel || 'gpt-4o',
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
      console.log('Sending request to Stability AI API (SDXL 1.0)...');
      
      // StabilityAI API URL
      const apiUrl = this.config.apiUrl || 'https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image';
      const apiKey = this.config.apiKey;
      
      if (!apiKey) {
        throw new Error('Stability AI API key not configured');
      }
      
      // 准备SDXL 1.0 API请求
      const requestBody = {
        text_prompts: [
          {
            text: prompt,
            weight: 1
          }
        ],
        cfg_scale: 7,
        height: 1024,
        width: 1024,
        samples: 1,
        steps: 30,
        style_preset: mode === 'design' ? 'line-art' : 'photographic'
      };
      
      try {
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
            'Accept': 'application/json'
          },
          body: JSON.stringify(requestBody)
        });
        
        if (!response.ok) {
          const errorData = await response.json();
          console.error('Stability AI API error:', errorData);
          throw new Error(`Stability AI API error: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        
        if (!data.artifacts || !data.artifacts[0] || !data.artifacts[0].base64) {
          throw new Error('Invalid response from Stability AI API');
        }
        
        // 构建数据URL
        const imageUrl = `data:image/png;base64,${data.artifacts[0].base64}`;
        
        return {
          url: imageUrl
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
      // 首先测试OpenAI API连接
      const openaiApiUrl = this.config.openaiApiUrl || 'https://api.openai.com/v1/chat/completions';
      const openaiApiKey = this.config.openaiApiKey;
      
      if (!openaiApiKey) {
        return { 
          success: false, 
          message: 'OpenAI API key not configured for text analysis' 
        };
      }
      
      const openaiResponse = await fetch(openaiApiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${openaiApiKey}`
        },
        body: JSON.stringify({
          model: this.config.openaiModel || 'gpt-4o',
          messages: [{ role: "user", content: "Hello" }],
          max_tokens: 5
        })
      });
      
      if (!openaiResponse.ok) {
        const error = await openaiResponse.json();
        return { 
          success: false, 
          message: `OpenAI connection failed: ${error.error?.message || JSON.stringify(error)}` 
        };
      }
      
      // 然后测试StabilityAI API连接
      const stabilityApiUrl = this.config.apiUrl || 'https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image';
      const stabilityApiKey = this.config.apiKey;
      
      if (!stabilityApiKey) {
        return { 
          success: false, 
          message: 'Stability AI API key not configured' 
        };
      }
      
      // 只测试API密钥有效性，不实际生成图像
      const stabilityResponse = await fetch('https://api.stability.ai/v1/user/account', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${stabilityApiKey}`
        }
      });
      
      if (!stabilityResponse.ok) {
        const error = await stabilityResponse.json();
        return { 
          success: false, 
          message: `Stability AI connection failed: ${error.message || JSON.stringify(error)}` 
        };
      }
      
      return { 
        success: true, 
        message: "Successfully connected to OpenAI and Stability AI" 
      };
    } catch (error) {
      return { 
        success: false, 
        message: `Connection failed: ${error instanceof Error ? error.message : String(error)}` 
      };
    }
  }
} 