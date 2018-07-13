import axios from "axios";

const REGITSER_SUCCESS = 'REGITSER_SUCCESS'
const ERROR_MSG = 'ERROR_MSG'

const initState = {
  isAuth: false,
  msg: '',
  user: '',
  pwd: '',
  repeatpwd: '',
  type: ''
}

// reducr
export function user(state=initState, action) {
  switch (action.type) {
    case REGITSER_SUCCESS:
      return {...state, msg: '', isAuth: true, ...action.data}
    case ERROR_MSG:
      return {...state, msg: action.msg, isAuth: false}
    default:
      return state;
  }
}

function registerSucceess(data) {
  return { data, type: REGITSER_SUCCESS }
}

function errorMSG(msg) {
  return { msg, type: ERROR_MSG }
}

export function register({user, pwd, repeatpwd, type}) {
  if(!user||!pwd||!type){
    return errorMSG('必须输入用户名和密码')
  }
  if(pwd !== repeatpwd){
    return errorMSG('密码和确认密码不一致')
  }
  return dispatch => (
    axios.post('/user/register')
      .then(res => {
        if(res.status === 200 && res.data.code === 0){
          dispatch(registerSucceess({user, pwd, type}))
        }else{
          dispatch(res.data.msg)
        }
      })
  )
}
