import React from 'react'
import { Form, Input, Divider, Typography, Button } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link as RouterLink } from 'react-router-dom'
import RegistrationWrapper from '../components/RegistrationWrapper' 

const { Title, Text, Link } = Typography

interface LoginFormValues {
  username: string,
  password: string
}

const LoginPage: React.FC = () => {
  const [form] = Form.useForm()

  const onFinish = (values: LoginFormValues): void => {
    console.log(values)
  }

  return (
    <RegistrationWrapper>
      <Title>Log In</Title>
      <Divider />
      <Form form={form} name="login" colon onFinish={onFinish}>
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
      <Text>Not a user? <RouterLink to="/signup" component={Link}>Sign Up</RouterLink></Text>
    </RegistrationWrapper>
  )
}

export default LoginPage