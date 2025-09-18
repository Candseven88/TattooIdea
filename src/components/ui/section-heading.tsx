"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface SectionHeadingProps {
  title: string;
  description?: string;
  className?: string;
}

export function SectionHeading({ title, description, className = '' }: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className={`mb-12 text-center ${className}`}
    >
      <h2 className="text-3xl font-bold inline-block bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-blue-500 to-pink-600 mb-4">{title}</h2>
      {description && <p className="text-muted-foreground max-w-2xl mx-auto">{description}</p>}
    </motion.div>
  );
} 