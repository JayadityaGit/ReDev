import { PropertyModel } from "@/models/Property"


interface ContactProps {
    property: PropertyModel
}

const Contact = ({property}: ContactProps) => {
  return (
    <div>
        <p>{property.seller}</p>
        <p>{property.email}</p>
        <p>{property.phone}</p>
    </div>
  )
}

export default Contact