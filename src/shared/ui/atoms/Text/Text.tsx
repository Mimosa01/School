import React from 'react';

type TextSize = 'xs' | 'sm' | 'base' | 'lg';
type TextColor = 'default' | 'muted' | 'primary' | 'success' | 'warning' | 'danger' | 'white';

export interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  /**
   * Размер текста.
   * @default 'base'
   */
  size?: TextSize;
  /**
   * Цвет текста (с поддержкой темной темы).
   * @default 'default'
   */
  color?: TextColor;
  /**
   * Жирность шрифта.
   * @default 'normal'
   */
  weight?: 'normal' | 'medium' | 'semibold';
  /**
   * Курсив.
   */
  italic?: boolean;
  /**
   * Подчёркивание.
   */
  underline?: boolean;
  /**
   * Выравнивание.
   * @default 'left'
   */
  align?: 'left' | 'center' | 'right';
  /**
   * Использовать `<span>` вместо `<p>`.
   * Полезно для встраивания в строки.
   */
  inline?: boolean;
  /**
   * Дополнительные классы.
   */
  className?: string;
  /**
   * Текстовое содержимое.
   */
  children: React.ReactNode;
}

/**
 * Универсальный компонент для отображения обычного текста: абзацев, подписей, пояснений.
 * Не предназначен для заголовков — используйте <Heading> для них.
 */
const Text = React.forwardRef<HTMLParagraphElement, TextProps>(
  (
    {
      size = 'base',
      color = 'default',
      weight = 'normal',
      italic = false,
      underline = false,
      align = 'left',
      inline = false,
      className = '',
      children,
      ...props
    },
    ref
  ) => {
    const Tag = inline ? 'span' : 'p';

    const sizeClasses: Record<TextSize, string> = {
      xs: 'text-xs',
      sm: 'text-sm',
      base: 'text-base',
      lg: 'text-lg',
    };

    const weightClasses: Record<typeof weight, string> = {
      normal: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
    };

    const colorClasses: Record<TextColor, string> = {
      default: 'text-gray-900 dark:text-gray-100',
      muted: 'text-gray-500 dark:text-gray-400',
      primary: 'text-blue-600 dark:text-blue-400',
      success: 'text-green-600 dark:text-green-400',
      warning: 'text-yellow-600 dark:text-yellow-400',
      danger: 'text-red-600 dark:text-red-400',
      white: 'text-white',
    };

    const alignmentClass = {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
    }[align];

    const classes = [
      sizeClasses[size],
      weightClasses[weight],
      colorClasses[color],
      italic && 'italic',
      underline && 'underline',
      alignmentClass,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <Tag ref={ref} className={classes} {...props}>
        {children}
      </Tag>
    );
  }
);

Text.displayName = 'Text';

export default Text;