import { getLoggedInUser, getPropertiesByCity, logout } from "@/api/Api"
import { Button } from "@/components/ui/button"
import { User } from "@/models/user"
import LoginDialog from "@/mycomponents/LandingPageComponents/LoginModal"
import SignUpDialog from "@/mycomponents/LandingPageComponents/SignUpDialog"
import { useEffect, useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { Input } from "@/components/ui/input"
import { useNavigate } from "react-router-dom"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"




const LandingPage = () => {

  const [loggedInUser, setLoggedInUser] = useState<User | null>(null)

  const {toast} = useToast()

  const [userCity, setUserCity] = useState<string>("")

  const navigate = useNavigate()
 

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

        const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`

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
          
          <Avatar className="cursor-pointer" onClick={() => navigate("/account")}>
              <AvatarImage src={loggedInUser.profilePic} />
              <AvatarFallback>{loggedInUser.username[0]}</AvatarFallback>
            </Avatar>


          <Button onClick={async() => {

            try {
              await logout()
              setLoggedInUser(null);

            } catch (error) {
              console.log(error)
            }
          
            }}>Logout</Button>
        
        </div>
      ) 
      
      : 
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


      <div>
       <Input value={userCity} onChange={(e) => setUserCity(e.target.value)}/>

       <Button onClick={async()=>{


       try {


        const response = await getPropertiesByCity(userCity);
        navigate("/listing", {state: {properties: response}})

       } catch (error) {
          const errorMessage = error;

          toast({
            title: errorMessage,
            variant: "destructive"
          })
       }
        }} variant={"outline"}>Search</Button>
       </div>
       <Toaster/>
    </div>
  )
}

export default LandingPage