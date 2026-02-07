import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { type Room, ROOMS } from './types';


interface RoomState {
  rooms: Room[];
  favorites: string[];
  selectedRoomId: string | null;
  addRoom: (room: Room) => void;
  removeRoom: (roomId: string) => void;
  toggleFavorite: (roomId: string) => void;
  selectRoom: (roomId: string | null) => void;
  isFavorite: (roomId: string) => boolean;
  getRoomById: (roomId: string) => Room | undefined;
}

export const useRoomStore = create<RoomState>()(
  devtools((set, get) => ({
    rooms: ROOMS,
    favorites: [],
    selectedRoomId: null,

    addRoom: (room) => set((state) => ({
      rooms: [...state.rooms, room],
    })),

    removeRoom: (roomId) => set((state) => ({
      rooms: state.rooms.filter((r) => r.id !== roomId),
    })),

    toggleFavorite: (roomId) => set((state) => {
      const isFav = state.favorites.includes(roomId);
      return {
        favorites: isFav
          ? state.favorites.filter((id) => id !== roomId)
          : [...state.favorites, roomId],
      };
    }),

    selectRoom: (roomId) => set({ selectedRoomId: roomId }),

    isFavorite: (roomId) => {
      return get().favorites.includes(roomId);
    },

    getRoomById: (roomId) => {
      return get().rooms.find((room) => room.id === roomId);
    },
  }))
);