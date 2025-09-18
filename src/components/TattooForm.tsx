import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { tattooStyles, tattooPlacements, genderOptions } from '@/data/tattooStyles';
import { Sparkles, Image as ImageIcon, Loader2, Zap } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { generateTattooDesign, validateRealisticModeInput } from '@/lib/api';
import { EXAMPLES } from '@/lib/config';
import { TattooFormProps, GenerationMode } from '@/lib/types';

// PayPal类型定义
interface PayPalOrderData {
  [key: string]: unknown;
}

interface PayPalActions {
  order: {
    create: (orderData: {
      purchase_units: Array<{
        description: string;
        amount: {
          currency_code: string;
          value: string;
        }
      }>
    }) => Promise<string>;
    capture: () => Promise<PayPalCaptureResult>;
  }
}

interface PayPalCaptureResult {
  id: string;
  status: string;
  [key: string]: unknown;
}

const TattooForm = ({ onGenerate, onStartGeneration }: TattooFormProps) => {
  const [idea, setIdea] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('');
  const [selectedPlacement, setSelectedPlacement] = useState('');
  const [selectedGender, setSelectedGender] = useState('');
  const [generationMode, setGenerationMode] = useState<GenerationMode>('design');
  const [isGenerating, setIsGenerating] = useState(false);
  // 添加生成进度状态
  const [generationProgress, setGenerationProgress] = useState(0);
  const generationProgressRef = useRef<NodeJS.Timeout | null>(null);
  const [error, setError] = useState('');
  const [apiEnabled, setApiEnabled] = useState(false);
  const [premiumEnabled, setPremiumEnabled] = useState(false);
  const [isPremiumMode, setIsPremiumMode] = useState(false);
  const [showExamples, setShowExamples] = useState(false);
  const [currentExamples, setCurrentExamples] = useState<string[]>(EXAMPLES.designModeExamples);
  const [showStyleInfo, setShowStyleInfo] = useState(false);
  const [showPlacementInfo, setShowPlacementInfo] = useState(false);
  const [showGenderInfo, setShowGenderInfo] = useState(false);
  const [currentStyleInfo, setCurrentStyleInfo] = useState('');
  const [currentPlacementInfo, setCurrentPlacementInfo] = useState('');
  const [currentGenderInfo, setCurrentGenderInfo] = useState('');
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const paypalButtonContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 检查API是否启用
    setApiEnabled(process.env.NEXT_PUBLIC_API_ENABLED === 'true');
    // 检查高级模式是否启用
    setPremiumEnabled(process.env.NEXT_PUBLIC_PREMIUM_MODE_ENABLED === 'true');
  }, []);

  // 当切换到写实模式但未选择身体部位或性别时，提示用户选择
  useEffect(() => {
    const validationError = validateRealisticModeInput(generationMode, selectedPlacement, selectedGender);
    setError(validationError);
  }, [generationMode, selectedPlacement, selectedGender]);

  // 当切换生成模式时，重置身体部位和性别选择
  useEffect(() => {
    if (generationMode === 'design') {
      setSelectedPlacement('');
      setSelectedGender('');
    }
  }, [generationMode]);

  // 当生成模式改变时，更新示例
  useEffect(() => {
    setCurrentExamples(generationMode === 'design' ? EXAMPLES.designModeExamples : EXAMPLES.realisticModeExamples);
  }, [generationMode]);

  // 处理支付成功
  const handlePaymentSuccess = async () => {
    console.log('Payment successful, generating design...');
    setIsGenerating(true);
    setPaymentProcessing(false);
    
    // 重置并启动进度动画
    setGenerationProgress(0);
    startProgressAnimation();
    
    try {
      // 调用API生成纹身设计
      const data = await generateTattooDesign(
        idea,
        selectedStyle || null,
        selectedPlacement || null,
        selectedGender || null,
        generationMode,
        isPremiumMode ? 'stabilityai' : 'zhipu' // 根据是否为高级模式选择不同的AI提供商
      );

      console.log('Design generated successfully');
      
      // 确保进度达到100%
      setGenerationProgress(100);
      
      // 如果提供了回调函数，则调用它
      if (onGenerate) {
        onGenerate(data.designUrl || '', data.realisticUrl || '', data.parsedInput || null);
      }
      
      // 滚动到结果区域
      setTimeout(() => {
        document.getElementById('tattoo-result')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      
    } catch (err) {
      console.error('Error generating tattoo:', err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Our design service is currently experiencing high demand. Please try again in a few moments.');
      }
    } finally {
      stopProgressAnimation();
      setIsGenerating(false);
    }
  };

  // 当支付处理状态改变时，加载PayPal按钮
  useEffect(() => {
    if (paymentProcessing && paypalButtonContainerRef.current) {
      // 清空容器
      paypalButtonContainerRef.current.innerHTML = '';
      
      // 获取PayPal配置
      const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || 'sb';
      const currency = process.env.NEXT_PUBLIC_PAYPAL_CURRENCY || 'USD';
      const mode = process.env.NEXT_PUBLIC_PAYPAL_MODE || 'sandbox';
      
      console.log(`PayPal config: mode=${mode}, currency=${currency}, clientId=${clientId.substring(0, 5)}...`);
      
      // 动态加载PayPal SDK
      const script = document.createElement('script');
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=${currency}`;
      script.async = true;
      
      script.onload = () => {
        console.log('PayPal SDK loaded successfully');
        if (window.paypal && paypalButtonContainerRef.current) {
          try {
            window.paypal.Buttons({
              style: {
                layout: 'vertical',
                color: 'blue',
                shape: 'pill',
                label: 'pay'
              },
              createOrder: function(data: PayPalOrderData, actions: PayPalActions) {
                console.log('Creating order...');
                return actions.order.create({
                  purchase_units: [{
                    description: `Tattoo Design - ${generationMode === 'design' ? 'Design' : 'Realistic'} Mode ${isPremiumMode ? '(Premium)' : ''}`,
                    amount: {
                      currency_code: currency,
                      value: '0.45'
                    }
                  }]
                });
              },
              onApprove: function(data: PayPalOrderData, actions: PayPalActions) {
                console.log('Payment approved, capturing order...', data);
                return actions.order.capture().then(function(details: PayPalCaptureResult) {
                  console.log('Payment completed', details);
                  // 记录交易ID和状态
                  console.log(`Transaction ID: ${details.id}`);
                  console.log(`Transaction status: ${details.status}`);
                  handlePaymentSuccess();
                });
              },
              onError: function(err: Error) {
                console.error('PayPal error:', err);
                setError('Payment failed. Please try again.');
                setPaymentProcessing(false);
              },
              onCancel: function() {
                console.log('Payment cancelled by user');
                setError('Payment was cancelled.');
                setPaymentProcessing(false);
              }
            }).render(paypalButtonContainerRef.current);
            console.log('PayPal buttons rendered');
          } catch (error) {
            console.error('Failed to render PayPal buttons:', error);
            setError('Failed to initialize payment system. Please try again later.');
            setPaymentProcessing(false);
          }
        } else {
          console.error('PayPal SDK not available or container not found');
          setError('Payment system failed to initialize. Please refresh the page.');
          setPaymentProcessing(false);
        }
      };
      
      script.onerror = () => {
        console.error('Failed to load PayPal SDK');
        setError('Payment system failed to load. Please check your internet connection and try again.');
        setPaymentProcessing(false);
      };
      
      document.body.appendChild(script);
      
      return () => {
        // 清理脚本
        if (document.body.contains(script)) {
          document.body.removeChild(script);
        }
      };
    }
  }, [paymentProcessing, generationMode, handlePaymentSuccess, isPremiumMode]);

  // 添加示例点击处理函数
  const handleExampleClick = (example: string) => {
    setIdea(example);
    setShowExamples(false);
  };

  const handleStyleInfoClick = (description: string) => {
    setCurrentStyleInfo(description);
    setShowStyleInfo(true);
    setShowPlacementInfo(false);
    setShowGenderInfo(false);
  };

  const handlePlacementInfoClick = (description: string, suitableFor: string[]) => {
    setCurrentPlacementInfo(`${description}\n\nBest for: ${suitableFor.join(', ')}`);
    setShowPlacementInfo(true);
    setShowStyleInfo(false);
    setShowGenderInfo(false);
  };

  const handleGenderInfoClick = (description: string) => {
    setCurrentGenderInfo(description);
    setShowGenderInfo(true);
    setShowStyleInfo(false);
    setShowPlacementInfo(false);
  };

  const handleInitiatePayment = () => {
    if (!idea.trim()) return;
    
    // 验证写实模式输入
    const validationError = validateRealisticModeInput(generationMode, selectedPlacement, selectedGender);
    if (validationError) {
      setError(validationError);
      return;
    }
    
    // 如果是标准模式，直接生成，不需要支付
    if (!isPremiumMode) {
      // 通知父组件开始生成
      if (onStartGeneration) {
        onStartGeneration();
      }
      handleGenerateWithoutPayment();
      return;
    }
    
    // 高级模式需要支付
    console.log('Initiating payment process for premium mode');
    // 通知父组件开始生成
    if (onStartGeneration) {
      onStartGeneration();
    }
    setPaymentProcessing(true);
    setError('');
  };

  // 不需要支付直接生成（标准模式）
  const handleGenerateWithoutPayment = async () => {
    console.log('Generating design in standard mode...');
    setIsGenerating(true);
    
    // 重置并启动进度动画
    setGenerationProgress(0);
    startProgressAnimation();
    
    try {
      // 调用API生成纹身设计
      const data = await generateTattooDesign(
        idea,
        selectedStyle || null,
        selectedPlacement || null,
        selectedGender || null,
        generationMode,
        'zhipu' // 标准模式使用zhipu
      );

      console.log('Design generated successfully');
      
      // 确保进度达到100%
      setGenerationProgress(100);
      
      // 如果提供了回调函数，则调用它
      if (onGenerate) {
        onGenerate(data.designUrl || '', data.realisticUrl || '', data.parsedInput || null);
      }
      
      // 滚动到结果区域
      setTimeout(() => {
        document.getElementById('tattoo-result')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      
    } catch (err) {
      console.error('Error generating tattoo:', err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Our design service is currently experiencing high demand. Please try again in a few moments.');
      }
    } finally {
      stopProgressAnimation();
      setIsGenerating(false);
    }
  };
  
  // 启动进度动画
  const startProgressAnimation = () => {
    // 清除可能存在的旧定时器
    if (generationProgressRef.current) {
      clearInterval(generationProgressRef.current);
    }
    
    // 创建新的定时器，模拟进度
    generationProgressRef.current = setInterval(() => {
      setGenerationProgress(prev => {
        // 缓慢增加进度，但不超过95%（留给实际完成时设置为100%）
        if (prev < 95) {
          // 进度越高，增加越慢
          const increment = Math.max(0.5, 5 * (1 - prev / 100));
          return Math.min(95, prev + increment);
        }
        return prev;
      });
    }, 200);
  };
  
  // 停止进度动画
  const stopProgressAnimation = () => {
    if (generationProgressRef.current) {
      clearInterval(generationProgressRef.current);
      generationProgressRef.current = null;
    }
  };
  
  // 组件卸载时清理定时器
  useEffect(() => {
    return () => {
      if (generationProgressRef.current) {
        clearInterval(generationProgressRef.current);
      }
    };
  }, []);

  // 切换高级模式
  const togglePremiumMode = () => {
    setIsPremiumMode(!isPremiumMode);
  };

  return (
    <div id="generator" className="w-full">
      <Card className="overflow-hidden border-2 border-primary/20 shadow-2xl bg-gradient-to-br from-background to-background/95 backdrop-blur-sm hover:shadow-3xl transition-shadow duration-300">
        <CardContent className="p-0">
          <Tabs defaultValue="design" className="w-full" onValueChange={(value) => setGenerationMode(value as GenerationMode)}>
            <div className="p-6 border-b border-border">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">Create Your Tattoo</h2>
                <TabsList className="grid grid-cols-2 w-[260px]">
                  <TabsTrigger value="design" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                    <Sparkles className="w-4 h-4 mr-2" />
                    Design
                  </TabsTrigger>
                  <TabsTrigger value="realistic" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                    <ImageIcon className="w-4 h-4 mr-2" />
                    Realistic
                  </TabsTrigger>
                </TabsList>
              </div>
              
              <div className="space-y-4">
                <div className="relative">
                  <label htmlFor="idea" className="block text-sm font-medium text-foreground mb-1">
                    Your Tattoo Idea
                  </label>
                  <textarea
                    id="idea"
                    name="idea"
                    rows={4}
                    value={idea}
                    onChange={(e) => setIdea(e.target.value)}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    placeholder="Describe your tattoo idea here..."
                  ></textarea>
                  <button 
                    type="button"
                    onClick={() => setShowExamples(!showExamples)}
                    className="absolute right-2 bottom-2 text-xs text-primary hover:text-primary/80 flex items-center"
                  >
                    <Sparkles className="h-3 w-3 mr-1" />
                    {showExamples ? 'Hide Examples' : 'Show Examples'}
                  </button>
                </div>
                
                {showExamples && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="bg-muted/50 rounded-md border border-border p-3 max-h-60 overflow-y-auto"
                  >
                    <p className="text-xs text-muted-foreground mb-2">Click on an example to use it:</p>
                    <div className="grid grid-cols-1 gap-2">
                      {currentExamples.map((example, index) => (
                        <button
                          key={index}
                          onClick={() => handleExampleClick(example)}
                          className="text-left text-sm p-2 hover:bg-muted rounded-md transition-colors"
                        >
                          {example}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
            
            <TabsContent value="design" className="p-6 space-y-4 border-b border-border">
              <div>
                <label htmlFor="style" className="block text-sm font-medium text-foreground mb-1">
                  Choose a Style
                </label>
                <div className="relative">
                  <select
                    id="style"
                    name="style"
                    value={selectedStyle}
                    onChange={(e) => setSelectedStyle(e.target.value)}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  >
                    <option value="">Select a style (optional)</option>
                    {tattooStyles.map((style) => (
                      <option key={style.id} value={style.id}>
                        {style.name}
                      </option>
                    ))}
                  </select>
                </div>
                {selectedStyle && (
                  <div className="mt-1 flex items-center">
                    <button
                      type="button"
                      onClick={() => handleStyleInfoClick(tattooStyles.find(s => s.id === selectedStyle)?.description || '')}
                      className="text-xs text-primary hover:text-primary/80 flex items-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      What is {tattooStyles.find(s => s.id === selectedStyle)?.name} style?
                    </button>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="realistic" className="p-6 space-y-4 border-b border-border">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="gender" className="block text-sm font-medium text-foreground mb-1">
                    Gender <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <select
                      id="gender"
                      name="gender"
                      value={selectedGender}
                      onChange={(e) => setSelectedGender(e.target.value)}
                      className={`w-full rounded-md border ${!selectedGender ? 'border-red-300 bg-red-50' : 'border-input bg-background'} px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring`}
                    >
                      <option value="">Select gender (required)</option>
                      {genderOptions.map((gender) => (
                        <option key={gender.id} value={gender.id}>
                          {gender.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  {selectedGender && (
                    <div className="mt-1 flex items-center">
                      <button
                        type="button"
                        onClick={() => {
                          const gender = genderOptions.find(g => g.id === selectedGender);
                          if (gender) {
                            handleGenderInfoClick(gender.description);
                          }
                        }}
                        className="text-xs text-primary hover:text-primary/80 flex items-center"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        About {genderOptions.find(g => g.id === selectedGender)?.name} option
                      </button>
                    </div>
                  )}
                </div>

                <div>
                  <label htmlFor="placement" className="block text-sm font-medium text-foreground mb-1">
                    Placement on Body <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <select
                      id="placement"
                      name="placement"
                      value={selectedPlacement}
                      onChange={(e) => setSelectedPlacement(e.target.value)}
                      className={`w-full rounded-md border ${!selectedPlacement ? 'border-red-300 bg-red-50' : 'border-input bg-background'} px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring`}
                    >
                      <option value="">Select placement (required)</option>
                      {tattooPlacements.map((placement) => (
                        <option key={placement.id} value={placement.id}>
                          {placement.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  {selectedPlacement && (
                    <div className="mt-1 flex items-center">
                      <button
                        type="button"
                        onClick={() => {
                          const placement = tattooPlacements.find(p => p.id === selectedPlacement);
                          if (placement) {
                            handlePlacementInfoClick(placement.description, placement.suitableFor);
                          }
                        }}
                        className="text-xs text-primary hover:text-primary/80 flex items-center"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        About {tattooPlacements.find(p => p.id === selectedPlacement)?.name} placement
                      </button>
                    </div>
                  )}
                </div>
              </div>
              
              <div>
                <label htmlFor="style" className="block text-sm font-medium text-foreground mb-1">
                  Choose a Style
                </label>
                <div className="relative">
                  <select
                    id="style"
                    name="style"
                    value={selectedStyle}
                    onChange={(e) => setSelectedStyle(e.target.value)}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  >
                    <option value="">Select a style (optional)</option>
                    {tattooStyles.map((style) => (
                      <option key={style.id} value={style.id}>
                        {style.name}
                      </option>
                    ))}
                  </select>
                </div>
                {selectedStyle && (
                  <div className="mt-1 flex items-center">
                    <button
                      type="button"
                      onClick={() => handleStyleInfoClick(tattooStyles.find(s => s.id === selectedStyle)?.description || '')}
                      className="text-xs text-primary hover:text-primary/80 flex items-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      What is {tattooStyles.find(s => s.id === selectedStyle)?.name} style?
                    </button>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <div className="p-6">
              {!apiEnabled && (
                <div className="mb-4 p-3 bg-yellow-50 text-yellow-700 text-xs rounded-md flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <span>Running in demo mode with placeholder images.</span>
                </div>
              )}
              
              {/* 高级模式切换按钮 */}
              {premiumEnabled && (
                <div className="mb-4 flex justify-between items-center">
                  <div className="flex items-center">
                    <button
                      onClick={togglePremiumMode}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background ${isPremiumMode ? 'bg-gradient-to-r from-purple-600 to-blue-500' : 'bg-muted'}`}
                      role="switch"
                      aria-checked={isPremiumMode}
                    >
                      <span
                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition-transform ${isPremiumMode ? 'translate-x-5' : 'translate-x-0'}`}
                      />
                    </button>
                    <span className="ml-2 text-sm font-medium">
                      {isPremiumMode ? 'Premium Mode' : 'Standard Mode'}
                    </span>
                  </div>
                  {isPremiumMode && (
                    <div className="text-xs text-primary flex items-center">
                      <Zap className="h-3 w-3 mr-1" />
                      Enhanced Quality Generation
                    </div>
                  )}
                </div>
              )}
              
              {!paymentProcessing ? (
                <Button
                  onClick={handleInitiatePayment}
                  disabled={!idea.trim() || isGenerating || (generationMode === 'realistic' && (!selectedPlacement || !selectedGender))}
                  className={`w-full mb-3 relative overflow-hidden ${isPremiumMode ? 'bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600' : ''}`}
                  variant="glow"
                >
                  {isGenerating ? (
                    <>
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-30"></div>
                      <div 
                        className="absolute left-0 top-0 h-full bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 opacity-40"
                        style={{ width: `${generationProgress}%`, transition: 'width 0.3s ease-out' }}
                      ></div>
                      <div className="relative z-10 flex items-center">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="mr-2 h-4 w-4"
                        >
                          <Loader2 className="h-4 w-4" />
                        </motion.div>
                        <span>Generating... {Math.round(generationProgress)}%</span>
                      </div>
                    </>
                  ) : (
                    <motion.span
                      whileHover={{ scale: 1.03 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      {isPremiumMode ? 
                        `Generate ${generationMode === 'design' ? 'Design' : 'Realistic'} Tattoo for $0.45` :
                        `Generate ${generationMode === 'design' ? 'Design' : 'Realistic'} Tattoo For Free`}
                    </motion.span>
                  )}
                </Button>
              ) : (
                <div className="mb-4">
                  <p className="text-center text-sm mb-2">Please complete payment to generate your tattoo design:</p>
                  {/* PayPal按钮容器 - 使用明显的样式以便调试 */}
                  <div 
                    ref={paypalButtonContainerRef} 
                    className="w-full min-h-[200px] border border-dashed border-gray-300 rounded-md p-4 flex items-center justify-center"
                  >
                    <div className="text-center">
                      <Loader2 className="h-8 w-8 mx-auto animate-spin text-primary mb-2" />
                      <p className="text-sm text-gray-500">Loading payment options...</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setPaymentProcessing(false)} 
                    className="mt-2 text-xs text-primary hover:text-primary/80 w-full text-center"
                  >
                    Cancel payment
                  </button>
                </div>
              )}
              
              {error && (
                <div className="mt-2 text-red-500 text-sm">
                  {error}
                </div>
              )}
            </div>
          </Tabs>
        </CardContent>
      </Card>
      
      <Dialog open={showStyleInfo} onOpenChange={setShowStyleInfo}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Style Information</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            {currentStyleInfo}
          </DialogDescription>
        </DialogContent>
      </Dialog>
      
      <Dialog open={showPlacementInfo} onOpenChange={setShowPlacementInfo}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Placement Information</DialogTitle>
          </DialogHeader>
          <DialogDescription className="whitespace-pre-line">
            {currentPlacementInfo}
          </DialogDescription>
        </DialogContent>
      </Dialog>
      
      <Dialog open={showGenderInfo} onOpenChange={setShowGenderInfo}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Gender Option Information</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            {currentGenderInfo}
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </div>
  );
};

// 添加PayPal类型声明
declare global {
  interface Window {
    paypal: {
      Buttons: (config: unknown) => {
        render: (container: HTMLElement) => void;
      };
    };
  }
}

export default TattooForm; 