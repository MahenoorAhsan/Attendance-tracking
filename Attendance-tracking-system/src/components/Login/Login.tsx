import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
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
import styles from './Login.module.css'

// 1. Define schema outside component
const loginForm = z.object({
  username: z.string().min(1, {
    message: "Username is required",
  }),
  password: z.string().min(8, {
    message: "Password must have 8 characters",
  })
})

export default function Login() {
  // 2. Initialize form INSIDE the component
  const form = useForm({
    resolver: zodResolver(loginForm),
    defaultValues: {
      username: "",
      password: "",
    },
  })

  // 3. Move onSubmit inside component
  function onSubmit(values: z.infer<typeof loginForm>) {
    console.log(values)
  }

  return (
    <div className='min-h-screen flex items-center justify-center p-4 flex-col bg-blue-100'>
      <div className="card shadow-xl p-20 bg-white">
        <h2 className="text-6xl text-center ">RollCallPro</h2>
        <h6>Fastest AI-Enabled Attendance Tracker</h6>
        <img src="../../assets/logo.png" className="m-3 justify-center h-10" alt="Login visual" />
    
     
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
        </form>
      </Form>
      </div>
    </div>
  )
}
