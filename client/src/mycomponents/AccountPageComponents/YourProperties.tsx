import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"


import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"


import { AspectRatio } from "@/components/ui/aspect-ratio"

import { Switch } from "@/components/ui/switch"



import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import PropertyDetails from "../ListingPageComponents/PropertyDetails"





const YourProperties = () => {

  const navigate = useNavigate()

  return (
    <div>
       <Button onClick={()=>{navigate("/upload")}} > Upload Property</Button>


        <Card>

              <Carousel>

                <CarouselContent>

                  <CarouselItem>

                    <AspectRatio ratio={16 / 9}>
                    <img src="https://images.pexels.com/photos/259600/pexels-photo-259600.jpeg?cs=srgb&dl=architecture-facade-house-259600.jpg&fm=jpg"  className="rounded-t-lg object-cover" />
                    </AspectRatio>

                  </CarouselItem>



                </CarouselContent>
                
              </Carousel>

            <CardHeader className="p-4">
                
                <CardTitle className="flex justify-between items-center">

                  <p className="text-2xl font-bold ">$499,000</p> 

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Switch className="border-gray-400 border-double" />
                        </TooltipTrigger>
                        <TooltipContent>
                        <p>Add to library</p>
                      </TooltipContent>
                        </Tooltip>
                        </TooltipProvider>
                        </CardTitle>


                <CardDescription >Rent</CardDescription>
                
                <CardDescription className="flex space-x-4 text-lg "><span className="font-extrabold">3</span> bed <span className="font-extrabold">2</span> bath <span className="font-extrabold">2,690</span> sqft</CardDescription>
                <CardDescription >3705 Haines St, San Diego, CA 92109</CardDescription>
            </CardHeader>


            <CardFooter className="px-4">

              <Drawer shouldScaleBackground>
                  <DrawerTrigger asChild><Button className="border-2 border-gray-400" variant={"secondary"}>View Details</Button></DrawerTrigger>

                  <DrawerContent>
                  <DrawerHeader>
                    <DrawerTitle>Are you absolutely sure?</DrawerTitle>
                    <DrawerDescription>This action cannot be undone.</DrawerDescription>
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

 
    </div>
  )
}

export default YourProperties