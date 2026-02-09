import React from 'react';
import { useRoomStore } from '../model/roomStore';
import RoomMarker from './RoomMaker';
import { useFloorStore } from '../../floors';

interface RoomMarkersLayerProps {
  onRoomClick?: (roomId: string, coords: { x: number; y: number }) => void;
}

const RoomMarkersLayer = ({ onRoomClick }: RoomMarkersLayerProps) => {
  const currentFloorId = useFloorStore((state) => state.currentFloorId);
  const rooms = useRoomStore((state) => state.rooms);

  const roomsOnCurrentFloor = React.useMemo(() => {
    return rooms.filter((room) => room.floorId === currentFloorId);
  }, [rooms, currentFloorId]);

  return (
    <div className="absolute top-0 w-full h-full">
      {roomsOnCurrentFloor.map((room) => (
        <RoomMarker
          key={room.id}
          roomId={room.id}
          x={room.x}
          y={room.y}
          width={room.width}
          height={room.height}
          number={room.number}
          name={room.name}
          type={room.type}
          onClick={onRoomClick} // ← Передаем обработчик
        />
      ))}
    </div>
  );
};

export default RoomMarkersLayer;