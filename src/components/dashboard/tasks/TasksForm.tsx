import React, { useState } from 'react'
import { Input, Button, Popconfirm } from 'antd'
import { TaskGroup } from '../../../types/taskGroupTypes'
import './TasksForm.css'

interface TasksFormProps {
  loading: boolean
  selectedTaskGroup: 'all' | TaskGroup | undefined
  handleAddTask: (name: string) => void
  handleDeleteTaskGroup: () => void
}

const TasksForm: React.FC<TasksFormProps> = ({ loading, selectedTaskGroup, handleAddTask, handleDeleteTaskGroup }) => {
  const [value, setValue] = useState('')

  const addTask = () => {
    if (value.length > 0) {
      setValue('')
      handleAddTask(value)
    }
  }

  return (
    <div className="tasks-form">
      <div>
        <Input
          value={value}
          onChange={e => setValue(e.target.value)}
          onPressEnter={addTask}
          placeholder="Enter new task name"
        />
        <Button
          loading={loading}
          type="primary"
          onClick={addTask}
        >
            Create
        </Button>
      </div>
      <div className="tasks-form-right">
        { selectedTaskGroup !== 'all'
        ? (
        <Popconfirm
          title="Are you sure you want to delete this task group?"
          okType="danger"
          okText="Delete"
          okButtonProps={{ type: "primary" }}
          onConfirm={handleDeleteTaskGroup}
        >
          <Button type="primary" danger>Delete Task Group</Button>
        </Popconfirm>
        ) : null
        }
      </div>
    </div>
  )
}

export default TasksForm