import React from 'react';

export interface SurfaceProps {
  /**
   * Дочерние элементы (текст, кнопки и т.д.)
   */
  children: React.ReactNode;
  /**
   * Дополнительные CSS-классы для кастомизации
   */
  className?: string;
}

/**
 * Белая подложка с закруглёнными углами, тенью и внутренними отступами.
 * Идеально подходит как контейнер для текста, форм, кнопок и других UI-элементов.
 */
const Surface = ({ children, className = '' }: SurfaceProps) => {
  return (
    <div
      className={`bg-white dark:bg-gray-800 rounded-xl p-2 shadow-sm border border-gray-200 dark:border-gray-700 ${className}`}
    >
      {children}
    </div>
  );
};

export default Surface;