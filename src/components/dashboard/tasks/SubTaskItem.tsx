import React from 'react'
import TaskItem from './TaskItem'
import { useDispatch } from 'react-redux'
import {
  updateSubTaskCompleted,
  updateSubTaskName,
  deleteSubTask
} from '../../../actions/tasksActions'
import { Task } from '../../../types/tasksTypes'

interface SubTaskItemProps {
  task: Task
  parentTaskId: number
}

const SubTaskItem: React.FC<SubTaskItemProps> = ({ task, parentTaskId }) => {
  const dispatch = useDispatch()

  const handleUpdateCompleted = () => {
    dispatch(updateSubTaskCompleted(task.id, parentTaskId))
  }

  const handleUpdateName = (name: string) => {
    dispatch(updateSubTaskName(task.id, name, parentTaskId))
  }

  const handleDelete = () => {
    dispatch(deleteSubTask(task.id, parentTaskId))
  }

  return (
    <div className="task-item">
      <TaskItem
        task={task}
        handleUpdateCompleted={handleUpdateCompleted}
        handleUpdateName={handleUpdateName}
        handleDelete={handleDelete}
      />
    </div>
  )
}

export default SubTaskItem