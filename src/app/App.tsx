import { useEffect } from "react";
import { ModalProvider } from "../features/modal/ui/ModalProvider";
import MapPage from "../page/MapPage/MapPage";
import Header from "../shared/ui/organisms/Header/Header";
import { useSettingsStore } from "../features/settings/model/settingsStore";
import { useInitializeNavigation } from "../features/navigation/model/useInitializeNavigation";
import OfflineNotification from "../shared/ui/organisms/OfflineNotification/OfflineNotification";

function App() {
  useInitializeNavigation();

  return (
    <>
      <div className="bg-gray-100 dark:bg-gray-800 flex flex-col gap-2 pt-2 h-screen">
        <OfflineNotification />
        <Header />
        <MapPage />
      </div>
      <ModalProvider />
    </>
  );
}

const AppWithTheme = () => {
  const { theme } = useSettingsStore();

  const effectiveTheme = 
    theme === 'system'
      ? window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light'
      : theme;

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