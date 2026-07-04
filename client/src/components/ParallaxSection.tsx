import React, { useEffect, useRef, useState } from 'react';

interface ParallaxSectionProps {
  children: React.ReactNode;
  backgroundImage?: string;
  speed?: number;
  className?: string;
}

export function ParallaxSection({
  children,
  backgroundImage,
  speed = 0.8,
  className = '',
}: ParallaxSectionProps) {
  const [offset, setOffset] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const elementTop = rect.top;
      const elementHeight = rect.height;
      const windowHeight = window.innerHeight;

      // Only calculate parallax when element is in view
      if (elementTop < windowHeight && elementTop + elementHeight > 0) {
        const scrolled = window.scrollY;
        const elementScrollPosition = scrolled + elementTop;
        setOffset((elementScrollPosition - scrolled) * speed);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return (
    <div
      ref={sectionRef}
      className={`relative overflow-hidden ${className}`}
      style={{
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      {backgroundImage && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            transform: `translateY(${offset}px)`,
            transition: 'transform 0.1s ease-out',
          }}
        />
      )}
      <div className="relative z-10">{children}</div>
    </div>
  );
}

export default ParallaxSection;
