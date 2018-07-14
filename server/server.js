const express = require('express')
const userRouter = require('./user')
const bodyParser = require('body-parser')
const cookParser = require('cookie-parser')

const app = express()
app.use(cookParser())
app.use(bodyParser.json())

app.use('/user', userRouter)

app.listen(9093, () => {
  console.log('Node app start at port 9093')
})