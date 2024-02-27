
import { getLoggedInUser, logout } from "@/api/Api"
import { Button } from "@/components/ui/button"
import { User } from "@/models/user"
import LoginDialog from "@/mycomponents/ListingPageComponents/LoginModal"
import SignUpDialog from "@/mycomponents/ListingPageComponents/SignUpDialog"
import { useEffect, useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"





const LandingPage = () => {

  const [loggedInUser, setLoggedInUser] = useState<User | null>(null)

  const {toast} = useToast()

  const [userCity, setUserCity] = useState<string>("")

 

  useEffect (() => {
    async function loadUser() {

      try {
        const response= await getLoggedInUser()
        setLoggedInUser(response)
      } catch (error) {
        console.log(error)
      }
      
    }


     function loadUserLocation() {
      navigator.geolocation.getCurrentPosition(async(position) => {
        const {latitude, longitude} =position.coords;

        const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`

        const response = await fetch(url);

        const data = await response.json();

        setUserCity(data.address.city)



      })
    }


    loadUser()
    loadUserLocation()
  }, [])

  return (
    <div>

 
        
      {

      loggedInUser ? (
        <div>
          
          Welcome {loggedInUser.username}  

          <Button onClick={async() => {

            try {
              await logout()

              setLoggedInUser(null);


            } catch (error) {
              console.log(error)
            }
            
          
            }}>Logout</Button>
        
        </div>

        
      ) : 

      <>

      <SignUpDialog 
      
      onSuccess={  

      (user) => setLoggedInUser(user)
    } 
      showToast={
        (error)=>{
        toast({
        title: error,
        variant: "destructive"
      })
      }
    }
        
        />


      <LoginDialog onSuccess={(user) => {setLoggedInUser(user)}}/>

      </>

       }


         

       <Toaster/>
    </div>
  )
}

export default LandingPage