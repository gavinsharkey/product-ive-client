import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Form, Input, Divider, Typography, Button, message } from 'antd'
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import { Link as RouterLink, RouteComponentProps } from 'react-router-dom'
import { signUp } from '../actions/userActions'
import RegistrationWrapper from '../components/RegistrationWrapper' 
import { UserState, UserThunkDispatch } from '../types/userTypes';

const { Title, Text, Link } = Typography

export interface SignupValues {
  display_name: string
  username: string
  password: string
}

interface Props extends RouteComponentProps {
  signUp: (values: SignupValues) => Promise<any>
  isLoggedIn: boolean
}

const SigninPage: React.FC<Props> = (props) => {
  useEffect(() => {
    if (props.isLoggedIn) {
      props.history.replace('/dashboard')
    }
  }, [props.isLoggedIn, props.history])


  const onFinish = (values: SignupValues): void => {
    props.signUp(values)
    .then(data => {
      if (data.errors) {
        message.error('There was an error submitting your request, please try again', 3)
      }
    })
  }

  return (
    <RegistrationWrapper>
      <Title>Sign Up</Title>
      <Divider />
      <Form name="signin" colon onFinish={onFinish}>
        <Form.Item
          label="Display Name"
          name="display_name"
          rules={[{required: true, message: "'Display Name' is required"}]}
        >
          <Input prefix={<UserOutlined />} type="text" />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[{required: true, message: "'Email' is required"}]}
        >
          <Input prefix={<MailOutlined />} type="email" />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{required: true, message: "'Password' is required"}]}
        >
          <Input prefix={<LockOutlined />} type="password" />
        </Form.Item>
        <Form.Item>
          <Button block type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
      <Divider />
      <Text>Already a user? <RouterLink to="/login" component={Link}>Log In</RouterLink></Text>
    </RegistrationWrapper>
  )
}

const mapStateToProps = (state: UserState) => {
  return {
    isLoggedIn: state.isLoggedIn
  }
}

const mapDispatchToProps = (dispatch: UserThunkDispatch) => {
  return {
    signUp: (values: SignupValues) => dispatch(signUp(values))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SigninPage)