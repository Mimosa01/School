import { useEffect } from 'react';
import { useFloorStore } from "../../features/floors";
import RoomMarkersLayer from "../../features/rooms/ui/RoomMakersLayer";
import RoutePointsLayer from "../../features/navigation/ui/RoutePointsLayer";
import { useRouteStore } from "../../features/navigation/model/routeStore";
import Footer from "../../shared/ui/organisms/Footer/Footer";
import InteractiveMap from "../../shared/ui/organisms/InteractiveMap/InteractiveMap";
import Button from '../../shared/ui/atoms/Button/Button';

const MapPage = () => {
  const { currentFloor } = useFloorStore();
  const FloorComponent = currentFloor.Component;
  
  const { setCurrentFloorId, addPoint, addPointByRoomId, clearRoute, startPoint, endPoint } = useRouteStore();

  useEffect(() => {
    setCurrentFloorId(currentFloor.id);
  }, [currentFloor.id, setCurrentFloorId]);

  const handleMapClick = (coords: { x: number; y: number; scale: number }) => {
    addPoint(coords.x, coords.y);
  };

  const handleRoomClick = (roomId: string, roomCoords: { x: number; y: number }) => {
    addPointByRoomId(roomId, roomCoords);
  };

  return (
    <>
      <InteractiveMap
        minScale={0.3}
        maxScale={2}
        initialScale={0.3}
        onClick={handleMapClick}
      >
        <FloorComponent />
        <RoomMarkersLayer onRoomClick={handleRoomClick} />
        <RoutePointsLayer />
      </InteractiveMap>
      
      {/* Информационная панель маршрута */}
      {(startPoint || endPoint) &&
        <div className="fixed bottom-24 left-1/2 transform -translate-x-1/2 z-30">
          <Button
            onClick={clearRoute}
            variant="danger"
            className="w-full py-2.5 text-sm font-medium"
          >
            Очистить маршрут
          </Button>
        </div>
      }
      
      <Footer />
    </>
  );
};

export default MapPage;