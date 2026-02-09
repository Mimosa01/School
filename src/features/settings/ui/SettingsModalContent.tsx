import Heading from "../../../shared/ui/atoms/Heading/Heading";
import Text from "../../../shared/ui/atoms/Text/Text";
import SegmentedControl from "../../../shared/ui/atoms/SegmentedControl/SegmentedControl";
import { useSettingsStore } from "../model/settingsStore";
import type { FontSize, RoomLabelMode, ThemePreference } from "../model/types";

const SettingsModalContent = () => {
  const { theme, fontSize, roomLabels, setTheme, setFontSize, setRoomLabels } = useSettingsStore();

  return (
    <div className="space-y-6">
      <Heading level={3} size="lg" className="text-center">
        Настройки
      </Heading>

      {/* Тема */}
      <div>
        <Text weight="medium" className="mb-2">Тема</Text>
        <SegmentedControl
          options={[
            { label: 'Светлая', value: 'light' },
            { label: 'Тёмная', value: 'dark' },
            { label: 'Система', value: 'system' },
          ]}
          value={theme}
          onChange={(val) => setTheme(val as ThemePreference)}
        />
      </div>

      {/* Размер шрифта */}
      <div>
        <Text weight="medium" className="mb-2">Размер текста</Text>
        <SegmentedControl
          options={[
            { label: 'Мелкий', value: 'small' },
            { label: 'Средний', value: 'medium' },
            { label: 'Крупный', value: 'large' },
          ]}
          value={fontSize}
          onChange={(val) => setFontSize(val as FontSize)}
        />
      </div>

      {/* Названия кабинетов */}
      <div>
        <Text weight="medium" className="mb-2">Названия кабинетов показывать</Text>
        <SegmentedControl
          options={[
            { label: 'Всегда', value: 'always' },
            { label: 'Никогда', value: 'never' },
            { label: 'При увеличении', value: 'onZoom' },
          ]}
          value={roomLabels}
          onChange={(val) => setRoomLabels(val as RoomLabelMode)}
        />
      </div>
    </div>
  );
};

export default SettingsModalContent;