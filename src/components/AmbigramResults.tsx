import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2, Download, RotateCw } from 'lucide-react';

interface AmbigramResultsProps {
  designs: string[];
  isGenerating: boolean;
  onSelectDesign: (design: string) => void;
  selectedDesign: string | null;
  mockupUrl: string | null;
}

const AmbigramResults = ({ 
  designs, 
  isGenerating, 
  onSelectDesign,
  selectedDesign,
  mockupUrl
}: AmbigramResultsProps) => {
  const [rotations, setRotations] = useState<Record<number, number>>({});
  
  // Function to handle design download
  const handleDownload = (designUrl: string) => {
    // Create a temporary link element to trigger download
    const link = document.createElement('a');
    link.href = designUrl;
    
    // Extract file extension from URL
    const extension = designUrl.toLowerCase().endsWith('.svg') ? 'svg' : 'png';
    link.download = `ambigram-design-${Date.now()}.${extension}`;
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  // Function to download all designs as a zip
  const handleDownloadAll = () => {
    console.log('Downloading all designs');
    // Download each design individually for now
    designs.forEach((design, index) => {
      setTimeout(() => handleDownload(design), index * 300);
    });
  };
  
  // Function to rotate image
  const handleRotate = (index: number) => {
    setRotations(prev => {
      const currentRotation = prev[index] || 0;
      return { ...prev, [index]: currentRotation + 180 };
    });
  };
  
  // If there are no designs and we're not generating, show nothing
  if (designs.length === 0 && !isGenerating) {
    return null;
  }
  
  return (
    <div className="w-full">
      {isGenerating ? (
        <div className="flex flex-col items-center justify-center p-12">
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 via-blue-500 to-pink-600 opacity-20 blur-lg animate-pulse"></div>
            <div className="relative h-16 w-16 rounded-full bg-background flex items-center justify-center">
              <Loader2 className="h-8 w-8 text-primary animate-spin" />
            </div>
          </div>
          <p className="mt-4 text-muted-foreground">Generating your ambigram designs...</p>
          <div className="w-64 h-2 bg-muted rounded-full mt-4 overflow-hidden">
            <motion.div 
              className="h-full bg-gradient-to-r from-purple-600 via-blue-500 to-pink-600"
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 3, ease: "easeInOut" }}
            />
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {designs.map((design, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card 
                  className={`overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg ${selectedDesign === design ? 'ring-2 ring-primary' : 'border border-primary/10'}`}
                  onClick={() => onSelectDesign(design)}
                >
                  <CardContent className="p-4 flex flex-col items-center">
                    <div className="relative w-full aspect-square bg-white rounded-md flex items-center justify-center mb-3 overflow-hidden">
                      <img 
                        src={design} 
                        alt={`Ambigram design ${index + 1}`}
                        className="max-w-full max-h-full object-contain transition-transform duration-300"
                        style={{ 
                          transform: `rotate(${rotations[index] || 0}deg)` 
                        }}
                        onError={(e) => {
                          // Fallback for demo if images don't exist
                          (e.target as HTMLImageElement).src = 'https://placehold.co/400x400/e2e8f0/1e293b?text=Ambigram+Design';
                        }}
                      />
                      
                      {/* Hover overlay with controls */}
                      <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            variant="secondary"
                            className="rounded-full h-10 w-10 p-0"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDownload(design);
                            }}
                          >
                            <Download className="h-5 w-5" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="secondary"
                            className="rounded-full h-10 w-10 p-0"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRotate(index);
                            }}
                          >
                            <RotateCw className="h-5 w-5" />
                          </Button>
                        </div>
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground">Design {index + 1}</div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
          
          {/* Download all button */}
          <div className="flex justify-center">
            <Button 
              variant="outline"
              className="flex items-center gap-2"
              onClick={handleDownloadAll}
            >
              <Download className="h-4 w-4" />
              Download All Designs
            </Button>
          </div>
          
          {/* Selected design preview with mockup */}
          {selectedDesign && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-8 p-6 bg-white rounded-lg border border-primary/10 shadow-md"
            >
              <h3 className="text-lg font-semibold mb-4">Tattoo Preview</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col items-center">
                  <div className="w-full aspect-square bg-white rounded-md flex items-center justify-center mb-3 overflow-hidden">
                    <img 
                      src={selectedDesign} 
                      alt="Selected ambigram design" 
                      className="max-w-full max-h-full object-contain"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://placehold.co/400x400/e2e8f0/1e293b?text=Selected+Design';
                      }}
                    />
                  </div>
                  <Button 
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2"
                    onClick={() => handleDownload(selectedDesign)}
                  >
                    <Download className="h-4 w-4" />
                    Download Design
                  </Button>
                </div>
                
                <div className="flex flex-col items-center">
                  <div className="w-full aspect-square bg-white rounded-md flex items-center justify-center mb-3 overflow-hidden">
                    {mockupUrl ? (
                      <div className="relative w-full h-full">
                        <img 
                          src={mockupUrl} 
                          alt="Tattoo mockup" 
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://placehold.co/400x400/e2e8f0/1e293b?text=Tattoo+Mockup';
                          }}
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <img 
                            src={selectedDesign} 
                            alt="Selected ambigram design" 
                            className="max-w-[60%] max-h-[60%] object-contain opacity-90"
                            style={{ transform: 'perspective(500px) rotateX(30deg)' }}
                            onError={(e) => {
                              (e.target as HTMLImageElement).style.display = 'none';
                            }}
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center text-muted-foreground text-sm">
                        <p>Select a design to see a mockup</p>
                      </div>
                    )}
                  </div>
                  {mockupUrl && (
                    <Button 
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-2"
                      onClick={() => {
                        if (mockupUrl) {
                          handleDownload(mockupUrl);
                        }
                      }}
                    >
                      <Download className="h-4 w-4" />
                      Download Mockup
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </div>
      )}
    </div>
  );
};

export default AmbigramResults; 