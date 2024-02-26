import { getLoggedInUser, logout } from "@/api/Api"
import { Button } from "@/components/ui/button"
import { User } from "@/models/user"
import LoginDialog from "@/mycomponents/ListingPageComponents/LoginModal"
import SignUpDialog from "@/mycomponents/ListingPageComponents/SignUpDialog"
import { useEffect, useState } from "react"



const LandingPage = () => {

  const [loggedInUser, setLoggedInUser] = useState<User | null>(null)

  useEffect (() => {
    async function loadUser() {

      try {
        const response= await getLoggedInUser()
        setLoggedInUser(response)
      } catch (error) {
        console.log(error)
      }
      
    }

    loadUser()
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

      <SignUpDialog onSuccess={(user) => setLoggedInUser(user)}/>
      <LoginDialog onSuccess={(user) => {setLoggedInUser(user)}}/>

      </>

       }
    </div>
  )
}

export default LandingPage