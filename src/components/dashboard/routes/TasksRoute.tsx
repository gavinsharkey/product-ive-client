import React, { useEffect, useState } from 'react'
import { Layout, Menu, Typography } from 'antd'
import { UserOutlined, LoadingOutlined, FolderOutlined } from '@ant-design/icons'
import { fetchWithAuth } from '../../../concerns/fetchWithAuth'
import { TaskGroup } from '../../../types/taskGroupTypes'
import ThemedSider from '../../ThemedSider'
import TasksContainer from '../tasks/TasksContainer'
import TaskGroupForm from '../tasks/TaskGroupForm'

const { Content } = Layout
const { Title } = Typography

const TasksRoute: React.FC = (props) => {
  const [collapsed, setCollapsed] = useState(false)
  const [taskGroups, setTaskGroups] = useState<TaskGroup[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedGroupKey, setSelectedGroupKey] = useState<React.Key>('all')

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

  const renderedTaskGroups = () => {
    return taskGroups.map((taskGroup) => {
      return (
        <Menu.Item key={taskGroup.id} icon={<FolderOutlined />}>
          {taskGroup.name}
        </Menu.Item>
      )
    })
  }

  const selectedTask = selectedGroupKey === 'all' ? 'all' : (
    taskGroups.find(task => task.id === parseInt(selectedGroupKey as string))
  )

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
            onSelect={values => setSelectedGroupKey(values.key)}
            mode="inline"
            theme="light"
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
      <Content>
        <TasksContainer taskGroup={selectedTask} />
      </Content>
    </>
  )
}

export default TasksRoute