import React, { useRef, useEffect } from 'react';

export interface RoutePoint {
  x: number;
  y: number;
  id?: string;
  name?: string;
}

interface RoutePathProps {
  points: RoutePoint[];          // Массив точек маршрута
  showMarkers?: boolean;         // Показывать маркеры в точках
  showArrows?: boolean;          // Показывать стрелки направления
  color?: string;                // Цвет линии
  strokeWidth?: number;          // Толщина линии
  animated?: boolean;            // Анимация появления
  className?: string;
}

const RoutePath = ({
  points,
  showMarkers = true,
  showArrows = true,
  color = '#3b82f6',             // Синий по умолчанию
  strokeWidth = 4,
  animated = true,
  className = '',
}: RoutePathProps) => {
  const pathRef = useRef<SVGPathElement>(null);
  const [pathLength, setPathLength] = React.useState(0);

  // Вычисляем длину пути для анимации
  useEffect(() => {
    if (pathRef.current && animated) {
      const length = pathRef.current.getTotalLength();
      setPathLength(length);
    }
  }, [points, animated]);

  // Формируем путь SVG
  const pathD = React.useMemo(() => {
    if (points.length < 2) return '';
    
    return points
      .map((point, index) => {
        if (index === 0) {
          return `M ${point.x} ${point.y}`;
        }
        return `L ${point.x} ${point.y}`;
      })
      .join(' ');
  }, [points]);

  if (points.length < 2) return null;

  return (
    <div className={`absolute inset-0 pointer-events-none z-200 ${className}`}>
      <svg className="absolute inset-0 w-full h-full">
        {/* Тень пути */}
        <path
          d={pathD}
          fill="none"
          stroke="rgba(0, 0, 0, 0.1)"
          strokeWidth={strokeWidth + 4}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        
        {/* Основной путь */}
        <path
          ref={pathRef}
          d={pathD}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={animated ? pathLength : 0}
          strokeDashoffset={animated ? pathLength : 0}
          style={{
            transition: animated ? 'stroke-dashoffset 0.8s ease-out' : 'none',
            strokeDashoffset: animated ? 0 : undefined,
          }}
        />
        
        {/* Стрелки направления */}
        {showArrows && points.length > 2 && (
          <>
            {points.slice(0, -1).map((point, index) => {
              const nextPoint = points[index + 1];
              if (!nextPoint) return null;
              
              // Позиция стрелки (30% от отрезка)
              const arrowX = point.x + (nextPoint.x - point.x) * 0.3;
              const arrowY = point.y + (nextPoint.y - point.y) * 0.3;
              
              return (
                <circle
                  key={`arrow-${index}`}
                  cx={arrowX}
                  cy={arrowY}
                  r="3"
                  fill={color}
                />
              );
            })}
          </>
        )}
      </svg>
      
      {/* Маркеры в точках */}
      {showMarkers && points.map((point, index) => {
        // Пропускаем первую и последнюю точки
        if (index === 0 || index === points.length - 1) return null;
        
        return (
          <div
            key={`marker-${index}`}
            className="absolute transform -translate-x-1/2 -translate-y-1/2"
            style={{
              left: `${point.x}px`,
              top: `${point.y}px`,
            }}
          >
            <div className="w-3 h-3 bg-purple-500 rounded-full border-2 border-white dark:border-gray-800" />
          </div>
        );
      })}
      
      {/* Первая точка (начало) */}
      {points.length > 0 && (
        <div
          className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10"
          style={{
            left: `${points[0].x}px`,
            top: `${points[0].y}px`,
          }}
        >
          <div className="relative">
            <div className="w-8 h-8 bg-blue-500 rounded-full opacity-30 animate-ping" />
            <div className="absolute inset-1 w-6 h-6 bg-blue-500 rounded-full border-2 border-white dark:border-gray-800 flex items-center justify-center">
              <span className="text-white text-sm font-bold">➤</span>
            </div>
          </div>
        </div>
      )}
      
      {/* Последняя точка (конец) */}
      {points.length > 1 && (
        <div
          className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10"
          style={{
            left: `${points[points.length - 1].x}px`,
            top: `${points[points.length - 1].y}px`,
          }}
        >
          <div className="relative">
            <div className="w-8 h-8 bg-green-500 rounded-full opacity-30 animate-ping" />
            <div className="absolute inset-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white dark:border-gray-800 flex items-center justify-center">
              <span className="text-white text-sm font-bold">★</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoutePath;