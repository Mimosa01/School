import { openCustomModal } from '../../modal';
import AboutAppModalContent from '../ui/AboutAppModalContent';

export const openAboutAppModal = () => {
  openCustomModal({
    title: 'О приложении',
    content: <AboutAppModalContent />,
    actions: null,
  });
};