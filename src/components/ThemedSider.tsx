import React from 'react'
import { Layout } from 'antd'
import './ThemedSider.css'
import { SiderProps } from 'antd/lib/layout'

const ThemedSider: React.FC<SiderProps> = (props) => {
  return (
    <Layout.Sider
      {...props}
      theme={props.theme || "dark"}
      collapsible={props.collapsible || true}
    >
      <div className="dashboard-sider">
        {props.children}
      </div>
    </Layout.Sider>
  )
}

export default ThemedSider
