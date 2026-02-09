import { openCustomModal } from '../../modal';
import BellScheduleModalContent, { type BellScheduleItem } from '../ui/BellSheduleModalContent';


// Первая смена
export const FIRST_SHIFT: BellScheduleItem[] = [
  { lesson: 1, start: '08:00', end: '08:40' },
  { lesson: 2, start: '09:00', end: '09:40' },
  { lesson: 3, start: '10:00', end: '10:40' },
  { lesson: 4, start: '10:50', end: '11:30' },
  { lesson: 5, start: '11:40', end: '12:20' },
  { lesson: 6, start: '12:30', end: '13:10' },
  { lesson: 7, start: '13:20', end: '14:00' },
  { lesson: 8, start: '14:10', end: '14:50' },
];

// Вторая смена
export const SECOND_SHIFT: BellScheduleItem[] = [
  { lesson: 1, start: '12:50', end: '13:30' },
  { lesson: 2, start: '13:40', end: '14:20' },
  { lesson: 3, start: '14:40', end: '15:20' },
  { lesson: 4, start: '15:40', end: '16:20' },
  { lesson: 5, start: '16:30', end: '17:10' },
  { lesson: 6, start: '17:20', end: '18:00' },
  { lesson: 7, start: '18:10', end: '18:50' },
];

export const openBellScheduleModal = () => {
  openCustomModal({
    title: 'Расписание звонков',
    content: (
      <BellScheduleModalContent
        firstShift={FIRST_SHIFT}
        secondShift={SECOND_SHIFT}
      />
    ),
    actions: null,
  });
};