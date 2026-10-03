import React from 'react';

interface SectionHeadingProps {
  headline: string;
  subheadline?: string;
  alignment?: 'left' | 'center';
}

const SectionHeading: React.FC<SectionHeadingProps> = ({ headline, subheadline, alignment = 'center' }) => {
  return (
    <div className={`mb-16 ${alignment === 'center' ? 'text-center' : 'text-left'}`}>
      <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4">
        {headline}
      </h2>
      {subheadline && (
        <p className="text-lg md:text-xl text-text-muted max-w-2xl mx-auto">
          {subheadline}
        </p>
      )}
    </div>
  );
};

export default SectionHeading;
