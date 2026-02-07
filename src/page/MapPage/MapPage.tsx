import { useFloorStore } from "../../features/floors";
import RoomMarkersLayer from "../../features/rooms/ui/RoomMakersLayer";
import Footer from "../../shared/ui/organisms/Footer/Footer";
import InteractiveMap from "../../shared/ui/organisms/InteractiveMap/InteractiveMap";

const MapPage = () => {
  const { currentFloor } = useFloorStore();
  const FloorComponent = currentFloor.Component;

  return (
    <>
      <InteractiveMap
        minScale={0.3}
        maxScale={2}
        initialScale={0.3}
        onClick={(coords) => console.log('Клик:', coords)}
      >
        <FloorComponent />
        <RoomMarkersLayer />
      </InteractiveMap>
      <Footer />
    </>
  )
}

export default MapPage;