import { TattooStyle, TattooPlacement, GenderOption } from '@/lib/types';

export const tattooStyles: TattooStyle[] = [
  {
    id: 'sketch',
    name: 'Sketch',
    description: 'The sketch tattoo style mimics the appearance of a freehand drawing, complete with intentional imperfections, line variations, and a raw and kind of unfinished look.'
  },
  {
    id: 'realistic',
    name: 'Realistic',
    description: 'Realistic tattoos are known for their breathtaking detail and accuracy, aiming to replicate subjects as they appear in real life, with precise shading, dimension as well as textures.'
  },
  {
    id: 'minimalist',
    name: 'Minimalist',
    description: 'The minimalist tattoo style is characterized by its simplicity, clean lines, and often monochromatic color schemes, focusing on the essence rather than the complexity of the subject.'
  },
  {
    id: 'blackAndWhite',
    name: 'Black and White',
    description: 'Black and white tattoos utilize only black ink to create contrast, depth, and shading without the use of color. This style focuses on strong lines, varying shades of grey, and meticulous detailing to bring subjects to life.'
  },
  {
    id: 'surreal',
    name: 'Surreal',
    description: 'Surreal tattoos blend dreamlike imagery with elements of the fantastic, often twisting reality in imaginative ways.'
  },
  {
    id: 'geometric',
    name: 'Geometric',
    description: 'Geometric tattoos are characterized by their use of shapes, lines, and angles to create patterns and designs that can be simple or complex.'
  },
  {
    id: 'blackwork',
    name: 'Blackwork',
    description: 'Blackwork involves the use of solid black ink to create bold, impactful designs that range from tribal patterns to abstract art.'
  },
  {
    id: 'japanese',
    name: 'Japanese',
    description: 'Japanese tattoos, or Irezumi, are known for their vibrant colors, iconic imagery, and the stories they tell, often drawing on folklore, nature, and the samurai tradition.'
  },
  {
    id: 'oldSchool',
    name: 'Old School',
    description: 'Old School, or Traditional, tattoos are recognized by their bold lines, bright, limited color palettes, and iconic symbols like roses, anchors, and nautical stars.'
  },
  {
    id: 'cartoon',
    name: 'Cartoon',
    description: 'Cartoon tattoos are inspired by animated characters and scenes, capturing the whimsical, vibrant, and sometimes exaggerated features of cartoon art.'
  },
  {
    id: 'watercolor',
    name: 'Watercolor',
    description: 'The watercolor tattoo style is distinguished by its use of vibrant colors and soft, flowing transitions that mimic the look of watercolor paintings on canvas.'
  },
  {
    id: 'dotwork',
    name: 'Dotwork',
    description: 'Dotwork consists of countless tiny dots to create intricate patterns, shading, and designs, often resulting in a texture that can\'t be achieved with traditional shading methods.'
  },
  {
    id: 'tribal',
    name: 'Tribal',
    description: 'Tribal tattoos are rooted in the traditional body art of indigenous and ancient cultures, characterized by black lines and shapes that form complex patterns and symbols.'
  },
  {
    id: 'abstract',
    name: 'Abstract',
    description: 'Abstract tattoos defy traditional forms and conventions, using shapes, splashes of ink, and non-representational forms to convey emotions or concepts.'
  },
  {
    id: 'negativeSpace',
    name: 'Negative Space',
    description: 'Negative space tattoos use the uninked skin to form part of the design, creating a contrast between the tattooed area and the natural skin.'
  },
  {
    id: 'lettering',
    name: 'Lettering',
    description: 'Lettering tattoos consist of words, phrases, or numbers, showcasing a wide variety of fonts, styles, and layouts, from elegant scripts to bold block letters.'
  },
  {
    id: 'biomechanical',
    name: 'Biomechanical',
    description: 'Biomechanical tattoos are inspired by the fusion of human anatomy and mechanical elements, creating a look that mimics machinery or robotics beneath the skin.'
  },
  {
    id: 'portrait',
    name: 'Portrait',
    description: 'Portrait tattoos capture the likeness of a person (or pet) with realistic detail and shading, requiring a high level of skill to accurately represent facial features and expressions.'
  },
  {
    id: '3d',
    name: '3D',
    description: 'The 3D tattoo style is designed to create an optical illusion of depth and realism, making the tattoo appear three-dimensional.'
  }
]; 

export const tattooPlacements: TattooPlacement[] = [
  {
    id: 'forearm',
    name: 'Forearm',
    description: 'The forearm is a popular and versatile placement that offers good visibility and moderate pain level. Works well for both small and medium-sized designs.',
    suitableFor: ['linear designs', 'text', 'small to medium artwork']
  },
  {
    id: 'upperArm',
    name: 'Upper Arm',
    description: 'The upper arm or bicep area is great for showcasing designs that can wrap around the arm. Pain level is generally low to moderate.',
    suitableFor: ['tribal designs', 'portraits', 'medium-sized artwork']
  },
  {
    id: 'shoulder',
    name: 'Shoulder',
    description: 'The shoulder provides a rounded canvas that works well for circular designs. Pain level is typically low due to muscle padding.',
    suitableFor: ['mandalas', 'circular designs', 'medium to large artwork']
  },
  {
    id: 'chest',
    name: 'Chest',
    description: 'The chest offers a large, flat canvas for significant pieces. Pain level varies, with areas closer to the sternum being more sensitive.',
    suitableFor: ['symmetrical designs', 'large artwork', 'statement pieces']
  },
  {
    id: 'back',
    name: 'Back',
    description: 'The back provides the largest canvas on the body, ideal for elaborate, detailed designs. Pain level varies depending on proximity to the spine.',
    suitableFor: ['large scenes', 'detailed artwork', 'full back pieces']
  },
  {
    id: 'calf',
    name: 'Calf',
    description: 'The calf muscle offers a good-sized canvas with relatively low pain. Great for designs that can be easily shown or concealed.',
    suitableFor: ['medium-sized artwork', 'animal designs', 'portrait pieces']
  },
  {
    id: 'thigh',
    name: 'Thigh',
    description: 'The thigh provides a large, flat canvas with relatively low pain. Excellent for larger, detailed pieces that you may want to keep private.',
    suitableFor: ['large detailed designs', 'private artwork', 'thematic pieces']
  },
  {
    id: 'ankle',
    name: 'Ankle',
    description: 'The ankle is good for small, delicate designs. Pain level can be higher due to thin skin and proximity to bone.',
    suitableFor: ['small designs', 'bracelets', 'minimalist artwork']
  },
  {
    id: 'foot',
    name: 'Foot',
    description: 'The foot offers an interesting canvas but comes with higher pain levels and faster fading due to friction. Best for designs you\'re willing to touch up.',
    suitableFor: ['small to medium designs', 'text', 'symbolic pieces']
  },
  {
    id: 'wrist',
    name: 'Wrist',
    description: 'The wrist is perfect for small, meaningful designs you want to see daily. Pain level is moderate due to thin skin and bones.',
    suitableFor: ['small designs', 'bracelets', 'text', 'symbols']
  },
  {
    id: 'ribcage',
    name: 'Ribcage',
    description: 'The ribcage offers a long, curved canvas but is known for being one of the more painful areas due to thin skin and bone proximity.',
    suitableFor: ['quote tattoos', 'long vertical designs', 'side pieces']
  },
  {
    id: 'neck',
    name: 'Neck',
    description: 'The neck is highly visible and can be quite painful. Best for those committed to visible body art.',
    suitableFor: ['small designs', 'text', 'symbolic pieces']
  },
  {
    id: 'hand',
    name: 'Hand',
    description: 'Hand tattoos are very visible and can fade faster due to frequent use and exposure. They can also be painful due to thin skin and bones.',
    suitableFor: ['symbols', 'minimal designs', 'finger tattoos']
  }
]; 

export const genderOptions: GenderOption[] = [
  {
    id: 'male',
    name: 'Male',
    description: 'Male body features, typically with more angular shapes and defined muscles.'
  },
  {
    id: 'female',
    name: 'Female',
    description: 'Female body features, typically with softer contours and curves.'
  },
  {
    id: 'neutral',
    name: 'Gender Neutral',
    description: 'Neutral body features that don\'t emphasize specific gender characteristics.'
  }
]; 