const express = require('express')
const Router = express.Router()
const model = require('./model')
const User = model.getModel('user')
const Chat = model.getModel('chat')
const Utils = require('utility')
const _filter = {'pwd': 0, __v: 0}


Router.get('/list', (req, res) =>{
  // User.remove({},function(e, d){})
  const {type} = req.query
  User.find({type}, (err, doc) => 
    res.json({ code:0, data: doc })
  )
})

Router.get('/getmsglist', (req, res) => {
  const user = req.cookies.user
  // {'$or' :[{from: user, to: user}]}
  Chat.find({}, (err, doc) => {
    if(!err){
      return res.json({code:0, msgs: doc})
    }
  })
})

Router.post('/update', (req, res) => {
  const {userid} = req.cookies
  if(!userid){
    // 用户没有cookie
    return res.json({code:1})
  }
  const body = req.body
  User.findByIdAndUpdate(userid, body, (err, doc) => {
    if(err) {
      return res.json({ code: 1, msg: '后端出错了' })
    }
    const data = Object.assign({},{
      user: doc.user,
      type: doc.type
    }, body)
    return res.json({ code:0, data })
  })
})

Router.post('/login', (req, res) => {
  const { user, pwd } = req.body
  User.findOne({user, pwd:Md5Pwd(pwd)}, _filter ,(err, doc) => {
    if(err) {
      return res.json({ code: 1, msg: '后端出错了' })
    } 
    if(!doc) {
      return res.json({ code: 1, msg: '用户名或密码错误'})
    }
    res.cookie('userid', doc._id)
    return res.json({ code: 0, data: doc})
  })
})

Router.post('/register', (req, res) =>{
  const { user, pwd, type } = req.body
  User.findOne({user}, (err, doc) => {
    if(doc) {
      return res.json({ code: 1, msg: '用户名重复' })
    }
    const userModel = new User({user, type, pwd: Md5Pwd(pwd)})
    userModel.save((err, doc) => {
      if(err){
        return res.json({ code: 1, msg: '后端出错了' })
      }
      const {user, type, _id} = doc
      res.cookie('userid', doc._id)
      return res.json({ code: 0, data: {user, type, _id} })
    })
  })
})

Router.get('/info', (req, res) => {
  const {userid} = req.cookies
  if(!userid){
    // 用户没有cookie
    return res.json({code:1})
  }
  User.findOne({_id: userid}, _filter, (err, doc) => {
    if(err) {
      return res.json({ code: 1, msg: '后端出错了' })
    }
    if(doc) {
      return res.json({ code: 0, data: doc})
    }
  })
})

function Md5Pwd(pwd) {
  const salt = 'I_am_good,,,,good~good~study---day--dayUPUP@#$%%%!$$'
  return Utils.md5(Utils.md5(pwd + salt))
}


module.exports = Router