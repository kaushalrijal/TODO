import React from 'react'
import { Button } from './ui/button'

const Header = () => {
  return (
    <div className='w-full flex justify-between items-center px-4 py-2'>
        <h1 className='font-extrabold text-4xl'>KODO</h1>
        <Button variant="destructive" onClick={logout}>Logout</Button>
    </div>
  )
}

const logout = async () => {
  const reponse = await fetch("http://localhost:5000/user/logout", {
    credentials: "include"
  });
  const result = await reponse.json();
  console.log(result)
}

export default Header