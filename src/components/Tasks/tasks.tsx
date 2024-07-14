import React from 'react'
import TaskItem from './taskItem'

const Tasks = () => {
  return (
    <div className='p-4'>
        <h2 className='font-semibold'>Tasks</h2>
        <TaskItem task="task1"/>
        <TaskItem task="task2"/>
        <TaskItem task="task3"/>
    </div>
  )
}

export default Tasks