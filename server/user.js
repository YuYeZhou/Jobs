const express = require('express')
const Router = express.Router()
const model = require('./model')
const User = model.getModel('user')
const Utils = require('utility')



Router.get('/list', (req, res) =>{
  User.find({}, (err, doc) => 
    res.json(doc)
  )
})

Router.post('/register', (req, res) =>{
  console.log(req.body)
  const {user, pwd, type} = req.body
  User.findOne({user}, (err, doc) => {
    if(doc) {
      return res.json({ code: 1, msg: '用户名重复' })
    }
    User.create({ user, pwd: getMd5Pwd(pwd), type }, (err, data) => {
      if(err) {
        return res.json({ code: 1, msg: '后端出错了' })
      }
      return res.json({ code: 0 })
    })
  })
})

Router.get('/info', (req, res) => 
  // 用户没有cookie
  res.json({code:1})
)

function getMd5Pwd(pwd) {
  const salt = 'I_am_good,,,,good~good~study---day--dayUPUP@#$%%%!$$'
  return Utils.md5(Utils.md5(pwd + salt))
}


module.exports = Router