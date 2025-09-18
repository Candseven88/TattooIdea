import phoenixTattooIdeas from './phoenix-tattoo-ideas';
import creativeHandTattoos from './creative-hand-tattoos';
import tattooIdeasForWomen from './tattoo-ideas-for-women';
import tattooIdeasForMen from './tattoo-ideas-for-men';
import aiTattooGeneratorRevolution from './ai-tattoo-generator-revolution';
import findingPerfectTattooStyle from './finding-perfect-tattoo-style';
import legionnairesLymeDiseaseAndTattooSafety from './legionnaires-lyme-disease-tattoo-safety';
import { ambigramTattooGeneratorGuide } from './ambigram-tattoo-generator-guide';
import aiPhotoEditorGuide from './ai-photo-editor-guide';

import { BlogPost } from '../blogPosts';

// Export all blog posts
const blogPosts: BlogPost[] = [
  phoenixTattooIdeas,
  creativeHandTattoos,
  tattooIdeasForWomen,
  tattooIdeasForMen,
  aiTattooGeneratorRevolution,
  findingPerfectTattooStyle,
  legionnairesLymeDiseaseAndTattooSafety,
  ambigramTattooGeneratorGuide,
  aiPhotoEditorGuide
];

export default blogPosts;

// Helper function to get a blog post by slug
export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find(post => post.slug === slug);
} 