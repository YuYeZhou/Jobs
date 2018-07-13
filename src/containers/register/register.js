import React from 'react'
import Logo from '../../components/logo/logo'
import { WhiteSpace, List, InputItem, Radio, Button } from 'antd-mobile'

class Register extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      user: '',
      pwd: '',
      repeatpwd: '',
      type: 'genius'
    }
    this.hanleButton = this.hanleButton.bind(this)
  }

  hanleChange(key, val) {
    this.setState({
      [key]: val
    })
  }

  hanleButton() {
    console.log(this.state);    
  }

  render() {
    const RadioItem = Radio.RadioItem
    return (
      <div>
        <Logo />
        <WhiteSpace />
        <List>
          <InputItem
            onChange={(v) => this.hanleChange('user', v)}
          >用户名</InputItem>
          <WhiteSpace />
          <InputItem
           type="password"
           onChange={(v) => this.hanleChange('pwd', v)}
          >密码</InputItem>
          <WhiteSpace />
          <InputItem
           type="password"
           onChange={(v) => this.hanleChange('repeatpwd', v)}
          >确认密码</InputItem>
          <WhiteSpace />
          <RadioItem
           onChange={() => this.hanleChange('type', 'genius')}
           checked={this.state.type === 'genius'}
          >牛人</RadioItem>
          <WhiteSpace />
          <RadioItem
           onChange={() => this.hanleChange('type', 'boss')}
           checked={this.state.type === 'boss'}
          >BOSS</RadioItem>
          <WhiteSpace />
          <Button type="primary"
            onClick={this.hanleButton}
          >注册</Button>
        </List>
        
      </div>
    )
  }
}

export default Register