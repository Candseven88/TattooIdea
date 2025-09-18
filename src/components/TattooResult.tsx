import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Download, Share2, Image as ImageIcon, Loader2 } from 'lucide-react';
import { ShareDialog } from '@/components/ui/share-dialog';
import { CollapsibleSection } from '@/components/ui/collapsible-section';
import { handleImageDownload } from '@/lib/utils';
import { TattooResultProps } from '@/lib/types';
import Image from 'next/image';

const TattooResult = ({ 
  designUrl, 
  realisticUrl, 
  parsedInput, 
  apiEnabled = false,
  isGenerating = false
}: TattooResultProps) => {
  const [showShareDialog, setShowShareDialog] = useState(false);
  const [expandedSections, setExpandedSections] = useState<{[key: string]: boolean}>({
    mainElements: true,
    colorScheme: false,
    placement: false,
    styleNotes: false,
    additionalDetails: false
  });
  
  // 自动选择正确的标签
  const [activeTab, setActiveTab] = useState<string>(designUrl ? "design" : "realistic");
  
  // 添加图片加载状态
  const [isImageLoading, setIsImageLoading] = useState(false);
  
  // 当URL变化时更新活动标签和加载状态
  useEffect(() => {
    if (realisticUrl && !designUrl) {
      setActiveTab("realistic");
    } else if (designUrl) {
      setActiveTab("design");
    }
    
    // 如果URL发生变化，设置为加载中状态
    if (designUrl || realisticUrl) {
      setIsImageLoading(true);
      
      // 模拟加载完成
      const timer = setTimeout(() => {
        setIsImageLoading(false);
      }, 1000); // 给图片一些加载时间
      
      return () => clearTimeout(timer);
    }
  }, [designUrl, realisticUrl]);

  // 当isGenerating变化时，更新加载状态
  useEffect(() => {
    if (isGenerating) {
      setIsImageLoading(true);
    }
  }, [isGenerating]);

  // 获取当前显示的图片URL
  const currentImageUrl = activeTab === "design" ? designUrl : realisticUrl;

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // 生成分析部分的图标
  const getIconForSection = (section: string) => {
    switch (section) {
      case 'mainElements':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
          </svg>
        );
      case 'colorScheme':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4 2a2 2 0 00-2 2v11a3 3 0 106 0V4a2 2 0 00-2-2H4zm1 14a1 1 0 100-2 1 1 0 000 2zm5-1.757l4.9-4.9a2 2 0 000-2.828L13.485 5.1a2 2 0 00-2.828 0L10 5.757v8.486zM16 18H9.071l6-6H16a2 2 0 012 2v2a2 2 0 01-2 2z" clipRule="evenodd" />
          </svg>
        );
      case 'placement':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 005 10a1 1 0 10-2 0 8 8 0 0016 0 1 1 0 10-2 0 5.986 5.986 0 00-.454 2.916A5 5 0 008 11z" clipRule="evenodd" />
          </svg>
        );
      case 'styleNotes':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
            <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
          </svg>
        );
      case 'additionalDetails':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        );
      default:
        return null;
    }
  };

  // 如果没有任何图片，显示占位符
  const showPlaceholder = !designUrl && !realisticUrl && !isGenerating;
  
  // 生成加载动画
  const renderLoadingAnimation = () => (
    <motion.div 
      className="absolute inset-0 flex flex-col items-center justify-center bg-black/5 z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="relative w-20 h-20 mb-4"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1, rotate: 360 }}
        transition={{ 
          rotate: { repeat: Infinity, duration: 2, ease: "linear" },
          scale: { duration: 0.3 }
        }}
      >
        <div className="absolute inset-0 rounded-full border-4 border-t-primary border-r-transparent border-b-transparent border-l-transparent"></div>
        <div className="absolute inset-0 rounded-full border-4 border-r-primary border-t-transparent border-b-transparent border-l-transparent" style={{ transform: 'rotate(60deg)' }}></div>
        <div className="absolute inset-0 rounded-full border-4 border-b-primary border-t-transparent border-r-transparent border-l-transparent" style={{ transform: 'rotate(120deg)' }}></div>
      </motion.div>
      <motion.div
        className="text-center"
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <p className="font-medium text-primary mb-1">Creating your tattoo</p>
        <p className="text-sm text-muted-foreground">This may take a moment...</p>
      </motion.div>
    </motion.div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full mt-8"
      id="tattoo-result"
    >
      <Card className="overflow-hidden border-0 shadow-lg bg-gradient-to-br from-background to-background/80 backdrop-blur-sm">
        <CardContent className="p-0">
          <div className="p-6 border-b border-border">
            <h2 className="text-2xl font-bold mb-4">Your Tattoo Design</h2>
            
            {showPlaceholder ? (
              <div className="relative w-full h-[400px] bg-black/5 rounded-lg overflow-hidden flex items-center justify-center">
                <div className="flex flex-col items-center justify-center text-muted-foreground">
                  <ImageIcon className="h-16 w-16 mb-4 opacity-20" />
                  <p>Your tattoo design will appear here</p>
                  <p className="text-sm">Fill the form and click generate to create your design</p>
                </div>
              </div>
            ) : (
              <>
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid grid-cols-2 w-[260px] mb-6">
                    <TabsTrigger 
                      value="design" 
                      disabled={!designUrl && !isGenerating} 
                      className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                    >
                      Design Blueprint
                    </TabsTrigger>
                    <TabsTrigger 
                      value="realistic" 
                      disabled={!realisticUrl && !isGenerating} 
                      className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                    >
                      Realistic View
                    </TabsTrigger>
                  </TabsList>
                  
                  <div className="space-y-4">
                    <div className="relative w-full h-[400px] bg-black/5 rounded-lg overflow-hidden flex items-center justify-center">
                      <AnimatePresence>
                        {(isImageLoading || isGenerating) && renderLoadingAnimation()}
                      </AnimatePresence>
                      
                      {currentImageUrl ? (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: isImageLoading || isGenerating ? 0.3 : 1 }}
                          transition={{ duration: 0.5 }}
                          className="w-full h-full flex items-center justify-center"
                        >
                          <Image 
                            src={currentImageUrl} 
                            alt={activeTab === "design" ? "Tattoo design blueprint" : "Realistic tattoo preview"} 
                            width={400}
                            height={400}
                            className="max-w-full max-h-full object-contain"
                            onLoad={() => setIsImageLoading(false)}
                          />
                        </motion.div>
                      ) : isGenerating ? (
                        <div className="flex flex-col items-center justify-center text-muted-foreground opacity-0">
                          <ImageIcon className="h-16 w-16 mb-4 opacity-20" />
                          <p>Generating your {activeTab === "design" ? "design" : "realistic"} image...</p>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center text-muted-foreground">
                          <ImageIcon className="h-16 w-16 mb-4 opacity-20" />
                          <p>No {activeTab === "design" ? "design" : "realistic"} image available</p>
                          <p className="text-sm">Try generating in {activeTab === "design" ? "Design" : "Realistic"} mode</p>
                        </div>
                      )}
                    </div>
                    
                    {currentImageUrl && !isGenerating && (
                      <div className="flex flex-wrap gap-2">
                        <Button
                          onClick={() => handleImageDownload(currentImageUrl)}
                          variant="outline"
                          size="sm"
                          className="flex items-center"
                        >
                          <Download className="h-4 w-4 mr-2" />
                          View Full Image
                        </Button>
                        <Button
                          onClick={() => setShowShareDialog(true)}
                          variant="outline"
                          size="sm"
                          className="flex items-center"
                        >
                          <Share2 className="h-4 w-4 mr-2" />
                          Share
                        </Button>
                      </div>
                    )}
                  </div>
                </Tabs>
              </>
            )}
          </div>
          
          {parsedInput && (
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                Design Analysis
              </h3>
              
              <div className="space-y-3">
                {parsedInput.mainElements && (
                  <CollapsibleSection
                    title="Main Elements"
                    icon={getIconForSection('mainElements')}
                    content={parsedInput.mainElements}
                    isExpanded={expandedSections.mainElements}
                    onToggle={() => toggleSection('mainElements')}
                  />
                )}
                
                {parsedInput.colorScheme && (
                  <CollapsibleSection
                    title="Color Scheme"
                    icon={getIconForSection('colorScheme')}
                    content={parsedInput.colorScheme}
                    isExpanded={expandedSections.colorScheme}
                    onToggle={() => toggleSection('colorScheme')}
                  />
                )}
                
                {parsedInput.placement && (
                  <CollapsibleSection
                    title="Placement"
                    icon={getIconForSection('placement')}
                    content={parsedInput.placement}
                    isExpanded={expandedSections.placement}
                    onToggle={() => toggleSection('placement')}
                  />
                )}
                
                {parsedInput.styleNotes && (
                  <CollapsibleSection
                    title="Style Notes"
                    icon={getIconForSection('styleNotes')}
                    content={parsedInput.styleNotes}
                    isExpanded={expandedSections.styleNotes}
                    onToggle={() => toggleSection('styleNotes')}
                  />
                )}
                
                {parsedInput.additionalDetails && (
                  <CollapsibleSection
                    title="Additional Details"
                    icon={getIconForSection('additionalDetails')}
                    content={parsedInput.additionalDetails}
                    isExpanded={expandedSections.additionalDetails}
                    onToggle={() => toggleSection('additionalDetails')}
                  />
                )}
              </div>
            </div>
          )}
          
          {!apiEnabled && (
            <div className="p-6 pt-0">
              <p className="text-sm text-muted-foreground text-center">
                This is a placeholder image. Configure API key to generate real designs.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
      
      <ShareDialog 
        open={showShareDialog} 
        onOpenChange={setShowShareDialog} 
        imageUrl={currentImageUrl || ''}
      />
    </motion.div>
  );
};

export default TattooResult; 