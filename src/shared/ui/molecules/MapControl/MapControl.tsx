import { Plus, Minus, PersonStanding } from "lucide-react"
import Button from "../../atoms/Button/Button"

const MapControl = () => {
  return (
    <div className="fixed bottom-1/2 translate-y-1/2 right-2 flex flex-col gap-2">
      <Button className="aspect-square" variant="ghost"><Plus /></Button>
      <Button className="aspect-square" variant="ghost"><Minus /></Button>
      <Button className="aspect-square" variant="ghost"><PersonStanding /></Button>
    </div>
  )
}

export default MapControl;