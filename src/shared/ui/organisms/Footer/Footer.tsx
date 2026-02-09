import { Search } from "lucide-react";
import { useFloorStore, FLOORS } from "../../../../features/floors";
import { useRoomSearch } from "../../../../features/rooms/lib/useRoomSearch";
import RoomSearch from "../../../../features/rooms/ui/RoomsSearch";
import Button from "../../atoms/Button/Button";
import StickyActionFooter from "../../atoms/StickyActonFooter/StickyActionFooter";


const Footer = () => {
  const { currentFloorId, setCurrentFloor } = useFloorStore();
  const { isSearchOpen, openSearch, closeSearch } = useRoomSearch();

  const handleRoomSelect = (room: { floorId: number; x: number; y: number }) => {
    console.log('Выбран кабинет для навигации:', room);
  };

  return (
    <>
      <StickyActionFooter>
        {Object.values(FLOORS).map((floor) => (
          <Button
            key={floor.id}
            variant={currentFloorId === floor.id ? 'primary' : 'secondary'}
            onClick={() => setCurrentFloor(floor.id)}
            className="shadow-md w-full aspect-2/1"
          >
            {floor.name}
          </Button>
        ))}
        <Button
          variant={'secondary'}
          onClick={openSearch}
          className="shadow-md w-full aspect-2/1"
        >
          <Search />
        </Button>
      </StickyActionFooter>

      {/* Модальное окно поиска */}
      <RoomSearch
        isOpen={isSearchOpen}
        onClose={closeSearch}
        onSelectRoom={handleRoomSelect}
      />
    </>
  );
};

export default Footer;