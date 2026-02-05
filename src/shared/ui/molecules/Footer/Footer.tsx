import { FlagTriangleRight, Search } from "lucide-react";
import Button from "../../atoms/Button/Button";
import StickyActionFooter from "../../atoms/StickyActonFooter/StickyActionFooter";

const Footer = () => {
  return (
    <StickyActionFooter align="space-between" className="max-w-107.5 mx-auto">
      <Button className="shadow-md w-full aspect-2/1" variant="primary">1</Button>
      <Button className="shadow-md w-full aspect-2/1" variant="secondary">2</Button>
      <Button className="shadow-md w-full aspect-2/1" variant="secondary">3</Button>
      <Button className="shadow-md w-full aspect-2/1" variant="secondary"><Search /></Button>
      <Button className="shadow-md w-full aspect-2/1" variant="secondary"><FlagTriangleRight className="text-rose-600"/></Button>
    </StickyActionFooter>
  )
}

export default Footer;