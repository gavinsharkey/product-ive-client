import React from 'react'
import TaskItem, { TaskItemProps } from './TaskItem'

interface ParentTaskItemProps extends TaskItemProps {
  isSelected: boolean
  handleSelectTask: (id: number | null) => void
}

const ParentTaskItem: React.FC<ParentTaskItemProps> = ({isSelected, handleSelectTask, ...rest}) => {
  const handleSelect = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation()

    isSelected ? handleSelectTask(null) : handleSelectTask(rest.task.id)
  }

  return (
    <div onClick={handleSelect} className={`task-item${isSelected ? ' selected' : ''}`}>
      <TaskItem {...rest} />
    </div>
  )
}

export default ParentTaskItem
