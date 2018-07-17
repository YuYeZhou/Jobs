import axios from "axios";
import { getRedirectPath } from '../util'

const LOGOUT = 'LOGOUT'
const AUTH_SUCCESS = 'AUTH_SUCCESS'
const LOAD_DATA = 'LOAD_DATA'
const ERROR_MSG = 'ERROR_MSG'

const initState = {
  redirectTo: '',
  msg: '',
  user: '',
  type: ''
}

// reducr
export function user(state=initState, action) {
  switch (action.type) {
    case AUTH_SUCCESS:
      return {...state, msg: '', redirectTo: getRedirectPath(action.data), ...action.data}
    case LOAD_DATA:
      return {...state, ...action.data}
    case ERROR_MSG:
      return {...state, msg: action.msg }
    case LOGOUT:
      return {...initState, redirectTo: '/login'}
    default:
      return state;
  }
}

function authSuccess (data) {
  return { data, type: AUTH_SUCCESS }
}

function errorMSG(msg) {
  return { msg, type: ERROR_MSG }
}

export function loadData(data) {
  return { data, type: LOAD_DATA }
}

export function logoutSubmit() {
  return {type: LOGOUT}
}

export function update(data) {
  return  dispatch => (
    axios.post('/user/update', data)
      .then(res => {
        if(res.status === 200 && res.data.code === 0){
          dispatch(authSuccess(res.data.data))
        }else{
          dispatch(errorMSG(res.data.msg))
        }
      })
  )
}

export function login({user, pwd}) {
  if(!user||!pwd){
    return errorMSG('必须输入用户名和密码')
  }  
  return dispatch => (
    axios.post('/user/login', {user, pwd})
      .then(res => {
        if(res.status === 200 && res.data.code === 0){
          dispatch(authSuccess(res.data.data))
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
          dispatch(authSuccess({user, type}))
        }else{
          dispatch(errorMSG(res.data.msg))
        }
      })
  )
}
