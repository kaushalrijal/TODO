import React from 'react'
import { Button } from './ui/button'

const Header = () => {
  return (
    <div className='w-full flex justify-between items-center px-4 py-2'>
        <h1 className='font-extrabold text-4xl'>KODO</h1>
        <Button variant="destructive">Logout</Button>
    </div>
  )
}

export default Header