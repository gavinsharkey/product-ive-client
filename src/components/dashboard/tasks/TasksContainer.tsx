import React from 'react'
import { Typography } from 'antd'
import { Task } from '../../../types/tasksTypes'
import ThemedSkeleton from '../../ThemedSkeleton'
import TaskItem from './TaskItem'
import './TasksContainer.css'

const { Title } = Typography

interface TasksConatinerProps {
  tasks: Task[]
  loading: boolean
  handleSetCompleted: (id: number, completed: boolean) => void
  handleEditName: (id: number, value: string) => void
  handleDeleteTask: (id: number) => void
}

const TasksContainer: React.FC<TasksConatinerProps> = ({ tasks, loading, handleSetCompleted, handleDeleteTask, handleEditName }) => {
  const renderedTasks = () => {
    if (tasks.length === 0) {
      return <Title type="secondary" level={3}>Hmm, there don't seem to be any tasks to show...</Title>
    }

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

  return (
    <div className="tasks-container">
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