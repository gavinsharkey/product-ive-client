import React from 'react'
import { Layout } from 'antd'
import { ContentProps } from '../../../types/dashboardContentTypes'
import './Sider.css'

const { Sider, Content } = Layout

const NotesRoute: React.FC<ContentProps> = (props) => {
  return (
    <>
      <Sider className="sider-navigation" collapsible>Nav</Sider>
      <Content></Content>
    </>
  )
}

export default NotesRoute