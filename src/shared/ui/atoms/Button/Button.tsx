import React from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Вариант стилизации кнопки.
   * @default 'primary'
   */
  variant?: ButtonVariant;
  /**
   * Размер кнопки.
   * @default 'md'
   */
  size?: ButtonSize;
  /**
   * Отображать ли индикатор загрузки.
   * Блокирует клики и заменяет children на spinner (если не переопределён).
   */
  loading?: boolean;
  /**
   * Иконка слева от текста (React-элемент).
   */
  leftIcon?: React.ReactNode;
  /**
   * Иконка справа от текста (React-элемент).
   */
  rightIcon?: React.ReactNode;
  /**
   * Пользовательский спиннер (отображается при `loading={true}`).
   * По умолчанию — простой точечный индикатор.
   */
  spinner?: React.ReactNode;
  /**
   * Дополнительные классы для кастомизации.
   */
  className?: string;
}

/**
 * Универсальная кнопка с поддержкой тем, состояний, иконок и доступности.
 * Использует Tailwind CSS для стилизации.
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled,
  leftIcon,
  rightIcon,
  spinner,
  children,
  className = '',
  type = 'button',
  ...props
}, ref) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 transition-all duration-150 ease-in-out disabled:cursor-not-allowed';

  const sizeClasses = {
    sm: 'px-2.5 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  };

  const variantClasses = {
    primary: 'bg-emerald-500 text-white hover:bg-emerald-700 focus-visible:ring-emerald-500 disabled:bg-emerald-400 dark:bg-emerald-500 dark:hover:bg-emerald-600 dark:focus-visible:ring-emerald-400 dark:disabled:bg-emerald-700',
    secondary: 'bg-slate-100 text-slate-800 hover:bg-slate-200 focus-visible:ring-slate-500 disabled:bg-slate-50 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600 dark:focus-visible:ring-slate-400 dark:disabled:bg-slate-800',
    outline: 'border border-slate-300 bg-transparent text-slate-700 hover:bg-slate-50 focus-visible:ring-slate-500 disabled:text-slate-400 disabled:border-slate-200 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-800 dark:focus-visible:ring-slate-400 dark:disabled:border-slate-700',
    ghost: 'bg-transparent text-slate-700 hover:bg-slate-100 focus-visible:ring-slate-500 disabled:text-slate-400 dark:text-slate-300 dark:hover:bg-slate-800 dark:focus-visible:ring-slate-400',
    danger: 'bg-rose-600 text-white hover:bg-rose-700 focus-visible:ring-rose-500 disabled:bg-rose-400 dark:bg-rose-500 dark:hover:bg-rose-600 dark:focus-visible:ring-rose-400 dark:disabled:bg-rose-700',
  };

  const defaultSpinner = (
    <svg
      className="animate-spin h-4 w-4"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  );

  const effectiveSpinner = spinner || defaultSpinner;

  const isDisabled = disabled || loading;

  return (
    <button
      ref={ref}
      type={type}
      disabled={isDisabled}
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {loading ? (
        <>
          {effectiveSpinner}
          <span className="sr-only">Загрузка…</span>
        </>
      ) : (
        <>
          {leftIcon && <span className="mr-2">{leftIcon}</span>}
          {children}
          {rightIcon && <span className="ml-2">{rightIcon}</span>}
        </>
      )}
    </button>
  );
});

Button.displayName = 'Button';

export default Button;