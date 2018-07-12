const express = require('express')
const Router = express.Router()

Router.get('/info', (req, res) => 
  // 用户没有cookie
  res.json({code:1})
)

module.exports = Router