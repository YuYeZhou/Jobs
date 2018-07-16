import React from 'react'
import { connect } from 'react-redux'
import { Card, WhiteSpace, WingBlank } from 'antd-mobile'
import { getUserList } from '../../redux/chatuser.redux'

@connect(
  state=>state.chatuser,
  {getUserList}
)
class Boss extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      data: []
    }
  }
  componentDidMount() {           
    this.props.getUserList('genius')
  }
  render() {
    const Header = Card.Header
    const Body = Card.Body
    return (
      <div>
        <WhiteSpace/>
        <WingBlank>
          {this.props.userList.map(v => (
            v.avatar?
            (<Card
              key={v._id}
            >
              <Header              
                title={v.user}
                thumb={require(`../img/${v.avatar}.png`)}
                extra={<span>{v.position}</span>}
              >
              </Header>
              <Body>
                {v.desc.split('\n').map(v => (
                  <div key={v}>{v}</div>
                ))}
              </Body>
            </Card>):null
          ))}
        </WingBlank>
      </div>
    )
  }
}

export default Boss