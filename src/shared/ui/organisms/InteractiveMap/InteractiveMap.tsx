import React from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';

export interface InteractiveMapProps {
  /**
   * Дочерние элементы (ваша карта, SVG, кабинеты).
   */
  children: React.ReactNode;
  /**
   * Минимальный масштаб.
   * @default 0.3
   */
  minScale?: number;
  /**
   * Максимальный масштаб.
   * @default 5
   */
  maxScale?: number;
  /**
   * Начальный масштаб.
   * @default 1
   */
  initialScale?: number;
  /**
   * Обработчик клика по карте.
   */
  onClick?: (coords: { x: number; y: number; scale: number }) => void;
  /**
   * Дополнительные классы.
   */
  className?: string;
}

const InteractiveMap = ({
  children,
  minScale = 0.3,
  maxScale = 5,
  initialScale = 1,
  onClick,
  className = '',
}: InteractiveMapProps) => {
  const [scale, setScale] = React.useState(initialScale);

  return (
    <div
      className={`relative h-[calc(100vh-160px)] overflow-hidden rounded-lg ${className}`}
      style={{
        paddingBottom: 'calc(env(safe-area-inset-bottom, 12px) + 12px)',
        marginBottom: 'env(safe-area-inset-bottom, 0px)',
      }}
    >
      <TransformWrapper
        initialScale={initialScale}
        minScale={minScale}
        maxScale={maxScale}
        limitToBounds={true}
        centerOnInit={true}
        wheel={{ step: 0.2 }}
        pinch={{ step: 5 }}
        doubleClick={{ step: 0.5, mode: 'zoomIn' }}
        onTransformed={({ state }) => {
          setScale(state.scale);
        }}
      >
        {({ zoomIn, zoomOut, resetTransform }) => (
          <>
            <TransformComponent
              wrapperStyle={{
                width: '100%',
                height: '100%',
                overflow: 'hidden',
              }}
            >
              <div
                onClick={(e) => {
                  if (onClick) {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    onClick({ x, y, scale });
                  }
                }}
                style={{ position: 'relative' }}
              >
                {children}
              </div>
            </TransformComponent>

            {/* Панель управления */}
            <div className="absolute bottom-1/10 right-4 flex flex-col gap-2 z-10">
              <button
                onClick={() => zoomIn()}
                className="w-10 h-10 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-300 dark:border-gray-600 flex items-center justify-center text-lg font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                aria-label="Увеличить"
              >
                +
              </button>
              <button
                onClick={() => zoomOut()}
                className="w-10 h-10 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-300 dark:border-gray-600 flex items-center justify-center text-lg font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                aria-label="Уменьшить"
              >
                -
              </button>
              <button
                onClick={() => resetTransform()}
                className="w-10 h-10 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-300 dark:border-gray-600 flex items-center justify-center text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                aria-label="Сбросить"
              >
                ↻
              </button>
            </div>

            {/* Индикатор масштаба */}
            <div className="absolute bottom-1/10 left-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm font-medium text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 z-10">
              {Math.round(scale * 100)}%
            </div>
          </>
        )}
      </TransformWrapper>
    </div>
  );
};

export default InteractiveMap;