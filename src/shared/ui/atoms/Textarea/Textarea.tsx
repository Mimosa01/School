import { forwardRef, type TextareaHTMLAttributes } from 'react';
import { useId } from 'react';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  /**
   * Текст над полем (label).
   */
  label?: string;
  /**
   * Сообщение об ошибке.
   */
  error?: string;
  /**
   * Подсказка под полем.
   */
  helperText?: string;
  /**
   * Размер поля.
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg';
  /**
   * Дополнительные классы.
   */
  className?: string;
}

/**
 * Универсальное многострочное текстовое поле.
 */
const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      error,
      helperText,
      size = 'md',
      className = '',
      id,
      rows = 4,
      disabled,
      ...props
    },
    ref
  ) => {
    const reactId = useId();
    const generatedId = id || `input-${reactId}`;

    const sizeClasses = {
      sm: 'px-2.5 py-1.5 text-sm',
      md: 'px-3 py-2 text-base',
      lg: 'px-4 py-3 text-lg',
    };

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={generatedId}
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            {label}
          </label>
        )}

        <textarea
          ref={ref}
          id={generatedId}
          rows={rows}
          disabled={disabled}
          {...props}
          className={`w-full min-h-20 rounded-lg border bg-white dark:bg-gray-800 
            text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
            disabled:bg-gray-100 disabled:cursor-not-allowed resize-y
            ${sizeClasses[size]}
            ${error ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}
            ${className}`}
          aria-invalid={!!error}
          aria-describedby={
            error
              ? `${generatedId}-error`
              : helperText
                ? `${generatedId}-helper`
                : undefined
          }
        />

        {/* Сообщение об ошибке или подсказка */}
        {(error || helperText) && (
          <p
            id={error ? `${generatedId}-error` : `${generatedId}-helper`}
            className={`mt-1 text-sm ${
              error
                ? 'text-red-600 dark:text-red-400'
                : 'text-gray-500 dark:text-gray-400'
            }`}
          >
            {error || helperText}
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

export default Textarea;