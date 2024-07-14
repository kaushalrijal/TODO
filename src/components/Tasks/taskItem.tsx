import React from 'react'

const TaskItem = (props: { task: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined }) => {
  return (
    <div>{props.task}</div>
  )
}

export default TaskItem