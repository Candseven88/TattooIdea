import { TemplateConfig, PromptTemplates, AIProvider } from '../types';

/**
 * 默认提示模板
 */
export const DEFAULT_PROMPT_TEMPLATES: PromptTemplates = {
  userInputAnalysis: `You are a professional tattoo designer with decades of experience. I need your expertise to analyze this tattoo request and extract key design elements.

  User's Tattoo Idea: "{{idea}}"
  {{selectedStyle}}
  {{selectedPlacement}}
  {{selectedGender}}
  
  Please analyze this request thoroughly and provide a structured description including:
  1. Main elements and objects that should be included in the design
  2. Color scheme recommendations (based on the idea or traditional choices for this style)
  3. Size and placement considerations (especially if a specific body part was selected)
  4. Style-specific techniques and characteristics to incorporate
  5. Any additional artistic elements that would enhance this design
  
  Return your analysis in this JSON format:
  {
    "mainElements": "Detailed description of main elements",
    "colorScheme": "Detailed color scheme description",
    "placement": "Placement and size considerations",
    "styleNotes": "Style-specific techniques and characteristics",
    "additionalDetails": "Additional artistic elements and recommendations",
    "formattedPrompt": "Comprehensive, detailed prompt for the image generator in English"
  }`,
  
  designModePrompt: `Professional tattoo design blueprint: {{basePrompt}}, crisp linework, clean design, high contrast, professional tattoo stencil, detailed tattoo flash art, black and gray outlines, tattoo artist's drawing, perfect symmetry, clear details, master craftsmanship, studio quality`,
  
  realisticModePrompt: `Hyperrealistic tattoo photograph: {{basePrompt}}, on real {{gender}} {{placement}}, showing detailed skin texture and contours, professional tattoo photography, studio lighting, healed tattoo appearance, visible pores, natural skin tone, slight redness around tattoo edges, tattoo artist masterpiece, photorealistic quality, 8k resolution`
};

/**
 * 示例提示数据
 */
export const EXAMPLES = {
  designModeExamples: [
    "Wolf With Blue Eyes On Armor",
    "Geometric Fox With Mountain Landscape",
    "Minimalist Compass With Arrow",
    "Japanese Dragon With Cherry Blossoms",
    "Owl Sitting On Moon With Stars",
    "Watercolor Lion With Splashes",
    "Celtic Tree Of Life With Roots",
    "Anchor With Rope And Nautical Stars",
    "Phoenix Rising From Ashes",
    "Mandala Lotus Flower"
  ],
  
  realisticModeExamples: [
    "Powerful majestic quetzal bird with long feathers and letters DON QUETZAL, full colors",
    "An open book with a werewolf, an owl & a dragon and a phoenix flying around the book",
    "Realistic wolf howling at the moon with forest background",
    "Detailed koi fish swimming through waves with cherry blossoms",
    "Realistic tiger face with intense eyes and detailed fur",
    "Anatomical heart with flowers growing from arteries",
    "Realistic eagle with spread wings on mountain cliff",
    "Detailed snake coiled around a dagger with roses",
    "Realistic octopus with tentacles wrapping around an anchor",
    "Detailed samurai warrior with traditional armor and katana"
  ]
};

/**
 * 默认模板配置
 */
export const DEFAULT_TEMPLATE_CONFIG: TemplateConfig = {
  provider: 'zhipu',
  modelConfigs: {
    zhipu: {
      apiKey: process.env.ZHIPUAI_API_KEY || '',
      apiUrl: 'https://open.bigmodel.cn/api/paas/v4',
      model: 'glm-4',
      imageModel: 'cogview-3',
      imageSize: '1024x1024'
    },
    openai: {
      apiKey: process.env.OPENAI_API_KEY || '',
      apiUrl: 'https://api.openai.com/v1',
      model: 'gpt-4',
      imageModel: 'dall-e-3',
      imageSize: '1024x1024'
    },
    stabilityai: {
      apiKey: process.env.STABILITYAI_API_KEY || '',
      openaiApiKey: process.env.OPENAI_API_KEY || '',
      apiUrl: 'https://api.stability.ai/v2beta/stable-image/generate/sd3',
      openaiApiUrl: 'https://api.openai.com/v1/chat/completions',
      model: 'sd3.5-large',
      openaiModel: 'gpt-4o',
      imageSize: '1024x1024',
      isPremium: true
    },
    custom: {
      apiKey: process.env.CUSTOM_API_KEY || '',
      apiUrl: process.env.CUSTOM_API_URL || '',
      model: process.env.CUSTOM_MODEL || '',
      imageSize: '1024x1024'
    }
  },
  promptTemplates: DEFAULT_PROMPT_TEMPLATES,
  defaultImageSize: '1024x1024'
};

/**
 * 获取当前配置
 * 合并默认配置和环境变量
 */
export function getConfig(): TemplateConfig {
  const provider = (process.env.AI_PROVIDER as AIProvider) || 'zhipu';
  
  return {
    ...DEFAULT_TEMPLATE_CONFIG,
    provider,
    modelConfigs: {
      ...DEFAULT_TEMPLATE_CONFIG.modelConfigs,
      // 可以在这里添加从环境变量或其他来源加载的配置
    }
  };
} 