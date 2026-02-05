// app/App.tsx
import { useEffect } from "react";
import { ModalProvider } from "../features/modal/ui/ModalProvider";
import { useAppSettings } from "../features/settings/model/useAppSettings";
import MapPage from "../page/Map/Map";

function App() {
  return (
    <>
      <div className="p-2 min-h-screen">
        <MapPage />
      </div>
      <ModalProvider />
    </>
  );
}

const AppWithTheme = () => {
  const { settings } = useAppSettings();

  const effectiveTheme = 
    settings.theme === 'system'
      ? window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light'
      : settings.theme;

  useEffect(() => {
    if (effectiveTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [effectiveTheme]);

  return <App />;
};

export default AppWithTheme;