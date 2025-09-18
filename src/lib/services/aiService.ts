import { API_CONFIG, PROMPT_TEMPLATES } from '@/lib/config';
import { TattooStyle, TattooPlacement, GenderOption, ParsedInput, GenerationMode } from '@/lib/types';

/**
 * 解析用户输入，使用AI分析纹身创意
 * @param idea 纹身创意
 * @param selectedStyle 选择的风格
 * @param placement 选择的身体部位
 * @param gender 选择的性别
 * @param tattooStyles 纹身风格数据
 * @param tattooPlacements 身体部位数据
 * @param genderOptions 性别选项数据
 * @param provider AI提供商，默认为'zhipu'
 * @returns 解析结果
 */
export async function parseUserInput(
  idea: string, 
  selectedStyle: string | null, 
  placement: string | null, 
  gender: string | null,
  tattooStyles: TattooStyle[],
  tattooPlacements: TattooPlacement[],
  genderOptions: GenderOption[],
  provider: string = 'zhipu'
): Promise<ParsedInput> {
  try {
    // 根据提供商选择不同的API密钥和URL
    let API_KEY = '';
    let API_URL = '';
    let MODEL = '';
    
    if (provider === 'stabilityai') {
      // 高级模式使用OpenAI进行文本分析
      API_KEY = process.env.OPENAI_API_KEY || '';
      API_URL = 'https://api.openai.com/v1/chat/completions';
      MODEL = 'gpt-4o';
    } else {
      // 基础模式使用智谱AI
      API_KEY = process.env.ZHIPUAI_API_KEY || '';
      API_URL = API_CONFIG.GLM_API_URL;
      MODEL = API_CONFIG.GLM_MODEL;
    }
    
    if (!API_KEY) {
      throw new Error('Service temporarily unavailable');
    }
    
    console.log(`Parsing user input with ${provider === 'stabilityai' ? 'OpenAI' : 'GLM-4'}...`);
    
    const styleName = selectedStyle ? 
      tattooStyles.find(s => s.id === selectedStyle)?.name : null;
    
    const placementName = placement ?
      tattooPlacements.find(p => p.id === placement)?.name : null;
    
    const genderName = gender ?
      genderOptions.find(g => g.id === gender)?.name : null;
    
    // 替换提示模板中的变量
    const prompt = PROMPT_TEMPLATES.userInputAnalysis
      .replace('{{idea}}', idea)
      .replace('{{selectedStyle}}', styleName ? `Selected Tattoo Style: ${styleName}` : 'No specific tattoo style was selected')
      .replace('{{selectedPlacement}}', placementName ? `Selected Body Placement: ${placementName}` : 'No specific body placement was selected')
      .replace('{{selectedGender}}', genderName ? `Selected Gender: ${genderName}` : 'No specific gender was selected');
    
    try {
      let response;
      let data;
      
      if (provider === 'stabilityai') {
        // OpenAI API调用
        console.log('Sending request to OpenAI API...');
        
        const messages = [
          { role: "system", content: "You are a professional tattoo designer with decades of experience." },
          { role: "user", content: prompt }
        ];
        
        response = await fetch(API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${API_KEY}`
          },
          body: JSON.stringify({
            model: MODEL,
            messages: messages,
            temperature: 0.7
          })
        });
        
        data = await response.json();
        
        if (!response.ok) {
          console.error('OpenAI API error:', data);
          throw new Error('Our design service is currently experiencing high demand');
        }
        
        // 解析JSON字符串
        const content = data.choices[0].message.content;
        console.log('OpenAI API content:', content.substring(0, 200) + '...');
        
        // 提取JSON部分
        const jsonMatch = content.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          return JSON.parse(jsonMatch[0]);
        } else {
          throw new Error('Invalid response format');
        }
      } else {
        // 智谱AI GLM API调用
        console.log('Sending request to GLM API...');
        
        const messages = [
          {
            role: "user",
            content: prompt
          }
        ];
        
        response = await fetch(API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${API_KEY}`
          },
          body: JSON.stringify({
            model: MODEL,
            messages: messages,
            temperature: 0.7,
            top_p: 0.8
          })
        });
        
        data = await response.json();
        
        console.log('GLM API response status:', response.status);
        
        if (!response.ok) {
          console.error('GLM API error:', data);
          throw new Error('Our design service is currently experiencing high demand');
        }
        
        // 解析JSON字符串
        const content = data.choices[0].message.content;
        console.log('GLM API content:', content.substring(0, 200) + '...');
        
        return extractAndParseJson(content);
      }
    } catch (error) {
      console.error('Network or API error:', error);
      throw new Error('Our design service is currently experiencing high demand. Please try again in a few moments.');
    }
  } catch (error) {
    console.error('Error parsing user input:', error);
    // 如果解析失败，返回基本结构
    const placementText = placement ? 
      ` on ${tattooPlacements.find(p => p.id === placement)?.name || 'body'}` : '';
    
    const styleName = selectedStyle ? 
      tattooStyles.find(s => s.id === selectedStyle)?.name || 'custom' : '';
    
    const genderText = gender ?
      ` for ${genderOptions.find(g => g.id === gender)?.name || 'person'}` : '';
    
    const formattedPrompt = `Professional tattoo design of ${idea}${styleName ? ` in ${styleName} style` : ''}${placementText}${genderText}, highly detailed artwork, created by master tattoo artist`;
    
    // 创建基本的设计分析
    return {
      mainElements: `Design concept for "${idea}" featuring clean lines and balanced composition.`,
      colorScheme: `For this ${styleName || 'custom'} style tattoo, a palette of black and gray outlines would work well, with potential for custom colors to be added by the tattoo artist based on your preference.`,
      placement: placement ? `This design is optimized for the ${tattooPlacements.find(p => p.id === placement)?.name || 'body'} placement, considering the natural contours and visibility of this area.` : `This design can be adapted to various body placements, though the size and some details may need adjustment depending on your chosen location.`,
      styleNotes: selectedStyle ? `This design incorporates key elements of the ${styleName} tattoo style, including its characteristic linework, composition, and artistic approach.` : `This design follows classic tattoo principles with clean lines and bold elements that will age well over time.`,
      additionalDetails: `This tattoo concept can be further customized with personal elements or color preferences. A professional tattoo artist can help refine the design to perfectly match your vision.`,
      formattedPrompt: formattedPrompt
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
 * @param tattooStyles 风格数据
 * @param tattooPlacements 身体部位数据
 * @param genderOptions 性别选项数据
 * @param provider AI提供商，默认为'zhipu'
 * @returns 生成的图像URL
 */
export async function generateImage(
  parsedInput: ParsedInput, 
  selectedStyle: string | null, 
  placement: string | null, 
  gender: string | null, 
  mode: GenerationMode,
  tattooStyles: TattooStyle[],
  tattooPlacements: TattooPlacement[],
  genderOptions: GenderOption[],
  provider: string = 'zhipu'
) {
  try {
    // 根据提供商选择不同的API密钥和URL
    let API_KEY = '';
    let API_URL = '';
    let MODEL = '';
    
    if (provider === 'stabilityai') {
      // 高级模式使用StabilityAI
      API_KEY = process.env.STABILITYAI_API_KEY || '';
      API_URL = 'https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image';
      MODEL = 'stable-diffusion-xl-1024-v1-0';
      
      // 检查是否需要使用OpenAI生成设计分析信息
      const needDesignAnalysis = !parsedInput.mainElements || 
                              !parsedInput.colorScheme || 
                              !parsedInput.styleNotes || 
                              !parsedInput.placement || 
                              !parsedInput.additionalDetails;
      
      // 如果缺少设计分析信息，使用OpenAI生成
      if (needDesignAnalysis) {
        try {
          console.log('Generating design analysis with OpenAI...');
          const OPENAI_API_KEY = process.env.OPENAI_API_KEY || '';
          
          if (OPENAI_API_KEY) {
            const styleName = selectedStyle ? 
              tattooStyles.find(s => s.id === selectedStyle)?.name : null;
            
            const placementName = placement ?
              tattooPlacements.find(p => p.id === placement)?.name : null;
            
            const genderName = gender ?
              genderOptions.find(g => g.id === gender)?.name : null;
            
            // 替换提示模板中的变量
            const prompt = PROMPT_TEMPLATES.userInputAnalysis
              .replace('{{idea}}', parsedInput.formattedPrompt || '')
              .replace('{{selectedStyle}}', styleName ? `Selected Tattoo Style: ${styleName}` : 'No specific tattoo style was selected')
              .replace('{{selectedPlacement}}', placementName ? `Selected Body Placement: ${placementName}` : 'No specific body placement was selected')
              .replace('{{selectedGender}}', genderName ? `Selected Gender: ${genderName}` : 'No specific gender was selected');
            
            const response = await fetch('https://api.openai.com/v1/chat/completions', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${OPENAI_API_KEY}`
              },
              body: JSON.stringify({
                model: 'gpt-4o',
                messages: [
                  { role: "system", content: "You are a professional tattoo designer with decades of experience." },
                  { role: "user", content: prompt }
                ],
                temperature: 0.7
              })
            });
            
            const data = await response.json();
            
            if (response.ok) {
              const content = data.choices[0].message.content;
              console.log('OpenAI design analysis:', content.substring(0, 200) + '...');
              
              // 提取JSON部分
              const jsonMatch = content.match(/\{[\s\S]*\}/);
              if (jsonMatch) {
                const analysisData = JSON.parse(jsonMatch[0]);
                
                // 合并分析数据到parsedInput
                parsedInput = {
                  ...parsedInput,
                  mainElements: analysisData.mainElements || parsedInput.mainElements,
                  colorScheme: analysisData.colorScheme || parsedInput.colorScheme,
                  placement: analysisData.placement || parsedInput.placement,
                  styleNotes: analysisData.styleNotes || parsedInput.styleNotes,
                  additionalDetails: analysisData.additionalDetails || parsedInput.additionalDetails
                };
              }
            }
          } else {
            // 如果没有OpenAI API密钥，创建基本设计分析
            console.log('No OpenAI API key, creating basic design analysis...');
            
            const idea = parsedInput.formattedPrompt || '';
            const styleName = selectedStyle ? 
              tattooStyles.find(s => s.id === selectedStyle)?.name || 'custom' : 'custom';
            const placementName = placement ?
              tattooPlacements.find(p => p.id === placement)?.name || 'body' : 'body';
            
            // 创建基本的设计分析
            parsedInput = {
              ...parsedInput,
              mainElements: parsedInput.mainElements || `Design concept for "${idea}" featuring clean lines and balanced composition.`,
              colorScheme: parsedInput.colorScheme || `For this ${styleName} style tattoo, a palette of black and gray outlines would work well, with potential for custom colors to be added by the tattoo artist based on your preference.`,
              placement: parsedInput.placement || (placement ? `This design is optimized for the ${placementName} placement, considering the natural contours and visibility of this area.` : `This design can be adapted to various body placements, though the size and some details may need adjustment depending on your chosen location.`),
              styleNotes: parsedInput.styleNotes || (selectedStyle ? `This design incorporates key elements of the ${styleName} tattoo style, including its characteristic linework, composition, and artistic approach.` : `This design follows classic tattoo principles with clean lines and bold elements that will age well over time.`),
              additionalDetails: parsedInput.additionalDetails || `This tattoo concept can be further customized with personal elements or color preferences. A professional tattoo artist can help refine the design to perfectly match your vision.`
            };
          }
        } catch (error) {
          console.error('Error generating design analysis:', error);
          
          // 即使出错，也创建基本设计分析
          const idea = parsedInput.formattedPrompt || '';
          const styleName = selectedStyle ? 
            tattooStyles.find(s => s.id === selectedStyle)?.name || 'custom' : 'custom';
          const placementName = placement ?
            tattooPlacements.find(p => p.id === placement)?.name || 'body' : 'body';
          
          // 创建基本的设计分析
          parsedInput = {
            ...parsedInput,
            mainElements: parsedInput.mainElements || `Design concept for "${idea}" featuring clean lines and balanced composition.`,
            colorScheme: parsedInput.colorScheme || `For this ${styleName} style tattoo, a palette of black and gray outlines would work well, with potential for custom colors to be added by the tattoo artist based on your preference.`,
            placement: parsedInput.placement || (placement ? `This design is optimized for the ${placementName} placement, considering the natural contours and visibility of this area.` : `This design can be adapted to various body placements, though the size and some details may need adjustment depending on your chosen location.`),
            styleNotes: parsedInput.styleNotes || (selectedStyle ? `This design incorporates key elements of the ${styleName} tattoo style, including its characteristic linework, composition, and artistic approach.` : `This design follows classic tattoo principles with clean lines and bold elements that will age well over time.`),
            additionalDetails: parsedInput.additionalDetails || `This tattoo concept can be further customized with personal elements or color preferences. A professional tattoo artist can help refine the design to perfectly match your vision.`
          };
        }
      }
    } else {
      // 基础模式使用智谱AI
      API_KEY = process.env.ZHIPUAI_API_KEY || '';
      API_URL = API_CONFIG.COGVIEW_API_URL;
      MODEL = API_CONFIG.COGVIEW_MODEL;
    }
    
    if (!API_KEY) {
      throw new Error('Service temporarily unavailable');
    }
    
    // 构建基础提示
    let basePrompt = parsedInput.formattedPrompt || '';
    
    // 如果用户选择了风格但格式化提示中未包含，添加它
    if (selectedStyle) {
      const styleName = tattooStyles.find(s => s.id === selectedStyle)?.name;
      if (styleName && !basePrompt.toLowerCase().includes(styleName.toLowerCase())) {
        basePrompt += `, in ${styleName} tattoo style`;
      }
    }
    
    // 根据模式生成不同的提示
    if (mode === 'design') {
      // 设计模式：强调清晰设计，不强调身体部位
      const designPrompt = PROMPT_TEMPLATES.designModePrompt.replace('{{basePrompt}}', basePrompt);
      
      console.log('Design prompt:', designPrompt);
      
      if (provider === 'stabilityai') {
        // 使用StabilityAI生成图像
        console.log('Sending request to StabilityAI API (SDXL 1.0)...');
        
        // 准备SDXL 1.0 API请求
        const requestBody = {
          text_prompts: [
            {
              text: designPrompt,
              weight: 1
            }
          ],
          cfg_scale: 7,
          height: 1024,
          width: 1024,
          samples: 1,
          steps: 30,
          style_preset: 'line-art'
        };
        
        try {
          const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${API_KEY}`,
              'Accept': 'application/json'
            },
            body: JSON.stringify(requestBody)
          });
          
          if (!response.ok) {
            const errorData = await response.json();
            console.error('StabilityAI API error:', errorData);
            throw new Error(`StabilityAI API error: ${response.status} ${response.statusText}`);
          }
          
          const data = await response.json();
          
          if (!data.artifacts || !data.artifacts[0] || !data.artifacts[0].base64) {
            throw new Error('Invalid response from StabilityAI API');
          }
          
          // 构建数据URL
          const imageUrl = `data:image/png;base64,${data.artifacts[0].base64}`;
          
          return {
            designUrl: imageUrl,
            parsedInput: parsedInput // 确保返回解析的输入信息
          };
        } catch (error) {
          console.error('Network or API error:', error);
          throw new Error('Our design service is currently experiencing high demand. Please try again in a few moments.');
        }
      } else {
        // 使用智谱AI Cogview API
        console.log('Sending request to Cogview API...');
        
        const requestBody = {
          model: MODEL,
          prompt: designPrompt,
          size: API_CONFIG.IMAGE_SIZE
        };
        
        try {
          const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${API_KEY}`
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
            designUrl: data.data[0].url
          };
        } catch (error) {
          console.error('Network or API error:', error);
          throw new Error('Our design service is currently experiencing high demand. Please try again in a few moments.');
        }
      }
    } else if (mode === 'realistic') {
      // 写实模式：强调真实感和身体部位
      const placementName = placement ? tattooPlacements.find(p => p.id === placement)?.name : '';
      const genderName = gender ? genderOptions.find(g => g.id === gender)?.name : '';
      
      const realisticPrompt = PROMPT_TEMPLATES.realisticModePrompt
        .replace('{{basePrompt}}', basePrompt)
        .replace('{{placement}}', placementName || '')
        .replace('{{gender}}', genderName || '');
      
      console.log('Realistic prompt:', realisticPrompt);
      
      if (provider === 'stabilityai') {
        // 使用StabilityAI生成图像
        console.log('Sending request to StabilityAI API (SDXL 1.0)...');
        
        // 准备SDXL 1.0 API请求
        const requestBody = {
          text_prompts: [
            {
              text: realisticPrompt,
              weight: 1
            }
          ],
          cfg_scale: 7,
          height: 1024,
          width: 1024,
          samples: 1,
          steps: 30,
          style_preset: 'photographic'
        };
        
        try {
          const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${API_KEY}`,
              'Accept': 'application/json'
            },
            body: JSON.stringify(requestBody)
          });
          
          if (!response.ok) {
            const errorData = await response.json();
            console.error('StabilityAI API error:', errorData);
            throw new Error(`StabilityAI API error: ${response.status} ${response.statusText}`);
          }
          
          const data = await response.json();
          
          if (!data.artifacts || !data.artifacts[0] || !data.artifacts[0].base64) {
            throw new Error('Invalid response from StabilityAI API');
          }
          
          // 构建数据URL
          const imageUrl = `data:image/png;base64,${data.artifacts[0].base64}`;
          
          return {
            realisticUrl: imageUrl,
            parsedInput: parsedInput // 确保返回解析的输入信息
          };
        } catch (error) {
          console.error('Network or API error:', error);
          throw new Error('Our design service is currently experiencing high demand. Please try again in a few moments.');
        }
      } else {
        // 使用智谱AI Cogview API
        console.log('Sending request to Cogview API...');
        
        const requestBody = {
          model: MODEL,
          prompt: realisticPrompt,
          size: API_CONFIG.IMAGE_SIZE
        };
        
        try {
          const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${API_KEY}`
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
            realisticUrl: data.data[0].url
          };
        } catch (error) {
          console.error('Network or API error:', error);
          throw new Error('Our design service is currently experiencing high demand. Please try again in a few moments.');
        }
      }
    }
  } catch (error) {
    console.error('Error generating image:', error);
    throw error;
  }
}

/**
 * 获取模拟图像URL
 * @param mode 生成模式
 * @returns 模拟图像URL
 */
export function getMockImageUrl(mode: GenerationMode) {
  // 使用本地图像
  if (mode === 'design') {
    return '/Sketch.png'; // 公共目录中的本地图像
  } else {
    return '/Realistic.png'; // 公共目录中的本地图像
  }
} 

/**
 * 从可能包含代码块标记的内容中提取并解析JSON
 * @param content 可能包含代码块标记的内容
 * @returns 解析后的JSON对象
 */
function extractAndParseJson(content: string): any {
  // 移除可能的代码块标记
  let jsonContent = content;
  
  // 移除开头的```json或```
  jsonContent = jsonContent.replace(/^```(json)?\s*/, '');
  
  // 移除结尾的```
  jsonContent = jsonContent.replace(/\s*```$/, '');
  
  // 解析JSON
  return JSON.parse(jsonContent);
} 