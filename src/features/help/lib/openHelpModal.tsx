import { openCustomModal } from '../../modal';
import HelpModalContent from '../ui/HelpModalContent';

export const openHelpModal = () => {
  openCustomModal({
    title: 'Помощь',
    content: <HelpModalContent />,
    actions: null,
  });
};