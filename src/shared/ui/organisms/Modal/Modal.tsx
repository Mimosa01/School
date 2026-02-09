// components/Modal/Modal.tsx
import React, { useEffect, useRef, useCallback } from 'react';
import Surface from '../../atoms/Surface/Surface';
import Button from '../../atoms/Button/Button';
import { X } from 'lucide-react';

export interface ModalProps {
  /**
   * Открыто ли модальное окно.
   */
  isOpen: boolean;
  /**
   * Функция закрытия.
   */
  onClose: () => void;
  /**
   * Заголовок модального окна.
   */
  title?: string;
  /**
   * Контент (тело) модального окна.
   */
  children: React.ReactNode;
  /**
   * Действия (обычно кнопки внизу).
   */
  actions?: React.ReactNode;
  /**
   * Ширина модального окна (по умолчанию — адаптивная).
   * @default 'max-w-md'
   */
  widthClass?: string;
  /**
   * Не закрывать по клику на оверлей или Esc.
   */
  persistent?: boolean;
}

/**
 * Универсальное модальное окно с поддержкой доступности и анимации.
 */
const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  actions,
  widthClass = 'max-w-md',
  persistent = false,
}: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // Закрытие по Escape
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !persistent) {
        onClose();
      }
    },
    [onClose, persistent]
  );

  // Закрытие по клику вне модалки
  const handleClickOutside = useCallback(
    (e: MouseEvent) => {
      if (
        !persistent &&
        modalRef.current &&
        !modalRef.current.contains(e.target as Node)
      ) {
        onClose();
      }
    },
    [onClose, persistent]
  );

  // Эффекты при открытии/закрытии
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', handleKeyDown);
      document.addEventListener('click', handleClickOutside);
    } else {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('click', handleClickOutside);
    }

    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen, handleKeyDown, handleClickOutside]);

  if (!isOpen) return null;

  return (
    <>
      {/* Оверлей */}
      <div
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm transition-opacity duration-200"
        aria-hidden="true"
      />

      {/* Модальное окно */}
      <div
        ref={modalRef}
        className={`fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'modal-title' : undefined}
      >
        <Surface
          className={`${widthClass} w-full max-h-[90vh] overflow-hidden flex flex-col animate-fade-in-up`}
        >
          {/* Заголовок */}
          {title && (
            <div className="py-4 px-6 border-b border-gray-200 dark:border-gray-700">
              <h2
                id="modal-title"
                className="text-xl font-semibold text-gray-900 dark:text-white"
              >
                {title}
              </h2>
            </div>
          )}

          {/* Тело */}
          <div className="flex-1 overflow-y-auto p-6">{children}</div>

          {/* Действия */}
          {actions && (
            <div className="shrink-0 px-6 pb-6 pt-4 border-t border-gray-200 dark:border-gray-700">
              {actions}
            </div>
          )}

          {/* Кнопка закрытия (опционально) */}
          {!persistent && (
            <Button
              onClick={onClose}
              className="absolute top-4 right-4 aspect-square text-gray-500 hover:text-gray-700 dark:text-gray-200 dark:hover:text-gray-100"
              aria-label="Закрыть"
              size="sm"
            >
              <X />
            </Button>
          )}
        </Surface>
      </div>
    </>
  );
};

export default Modal;