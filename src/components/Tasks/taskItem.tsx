import React, { useState } from 'react'
import { Checkbox } from '../ui/checkbox'
import { Label } from '../ui/label'
import { Pencil1Icon, TrashIcon } from '@radix-ui/react-icons'

const TaskItem = (props) => {
  const {title, description, priority, isComplete, _id} = props.taskData;
  const[checked, setChecked] = useState(isComplete)
  return (
    <div className='w-full border border-black p-2 my-2 rounded-md flex'>
      <Label htmlFor={_id} className='flex w-1/6 items-center justify-center'>
      <Checkbox
        id={_id}
        className='h-6 w-6'
        checked={checked}
        onCheckedChange={() => setChecked(!checked)}
      />
      </Label>
      <Label htmlFor={_id} className='w-3/6'>
      <h2 className='font-semibold'>{title}</h2>
      <h4 className='text-muted-foreground'>{description}</h4>
      </Label>
      <div className='w-2/6 flex gap-2 justify-end items-center'>
        <Pencil1Icon className='w-8 h-8 bg-black text-white rounded-full p-1.5 cursor-pointer' onClick={()=>{console.log("testing")}}/>
        <TrashIcon className='w-8 h-8 bg-black text-white rounded-full p-1.5 cursor-pointer' onClick={() => deleteItem(_id)}/>
      </div>
      
    </div >
  )
}

const deleteItem = async (id: any) => {
  const dlt = await fetch("http://localhost:5000/tasks/delete", {
    
      method : "POST",
      headers : {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({id})
    
  })

  const res = await dlt.json();
  console.log(res)
}

export default TaskItem