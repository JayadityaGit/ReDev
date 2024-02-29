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
import PropertyDetails from "../LandingPageComponents/PropertyDetails"
import { useEffect, useState } from "react"
import { PropertyModel } from "@/models/Property"
import { deleteOwnedProperty, getOwnedProperties } from "@/api/Api"

import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"


import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import EditProperty from "./EditProperty"




const YourProperties = () => {

  const navigate = useNavigate()

  const [properties, setProperties] = useState<PropertyModel[]>([])


  useEffect(() => {

    async function loadOwned() {

      try {
        
      const response = await getOwnedProperties();
      setProperties(response);
      } catch (error) {
        console.log(error)
      }

      
    }


    loadOwned();
    
  }, [])


  return (
    <div>
       <Button onClick={()=>{navigate("/upload")}} > Upload Property</Button>


         {
          properties.map((property) => {
            return (
              <Card>

              <Carousel>

                <CarouselContent>


                   {
                    property.images2D.map((image) => (
                      
                        <CarouselItem>
                          <AspectRatio ratio={16 / 9}>
                            <img src={image} alt="property image" className="rounded-t-lg object-cover w-full"/>
                          </AspectRatio>
                        </CarouselItem>
                      
                    ))
                   }
                 



                </CarouselContent>
                
              </Carousel>

            <CardHeader className="p-4">
                
                <CardTitle className="flex justify-between items-center">

                  <p className="text-2xl font-bold ">{property.price}</p> 


                  <div className="flex text-2xl space-x-2 cursor-pointer">

                    <Dialog>
                      <DialogTrigger><FaRegEdit/></DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Edit Property</DialogTitle>

                          
                           
                          <EditProperty property={property}/>

                          
                          
                        </DialogHeader>
                      </DialogContent>
                    </Dialog>

                
                    <AlertDialog>
                      <AlertDialogTrigger><RiDeleteBinLine /></AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete your property
                            and remove your data from our servers.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={async()=>{

                               try {
                                const deletedProperty = await deleteOwnedProperty(property._id);
                                setProperties(prevProperties => prevProperties.filter(property => property._id !== deletedProperty._id));
                               } catch (error) {
                                console.log(error)
                               }

                          }}>Continue</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>

                  </div>

                  
                   </CardTitle>







                <CardDescription >{property.Type}</CardDescription>
                
                <CardDescription className="flex space-x-4 text-lg "><span className="font-extrabold">{property.bed}</span> bed <span className="font-extrabold">{property.bath}</span> bath <span className="font-extrabold">{property.sqft}</span> sqft</CardDescription>
                <CardDescription >{property.address}</CardDescription>
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
            )
          })
         }

 
    </div>
  )
}

export default YourProperties