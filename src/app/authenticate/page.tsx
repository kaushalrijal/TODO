"use client"

import { useState } from "react"


const page = () => {
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
    return (
        <form className="flex flex-col">
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <button>Login</button>
        </form>
    )
}
const signup = () => {
    return (
        <form className="flex flex-col">
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <button>Register</button>
        </form>
    )
}

export default page