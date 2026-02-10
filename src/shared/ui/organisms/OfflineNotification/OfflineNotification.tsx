/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';

const OfflineNotification = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  // Отслеживание онлайн/офлайн статуса
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Обнаружение события "перед установкой"
  useEffect(() => {
    const handleBeforeInstallPrompt = (e: { preventDefault: () => void; }) => {
      // Предотвращаем автоматическую установку
      e.preventDefault();
      // Сохраняем событие для последующего использования
      setDeferredPrompt(e);
      // Показываем приглашение к установке
      setShowInstallPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      // Показываем диалог установки
      deferredPrompt.prompt();
      // Ждем выбора пользователя
      const { outcome } = await deferredPrompt.userChoice;
      console.log(`Результат установки: ${outcome}`);
      // Скрываем приглашение
      setShowInstallPrompt(false);
      setDeferredPrompt(null);
    }
  };

  if (isOnline && !showInstallPrompt) return null;

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {/* Офлайн уведомление */}
      {!isOnline && (
        <div className="bg-yellow-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2">
          <span>⚠️</span>
          <span>Вы работаете в офлайн-режиме</span>
        </div>
      )}

      {/* Приглашение установить приложение */}
      {showInstallPrompt && (
        <div className="bg-blue-600 text-white px-4 py-3 rounded-lg shadow-lg flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center gap-2">
            <span>📱</span>
            <span>Установить приложение для офлайн-доступа?</span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleInstallClick}
              className="px-3 py-1 bg-white text-blue-600 rounded hover:bg-blue-50 font-medium"
            >
              Установить
            </button>
            <button
              onClick={() => setShowInstallPrompt(false)}
              className="px-3 py-1 border border-white/30 rounded hover:bg-blue-700/30"
            >
              Позже
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OfflineNotification;

