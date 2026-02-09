import { openCustomModal } from '../../modal';
import AuthModalContent from '../ui/AuthModalContent';

export const openAuthModal = () => {
  openCustomModal({
    title: 'Аутентификация',
    content: <AuthModalContent />,
    actions: null, // Кнопки управления внутри форм
  });
};
