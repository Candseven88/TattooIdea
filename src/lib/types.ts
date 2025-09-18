// 集中管理应用中使用的类型定义

// 纹身风格类型
export interface TattooStyle {
  id: string;
  name: string;
  description: string;
}

// 身体部位类型
export interface TattooPlacement {
  id: string;
  name: string;
  description: string;
  suitableFor: string[];
}

// 性别选项类型
export interface GenderOption {
  id: string;
  name: string;
  description: string;
}

// AI解析输入结果类型
export interface ParsedInput {
  mainElements?: string;
  colorScheme?: string;
  placement?: string;
  styleNotes?: string;
  additionalDetails?: string;
  formattedPrompt?: string;
}

// 生成模式类型
export type GenerationMode = 'design' | 'realistic';

// AI提供商类型
export type AIProvider = 'zhipu' | 'openai' | 'stabilityai' | 'custom';

// TattooForm组件属性类型
export interface TattooFormProps {
  onGenerate?: (designUrl: string, realisticUrl: string, parsedInput: ParsedInput | null) => void;
  onStartGeneration?: () => void; // 添加开始生成的回调
}

// TattooResult组件属性类型
export interface TattooResultProps {
  designUrl: string;
  realisticUrl: string;
  parsedInput: ParsedInput | null;
  apiEnabled?: boolean;
  isGenerating?: boolean; // 添加生成状态
}

// StyleGallery组件属性类型
export interface StyleGalleryProps {
  selectedStyle: string;
  onStyleSelect: (styleId: string) => void;
}

// InspirationGallery组件属性类型
export interface InspirationGalleryProps {
  title?: string;
}

// StyleCard组件属性类型
export interface StyleCardProps {
  style: TattooStyle;
  onClick: () => void;
  isSelected: boolean;
}

// InspirationCard组件属性类型
export interface InspirationCardProps {
  src: string;
  alt: string;
} 