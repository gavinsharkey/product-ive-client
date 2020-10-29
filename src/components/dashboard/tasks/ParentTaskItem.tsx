import React from 'react'
import ChildTasksContainer from './ChildTasksContainer'
import TaskItem, { TaskItemProps } from './TaskItem'
import './ParentTaskItem.css'

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
    <div className="parent-task-wrapper">
      <div onClick={handleSelect} className={`parent-task-item task-item ${isSelected ? 'selected' : ''}`}>
        <TaskItem {...rest} />
      </div>
      { isSelected
        ? <ChildTasksContainer parentTaskId={rest.task.id} />
        : null
      }
    </div >
  )
}

export default ParentTaskItem
