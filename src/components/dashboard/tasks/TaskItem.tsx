import React from 'react'
import { Typography } from 'antd'
import { Task } from '../../../types/tasksTypes'
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons'
import './TaskItem.css'

interface TaskItemProps {
  task: Task
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {

  const CompletedStatusIcon = task.completed ? CheckCircleOutlined : CloseCircleOutlined

  return (
    <div className="task-item">
      <div className="task-item-content">
        <div className="task-item-completed">
          <CompletedStatusIcon />
        </div>
        <Typography.Text>{task.name}</Typography.Text>
      </div>
      <div className="task-item-data">
        <Typography.Text>{task.taskable.name}</Typography.Text>
      </div>
    </div>
  )
}

export default TaskItem