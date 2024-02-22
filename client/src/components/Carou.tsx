
import { Carousel } from 'react-bootstrap'
import { PropertyModel } from '../models/Property'


interface CarouProps {
    details: PropertyModel
}

const Carou = ({details}:CarouProps) => {
  return (
    <Carousel>
         {
          details.images2D.map((image) => {
            return (
              <Carousel.Item key={details._id}>

                <img src={image} alt={details.address}/>
              
              </Carousel.Item>
            )
          })
         }
      </Carousel>
  )
}

export default Carou