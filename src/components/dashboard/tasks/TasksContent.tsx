import React, { useState, useEffect, ReactText } from 'react'
import { Typography, Divider } from 'antd'
import './TasksContent.css'
import { Task } from '../../../types/tasksTypes'
import { fetchWithAuth } from '../../../concerns/fetchWithAuth'
import { TaskGroup } from '../../../types/taskGroupTypes'
import TasksContainer from './TasksContainer'
import TasksForm from './TasksForm'

const { Title } = Typography

interface TasksContentProps {
  taskGroup: TaskGroup | 'all' | undefined
}

const TasksContent: React.FC<TasksContentProps> = ({ taskGroup }) => {
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

  const handleAddTask = async (name: string, taskGroupId?: ReactText) => {
    setLoading(true)

    let data: Task;
    if (taskGroupId) {
      data = await fetchWithAuth(`http://localhost:3001/tasks?taskable_id=${taskGroupId}`, 'POST', {
        task: { name }
      })
    } else {
      data = await fetchWithAuth(`http://localhost:3001/tasks`, 'POST', {
        task: { name }
      })
    }

    setTasks(prevTasks => {
      return [data, ...prevTasks]
    })
    setLoading(false)
  }


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
      <TasksForm
        loading={loading}
        handleAddTask={(name: string) => {
          return taskGroup && taskGroup !== 'all' ? handleAddTask(name, taskGroup.id) : handleAddTask(name)
        }} />
      <Divider />
      <TasksContainer
        tasks={tasks}
        loading={loading}
        handleSetCompleted={handleSetCompleted}
        handleDeleteTask={handleDeleteTask}
        handleEditName={handleEditName}
      />
    </div>
  )
}

export default TasksContent