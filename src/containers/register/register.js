import React from 'react'
import Logo from '../../components/logo/logo'
import { WhiteSpace, List, InputItem, Radio, Button } from 'antd-mobile'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { register } from '../../redux/user.redux'
import '../login_register.css'

@connect(
  state => state.user,
  {register}
)
class Register extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      user: '',
      pwd: '',
      repeatpwd: '',
      type: 'genius'
    }
    this.handleRegister = this.handleRegister.bind(this)
  }

  handleChange(key, val) {
    this.setState({
      [key]: val
    })
  }

  handleRegister() {
    this.props.register(this.state)
  }

  render() {
    const RadioItem = Radio.RadioItem
    return (
      <div>
        {this.props.redirectTo? <Redirect to={this.props.redirectTo}/> : null}
        <Logo />
        <WhiteSpace />
        <List>
          {this.props.msg?<p className="error-msg">{this.props.msg}</p>:null}
          <InputItem
            onChange={(v) => this.handleChange('user', v)}
          >用户名</InputItem>
          <WhiteSpace />
          <InputItem
           type="password"
           onChange={(v) => this.handleChange('pwd', v)}
          >密码</InputItem>
          <WhiteSpace />
          <InputItem
           type="password"
           onChange={(v) => this.handleChange('repeatpwd', v)}
          >确认密码</InputItem>
          <WhiteSpace />
          <RadioItem
           onChange={() => this.handleChange('type', 'genius')}
           checked={this.state.type === 'genius'}
          >牛人</RadioItem>
          <WhiteSpace />
          <RadioItem
           onChange={() => this.handleChange('type', 'boss')}
           checked={this.state.type === 'boss'}
          >BOSS</RadioItem>
          <WhiteSpace />
          <Button type="primary"
            onClick={this.handleRegister}
          >注册</Button>
        </List>
      </div>
    )
  }
}

export default Register