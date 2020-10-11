import React, { useState } from 'react'
import { Input, Collapse } from 'antd'
import './TaskGroupForm.css'

const { Panel } = Collapse

interface TaskGroupFormProps {
  handleCreateTaskGroup: (value: string) => Promise<any>
}

const TaskGroupForm: React.FC<TaskGroupFormProps> = ({ handleCreateTaskGroup }) => {
  const [value, setValue] = useState('')

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setValue(event.target.value)
  }

  const handleSubmit = () => {
    if (value.length > 0 && value.length <= 20) {
      handleCreateTaskGroup(value)
    }
    
    setValue('')
  }

  return (
    <Collapse ghost>
      <Panel header="Add A Task Group" key='1'>
        <div className="task-group-form">
          <Input
            placeholder="Enter name..."
            value={value}
            maxLength={20}
            onChange={handleChange}
            onPressEnter={handleSubmit}
          />
        </div>
      </Panel>
    </Collapse>
  )
}

export default TaskGroupForm