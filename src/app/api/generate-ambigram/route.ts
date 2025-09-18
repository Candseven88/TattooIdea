import { NextRequest, NextResponse } from 'next/server';
import sharp from 'sharp';
import * as path from 'path';
import fs from 'fs/promises';
import { 
  registerFonts, 
  generateTextLayer, 
  compositeTextOnBackground, 
  getFontForStyle,
  generateMockup
} from '@/lib/ambigramUtils';

// Define types for API request and response
interface AmbigramGenerationRequest {
  firstWord: string;
  secondWord: string;
  style: string;
  font?: string;
}

interface SiliconFlowResponse {
  images: { url: string }[];
  timings: { inference: number };
  seed: number;
}

export async function POST(req: NextRequest) {
  try {
    // Parse request body
    const { firstWord, secondWord, style, font } = await req.json() as AmbigramGenerationRequest;

    // Validate inputs
    if (!firstWord || !secondWord) {
      return NextResponse.json({ error: 'Both words are required' }, { status: 400 });
    }

    // Register fonts for use with canvas
    registerFonts();

    // Get appropriate font for the selected style if not specified
    const selectedFont = font || getFontForStyle(style);

    // Check if API key is available
    const apiKey = process.env.SILICON_FLOW_API_KEY;
    if (!apiKey) {
      console.warn('SILICON_FLOW_API_KEY not found, using mock data');
      return mockResponse(firstWord, secondWord, style, selectedFont);
    }

    // Generate background patterns using SiliconFlow API
    const backgroundPrompts = [
      `A decorative tattoo background pattern in ${style} style, symmetrical design, no text, suitable for ambigram tattoo`,
      `An ornate ${style} style tattoo background with decorative elements, symmetrical design, no text or letters`,
      `A detailed ${style} tattoo pattern with flourishes and symmetrical design, no text, black ink only`,
      `An elegant tattoo background with ${style} inspired decorative elements, symmetrical, no text`,
      `A ${style} style tattoo background with intricate details, perfectly symmetrical, no text or letters`,
      `A beautiful ${style} inspired tattoo pattern with decorative elements, symmetrical, no text`
    ];

    // Generate multiple designs in parallel
    const designPromises = backgroundPrompts.map(prompt => 
      generateBackgroundWithSiliconFlow(prompt, apiKey)
    );

    // Wait for all background images to be generated
    const backgroundUrls = await Promise.all(designPromises);
    
    // Generate text layer with the user's input words
    const textLayerBuffer = await generateTextLayer(firstWord, secondWord, selectedFont);
    
    // Overlay text on each background
    const designBuffers = await Promise.all(
      backgroundUrls.map(url => compositeTextOnBackground(url, textLayerBuffer))
    );
    
    // Save the composite images to public directory
    const designUrls = await Promise.all(
      designBuffers.map(async (buffer, index) => {
        const fileName = `ambigram-${Date.now()}-${index}.png`;
        const filePath = path.join(process.cwd(), 'public', 'generated', fileName);
        
        // Ensure directory exists
        await fs.mkdir(path.dirname(filePath), { recursive: true });
        
        // Write file
        await fs.writeFile(filePath, buffer);
        
        // Return public URL
        return `/generated/${fileName}`;
      })
    );
    
    // Generate mockup with the first design
    const mockupBuffer = await generateMockup(designBuffers[0]);
    const mockupFileName = `mockup-${Date.now()}.jpg`;
    const mockupFilePath = path.join(process.cwd(), 'public', 'generated', mockupFileName);
    await fs.writeFile(mockupFilePath, mockupBuffer);
    
    // Return the generated designs and mockup URLs
    return NextResponse.json({ 
      designs: designUrls,
      mockup: `/generated/${mockupFileName}`,
      message: 'Ambigram designs generated successfully'
    });
  } catch (error) {
    console.error('Error generating ambigram:', error);
    return NextResponse.json({ 
      error: 'Failed to generate ambigram designs' 
    }, { status: 500 });
  }
}

/**
 * Generate background pattern using SiliconFlow API
 */
async function generateBackgroundWithSiliconFlow(prompt: string, apiKey: string): Promise<string> {
  try {
    console.log('Calling SiliconFlow API with prompt:', prompt);
    
    const response = await fetch('https://api.siliconflow.cn/v1/images/generations', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'Kwai-Kolors/Kolors',
        prompt: prompt,
        image_size: '1024x1024',
        batch_size: 1,
        num_inference_steps: 20,
        guidance_scale: 7.5,
        negative_prompt: 'text, letters, words, characters, writing, signature, watermark'
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('SiliconFlow API error response:', errorText);
      throw new Error(`SiliconFlow API error: ${response.status}`);
    }

    const data = await response.json() as SiliconFlowResponse;
    console.log('SiliconFlow API response:', data);
    
    if (!data.images || !data.images[0] || !data.images[0].url) {
      throw new Error('Invalid response from SiliconFlow API');
    }
    
    return data.images[0].url;
  } catch (error) {
    console.error('Error calling SiliconFlow API:', error);
    throw new Error('Failed to generate background pattern');
  }
}

/**
 * Generate mock response for development without API key
 */
async function mockResponse(
  firstWord: string, 
  secondWord: string, 
  style: string, 
  font: string
): Promise<NextResponse> {
  try {
    console.log('Generating mock response with:', { firstWord, secondWord, style, font });
    
    // For development, create actual designs using the fonts
    const textLayerBuffer = await generateTextLayer(firstWord, secondWord, font);
    
    // Create plain backgrounds with different colors
    // Using darker backgrounds for better text visibility
    const backgroundColors = ['#222222', '#333333', '#444444', '#555555', '#666666', '#777777'];
    
    const designBuffers = await Promise.all(
      backgroundColors.map(async (color) => {
        // Create a colored background
        const backgroundBuffer = await sharp({
          create: {
            width: 1024,
            height: 1024,
            channels: 4,
            background: color
          }
        })
        .png()
        .toBuffer();
        
        // Overlay text on the background
        return await sharp(backgroundBuffer)
          .composite([
            {
              input: textLayerBuffer,
              gravity: 'center',
              blend: 'over'
            }
          ])
          .png()
          .toBuffer();
      })
    );
    
    // Save the designs
    const designUrls = await Promise.all(
      designBuffers.map(async (buffer, index) => {
        const fileName = `ambigram-mock-${Date.now()}-${index}.png`;
        const filePath = path.join(process.cwd(), 'public', 'generated', fileName);
        
        // Ensure directory exists
        await fs.mkdir(path.dirname(filePath), { recursive: true });
        
        // Write file
        await fs.writeFile(filePath, buffer);
        
        // Return public URL
        return `/generated/${fileName}`;
      })
    );
    
    // Generate mockup with the first design
    const mockupBuffer = await generateMockup(designBuffers[0]);
    const mockupFileName = `mockup-${Date.now()}.jpg`;
    const mockupFilePath = path.join(process.cwd(), 'public', 'generated', mockupFileName);
    await fs.writeFile(mockupFilePath, mockupBuffer);
    
    return NextResponse.json({
      designs: designUrls,
      mockup: `/generated/${mockupFileName}`,
      message: 'Mock ambigram designs generated successfully',
      debug: {
        firstWord,
        secondWord,
        style,
        font,
        note: 'Using mock data because SILICON_FLOW_API_KEY is not configured'
      }
    });
  } catch (error) {
    console.error('Error generating mock response:', error);
    
    // Fallback to static samples
    const sampleDesigns = [
      '/ambigram-samples/sample1.svg',
      '/ambigram-samples/sample2.svg',
      '/ambigram-samples/sample3.svg',
      '/ambigram-samples/sample4.svg',
      '/ambigram-samples/sample5.svg',
      '/ambigram-samples/sample6.svg',
    ];
    
    return NextResponse.json({
      designs: sampleDesigns,
      mockup: '/mockups/tattoo-arm-mockup.jpg',
      message: 'Fallback mock ambigram designs',
      error: 'Failed to generate custom designs'
    });
  }
} 