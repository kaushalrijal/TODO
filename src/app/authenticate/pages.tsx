"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
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
import { useForm } from "react-hook-form"

const loginSchema = z.object({
    username: z.string().min(3, {
        message: "Username must be at least 2 characters"
    }),
    email: z.string().email({
        message: "Invalid email address"
    }),
    password: z.string().min(6, {
        message: "Password must be at least 6 characters"
    })
})

const Auth = () => {
    const [currentPage, setCurrentPage] = useState('Login')
    return (
        <div className="w-screen h-screen p-2 flex flex-col gap-4 items-center justify-center">
            <h1>{currentPage}</h1>
            {currentPage == 'Login' ? login() : signup()}
            <a onClick={() => setCurrentPage(currentPage == 'Login' ? 'Signup' : 'Login')}>
                {currentPage == 'Login' ? 'Signup' : 'Login'} instead
            </a>
        </div>
    )
}

const login = () => {
    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            username: "",
            email: "",
            password: ""
        },
    })
    return (
        <div>
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
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit">Submit</Button>
                </form>
            </Form>
        </div>
    )
}

const signup = () => {
    //     const form = useForm<z.infer<typeof loginSchema>>({
    //     resolver: zodResolver(loginSchema),
    //     defaultValues: {
    //       username: "",
    //       email: "",
    //       password: ""
    //     },
    //   })
    return (
        <form className="flex flex-col">
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <button>Register</button>
        </form>
    )
}
const onSubmit = (values: z.infer<typeof loginSchema>) => {
    console.log(values)
}

export default Auth