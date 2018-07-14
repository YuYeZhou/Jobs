import axios from "axios";
import { getRedirectPath } from '../util'

const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const REGITSER_SUCCESS = 'REGITSER_SUCCESS'
const LOAD_DATA = 'LOAD_DATA'
const ERROR_MSG = 'ERROR_MSG'

const initState = {
  isAuth: false,
  redirectTo: '',
  msg: '',
  user: '',
  type: ''
}

// reducr
export function user(state=initState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {...state, msg: '', redirectTo: getRedirectPath(action.data), isAuth: true, ...action.data}
    case REGITSER_SUCCESS:
      return {...state, msg: '', redirectTo: getRedirectPath(action.data), isAuth: true, ...action.data}
    case LOAD_DATA:
      return {...state, ...action.data}
    case ERROR_MSG:
      return {...state, msg: action.msg, isAuth: false}
    default:
      return state;
  }
}

function loginSucceess(data) {
  return { data, type: LOGIN_SUCCESS}
}

function registerSucceess(data) {
  return { data, type: REGITSER_SUCCESS }
}

function errorMSG(msg) {
  return { msg, type: ERROR_MSG }
}

export function loadData(data) {
  return { data, type: LOAD_DATA }
}

export function login({user, pwd}) {
  if(!user||!pwd){
    return errorMSG('必须输入用户名和密码')
  }  
  return dispatch => (
    axios.post('/user/login', {user, pwd})
      .then(res => {
        if(res.status === 200 && res.data.code === 0){
          dispatch(loginSucceess(res.data.data))
        }else{
          dispatch(errorMSG(res.data.msg))
        }
      })
  )
}

export function register({user, pwd, repeatpwd, type}) {
  if(!user||!pwd||!type){
    return errorMSG('必须输入用户名和密码')
  }
  if(pwd !== repeatpwd){
    return errorMSG('密码和确认密码不一致')
  }
  return dispatch => (
    axios.post('/user/register', {user, pwd, type})
      .then(res => {
        if(res.status === 200 && res.data.code === 0){
          dispatch(registerSucceess({user, type}))
        }else{
          dispatch(errorMSG(res.data.msg))
        }
      })
  )
}
