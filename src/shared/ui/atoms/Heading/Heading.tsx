import React, { createElement } from 'react';

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
type HeadingSize = 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl';
type HeadingColor = 'default' | 'muted' | 'primary' | 'white';

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  /**
   * Уровень заголовка (определяет HTML-тег: h1, h2, ...).
   * @default 2
   */
  level?: HeadingLevel;
  /**
   * Визуальный размер текста (не обязательно совпадает с level).
   * @default зависит от level
   */
  size?: HeadingSize;
  /**
   * Цвет текста.
   * @default 'default'
   */
  color?: HeadingColor;
  /**
   * Жирность шрифта.
   * @default 'bold'
   */
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
  /**
   * Курсив.
   */
  italic?: boolean;
  /**
   * Выравнивание.
   * @default 'left'
   */
  align?: 'left' | 'center' | 'right';
  /**
   * Дополнительные классы.
   */
  className?: string;
  /**
   * Текст заголовка.
   */
  children: React.ReactNode;
}

/**
 * Семантический компонент для заголовков (h1–h6).
 * Поддерживает независимую настройку визуального размера и уровня иерархии.
 */
const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  (
    {
      level = 2,
      size,
      color = 'default',
      weight = 'bold',
      italic = false,
      align = 'left',
      className = '',
      children,
      ...props
    },
    ref
  ) => {

    // Автоматический размер по умолчанию, если не задан явно
    const defaultSizeMap: Record<HeadingLevel, HeadingSize> = {
      1: '4xl',
      2: '3xl',
      3: '2xl',
      4: 'xl',
      5: 'lg',
      6: 'base',
    };

    const effectiveSize = size || defaultSizeMap[level];

    const sizeClasses: Record<HeadingSize, string> = {
      xs: 'text-xs',
      sm: 'text-sm',
      base: 'text-base',
      lg: 'text-lg',
      xl: 'text-xl',
      '2xl': 'text-2xl',
      '3xl': 'text-3xl',
      '4xl': 'text-4xl',
      '5xl': 'text-5xl',
      '6xl': 'text-6xl',
    };

    const weightClasses: Record<typeof weight, string> = {
      normal: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
    };

    const colorClasses: Record<HeadingColor, string> = {
      default: 'text-gray-900 dark:text-white',
      muted: 'text-gray-500 dark:text-gray-400',
      primary: 'text-blue-600 dark:text-blue-400',
      white: 'text-white',
    };

    const alignmentClass = {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
    }[align];

    const classes = [
      sizeClasses[effectiveSize],
      weightClasses[weight],
      colorClasses[color],
      italic && 'italic',
      alignmentClass,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return createElement(
      `h${level}`,
      {
        ref,
        className: classes,
        ...props,
      },
      children
    );
  }
);

Heading.displayName = 'Heading';

export default Heading;