import React from 'react'
import { Layout } from 'antd'
import { ContentProps } from '../../../types/dashboardContentTypes'

const { Sider, Content } = Layout

const NotesContent: React.FC<ContentProps> = (props) => {
  return (
    <>
      <Sider></Sider>
      <Content></Content>
    </>
  )
}

export default NotesContent