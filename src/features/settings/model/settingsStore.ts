import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AppSettings, ThemePreference, FontSize, RoomLabelMode } from './types';

interface SettingsState extends AppSettings {
  setTheme: (theme: ThemePreference) => void;
  setFontSize: (fontSize: FontSize) => void;
  setRoomLabels: (roomLabels: RoomLabelMode) => void;
  applyTheme: () => void;
  applyFontSize: () => void;
}

const getDefaultSettings = (): AppSettings => ({
  theme: 'system',
  fontSize: 'medium',
  roomLabels: 'onZoom',
});

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set, get) => ({
      ...getDefaultSettings(),
      
      setTheme: (theme) => {
        set({ theme });
        get().applyTheme();
      },
      
      setFontSize: (fontSize) => {
        set({ fontSize });
        get().applyFontSize(); // ← Применяем размер шрифта
      },
      
      setRoomLabels: (roomLabels) => set({ roomLabels }),
      
      applyTheme: () => {
        const { theme } = get();
        
        const getSystemTheme = () =>
          window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        
        document.documentElement.classList.remove('light', 'dark');
        
        const themeToApply = theme === 'system' ? getSystemTheme() : theme;
        
        document.documentElement.classList.add(themeToApply);
        
        if (theme === 'system') {
          const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
          const handleChange = () => {
            document.documentElement.classList.remove('light', 'dark');
            document.documentElement.classList.add(getSystemTheme());
          };
          mediaQuery.addEventListener('change', handleChange);
          return () => mediaQuery.removeEventListener('change', handleChange);
        }
      },
      
      applyFontSize: () => {
        const { fontSize } = get();
        
        // Удаляем старые классы
        document.documentElement.classList.remove('font-small', 'font-medium', 'font-large');
        
        // Добавляем новый класс
        document.documentElement.classList.add(`font-${fontSize}`);
        
        // Сохраняем в переменную для отладки
        document.documentElement.style.setProperty('--font-size-mode', fontSize);
      },
    }),
    {
      name: 'app-settings',
      partialize: (state) => ({
        theme: state.theme,
        fontSize: state.fontSize,
        roomLabels: state.roomLabels,
      }),
    }
  )
);

// Автоматически применяем настройки при инициализации
if (typeof window !== 'undefined') {
  useSettingsStore.getState().applyTheme();
  useSettingsStore.getState().applyFontSize();
}