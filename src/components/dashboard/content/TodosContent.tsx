import React from 'react'
import { Layout } from 'antd'
import { ContentProps } from '../../../types/dashboardContentTypes'

const { Sider, Content } = Layout

const TodosContent: React.FC<ContentProps> = (props) => {
  return (
    <>
      <Sider></Sider>
      <Content>Todos</Content>
    </>
  )
}

export default TodosContent