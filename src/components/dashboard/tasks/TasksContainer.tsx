import React, { useState, useEffect } from 'react'
import { Typography, Divider } from 'antd'
import ThemedSkeleton from '../../ThemedSkeleton'
import TaskItem from './TaskItem'
import './TasksContainer.css'
import { Task } from '../../../types/tasksTypes'
import { fetchWithAuth } from '../../../concerns/fetchWithAuth'

const { Title } = Typography

interface TasksContainerProps {
  taskKey: React.Key
}

const TasksContainer: React.FC<TasksContainerProps> = (props) => {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    (async () => {
      setLoading(true)
      let data

      if (props.taskKey === 'all') {
        data = await fetchWithAuth(`http://localhost:3001/tasks`)
      } else {
        data = await fetchWithAuth(`http://localhost:3001/tasks?taskable_id=${props.taskKey}`)
      }

      setTasks(data)
      setLoading(false)
    })()
  }, [props.taskKey])


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
    return tasks.map((task: Task) => {
      return <TaskItem
        key={task.id}
        task={task}
        handleSetCompleted={handleSetCompleted}
        handleEditName={handleEditName}
        handleDeleteTask={handleDeleteTask}
      />
    })
  }

  return (
    <div className="tasks-container">
      <Title>All Tasks</Title>
      <Divider />
      { loading
        ? <ThemedSkeleton paragraph active />
        : (
          <div className="tasks">
            {renderedTasks()}
          </div>
        )
      }
    </div>
  )
}

export default TasksContainer