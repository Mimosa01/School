import type { NavigationPoint, NavigationEdge, FloorId } from './types';

/**
 * Находит ближайшую точку навигации к заданным координатам
 */
export const findNearestPoint = (
  points: NavigationPoint[],
  targetX: number,
  targetY: number,
  floorId: number,
  maxDistance: number = 300 // Максимальное расстояние для поиска
): NavigationPoint | null => {
  // Фильтруем точки текущего этажа
  const floorPoints = points.filter(p => p.floorId === floorId);
  
  if (floorPoints.length === 0) return null;
  
  // Находим ближайшую точку
  let nearest: NavigationPoint | null = null;
  let minDistance = Infinity;
  
  for (const point of floorPoints) {
    const distance = Math.sqrt(
      Math.pow(point.x - targetX, 2) + 
      Math.pow(point.y - targetY, 2)
    );
    
    if (distance < minDistance && distance <= maxDistance) {
      minDistance = distance;
      nearest = point;
    }
  }
  
  return nearest;
};

/**
 * Алгоритм BFS для поиска кратчайшего пути между точками
 */
export const findPathBFS = (
  startId: string,
  endId: string,
  points: NavigationPoint[],
  edges: NavigationEdge[]
): NavigationPoint[] | null => {
  // Если начальная и конечная точки совпадают
  if (startId === endId) {
    const point = points.find(p => p.id === startId);
    return point ? [point] : null;
  }
  
  // Создаём карту смежности
  const adjacencyMap = new Map<string, string[]>();
  
  edges.forEach(edge => {
    if (!adjacencyMap.has(edge.from)) {
      adjacencyMap.set(edge.from, []);
    }
    if (!adjacencyMap.has(edge.to)) {
      adjacencyMap.set(edge.to, []);
    }
    
    adjacencyMap.get(edge.from)!.push(edge.to);
    adjacencyMap.get(edge.to)!.push(edge.from);
  });
  
  // BFS
  const queue: { pointId: string; path: string[] }[] = [
    { pointId: startId, path: [startId] }
  ];
  
  const visited = new Set<string>();
  visited.add(startId);
  
  while (queue.length > 0) {
    const { pointId, path } = queue.shift()!;
    
    const neighbors = adjacencyMap.get(pointId) || [];
    
    for (const neighborId of neighbors) {
      if (neighborId === endId) {
        // Нашли конечную точку
        const fullPath = [...path, neighborId];
        return fullPath.map(id => points.find(p => p.id === id)!);
      }
      
      if (!visited.has(neighborId)) {
        visited.add(neighborId);
        queue.push({ pointId: neighborId, path: [...path, neighborId] });
      }
    }
  }
  
  // Путь не найден
  return null;
};

/**
 * Строит полный маршрут от пользовательской точки до пользовательской точки
 * через точки навигации
 */
export const buildFullRoute = (
  startX: number,
  startY: number,
  endX: number,
  endY: number,
  floorId: FloorId,
  points: NavigationPoint[],
  edges: NavigationEdge[]
): NavigationPoint[] | null => {
  // 1. Находим ближайшие точки навигации
  const startNearest = findNearestPoint(points, startX, startY, floorId);
  const endNearest = findNearestPoint(points, endX, endY, floorId);
  
  if (!startNearest || !endNearest) {
    console.warn('⚠️ Не удалось найти ближайшие точки навигации');
    return null;
  }
  
  console.log('📍 Ближайшая точка к началу:', startNearest.id);
  console.log('🎯 Ближайшая точка к концу:', endNearest.id);
  
  // 2. Строим путь между ближайшими точками
  const path = findPathBFS(startNearest.id, endNearest.id, points, edges);
  
  if (!path) {
    console.warn('⚠️ Путь между точками не найден');
    return null;
  }
  
  console.log('✅ Найден путь через', path.length, 'точек');
  
  // 3. Добавляем пользовательские точки в начало и конец маршрута
  const fullRoute: NavigationPoint[] = [
    // Начальная пользовательская точка
    {
      id: 'user-start',
      floorId,
      x: startX,
      y: startY,
      type: 'junction',
      connections: [],
    },
    // Ближайшая точка к началу
    startNearest,
    // Путь через точки навигации
    ...path,
    // Ближайшая точка к концу (если не совпадает с последней точкой пути)
    ...(endNearest.id !== path[path.length - 1].id ? [endNearest] : []),
    // Конечная пользовательская точка
    {
      id: 'user-end',
      floorId,
      x: endX,
      y: endY,
      type: 'junction',
      connections: [],
    },
  ];
  
  return fullRoute;
};
/**
 * Находит связанную лестницу на другом этаже
 */
const findConnectedStair = (
  points: NavigationPoint[],
  stairId: string
): NavigationPoint | null => {
  const stair = points.find(p => p.id === stairId);
  if (!stair || !stair.connectedStairs || stair.connectedStairs.length === 0) {
    return null;
  }
  
  // Возвращаем первую связанную лестницу (обычно только одна)
  return points.find(p => stair.connectedStairs!.includes(p.id)) || null;
};

/**
 * Строит маршрут между разными этажами
 */
export const buildMultiFloorRoute = (
  startX: number,
  startY: number,
  startFloorId: FloorId,
  endX: number,
  endY: number,
  endFloorId: FloorId,
  points: NavigationPoint[],
  edges: NavigationEdge[]
): NavigationPoint[] | null => {
  // Если этажи совпадают — используем обычный алгоритм
  if (startFloorId === endFloorId) {
    return buildFullRoute(startX, startY, endX, endY, startFloorId, points, edges);
  }

  console.log(`🗺️ Строим межэтажный маршрут: этаж ${startFloorId} → этаж ${endFloorId}`);
  
  // Определяем направление движения
  const direction = endFloorId > startFloorId ? 'up' : 'down';
  
  // Этап 1: Находим ближайшую лестницу на начальном этаже
  const startFloorPoints = points.filter(p => p.floorId === startFloorId);
  const startNearest = findNearestPoint(startFloorPoints, startX, startY, startFloorId);
  
  if (!startNearest) {
    console.error('❌ Не найдена ближайшая точка на начальном этаже');
    return null;
  }
  
  // Находим лестницу, ведущую в нужном направлении
  const candidateStairs = startFloorPoints.filter(p => 
    p.type.includes('staircase') && 
    (
      (direction === 'up' && (p.type === 'staircase-up' || p.type === 'staircase')) ||
      (direction === 'down' && (p.type === 'staircase-down' || p.type === 'staircase'))
    )
  );
  
  if (candidateStairs.length === 0) {
    console.error(`❌ На этаже ${startFloorId} нет лестниц в направлении "${direction}"`);
    return null;
  }
  
  // Выбираем ближайшую лестницу к начальной точке
  let bestStair = candidateStairs[0];
  let minDist = Infinity;
  
  for (const stair of candidateStairs) {
    const dist = Math.sqrt(
      Math.pow(stair.x - startNearest.x, 2) + 
      Math.pow(stair.y - startNearest.y, 2)
    );
    if (dist < minDist) {
      minDist = dist;
      bestStair = stair;
    }
  }
  
  console.log(`🚪 Выбрана лестница: ${bestStair.id} (${bestStair.name})`);
  
  // Этап 2: Строим путь от начальной точки до лестницы на начальном этаже
  const pathToStair = findPathBFS(startNearest.id, bestStair.id, points, edges);
  if (!pathToStair) {
    console.error('❌ Не удалось построить путь до лестницы');
    return null;
  }
  
  // Этап 3: Находим связанную лестницу на следующем этаже
  const connectedStair = findConnectedStair(points, bestStair.id);
  if (!connectedStair) {
    console.error(`❌ Не найдена связанная лестница для ${bestStair.id}`);
    return null;
  }
  
  console.log(`➡️ Переход на этаж ${connectedStair.floorId} через ${connectedStair.id}`);
  
  // Этап 4: Рекурсивно строим маршрут от связанной лестницы до конечной точки
  const nextSegment = buildMultiFloorRoute(
    connectedStair.x,
    connectedStair.y,
    connectedStair.floorId,
    endX,
    endY,
    endFloorId,
    points,
    edges
  );
  
  if (!nextSegment) {
    console.error('❌ Не удалось построить маршрут на следующем этаже');
    return null;
  }
  
  // Этап 5: Собираем полный маршрут
  const fullRoute: NavigationPoint[] = [
    // Начальная пользовательская точка
    {
      id: 'user-start',
      floorId: startFloorId,
      x: startX,
      y: startY,
      type: 'junction',
      connections: [],
    },
    // Ближайшая точка к началу
    startNearest,
    // Путь до лестницы
    ...pathToStair.slice(1), // Пропускаем первую точку (уже добавлена)
    // Лестница на текущем этаже
    bestStair,
    // Связанная лестница на следующем этаже (для визуализации перехода)
    {
      id: `transition-${bestStair.id}-to-${connectedStair.id}`,
      floorId: connectedStair.floorId,
      x: connectedStair.x,
      y: connectedStair.y,
      type: 'staircase',
      name: `Переход на этаж ${connectedStair.floorId}`,
      connections: [],
    },
    // Маршрут на следующих этажах
    ...nextSegment,
  ];
  
  console.log(`✅ Межэтажный маршрут построен через ${fullRoute.length} точек`);
  return fullRoute;
};

/**
 * Основная функция построения маршрута (универсальная)
 */
export const buildRoute = (
  startX: number,
  startY: number,
  startFloorId: FloorId,
  endX: number,
  endY: number,
  endFloorId: FloorId,
  points: NavigationPoint[],
  edges: NavigationEdge[]
): NavigationPoint[] | null => {
  if (startFloorId === endFloorId) {
    return buildFullRoute(startX, startY, endX, endY, startFloorId, points, edges);
  }
  
  return buildMultiFloorRoute(
    startX, startY, startFloorId,
    endX, endY, endFloorId,
    points, edges
  );
};