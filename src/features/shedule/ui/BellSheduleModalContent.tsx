import { useState } from 'react';
import Text from "../../../shared/ui/atoms/Text/Text";
import SegmentedControl from "../../../shared/ui/atoms/SegmentedControl/SegmentedControl";

export interface BellScheduleItem {
  lesson: number;
  start: string;
  end: string;
}

interface BellScheduleModalContentProps {
  firstShift: BellScheduleItem[];
  secondShift: BellScheduleItem[];
}

const BellScheduleModalContent = ({
  firstShift,
  secondShift,
}: BellScheduleModalContentProps) => {
  const [selectedShift, setSelectedShift] = useState<'first' | 'second'>('first');
  const currentSchedule = selectedShift === 'first' ? firstShift : secondShift;

  return (
    <div className="space-y-4">
      {/* Переключатель смен */}
      <SegmentedControl
        options={[
          { label: 'Первая смена', value: 'first' },
          { label: 'Вторая смена', value: 'second' },
        ]}
        value={selectedShift}
        onChange={(val) => setSelectedShift(val as 'first' | 'second')}
        size="md"
        className="w-full"
      />

      {/* Расписание */}
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {currentSchedule.map((item) => (
          <div
            key={item.lesson}
            className="flex justify-between items-center py-2.5"
          >
            <div className="flex items-center gap-3">
              <span className="w-7 h-7 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-xs font-medium text-blue-800 dark:text-blue-200">
                {item.lesson}
              </span>
              <Text weight="medium">Урок {item.lesson}</Text>
            </div>
            <Text size="sm" color="muted" className="font-mono">
              {item.start} – {item.end}
            </Text>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BellScheduleModalContent;