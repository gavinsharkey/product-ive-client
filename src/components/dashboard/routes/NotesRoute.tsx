import React from 'react'
import { Layout } from 'antd'
import ThemedSider from '../../ThemedSider'

const { Content } = Layout

const NotesRoute: React.FC = (props) => {
  return (
    <>
      <ThemedSider
        theme='light'
      >
      </ThemedSider>
      <Content></Content>
    </>
  )
}

export default NotesRoute