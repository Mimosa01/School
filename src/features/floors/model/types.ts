import Floor1 from "../ui/Floor1";
import Floor2 from "../ui/Floor2";
import Floor3 from "../ui/FLoor3";

export type FloorId = 1 | 2 | 3;

export interface FloorData {
  id: FloorId;
  name: string;
  Component: React.ComponentType;
}

export const FLOORS: Record<FloorId, FloorData> = {
  1: {
    id: 1,
    name: '1 этаж',
    Component: Floor1,
  },
  2: {
    id: 2,
    name: '2 этаж',
    Component: Floor2,
  },
  3: {
    id: 3,
    name: '3 этаж',
    Component: Floor3,
  },
};