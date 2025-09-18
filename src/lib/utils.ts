import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * 合并Tailwind类名
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * 获取纹身风格特点
 * @param styleId 风格ID
 * @returns 风格特点列表
 */
export function getStyleCharacteristics(styleId: string): string[] {
  switch (styleId) {
    case 'sketch':
      return ['Freehand appearance', 'Line variations', 'Raw and unfinished look', 'Artistic freedom'];
    case 'realistic':
      return ['Photorealistic details', 'Precise shading', 'Dimensional appearance', 'Natural textures'];
    case 'minimalist':
      return ['Clean lines', 'Simple designs', 'Often monochromatic', 'Negative space usage'];
    case 'blackAndWhite':
      return ['No color usage', 'Strong contrast', 'Various shades of grey', 'Bold linework'];
    case 'surreal':
      return ['Dreamlike imagery', 'Impossible scenarios', 'Distorted reality', 'Symbolic elements'];
    case 'geometric':
      return ['Precise shapes', 'Mathematical patterns', 'Symmetry', 'Modern aesthetic'];
    case 'blackwork':
      return ['Solid black ink', 'Bold impact', 'Strong silhouettes', 'Negative space contrast'];
    case 'japanese':
      return ['Traditional imagery', 'Bold colors', 'Storytelling elements', 'Cultural symbolism'];
    case 'oldSchool':
      return ['Bold outlines', 'Limited color palette', 'Iconic symbols', 'Vintage aesthetic'];
    case 'cartoon':
      return ['Animated characters', 'Exaggerated features', 'Vibrant colors', 'Playful style'];
    case 'watercolor':
      return ['Paint-like appearance', 'Color bleeding effects', 'Soft transitions', 'Artistic freedom'];
    case 'dotwork':
      return ['Tiny dots technique', 'Texture through density', 'Gradient effects', 'Precision work'];
    case 'tribal':
      return ['Bold black patterns', 'Cultural influences', 'Symbolic meanings', 'Flowing designs'];
    case 'abstract':
      return ['Non-representational forms', 'Emotional expression', 'Color experimentation', 'Artistic freedom'];
    case 'negativeSpace':
      return ['Clever use of blank areas', 'Visual illusions', 'Minimalist approach', 'Conceptual designs'];
    case 'lettering':
      return ['Typography focus', 'Font variations', 'Text as art', 'Message importance'];
    case 'biomechanical':
      return ['Machine-human fusion', 'Mechanical elements', 'Organic integration', 'Sci-fi aesthetic'];
    case 'portrait':
      return ['Facial likeness', 'Emotional expression', 'Detailed features', 'Personal significance'];
    case '3d':
      return ['Depth illusion', 'Realistic shadows', 'Dimensional appearance', 'Visual trickery'];
    default:
      return ['Unique aesthetic', 'Artistic expression', 'Personal meaning', 'Cultural significance'];
  }
}

/**
 * 处理图片下载
 * @param imageUrl 图片URL
 */
export function handleImageDownload(imageUrl: string) {
  // 在新标签页中打开图片
  window.open(imageUrl, '_blank');
}

/**
 * 处理社交媒体分享
 * @param platform 平台名称
 * @param imageUrl 图片URL
 */
export function handleSocialShare(platform: string, imageUrl: string) {
  const shareUrl = encodeURIComponent(window.location.href);
  const shareTitle = encodeURIComponent(`Check out my tattoo design created with TattooIdea!`);
  const shareImage = encodeURIComponent(imageUrl);
  
  let shareLink = '';
  
  switch (platform) {
    case 'facebook':
      shareLink = `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`;
      break;
    case 'twitter':
      shareLink = `https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareTitle}`;
      break;
    case 'pinterest':
      shareLink = `https://pinterest.com/pin/create/button/?url=${shareUrl}&media=${shareImage}&description=${shareTitle}`;
      break;
    case 'instagram':
      // Instagram没有直接分享API，显示一条消息
      alert('To share on Instagram, please screenshot the design and upload it to your Instagram account.');
      return;
    default:
      return;
  }
  
  // 在新窗口中打开，指定尺寸
  window.open(shareLink, '_blank', 'width=600,height=400,noopener,noreferrer');
} 