import React from 'react'
import { connect } from 'react-redux'
import UserCard from '../usercard/usercard'
// import { Card, WhiteSpace, WingBlank } from 'antd-mobile'
import { getUserList } from '../../redux/chatuser.redux'

@connect(
  state=>state.chatuser,
  {getUserList}
)
class Genuis extends React.Component{ 
  componentDidMount() {           
    this.props.getUserList('boss')
  }
  render() {
    return (
      <UserCard userlist={this.props.userList}></UserCard>
    )
  }
}

export default Genuis