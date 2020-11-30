import React from 'react'
import { Typography } from 'antd'
import { useSelector } from 'react-redux'
import { RootState } from '../../../reducers/rootReducer'
import { SelectedTaskIdType } from './TasksContent'
import ThemedSkeleton from '../../ThemedSkeleton'
import ParentTaskItem from './ParentTaskItem'
import './TasksContainer.css'

const { Title } = Typography

interface TasksContainerProps {
  loading: boolean
  selectedTaskId: SelectedTaskIdType
  handleSelectTask: (id: SelectedTaskIdType) => void
}

const TasksContainer: React.FC<TasksContainerProps> = ({ loading, selectedTaskId, handleSelectTask }) => {
  const tasks = useSelector((state: RootState) => state.tasks)

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