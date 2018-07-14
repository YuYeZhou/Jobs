const express = require('express')
const Router = express.Router()
const model = require('./model')
const User = model.getModel('user')
const Utils = require('utility')



Router.get('/list', (req, res) =>{
  // User.remove({},function(e, d){})
  User.find({}, (err, doc) => 
    res.json(doc)
  )
})

Router.post('/login', (req, res) => {
  const { user, pwd } = req.body
  User.findOne({user, pwd:Md5Pwd(pwd)}, {'pwd':0} ,(err, doc) => {
    if(err) {
      return res.json({ code: 1, msg: '后端出错了' })
    } 
    if(!doc) {
      return res.json({ code: 1, msg: '用户名或密码错误'})
    }
    return res.json({ code: 0, data: doc})
  })
})

Router.post('/register', (req, res) =>{
  const { user, pwd, type } = req.body
  User.findOne({user}, (err, doc) => {
    if(doc) {
      return res.json({ code: 1, msg: '用户名重复' })
    }
    User.create({ user, pwd: Md5Pwd(pwd), type }, (err, doc) => {
      if(err) {
        return res.json({ code: 1, msg: '后端出错了' })
      }
      return res.json({ code: 0, data: doc })
    })
  })
})

Router.get('/info', (req, res) => 
  // 用户没有cookie
  res.json({code:1})
)

function Md5Pwd(pwd) {
  const salt = 'I_am_good,,,,good~good~study---day--dayUPUP@#$%%%!$$'
  return Utils.md5(Utils.md5(pwd + salt))
}


module.exports = Router