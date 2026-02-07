import Floor1 from "../ui/Floor1";
import Floor2 from "../ui/Floor2";
import Floor3 from "../ui/FLoor3";

export type FloorId = 1 | 2 | 3;

export interface FloorData {
  id: FloorId;
  name: string;
  width: number;
  height: number;
  Component: React.ComponentType;
}

export const FLOORS: Record<FloorId, FloorData> = {
  1: {
    id: 1,
    name: 'Первый этаж',
    width: 2027,
    height: 1180,
    Component: Floor1,
  },
  2: {
    id: 2,
    name: 'Второй этаж',
    width: 2027,
    height: 1180,
    Component: Floor2,
  },
  3: {
    id: 3,
    name: 'Третий этаж',
    width: 2027,
    height: 1180,
    Component: Floor3,
  },
};