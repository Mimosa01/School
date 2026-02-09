import { useEffect } from 'react';
import { useNavigationStore } from './navigationStore';
import { ALL_EDGES, ALL_POINTS } from '..';

export const useInitializeNavigation = () => {
  const { addPoint, addEdge, points } = useNavigationStore();
  
  useEffect(() => {
    // Загружаем точки только один раз
    if (points.length > 0) return;
    
    console.log('📦 Инициализация навигации...');
    
    // Добавляем все точки
    ALL_POINTS.forEach(point => addPoint(point));
    
    // Добавляем все рёбра
    ALL_EDGES.forEach(edge => addEdge(edge));
    
    console.log(`✅ Навигация инициализирована:`);
    console.log(`   • Точек: ${ALL_POINTS.length}`);
    console.log(`   • Рёбер: ${ALL_EDGES.length}`);
    console.log(`   • Этаж 1: ${ALL_POINTS.filter(p => p.floorId === 1).length} точек`);
    console.log(`   • Этаж 2: ${ALL_POINTS.filter(p => p.floorId === 2).length} точек`);
    console.log(`   • Этаж 3: ${ALL_POINTS.filter(p => p.floorId === 3).length} точек`);
  }, [addPoint, addEdge, points.length]);
};