
import {  createProperty, getLoggedInUser } from "@/api/Api";
import { User } from "@/models/user";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {z} from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useToast } from "@/components/ui/use-toast"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { getImageLinks } from "@/util/cloudinary";
import { Toaster } from "@/components/ui/toaster";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";


const uploadFormSchema = z.object({

  images2D: z.string().array().min(1, { message: "Please upload at least one image" }),
  panaromaImages: z.string().array().optional(),
  Type: z.string().min(1, { message: "Please select property type" }),
  buyType: z.string().min(1, { message: "Please select buy type" }),
  price: z.string().min(1, { message: "Please enter price" }),
  address: z.string().min(1, { message: "Please enter address" }),
  city: z.string().min(1, { message: "Please enter city" }),
  state: z.string().min(1, { message: "Please enter state" }),
  zip: z.string().min(1, { message: "Please enter zip" }),
  emi: z.string().min(1, { message: "Please enter emi" }),
  priceSqft: z.string().min(1, { message: "Please enter price per sqft" }),
  bed: z.string().min(1, { message: "Please enter number of bed" }),
  bath: z.string().min(1, { message: "Please enter number of bath" }),
  sqft: z.string().min(1, { message: "Please enter sqft" }),
  phone: z.string().min(1, { message: "Please enter phone" }),
  email: z.string().min(4, { message: "Please enter email" }),
  seller: z.string().min(1, { message: "Please enter seller" }),
  virtualTours: z.string().optional(),

})


const UploadProperty = () => {

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
 
  const [user, setUser] = useState<User | undefined>();

  const navigate = useNavigate();

  const { toast } = useToast()

  const form = useForm<z.infer<typeof uploadFormSchema>>({
    resolver: zodResolver(uploadFormSchema),
    defaultValues: {
       images2D: [],
       panaromaImages: [],
       Type: "",
       buyType: "",
       price: "",
       address: "",
       city: "",
       state: "",
       zip: "",
       emi: "",
       priceSqft: "",
       bed: "",
       bath: "",
       sqft: "",
       phone: "",
       email: user?.email || "",
       seller: user?.username || "",
       virtualTours: "",
    },
  })

  async function onSubmit(values: z.infer<typeof uploadFormSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    
    try {

   
 
      await createProperty(values);

      toast({
        title: "Success",
        description: "Property uploaded successfully",
      })
      

    } catch (error) {
      console.log(error)
    }

  }

  const handleImagesChange = async(event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
 
    if (files) {
      const imageUrls = await getImageLinks(Array.from(files));
      form.setValue('images2D', imageUrls);
    }
    
  };

  const handlePanaromaImagesChange = async(event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
   
    if (files) {
      const imageUrls = await getImageLinks(Array.from(files)); 
      form.setValue('panaromaImages', imageUrls);
    }
  };


  return (
    <>
    
    <Form {...form}>
     

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

        
      <Tabs>
        <TabsList defaultValue="showcase" className="w-[400px]">

          <TabsTrigger value="showcase">Showcase</TabsTrigger>

          <TabsTrigger value="details">Details</TabsTrigger>

          <TabsTrigger value="seller">Seller</TabsTrigger>

        </TabsList>

        <TabsContent value="showcase">

        <FormField
        control={form.control}
        name="images2D"
        render={() => (
          <FormItem>
            <FormLabel>2D Images of the property</FormLabel>

            <FormControl>
              <Input type="file" id="images2D"  multiple onChange={handleImagesChange}/>
            </FormControl>
            <FormMessage/>
          </FormItem>
          
        )}

        />

        <FormField
        control={form.control}
        name="panaromaImages"
        render={() => (
          <FormItem>
            <FormLabel>Panaroma Images of the property</FormLabel>

            <FormControl>
              <Input type="file" multiple id="panaromaImages" onChange={handlePanaromaImagesChange}/>
            </FormControl>

            <FormMessage/>
          </FormItem>
          
        )}

        />

       <FormField
          
          control={form.control}
          name="virtualTours"
          defaultValue={user?.email}
          render={({ field }) => (
            <FormItem>
              <FormLabel>virtualTour Link</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        

       </TabsContent>





       <TabsContent value="details">

      <FormField
        control={form.control}
        name="Type"
        render={({ field }) => (
          <FormItem>
        
            <FormControl>


            <Select onValueChange={field.onChange}>


                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="select property type" />
                </SelectTrigger>

                <SelectContent>
                    <SelectItem value="Residential">Residential</SelectItem>
                    <SelectItem value="Commercial">Commercial</SelectItem>
                    <SelectItem value="Apartment">Apartment</SelectItem>
                    <SelectItem value="Land">Land</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                </SelectContent>

            </Select>

            </FormControl>
            <FormMessage/>
          </FormItem>
          
        )}

        />


      <FormField
          control={form.control}
          name="buyType"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Are you looking to sell, rent, or lease?</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="Sale" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Sale
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="Lease" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Lease
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="Rent" />
                    </FormControl>
                    <FormLabel className="font-normal">Rent</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>

              )}
              />


        <FormField
          
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input placeholder="1.5cr" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />


       <FormField
          
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input placeholder="123 Main Street" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

       <FormField
          
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>City</FormLabel>
              <FormControl>
                <Input placeholder="Kanpur" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />


        <FormField
          
          control={form.control}
          name="state"
          render={({ field }) => (
            <FormItem>
              <FormLabel>State</FormLabel>
              <FormControl>
                <Input placeholder="uttar pradesh" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />


        <FormField
          
          control={form.control}
          name="zip"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Zip Code</FormLabel>
              <FormControl>
                <Input placeholder="530040" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

      <FormField
          
          control={form.control}
          name="emi"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Emi</FormLabel>
              <FormControl>
                <Input placeholder="2334/month" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />


      <FormField
          
          control={form.control}
          name="priceSqft"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price per sqft</FormLabel>
              <FormControl>
                <Input placeholder="2334/sqft" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />


<FormField
          
          control={form.control}
          name="bed"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bed</FormLabel>
              <FormControl>
                <Input placeholder="2" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />


<FormField
          
          control={form.control}
          name="bath"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bath</FormLabel>
              <FormControl>
                <Input placeholder="3" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />


<FormField
          
          control={form.control}
          name="sqft"
          render={({ field }) => (
            <FormItem>
              <FormLabel>sqft</FormLabel>
              <FormControl>
                <Input placeholder="200sqft" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

</TabsContent>


<TabsContent value="seller">

<FormField
          
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <Input placeholder="123456789" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />


<FormField
          
          control={form.control}
          name="email"
          defaultValue={user?.email}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder={user?.email}  {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />


<FormField
          
          control={form.control}
          name="seller"
          defaultValue={user?.username}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Seller</FormLabel>
              <FormControl>
                <Input placeholder={user?.username}  {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

<Button type="submit">Submit</Button>

</TabsContent>
       
          
          

          

       </Tabs>
      </form>

    

      </Form>
      

      <Toaster/>

      </>
  )
}




export default UploadProperty