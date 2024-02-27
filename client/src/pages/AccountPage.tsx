import { getLoggedInUser } from "@/api/Api"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User } from "@/models/user"
//import Account from "@/mycomponents/AccountPageComponents/Account"
import YourFavourites from "@/mycomponents/AccountPageComponents/YourFavourites"
import YourProperties from "@/mycomponents/AccountPageComponents/YourProperties"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

const AccountPage = () => {

  const [user, setUser] = useState<User | undefined>()

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

      <TabsContent value="account">{user?.username}</TabsContent>
      <TabsContent value="your properties"><YourProperties/></TabsContent>
      <TabsContent value="Favourites"><YourFavourites/></TabsContent>

    </Tabs>

</div>

  )
}

export default AccountPage