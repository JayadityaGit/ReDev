import { addToLibrary, removeFromLibrary } from "@/api/Api"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import { Switch } from "@/components/ui/switch"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { PropertyModel } from "@/models/Property"
import { User } from "@/models/user"
import { AspectRatio } from "@radix-ui/react-aspect-ratio"
import { useEffect, useState } from "react"
import { Drawer } from "vaul"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import Details from "./Details"
import Panaroma from "./Panaroma"
import VirtualTour from "./VirtualTour"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import Contact from "./Contact"
import VideoTour from "./VideoTour"






interface MyCardProps {
    property: PropertyModel;
    user: User | undefined,
    showToast: (mssg: string) => void
}


const ListingCard = ({ property, user, showToast }: MyCardProps) => {

 const [toggleState, setToggleState] = useState(false);

  useEffect(() => {


    if(user?.library.includes(property._id)){
      setToggleState(true)
    }
   
  }, [user?.library, property._id])
  
 
  return (
       <Card className="rounded-3xl">
              <Carousel className="rounded-3xl">
                <CarouselContent className="roundex-3xl">

                  {
                    property.images2D.map((image) => (
                        <CarouselItem>
                            <AspectRatio ratio={16 / 9}>
                            <img src={image} alt="propertyImage" className="rounded-t-3xl object-cover w-full" />
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


                               showToast("Added to library")

                               
                               
                              }else{
                                await removeFromLibrary(property._id)

                                setToggleState(false);

                                showToast("Removed from library")

                           
                              }
                            

                        }} className="border-gray-400 border-double" />
                        </TooltipTrigger>
                        <TooltipContent>
                        <p>Add to library</p>
                      </TooltipContent>
                        </Tooltip>
                        </TooltipProvider>
                        </CardTitle>


                <CardDescription>{property.buyType}</CardDescription>
                <CardDescription className="flex space-x-4 text-lg "><span className="font-extrabold">{property.bed}</span> bed <span className="font-extrabold">{property.bath}</span> bath <span className="font-extrabold">{property.sqft}</span> sqft</CardDescription>
                <CardDescription >{property.address}</CardDescription>
            </CardHeader>


            <CardFooter className="px-4 flex justify-between">
                
            <Drawer.Root >
                <Drawer.Trigger asChild>
                  <Button className="rounded-full border-black" variant="outline">View Detials</Button>
                </Drawer.Trigger>
                <Drawer.Portal>
                  <Drawer.Overlay className="fixed inset-0 bg-black/40" />
                    <Drawer.Content className="bg-zinc-100 flex flex-col rounded-t-[10px] h-[96%] mt-24 fixed bottom-0 left-0 right-0">
                      <div className="p-4 bg-white rounded-t-[10px] flex-1">
                        <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-zinc-300 mb-8" />
                        <div className="max-w-md mx-auto">
                         
                       

                        <Tabs defaultValue="details" data-vaul-no-drag className="">

                          <TabsList>
                            <TabsTrigger value="details">Details</TabsTrigger>
                            <TabsTrigger value="panaroma">Panaroma</TabsTrigger>
                            <TabsTrigger value="video">Video Tour</TabsTrigger>
                            <TabsTrigger value="virtual">Virtual Tour</TabsTrigger>
                            <TabsTrigger value="contact">Contact</TabsTrigger>
                          </TabsList>


                          <TabsContent value="details"><Details property={property}/></TabsContent>
                         
                          <TabsContent  value="panaroma">

                            <Dialog>

                            <DialogTrigger><Button>Open Panaroma Viewer</Button></DialogTrigger>

                            <DialogContent>

                            <DialogTitle>scroll to see panaroma</DialogTitle>

                            <Panaroma panaromaImages={property.panaromaImages}/>
                            
                            </DialogContent>
                            
                            
                            
                            </Dialog>
                            
                            </TabsContent>


                          <TabsContent value="video"><VideoTour url={property.videoTours}/></TabsContent>
                          <TabsContent value="virtual"><VirtualTour url={property.virtualTours}/></TabsContent>
                          <TabsContent value="contact"><Contact property={property}/></TabsContent>
                          

                        </Tabs>

                        

                        
                        </div>
                      </div>
                      
                    </Drawer.Content>
                </Drawer.Portal>
            </Drawer.Root>

            <div className="flex space-x-2">


             <Badge className="rounded-full bg-violet-500">{property.Type}</Badge>
            <Badge className="rounded-full bg-blue-500">new</Badge>
            {property.is3D && <Badge className="rounded-full bg-lime-300 text-black">3D</Badge>}

            </div>


            </CardFooter>

          </Card>

  )
}

export default ListingCard