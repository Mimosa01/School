import { useState, useEffect } from 'react';
import type { AppSettings } from './types';

const STORAGE_KEY = 'app-settings';

const getDefaultSettings = (): AppSettings => {
  if (typeof window === 'undefined') {
    return { theme: 'system', fontSize: 'medium', roomLabels: 'onZoom' };
  }
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch { /* empty */ }
  }
  return { theme: 'system', fontSize: 'medium', roomLabels: 'onZoom' };
};

export const useAppSettings = () => {
  const [settings, setSettings] = useState<AppSettings>(getDefaultSettings);

  // Определяем текущую системную тему
  const getSystemTheme = () =>
    window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

  // Обновляем класс темы на <html>
  useEffect(() => {
    const applyTheme = () => {
      document.documentElement.classList.remove('light', 'dark');
      
      const themeToApply =
        settings.theme === 'system' ? getSystemTheme() : settings.theme;
      
      document.documentElement.classList.add(themeToApply);
    };

    applyTheme();

    // Слушаем изменения системной темы (если выбрано "system")
    if (settings.theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = () => applyTheme();
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, [settings.theme]); // ← зависимость от settings.theme

  const updateSetting = <K extends keyof AppSettings>(
    key: K,
    value: AppSettings[K]
  ) => {
    setSettings((prev) => {
      const newSettings = { ...prev, [key]: value };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newSettings));
      return newSettings;
    });
  };

  return { settings, updateSetting };
};