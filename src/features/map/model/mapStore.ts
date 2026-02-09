import { create } from 'zustand';

interface MapState {
  scale: number;
  setScale: (scale: number) => void;
}

export const useMapStore = create<MapState>((set) => ({
  scale: 1,
  setScale: (scale) => set({ scale }),
}));