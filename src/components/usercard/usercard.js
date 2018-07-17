import React from 'react'
import { Card, WhiteSpace, WingBlank } from 'antd-mobile'

class UserCard extends React.Component{
  render() {
    const Header = Card.Header
    const Body = Card.Body
    return(
      <div>
        <WhiteSpace/>
        <WingBlank>
          {this.props.userlist.map(v => (
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
                {v.type==='boss'?<div>公司{v.commpany}</div>:null}
                {v.desc.split('\n').map(d => (
                  <div key={d}>{d}</div>
                ))}
                {v.type==='boss'?<div>薪资：{v.salary}</div>:null}
              </Body>
            </Card>):null
          ))}
        </WingBlank>
      </div>
    )
  }
}

export default UserCard