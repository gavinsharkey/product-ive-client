import React from 'react'
import TaskItem, { TaskItemProps } from './TaskItem'

const ChildTaskItem: React.FC<TaskItemProps> = (props) => {
  return (
    <div className="task-item">
      <TaskItem {...props} />
    </div>
  )
}

export default ChildTaskItem