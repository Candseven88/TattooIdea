import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { tattooStyles } from '@/data/tattooStyles';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import Image from 'next/image';

interface StyleGalleryProps {
  selectedStyle: string;
  onStyleSelect: (styleId: string) => void;
}

// 文件名映射函数，处理样式名称到文件名的转换
function getStyleFileName(styleName: string): string {
  const fileNameMap: { [key: string]: string } = {
    'Black and White': 'Black and white',
    'Negative Space': 'Negative space',
    'Old School': 'Old school',
    '3D': '3D'
  };
  
  return fileNameMap[styleName] || styleName;
}

export default function StyleGallery({ selectedStyle, onStyleSelect }: StyleGalleryProps) {
  const [showDialog, setShowDialog] = useState(false);
  const [currentStyle, setCurrentStyle] = useState(tattooStyles[0]);

  const handleStyleClick = (styleId: string) => {
    onStyleSelect(styleId);
  };

  const handleInfoClick = (style: typeof tattooStyles[0]) => {
    setCurrentStyle(style);
    setShowDialog(true);
  };

  return (
    <div className="w-full">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        <AnimatePresence>
          {tattooStyles.map((style) => (
            <motion.div
              key={style.id}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
              className="relative group"
            >
              <div
                className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                  selectedStyle === style.id
                    ? 'border-primary shadow-lg scale-105'
                    : 'border-gray-200 hover:border-primary/50 hover:scale-105'
                }`}
                onClick={() => handleStyleClick(style.id)}
              >
                <Image
                  src={`/style/${getStyleFileName(style.name)}.webp`}
                  alt={`${style.name} tattoo style - Popular tattoo ideas for men and women`}
                  width={200}
                  height={200}
                  className="object-cover w-full h-full"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    if (target.src.endsWith('.webp')) {
                      target.src = `/style/${getStyleFileName(style.name)}.jpg`;
                    }
                  }}
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-white font-medium text-sm text-center px-2">
                    {style.name}
                  </span>
                </div>
              </div>
              
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleInfoClick(style);
                }}
                className="absolute -top-2 -right-2 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs hover:bg-primary/80 transition-colors"
              >
                i
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{currentStyle.name} Tattoo Style</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            {currentStyle.description}
          </DialogDescription>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative aspect-square overflow-hidden rounded-md">
              <Image 
                src={`/style/${getStyleFileName(currentStyle.name)}.webp`} 
                alt={`${currentStyle.name} tattoo style example - Popular tattoo ideas for men and women`}
                width={400}
                height={400}
                className="object-cover w-full h-full"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  if (target.src.endsWith('.webp')) {
                    target.src = `/style/${getStyleFileName(currentStyle.name)}.jpg`;
                  }
                }}
              />
            </div>
            <div className="flex flex-col justify-center">
              <h3 className="text-lg font-medium mb-2">Style Characteristics:</h3>
              <ul className="list-disc list-inside space-y-1">
                {getStyleCharacteristics(currentStyle.id).map((char, index) => (
                  <li key={index}>{char}</li>
                ))}
              </ul>
              <button
                className="mt-4 bg-primary text-primary-foreground px-4 py-2 rounded-md"
                onClick={() => {
                  onStyleSelect(currentStyle.id);
                  setShowDialog(false);
                }}
              >
                Use This Style for Your Tattoo
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// 获取风格特点
function getStyleCharacteristics(styleId: string): string[] {
  switch (styleId) {
    case 'sketch':
      return ['Freehand appearance', 'Line variations', 'Raw and unfinished look', 'Popular for artistic tattoo ideas'];
    case 'realistic':
      return ['Photorealistic details', 'Precise shading', 'Dimensional appearance', 'Ideal for portrait and animal tattoos'];
    case 'minimalist':
      return ['Clean lines', 'Simple designs', 'Often monochromatic', 'Perfect for small hand tattoos'];
    case 'blackAndWhite':
      return ['High contrast', 'Strong black lines', 'Grey shading', 'Classic and timeless'];
    case 'surreal':
      return ['Dreamlike imagery', 'Fantastical elements', 'Imaginative concepts', 'Unique and artistic'];
    case 'geometric':
      return ['Clean shapes', 'Mathematical precision', 'Symmetrical patterns', 'Modern and structured'];
    case 'blackwork':
      return ['Bold black designs', 'Solid ink coverage', 'Strong visual impact', 'Tribal and abstract styles'];
    case 'japanese':
      return ['Vibrant colors', 'Traditional motifs', 'Storytelling elements', 'Cultural significance'];
    case 'oldSchool':
      return ['Bold outlines', 'Limited color palette', 'Classic symbols', 'Traditional American style'];
    case 'cartoon':
      return ['Whimsical designs', 'Vibrant colors', 'Exaggerated features', 'Playful and fun'];
    case 'watercolor':
      return ['Soft color transitions', 'Flowing designs', 'Painterly effects', 'Artistic and expressive'];
    case 'dotwork':
      return ['Tiny dot patterns', 'Textured shading', 'Intricate details', 'Unique visual effects'];
    case 'tribal':
      return ['Black geometric patterns', 'Cultural significance', 'Bold designs', 'Traditional origins'];
    case 'abstract':
      return ['Non-representational', 'Emotional expression', 'Unique interpretations', 'Modern art style'];
    case 'negativeSpace':
      return ['Skin as design element', 'Contrast effects', 'Minimal ink usage', 'Creative use of space'];
    case 'lettering':
      return ['Text-based designs', 'Various fonts', 'Personal messages', 'Typography focus'];
    case 'biomechanical':
      return ['Mechanical elements', 'Anatomical fusion', 'Sci-fi aesthetic', 'Detailed complexity'];
    case 'portrait':
      return ['Realistic faces', 'Detailed features', 'Emotional expression', 'High skill requirement'];
    case '3d':
      return ['Depth illusion', 'Realistic appearance', 'Dimensional effects', 'Modern technique'];
    default:
      return ['Unique style', 'Custom design', 'Personal expression', 'Artistic freedom'];
  }
} 