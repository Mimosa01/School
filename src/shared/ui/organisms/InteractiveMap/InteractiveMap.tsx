import React from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';

export interface InteractiveMapProps {
  width: number;
  height: number;
  children: React.ReactNode;
  minScale?: number;
  maxScale?: number;
  initialScale?: number;
  initialPositionX?: number;
  initialPositionY?: number;
  onClick?: (coords: { x: number; y: number; scale: number }) => void;
  className?: string;
}

const InteractiveMap = ({
  width,
  height,
  children,
  minScale = 0.3,
  maxScale = 5,
  initialScale = 1,
  onClick,
  className = '',
}: InteractiveMapProps) => {
  const transformRef = React.useRef(null);
  const [scale, setScale] = React.useState(initialScale);

  const [initialX, setInitialX] = React.useState(0);
  const [initialY, setInitialY] = React.useState(0);

  React.useEffect(() => {
    setInitialX((window.innerWidth - width * initialScale) / 2);
    setInitialY((window.innerHeight - height * initialScale) / 2);
  }, [width, height, initialScale]);

  return (
    <div className={`relative overflow-hidden bg-gray-100 dark:bg-gray-800 rounded-lg ${className}`} style={{ width: '100%', height: '100%' }}>
      <TransformWrapper
        ref={transformRef}
        initialScale={initialScale}
        initialPositionX={initialX}
        initialPositionY={initialY}
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
              wrapperStyle={{ width: '100%', height: '100%', overflow: 'hidden' }}
              contentStyle={{ width: `${width}px`, height: `${height}px` }}
            >
              <div onClick={(e) => {
                if (onClick) {
                  const currentScale = scale;
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = (e.clientX - rect.left) / currentScale;
                  const y = (e.clientY - rect.top) / currentScale;
                  onClick({ x, y, scale: currentScale });
                }
              }}>
                {children}
              </div>
            </TransformComponent>

            <div className="absolute bottom-4 right-4 flex flex-col gap-2 z-10">
              <button onClick={() => zoomIn()} className="w-10 h-10 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-300 dark:border-gray-600 flex items-center justify-center text-lg font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors" aria-label="Увеличить">
                +
              </button>
              <button onClick={() => zoomOut()} className="w-10 h-10 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-300 dark:border-gray-600 flex items-center justify-center text-lg font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors" aria-label="Уменьшить">
                -
              </button>
              <button onClick={() => resetTransform()} className="w-10 h-10 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-300 dark:border-gray-600 flex items-center justify-center text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors" aria-label="Сбросить">
                ↻
              </button>
            </div>

            <div className="absolute bottom-4 left-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm font-medium text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 z-10">
              {Math.round(scale * 100)}%
            </div>
          </>
        )}
      </TransformWrapper>
    </div>
  );
};

export default InteractiveMap;