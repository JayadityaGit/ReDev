import { getLoggedInUser } from "@/api/Api";
import { PropertyModel } from "@/models/Property";
import { User } from "@/models/user";
import ListingCard from "@/mycomponents/ListingPageComponents/ListingCard";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";



const ListingsPage = () => {

  const [loggedInUser, setLoggedInUser] = useState<User | null>(null)

  const loaction = useLocation();

  const [listing, setListing] = useState<PropertyModel[]>([])
 
  

  useEffect(() => {

    async function loadUser() {

      try {
        const response= await getLoggedInUser()
        console.log(response)
        setLoggedInUser(response)
      } catch (error) {
        console.log(error)
      }
      
    }

    loadUser()

     setListing(loaction.state.properties)
    
  }, [])
  
  return (
    <div>
     {listing.map((property) => (
       <ListingCard key={property._id} property={property} user={loggedInUser}/>
      ))}
    </div>
  )
}

export default ListingsPage