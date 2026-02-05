import Button from "../../../shared/ui/atoms/Button/Button";
import Heading from "../../../shared/ui/atoms/Heading/Heading";
import Text from "../../../shared/ui/atoms/Text/Text";

const AboutAppModalContent = () => {
  return (
    <div className="space-y-6 text-center">
      {/* Логотип и заголовок */}
      <div>
        <div className="text-4xl mb-2">🧭</div>
        <Heading level={3} size="xl" className="mb-1">
          Школьный Навигатор
        </Heading>
        <Text color="muted">Версия 1.0.0</Text>
      </div>

      {/* Контакты */}
      <div className="text-left space-y-2">
        <Heading level={4} size="base" weight="bold" className="mb-2">
          Контакты разработчиков
        </Heading>
        <Text>📧 support@schoolnav.ru</Text>
        <Text>📱 +7 (999) 123-45-67</Text>
      </div>

      {/* Ссылки */}
      <div className="text-left space-y-3">
        <Heading level={4} size="base" weight="bold" className="mb-2">
          Полезные ссылки
        </Heading>
        <Button variant="secondary" className="w-full justify-start px-3">
          Политика конфиденциальности
        </Button>
        <Button variant="secondary" className="w-full justify-start px-3">
          Пользовательское соглашение
        </Button>
        <Button variant="secondary" className="w-full justify-start px-3">
          Официальный сайт школы
        </Button>
      </div>
    </div>
  );
};

export default AboutAppModalContent;