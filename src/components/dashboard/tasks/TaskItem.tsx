import React, { useRef } from 'react'
import { Typography, Popconfirm } from 'antd'
import { fetchWithAuth } from '../../../concerns/fetchWithAuth'
import { debounce } from 'debounce'
import { Task } from '../../../types/tasksTypes'
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons'
import './TaskItem.less'

const { Title, Text } = Typography

export interface TaskItemProps {
  task: Task
  handleUpdateCompleted: () => void
  handleUpdateName: (value: string) => void
  handleDelete: () => void
}

const TaskItem: React.FC<TaskItemProps> = ({ task, handleUpdateCompleted, handleUpdateName, handleDelete }) => {
  // useRef allows debounce to maintain its current timeout status through rerenders
  const updateTaskCompleted = useRef(debounce((completed: boolean) => {
    return fetchWithAuth(`http://localhost:3001/tasks/${task.id}`, 'PATCH', {
      task: { completed: !completed }
    })
  }, 3000, true))

  const updateTaskName = useRef(debounce((value: string) => {
    return fetchWithAuth(`http://localhost:3001/tasks/${task.id}`, 'PATCH', {
      task: { name: value }
    })
  }, 3000, true))

  const deleteTask = () => {
    return fetchWithAuth(`http://localhost:3001/tasks/${task.id}`, 'DELETE')
  }

  const CompletedStatusIcon = task.completed ? CheckCircleOutlined : CloseCircleOutlined
  const completedStyle = { background: task.completed ? '#1DA57A' : '#ddd' }

  return (
    <>
      <div className="task-item-left">
        <div
          className="task-item-edge"
          style={completedStyle}
          onClick={event => {
            event.stopPropagation()
            handleUpdateCompleted()
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
                  handleUpdateName(value)
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
          onCancel={e => e?.stopPropagation()}
          onConfirm={e => {
            e?.stopPropagation()
            deleteTask()
            handleDelete()
          }}
          placement="left"

        >
          <div onClick={e => e.stopPropagation()} title="Delete Task" className="task-item-edge danger">
            <CloseCircleOutlined />
          </div>
        </Popconfirm>
      </div>
    </>
  )
}

export default TaskItem