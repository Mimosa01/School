import{ useRef, useLayoutEffect, useState } from 'react';

export type SegmentedValue = string | number;

export interface SegmentedControlProps {
  options: { label: string; value: SegmentedValue }[];
  value: SegmentedValue;
  onChange: (value: SegmentedValue) => void;
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  className?: string;
}

const SegmentedControl = ({
  options,
  value,
  onChange,
  size = 'md',
  disabled = false,
  className = '',
}: SegmentedControlProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [sliderStyle, setSliderStyle] = useState({ left: 0, width: 0 });

  const sizeClasses = {
    sm: 'min-h-6 text-xs',
    md: 'min-h-8 text-sm',
    lg: 'min-h-10 text-base',
  };

  const paddingClasses = {
    sm: 'px-2',
    md: 'px-3',
    lg: 'px-4',
  };

  // Обновляем позицию ползунка при изменении значения или размера
  useLayoutEffect(() => {
    if (!containerRef.current) return;

    const activeIndex = options.findIndex((opt) => opt.value === value);
    if (activeIndex === -1) return;

    const buttons = containerRef.current.querySelectorAll('button');
    const activeButton = buttons[activeIndex] as HTMLElement;

    if (activeButton) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const buttonRect = activeButton.getBoundingClientRect();

      setSliderStyle({
        left: buttonRect.left - containerRect.left,
        width: buttonRect.width,
      });
    }
  }, [value, options, size]); // ← зависимость от size на случай адаптивности

  const isFirst = (index: number) => index === 0;
  const isLast = (index: number) => index === options.length - 1;

  return (
    <div
      ref={containerRef}
      role="radiogroup"
      className={`inline-flex relative w-full h-fit rounded-full bg-gray-200 dark:bg-gray-700 p-0.5 ${sizeClasses[size]} ${className}`}
      aria-disabled={disabled}
    >
      {options.map((option, index) => (
        <button
          key={option.value.toString()}
          type="button"
          role="radio"
          aria-checked={option.value === value}
          aria-label={option.label}
          onClick={() => !disabled && onChange(option.value)}
          disabled={disabled}
          className={`relative z-10 flex-1 rounded-full transition-colors duration-200 focus:outline-none ${
            option.value === value
              ? 'text-gray-900 dark:text-white font-medium'
              : 'text-gray-700 dark:text-gray-300'
          } ${paddingClasses[size]} ${
            disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
          }`}
          style={{
            borderTopLeftRadius: isFirst(index) ? '9999px' : '0',
            borderBottomLeftRadius: isFirst(index) ? '9999px' : '0',
            borderTopRightRadius: isLast(index) ? '9999px' : '0',
            borderBottomRightRadius: isLast(index) ? '9999px' : '0',
          }}
        >
          {option.label}
        </button>
      ))}

      {/* Ползунок */}
      <div
        className="absolute top-0.5 bottom-0.5 bg-white dark:bg-gray-800 rounded-full shadow-sm transition-all duration-200 ease-out"
        style={{
          left: sliderStyle.left,
          width: sliderStyle.width,
        }}
        aria-hidden="true"
      />
    </div>
  );
};

export default SegmentedControl;