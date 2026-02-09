import { useState, useRef, useEffect } from "react";
import Input from "../../../shared/ui/molecules/Input/Input";
import { useFloorStore, type FloorId } from "../../floors";
import { useRoomStore } from "../model/roomStore";
import Text from "../../../shared/ui/atoms/Text/Text";

export interface RoomSearchResult {
  id: string;
  number: string;
  name: string;
  floorId: FloorId;
  x: number;
  y: number;
}

interface RoomSearchProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectRoom?: (room: RoomSearchResult) => void;
}

const RoomSearch = ({ isOpen, onClose, onSelectRoom }: RoomSearchProps) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<RoomSearchResult[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const rooms = useRoomStore((state) => state.rooms);
  const setCurrentFloor = useFloorStore((state) => state.setCurrentFloor);

  // Фильтрация кабинетов при изменении запроса
  useEffect(() => {
    if (!query.trim()) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setResults([]);
      return;
    }

    const searchTerm = query.toLowerCase();
    
    const filtered = rooms
      .filter(room => {
        const numberMatch = room.number.toLowerCase().includes(searchTerm);
        const nameMatch = room.name.toLowerCase().includes(searchTerm);
        const combinedMatch = `${room.number} ${room.name}`.toLowerCase().includes(searchTerm);
        return numberMatch || nameMatch || combinedMatch;
      })
      .map(room => ({
        id: room.id,
        number: room.number,
        name: room.name,
        floorId: room.floorId,
        x: room.x,
        y: room.y,
      }))
      .slice(0, 10); // Ограничиваем до 10 результатов

    setResults(filtered);
  }, [query, rooms]);

  // Фокус на поле ввода при открытии
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setQuery('');
      setResults([]);
    }
  }, [isOpen]);

  const handleSelect = (room: RoomSearchResult) => {
    // Переключаем на этаж кабинета
    setCurrentFloor(room.floorId);
    
    // Вызываем коллбэк для выбора кабинета (например, для построения маршрута)
    onSelectRoom?.(room);
    
    // Закрываем поиск
    onClose();
    
    // Логируем для отладки
    console.log('Выбран кабинет:', room);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-md max-h-[80vh] flex flex-col">
        {/* Заголовок */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200">
              Поиск кабинетов
            </h3>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              aria-label="Закрыть поиск"
            >
              ✕
            </button>
          </div>
          
          {/* Поле поиска */}
          <div className="mt-3">
            <Input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Введите номер или название кабинета..."
              leftIcon="🔍"
              autoFocus
            />
          </div>
        </div>

        {/* Результаты поиска */}
        <div className="flex-1 overflow-y-auto p-2">
          {query.trim() && results.length === 0 ? (
            <div className="text-center py-8">
              <Text color="muted" size="sm">
                Кабинеты не найдены
              </Text>
              <Text color="muted" size="xs" className="mt-1">
                Попробуйте другой запрос
              </Text>
            </div>
          ) : results.length > 0 ? (
            <div className="space-y-1">
              {results.map((room) => (
                <button
                  key={room.id}
                  onClick={() => handleSelect(room)}
                  className="w-full text-left p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-blue-600 dark:text-blue-400 text-lg">
                          {room.number}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          Этаж {room.floorId}
                        </span>
                      </div>
                      <div className="text-sm text-gray-700 dark:text-gray-300 truncate mt-0.5">
                        {room.name}
                      </div>
                    </div>
                    <div className="ml-3 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                        <span className="text-blue-600 dark:text-blue-400 text-sm">→</span>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              <Text size="sm">Начните вводить номер или название кабинета</Text>
            </div>
          )}
        </div>

        {/* Подсказка */}
        <div className="p-3 bg-gray-50 dark:bg-gray-900/50 border-t border-gray-200 dark:border-gray-700">
          <Text size="xs" color="muted" className="text-center">
            Введите номер кабинета (например, "101") или часть названия (например, "математика")
          </Text>
        </div>
      </div>
    </div>
  );
};

export default RoomSearch;