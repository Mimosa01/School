import React from 'react';
import { useRoomStore } from '../model/roomStore';
import RoomMarker from './RoomMaker';
import { useFloorStore } from '../../floors';


const RoomMarkersLayer = () => {
  const currentFloorId = useFloorStore((state) => state.currentFloorId);
  const rooms = useRoomStore((state) => state.rooms);
  const selectRoom = useRoomStore((state) => state.selectRoom);

  // Фильтруем кабинеты в компоненте, а не в сторе
  const roomsOnCurrentFloor = React.useMemo(() => {
    return rooms.filter((room) => room.floorId === currentFloorId);
  }, [rooms, currentFloorId]);

  const handleRoomClick = (roomId: string) => {
    console.log('Клик по кабинету:', roomId);
    selectRoom(roomId);
    // Здесь можно открыть модалку с информацией
  };

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
          onClick={handleRoomClick}
        />
      ))}
    </div>
  );
};

export default RoomMarkersLayer;