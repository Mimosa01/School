import type { NavigationPoint, NavigationEdge } from '../model/types';

export const generateEdges = (points: NavigationPoint[]): NavigationEdge[] => {
  const edges: NavigationEdge[] = [];
  const processed = new Set<string>();
  
  points.forEach(point => {
    point.connections.forEach(connectedId => {
      // Создаём уникальный ключ для избежания дубликатов
      const key1 = `${point.id}-${connectedId}`;
      const key2 = `${connectedId}-${point.id}`;
      
      if (processed.has(key1) || processed.has(key2)) {
        return;
      }
      
      // Находим связанную точку
      const connectedPoint = points.find(p => p.id === connectedId);
      
      if (connectedPoint) {
        // Вычисляем расстояние
        const distance = Math.sqrt(
          Math.pow(point.x - connectedPoint.x, 2) + 
          Math.pow(point.y - connectedPoint.y, 2)
        );
        
        edges.push({
          from: point.id,
          to: connectedId,
          distance: Math.round(distance),
          floorId: point.floorId,
          type: getEdgeType(point.type, connectedPoint.type),
        });
        
        processed.add(key1);
      }
    });
  });
  
  return edges;
};

// Определяем тип ребра на основе типов точек
const getEdgeType = (type1: string, type2: string): NavigationEdge['type'] => {
  if (type1.includes('staircase') || type2.includes('staircase')) {
    return 'stairs';
  }
  if (type1 === 'elevator' || type2 === 'elevator') {
    return 'elevator';
  }
  return 'hallway';
};