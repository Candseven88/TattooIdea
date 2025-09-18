import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { generateAmbigramDesign } from '@/lib/api';

// Mock data for ambigram styles
const ambigramStyles = [
  { id: 'gothic', name: 'Gothic' },
  { id: 'classic', name: 'Classic' },
  { id: 'modern', name: 'Modern' },
  { id: 'minimalist', name: 'Minimalist' },
  { id: 'decorative', name: 'Decorative' }
];

// Font options
const fontOptions = [
  { id: 'CloisterBlack.ttf', name: 'Cloister Black', style: 'gothic' },
  { id: 'OldLondon.ttf', name: 'Old London', style: 'gothic' },
  { id: 'Fraktur_Handschrift.ttf', name: 'Fraktur', style: 'gothic' },
  { id: 'SCRIPTIN.ttf', name: 'Scriptin', style: 'classic' },
  { id: 'CHANCERY.TTF', name: 'Chancery', style: 'classic' },
  { id: 'Ambrosia.ttf', name: 'Ambrosia', style: 'classic' },
  { id: 'Deutsch.ttf', name: 'Deutsch', style: 'modern' },
  { id: 'UnZialish.ttf', name: 'UnZialish', style: 'modern' },
  { id: 'BatikWorldwidePersonalUse-jEW7R.otf', name: 'Batik', style: 'minimalist' },
  { id: 'FlowerMandalaMonogram-nAdnJ.ttf', name: 'Flower Mandala', style: 'decorative' },
  { id: 'DiamondMandalaMonogram-eZDdO.ttf', name: 'Diamond Mandala', style: 'decorative' },
  { id: 'RebirthLotusMandalaMonogram-XGRZd.ttf', name: 'Rebirth Lotus', style: 'decorative' },
  { id: 'Tribal Dragon.ttf', name: 'Tribal Dragon', style: 'decorative' },
];

interface AmbigramFormProps {
  onGenerate: (designs: string[]) => void;
  onStartGeneration: () => void;
}

const AmbigramForm = ({ onGenerate, onStartGeneration }: AmbigramFormProps) => {
  const [firstWord, setFirstWord] = useState('');
  const [secondWord, setSecondWord] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('gothic');
  const [selectedFont, setSelectedFont] = useState('CloisterBlack.ttf');
  const [filteredFonts, setFilteredFonts] = useState(fontOptions.filter(font => font.style === 'gothic'));
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState('');

  // Update filtered fonts when style changes
  useEffect(() => {
    setFilteredFonts(fontOptions.filter(font => font.style === selectedStyle));
    // Set default font for the selected style
    const defaultFont = fontOptions.find(font => font.style === selectedStyle);
    if (defaultFont) {
      setSelectedFont(defaultFont.id);
    }
  }, [selectedStyle]);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate input
    if (!firstWord.trim()) {
      setError('Please enter the first word or name');
      return;
    }
    
    if (!secondWord.trim()) {
      setError('Please enter the second word or name');
      return;
    }
    
    setError('');
    setIsGenerating(true);
    
    // Notify parent component that generation is starting
    if (onStartGeneration) {
      onStartGeneration();
    }
    
    try {
      // Call the API to generate designs
      const result = await generateAmbigramDesign(
        firstWord.trim(),
        secondWord.trim(),
        selectedStyle,
        selectedFont
      );
      
      if (result && result.designs) {
        onGenerate(result.designs);
      } else {
        throw new Error('Failed to generate designs');
      }
    } catch (err) {
      console.error('Error generating ambigram:', err);
      setError('Failed to generate designs. Please try again.');
      
      // If API fails, use sample designs for demo
      const sampleDesigns = [
        '/ambigram-samples/sample1.svg',
        '/ambigram-samples/sample2.svg',
        '/ambigram-samples/sample3.svg',
        '/ambigram-samples/sample4.svg',
        '/ambigram-samples/sample5.svg',
        '/ambigram-samples/sample6.svg',
      ];
      onGenerate(sampleDesigns);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Card className="overflow-hidden border-0 shadow-lg bg-gradient-to-br from-background to-background/80 backdrop-blur-sm">
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="firstWord" className="block text-sm font-medium text-foreground mb-1">
              Enter the first word or name
            </label>
            <input
              id="firstWord"
              type="text"
              value={firstWord}
              onChange={(e) => setFirstWord(e.target.value)}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              placeholder="e.g. Alice"
            />
          </div>
          
          <div>
            <label htmlFor="secondWord" className="block text-sm font-medium text-foreground mb-1">
              Enter the second word or name
            </label>
            <input
              id="secondWord"
              type="text"
              value={secondWord}
              onChange={(e) => setSecondWord(e.target.value)}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              placeholder="e.g. Bob"
            />
          </div>
          
          <div>
            <label htmlFor="style" className="block text-sm font-medium text-foreground mb-1">
              Choose a style
            </label>
            <select
              id="style"
              value={selectedStyle}
              onChange={(e) => setSelectedStyle(e.target.value)}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
              {ambigramStyles.map((style) => (
                <option key={style.id} value={style.id}>
                  {style.name}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label htmlFor="font" className="block text-sm font-medium text-foreground mb-1">
              Choose a font
            </label>
            <select
              id="font"
              value={selectedFont}
              onChange={(e) => setSelectedFont(e.target.value)}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
              {filteredFonts.map((font) => (
                <option key={font.id} value={font.id}>
                  {font.name}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label htmlFor="details" className="block text-sm font-medium text-foreground mb-1">
              Any specific details or preferences? (optional)
            </label>
            <textarea
              id="details"
              rows={2}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              placeholder="e.g. I prefer thinner lines, more decorative elements, etc."
            ></textarea>
          </div>
          
          {error && (
            <div className="text-red-500 text-sm">
              {error}
            </div>
          )}
          
          <Button
            type="submit"
            disabled={isGenerating}
            className="w-full relative overflow-hidden bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600"
          >
            {isGenerating ? (
              <motion.div
                className="flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating Designs...
              </motion.div>
            ) : (
              <motion.span
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                Generate Your Own!
              </motion.span>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AmbigramForm; 