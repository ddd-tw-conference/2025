'use client';
import { useState } from 'react';

interface TopicTitleProps {
  title: string;
  maxLength?: number;
}

export const TopicTitle = ({ title, maxLength = 50 }: TopicTitleProps) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const shouldTruncate = title.length > maxLength;
  const displayTitle = shouldTruncate ? `${title.substring(0, maxLength)}...` : title;

  return (
    <div className="relative">
      <div 
        className="cursor-pointer hover:text-blue-600 transition-colors duration-150"
        onMouseEnter={() => shouldTruncate && setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        onTouchStart={() => shouldTruncate && setShowTooltip(!showTooltip)}
        title={shouldTruncate ? title : undefined}
      >
        <span className="block sm:inline">{displayTitle}</span>
      </div>
      
      {showTooltip && shouldTruncate && (
        <div className="absolute top-full left-0 mt-1 z-50 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
          <div className="bg-gray-900 text-white text-sm px-3 py-2 rounded-lg shadow-lg break-words">
            {title}
            <div className="absolute -top-1 left-4 w-2 h-2 bg-gray-900 transform rotate-45"></div>
          </div>
        </div>
      )}
    </div>
  );
};
