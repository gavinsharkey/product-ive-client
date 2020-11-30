import React from 'react'
import SubTasksContainer from './SubTasksContainer'
import TaskItem from './TaskItem'
import { useDispatch } from 'react-redux'
import {
  updateTaskCompleted,
  updateTaskName,
  deleteTask
} from '../../../actions/tasksActions'
import { Task } from '../../../types/tasksTypes'

import './ParentTaskItem.css'

interface ParentTaskItemProps {
  task: Task
  isSelected: boolean
  handleSelectTask: (id: number | null) => void
}

const ParentTaskItem: React.FC<ParentTaskItemProps> = ({isSelected, handleSelectTask, task}) => {
  const dispatch = useDispatch()

  const handleSelect = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation()

    isSelected ? handleSelectTask(null) : handleSelectTask(task.id)
  }

  const handleUpdateCompleted = () => {
    dispatch(updateTaskCompleted(task.id))
  }

  const handleUpdateName = (name: string) => {
    dispatch(updateTaskName(task.id, name))
  }

  const handleDelete = () => {
    dispatch(deleteTask(task.id))
  }

  return (
    <div className="parent-task-wrapper">
      <div onClick={handleSelect} className={`parent-task-item task-item ${isSelected ? 'selected' : ''}`}>
        <TaskItem
          task={task}
          handleUpdateCompleted={handleUpdateCompleted}
          handleUpdateName={handleUpdateName}
          handleDelete={handleDelete}
        />
      </div>
      { isSelected
        ? <SubTasksContainer parentTaskId={task.id} />
        : null
      }
    </div >
  )
}

export default ParentTaskItem
