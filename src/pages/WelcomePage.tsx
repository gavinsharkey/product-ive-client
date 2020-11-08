import React, { useEffect } from 'react'
import { Row, Col, Divider, Typography, Button } from 'antd'
import { RouteComponentProps } from 'react-router-dom'
import RegistrationWrapper from '../components/RegistrationWrapper'
import { useSelector } from 'react-redux'
import { RootState } from '../reducers/rootReducer'

const { Title, Paragraph, Link } = Typography

const WelcomePage: React.FC<RouteComponentProps> = (props) => {
  const isLoggedIn = useSelector((state: RootState) => state.userData.isLoggedIn)

  useEffect(() => {
    if (isLoggedIn) {
      props.history.replace('/dashboard')
    }
  }, [isLoggedIn, props.history])

  const handleLink = (route: string): void => {
    props.history.push(route)
  }

  return (
    <RegistrationWrapper boxStyle={{width: '80%'}}>
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col span={16}>
          <Title> Welcome to Product.iv</Title>
          <Divider orientation="left">About</Divider>
          <Paragraph>
            Product.iv is a lightweight and intuitive productivity app to help you keep track of all your
            daily tasks, notes, and more! Use it to:
          </Paragraph>
          <ul>
            <li>Keep an interactive list of Todos</li>
            <li>Write beatutiful notes with Markdown styling</li>
          </ul>
          <Divider orientation="left">Links</Divider>
          <div style={{display: 'flex', flexDirection: 'column'}}>
            <Link>Github Repo (Client-side)</Link>
            <Link>Github Repo (Server-side)</Link>
            <Link>LinkedIn (Gavin Sharkey, creator)</Link>
          </div>
        </Col>
        <Col style={{textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center'}} span={8}>
          <Title>Ready?</Title>
          <Button onClick={() => handleLink('/login')} size="large" block>Click to Log In</Button>
          <Divider />
          <Title level={2}>Already a user?</Title>
          <Button onClick={() => handleLink('/signup')} size="large" block>Click to Sign Up</Button>
        </Col>
      </Row>
    </RegistrationWrapper>
  )
}

export default WelcomePage