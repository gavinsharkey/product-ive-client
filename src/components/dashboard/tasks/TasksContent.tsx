import React, { useState, useEffect } from 'react'
import { Typography, Divider } from 'antd'
import { Task } from '../../../types/tasksTypes'
import { TaskGroup } from '../../../types/taskGroupTypes'
import { fetchWithAuth } from '../../../concerns/fetchWithAuth'
import { useDispatch } from 'react-redux'
import {
  setTasks,
  addTask,
} from '../../../actions/tasksActions'
import TasksContainer from './TasksContainer'
import TasksForm from './TasksForm'
import './TasksContent.css'

const { Title } = Typography

export type SelectedTaskIdType = number | null

interface TasksContentProps {
  taskGroup: TaskGroup | 'all' | undefined
  handleDeleteTaskGroup: (taskGroup: TaskGroup) => void
}

const TasksContent: React.FC<TasksContentProps> = ({ taskGroup, handleDeleteTaskGroup }) => {
  const [loading, setLoading] = useState(true)
  const [selectedTaskId, setSelectedTaskId] = useState<SelectedTaskIdType>(null)
  const dispatch = useDispatch()

  useEffect(() => {
    (async () => {
      if (taskGroup) {
        setLoading(true)
        let data

        if (taskGroup === 'all') {
          data = await fetchWithAuth(`http://localhost:3001/tasks`)
        } else {
          data = await fetchWithAuth(`http://localhost:3001/tasks?taskable_id=${taskGroup.id}`)
        }

        dispatch(setTasks(data))
        setLoading(false)
      }
    })()
  }, [taskGroup])

  const handleSelectTask = (id: SelectedTaskIdType): void => {
    setSelectedTaskId(id)
  }

  const renderedTitle = () => {
    if (taskGroup === 'all') {
      return <Title>All Tasks</Title>
    } else if (taskGroup) {
      return <Title>{taskGroup.name}</Title>
    }
  } 

  return (
    <div className="tasks-content">
      {renderedTitle()}
      <TasksForm
        selectedTaskGroup={taskGroup}
        selectedTaskId={selectedTaskId}
        handleDeleteTaskGroup={() => {
          return taskGroup && taskGroup !== 'all' ? handleDeleteTaskGroup(taskGroup) : null
        }}
      />
      <Divider />
      <TasksContainer
        loading={loading}
        selectedTaskId={selectedTaskId}
        handleSelectTask={handleSelectTask}
      />
    </div>
  )
}

export default TasksContent