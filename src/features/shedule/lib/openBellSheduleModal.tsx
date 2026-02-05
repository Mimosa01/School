import { openCustomModal } from '../../modal';
import BellScheduleModalContent, { type BellScheduleItem } from '../ui/BellSheduleModalContent';

export const BELL_SCHEDULE: BellScheduleItem[] = [
  { lesson: 1, start: '08:30', end: '09:15' },
  { lesson: 2, start: '09:25', end: '10:10' },
  { lesson: 3, start: '10:20', end: '11:05' },
  { lesson: 4, start: '11:15', end: '12:00' },
  { lesson: 5, start: '12:10', end: '12:55' },
  { lesson: 6, start: '13:05', end: '13:50' },
  { lesson: 7, start: '14:00', end: '14:45' },
];

export const openBellScheduleModal = () => {
  openCustomModal({
    title: 'Расписание звонков',
    content: <BellScheduleModalContent schedule={BELL_SCHEDULE} />,
    actions: null,
  });
};