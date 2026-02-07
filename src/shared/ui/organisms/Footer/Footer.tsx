import { Search } from "lucide-react";
import Button from "../../atoms/Button/Button";
import StickyActionFooter from "../../atoms/StickyActonFooter/StickyActionFooter";
import { FLOORS, useFloorStore, type FloorId } from "../../../../features/floors";

const Footer = () => {
  const { currentFloorId, setCurrentFloor } = useFloorStore();
  
  return (
    <StickyActionFooter align="space-between" className="max-w-107.5 mx-auto">
      {Object.values(FLOORS).map((floor) => (
        <Button
          key={floor.id}
          variant={currentFloorId === floor.id ? 'primary' : 'secondary'}
          onClick={() => setCurrentFloor(floor.id as FloorId)}
          className="shadow-md w-full aspect-2/1"
        >
          {floor.name}
        </Button>
      ))}
      <Button className="shadow-md w-full aspect-2/1" variant="secondary"><Search /></Button>
    </StickyActionFooter>
  )
}

export default Footer;