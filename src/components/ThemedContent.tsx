import React from 'react'
import { Layout } from 'antd'
import './ThemedContent.css'
import { BasicProps } from 'antd/lib/layout/layout'

const { Content } = Layout

const ThemedContent: React.FC<BasicProps> = ({ children, ...rest }) => {
  return (
    <Content className="themed-content" {...rest}>
      {children}
    </Content>
  )
}

export default ThemedContent