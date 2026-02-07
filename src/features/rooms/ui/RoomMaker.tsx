import { useRoomStore } from '../model/roomStore';

export interface RoomMarkerProps {
  roomId: string;
  x: number;
  y: number;
  width?: number;
  height?: number;
  number: string;
  name: string;
  type?: 'classroom' | 'office' | 'lab' | 'gym' | 'cafeteria';
  onClick?: (roomId: string) => void;
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
  // Читаем isFavorite напрямую через селектор
  const isFavorite = useRoomStore((state) => state.favorites.includes(roomId));
  const toggleFavorite = useRoomStore((state) => state.toggleFavorite);

  // Цвета в зависимости от типа
  const typeColors = {
    default: `
      bg-emerald-50 dark:bg-emerald-800 hover:bg-emerald-100 dark:hover:bg-emerald-600 active:bg-emerald-300 dark:active:bg-emerald-800 
      text-emerald-700 dark:text-slate-200 hover:text-emerald-800 active:text-emerald-900 dark:hover:text-emerald-300 dark:active:text-emerald-50
      hover:scale-110 hover:z-10
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
        onClick?.(roomId);
      }}
      className={`absolute transform rounded-xl shadow-md transition-all duration-200 ${bgColor} ${className}`}
      style={{
        left: `${x}px`,
        top: `${y}px`,
        width: `${width}px`,
        height: `${height}px`,
      }}
      aria-label={`Кабинет ${number}: ${name}`}
    >
      <div className="flex flex-col items-center justify-center h-full p-1">
        <div className="font-bold text-xs truncate">{number}</div>
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