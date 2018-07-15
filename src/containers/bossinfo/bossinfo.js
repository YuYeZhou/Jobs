import React from 'react'
import { NavBar, List, InputItem, TextareaItem, Button } from 'antd-mobile'
import AvatarSelector from '../../components/avatar-selector/avatar-selector'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { update } from '../../redux/user.redux'

@connect(
  state => state.user,
  {update}
)
class BossInfo extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      position: '',
      company: '',
      salary: '',
      desc: ''     
    }
  }

  handleChange(key, val){
    this.setState({
      [key]: val
    })
  }

  render() {
    const path = this.props.location.pathname
    const redirect = this.props.redirectTo

    return(
      <div>
        {redirect && redirect !== path? <Redirect to={this.props.redirectTo}/> : null}
        <NavBar mode="dark">Boss完善信息页面</NavBar>
        <AvatarSelector selectAvatar={(imgname) => {
          this.setState({
            avatar: imgname
          })
        }}
        />
        <List>
          <InputItem
            onChange={(v) => this.handleChange('position', v)}
          >招聘职位</InputItem>
          <InputItem
            onChange={(v) => this.handleChange('company', v)}
          >公司名称</InputItem>
          <InputItem
            onChange={(v) => this.handleChange('salary', v)}
          >职位薪水
          </InputItem>
          <TextareaItem
            onChange={(v) => this.handleChange('desc', v)}
            rows={3}
            autoHeight
            title="职位要求"
          ></TextareaItem>
          <Button
            onClick={() => {
              this.props.update(this.state)
            }}
            type="primary"
          >保存</Button>
        </List>
      </div>
    )
  }
}

export default BossInfo