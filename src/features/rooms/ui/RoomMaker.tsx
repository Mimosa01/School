import React from 'react';
import { useRoomStore } from '../model/roomStore';
import { useMapStore } from '../../map/model/mapStore';
import { useSettingsStore } from '../../settings/model/settingsStore';
import Text from '../../../shared/ui/atoms/Text/Text';

export interface RoomMarkerProps {
  roomId: string;
  x: number;
  y: number;
  width?: number;
  height?: number;
  number: string;
  name: string;
  type?: 'classroom' | 'office' | 'lab' | 'gym' | 'cafeteria';
  onClick?: (roomId: string, coords: { x: number; y: number }) => void; // ← Изменено!
  className?: string;
}

const RoomMarker = ({
  roomId,
  x,
  y,
  width = 60,
  height = 40,
  number,
  name,
  type,
  onClick,
  className = '',
}: RoomMarkerProps) => {
  const { fontSize, roomLabels } = useSettingsStore();
  const scale = useMapStore((state) => state.scale);
  const isFavorite = useRoomStore((state) => state.favorites.includes(roomId));
  const toggleFavorite = useRoomStore((state) => state.toggleFavorite);

  // Определяем, показывать ли название
  const shouldShowName = React.useMemo(() => {
    switch (roomLabels) {
      case 'always': return true;
      case 'never': return false;
      case 'onZoom': return scale >= 1;
      default: return false;
    }
  }, [roomLabels, scale]);

  // Размеры шрифта
  const fontSizeClasses = {
    small: 'text-xs',
    medium: 'text-sm',
    large: 'text-base',
  };
  const fontSizeClass = fontSizeClasses[fontSize];

  // Цвета по типу
  const typeColors = {
    default: `
      bg-emerald-50 dark:bg-emerald-800 hover:bg-emerald-100 dark:hover:bg-emerald-600 
      active:bg-emerald-300 dark:active:bg-emerald-800 text-emerald-700 dark:text-slate-200 
      hover:text-rose-800 active:text-rose-900 dark:hover:text-rose-100 dark:active:text-rose-50
      hover:z-10 active:z-10 hover:scale-120 active:scale-120 
    `,
    office: 'bg-green-500 hover:bg-green-600',
    lab: 'bg-purple-500 hover:bg-purple-600',
    gym: 'bg-orange-500 hover:bg-orange-600',
    cafeteria: 'bg-red-500 hover:bg-red-600',
    classroom: 'bg-gray-500 hover:bg-gray-600 text-slate-700',
  };
  const bgColor = typeColors[type || 'default'];

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        // Передаем roomId И координаты кабинета
        onClick?.(roomId, { x, y });
      }}
      className={`group absolute rounded-xl shadow-md transition-all duration-200 hover:min-w-fit active:min-w-fit ${bgColor} ${className}`}
      style={{
        left: `${x}px`,
        top: `${y}px`,
        width: `${width}px`,
        height: `${height}px`,
      }}
      aria-label={`Кабинет ${number}: ${name}`}
    >
      <div className="flex flex-col items-center justify-center h-full p-1">
        <Text color='custom' weight='bold' className={`${fontSizeClass} truncate`}>
          {number}
        </Text>
        
        {shouldShowName && (
          <Text
            color='custom'
            size='xs'
            className={`${fontSizeClass} text-center mt-0.5 opacity-90 truncate group-hover:min-w-fit group-active:min-w-fit`}
            style={{ maxWidth: '90%' }}
          >
            {name}
          </Text>
        )}
        
        {isFavorite && (
          <div 
            className="absolute -top-2 -right-2 w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              toggleFavorite(roomId);
            }}
          >
            <span className="text-xs">⭐</span>
          </div>
        )}
      </div>
    </button>
  );
};

export default RoomMarker;