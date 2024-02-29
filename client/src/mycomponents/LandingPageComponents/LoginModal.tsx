import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
  
import { Button } from "@/components/ui/button"
import {z} from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { login } from "@/api/Api"
import { User } from "@/models/user"


interface LoginModalProps {
  onSuccess: (user: User) => void;
}



  const signUpFormSchema = z.object({

   
    username: z.string().min(3, {
      message: "Username must be at least 3 characters",
    }),
    password: z.string().min(3, {
      message: "Password must be at least 3 characters",
    }),

  })

 
const LoginDialog = ({onSuccess}: LoginModalProps) => {

  const form = useForm<z.infer<typeof signUpFormSchema>>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  })


  
 async function onSubmit(values: z.infer<typeof signUpFormSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    
    try {
      

      const response = await login(values);
      onSuccess(response);

    } catch (error) {
      console.log(error)
    }

  }

  return (
<Dialog>
  <DialogTrigger><Button variant={"outline"}>Login</Button>
</DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Login</DialogTitle>
    </DialogHeader>

    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="username" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
     <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>password</FormLabel>
              <FormControl>
                <Input placeholder="password" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>

  </DialogContent>
</Dialog>

  )
}

export default LoginDialog