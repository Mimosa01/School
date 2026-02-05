import React, { useState, useEffect } from 'react';

export interface AnimatedItemProps {
  delay?: number;
  children: React.ReactNode;
  className?: string;
}

const AnimatedItem = ({ delay = 0, children, className = '' }: AnimatedItemProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Запускаем анимацию с задержкой
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
        transition: 'opacity 0.8s ease-out, transform 0.8s ease-out',
        visibility: 'visible',
      }}
    >
      {children}
    </div>
  );
};

export default AnimatedItem;