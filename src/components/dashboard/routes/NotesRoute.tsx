import React from 'react'
import { Layout, Typography } from 'antd'
import ThemedSider from '../../ThemedSider'
import ThemedContent from '../../ThemedContent'

const { Content } = Layout
const { Title } = Typography

const NotesRoute: React.FC = (props) => {
  return (
    <>
      <ThemedSider
        theme='light'
      >
        <Title level={4}>Menu</Title>
      </ThemedSider>
      <ThemedContent>
        <Title>Coming soon!</Title>
      </ThemedContent>
    </>
  )
}

export default NotesRoute