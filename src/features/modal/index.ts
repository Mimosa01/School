import { useModalStore } from "./model/modalStore";
import type { ConfirmModalData, AlertModalData, CustomModalData } from "./model/types";

export const openConfirmModal = (data: Omit<ConfirmModalData, 'type'>) => {
  useModalStore.getState().openModal({ ...data, type: 'confirm' });
};

export const openAlertModal = (data: Omit<AlertModalData, 'type'>) => {
  useModalStore.getState().openModal({ ...data, type: 'alert' });
};

export const openCustomModal = (data: Omit<CustomModalData, 'type'>) => {
  useModalStore.getState().openModal({ ...data, type: 'custom' });
};