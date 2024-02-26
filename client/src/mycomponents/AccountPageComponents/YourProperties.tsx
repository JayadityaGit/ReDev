import { Button } from "@/components/ui/button"
import { User } from "@/models/user"

import { useNavigate } from "react-router-dom"

interface YourPropertiesProps {
  user: User | undefined
}

const YourProperties = ({user}: YourPropertiesProps) => {

  const navigate = useNavigate()

  return (
    <div>
       <Button onClick={()=>{navigate("/upload")}} >Uploaoad Property</Button>
    </div>
  )
}

export default YourProperties