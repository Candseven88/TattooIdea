import React from 'react';
import Image from 'next/image';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { motion } from 'framer-motion';

interface InspirationCardProps {
  src: string;
  alt: string;
}

const InspirationCard = ({ src, alt }: InspirationCardProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <motion.div
          whileHover={{ scale: 1.03 }}
          transition={{ type: "spring", stiffness: 400 }}
          className="cursor-pointer"
        >
          <Card className="overflow-hidden bg-transparent border-0 shadow-lg">
            <AspectRatio ratio={1 / 1}>
              <div className="relative w-full h-full bg-gray-100/30">
                <Image
                  src={src}
                  alt={alt}
                  fill
                  className="object-contain rounded-lg"
                />
              </div>
            </AspectRatio>
          </Card>
        </motion.div>
      </DialogTrigger>
      <DialogContent className="max-w-3xl p-0 border-0 bg-transparent">
        <div className="relative w-full max-h-[80vh] overflow-hidden">
          <Image
            src={src}
            alt={alt}
            width={800}
            height={800}
            className="object-contain w-full h-auto"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InspirationCard; 