import { Settings } from "lucide-react";
import Button from "../../atoms/Button/Button";
import Logo from "../../atoms/Logo/Logo";
import Surface from "../../atoms/Surface/Surface";
import Heading from "../../atoms/Heading/Heading";
import Text from "../../atoms/Text/Text";
import RightDrawer from "../RightDrawer/RightDrawer";
import { useDrawer } from "../../../hooks/useDrawer";
import AnimatedItem from "../../atoms/AnimatedItem/AnimatedItem";
import { openBellScheduleModal } from "../../../../features/shedule/lib/openBellSheduleModal";
import { openSettingsModal } from "../../../../features/settings/lib/openSettingsModal";
import { openHelpModal } from "../../../../features/help/lib/openHelpModal";
import { openAboutAppModal } from "../../../../features/about/lib/openAboutAppModal";
import { openReportErrorModal } from "../../../../features/report/lib/openReportErrorModal";
import { openAuthModal } from "../../../../features/auth";

const Header = () => {
  const { isOpen, toggle, close } = useDrawer();

  return (
    <div className="flex mx-2">
      <Surface className="p-4 mr-2">
        <Logo />
      </Surface>
      <Surface className="flex justify-between w-full px-4">
        <div>
          <Heading level={4}>Школьный навигатор</Heading>
          <Text color="muted">Школа №123</Text>
        </div>
        <Button variant="ghost" onClick={toggle}><Settings /></Button>
      </Surface>

      <RightDrawer isOpen={isOpen} onClose={close} title="Настройки">
        <div className="space-y-4" key={isOpen ? 'drawer-open' : 'drawer-closed'}>
          <AnimatedItem delay={50}>
            <Button variant="secondary" className="w-full"
              onClick={(e) => {
                e.stopPropagation();
                openBellScheduleModal();
              }}
            >
              Расписание звонков
            </Button>
          </AnimatedItem>
          <AnimatedItem delay={100}>
            <Button variant="secondary" className="w-full">Избранное</Button>
          </AnimatedItem>
          <AnimatedItem delay={150}>
            <Button variant="secondary" className="w-full"
              onClick={(e) => {
                e.stopPropagation();
                openSettingsModal();
              }}
            >
              Настройки
            </Button>
          </AnimatedItem>
          <AnimatedItem delay={200}>
            <Button variant="secondary" className="w-full"
              onClick={(e) => {
                e.stopPropagation();
                openHelpModal();
              }}
            >
              Помощь
            </Button>
          </AnimatedItem>
          <AnimatedItem delay={250}>
            <Button variant="secondary" className="w-full"
            onClick={(e) => {
              e.stopPropagation();
              openAboutAppModal();
            }}
            >
              О приложении
            </Button>
          </AnimatedItem>
          <AnimatedItem delay={300}>
            <Button variant="secondary" className="w-full"
              onClick={(e) => {
                e.stopPropagation();
                openReportErrorModal();
              }}
            >
            <Text className="text-rose-500">
              Сообщить об ошибке
            </Text></Button>
          </AnimatedItem>
          <AnimatedItem delay={300}>
            <Button variant="danger" className="w-full"
              onClick={(e) => {
                e.stopPropagation();
                openAuthModal();
              }}
            >
            <Text color="light">
              Войти
            </Text></Button>
          </AnimatedItem>
        </div>
      </RightDrawer>
    </div>
  )
}

export default Header;