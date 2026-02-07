import { useEffect } from "react";
import { ModalProvider } from "../features/modal/ui/ModalProvider";
import { useAppSettings } from "../features/settings/model/useAppSettings";
import MapPage from "../page/MapPage/MapPage";
import Header from "../shared/ui/organisms/Header/Header";

function App() {
  return (
    <>
      <div className="bg-gray-100 dark:bg-gray-800 flex flex-col gap-2 h-screen pt-2">
        <Header />
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