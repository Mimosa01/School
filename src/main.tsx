import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import AppWithTheme from './app/App'
import './styles/index.css';
import { registerSW } from 'virtual:pwa-register';

// Регистрация сервис-воркера
const updateSW = registerSW({
  onNeedRefresh() {
    // Показать уведомление о доступном обновлении
    if (confirm('Доступна новая версия приложения. Обновить?')) {
      updateSW();
    }
  },
  onOfflineReady() {
    console.log('Приложение готово к офлайн-работе!');
    // Можно показать уведомление пользователю
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppWithTheme />
  </StrictMode>,
);

