import { useEffect } from 'react';
import { useModalStore } from '../model/modalStore';
import Button from '../../../shared/ui/atoms/Button/Button';
import Modal from '../../../shared/ui/organisms/Modal/Modal';

export const ModalProvider = () => {
  const { isOpen, data, closeModal } = useModalStore();
  
  // Закрытие по Esc — можно вынести в Modal, но здесь удобнее
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
    };
    if (isOpen) window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, closeModal]);

  if (!data || !isOpen) return null;

  // Рендерим разные типы
  if (data.type === 'confirm') {
    const {
      title = 'Подтверждение',
      message = 'Вы уверены?',
      confirmText = 'Подтвердить',
      cancelText = 'Отмена',
      variant = 'primary',
      onConfirm,
      onCancel,
    } = data;

    return (
      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        title={title}
        actions={
          <div className="flex gap-3 justify-end">
            <Button variant="secondary" onClick={() => {
              onCancel?.();
              closeModal();
            }}>
              {cancelText}
            </Button>
            <Button
              variant={variant}
              onClick={() => {
                onConfirm?.();
                closeModal();
              }}
            >
              {confirmText}
            </Button>
          </div>
        }
      >
        <p>{message}</p>
      </Modal>
    );
  }

  if (data.type === 'alert') {
    const { title = 'Внимание', message = '', okText = 'ОК', onConfirm } = data;
    return (
      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        title={title}
        actions={
          <Button onClick={() => {
            onConfirm?.();
            closeModal();
          }}>
            {okText}
          </Button>
        }
      >
        <p>{message}</p>
      </Modal>
    );
  }

  if (data.type === 'custom') {
    return (
      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        title={data.title}
        actions={data.actions}
      >
        {data.content}
      </Modal>
    );
  }

  return null;
};