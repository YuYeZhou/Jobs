import React from 'react'
import Logo from '../../components/logo/logo'
import { List, InputItem, WingBlank, WhiteSpace, Button} from 'antd-mobile'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { login } from '../../redux/user.redux'
import '../../index.css'

@connect(
  state => state.user,
  {login}
)

class Login extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      user: '',
      pwd: ''
    }
    this.handleLogin = this.handleLogin.bind(this)
    this.register = this.register.bind(this)
  }

  handleChange(key, val) {
    this.setState({
      [key]: val
    })
  }

  handleLogin() {
    this.props.login(this.state)
  }

  register() {
    this.props.history.push('/register')
  }

  render() {
    return (
      <div>
        {this.props.redirectTo? <Redirect to={this.props.redirectTo}/> : null}
        <Logo />
        <WhiteSpace />
        <List>
          {this.props.msg?<p className="error-msg">{this.props.msg}</p>:null}
          <InputItem
           onChange={(v) => this.handleChange('user', v)}
          >用户</InputItem>
          <WhiteSpace />
          <InputItem
           type="password"
           onChange={(v) => this.handleChange('pwd', v)}
          >密码</InputItem>
        </List>
        <WhiteSpace />
        <WingBlank>
            <Button type="primary" onClick={this.handleLogin}>登录</Button>
            <WhiteSpace />
            <Button type="primary" onClick={this.register}>注册</Button>
        </WingBlank>        
      </div>
    )
  }
}

export default Login
