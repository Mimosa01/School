import { create } from 'zustand';
import { FLOORS, type FloorData, type FloorId } from './types';

interface FloorState {
  currentFloorId: FloorId;
  currentFloor: FloorData;
  setCurrentFloor: (floorId: FloorId) => void;
}

export const useFloorStore = create<FloorState>((set) => ({
  currentFloorId: 1,
  currentFloor: FLOORS[1],
  
  setCurrentFloor: (floorId) => set({ currentFloor: FLOORS[floorId], currentFloorId: floorId }),
}));