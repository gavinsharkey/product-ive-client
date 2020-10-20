import React, { useEffect, useState } from 'react'
import { Menu, Typography } from 'antd'
import { UserOutlined, LoadingOutlined, FolderOutlined } from '@ant-design/icons'
import { fetchWithAuth } from '../../../concerns/fetchWithAuth'
import { TaskGroup } from '../../../types/taskGroupTypes'
import ThemedContent from '../../ThemedContent'
import ThemedSider from '../../ThemedSider'
import TasksContent from '../tasks/TasksContent'
import TaskGroupForm from '../tasks/TaskGroupForm'

const { Title } = Typography

const TasksRoute: React.FC = (props) => {
  const [collapsed, setCollapsed] = useState(false)
  const [taskGroups, setTaskGroups] = useState<TaskGroup[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedKeys, setSelectedKeys] = useState<string[]>(['all'])

  useEffect(() => {
    (async () => {
      setLoading(true)
      const data = await fetchWithAuth('http://localhost:3001/task_groups')
      setTaskGroups(data)
      setLoading(false)
    })()
  }, [])

  const handleCreateTaskGroup = async (value: string): Promise<any> => {
    setLoading(true)
    const data = await fetchWithAuth<TaskGroup>('http://localhost:3001/task_groups', 'POST', {
      task_group: { name: value }
    })

    if (!data.errors) {
      setTaskGroups(prevState => [data, ...prevState])
      setLoading(false)
    }
  }

  const handleDeleteTaskGroup = (taskGroup: TaskGroup): void => {
    setTaskGroups(prevTaskGroups => {
      return prevTaskGroups.filter(currentTaskGroup => {
        return currentTaskGroup.id !== taskGroup.id
      })
    })
    setSelectedKeys(['all'])
  }

  const renderedTaskGroups = () => {
    return taskGroups.map((taskGroup) => {
      return (
        <Menu.Item key={taskGroup.id} icon={<FolderOutlined />}>
          {taskGroup.name}
        </Menu.Item>
      )
    })
  }

  const selectedTaskGroup = () => {
    if (selectedKeys[0] === 'all') {
      return 'all'
    } else {
      return taskGroups.find(task => task.id === parseInt(selectedKeys[0]))
    }
  }

  return (
    <>
      <ThemedSider
        collapsed={collapsed}
        onCollapse={(collapsed) => setCollapsed(collapsed)}
        theme="light"
      >
        {!collapsed ? (
          <>
            <Title level={4}>Menu</Title>
            <TaskGroupForm handleCreateTaskGroup={handleCreateTaskGroup} />
          </>
        ) : null
        } 
        { loading
          ? <LoadingOutlined />
          : (
          <Menu
            onSelect={values => setSelectedKeys(values.selectedKeys as string[])}
            mode="inline"
            theme="light"
            selectedKeys={selectedKeys}
            defaultSelectedKeys={['all']}
          >
            <Menu.Divider />
            <Menu.Item key="all" icon={<UserOutlined />}>
              All Tasks
            </Menu.Item>
            <Menu.Divider />
            {renderedTaskGroups()}
          </Menu>
          )
        }
      </ThemedSider>
      <ThemedContent>
        <TasksContent 
          handleDeleteTaskGroup={handleDeleteTaskGroup}
          taskGroup={selectedTaskGroup()}
        />
      </ThemedContent>
    </>
  )
}

export default TasksRoute