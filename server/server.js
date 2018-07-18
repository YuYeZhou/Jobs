const express = require('express')
const userRouter = require('./user')
const bodyParser = require('body-parser')
const cookParser = require('cookie-parser')

const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)

io.on('connect', (socket)=>{
  socket.on('sendmsg', (data)=>{
    console.log(data)    
    io.emit('recvmsg', data)
  })
})


app.use(cookParser())
app.use(bodyParser.json())

app.use('/user', userRouter)

server.listen(9093, () => {
  console.log('Node app start at port 9093')
})