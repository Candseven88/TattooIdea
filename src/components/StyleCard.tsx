import React from 'react';
import Image from 'next/image';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { TattooStyle } from '@/lib/types';

interface StyleCardProps {
  style: TattooStyle;
  onClick: () => void;
  isSelected: boolean;
}

const StyleCard = ({ style, onClick, isSelected }: StyleCardProps) => {
  const imagePath = `/style/${style.name.replace(/\s+/g, ' ')}.webp`;
  
  // 使用jpg格式作为后备，因为Surreal风格使用jpg
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    if (target.src.endsWith('.webp')) {
      target.src = `/style/${style.name.replace(/\s+/g, ' ')}.jpg`;
    }
  };

  // Create SEO-friendly alt text based on the style
  const getAltText = (styleName: string) => {
    if (styleName.toLowerCase().includes('phoenix')) {
      return `${styleName} - Phoenix tattoo ideas and designs`;
    } else if (styleName.toLowerCase() === 'minimalist') {
      return `${styleName} - Popular hand tattoo ideas and small designs`;
    } else {
      return `${styleName} style - Tattoo ideas for men and women`;
    }
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Card 
        className={`tattoo-card cursor-pointer overflow-hidden ${
          isSelected ? 'ring-2 ring-primary ring-offset-2' : ''
        }`}
        onClick={onClick}
      >
        <AspectRatio ratio={1 / 1}>
          <div className="relative w-full h-full bg-gray-100/30">
            <Image
              src={imagePath}
              alt={getAltText(style.name)}
              fill
              className="object-contain"
              onError={handleImageError}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </div>
        </AspectRatio>
        <CardContent className="tattoo-card-content">
          <h3 className="text-white font-bold text-lg">{style.name} Style</h3>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default StyleCard; 