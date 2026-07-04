import React, { useEffect, useRef, useState } from 'react';

interface CounterStatProps {
  value: number;
  label: string;
  prefix?: string;
  suffix?: string;
  duration?: number;
}

export function CounterStat({
  value,
  label,
  prefix = '',
  suffix = '',
  duration = 2000,
}: CounterStatProps) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number | null = null;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(value * progress));

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(value);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible, value, duration]);

  return (
    <div
      ref={ref}
      className="text-center scroll-reveal"
    >
      <div className="text-4xl md:text-5xl font-bold text-gradient mb-2">
        {prefix}
        {count.toLocaleString()}
        {suffix}
      </div>
      <p className="text-sm md:text-base text-muted-foreground label-sm">{label}</p>
    </div>
  );
}

export default CounterStat;
