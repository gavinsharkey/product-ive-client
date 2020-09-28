import React from 'react'
import { Form, Input, Divider, Typography, Button } from 'antd'
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import { Link as RouterLink } from 'react-router-dom'
import RegistrationWrapper from '../components/RegistrationWrapper' 

const { Title, Text, Link } = Typography

interface SigninFormValues {
  display_name: string
  username: string
  password: string
}

const SigninPage: React.FC = () => {
  const [form] = Form.useForm()

  const onFinish = (values: SigninFormValues): void => {
    console.log(values)
  }

  return (
    <RegistrationWrapper>
      <Title>Sign Up</Title>
      <Divider />
      <Form form={form} name="signin" colon onFinish={onFinish}>
        <Form.Item
          label="Display Name"
          name="display_name"
          rules={[{required: true}]}
        >
          <Input prefix={<UserOutlined />} type="email" />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[{required: true}]}
        >
          <Input prefix={<MailOutlined />} type="email" />
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
            Signup
          </Button>
        </Form.Item>
      </Form>
      <Divider />
      <Text>Already a user? <RouterLink to="/login" component={Link}>Log In</RouterLink></Text>
    </RegistrationWrapper>
  )
}

export default SigninPage