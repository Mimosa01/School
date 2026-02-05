import Heading from "../../../shared/ui/atoms/Heading/Heading";
import Text from "../../../shared/ui/atoms/Text/Text";

const HelpModalContent = () => {
  const steps = [
    'Выберите этаж в нижней панели',
    'Перемещайте карту свайпами',
    'Масштабируйте карту жестом "щипок" или кнопками +/-',
    'Нажмите дважды на кабинет, чтобы добавить в избранное или поставить метку',
    'Используйте поиск для быстрого нахождения кабинетов',
    'Нажмите "Я здесь", чтобы указать ваше текущее местоположение',
  ];

  return (
    <div className="space-y-5">
      <Heading level={3} size="lg" className="text-center">
        Как пользоваться приложением
      </Heading>

      <div className="space-y-4">
        {steps.map((step, index) => (
          <div key={index} className="flex gap-3">
            <span className="shrink-0 w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-xs font-medium text-blue-800 dark:text-blue-200 mt-0.5">
              {index + 1}
            </span>
            <Text size="base">{step}</Text>
          </div>
        ))}
      </div>

      <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
        <Text size="sm" color="muted" className="text-center">
          Нужна дополнительная помощь? Напишите нам в поддержку.
        </Text>
      </div>
    </div>
  );
};

export default HelpModalContent;