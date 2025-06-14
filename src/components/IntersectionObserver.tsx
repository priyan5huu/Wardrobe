import React, { useEffect, useRef, useState } from 'react';

interface IntersectionObserverProps {
  children: React.ReactNode;
  threshold?: number;
  rootMargin?: string;
  className?: string;
  animationClass?: string;
}

export function IntersectionObserver({ 
  children, 
  threshold = 0.1, 
  rootMargin = '0px',
  className = '',
  animationClass = 'animate-fade-in-up'
}: IntersectionObserverProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold, rootMargin }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return (
    <div 
      ref={ref} 
      className={`${className} ${isVisible ? animationClass : 'opacity-0'}`}
    >
      {children}
    </div>
  );
}