import axios from 'axios'
import io from 'socket.io-client'
const socket = io('ws://localhost:9093')

// 获取连天列表
const MSG_LIST = 'MSG_LIST'
// 读取信息
const MSG_RECV = 'MSG_RECV'
// 标识已读
const MSG_READ = 'MSG_READ'

const initState = {
  chatmsg: [],
  users:{},
  unread: 0
}

export function chat(state=initState, action) {
  switch(action.type){
    case MSG_LIST:
      return { ...state, chatmsg: action.msgs, users:action.users, unread: action.msgs.filter(v => !v.read).length }
    case MSG_RECV:
      return { ...state, chatmsg: [...state.chatmsg, action.msgs], unread: state.unread+1 }
    // case MSG_READ:
    default:
      return initState
  }  
}

function msgList(msgs, users){
  return { msgs, users, type:'MSG_LIST'}
}

function msgRecv(msgs){
  return { msgs, type: 'MSG_RECV'}
}

export function recvMsg() {
  return dispatch => {
    socket.on('recvmsg', (data) => {
      console.log('recvmsg', data)
      dispatch(msgRecv(data))
    })
  }
}

export function sendMsg({from, to ,msg}) {
  return dispatch => {
    socket.emit('sendmsg', {from, to ,msg})
  }
}

export function getMsgList() {
  return dispatch => {
    axios.get('/user/getmsglist')
      .then(res => {
        if(res.status === 200 && res.data.code === 0) {
          dispatch(msgList(res.data.msgs, res.data.users))
        }
      })
  }
}