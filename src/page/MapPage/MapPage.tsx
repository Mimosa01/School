import { Floor3 } from "../../features/floors";
import Footer from "../../shared/ui/molecules/Footer/Footer";
import InteractiveMap from "../../shared/ui/organisms/InteractiveMap/InteractiveMap";

const MapPage = () => {
  return (
    <div className="">
      <InteractiveMap
        minScale={1}
        maxScale={5}
        initialScale={1}
        onClick={(coords) => console.log('Клик:', coords)}
      >
        <Floor3 />
      </InteractiveMap>
      <Footer />
    </div>
  )
}

export default MapPage;