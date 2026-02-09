import { create } from 'zustand';
import { useNavigationStore } from './navigationStore';
import { buildRoute } from './pathfinding';
import type { FloorId, NavigationPoint } from './types';

export interface RoutePoint {
  x: number;
  y: number;
  floorId: FloorId;
  type: 'start' | 'end';
}

interface RouteState {
  startPoint: RoutePoint | null;
  endPoint: RoutePoint | null;
  routePoints: NavigationPoint[];
  currentFloorId: FloorId;
  
  setCurrentFloorId: (floorId: FloorId) => void;
  addPoint: (x: number, y: number) => void;
  addPointByRoomId: (roomId: string, fallbackCoords?: { x: number; y: number }) => void;
  buildRoute: () => void;
  clearRoute: () => void;
  getRoutePoints: () => NavigationPoint[];
}

export const useRouteStore = create<RouteState>((set, get) => ({
  startPoint: null,
  endPoint: null,
  routePoints: [],
  currentFloorId: 1,
  
  // 🔑 ИСПРАВЛЕНО: Не очищаем маршрут при смене этажа
  setCurrentFloorId: (floorId: FloorId) => {
    const { currentFloorId } = get();
    
    if (floorId !== currentFloorId) {
      console.log(`🏠 Этаж изменён с ${currentFloorId} на ${floorId}`);
    }
    
    set({ currentFloorId: floorId });
  },
  
  addPoint: (x: number, y: number) => {
    const { startPoint, endPoint, currentFloorId } = get();
    
    if (!startPoint) {
      set({ startPoint: { x, y, floorId: currentFloorId, type: 'start' } });
      console.log('📍 Точка "Отсюда" установлена:', { x, y, floorId: currentFloorId });
      
      // Если есть конечная точка — перестраиваем маршрут
      if (endPoint) {
        setTimeout(() => get().buildRoute(), 100);
      }
    } else if (!endPoint) {
      set({ endPoint: { x, y, floorId: currentFloorId, type: 'end' } });
      console.log('🎯 Точка "Куда" установлена:', { x, y, floorId: currentFloorId });
      
      // Строим маршрут
      setTimeout(() => get().buildRoute(), 100);
    } else {
      // Обе точки есть — сбрасываем и начинаем заново
      set({ 
        startPoint: { x, y, floorId: currentFloorId, type: 'start' },
        endPoint: null,
        routePoints: []
      });
      console.log('🔄 Маршрут сброшен. Новая точка "Отсюда":', { x, y, floorId: currentFloorId });
    }
  },
  
  addPointByRoomId: (roomId: string, fallbackCoords?: { x: number; y: number }) => {
    const { startPoint, endPoint, currentFloorId } = get();
    
    const navigationPoints = useNavigationStore.getState().points;
    const doorPoint = navigationPoints.find(p => 
      p.roomId === roomId && p.type === 'door' && p.floorId === currentFloorId
    );
    
    const coords = doorPoint || fallbackCoords;
    
    if (!coords) {
      console.warn(`⚠️ Не удалось найти координаты для кабинета ${roomId}`);
      return;
    }
    
    const { x, y } = coords;
    
    if (!startPoint) {
      set({ startPoint: { x, y, floorId: currentFloorId, type: 'start' } });
      console.log(`📍 Точка "Отсюда" установлена:`, { x, y, floorId: currentFloorId });
      
      if (endPoint) {
        setTimeout(() => get().buildRoute(), 100);
      }
    } else if (!endPoint) {
      set({ endPoint: { x, y, floorId: currentFloorId, type: 'end' } });
      console.log(`🎯 Точка "Куда" установлена:`, { x, y, floorId: currentFloorId });
      
      setTimeout(() => get().buildRoute(), 100);
    } else {
      set({ 
        startPoint: { x, y, floorId: currentFloorId, type: 'start' },
        endPoint: null,
        routePoints: []
      });
      console.log(`🔄 Маршрут сброшен. Новая точка "Отсюда":`, { x, y, floorId: currentFloorId });
    }
  },
  
  buildRoute: () => {
    const { startPoint, endPoint } = get();
    
    if (!startPoint || !endPoint) {
      console.warn('⚠️ Недостаточно точек для построения маршрута');
      return;
    }
    
    console.log('🗺️ Строим маршрут...');
    console.log(`   От: (${startPoint.x}, ${startPoint.y}) на этаже ${startPoint.floorId}`);
    console.log(`   До: (${endPoint.x}, ${endPoint.y}) на этаже ${endPoint.floorId}`);
    
    const navigationPoints = useNavigationStore.getState().points;
    const navigationEdges = useNavigationStore.getState().edges;
    
    // Строим маршрут с учетом этажей
    const route = buildRoute(
      startPoint.x,
      startPoint.y,
      startPoint.floorId,
      endPoint.x,
      endPoint.y,
      endPoint.floorId,
      navigationPoints,
      navigationEdges
    );
    
    if (route) {
      set({ routePoints: route });
      
      // Статистика
      let totalDistance = 0;
      let floorTransitions = 0;
      
      for (let i = 0; i < route.length - 1; i++) {
        const p1 = route[i];
        const p2 = route[i + 1];
        
        if (p1.floorId !== p2.floorId) {
          floorTransitions++;
        }
        
        if (p1.floorId === p2.floorId) {
          const distance = Math.sqrt(
            Math.pow(p2.x - p1.x, 2) + 
            Math.pow(p2.y - p1.y, 2)
          );
          totalDistance += distance;
        }
      }
      
      console.log(`✅ Маршрут построен!`);
      console.log(`   Точек: ${route.length}`);
      console.log(`   Переходов между этажами: ${floorTransitions}`);
      console.log(`   Расстояние: ${Math.round(totalDistance)}px`);
      console.log(`   Время: ~${Math.round(totalDistance / 1.4)} сек`);
    } else {
      console.error('❌ Не удалось построить маршрут');
      set({ routePoints: [] });
    }
  },
  
  clearRoute: () => {
    set({ startPoint: null, endPoint: null, routePoints: [] });
    console.log('🗑️ Маршрут очищен');
  },
  
  getRoutePoints: () => {
    return get().routePoints;
  },
}));