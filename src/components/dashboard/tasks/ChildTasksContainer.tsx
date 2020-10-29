import React, { useState, useEffect } from 'react'
// import ChildTaskItem from './ChildTaskItem'
import { Task } from '../../../types/tasksTypes'
import './ChildTasksContainer.css'

interface ChildTasksContainerProps {
  parentTaskId: number
}

const ChildTasksContainer: React.FC<ChildTasksContainerProps> = ({ parentTaskId }) => {
  const [loading, setLoading] = useState(true)
  const [childTasks, setChildTasks] = useState<Task[]>([])

  return (
    <div className="child-tasks-container">

    </div>
  )
}

export default ChildTasksContainer