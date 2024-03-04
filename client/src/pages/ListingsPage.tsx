import { getLoggedInUser } from "@/api/Api";
import { PropertyModel } from "@/models/Property";
import { User } from "@/models/user";
import ListingCard from "@/mycomponents/ListingPageComponents/ListingCard";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster";





const ListingsPage = () => {

  const [loggedInUser, setLoggedInUser] = useState<User | null>(null)

  const loaction = useLocation();

  const [listing, setListing] = useState<PropertyModel[]>([])

  const { toast } = useToast()
 
  

  useEffect(() => {

    async function loadUser() {

      try {
        const response= await getLoggedInUser()
        setLoggedInUser(response)
      } catch (error) {
        console.log(error)
      }
      
    }

    loadUser()

     setListing(loaction.state.properties)
    
  }, [])
  
  return (
    <div className="grid  md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5 py-6 px-4">
     {listing.map((property) => (
       <ListingCard key={property._id} property={property} user={loggedInUser} showToast={(mssg: string)=>{
        toast({
          title: mssg,
          description: "navigate to account page, to view the library",

          variant: "destructive",
        
        })
       }}/>
      ))}

      <Toaster/>
    </div>
  )
}

export default ListingsPage