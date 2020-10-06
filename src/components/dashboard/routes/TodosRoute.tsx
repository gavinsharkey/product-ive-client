import React from 'react'
import { Layout, Menu } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import ThemedSider from '../../ThemedSider'

const { Sider, Content } = Layout

const TodosRoute: React.FC = (props) => {
  return (
    <>
      <ThemedSider>
        <Menu
            onSelect={values => console.log(values)}
            mode="inline"
            theme="light"
          >
            <Menu.Item key="1" icon={<UserOutlined />}>
              All Todos
            </Menu.Item>
          </Menu>
      </ThemedSider>
      <Content>Todos</Content>
    </>
  )
}

export default TodosRoute