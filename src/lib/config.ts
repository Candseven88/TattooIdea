/**
 * API配置
 */
export const API_CONFIG = {
  GLM_API_URL: 'https://open.bigmodel.cn/api/paas/v4/chat/completions',
  COGVIEW_API_URL: 'https://open.bigmodel.cn/api/paas/v4/images/generations',
  GLM_MODEL: 'glm-4-flash-250414',
  COGVIEW_MODEL: 'cogview-3-flash',
  IMAGE_SIZE: '1024x1024'
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
 * 灵感图片数据
 */
export const INSPIRATION_IMAGES = [
  { src: '/inspiration/An Hourglass Moon Dream Catcher Filled.webp', alt: 'Hourglass Moon Dream Catcher' },
  { src: '/inspiration/Angel Wings Behind A Sword, Roses.webp', alt: 'Angel Wings Behind A Sword with Roses' },
  { src: '/inspiration/Archangel Uriel.webp', alt: 'Archangel Uriel' },
  { src: '/inspiration/Burning Wing Of A Phoenix Rising From.webp', alt: 'Burning Wing Of A Phoenix Rising' },
  { src: '/inspiration/Chinese Dragon And Phoenix And Skull.webp', alt: 'Chinese Dragon And Phoenix And Skull' },
  { src: '/inspiration/Compass.webp', alt: 'Compass' },
  { src: '/inspiration/Crooked Scary Looking Tree Wich Gnarled..webp', alt: 'Crooked Scary Looking Tree' },
  { src: '/inspiration/Crowned Lion Face.webp', alt: 'Crowned Lion Face' },
  { src: '/inspiration/Filigree Design With Playing Cards.webp', alt: 'Filigree Design With Playing Cards' },
  { src: '/inspiration/Gothic Tree Of Life Intertwined With.webp', alt: 'Gothic Tree Of Life' },
  { src: '/inspiration/Growling Wolf Face And Realistic Rocky.webp', alt: 'Growling Wolf Face' },
  { src: '/inspiration/Hooded Arch Angel Defeating A Demon.webp', alt: 'Hooded Arch Angel Defeating A Demon' },
  { src: '/inspiration/Hooded Reaper Silohuette, Smoke, Fire.webp', alt: 'Hooded Reaper Silohuette with Smoke and Fire' },
  { src: '/inspiration/Hooded Reaper.webp', alt: 'Hooded Reaper' },
  { src: '/inspiration/Massive Forest Landscape With Huge Moon.webp', alt: 'Massive Forest Landscape With Huge Moon' },
  { src: '/inspiration/Peace And Lightining Storm And Time.webp', alt: 'Peace And Lightining Storm And Time' },
  { src: '/inspiration/Scorpio And Capricorn Tattoo Design.webp', alt: 'Scorpio And Capricorn Tattoo Design' },
  { src: '/inspiration/Stairway To Heaven Walking Up Stairs.webp', alt: 'Stairway To Heaven' },
  { src: '/inspiration/Two Rose Wrapped One Black One Red.webp', alt: 'Two Roses - One Black One Red' },
  { src: '/inspiration/Wolf And Mountains And Trees.webp', alt: 'Wolf And Mountains And Trees' },
  { src: '/inspiration/Wolf And Woods And Mountains.webp', alt: 'Wolf And Woods And Mountains' },
  { src: '/inspiration/Wolf With Blue Eyes On Armor Tattoo.webp', alt: 'Wolf With Blue Eyes On Armor' },
];

/**
 * 提示模板
 */
export const PROMPT_TEMPLATES = {
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