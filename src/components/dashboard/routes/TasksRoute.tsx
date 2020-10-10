import React, { useEffect, useState } from 'react'
import { Layout, Menu, Typography } from 'antd'
import { UserOutlined, LoadingOutlined, FolderOutlined } from '@ant-design/icons'
import { fetchWithAuth } from '../../../concerns/fetchWithAuth'
import { TaskGroup } from '../../../types/taskGroupTypes'
import ThemedSider from '../../ThemedSider'
import TasksContainer from '../tasks/TasksContainer'

const { Content } = Layout

const TasksRoute: React.FC = (props) => {
  const [taskGroups, setTaskGroups] = useState<TaskGroup[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedTaskKey, setSelectedTaskKey] = useState<React.Key>('all')

  useEffect(() => {
    (async () => {
      setLoading(true)
      const data = await fetchWithAuth('http://localhost:3001/task_groups')
      setTaskGroups(data)
      setLoading(false)
    })()
  }, [])

  const renderedTaskGroups = () => {
    return taskGroups.map((taskGroup: TaskGroup) => {
      return (
        <Menu.Item key={taskGroup.id} icon={<FolderOutlined />}>
          {taskGroup.name}
        </Menu.Item>
      )
    })
  }

  return (
    <>
      <ThemedSider theme="light">
        <Typography.Title level={4}>
          Menu
        </Typography.Title>
        <Menu
            onSelect={values => setSelectedTaskKey(values.key)}
            mode="inline"
            theme="light"
            defaultSelectedKeys={['all']}
          >
            <Menu.Item key="all" icon={<UserOutlined />}>
              All Tasks
            </Menu.Item>
            { loading
              ? <LoadingOutlined />
              : renderedTaskGroups()
            }
          </Menu>
      </ThemedSider>
      <Content>
        <TasksContainer taskKey={selectedTaskKey} />
      </Content>
    </>
  )
}

export default TasksRoute