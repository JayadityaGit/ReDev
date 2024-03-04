import { useMemo, useState } from "react"

import View360, { ControlBar, EquirectProjection } from "@egjs/react-view360";
import { Button } from "@/components/ui/button";

interface PanaromaProps {

  panaromaImages: string[]
  
}
const Panaroma = ({panaromaImages}: PanaromaProps) => {

  const [index, setIndex] = useState(0)

  const projection = useMemo(() => new EquirectProjection({
    src: panaromaImages[index],
  }), [index, panaromaImages]);




  return (
    <div>

      <Button onClick={()=>{

      if(index === panaromaImages.length-1){
        return;
      }

      setIndex((index + 1))

      }}>next</Button>


      <Button variant={"outline"} onClick={()=>{

      if(index === 0){
        return;
      }

      setIndex((index - 1))

      }}>before</Button>



  <View360

   
    style={{ width: "100%", height: "70vh" }}
    plugins={[new ControlBar()]}
    projection={projection}
   
  />


 
  </div>
  )
}

export default Panaroma