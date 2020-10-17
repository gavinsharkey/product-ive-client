import React, { useState } from 'react'
import { Input, Button } from 'antd'
import './TasksForm.css'

interface TasksFormProps {
  loading: boolean
  handleAddTask: (name: string) => void
}

const TasksForm: React.FC<TasksFormProps> = ({ loading, handleAddTask }) => {
  const [value, setValue] = useState('')

  const addTask = () => {
    setValue('')
    handleAddTask(value)
  }

  return (
    <div className="tasks-form">
      <Input
        value={value}
        onChange={e => setValue(e.target.value)}
        onPressEnter={addTask}
        placeholder="Enter new task name"
        style={{width: '20%'}}
      />
      <Button
        loading={loading}
        type="primary"
        onClick={addTask}
      >
          Create
      </Button>
    </div>
  )
}

export default TasksForm