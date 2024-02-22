import { PropertyModel } from "../models/Property"


interface PropertyDetailsProps {
    details: PropertyModel
}

const PropertyText = ({details}: PropertyDetailsProps) => {
  return (
    <div>
      {JSON.stringify(details)}
    </div>
  )
}

export default PropertyText