import React from 'react'
import { Layout } from 'antd'
import { ContentProps } from '../../../types/dashboardContentTypes'

const { Sider, Content } = Layout

const TodosRoute: React.FC<ContentProps> = (props) => {
  return (
    <>
      <Sider className="sider-navigation" collapsible></Sider>
      <Content>Todos</Content>
    </>
  )
}

export default TodosRoute