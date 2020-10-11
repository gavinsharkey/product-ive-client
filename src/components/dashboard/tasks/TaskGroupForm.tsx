import React, { useState } from 'react'
import { Input, Collapse } from 'antd'
import './TaskGroupForm.css'

const { Panel } = Collapse

const TaskGroupForm: React.FC = () => {
  const [value, setValue] = useState('')

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setValue(event.target.value)
  }

  const handleSubmit = () => {
    setValue('')
  }

  return (
    <Collapse ghost>
      <Panel header="Add A Task Group" key='1'>
        <div className="task-group-form">
          <Input
            placeholder="Enter name..."
            value={value}
            onChange={handleChange}
            onPressEnter={handleSubmit}
          />
        </div>
      </Panel>
    </Collapse>
  )
}

export default TaskGroupForm