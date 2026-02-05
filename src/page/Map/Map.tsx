import Footer from "../../shared/ui/molecules/Footer/Footer";
import Header from "../../shared/ui/organisms/Header/Header";
import MapControl from "../../shared/ui/molecules/MapControl/MapControl";

const MapPage = () => {
  return (
    <>
      <Header />
      {/* Тут будет карта */}
      <MapControl />
      <Footer />
    </>
  )
}

export default MapPage;