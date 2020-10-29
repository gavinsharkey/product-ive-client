import React, { useState, useEffect } from 'react'
import { Typography } from 'antd'
import ChildTaskItem from './ChildTaskItem'
import ThemedSkeleton from '../../ThemedSkeleton'
import { fetchWithAuth } from '../../../concerns/fetchWithAuth'
import { Task } from '../../../types/tasksTypes'
import './ChildTasksContainer.css'

const { Title } = Typography

interface ChildTasksContainerProps {
  parentTaskId: number
}

const ChildTasksContainer: React.FC<ChildTasksContainerProps> = ({ parentTaskId }) => {
  const [loading, setLoading] = useState(true)
  const [childTasks, setChildTasks] = useState<Task[]>([])

  useEffect(() => {
    (async () => {
      setLoading(true)
      const data = await fetchWithAuth<Task[]>(`http://localhost:3001/tasks/${parentTaskId}/sub_tasks`)

      setChildTasks(data)
      setLoading(false)
    })()
  }, [parentTaskId])

  const handleSetCompleted = (id: number, completed: boolean): void => {
    setChildTasks((prevTasks) => {
      return prevTasks.map(task => {
        if (task.id === id) {
          return { ...task, completed: !completed }
        } else {
          return task
        }
      })
    })
  }

  const handleEditName = (id: number, value: string): void => {
    setChildTasks((prevTasks) => {
      return prevTasks.map((task) => {
        if (task.id === id) {
          return { ...task, name: value }
        } else {
          return task
        }
      })
    })
  }

  const handleDeleteTask = (id: number): void => {
    setChildTasks((prevTasks) => {
      return prevTasks.filter(task => task.id !== id)
    })
  }

  const renderedTasks = () => {
    if (childTasks.length === 0) {
      return <Title type="secondary" level={3}>Hmm, there don't seem to be any tasks to show...</Title>
    }

    return childTasks.map((task) => {
      return <ChildTaskItem
        key={task.id}
        task={task}
        handleSetCompleted={handleSetCompleted}
        handleEditName={handleEditName}
        handleDeleteTask={handleDeleteTask}
      />
    })
  }

  return (
    <div className="child-tasks-container">
      { loading
        ? <ThemedSkeleton active />
        : renderedTasks()
      }
    </div>
  )
}

export default ChildTasksContainer