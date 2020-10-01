import React from 'react'
import { Layout } from 'antd'
import { ContentProps } from '../../../types/dashboardContentTypes'
import { RouteComponentProps } from 'react-router-dom'

const { Sider, Content } = Layout

const DefaultContent: React.FC<ContentProps> = (props) => {
  return (
    <>
      <Content>Default</Content>
    </>
  )
}

export default DefaultContent