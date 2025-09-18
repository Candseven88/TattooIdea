import React, { useState } from 'react';
import InspirationCard from './InspirationCard';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface InspirationGalleryProps {
  title?: string;
}

const InspirationGallery = ({ title = "Tattoo Ideas Gallery" }: InspirationGalleryProps) => {
  const [currentPage, setCurrentPage] = useState(0);
  const imagesPerPage = 8;
  
  const inspirationImages = [
    { src: '/inspiration/An Hourglass Moon Dream Catcher Filled.webp', alt: 'Hourglass Moon Dream Catcher - Unique tattoo idea for women' },
    { src: '/inspiration/Angel Wings Behind A Sword, Roses.webp', alt: 'Angel Wings with Sword and Roses - Popular tattoo idea for men' },
    { src: '/inspiration/Archangel Uriel.webp', alt: 'Archangel Uriel - Spiritual tattoo idea for men and women' },
    { src: '/inspiration/Burning Wing Of A Phoenix Rising From.webp', alt: 'Phoenix Rising From Ashes - Symbolic phoenix tattoo design' },
    { src: '/inspiration/Chinese Dragon And Phoenix And Skull.webp', alt: 'Chinese Dragon with Phoenix and Skull - Asian inspired tattoo idea' },
    { src: '/inspiration/Compass.webp', alt: 'Compass Design - Minimalist tattoo idea for men' },
    { src: '/inspiration/Crooked Scary Looking Tree Wich Gnarled..webp', alt: 'Gnarled Tree Design - Nature inspired tattoo idea' },
    { src: '/inspiration/Crowned Lion Face.webp', alt: 'Crowned Lion Face - Strength symbol tattoo idea for men' },
    { src: '/inspiration/Filigree Design With Playing Cards.webp', alt: 'Filigree Design with Playing Cards - Gambling themed tattoo idea' },
    { src: '/inspiration/Gothic Tree Of Life Intertwined With.webp', alt: 'Gothic Tree Of Life - Symbolic tattoo idea for women' },
    { src: '/inspiration/Growling Wolf Face And Realistic Rocky.webp', alt: 'Growling Wolf Face - Realistic animal tattoo idea for men' },
    { src: '/inspiration/Hooded Arch Angel Defeating A Demon.webp', alt: 'Hooded Arch Angel Defeating A Demon - Religious tattoo design' },
    { src: '/inspiration/Hooded Reaper Silohuette, Smoke, Fire.webp', alt: 'Hooded Reaper with Smoke and Fire - Dark themed tattoo idea' },
    { src: '/inspiration/Hooded Reaper.webp', alt: 'Hooded Reaper - Gothic tattoo idea for men' },
    { src: '/inspiration/Massive Forest Landscape With Huge Moon.webp', alt: 'Forest Landscape With Moon - Nature tattoo idea for forearm' },
    { src: '/inspiration/Peace And Lightining Storm And Time.webp', alt: 'Peace Symbol with Storm - Abstract tattoo idea' },
    { src: '/inspiration/Scorpio And Capricorn Tattoo Design.webp', alt: 'Scorpio And Capricorn - Zodiac tattoo idea for couples' },
    { src: '/inspiration/Stairway To Heaven Walking Up Stairs.webp', alt: 'Stairway To Heaven - Spiritual tattoo idea for back placement' },
    { src: '/inspiration/Two Rose Wrapped One Black One Red.webp', alt: 'Black and Red Roses - Floral tattoo idea for women' },
    { src: '/inspiration/Wolf And Mountains And Trees.webp', alt: 'Wolf With Mountains And Trees - Nature tattoo idea for men' },
    { src: '/inspiration/Wolf And Woods And Mountains.webp', alt: 'Wolf In Woods With Mountains - Wilderness tattoo design' },
    { src: '/inspiration/Wolf With Blue Eyes On Armor Tattoo.webp', alt: 'Wolf With Blue Eyes On Armor - Fantasy tattoo idea for sleeve' },
  ];

  const totalPages = Math.ceil(inspirationImages.length / imagesPerPage);
  const currentImages = inspirationImages.slice(
    currentPage * imagesPerPage,
    (currentPage + 1) * imagesPerPage
  );

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">{title}</h2>
        <div className="flex items-center space-x-2">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={prevPage}
            disabled={totalPages <= 1}
            aria-label="Previous page of tattoo ideas"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm">
            {currentPage + 1} / {totalPages}
          </span>
          <Button 
            variant="outline" 
            size="icon" 
            onClick={nextPage}
            disabled={totalPages <= 1}
            aria-label="Next page of tattoo ideas"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <AnimatePresence mode="wait">
          {currentImages.map((image, index) => (
            <motion.div
              key={`${currentPage}-${index}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <InspirationCard src={image.src} alt={image.alt} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default InspirationGallery; 