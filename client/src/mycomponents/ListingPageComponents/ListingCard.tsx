import { addToLibrary, removeFromLibrary } from "@/api/Api"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer"
import { Switch } from "@/components/ui/switch"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { PropertyModel } from "@/models/Property"
import { User } from "@/models/user"
import { AspectRatio } from "@radix-ui/react-aspect-ratio"
import { useEffect, useState } from "react"



interface MyCardProps {
    property: PropertyModel;
    user: User | undefined,
}


const ListingCard = ({ property, user }: MyCardProps) => {

 const [toggleState, setToggleState] = useState(false);

  useEffect(() => {


    if(user?.library.includes(property._id)){
      setToggleState(true)
    }
   
  }, [user?.library, property._id])
  
 
  return (
       <Card>
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
                        <Switch disabled={!user} checked={toggleState} onCheckedChange={async(event)=>{

                              
                              if(event){
                               await addToLibrary(property)

                               setToggleState(true)

                               
                               
                              }else{
                                await removeFromLibrary(property._id)

                                setToggleState(false);

                           
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
                <CardDescription className="flex space-x-4 text-lg "><span className="font-extrabold">{property.bed}</span> bed <span className="font-extrabold">{property.bath}</span> bath <span className="font-extrabold">{property.sqft}</span></CardDescription>
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

  )
}

export default ListingCard