import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Form, Input, Divider, Typography, Button, message } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { RouteComponentProps } from 'react-router-dom'
import { login } from '../actions/userActions'
import RegistrationWrapper from '../components/RegistrationWrapper' 
import { RootState } from '../reducers/rootReducer';

const { Title, Text, Link } = Typography

export interface LoginValues {
  username: string,
  password: string
}

interface Props extends RouteComponentProps {
  login: (values: LoginValues) => Promise<any>
  isLoggedIn: boolean
}

const LoginPage: React.FC<Props> = (props) => {
  useEffect(() => {
    if (props.isLoggedIn) {
      props.history.replace('/dashboard')
    }
  }, [props.isLoggedIn, props.history])

  const onFinish = (values: LoginValues): void => {
    props.login(values)
    .then(data => {
      if (data.error) {
        message.error(data.error, 3)
      }
    })
  }

  const handleLink = (route: string): void => {
    props.history.push(route)
  }

  return (
    <RegistrationWrapper>
      <Title>Log In</Title>
      <Divider />
      <Form name="login" colon onFinish={onFinish}>
        <Form.Item
          label="Email"
          name="email"
          rules={[{required: true}]}
        >
          <Input prefix={<UserOutlined />} type="email" />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{required: true}]}
        >
          <Input prefix={<LockOutlined />} type="password" />
        </Form.Item>
        <Form.Item>
          <Button block type="primary" htmlType="submit">
            Login
          </Button>
        </Form.Item>
      </Form>
      <Divider />
      <Text>Not a user? <Link onClick={() => handleLink('/signup')}>Sign Up</Link></Text>
    </RegistrationWrapper>
  )
}

const mapStateToProps = (state: RootState) => {
  return {
    isLoggedIn: state.userData.isLoggedIn
  }
}

export default connect(mapStateToProps, { login })(LoginPage)