import { addToLibrary, getLibrary, removeFromLibrary } from "@/api/Api"
import { PropertyModel } from "@/models/Property"

import { useEffect, useState } from "react"

import { User } from "@/models/user"
import FavCard from "./FavCard"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"



import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Switch } from "@/components/ui/switch"


interface YourFavouritesProps {
  user: User | undefined
}

const YourFavourites = ({user}: YourFavouritesProps) => {

  const [library, setLibrary] = useState<PropertyModel[]>([])

  const [toggleState, setToggleState] = useState(true);

  
  useEffect(() => {
    async function loadLibrary() {
      try {

        const response = await getLibrary();

        setLibrary(response.library);
        
      } catch (error) {
        console.log(error)
      }
    }

    loadLibrary();

  }, [])
  


 

  return (
    <div>{
      
      library.map((property) => (
        <Card key={property._id}>
              <Carousel>
                <CarouselContent>

                  {
                    property.images2D.map((image) => (
                        <CarouselItem>
                            <AspectRatio ratio={16 / 9}>
                            <img src={image} alt="propertyImage" className="rounded-t-lg object-cover w-full" />
                            </AspectRatio>
                        </CarouselItem>
                    ))
                  }
                  
                </CarouselContent> 
              </Carousel>

            <CardHeader className="p-4">
                
                <CardTitle className="flex justify-between items-center">

                  <p className="text-2xl font-bold ">${property.price}</p> 

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Switch  checked={toggleState} onCheckedChange={async(event)=>{

                              
                              if(event){
                               await addToLibrary(property)

                               setToggleState(true)

                               
                               
                              }else{
                               const removedProperty = await removeFromLibrary(property._id)

                               console.log(removedProperty);

                               setLibrary(library.filter((property) => property._id !== removedProperty))

                               

                              
                           
                              }
                            

                        }} className="border-gray-400 border-double" />
                        </TooltipTrigger>
                        <TooltipContent>
                        <p>Add to library</p>
                      </TooltipContent>
                        </Tooltip>
                        </TooltipProvider>
                        </CardTitle>


                <CardDescription >{property.buyType}</CardDescription>
                <CardDescription className="flex space-x-4 text-lg "><span className="font-extrabold">{property.bed}</span> bed <span className="font-extrabold">{property.bath}</span> bath <span className="font-extrabold">{property.sqft}</span> sqft</CardDescription>
                <CardDescription >{property.address}</CardDescription>
            </CardHeader>


            <CardFooter className="px-4">

              <Drawer shouldScaleBackground>
                  <DrawerTrigger asChild><Button className="border-2 border-gray-400" variant={"secondary"}>View Details</Button></DrawerTrigger>
                  <DrawerContent>
                  <DrawerHeader>
                    <DrawerTitle>{property.seller}</DrawerTitle>
                    <DrawerDescription>{property._id}{JSON.stringify(user?.library)}</DrawerDescription>
                  </DrawerHeader>
                  <DrawerFooter>
                    <Button>Submit</Button>
                    <DrawerClose>
                      <Button variant="outline">Cancel</Button>
                    </DrawerClose>
                  </DrawerFooter>
                </DrawerContent>
              </Drawer>

            </CardFooter>

          </Card>

      ))
      
      }</div>
  )
}

export default YourFavourites