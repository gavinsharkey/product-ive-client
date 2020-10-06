import React, { useState } from 'react'
import { Layout, Menu, Typography } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import ThemedSider from '../../ThemedSider'
import TasksContainer from '../tasks/TasksContainer'

const { Content } = Layout

const TodosRoute: React.FC = (props) => {
  const [currentTask, setCurrentTask] = useState<React.Key>('all')

  return (
    <>
      <ThemedSider theme="light">
        <Typography.Title level={4}>
          Menu
        </Typography.Title>
        <Menu
            onSelect={values => setCurrentTask(values.key)}
            mode="inline"
            theme="light"
            defaultSelectedKeys={['all']}
          >
            <Menu.Item key="all" icon={<UserOutlined />}>
              All Todos
            </Menu.Item>
          </Menu>
      </ThemedSider>
      <Content>
        <TasksContainer taskKey={currentTask} />
      </Content>
    </>
  )
}

export default TodosRoute