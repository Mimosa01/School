import { openCustomModal } from '../../modal';
import SettingsModalContent from '../ui/SettingsModalContent';

export const openSettingsModal = () => {
  openCustomModal({
    title: 'Настройки',
    content: <SettingsModalContent />,
    actions: null,
  });
};