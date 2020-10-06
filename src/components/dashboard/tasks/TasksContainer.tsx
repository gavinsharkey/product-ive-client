import React from 'react'
import { Typography, Divider } from 'antd'
import './TasksContainer.css'

const { Title } = Typography

interface TasksContainerProps {
  taskKey: React.Key
}

const TasksContainer: React.FC<TasksContainerProps> = (props) => {
  return (
    <div className="tasks-container">
      <Title>All Tasks</Title>
      <Divider />
    </div>
  )
}

export default TasksContainer