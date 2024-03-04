import { PropertyModel } from "@/models/Property"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { AspectRatio } from "@/components/ui/aspect-ratio"



interface DetailsProps {
  property: PropertyModel
}

const Details = ({property}: DetailsProps) => {
  return (
    <div>
      <Carousel >
        <CarouselContent>
          {
            property.images2D.map((image) => (
              <CarouselItem >
                <AspectRatio ratio={16 / 9}>
                            <img src={image} alt="propertyImage" className="object-cover  w-full" />
                  </AspectRatio>
              </CarouselItem>
            ))
          }
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>


      <div>
        <p>{property.buyType}</p>

        <div>
          <p>{property.price}</p>
          <p>{property.emi}</p>
        </div>


         <div>
          <p>{property.bed}bed</p>
          <p>{property.bath}bath</p>
          <p>{property.sqft}sqft</p>
         </div>
          

        <p>{property.address}</p>

        <div>
          <p>{property.Type}</p>
          <p>{property.priceSqft}</p>
        </div>
      </div>


    </div>
  )
}

export default Details