import React from 'react'

import { Layout, Space, Typography, Button } from 'antd'
import './DashboardHeader.css'

const { Header } = Layout
const { Title } = Typography

interface DashboardHeaderProps {
  handleLink: (route: string) => void
  handleLogout: () => void
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({handleLink, handleLogout}) => {
  return (
    <Header className="dashboard-header">
      <Space size="large">
        <Title level={2}>Product.iv</Title>
        <Button onClick={() => handleLink("/")} type="primary">Main</Button>
        <Button onClick={() => handleLink("/notes")} type="primary">Notes</Button>
        <Button onClick={() => handleLink('/todos')} type="primary">Todos</Button>
      </Space>
      <Button onClick={handleLogout} type="primary" style={{alignSelf: 'flex-end'}}>Logout</Button>
    </Header>
  )
}

export default DashboardHeader