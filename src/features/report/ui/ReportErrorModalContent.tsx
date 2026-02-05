import { useState } from "react";
import Button from "../../../shared/ui/atoms/Button/Button";
import Heading from "../../../shared/ui/atoms/Heading/Heading";
import Text from "../../../shared/ui/atoms/Text/Text";
import Textarea from "../../../shared/ui/atoms/Textarea/Textarea";

const ReportErrorModalContent = () => {
  const [description, setDescription] = useState('');
  const [screenshot, setScreenshot] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file && file.type.startsWith('image/')) {
      setScreenshot(file);
    }
  };

  const handleSubmit = async () => {
    if (!description.trim()) return;

    setIsSubmitting(true);

    try {
      // Здесь будет ваша логика отправки:
      // - собрать данные,
      // - отправить на сервер или в форму,
      // - показать уведомление.
      console.log('Отправка отчёта:', { description, screenshot });

      // Имитация задержки
      await new Promise((r) => setTimeout(r, 1000));

      alert('Спасибо! Ваш отчёт отправлен.');
      // Закрыть модалку можно через onClose, но здесь просто alert для примера.
    } catch (err) {
      console.error(err);
      alert('Не удалось отправить отчёт. Попробуйте позже.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-5">
      <Heading level={3} size="lg" className="text-center">
        Сообщить об ошибке
      </Heading>

      <Text>
        Опишите проблему, с которой вы столкнулись. Приложите скриншот, если возможно — это поможет нам быстрее её исправить.
      </Text>

      {/* Описание */}
      <div>
        <Textarea 
          label="Описание ошибки"
          placeholder="Например: «Карта не загружается на 3 этаже» или «Кабинет 215 отображается в неправильном месте»"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full"
        />
      </div>

      {/* Прикрепление скриншота */}
      <div>
        <Text weight="medium" className="mb-2">Скриншот (опционально)</Text>
        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl cursor-pointer bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
          {screenshot ? (
            <span className="text-blue-600 dark:text-blue-400 text-sm">
              {screenshot.name}
            </span>
          ) : (
            <>
              <span className="text-gray-500 dark:text-gray-400 text-sm">
                Нажмите, чтобы выбрать файл
              </span>
              <Text size="xs" color="muted" className="mt-1">
                Поддерживаются JPG, PNG
              </Text>
            </>
          )}
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>
      </div>

      {/* Кнопка отправки */}
      <Button
        onClick={handleSubmit}
        disabled={!description.trim() || isSubmitting}
        loading={isSubmitting}
        className="w-full"
      >
        Отправить отчёт
      </Button>
    </div>
  );
};

export default ReportErrorModalContent;