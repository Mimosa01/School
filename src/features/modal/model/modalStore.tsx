import { create } from 'zustand';
import type { ModalData } from './types';

interface ModalState {
  isOpen: boolean;
  data: ModalData | null;
  openModal: (data: ModalData) => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  isOpen: false,
  data: null,
  openModal: (data) => set({ isOpen: true, data }),
  closeModal: () => set({ isOpen: false, data: null }),
}));