import { NextResponse } from 'next/server';
import { tattooStyles, tattooPlacements, genderOptions } from '@/data/tattooStyles';
import { parseUserInput, generateImage, getMockImageUrl } from '@/lib/services/aiService';
import { GenerationMode } from '@/lib/types';

// Handle POST request to generate tattoo design
export async function POST(request: Request) {
  try {
    const { idea, style, placement, gender, mode = 'design', provider = 'zhipu' } = await request.json();

    console.log('Request received:', { idea, style, placement, gender, mode, provider });

    // Validate input
    if (!idea || typeof idea !== 'string') {
      return NextResponse.json(
        { error: 'Please provide a valid tattoo idea' },
        { status: 400 }
      );
    }
    
    // Validate that realistic mode requires body placement and gender
    if (mode === 'realistic') {
      if (!placement) {
        return NextResponse.json(
          { error: 'Body placement is required for realistic mode' },
          { status: 400 }
        );
      }
      
      if (!gender) {
        return NextResponse.json(
          { error: 'Gender is required for realistic mode' },
          { status: 400 }
        );
      }
    }

    // 检查是否为高级模式（StabilityAI）
    const isPremiumMode = provider === 'stabilityai';
    
    // 检查API密钥配置
    let isApiConfigured = false;
    
    if (isPremiumMode) {
      // 高级模式需要同时配置OpenAI和StabilityAI的API密钥
      isApiConfigured = !!process.env.STABILITYAI_API_KEY && !!process.env.OPENAI_API_KEY;
    } else {
      // 基础模式只需要智谱AI的API密钥
      isApiConfigured = !!process.env.ZHIPUAI_API_KEY;
    }
    
    if (!isApiConfigured) {
      console.warn(`API keys not configured for ${provider} provider, using mock response`);
      
      // Use mock response and safe image URL
      if (mode === 'design') {
        const mockDesignUrl = getMockImageUrl('design');
        
        // Simulate processing time
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // 创建基本的设计分析信息
        const mockParsedInput = {
          mainElements: `Design concept for "${idea}" featuring clean lines and balanced composition. The main focus is on creating a visually striking tattoo that captures the essence of ${idea}.`,
          colorScheme: `Black and gray outlines form the foundation of this design, creating strong contrast and definition. The design allows for custom colors to be added by your tattoo artist based on your preference, though it works beautifully as a monochromatic piece as well.`,
          placement: placement ? 
            `This design is specifically optimized for the ${tattooPlacements.find(p => p.id === placement)?.name || 'body'}, taking into account the natural contours and movement of this area. The size and proportions have been carefully considered to ensure the design flows naturally with your body.` : 
            `This versatile design can be adapted to various body placements. Depending on your chosen location, the size and some details may need adjustment to ensure optimal visual impact and longevity of the tattoo.`,
          styleNotes: style ? 
            `This design incorporates key elements of the ${tattooStyles.find(s => s.id === style)?.name || 'custom'} tattoo style, including its characteristic linework, composition techniques, and artistic approach. The style's unique aesthetic has been carefully preserved while adapting it to your specific concept.` : 
            `This design follows classic tattoo principles with clean lines and bold elements that will age well over time. The composition balances detail with simplicity to ensure the tattoo remains clear and impactful for years to come.`,
          additionalDetails: `This tattoo concept can be further customized with personal elements or color preferences. Consider discussing with your tattoo artist about incorporating meaningful symbols or adjusting certain elements to make the design uniquely yours. The current design provides an excellent foundation that a skilled artist can build upon.`,
          formattedPrompt: `Professional tattoo design of ${idea}${style ? ` in ${tattooStyles.find(s => s.id === style)?.name || 'custom'} style` : ''}, highly detailed artwork, created by master tattoo artist`
        };
        
        return NextResponse.json({
          success: true,
          designUrl: mockDesignUrl,
          idea,
          style: style || 'default',
          placement: placement || 'none',
          gender: gender || 'none',
          parsedInput: mockParsedInput
        });
      } else {
        const mockRealisticUrl = getMockImageUrl('realistic');
        
        // Simulate processing time
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // 创建基本的设计分析信息
        const mockParsedInput = {
          mainElements: `Realistic visualization of a "${idea}" tattoo as it would appear on actual skin. The design captures the natural texture and depth that would be achieved by a skilled tattoo artist, showing how the ink would settle into the skin.`,
          colorScheme: `The color palette balances vibrant tattoo pigments with natural skin tones, creating a realistic representation of a healed tattoo. Subtle shading and highlights add dimension and make the design appear three-dimensional against the skin.`,
          placement: placement ? 
            `This visualization shows how the tattoo would look specifically on the ${tattooPlacements.find(p => p.id === placement)?.name || 'body'} of a ${gender ? genderOptions.find(g => g.id === gender)?.name.toLowerCase() || 'person' : 'person'}. The design conforms to the natural anatomy of this area, demonstrating how it would wrap around curves and move with the body.` : 
            `This design shows how the tattoo would appear on skin, though it can be adapted to your preferred body placement. The current visualization gives you a realistic expectation of how the final tattoo would look once healed.`,
          styleNotes: style ? 
            `This realistic rendering shows how a ${tattooStyles.find(s => s.id === style)?.name || 'custom'} style tattoo would appear when expertly applied. The characteristic elements of this style have been faithfully represented, showing the depth and texture achievable with proper technique.` : 
            `This realistic visualization demonstrates professional tattoo application techniques, showing the depth, saturation, and detail that can be achieved by an experienced artist. The rendering mimics the look of a fully healed tattoo with settled ink.`,
          additionalDetails: `This visualization represents how the tattoo would look shortly after healing. Over time, the tattoo may soften slightly as the skin continues to heal. Proper aftercare and sun protection will help maintain the vibrancy and clarity of the design for years to come. Your tattoo artist may suggest minor adjustments to optimize the design for your specific skin tone and type.`,
          formattedPrompt: `Realistic tattoo of ${idea}${style ? ` in ${tattooStyles.find(s => s.id === style)?.name || 'custom'} style` : ''} on ${gender ? genderOptions.find(g => g.id === gender)?.name.toLowerCase() || 'person' : 'person'}'s ${placement ? tattooPlacements.find(p => p.id === placement)?.name.toLowerCase() || 'body' : 'body'}`
        };
        
        return NextResponse.json({
          success: true,
          realisticUrl: mockRealisticUrl,
          idea,
          style: style || 'default',
          placement: placement || 'none',
          gender: gender || 'none',
          parsedInput: mockParsedInput
        });
      }
    }

    console.log(`Using ${isPremiumMode ? 'premium' : 'standard'} mode to generate designs`);

    try {
      // 1. Parse user input
      const parsedInput = await parseUserInput(
        idea, 
        style, 
        placement, 
        gender, 
        tattooStyles, 
        tattooPlacements, 
        genderOptions,
        provider
      );
      console.log('Parsed input:', parsedInput);
      
      // 2. Generate image
      const imageResults = await generateImage(
        parsedInput, 
        style, 
        placement, 
        gender, 
        mode as GenerationMode,
        tattooStyles,
        tattooPlacements,
        genderOptions,
        provider
      );
      console.log('Generated image URLs:', imageResults);

      return NextResponse.json({
        success: true,
        ...imageResults,
        idea,
        style: style || 'default',
        placement: placement || 'none',
        gender: gender || 'none',
        parsedInput // Optional: Return parsed input for debugging or display to user
      });
    } catch (apiError) {
      console.error('API service error:', apiError);
      // Return user-friendly error message without mentioning API
      return NextResponse.json(
        { error: 'Our design service is currently experiencing high demand. Please try again in a few moments.' },
        { status: 503 }
      );
    }
  } catch (error) {
    console.error('Error generating tattoo design:', error);
    return NextResponse.json(
      { error: 'We\'re experiencing technical difficulties. Please try again later.' },
      { status: 500 }
    );
  }
} 