import { changeProfilePicture, getLoggedInUser } from "@/api/Api"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User } from "@/models/user"
//import Account from "@/mycomponents/AccountPageComponents/Account"
import YourFavourites from "@/mycomponents/AccountPageComponents/YourFavourites"
import YourProperties from "@/mycomponents/AccountPageComponents/YourProperties"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { getImageLinks } from "@/util/cloudinary"
import { ReloadIcon } from "@radix-ui/react-icons"


const AccountPage = () => {

  const [user, setUser] = useState<User | undefined>()

  const [buttonState, setButtonState] = useState(true)

  const navigate = useNavigate();

  useEffect(() => {
    async function loadUser() {

      try {
        const response = await getLoggedInUser();

        if (!response) {
          navigate("/");
        }

        setUser(response)
      } catch (error) {
        
        console.log(error);

        navigate("/")

        
      }
      
    }

    loadUser()
  }, [])

  

  return (

    <div>

    <Tabs defaultValue="account" className="w-[400px]">
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="your properties">Your Properties</TabsTrigger>
          <TabsTrigger value="Favourites">Library</TabsTrigger>
        </TabsList>

      <TabsContent value="account">

      <Dialog>
          <DialogTrigger>

          <Avatar onClick={()=>{}}>
            <AvatarImage src={user?.profilePic} />
            <AvatarFallback>{user?.username[0]}</AvatarFallback>
          </Avatar>

          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>Change Profile</DialogTitle>
              <DialogDescription>
                  <Input type="file" onChange={async(event) => {
                    const files = event.target.files;

                    let imageUrls = [];

                    if (files) {
                       imageUrls = await getImageLinks(Array.from(files)); 
                    }

                    const response = await changeProfilePicture(imageUrls[0]);

                    setButtonState(false)

                    console.log(response)

                                      
                  }} />
              </DialogDescription>
            </DialogHeader>

            <DialogFooter>
              <Button type="submit" disabled={buttonState}>{buttonState && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}Confirm</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>


      </TabsContent>
      <TabsContent value="your properties"><YourProperties/></TabsContent>
      <TabsContent value="Favourites"><YourFavourites user ={user}/></TabsContent>

    </Tabs>

</div>

  )
}

export default AccountPage