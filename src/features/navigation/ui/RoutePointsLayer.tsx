import { useRouteStore } from '../model/routeStore'; // ← Используем только useRouteStore
import type { NavigationPoint } from '../model/types';

const RoutePointsLayer = () => {
  // 🔑 Получаем currentFloorId из ТОГО ЖЕ стора, где хранятся точки
  const { startPoint, endPoint, routePoints, currentFloorId } = useRouteStore();
  
  // Фильтруем точки маршрута для текущего этажа
  const routePointsOnFloor = routePoints.filter((p: NavigationPoint) => p.floorId === currentFloorId);
  
  // Находим переходы на текущий этаж
  const transitionsToCurrentFloor = routePoints.filter((p: NavigationPoint, i: number) => {
    const prev = routePoints[i - 1];
    return prev && prev.floorId !== currentFloorId && p.floorId === currentFloorId;
  });

  // Отладка (можно удалить после проверки)
  // console.log('RoutePointsLayer render:', { 
  //   currentFloorId, 
  //   startPoint, 
  //   endPoint, 
  //   routePointsOnFloor: routePointsOnFloor.length 
  // });

  if (!startPoint && !endPoint && routePointsOnFloor.length === 0) {
    return null;
  }

  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Линии маршрута */}
      <svg className="absolute inset-0 w-full h-full">
        {routePointsOnFloor.slice(0, -1).map((point: NavigationPoint, index: number) => {
          const nextPoint = routePointsOnFloor[index + 1];
          if (!nextPoint) return null;
          
          return (
            <line
              key={`route-${index}`}
              x1={point.x}
              y1={point.y}
              x2={nextPoint.x}
              y2={nextPoint.y}
              stroke="rgba(59, 130, 246, 0.9)"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="10,5"
            />
          );
        })}
        
        {/* Стрелки направления */}
        {routePointsOnFloor.slice(0, -1).map((point: NavigationPoint, index: number) => {
          const nextPoint = routePointsOnFloor[index + 1];
          if (!nextPoint) return null;
          
          const arrowX = point.x + (nextPoint.x - point.x) * 0.3;
          const arrowY = point.y + (nextPoint.y - point.y) * 0.3;
          
          return (
            <circle
              key={`arrow-${index}`}
              cx={arrowX}
              cy={arrowY}
              r="4"
              fill="#3b82f6"
            />
          );
        })}
        
        {/* Индикаторы переходов между этажами */}
        {transitionsToCurrentFloor.map((point: NavigationPoint, index: number) => (
          <g key={`transition-${index}`}>
            <circle
              cx={point.x}
              cy={point.y}
              r="12"
              fill="none"
              stroke="#f59e0b"
              strokeWidth="3"
              strokeDasharray="5,5"
            />
            <circle
              cx={point.x}
              cy={point.y}
              r="8"
              fill="#f59e0b"
              opacity="0.2"
            />
            <text
              x={point.x}
              y={point.y - 15}
              textAnchor="middle"
              fill="#f59e0b"
              fontSize="12"
              fontWeight="bold"
            >
              ↕
            </text>
          </g>
        ))}
      </svg>
      
      {/* Точка начала (если на текущем этаже) */}
      {startPoint?.floorId === currentFloorId && (
        <div
          className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10"
          style={{
            left: `${startPoint.x}px`,
            top: `${startPoint.y}px`,
          }}
        >
          <div className="relative">
            <div className="absolute inset-0 animate-ping">
              <div className="w-12 h-12 bg-blue-400 rounded-full opacity-40" />
              <div className="w-16 h-16 bg-blue-300 rounded-full opacity-20" />
            </div>
            <div className="w-8 h-8 bg-blue-500 rounded-full border-2 border-white dark:border-gray-800 flex items-center justify-center shadow-lg">
              <span className="text-white text-lg font-bold">➤</span>
            </div>
          </div>
          <div className="absolute -bottom-7 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
            Отсюда
          </div>
        </div>
      )}
      
      {/* Точка конца (если на текущем этаже) */}
      {endPoint?.floorId === currentFloorId && (
        <div
          className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10"
          style={{
            left: `${endPoint.x}px`,
            top: `${endPoint.y}px`,
          }}
        >
          <div className="relative">
            <div className="absolute inset-0 animate-ping">
              <div className="w-12 h-12 bg-green-400 rounded-full opacity-40" />
              <div className="w-16 h-16 bg-green-300 rounded-full opacity-20" />
            </div>
            <div className="w-8 h-8 bg-green-500 rounded-full border-2 border-white dark:border-gray-800 flex items-center justify-center shadow-lg">
              <span className="text-white text-lg font-bold">★</span>
            </div>
          </div>
          <div className="absolute -bottom-7 left-1/2 transform -translate-x-1/2 bg-green-600 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
            Куда
          </div>
        </div>
      )}
      
      {/* Индикаторы переходов */}
      {transitionsToCurrentFloor.map((point: NavigationPoint, index: number) => (
        <div
          key={`transition-marker-${index}`}
          className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10"
          style={{ left: `${point.x}px`, top: `${point.y}px` }}
        >
          <div className="relative">
            <div className="w-16 h-16 bg-amber-400 rounded-full opacity-30 animate-ping" />
            <div className="absolute inset-1 w-12 h-12 bg-amber-500 rounded-full border-2 border-white flex items-center justify-center">
              <span className="text-white text-lg font-bold">↕</span>
            </div>
          </div>
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-amber-600 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
            Переход
          </div>
        </div>
      ))}
    </div>
  );
};

export default RoutePointsLayer;