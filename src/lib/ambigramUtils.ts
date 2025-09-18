import { createCanvas, loadImage, registerFont } from 'canvas';
import * as path from 'path';
import * as fs from 'fs';

// Font mapping for different styles
export const fontMap: Record<string, string[]> = {
  gothic: ['CloisterBlack.ttf', 'OldLondon.ttf', 'Fraktur_Handschrift.ttf'],
  classic: ['SCRIPTIN.ttf', 'CHANCERY.TTF', 'Ambrosia.ttf'],
  modern: ['Deutsch.ttf', 'UnZialish.ttf'],
  minimalist: ['BatikWorldwidePersonalUse-jEW7R.otf'],
  decorative: ['FlowerMandalaMonogram-nAdnJ.ttf', 'DiamondMandalaMonogram-eZDdO.ttf', 'RebirthLotusMandalaMonogram-XGRZd.ttf']
};

// Register all available fonts
export function registerFonts() {
  const fontsDir = path.join(process.cwd(), 'public', 'fonts');
  
  // Check if directory exists
  if (!fs.existsSync(fontsDir)) {
    console.error('Fonts directory not found:', fontsDir);
    return;
  }
  
  // Register each font
  try {
    const fontFiles = fs.readdirSync(fontsDir);
    fontFiles.forEach(file => {
      if (file.endsWith('.ttf') || file.endsWith('.otf')) {
        const fontPath = path.join(fontsDir, file);
        registerFont(fontPath, { family: file.split('.')[0] });
      }
    });
    console.log('Fonts registered successfully');
  } catch (error) {
    console.error('Error registering fonts:', error);
  }
}

// Generate text layer with the specified font
export async function generateTextLayer(
  firstWord: string,
  secondWord: string,
  fontName: string,
  width = 1024,
  height = 1024
): Promise<Buffer> {
  // Create canvas
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');
  
  // Clear canvas with transparent background
  ctx.clearRect(0, 0, width, height);
  
  // Set font properties
  const fontFamily = fontName.split('.')[0]; // Remove extension
  
  // Calculate font size based on word length
  const longerWordLength = Math.max(firstWord.length, secondWord.length);
  const baseFontSize = Math.floor(width * 0.6 / longerWordLength); // Adjust size based on word length
  const fontSize = Math.min(Math.max(baseFontSize, 60), 200); // Increased max font size to 200
  
  console.log(`Using font: ${fontFamily}, size: ${fontSize}px for words: "${firstWord}" and "${secondWord}"`);
  
  ctx.font = `bold ${fontSize}px ${fontFamily}`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  
  // Create symmetrical design
  // Draw horizontal line for visual reference (will help with alignment)
  ctx.strokeStyle = 'rgba(200, 200, 200, 0.3)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(0, height / 2);
  ctx.lineTo(width, height / 2);
  ctx.stroke();
  
  // Calculate vertical spacing for better symmetry
  const verticalOffset = height * 0.2; // 20% from center
  
  // Draw first word with stroke for better visibility
  ctx.lineWidth = fontSize * 0.05; // Stroke width proportional to font size
  ctx.strokeStyle = 'white'; // White stroke for contrast
  ctx.fillStyle = 'black';
  
  // Draw first word (above center)
  ctx.strokeText(firstWord, width / 2, height / 2 - verticalOffset);
  ctx.fillText(firstWord, width / 2, height / 2 - verticalOffset);
  
  // Draw second word (rotated 180 degrees, below center)
  ctx.save();
  ctx.translate(width / 2, height / 2 + verticalOffset);
  ctx.rotate(Math.PI);
  ctx.strokeText(secondWord, 0, 0);
  ctx.fillText(secondWord, 0, 0);
  ctx.restore();
  
  return canvas.toBuffer('image/png');
}

// Composite text layer onto background image
export async function compositeTextOnBackground(
  backgroundImageUrl: string,
  textLayerBuffer: Buffer
): Promise<Buffer> {
  try {
    // Download background image
    const response = await fetch(backgroundImageUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch background image: ${response.status}`);
    }
    
    const backgroundBuffer = Buffer.from(await response.arrayBuffer());
    
    // Use sharp to composite the images
    const sharp = require('sharp');
    
    // First, make sure the background is properly sized
    const resizedBackground = await sharp(backgroundBuffer)
      .resize(1024, 1024, {
        fit: 'cover',
        position: 'center'
      })
      .toBuffer();
    
    // Create a white version of the text for better visibility
    const whiteTextLayer = await sharp(textLayerBuffer)
      .negate(false) // Make black text white
      .toBuffer();
    
    // Apply the text with proper blending - using the white text for better contrast
    return await sharp(resizedBackground)
      .composite([
        {
          input: whiteTextLayer,
          gravity: 'center',
          blend: 'over'
        }
      ])
      .png()
      .toBuffer();
  } catch (error) {
    console.error('Error compositing images:', error);
    throw new Error('Failed to composite text on background');
  }
}

// Get a font for the selected style
export function getFontForStyle(style: string): string {
  const normalizedStyle = style.toLowerCase();
  const availableFonts = fontMap[normalizedStyle] || fontMap.gothic;
  return availableFonts[0]; // Default to first font in the style
}

// Generate a mockup with the design on a tattoo template
export async function generateMockup(
  designImageBuffer: Buffer,
  mockupTemplatePath: string = '/mockups/tattoo-arm-mockup.jpg'
): Promise<Buffer> {
  try {
    const sharp = require('sharp');
    
    // Load mockup template
    const mockupPath = path.join(process.cwd(), 'public', mockupTemplatePath);
    
    // Check if mockup file exists
    if (!fs.existsSync(mockupPath)) {
      console.warn('Mockup template not found:', mockupPath);
      
      // Create a simple mockup with the design
      return await sharp(designImageBuffer)
        .resize(800, 600, {
          fit: 'contain',
          background: { r: 240, g: 240, b: 240, alpha: 1 }
        })
        .extend({
          top: 50,
          bottom: 50,
          left: 50,
          right: 50,
          background: { r: 240, g: 240, b: 240, alpha: 1 }
        })
        .jpeg()
        .toBuffer();
    }
    
    const mockupBuffer = fs.readFileSync(mockupPath);
    
    // Check if mockup is a valid image
    const mockupInfo = await sharp(mockupBuffer).metadata();
    if (!mockupInfo.width || !mockupInfo.height || mockupInfo.width < 100 || mockupInfo.height < 100) {
      console.warn('Invalid mockup image dimensions:', mockupInfo);
      
      // Create a simple mockup with the design
      return await sharp(designImageBuffer)
        .resize(800, 600, {
          fit: 'contain',
          background: { r: 240, g: 240, b: 240, alpha: 1 }
        })
        .extend({
          top: 50,
          bottom: 50,
          left: 50,
          right: 50,
          background: { r: 240, g: 240, b: 240, alpha: 1 }
        })
        .jpeg()
        .toBuffer();
    }
    
    // Resize and prepare the design for overlay
    const resizedDesign = await sharp(designImageBuffer)
      .resize({ width: Math.min(300, mockupInfo.width! / 3) }) // Adjust size to fit mockup
      .rotate(30) // Apply perspective rotation
      .toBuffer();
    
    // Composite the design onto the mockup
    return await sharp(mockupBuffer)
      .composite([
        {
          input: resizedDesign,
          top: Math.floor(mockupInfo.height! * 0.4), // Position at 40% from top
          left: Math.floor(mockupInfo.width! * 0.5), // Position at 50% from left
          gravity: 'northwest',
          blend: 'over'
        }
      ])
      .jpeg()
      .toBuffer();
  } catch (error) {
    console.error('Error generating mockup:', error);
    
    // Return the original design if mockup generation fails
    try {
      const sharp = require('sharp');
      return await sharp(designImageBuffer)
        .jpeg()
        .toBuffer();
    } catch (fallbackError) {
      console.error('Error in fallback mockup generation:', fallbackError);
      throw new Error('Failed to generate mockup');
    }
  }
} 