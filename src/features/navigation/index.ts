import { FLOOR_1_POINTS } from "./data/floor1Points";
import { FLOOR_2_POINTS } from "./data/floor2Points";
import { FLOOR_3_POINTS } from "./data/floor3Points";
import { generateEdges } from "./data/utils";


// Генерируем рёбра для каждого этажа
export const FLOOR_1_EDGES = generateEdges(FLOOR_1_POINTS);
export const FLOOR_2_EDGES = generateEdges(FLOOR_2_POINTS);
export const FLOOR_3_EDGES = generateEdges(FLOOR_3_POINTS);

// Экспортируем все точки и рёбра
export const ALL_POINTS = [...FLOOR_1_POINTS, ...FLOOR_2_POINTS, ...FLOOR_3_POINTS];
export const ALL_EDGES = [...FLOOR_1_EDGES, ...FLOOR_2_EDGES, ...FLOOR_3_EDGES];