export type FloorId = 1 | 2 | 3;

// Тип точки навигации
export type NavigationPointType = 
  | 'door'        // Дверь кабинета
  | 'hallway'     // Коридор
  | 'staircase-up'   // Лестница
  | 'staircase-down'
  | 'staircase'
  | 'elevator'    // Лифт
  | 'entrance'    // Вход
  | 'junction'    // Перекрёсток
  | 'room'        // Кабинет (центр)

// Точка навигации
export interface NavigationPoint {
  id: string;
  floorId: FloorId;
  x: number;
  y: number;
  type: NavigationPointType;
  name?: string;
  roomId?: string;
  connections: string[];
  // 🔑 НОВОЕ ПОЛЕ: связанные лестницы на других этажах
  connectedStairs?: string[]; // ID лестниц на других этажах
  metadata?: {
    width?: number;
    isAccessible?: boolean;
    description?: string;
  };
}

// Рёбра графа (связи между точками)
export interface NavigationEdge {
  from: string;                  // ID точки откуда
  to: string;                    // ID точки куда
  distance: number;              // Расстояние
  floorId: FloorId | 0;          // Этаж (если разные этажи — 0)
  type?: 'stairs' | 'elevator' | 'hallway'; // Тип перехода
}

// Маршрут
export interface Route {
  id: string;
  from: string;                  // ID начальной точки
  to: string;                    // ID конечной точки
  points: NavigationPoint[];     // Все точки маршрута
  edges: NavigationEdge[];       // Все рёбра маршрута
  totalDistance: number;         // Общее расстояние
  estimatedTime: number;         // Примерное время (секунды)
  floorTransitions: number;      // Количество переходов между этажами
}