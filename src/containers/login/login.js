import React from 'react'
import Logo from '../../components/logo/logo'
import { List, InputItem, WingBlank, WhiteSpace, Button} from 'antd-mobile'


class Login extends React.Component{
  constructor(props) {
    super(props)
    this.register = this.register.bind(this)
  }

  register() {
    this.props.history.push('/register')
  }

  render() {
    return (
      <div>
        <Logo />
        <h2>登录页</h2>
        <WhiteSpace />
        <List>
          <InputItem>用户</InputItem>
          <WhiteSpace />
          <InputItem>密码</InputItem>
        </List>
        <WhiteSpace />
        <WingBlank>
            <Button type="primary">登录</Button>
            <WhiteSpace />
            <Button type="primary" onClick={this.register}>注册</Button>
        </WingBlank>        
      </div>
    )
  }
}

export default Login
