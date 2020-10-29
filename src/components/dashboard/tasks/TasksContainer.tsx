import React, { useState } from 'react'
import { Typography } from 'antd'
import { Task } from '../../../types/tasksTypes'
import { SelectedTaskIdType } from './TasksContent'
import ThemedSkeleton from '../../ThemedSkeleton'
import ParentTaskItem from './ParentTaskItem'
import './TasksContainer.css'

const { Title } = Typography

interface TasksContainerProps {
  tasks: Task[]
  loading: boolean
  selectedTaskId: SelectedTaskIdType
  handleSetCompleted: (id: number, completed: boolean) => void
  handleEditName: (id: number, value: string) => void
  handleDeleteTask: (id: number) => void
  handleSelectTask: (id: SelectedTaskIdType) => void
}

const TasksContainer: React.FC<TasksContainerProps> = ({ tasks, loading, selectedTaskId, handleSetCompleted, handleDeleteTask, handleEditName, handleSelectTask }) => {

  const renderedTasks = () => {
    if (tasks.length === 0) {
      return <Title type="secondary" level={3}>Hmm, there don't seem to be any tasks to show...</Title>
    }

    return tasks.map((task) => {
      const isSelected = (selectedTaskId === task.id)

      return <ParentTaskItem
        key={task.id}
        task={task}
        isSelected={isSelected}
        handleSetCompleted={handleSetCompleted}
        handleEditName={handleEditName}
        handleDeleteTask={handleDeleteTask}
        handleSelectTask={handleSelectTask}
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