export type ModalType =
  | 'confirm'
  | 'alert'
  | 'form'
  | 'custom';

export interface BaseModalData {
  title?: string;
  message?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
}

export interface ConfirmModalData extends BaseModalData {
  type: 'confirm';
  confirmText?: string;   // "Удалить"
  cancelText?: string;    // "Отмена"
  variant?: 'primary' | 'danger';
}

export interface AlertModalData extends BaseModalData {
  type: 'alert';
  okText?: string;        // "Понятно"
}

export interface CustomModalData extends BaseModalData {
  type: 'custom';
  content: React.ReactNode;
  actions?: React.ReactNode;
}

export type ModalData =
  | ConfirmModalData
  | AlertModalData
  | CustomModalData;