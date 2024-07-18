"use client"

import React, { useState } from "react";
import { Toaster } from "@/components/ui/toaster"
import { useRouter } from "next/navigation";

import { z } from "zod";


import { Input } from "@/components/ui/input";

import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import Router from "next/router";

const loginSchema = z.object({
    email: z.string().email({
        message: "Invalid email address"
    }),
    password: z.string().min(6, {
        message: "Password must be at least 6 characters"
    })
});

const registerSchema = z.object({
    username: z.string().min(3, {
        message: "Username must be at least 3 characters"
    }),
    email: z.string().email({
        message: "Invalid email address"
    }),
    password: z.string().min(6, {
        message: "Password must be at least 6 characters"
    })
});

const router = useRouter();

// const pageContext = createContext<{setCurrentPage: (newState: string) => void}>({ setCurrentPage: (newState: string) => {} })

const Auth = () => {
    const [currentPage, setCurrentPage] = useState('Login')
    return (
        // <pageContext.Provider value={{ setCurrentPage }}>
        <div className="w-screen h-screen p-2 flex flex-col items-center justify-center">
            <div className="flex flex-col gap-4 border-solid border-2 border-black p-8">
                <h1 className="font-bold underline">{currentPage}</h1>
                {currentPage == 'Login' ? login() : signup(setCurrentPage)}
                <a onClick={() => setCurrentPage(currentPage == 'Login' ? 'Signup' : 'Login')} className="text-sm cursor-pointer text-muted-foreground">
                    {currentPage == 'Login' ? 'Signup' : 'Login'} instead..
                </a>
            </div>
            <Toaster />
        </div>
        // </pageContext.Provider>
    )
}


const login = () => {
    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit((data, event) => {
                loginUser(data);
                form.reset();
            })} className="space-y-4">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="">email</FormLabel>
                            <FormControl>
                                <Input type="email" placeholder="email@example.com" {...field} required />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="">password</FormLabel>
                            <FormControl>
                                <Input type="password" placeholder="Password" {...field} required />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" className="w-full">Login</Button>
            </form>
        </Form>
    );
};

const signup = (setCurrentPage: (newState: string) => void) => {
    // const { setCurrentPage } = useContext(pageContext);
    const form = useForm<z.infer<typeof registerSchema>>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit((data, event) => {
                registerUser(data, setCurrentPage);
                form.reset();
            })} className="space-y-4">
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="">Username</FormLabel>
                            <FormControl>
                                <Input placeholder="username" {...field} required />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="">email</FormLabel>
                            <FormControl>
                                <Input type="email" placeholder="email@example.com" {...field} required />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="">Password</FormLabel>
                            <FormControl>
                                <Input type="password" placeholder="Password" {...field} required />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" className="w-full">Register</Button>
            </form>
        </Form>
    );
};

const loginUser = async (values: z.infer<typeof loginSchema>) => {
    const { email, password } = values;
    const response = await fetch("http://localhost:5000/user/login", {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password })
    });

    try {
        const result = await response.json();
        console.log(result);
        toast({
            title: result.success ? "Success" : "Error",
            variant: result.success ? "default" : "destructive",
            description: result.message
        })
        router.push('/dashboard')
    } catch (err) {
        console.log(err);
    }
};

const registerUser = async (values: z.infer<typeof registerSchema>, setCurrentPage: (newState: string) => void) => {
    const { username, email, password } = values;
    const response = await fetch("http://localhost:5000/user/signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password })
    });

    try {
        const result = await response.json();
        console.log(result);
        setCurrentPage('Login')
        toast(
            {
                title: "Success", description: "Account created successfully"}
        );
    } catch (err) {
        console.log(err);
    }
};

export default Auth;
