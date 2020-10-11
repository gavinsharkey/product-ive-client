import React, { useState, useEffect } from 'react'
import { Typography, Divider } from 'antd'
import ThemedSkeleton from '../../ThemedSkeleton'
import TaskItem from './TaskItem'
import './TasksContainer.css'
import { Task } from '../../../types/tasksTypes'
import { fetchWithAuth } from '../../../concerns/fetchWithAuth'
import { TaskGroup } from '../../../types/taskGroupTypes'

const { Title } = Typography

interface TasksContainerProps {
  taskGroup: TaskGroup | 'all' | undefined
}

const TasksContainer: React.FC<TasksContainerProps> = ({ taskGroup }) => {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)

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

        setTasks(data)
        setLoading(false)
      }
    })()
  }, [taskGroup])


  const handleSetCompleted = (id: number, completed: boolean): void => {
    setTasks((prevTasks) => {
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
    setTasks((prevTasks) => {
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
    setTasks((prevTasks) => {
      return prevTasks.filter(task => task.id !== id)
    })
  }

  const renderedTasks = () => {
    return tasks.map((task) => {
      return <TaskItem
        key={task.id}
        task={task}
        handleSetCompleted={handleSetCompleted}
        handleEditName={handleEditName}
        handleDeleteTask={handleDeleteTask}
      />
    })
  }

  const renderedTitle = () => {
    if (taskGroup === 'all') {
      return 'All Tasks'
    } else if (taskGroup) {
      return taskGroup.name
    } else {
      return null
    }
  } 

  return (
    <div className="tasks-container">
      <Title>{renderedTitle()}</Title>
      <Divider />
      { loading
        ? <ThemedSkeleton paragraph active />
        : (
          <div className="tasks">
            { tasks.length > 0
            ? renderedTasks()
            : <Title type="secondary" level={3}>Hmm, there don't seem to be any tasks to show...</Title>
            }
          </div>
        )
      }
    </div>
  )
}

export default TasksContainer