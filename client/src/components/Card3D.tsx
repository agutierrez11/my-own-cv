import React, { useRef, useState } from 'react';

interface Card3DProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: 'accent' | 'secondary';
}

export function Card3D({ children, className = '', glowColor = 'secondary' }: Card3DProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const x = e.clientX - rect.left - centerX;
    const y = e.clientY - rect.top - centerY;

    const rotX = (y / centerY) * 5;
    const rotY = (x / centerX) * -5;

    setRotateX(rotX);
    setRotateY(rotY);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`
        card-3d rounded-2xl overflow-hidden
        ${glowColor === 'accent' ? 'glow-accent' : 'glow-secondary'}
        ${className}
      `}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transition: rotateX === 0 && rotateY === 0 ? 'transform 0.3s ease-out' : 'none',
      }}
    >
      {children}
    </div>
  );
}

export default Card3D;
