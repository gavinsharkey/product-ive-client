import React from 'react'
import { Typography } from 'antd'
import { Task } from '../../../types/tasksTypes'
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons'
import './TaskItem.css'

interface TaskItemProps {
  task: Task
  handleSetCompleted: (id: number, completed: boolean) => void
  handleEditName: (id: number, value: string) => void
}

const TaskItem: React.FC<TaskItemProps> = ({ task, handleSetCompleted, handleEditName }) => {

  const CompletedStatusIcon = task.completed ? CheckCircleOutlined : CloseCircleOutlined
  const completedStyle = { background: task.completed ? '#1DA57A' : '#ddd' }

  return (
    <div className="task-item">
      <div
        className="task-item-completed"
        style={completedStyle}
        onClick={() => handleSetCompleted(task.id, task.completed)}
      >
        <CompletedStatusIcon />
      </div>
      <div className="task-item-content">
        <Typography.Text 
          editable={{
            autoSize: { maxRows: 2 },
            onChange: (value) => {
              if (value.length > 0) {
                handleEditName(task.id, value)
              }
            } 
          }}
        >
          {task.name}
        </Typography.Text>
      </div>
      <div className="task-item-data">
        <Typography.Text>{task.taskable.name}</Typography.Text>
      </div>
    </div>
  )
}

export default TaskItem