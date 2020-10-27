import React from 'react'
import { Typography } from 'antd'
import ThemedSider from '../../ThemedSider'
import ThemedContent from '../../ThemedContent'

const { Title } = Typography

const NotesRoute: React.FC = () => {
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