import React from 'react'
import { Layout } from 'antd'

const { Sider, Content } = Layout

const TodosRoute: React.FC = (props) => {
  return (
    <>
      <Sider className="sider-navigation" collapsible></Sider>
      <Content>Todos</Content>
    </>
  )
}

export default TodosRoute