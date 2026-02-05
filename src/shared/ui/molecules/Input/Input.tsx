// atoms/Input/Input.tsx
import React, { forwardRef, useId, type InputHTMLAttributes } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  /**
   * Текст над полем (label).
   */
  label?: string;
  /**
   * Ошибка (если есть).
   */
  error?: string;
  /**
   * Иконка слева (например, лупа, email иконка).
   */
  leftIcon?: React.ReactNode;
  /**
   * Иконка справа (например, кнопка показать/скрыть пароль).
   */
  rightIcon?: React.ReactNode;
  /**
   * Размер поля.
   * @default 'md'
   */
  sizeClass?: 'sm' | 'md' | 'lg';
  /**
   * Дополнительные классы.
   */
  className?: string;
}

/**
 * Универсальное текстовое поле ввода.
 */
const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      leftIcon,
      rightIcon,
      sizeClass = 'md',
      className = '',
      id,
      ...props
    },
    ref
  ) => {
    const reactId = useId();
    const finalId = id || `input-${reactId}`;

    const sizeClasses = {
      sm: 'px-2.5 py-1.5 text-sm',
      md: 'px-3 py-2 text-base',
      lg: 'px-4 py-3 text-lg',
    };

    const hasLeftIcon = !!leftIcon;
    const hasRightIcon = !!rightIcon;

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={finalId}
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            {label}
          </label>
        )}

        <div className="relative">
          {/* Левая иконка */}
          {leftIcon && (
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              {leftIcon}
            </div>
          )}

          {/* Поле ввода */}
          <input
            ref={ref}
            id={finalId}
            {...props}
            className={`w-full border rounded-lg bg-white dark:bg-gray-800 
              text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
              disabled:bg-gray-100 disabled:cursor-not-allowed
              ${sizeClasses[sizeClass]}
              ${hasLeftIcon ? 'pl-10' : ''}
              ${hasRightIcon ? 'pr-10' : ''}
              ${error ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}
              ${className}`}
            aria-invalid={!!error}
            aria-describedby={error ? `${finalId}-error` : undefined}
          />

          {/* Правая иконка */}
          {rightIcon && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              {rightIcon}
            </div>
          )}
        </div>

        {/* Сообщение об ошибке */}
        {error && (
          <p id={`${finalId}-error`} className="mt-1 text-sm text-red-600 dark:text-red-400">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;