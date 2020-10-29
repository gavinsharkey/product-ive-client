import React, { useState, useEffect } from 'react'
import { Typography, Divider } from 'antd'
import './TasksContent.css'
import { Task } from '../../../types/tasksTypes'
import { fetchWithAuth } from '../../../concerns/fetchWithAuth'
import { TaskGroup } from '../../../types/taskGroupTypes'
import TasksContainer from './TasksContainer'
import TasksForm from './TasksForm'

const { Title } = Typography

export type SelectedTaskIdType = number | null

interface TasksContentProps {
  taskGroup: TaskGroup | 'all' | undefined
  handleDeleteTaskGroup: (taskGroup: TaskGroup) => void
}

const TasksContent: React.FC<TasksContentProps> = ({ taskGroup, handleDeleteTaskGroup }) => {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedTaskId, setSelectedTaskId] = useState<SelectedTaskIdType>(null)

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

  const handleSelectTask = (id: SelectedTaskIdType): void => {
    setSelectedTaskId(id)
  }

  const handleAddTask = async (name: string) => {
    setLoading(true)

    let data: Task;
    if (taskGroup && taskGroup !== 'all') {
      data = await fetchWithAuth(`http://localhost:3001/tasks?taskable_id=${taskGroup.id}`, 'POST', {
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
      return <Title>All Tasks</Title>
    } else if (taskGroup) {
      return <Title>{taskGroup.name}</Title>
    }
  } 

  return (
    <div className="tasks-content">
      {renderedTitle()}
      <TasksForm
        loading={loading}
        selectedTaskGroup={taskGroup}
        handleAddTask={handleAddTask}
        handleDeleteTaskGroup={() => {
          return taskGroup && taskGroup !== 'all' ? handleDeleteTaskGroup(taskGroup) : null
        }}
      />
      <Divider />
      <TasksContainer
        tasks={tasks}
        loading={loading}
        selectedTaskId={selectedTaskId}
        handleSetCompleted={handleSetCompleted}
        handleDeleteTask={handleDeleteTask}
        handleEditName={handleEditName}
        handleSelectTask={handleSelectTask}
      />
    </div>
  )
}

export default TasksContent