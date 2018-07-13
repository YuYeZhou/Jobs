const express = require('express')
const Router = express.Router()
const bodyParser = require('body-parser')
const cookParser = require('cookie-parser')
const model = require('./model')
const User = model.getModel('user')


Router.get('/list', (req, res) =>{
  User.find({}, (err, doc) => 
    res.json(doc)
  )
})

Router.post('/register', (req, res) =>{
  console.log(req.body.data)
  const {user, pwd, type} = req.body.data
  User.findOne({user}, (err, doc) => {
    if(doc) {
      return res.json({ code: 1, msg: '用户名重复' })
    }
    User.create({ user, pwd, type }, (err, data) => {
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

module.exports = Router