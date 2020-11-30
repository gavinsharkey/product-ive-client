import React, { useState, useEffect } from 'react'
import { Typography } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { setSubTasks } from '../../../actions/tasksActions'
import SubTaskItem from './SubTaskItem'
import ThemedSkeleton from '../../ThemedSkeleton'
import { fetchWithAuth } from '../../../concerns/fetchWithAuth'
import { RootState } from '../../../reducers/rootReducer'
import { Task } from '../../../types/tasksTypes'
import './SubTasksContainer.css'

const { Title } = Typography

interface SubTasksContainerProps {
  parentTaskId: number
}

const SubTasksContainer: React.FC<SubTasksContainerProps> = ({ parentTaskId }) => {
  const tasks = useSelector((state: RootState) => {
    const parentTask = state.tasks.find(task => task.id === parentTaskId)
    return parentTask?.sub_tasks
  })

  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    (async () => {
      if (tasks && tasks.length === 0) {
        setLoading(true)
        const data = await fetchWithAuth<Task[]>(`http://localhost:3001/tasks/${parentTaskId}/sub_tasks`)

        dispatch(setSubTasks(data, parentTaskId))
      }
      
      setLoading(false)
    })()
  }, [parentTaskId])

  const renderedTasks = () => {
    if (tasks) {
      if (tasks.length === 0) {
        return <Title type="secondary" level={3}>Hmm, there don't seem to be any tasks to show...</Title>
      }

      return tasks.map((task) => {
        return <SubTaskItem
          key={task.id}
          task={task}
          parentTaskId={parentTaskId}
        />
      })
    }
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

export default SubTasksContainer