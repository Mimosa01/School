import { openCustomModal } from '../../modal';
import ReportErrorModalContent from '../ui/ReportErrorModalContent';

export const openReportErrorModal = () => {
  openCustomModal({
    title: 'Сообщить об ошибке',
    content: <ReportErrorModalContent />,
    actions: null,
  });
};