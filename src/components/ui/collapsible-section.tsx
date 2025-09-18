import React from 'react';

interface CollapsibleSectionProps {
  title: string;
  icon: React.ReactNode;
  content: string;
  isExpanded: boolean;
  onToggle: () => void;
}

export function CollapsibleSection({ 
  title, 
  icon, 
  content, 
  isExpanded, 
  onToggle 
}: CollapsibleSectionProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-md shadow-sm overflow-hidden border border-border">
      <button 
        onClick={onToggle}
        className="w-full p-3 flex items-center justify-between text-left hover:bg-muted/50 transition-colors"
      >
        <div className="flex items-center">
          <div className="flex-shrink-0 h-5 w-5 text-primary mr-2">
            {icon}
          </div>
          <span className="font-medium">{title}</span>
        </div>
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className={`h-5 w-5 text-muted-foreground transform transition-transform ${isExpanded ? 'rotate-180' : ''}`} 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isExpanded && (
        <div className="p-3 pt-0 border-t border-border">
          <p className="text-sm whitespace-pre-line">{content}</p>
        </div>
      )}
    </div>
  );
} 