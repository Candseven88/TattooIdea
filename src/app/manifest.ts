import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'AI Tattoo Ideas Generator - Custom Tattoo Design Tool',
    short_name: 'TattooIdea AI',
    description: 'Create unique tattoo designs with AI. Generate custom tattoo ideas for men and women, from phoenix tattoos to hand tattoos.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#6366f1',
    icons: [
      {
        src: '/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable'
      },
      {
        src: '/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any'
      },
      {
        src: '/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png'
      },
      {
        src: '/favicon-16x16.png',
        sizes: '16x16',
        type: 'image/png'
      },
      {
        src: '/favicon-32x32.png',
        sizes: '32x32',
        type: 'image/png'
      }
    ],
    categories: ['design', 'art', 'lifestyle', 'entertainment'],
    lang: 'en-US',
    orientation: 'portrait',
    scope: '/',
    id: 'tattoo-idea-generator',
    screenshots: [
      {
        src: '/screenshots/desktop-home.png',
        sizes: '1280x720',
        type: 'image/png',
        form_factor: 'wide',
        label: 'AI Tattoo Generator Homepage'
      },
      {
        src: '/screenshots/mobile-generator.png',
        sizes: '390x844',
        type: 'image/png',
        form_factor: 'narrow',
        label: 'Mobile Tattoo Generator'
      }
    ],
    shortcuts: [
      {
        name: 'Generate Tattoo',
        short_name: 'Generate',
        description: 'Create a new tattoo design with AI',
        url: '/#generator',
        icons: [{ src: '/icons/generate-icon.png', sizes: '96x96' }]
      },
      {
        name: 'Browse Ideas',
        short_name: 'Ideas',
        description: 'Browse tattoo inspiration gallery',
        url: '/#gallery',
        icons: [{ src: '/icons/gallery-icon.png', sizes: '96x96' }]
      },
      {
        name: 'Blog Articles',
        short_name: 'Blog',
        description: 'Read tattoo design guides and tips',
        url: '/blog',
        icons: [{ src: '/icons/blog-icon.png', sizes: '96x96' }]
      }
    ],
    prefer_related_applications: false
  }
} 