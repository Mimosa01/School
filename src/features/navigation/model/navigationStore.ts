import { create } from 'zustand';
import type { NavigationPoint, NavigationEdge, Route, FloorId } from './types';

interface NavigationState {
  points: NavigationPoint[];
  edges: NavigationEdge[];
  
  // Маршрут
  currentPosition: NavigationPoint | null;  // Откуда
  destination: NavigationPoint | null;       // Куда
  currentRoute: Route | null;                // Текущий маршрут
  isRouteMode: boolean;                      // Режим построения маршрута
  
  // Методы
  addPoint: (point: NavigationPoint) => void;
  addEdge: (edge: NavigationEdge) => void;
  
  // Установить текущую позицию
  setCurrentPosition: (pointId: string) => void;
  // Установить цель
  setDestination: (pointId: string) => void;
  // Построить маршрут
  buildRoute: () => void;
  // Очистить маршрут
  clearRoute: () => void;
  // Переключить режим маршрута
  toggleRouteMode: () => void;
  
  // Вспомогательные
  getPointById: (pointId: string) => NavigationPoint | undefined;
  getPointsByFloor: (floorId: FloorId) => NavigationPoint[];
}

export const useNavigationStore = create<NavigationState>((set, get) => ({
  points: [],
  edges: [],
  currentPosition: null,
  destination: null,
  currentRoute: null,
  isRouteMode: false,
  
  addPoint: (point) => set((state) => ({ points: [...state.points, point] })),
  
  addEdge: (edge) => set((state) => ({ edges: [...state.edges, edge] })),
  
  setCurrentPosition: (pointId) => {
    const point = get().getPointById(pointId);
    if (point) {
      set({ currentPosition: point });
      
      // Если уже есть цель — строим маршрут
      const { destination } = get();
      if (destination) {
        get().buildRoute();
      }
    }
  },
  
  setDestination: (pointId) => {
    const point = get().getPointById(pointId);
    if (point) {
      set({ destination: point });
      
      // Если уже есть текущая позиция — строим маршрут
      const { currentPosition } = get();
      if (currentPosition) {
        get().buildRoute();
      }
    }
  },
  
  buildRoute: () => {
    const { currentPosition, destination, points, edges } = get();
    
    if (!currentPosition || !destination) {
      console.warn('Недостаточно данных для построения маршрута');
      return;
    }
    
    // Находим путь между точками
    const routePoints = findPath(currentPosition, destination, points, edges);
    
    if (!routePoints) {
      console.error('Маршрут не найден');
      return;
    }
    
    // Вычисляем расстояние и время
    let totalDistance = 0;
    const routeEdges: NavigationEdge[] = [];
    
    for (let i = 0; i < routePoints.length - 1; i++) {
      const current = routePoints[i];
      const next = routePoints[i + 1];
      
      const edge = edges.find(e => 
        (e.from === current.id && e.to === next.id) ||
        (e.from === next.id && e.to === current.id)
      );
      
      if (edge) {
        totalDistance += edge.distance;
        routeEdges.push(edge);
      }
    }
    
    const estimatedTime = totalDistance / 1.4; // ~1.4 м/с — средняя скорость ходьбы
    
    const route: Route = {
      id: `${currentPosition.id}-${destination.id}-${Date.now()}`,
      from: currentPosition.id,
      to: destination.id,
      points: routePoints,
      edges: routeEdges,
      totalDistance,
      estimatedTime,
      floorTransitions: countFloorTransitions(routePoints),
    };
    
    set({ currentRoute: route });
    console.log('✅ Маршрут построен:', route);
  },
  
  clearRoute: () => {
    set({
      currentPosition: null,
      destination: null,
      currentRoute: null,
    });
  },
  
  toggleRouteMode: () => {
    const { isRouteMode } = get();
    if (isRouteMode) {
      // Выключаем режим — очищаем маршрут
      get().clearRoute();
    }
    set({ isRouteMode: !isRouteMode });
  },
  
  getPointById: (pointId) => {
    return get().points.find(p => p.id === pointId);
  },
  
  getPointsByFloor: (floorId) => {
    return get().points.filter(p => p.floorId === floorId);
  },
}));

// Простой алгоритм поиска пути (BFS)
function findPath(
  from: NavigationPoint,
  to: NavigationPoint,
  points: NavigationPoint[],
  edges: NavigationEdge[]
): NavigationPoint[] | null {
  // Если начальная и конечная точки совпадают
  if (from.id === to.id) {
    return [from];
  }
  
  // BFS для поиска кратчайшего пути
  const queue: { point: NavigationPoint; path: NavigationPoint[] }[] = [
    { point: from, path: [from] }
  ];
  
  const visited = new Set<string>();
  visited.add(from.id);
  
  while (queue.length > 0) {
    const { point, path } = queue.shift()!;
    
    // Находим все соседние точки
    const neighbors = edges
      .filter(e => e.from === point.id || e.to === point.id)
      .map(e => e.from === point.id ? e.to : e.from)
      .map(id => points.find(p => p.id === id))
      .filter((p): p is NavigationPoint => p !== undefined);
    
    for (const neighbor of neighbors) {
      if (neighbor.id === to.id) {
        // Нашли конечную точку
        return [...path, neighbor];
      }
      
      if (!visited.has(neighbor.id)) {
        visited.add(neighbor.id);
        queue.push({ point: neighbor, path: [...path, neighbor] });
      }
    }
  }
  
  // Путь не найден
  return null;
}

// Подсчёт переходов между этажами
function countFloorTransitions(points: NavigationPoint[]): number {
  let count = 0;
  for (let i = 0; i < points.length - 1; i++) {
    if (points[i].floorId !== points[i + 1].floorId) {
      count++;
    }
  }
  return count;
}