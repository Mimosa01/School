import React from 'react';

export interface StickyActionFooterProps {
  /**
   * Дочерние элементы (обычно кнопки).
   */
  children: React.ReactNode;
  /**
   * Выравнивание содержимого.
   * @default 'right'
   */
  align?: 'left' | 'center' | 'right' | 'space-between';
  /**
   * Дополнительные классы.
   */
  className?: string;
}

/**
 * Прилипающая нижняя панель для действий (кнопок).
 * Используется в мобильных интерфейсах, модальных окнах или как глобальный action bar.
 * Учитывает безопасную область (safe area) на iOS/Android.
 */
const StickyActionFooter = ({
  children,
  align = 'right',
  className = '',
}: StickyActionFooterProps) => {
  const alignmentClass = {
    left: 'justify-start',
    center: 'justify-center',
    right: 'justify-end',
    'space-between': 'justify-between',
  }[align];

  return (
    <div
      className={`fixed bottom-0 left-0 md:left-1/2 right-0 md:transform md:-translate-x-1/2 z-10 bg-white dark:bg-gray-800 border-t md:border md:rounded-t-xl border-gray-200 dark:border-gray-700 py-3 px-4 
        flex items-center gap-3 ${alignmentClass} ${className}`}
      style={{
        paddingBottom: 'calc(env(safe-area-inset-bottom, 12px) + 12px)',
        marginBottom: 'env(safe-area-inset-bottom, 0px)',
      }}
    >
      {children}
    </div>
  );
};

export default StickyActionFooter;