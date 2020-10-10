import React, { useRef } from 'react'
import { Typography, Popconfirm } from 'antd'
import { fetchWithAuth } from '../../../concerns/fetchWithAuth'
import { debounce } from '../../../concerns/debounce'
import { Task } from '../../../types/tasksTypes'
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons'
import './TaskItem.css'

const { Title, Text } = Typography

interface TaskItemProps {
  task: Task
  handleSetCompleted: (id: number, completed: boolean) => void
  handleEditName: (id: number, value: string) => void
  handleDeleteTask: (id: number) => void
}

const TaskItem: React.FC<TaskItemProps> = ({ task, handleSetCompleted, handleEditName, handleDeleteTask }) => {
  // useRef allows debounce to maintain its current timeout status through rerenders
  const updateTaskCompleted = useRef(debounce((completed: boolean) => {
    return fetchWithAuth(`http://localhost:3001/tasks/${task.id}`, 'PATCH', {
      task: { completed: !completed }
    })
  }, 3000))

  const updateTaskName = useRef(debounce((value: string) => {
    return fetchWithAuth(`http://localhost:3001/tasks/${task.id}`, 'PATCH', {
      task: { name: value }
    })
  }, 3000))

  const CompletedStatusIcon = task.completed ? CheckCircleOutlined : CloseCircleOutlined
  const completedStyle = { background: task.completed ? '#1DA57A' : '#ddd' }

  return (
    <div className="task-item">
      <div className="task-item-left">
        <div
          className="task-item-edge"
          style={completedStyle}
          onClick={() => {
            handleSetCompleted(task.id, task.completed)
            updateTaskCompleted.current(task.completed)
          }}
        >
          <CompletedStatusIcon />
        </div>
        <div className="task-item-content">
          <Title
            level={5}
            editable={{
              autoSize: { maxRows: 2 },
              onChange: (value) => {
                if (value.length > 0) {
                  handleEditName(task.id, value)
                  updateTaskName.current(value)
                }
              }
            }}
          >
            {task.name}
          </Title>
          <Text>{task.taskable_type === 'TaskGroup' ? task.taskable.name : 'Ungrouped'}</Text>
        </div>
      </div>
      <div className="task-item-right">
        <Popconfirm
          title="Are you sure you want to delete this task?"
          onConfirm={() => {
            handleDeleteTask(task.id)
          }}
          placement="left"

        >
          <div title="Delete Task" className="task-item-edge danger">
            <CloseCircleOutlined />
          </div>
        </Popconfirm>
      </div>
    </div>
  )
}

export default TaskItem