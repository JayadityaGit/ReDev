import { Button, Card, ListGroup } from "react-bootstrap"
import { PropertyModel } from "../models/Property"


interface PropertyProps{
    details: PropertyModel
}

const Property = ({details}:PropertyProps) => {

    
  return (
    
        <Card  style={{ width: '18rem' }}>
            <Card.Img variant="top" src={details.images2D[0]} />
                <Card.Body>
                    <Card.Title>{details.price}</Card.Title>
                    <ListGroup className="list-group-flush">
                        <ListGroup.Item>{details.bath}Bath  {details.bed}Bed {details.sqft}sqft</ListGroup.Item>
                        <ListGroup.Item>{details.address}</ListGroup.Item>
                    </ListGroup>
        
                    <Button variant="outline-secondary">Email Agent</Button>
                </Card.Body>
        </Card>
      
  )
}

export default Property