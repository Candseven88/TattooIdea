'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { tattooStyles } from '@/data/tattooStyles';

// 文件名映射函数
function getStyleFileName(styleName: string): string {
  const fileNameMap: { [key: string]: string } = {
    'Black and White': 'Black and white',
    'Negative Space': 'Negative space',
    'Old School': 'Old school',
    '3D': '3D'
  };
  
  return fileNameMap[styleName] || styleName;
}

export default function ImageDebugger() {
  const [failedImages, setFailedImages] = useState<string[]>([]);
  const [successImages, setSuccessImages] = useState<string[]>([]);

  const handleImageLoad = (styleName: string) => {
    setSuccessImages(prev => [...prev, styleName]);
  };

  const handleImageError = (styleName: string) => {
    setFailedImages(prev => [...prev, styleName]);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Image Loading Debugger</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
        {tattooStyles.map((style) => {
          const fileName = getStyleFileName(style.name);
          const imagePath = `/style/${fileName}.webp`;
          
          return (
            <div key={style.id} className="border rounded-lg p-2">
              <div className="text-xs mb-2">{style.name}</div>
              <div className="text-xs text-gray-500 mb-2">Path: {imagePath}</div>
              <div className="relative w-full h-32 bg-gray-100 rounded">
                <Image
                  src={imagePath}
                  alt={style.name}
                  fill
                  className="object-cover rounded"
                  onLoad={() => handleImageLoad(style.name)}
                  onError={() => handleImageError(style.name)}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-green-50 p-4 rounded-lg">
          <h3 className="font-semibold text-green-800 mb-2">
            ✅ Successfully Loaded ({successImages.length})
          </h3>
          <ul className="text-sm text-green-700">
            {successImages.map((name, index) => (
              <li key={index}>{name}</li>
            ))}
          </ul>
        </div>

        <div className="bg-red-50 p-4 rounded-lg">
          <h3 className="font-semibold text-red-800 mb-2">
            ❌ Failed to Load ({failedImages.length})
          </h3>
          <ul className="text-sm text-red-700">
            {failedImages.map((name, index) => (
              <li key={index}>{name}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
} 