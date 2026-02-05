import Text from "../../../shared/ui/atoms/Text/Text";

export interface BellScheduleItem {
  lesson: number;
  start: string;
  end: string;
}

interface BellScheduleModalContentProps {
  schedule: BellScheduleItem[];
}

const BellScheduleModalContent = ({ schedule }: BellScheduleModalContentProps) => {
  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      {schedule.map((item) => (
        <div
          key={item.lesson}
          className="flex justify-between items-center py-2"
        >
          <div className="flex items-center gap-3">
            <span className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-xs font-medium text-blue-800 dark:text-blue-200">
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
  );
};

export default BellScheduleModalContent;