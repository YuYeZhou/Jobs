const express = require('express')
const Router = express.Router()
const model = require('./model')
const User = model.getModel('user')

Router.get('/list', (req, res) =>{
  User.find({}, (err, doc) => 
    res.json(doc)
  )
})
Router.get('/info', (req, res) => 
  // 用户没有cookie
  res.json({code:1})
)

module.exports = Router