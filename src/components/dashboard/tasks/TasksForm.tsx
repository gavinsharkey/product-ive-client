import React, { useState } from 'react'
import { Input, Button, Popconfirm } from 'antd'
import { useDispatch } from 'react-redux'
import { addTask, addSubTask } from '../../../actions/tasksActions'
import { TaskGroup } from '../../../types/taskGroupTypes'
import { fetchWithAuth } from '../../../concerns/fetchWithAuth'
import { Task } from '../../../types/tasksTypes'
import { SelectedTaskIdType } from './TasksContent'
import './TasksForm.css'

interface TasksFormProps {
  selectedTaskGroup: 'all' | TaskGroup | undefined
  selectedTaskId: SelectedTaskIdType
  handleDeleteTaskGroup: () => void
}

const TasksForm: React.FC<TasksFormProps> = ({ selectedTaskGroup, selectedTaskId, handleDeleteTaskGroup }) => {
  const [value, setValue] = useState('')
  const dispatch = useDispatch()

  const handleAddTask = async () => {
    let data: Task;
    if (selectedTaskGroup && selectedTaskGroup !== 'all') {
      data = await fetchWithAuth(`http://localhost:3001/tasks?taskable_id=${selectedTaskGroup.id}`, 'POST', {
        task: { name: value }
      })
    } else {
      data = await fetchWithAuth(`http://localhost:3001/tasks`, 'POST', {
        task: { name: value }
      })
    }

    dispatch(addTask(data))
  }

  const handleAddSubTask = async () => {
    if (selectedTaskId) {
      const data = await fetchWithAuth<Task>(`http://localhost:3001/tasks/${selectedTaskId}/sub_tasks`, 'POST', {
        task: {
          name: value
        }
      })

      dispatch(addSubTask(data, selectedTaskId))
    }
  }

  const currentRenderedInput = () => {
    if (selectedTaskId) {
      return (
        <div>
          <Input
            value={value}
            onChange={e => setValue(e.target.value)}
            onPressEnter={handleAddSubTask}
            placeholder="Enter New Sub Task Name"
          />
          <Button
            type="primary"
            onClick={handleAddSubTask}
          >
              Add Sub Task
          </Button>
        </div>
      )
    } else {
      return (
        <div>
          <Input
            value={value}
            onChange={e => setValue(e.target.value)}
            onPressEnter={handleAddTask}
            placeholder="Enter New Task Name"
          />
          <Button
            type="primary"
            onClick={handleAddTask}
          >
              Add Task
          </Button>
        </div>
      )
    }
  }

  return (
    <div className="tasks-form">
      {currentRenderedInput()}
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